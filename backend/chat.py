# backend/chat.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Literal
import requests
from fastapi.responses import StreamingResponse
import json
from utils.retriever import retrieve_chunks
router = APIRouter()

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ChatRequest(BaseModel):
    user_query: str
    history: List[ChatMessage] = []
    model: str = "phi3"
    stream: bool = False

@router.post("/")
async def chat_with_bot(request: ChatRequest):
    try:
        # 🔍 RAG step: retrieve top-k relevant chunks
        context_chunks = retrieve_chunks(request.user_query, top_k=3)
        context_text = "\n\n".join(context_chunks)

        # 👇 Add context as system message
        # messages = [{"role": "system", "content": f"Use the following context to answer:\n{context_text}"}]
        # messages += request.history
        # messages += [{"role": "user", "content": request.user_query}]
        combined_user_prompt = (
            f"Answer the question using the following context:\n\n"
            f"{context_text}\n\n"
            f"Question: {request.user_query}"
        )

        messages = [{"role": "user", "content": combined_user_prompt}]


        payload = {
            "model": request.model,
            "messages": messages,
            "stream": request.stream
        }

        if request.stream:
            def stream_response():
                with requests.post("http://localhost:11434/api/chat", json=payload, stream=True) as resp:
                    if resp.status_code != 200:
                        raise HTTPException(status_code=resp.status_code, detail="Streaming failed.")
                    for line in resp.iter_lines():
                        if line:
                            data = json.loads(line.decode("utf-8"))
                            if "message" in data and "content" in data["message"]:
                                yield data["message"]["content"]
            return StreamingResponse(stream_response(), media_type="text/plain")

        response = requests.post("http://localhost:11434/api/chat", json=payload)
        response.raise_for_status()
        result = response.json()
        return {"response": result["message"]["content"]}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Ollama API error: {e}")

# @router.post("/")
# async def chat_with_bot(request: ChatRequest):
#     try:
#         # Build full message context
#         messages = request.history + [{"role": "user", "content": request.user_query}]
#         payload = {
#             "model": request.model,
#             "messages": messages,
#             "stream": request.stream
#         }

#         # Streaming response
#         if request.stream:
#             def stream_response():
#                 with requests.post("http://localhost:11434/api/chat", json=payload, stream=True) as resp:
#                     if resp.status_code != 200:
#                         raise HTTPException(status_code=resp.status_code, detail="Streaming failed.")
#                     for line in resp.iter_lines():
#                         if line:
#                             data = json.loads(line.decode("utf-8"))
#                             if "message" in data and "content" in data["message"]:
#                                 yield data["message"]["content"]

#             return StreamingResponse(stream_response(), media_type="text/plain")

#         # Regular (non-streaming) response
#         response = requests.post("http://localhost:11434/api/chat", json=payload)
#         response.raise_for_status()
#         result = response.json()
#         return {"response": result["message"]["content"]}

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=500, detail=f"Ollama API error: {e}")
