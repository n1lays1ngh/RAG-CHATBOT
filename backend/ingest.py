

from fastapi import APIRouter, UploadFile, File, HTTPException
from utils.embedder import get_embeddings
from utils.retriever import save_to_faiss
import os
import tempfile
from PyPDF2 import PdfReader

router = APIRouter()

CHUNK_SIZE = 300
CHUNK_OVERLAP = 50

def split_text(text, chunk_size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

def extract_text_from_file(file_path: str, filename: str) -> str:
    if filename.endswith(".pdf"):
        reader = PdfReader(file_path)
        text = "\n".join([page.extract_text() or "" for page in reader.pages])
        return text
    elif filename.endswith(".txt"):
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    else:
        raise ValueError("Unsupported file format. Only .txt and .pdf allowed.")

@router.post("/")
async def ingest_file(file: UploadFile = File(...)):
    if not file.filename or not file.filename.endswith((".pdf", ".txt")):
        raise HTTPException(status_code=400, detail="Only PDF and TXT files are supported.")

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        # Extract and chunk text
        raw_text = extract_text_from_file(temp_path, file.filename)
        chunks = split_text(raw_text)

        # Generate embeddings and save to FAISS
        embeddings = get_embeddings(chunks)
        save_to_faiss(chunks, embeddings)

        return {"message": f"Successfully ingested {len(chunks)} chunks from {file.filename}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if temp_path is not None and os.path.exists(temp_path):
            os.remove(temp_path)