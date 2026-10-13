"""Risk Assessment Engine.

Combines text indicators and URL structural flags into a calibrated,
transparent score (0 to 100) and assigns an actionable risk level.
"""

from typing import List, Dict, Any, Tuple


def calculate_risk(
    text_indicators: List[Dict[str, Any]],
    url_results: List[Dict[str, Any]]
) -> Tuple[int, str, str, List[str]]:
    """
    Combines text indicators and URL findings into a comprehensive assessment.
    Returns:
        (risk_score, risk_level, summary_headline, recommendations)
    """
    total_score = 0

    # 1. Accumulate text indicator scores
    for ind in text_indicators:
        total_score += ind.get("score_impact", 15)

    # 2. Accumulate URL inspection risk
    highest_url_score = 0
    for u in url_results:
        u_score = u.get("risk_score", 0)
        if u_score > highest_url_score:
            highest_url_score = u_score
        # Add a portion of each URL's risk
        total_score += int(u_score * 0.4)

    # If an individual URL is severely malicious (score > 60), ensure high risk minimum
    if highest_url_score >= 60:
        total_score = max(total_score, 65)

    # Cap score at 100
    risk_score = min(total_score, 100)

    # 3. Categorize Risk Level
    if risk_score >= 60:
        risk_level = "High"
        summary = "High probability of phishing or scam activity detected. Exercise extreme caution."
    elif risk_score >= 25:
        risk_level = "Medium"
        summary = "Suspicious characteristics detected. Requires independent verification before proceeding."
    else:
        risk_level = "Low"
        summary = "No obvious scam indicators detected, but always remain vigilant."

    # 4. Generate targeted safety recommendations
    recommendations: List[str] = []
    
    # Check triggered types
    types = {ind.get("type") for ind in text_indicators}

    if "credential_request" in types:
        recommendations.append("Never share passwords, OTP codes, or login credentials via email, SMS, or unverified links.")
    
    if "payment_demand" in types:
        recommendations.append("Do not send money, gift card codes, or cryptocurrency. Legitimate entities never require untraceable payments.")
    
    if "urgency" in types:
        recommendations.append("Resist the urge to act immediately. Fraudulent messages artificially induce panic to bypass critical judgment.")
    
    if "unrealistic_offer" in types:
        recommendations.append("Verify job postings directly on the company's verified careers page. Be skeptical of unsolicited high-paying offers.")
    
    if "impersonation" in types:
        recommendations.append("Contact the organization directly using phone numbers or portals from their official, verified website.")

    if url_results:
        has_suspicious_url = any(u.get("risk_score", 0) >= 30 for u in url_results)
        if has_suspicious_url:
            recommendations.append("Do not click any embedded links. Manually type the official web address into your browser.")
        else:
            recommendations.append("Inspect links carefully on desktop by hovering over them before interacting.")

    # Fallback recommendations if none matched
    if not recommendations:
        recommendations.extend([
            "Verify the sender's identity through a secondary, independent communication channel.",
            "Never download unexpected attachments or grant remote access to your device.",
            "Report suspicious messages to your security team or official fraud reporting channels."
        ])

    return risk_score, risk_level, summary, recommendations
