import pytest
from app.text_rules import analyze_text

def test_empty_message():
    assert analyze_text("") == []
    assert analyze_text("    ") == []

def test_safe_message():
    text = "Hi Sarah, can you review the attached project schedule before our Monday morning meeting? Thanks!"
    results = analyze_text(text)
    assert len(results) == 0

def test_urgency_detection():
    text = "URGENT ACTION REQUIRED: Your account has been suspended! Act within 24 hours to avoid closure."
    results = analyze_text(text)
    types = [r["type"] for r in results]
    assert "urgency" in types
    assert any(r["severity"] == "High" for r in results)

def test_credential_harvesting():
    text = "Security Alert: Click here to verify your password and reply with your OTP verification code immediately."
    results = analyze_text(text)
    types = [r["type"] for r in results]
    assert "credential_request" in types

def test_gift_cards_and_crypto():
    text = "To unblock your card, pay via iTunes gift cards or transfer $500 to our bitcoin wallet address."
    results = analyze_text(text)
    types = [r["type"] for r in results]
    assert "payment_demand" in types

def test_fake_job_offer():
    text = "Congratulations! You have been selected for a remote position. Earn $800 per day working 2 hours from home. No experience needed."
    results = analyze_text(text)
    types = [r["type"] for r in results]
    assert "unrealistic_offer" in types
