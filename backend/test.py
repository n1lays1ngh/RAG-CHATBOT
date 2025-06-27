from utils.embedder import get_embeddings
from utils.retriever import save_to_faiss, retrieve_chunks

# Sample documents to ingest
docs = [
    "Aadya Singh has a height of 160cm and is 62kg",
    "Aadya Singh has a brother called nilay who is the prime minister of india ",
    "Nilay has an electric guitar called fender squire and an amp called marshall",
    "aadya has a macbook air m4 "
]

# Step 1: Embed and save
embeddings = get_embeddings(docs)
save_to_faiss(docs, embeddings)
print("✅ Ingestion successful.\n")

# Step 2: Query and retrieve
# query = "What color is the fox?"
# results = retrieve_chunks(query, top_k=3)
# print(f"🔍 Query: {query}")
# print("📄 Retrieved chunks:")
# for i, chunk in enumerate(results, 1):
#     print(f"{i}. {chunk}")
