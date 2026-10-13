import pytest
from app.url_checker import extract_urls, inspect_url, analyze_urls

def test_extract_urls():
    text = "Visit https://secure-bank-login.xyz/auth or check www.google.com for more info."
    urls = extract_urls(text)
    assert len(urls) == 2
    assert "https://secure-bank-login.xyz/auth" in urls
    assert "www.google.com" in urls

def test_inspect_ip_url():
    result = inspect_url("http://192.168.1.100/login")
    assert result["is_ip_address"] is True
    assert not result["is_https"]
    assert any("raw IP address" in f for f in result["flags"])
    assert result["risk_score"] > 30

def test_inspect_suspicious_tld_and_typosquatting():
    result = inspect_url("https://paypal-update-security.xyz/login")
    assert result["has_suspicious_tld"] is True
    assert result["has_typosquatting"] is True
    assert result["risk_score"] >= 50

def test_inspect_legitimate_url():
    result = inspect_url("https://www.google.com/search")
    assert result["is_https"] is True
    assert not result["is_ip_address"]
    assert not result["has_suspicious_tld"]
    assert not result["has_typosquatting"]
    assert result["risk_score"] == 0

def test_url_shortener():
    result = inspect_url("https://bit.ly/3xFakeLink")
    assert result["is_shortener"] is True
    assert any("shortener" in f for f in result["flags"])
