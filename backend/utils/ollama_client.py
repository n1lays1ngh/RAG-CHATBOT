
import os
import httpx
from typing import Generator

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
MODEL_NAME = os.getenv("OLLAMA_MODEL", "phi3") 

SYSTEM_PROMPT = (
    "You are a helpful and disciplined AI assistant. Your primary goal is to provide accurate and relevant information."

    "Respond to user queries clearly and concisely, relying only on the provided context. Do not use outside knowledge or make assumptions. If the answer is not found within the context, respond with: 'I don't know.'"
    "Keep responses brief, typically 1 to 2 sentences. Only provide longer explanations, multi-paragraph responses, or summaries if explicitly requested by the user."
    "If a user's prompt is vague, overly broad, or invites excessive detail (e.g., 'Explain everything about X', 'Describe the human body in detail'), respond with: 'Please ask a more specific question.' If the context clearly permits, you may offer a very brief summary."

    "Avoid speculation, repetition, or filler. Do not elaborate beyond what is directly supported by the retrieved context. Do not answer unrelated questions; always stay grounded in the provided material."

    "Maintain a neutral, professional tone. Do not express opinions, emotion, or personal style. If a user's question is ambiguous or incomplete, ask a short follow-up question for clarification."

    "Your top priorities are factual accuracy, direct relevance to context, and brevity. Focus tightly on the query and evidence provided. Your role is to return useful, verified answers, not to guess, summarize broadly, or speculate."

    "Special Instruction for Detailed Responses (Edge Cases):If the user explicitly requests a 'very detailed answer' or asks for a response that 'handles edge cases well,' you may sparingly use concise outside information to enhance the answer's completeness and detail. This is permitted only if it directly improves the user's understanding of the specific, requested topic and remains strictly factual. This instruction serves as a precise exception to the 'only on provided context' rule, applied solely for explicit requests for high-detail responses."
)


def generate_response(prompt: str, history: list = []) -> str:
    #Non Streaming Response 

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "system": SYSTEM_PROMPT,
        "context": history,  
        "stream": False
    }
    try:
        response = httpx.post(f"{OLLAMA_HOST}/api/generate", json=payload, timeout=60)
        response.raise_for_status()
        return response.json().get("response", "").strip()
    except Exception as e:
        return f"Error communicating with Ollama: {str(e)}"


def stream_response(prompt: str, history: list = []) -> Generator[str, None, None]:
    #Streaming Response
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "system": SYSTEM_PROMPT,
        "context": history,
        "stream": True
    }

    try:
        with httpx.stream("POST", f"{OLLAMA_HOST}/api/generate", json=payload, timeout=None) as r:
            for line in r.iter_lines():
                if line:
                    try:
                        chunk = httpx.Response(200, content=line).json()
                        yield chunk.get("response", "")
                    except Exception:
                        continue
    except Exception as e:
        yield f"Error communicating with Ollama: {str(e)}"
