"""Core Analyzer Orchestrator Module.

Coordinates text rule execution, URL inspection, risk engine calculation,
and LLM explanation generation into a cohesive pipeline.
"""

import time
from typing import Dict, Any
from app.schemas import MessageRequest, AnalysisResponse, Indicator, UrlInspectionResult
from app.text_rules import analyze_text
from app.url_checker import analyze_urls
from app.risk_engine import calculate_risk
from app.llm_service import get_explanation
from app.db import save_history_record

DISCLAIMER_TEXT = (
    "This analysis is a heuristic, rule-based assessment intended for educational and assistance purposes only. "
    "It cannot guarantee that a communication is 100% authentic or fraudulent. Always exercise caution and verify "
    "unsolicited requests independently through official channels."
)


async def process_analysis(request: MessageRequest) -> AnalysisResponse:
    """Orchestrates end-to-end analysis of the submitted suspicious text."""
    start_time = time.perf_counter()
    raw_text = request.message.strip()

    # 1. Run rule-based text analysis
    text_indicators = analyze_text(raw_text)

    # 2. Run structural URL inspection
    url_results = analyze_urls(raw_text)

    # 3. Calculate holistic risk score and gather actionable advice
    risk_score, risk_level, summary, recommendations = calculate_risk(
        text_indicators, url_results
    )

    # 4. Generate plain-language explanation (Groq or local fallback)
    explanation, llm_used, llm_provider = await get_explanation(
        message=raw_text,
        risk_level=risk_level,
        risk_score=risk_score,
        indicators=text_indicators,
        urls=url_results,
        enable_llm=request.enable_llm
    )

    # 5. Persist to history if user opted in
    history_id = None
    if request.save_history:
        history_id = save_history_record(
            snippet=raw_text,
            risk_level=risk_level,
            risk_score=risk_score,
            indicator_count=len(text_indicators),
            url_count=len(url_results)
        )

    duration_ms = round((time.perf_counter() - start_time) * 1000, 2)

    return AnalysisResponse(
        risk_level=risk_level,
        risk_score=risk_score,
        summary=summary,
        indicators=[Indicator(**ind) for ind in text_indicators],
        urls=[UrlInspectionResult(**u) for u in url_results],
        explanation=explanation,
        recommendations=recommendations,
        disclaimer=DISCLAIMER_TEXT,
        llm_used=llm_used,
        llm_provider=llm_provider,
        processing_time_ms=duration_ms,
        history_id=history_id
    )
