"""FastAPI Application Entry Point.

Exposes REST API endpoints for scam analysis, health checks, and history management.
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load local environment variables from .env if present
load_dotenv()

from app.schemas import (
    MessageRequest,
    AnalysisResponse,
    HealthResponse,
    HistoryItem
)
from app.analyzer import process_analysis
from app.db import (
    init_db,
    get_history_records,
    delete_history_record,
    clear_all_history
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database on startup
    init_db()
    yield

app = FastAPI(
    title="AI Phishing and Scam Detection Assistant API",
    description=(
        "Production-ready backend analyzing suspicious messages, emails, SMS, and URLs "
        "using rule-based heuristics and optional LLM-driven explanations."
    ),
    version="1.0.0",
    lifespan=lifespan
)

# Configure Cross-Origin Resource Sharing (CORS) for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows local dev and static deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
def home():
    """Confirm the service is running."""
    return {"message": "AI Phishing Detection Assistant API is running"}


@app.get("/api/health", response_model=HealthResponse, tags=["General"])
def health_check():
    """Check API availability and runtime configuration."""
    groq_key = os.getenv("GROQ_API_KEY", "").strip()
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        rules_engine="active",
        groq_configured=bool(groq_key),
        database_enabled=True
    )


@app.post(
    "/api/analyze",
    response_model=AnalysisResponse,
    status_code=status.HTTP_200_OK,
    tags=["Analysis"]
)
async def analyze_message(request: MessageRequest):
    """
    Analyze a suspicious message, email, SMS, or job offer.
    Performs text rule analysis, URL structural inspection, risk scoring,
    and returns tailored explanations with safety advice.
    """
    if not request.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message content cannot be empty or purely whitespace."
        )

    try:
        response = await process_analysis(request)
        return response
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while evaluating the message: {str(exc)}"
        )


@app.get("/api/history", response_model=list[HistoryItem], tags=["History"])
def get_history():
    """Fetch recent user-saved scan history."""
    try:
        records = get_history_records()
        return [HistoryItem(**r) for r in records]
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch history: {str(exc)}"
        )


@app.delete("/api/history/{record_id}", tags=["History"])
def delete_history_item(record_id: int):
    """Delete a specific record from history."""
    success = delete_history_record(record_id)
    if not success:
        raise HTTPException(status_code=404, detail="History record not found")
    return {"message": "Record deleted successfully"}


@app.delete("/api/history", tags=["History"])
def clear_history():
    """Delete all scan history records."""
    count = clear_all_history()
    return {"message": f"Successfully cleared {count} history records"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
