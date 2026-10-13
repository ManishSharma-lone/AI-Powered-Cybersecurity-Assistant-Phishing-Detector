from pydantic import BaseModel, Field
from typing import List, Optional

class MessageRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=15000, description="The suspicious message text to inspect")
    enable_llm: bool = Field(True, description="Whether to request LLM explanation if configured")
    save_history: bool = Field(False, description="Whether to persist this scan in local SQLite history")

class Indicator(BaseModel):
    type: str
    category: str
    severity: str  # "Low", "Medium", "High", "Critical"
    description: str
    matched_phrase: Optional[str] = None
    score_impact: int

class UrlInspectionResult(BaseModel):
    url: str
    scheme: str
    domain: str
    is_https: bool
    is_ip_address: bool
    has_suspicious_tld: bool
    has_typosquatting: bool
    subdomain_count: int
    has_unusual_port: bool
    has_userinfo: bool
    is_shortener: bool
    flags: List[str]
    risk_score: int

class AnalysisResponse(BaseModel):
    risk_level: str  # "Low", "Medium", "High"
    risk_score: int  # 0 to 100
    summary: str
    indicators: List[Indicator]
    urls: List[UrlInspectionResult]
    explanation: str
    recommendations: List[str]
    disclaimer: str
    llm_used: bool
    llm_provider: Optional[str] = None
    processing_time_ms: float
    history_id: Optional[int] = None

class HistoryItem(BaseModel):
    id: int
    timestamp: str
    snippet: str
    risk_level: str
    risk_score: int
    indicator_count: int
    url_count: int

class HealthResponse(BaseModel):
    status: str
    version: str
    rules_engine: str
    groq_configured: bool
    database_enabled: bool
