
# import easyocr
# from PIL import Image, ImageDraw
# import numpy as np
# from io import BytesIO

# reader = easyocr.Reader(['en'], gpu=False)

# def get_positional_label(box, img_width, img_height):
#     x_center = sum([p[0] for p in box]) / 4
#     y_center = sum([p[1] for p in box]) / 4

#     vertical = (
#         "top" if y_center < img_height / 3 else
#         "bottom" if y_center > 2 * img_height / 3 else "middle"
#     )
#     horizontal = (
#         "left" if x_center < img_width / 3 else
#         "right" if x_center > 2 * img_width / 3 else "center"
#     )

#     return f"{vertical}-{horizontal}"

# def extract_text_with_positions(image_bytes):
#     image = Image.open(BytesIO(image_bytes)).convert("RGB")
#     img_width, img_height = image.size
#     results = reader.readtext(np.array(image))

#     ocr_output = []

#     for box, text, score in results:
#         if text.strip() == "":
#             continue

#         label = get_positional_label(box, img_width, img_height)

#         ocr_output.append({
#             "text": str(text),
#             "score": float(score),
#             "bbox": [[float(pt[0]), float(pt[1])] for pt in box],
#             "position": label,
#         })

#     return ocr_output


import easyocr
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from io import BytesIO
import base64

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)

# Compute label like top-left, bottom-center, etc.
def get_positional_label(box, img_width, img_height):
    x_center = sum([p[0] for p in box]) / 4
    y_center = sum([p[1] for p in box]) / 4

    vertical = 'top' if y_center < img_height / 3 else 'bottom' if y_center > 2 * img_height / 3 else 'middle'
    horizontal = 'left' if x_center < img_width / 3 else 'right' if x_center > 2 * img_width / 3 else 'center'

    return f"{vertical}-{horizontal}"

# Main OCR function
def extract_text_with_positions(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    img_width, img_height = image.size
    results = reader.readtext(np.array(image))

    ocr_output = []
    annotated_image = image.copy()
    draw = ImageDraw.Draw(annotated_image)

    for box, text, score in results:
        if text.strip() == "":
            continue

        # Draw bounding box
        draw.polygon(box, outline="red", width=2)

        # Compute top-center for label placement
        x_center = sum([p[0] for p in box]) / 4
        y_top = min([p[1] for p in box])
        label = get_positional_label(box, img_width, img_height)

        # Optional: add background for text readability
        text_width = draw.textlength(text)
        draw.rectangle(
            [(x_center - text_width / 2 - 4, y_top - 20), (x_center + text_width / 2 + 4, y_top - 4)],
            fill="white"
        )

        # Draw OCR text above the box
        draw.text((x_center, y_top - 18), text, fill="red", anchor="ms")

        ocr_output.append({
            "text": str(text),
            "score": float(score),
            "bbox": [[int(x), int(y)] for x, y in box],
            "position": label,
        })

    # Convert to base64
    buffered = BytesIO()
    annotated_image.save(buffered, format="PNG")
    base64_annotated = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return ocr_output, base64_annotated
