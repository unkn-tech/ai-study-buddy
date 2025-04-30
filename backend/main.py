import os
from dotenv import load_dotenv
import logging
from openai import OpenAI
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Load environment variables
load_dotenv()

# Configure logging
log_level = os.getenv("LOG_LEVEL", "INFO")
logging.basicConfig(level=log_level)
logger = logging.getLogger(__name__)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
if not os.getenv("OPENAI_API_KEY"):
    logger.warning("OPENAI_API_KEY not found in environment variables")

# Define models
class Message(BaseModel):
    role: str
    content: str

class StudyRequest(BaseModel):
    messages: List[Message]
    subject: Optional[str] = None
    context: Optional[str] = None

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat")
async def chat(request: StudyRequest):
    try:
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-practice")
async def generate_practice(request: StudyRequest):
    try:
        # Prepare the messages for practice question generation
        system_message = {
            "role": "system",
            "content": "You are a helpful AI tutor. Generate practice questions based on the provided content."
        }
        messages = [system_message] + [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        return {"questions": response.choices[0].message.content}
    except Exception as e:
        logger.error(f"Error in generate_practice endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"} 