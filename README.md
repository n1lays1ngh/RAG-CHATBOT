# 🧠 RAG Chatbot with Local LLM (FastAPI + React + Ollama)

A full-stack chatbot application that uses **Retrieval-Augmented Generation (RAG)** powered by a **local LLM (Phi-3 via Ollama)**. Upload documents (PDF, TXT, etc.), ask questions, and get context-aware responses — all running locally with **FastAPI**, **FAISS**, **React**, and **Tailwind CSS**.

---

## 🚀 Features

- 📄 **File Upload**: Ingest your own documents (PDF, TXT, etc.)
- 🧠 **Local LLM Support**: Chat powered by Phi-3 via Ollama (runs locally)
- 📚 **FAISS + RAG**: Retrieves relevant chunks from your documents
- 🗨️ **Interactive Chat UI**: Real-time chat using React
- ⚡ **FastAPI Backend**: Lightweight and fast REST API
- 🎨 **Tailwind CSS**: Clean and responsive UI
- 🔌 **Streaming Chat Support** (optional toggle)

---

## 🧱 Tech Stack

| Layer     | Tech                                  |
|-----------|---------------------------------------|
| Frontend  | React, Tailwind CSS, Vite             |
| Backend   | FastAPI, Python                       |
| RAG       | FAISS, SentenceTransformers           |
| LLM       | [Ollama](https://ollama.com/) + Phi-3 |
| Others    | Axios, Langchain-style logic (custom) |

---

## 📂 Project Structure

```
RAG-CHATBOT-main/
├── backend/            # FastAPI backend
│   ├── chat.py         # Chat endpoint
│   ├── ingest.py       # File ingestion & indexing
│   ├── main.py         # App entrypoint
│   ├── utils/          # Embedding, retrieval, Ollama
│   └── vector_store/   # FAISS index storage
├── frontend/           # React + Tailwind app
│   ├── src/components/ # ChatBox, FileUpload
│   └── api.js          # Axios API config
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- Python 3.10+
- Node.js 16+
- Ollama installed and running locally with Phi-3 model:

```bash
ollama run phi3
```

---

### 2. Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

- Ingest documents at: `POST /ingest`
- Chat endpoint: `POST /chat`

---

### 3. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

- Open your browser at `http://localhost:5173/`

---

## 📡 API Endpoints

### `POST /ingest`
Uploads and indexes documents.
```json
{
  "file": "<your_file.pdf|txt>"
}
```

### `POST /chat`
Sends a user query to the LLM with optional chat history.
```json
{
  "query": "What is the document about?",
  "history": [["Hello", "Hi there!"]]
}
```

---

## 💬 Chat UI

- File Upload → Indexes content via FastAPI.
- ChatBox → Sends query to local Phi-3 and gets RAG-augmented responses.
- Uses Axios for API calls.

---

## 🧪 Development Tips

- You can test APIs with Postman or directly via the frontend.
- Modify vector store settings or top-k retrievals in `retriever.py`.
- Ollama should be running with your desired model (`phi3`, `llama3`, etc.).

---

## 📝 License

MIT License

---

## 🙋‍♂️ Author

Built by **Nilay Singh**  
[🔗 LinkedIn](https://www.linkedin.com) | [🐙 GitHub](https://github.com)

---

## 📸 Screenshots (optional)

> *(Add screenshots of your UI here once ready)*