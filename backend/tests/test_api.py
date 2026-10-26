import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "AI Phishing Detection Assistant API is running"

def test_health_check_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["rules_engine"] == "active"

def test_analyze_empty_message_rejected():
    response = client.post("/api/analyze", json={"message": ""})
    assert response.status_code == 422 or response.status_code == 400

def test_analyze_suspicious_message():
    payload = {
        "message": "Urgent: Your bank account will be blocked within 24 hours. Click http://192.168.1.5/verify and enter your password and OTP immediately.",
        "enable_llm": False,
        "save_history": True
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] in ["High", "Medium"]
    assert data["risk_score"] >= 60
    assert len(data["indicators"]) >= 2
    assert len(data["urls"]) >= 1
    assert data["disclaimer"] != ""
    assert data["processing_time_ms"] > 0

def test_history_flow():
    # Fetch history
    response = client.get("/api/history")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_analyze_with_llm():
    payload = {
        "message": "Immediate alert: unauthorized transaction detected. Visit http://security-update-bank.com to confirm identity.",
        "enable_llm": True,
        "save_history": True
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] > 0
    assert len(data["explanation"]) > 0
    assert data["llm_provider"] is not None
    # Verify history item was saved
    assert data["history_id"] is not None

    # Test deleting the record
    del_resp = client.delete(f"/api/history/{data['history_id']}")
    assert del_resp.status_code == 200

