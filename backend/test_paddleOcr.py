from ocr_utils import extract_text_with_positions

def test_local_image(path):
    with open(path, "rb") as f:
        image_bytes = f.read()
        ocr_results = extract_text_with_positions(image_bytes)

    if not ocr_results:
        print("❌ No text detected.")
    else:
        print("✅ OCR Results:")
        for entry in ocr_results:
            print(f"Text: {entry['text']} | Score: {entry['score']:.2f} | Position: {entry['position']}")
            print(f"Box: {entry['bbox']}")
        print(f"Total {len(ocr_results)} entries detected.")

# 🔍 Replace this with your local image path
test_local_image("/Users/rakshitshah/Desktop/Rakshit_MultiModal_ChatBot/Rakshit_MultiModal_ChatBot/backend/Printing3_Walk_of_Ideas_Berlin.jpeg")
