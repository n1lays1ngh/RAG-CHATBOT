from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from chat import router as chat_router
from ingest import router as ingest_router


app = FastAPI(
    title="RAG Chatbot API",
    description="A RAG-based chatbot using Ollama-Phi3Model and FastAPI",
    version="1.0.0"
)

## CORS Framework so that Frontend And Backend Can interact without issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update if hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Routers for chat and ingesting information
app.include_router(chat_router,prefix='/chat',tags = ["Chat"])
app.include_router(ingest_router,prefix='/ingest',tags = ["Ingest"])

@app.get("/")
def root():
    return {"message": "RAG Chatbot API is running "}


