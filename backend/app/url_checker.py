"""URL Extraction and Structural Inspection Module.

Extracts URLs from message content and analyzes their technical characteristics
without sending network requests, ensuring complete safety and zero SSRF risk.
"""

import re
import ipaddress
from urllib.parse import urlparse
from typing import List, Dict, Any

# High-risk TLDs commonly leveraged in mass phishing and disposable domains
SUSPICIOUS_TLDS = {
    "xyz", "top", "click", "work", "loan", "club", "date", "racing",
    "vip", "stream", "download", "win", "bid", "review", "country",
    "science", "accountant", "gq", "cf", "tk", "ml", "ga", "zip", "mov"
}

# High-target brands frequently imitated in phishing attacks
TARGETED_BRANDS = [
    "paypal", "apple", "microsoft", "google", "amazon", "netflix",
    "chase", "wellsfargo", "bankofamerica", "citibank", "dhl", "fedex",
    "usps", "irs", "binance", "coinbase", "meta", "facebook", "instagram",
    "whatsapp", "telegram", "outlook", "icloud"
]

# Legitimate root domains for targeted brands (to avoid false positives on legitimate links)
LEGITIMATE_DOMAINS = {
    "paypal.com", "apple.com", "microsoft.com", "google.com", "amazon.com",
    "netflix.com", "chase.com", "wellsfargo.com", "bankofamerica.com",
    "citi.com", "dhl.com", "fedex.com", "usps.com", "irs.gov",
    "binance.com", "coinbase.com", "meta.com", "facebook.com",
    "instagram.com", "whatsapp.com", "telegram.org", "outlook.com", "icloud.com"
}

# Known URL shorteners that obfuscate destination endpoints
URL_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "is.gd", "buff.ly", "ow.ly",
    "goo.gl", "cutt.ly", "rebrand.ly", "tiny.cc", "rb.gy"
}

# Standard web ports
STANDARD_PORTS = {80, 443}


def extract_urls(text: str) -> List[str]:
    """
    Extracts raw URLs from text while safely stripping trailing punctuation.
    Supports http/https, schemeless www links, and IP-based links.
    """
    if not text:
        return []

    # Regex capturing http/https links, schemeless domains, and IP URLs
    url_pattern = re.compile(
        r'(?:https?://[^\s<>"\'{}|\\^`]+)|(?:www\.[^\s<>"\'{}|\\^`]+)|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:/[^\s<>"\'{}|\\^`]*)?',
        re.IGNORECASE
    )

    matches = url_pattern.findall(text)
    cleaned_urls = []
    seen = set()

    for match in matches:
        clean = match.rstrip(".,;:!?)'\"")
        if clean and clean not in seen:
            seen.add(clean)
            cleaned_urls.append(clean)

    return cleaned_urls



def inspect_url(raw_url: str) -> Dict[str, Any]:
    """
    Analyzes structural attributes of a single URL without making network requests.
    Returns technical details, security flags, and calculated risk points.
    """
    # Ensure scheme for urlparse if schemeless
    target_url = raw_url
    if not target_url.startswith(("http://", "https://")):
        target_url = "http://" + target_url

    parsed = urlparse(target_url)
    scheme = parsed.scheme.lower()
    netloc = parsed.netloc.lower()
    path = parsed.path

    # Extract hostname and port
    hostname = netloc.split(":")[0] if ":" in netloc else netloc
    # Strip userinfo if present: user:pass@host
    has_userinfo = "@" in hostname
    if has_userinfo:
        hostname = hostname.split("@")[-1]

    port = parsed.port
    is_https = (scheme == "https")
    flags: List[str] = []
    url_risk_score = 0

    # 1. Scheme Check
    if not is_https:
        flags.append("Insecure HTTP protocol (no SSL/TLS encryption)")
        url_risk_score += 15

    # 2. IP Address as Hostname Check
    is_ip = False
    try:
        ipaddress.ip_address(hostname)
        is_ip = True
        flags.append("Hostname is a raw IP address rather than a domain name")
        url_risk_score += 35
    except ValueError:
        is_ip = False

    # 3. Userinfo / @ symbol check
    if has_userinfo or "@" in raw_url:
        flags.append("URL contains '@' userinfo trick to disguise true destination host")
        url_risk_score += 30

    # 4. Port Check
    has_unusual_port = False
    if port and port not in STANDARD_PORTS:
        has_unusual_port = True
        flags.append(f"Unusual destination port specified (:{port})")
        url_risk_score += 20

    # 5. Domain & Subdomain Analysis
    domain_parts = hostname.split(".")
    subdomain_count = max(0, len(domain_parts) - 2) if not is_ip else 0

    if subdomain_count >= 3:
        flags.append(f"Excessive subdomain depth ({subdomain_count} levels) used for evasion")
        url_risk_score += 18

    # 6. Suspicious TLD Check
    tld = domain_parts[-1] if len(domain_parts) > 1 and not is_ip else ""
    has_suspicious_tld = tld in SUSPICIOUS_TLDS
    if has_suspicious_tld:
        flags.append(f"Uses high-risk, disposable top-level domain (.{tld})")
        url_risk_score += 25

    # 7. URL Shortener Check
    is_shortener = hostname in URL_SHORTENERS
    if is_shortener:
        flags.append("URL is masked using a link shortener service")
        url_risk_score += 15

    # 8. Typosquatting / Brand Spoofing Check
    has_typosquatting = False
    if not is_ip:
        # Check if the domain is legitimately owned by the brand
        is_legitimate_brand = any(hostname == leg or hostname.endswith("." + leg) for leg in LEGITIMATE_DOMAINS)
        
        if not is_legitimate_brand:
            for brand in TARGETED_BRANDS:
                if brand in hostname:
                    has_typosquatting = True
                    flags.append(f"Domain mimics trusted brand '{brand}' without official authorization")
                    url_risk_score += 35
                    break

    # 9. Hyphen stuffing / deceptive structure in domain
    if hostname.count("-") >= 3:
        flags.append("Excessive hyphens in domain name (common in imitation websites)")
        url_risk_score += 15

    return {
        "url": raw_url,
        "scheme": scheme,
        "domain": hostname,
        "is_https": is_https,
        "is_ip_address": is_ip,
        "has_suspicious_tld": has_suspicious_tld,
        "has_typosquatting": has_typosquatting,
        "subdomain_count": subdomain_count,
        "has_unusual_port": has_unusual_port,
        "has_userinfo": has_userinfo,
        "is_shortener": is_shortener,
        "flags": flags,
        "risk_score": min(url_risk_score, 100)
    }


def analyze_urls(text: str) -> List[Dict[str, Any]]:
    """
    Extracts all URLs and inspects each one.
    Limits to the first 10 URLs to protect against oversized resource exhaustion.
    """
    raw_urls = extract_urls(text)
    results = []
    for raw in raw_urls[:10]:
        results.append(inspect_url(raw))
    return results
