from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv
from typing import Optional
import base64, requests, os
from ocr_utils import extract_text_with_positions

load_dotenv()
app = FastAPI()

# Enable frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev; change to specific domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

@app.post("/chat")
async def chat(message: str = Form(...), image: Optional[UploadFile] = None):
    try:
        user_content = [{"type": "text", "text": message}]
        system_instructions = ""
        ocr_data = []

        if image:
            image_bytes = await image.read()
            ocr_data, annotated_base64 = extract_text_with_positions(image_bytes)

            if ocr_data:
                # Describe OCR insights to guide GPT
                position_descriptions = [
                    f"'{obj['text']}' is located at {obj['position']} (bbox={obj['bbox']})"
                    for obj in ocr_data
                ]
                ocr_summary = "\n".join(position_descriptions)

                system_instructions = (
                    "You are an assistant that analyzes images with OCR-detected text and their positions.\n"
                    "Use the following OCR insights to describe or answer questions about the image:\n"
                    f"{ocr_summary}"
                )

                # Append annotated image with bounding boxes
                user_content.append({
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{annotated_base64}"
                    }
                })

        # Debug logs for transparency
        print("\n===============================")
        print("🧠 SYSTEM INSTRUCTIONS TO LLM:")
        print(system_instructions or "[None]")
        print("\n💬 USER INPUT TO LLM:")
        for c in user_content:
            if c["type"] == "text":
                print(f"TEXT:\n{c['text']}")
            else:
                print(f"IMAGE_URL: (base64)")
        print("===============================\n")

        # Construct OpenAI payload
        payload = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": system_instructions} if system_instructions else {},
                {"role": "user", "content": user_content}
            ],
            "temperature": 0.7
        }

        # Remove empty message entries
        payload["messages"] = [msg for msg in payload["messages"] if msg]

        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            json=payload,
            headers=headers
        )
        gpt_reply = response.json()["choices"][0]["message"]["content"]

        return {
            "reply": gpt_reply,
            "ocr": jsonable_encoder(ocr_data)
        }

    except Exception as e:
        print("❌ Error during /chat:", e)
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
