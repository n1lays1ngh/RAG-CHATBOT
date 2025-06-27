import os
import faiss
import pickle
import numpy as np
from typing import List
from .embedder import get_embedding

# Storage location
VECTOR_STORE_DIR = "vector_store"
INDEX_FILE = os.path.join(VECTOR_STORE_DIR, "faiss.index")
METADATA_FILE = os.path.join(VECTOR_STORE_DIR, "metadata.pkl")


def retrieve_chunks(query: str, top_k: int = 3):
    query_vec = np.array([get_embedding(query)], dtype=np.float32)
    index = faiss.read_index(INDEX_FILE)
    
    with open(METADATA_FILE, "rb") as f:
        metadata = pickle.load(f)

    D, I = index.search(query_vec, top_k)
    results = [metadata[i]["text"] for i in I[0]]
    return results

def save_to_faiss(text_chunks: List[str], embeddings: List[List[float]]):
    """
    Save text chunks and embeddings to FAISS index and pickle metadata.
    """
    os.makedirs(VECTOR_STORE_DIR, exist_ok=True)

    if not embeddings or len(embeddings) == 0:
        raise ValueError("Embeddings list is empty.")

    vectors = np.array(embeddings, dtype=np.float32)
    if vectors.ndim != 2:
        raise ValueError(f"Expected 2D embedding array, got shape {vectors.shape}")

    dim = vectors.shape[1]

    # Load or create FAISS index
    if os.path.exists(INDEX_FILE):
        index = faiss.read_index(INDEX_FILE)
        with open(METADATA_FILE, "rb") as f:
            metadata = pickle.load(f)
    else:
        index = faiss.IndexFlatL2(dim)
        metadata = []

    
    index.add(vectors) # type: ignore
    # Save updated metadata
    metadata.extend([{"text": chunk} for chunk in text_chunks])
    faiss.write_index(index, INDEX_FILE)
    with open(METADATA_FILE, "wb") as f:
        pickle.dump(metadata, f)

