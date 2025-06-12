<img width="1440" alt="Screenshot 2025-06-12 at 12 24 18 AM" src="https://github.com/user-attachments/assets/23fa223c-fc8c-4981-ba3a-4cec704fe3ab" />

```markdown
# 🧠 Rakshit Multimodal ChatBot

A full-stack AI chatbot that accepts text and images, runs OCR to extract and locate text from uploaded images, and communicates with GPT-4o to provide intelligent responses based on both the image content and user queries.

## 🚀 Features

- 🔤 **Text + Image Input:** Supports chat via plain text or images with text (e.g. posters, screenshots).
- 🧾 **OCR Processing:** Uses EasyOCR to extract text and bounding box positions from images.
- 🧠 **LLM Integration:** Sends both extracted image data and user query to OpenAI GPT-4o for contextual understanding.
- 🖼️ **Annotated Image Preview:** Displays images with overlaid OCR text and bounding boxes in the UI.
- ⚙️ **FastAPI Backend:** Handles image upload, OCR, prompt structuring, and LLM communication.
- 🌐 **Modern React Frontend:** Chat UI built using React with typewriter effects, image previews, and rich responses.

## 📦 Tech Stack
🖥️ Frontend
- React – Component-based UI development
- Tailwind CSS – Utility-first styling
- Axios – API calls to the FastAPI backend
- File Upload – Image input for OCR

⚙️ Backend
- FastAPI – High-performance API framework for Python
- CORS Middleware – Enables cross-origin requests
- JSON Encoder – Encodes OCR results safely for API responses

🧠 AI & OCR
- EasyOCR – Extracts text and bounding boxes from images
- OpenAI GPT-4o – Multimodal LLM used for response generation
- PIL & NumPy – Image processing and pixel data handling


## 🛠️ How It Works

1. User sends a message or uploads an image.
2. Image (if any) is processed via EasyOCR → OCR text + position info extracted.
3. Structured prompt is sent to OpenAI API with:
   - Text message
   - OCR summary (e.g. “Offer: 50% off located at top-center”)
   - Annotated image preview (base64)
4. Response from GPT-4o is displayed in the chat window.

## 📂 Project Structure

```
```
Rakshit\_MultiModal\_ChatBot/
│
├── backend/
│   ├── main.py             # FastAPI app
│   ├── ocr_utils.py        # EasyOCR processing + bounding box
│   └── .env                # API keys (ignored in Git)
│
├── frontend/
│   ├── src/components/
│   │   ├── ChatWindow.jsx
│   │   ├── ChatBubble.jsx
│   │   ├── Inputbar.jsx
│   │   └── OCROverlay.jsx
│   └── public/
│
├── .gitignore
└── README.md
```
````

## 🧪 Getting Started

### 📦 Backend (FastAPI)

cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Add your OpenAI key to `.env`
echo "OPENAI_API_KEY=your-key-here" > .env

# Start the server
uvicorn main:app --reload
````

### 💻 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🧠 Sample Prompt to LLM

```json
{
  "role": "system",
  "content": "You are an assistant that analyzes OCR results from images. 'Grand Sale' is located at top-center. '50% OFF' is located at center. Use this to answer any questions."
}
```

---

## 🔐 Notes

* `.env` file is excluded from Git using `.gitignore`
* Backend and frontend are fully decoupled with API communication
* OCR overlays do not leak into LLM — only structured insights are passed

---

## 🙌 Author

Built by **Rakshit Shah**
For demos, contributions, or collabs — reach out via [LinkedIn](https://www.linkedin.com/in/rakshitshah280701)

---
