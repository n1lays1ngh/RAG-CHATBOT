import requests
from sentence_transformers import SentenceTransformer
import numpy as np
import os
from typing import Optional, List

# Environment variables
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = "nomic-embed-text"

# Fallback model from Hugging Face
fallback_model = SentenceTransformer("all-MiniLM-L6-v2")


def embed_with_ollama(texts: List[str]) -> List[List[float]]:
    
    embeddings = []
    for text in texts:
        try:
            response = requests.post(
                f"{OLLAMA_HOST}/api/embeddings",
                json={"model": OLLAMA_MODEL, "prompt": text}
            )
            response.raise_for_status()
            data = response.json()

            if "embedding" in data:
                embeddings.append(data["embedding"])
            else:
                raise ValueError(f"No 'embedding' in Ollama response for: {text[:30]}...")
        except Exception as e:
            print(f"[embedder] Ollama failed for: {text[:30]}... → {e}")
            print("[embedder] ⚠️ Falling back to HuggingFace for this text.")
            hf_embedding = fallback_model.encode([text], convert_to_numpy=True).tolist()[0]
            embeddings.append(hf_embedding)

    return embeddings


def get_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Attempts embedding with Ollama first. If total failure, uses HuggingFace as full fallback.
    """
    try:
        return embed_with_ollama(texts)
    except Exception as e:
        print(f"[embedder] failure with Ollama → {e}")
        print("[embedder] Using HuggingFace fallback for entire batch.")
        return fallback_model.encode(texts, convert_to_numpy=True).tolist()


def get_embedding(text: str) -> List[float]:
    """
    Wrapper for embedding a single text.
    """
    return get_embeddings([text])[0]


