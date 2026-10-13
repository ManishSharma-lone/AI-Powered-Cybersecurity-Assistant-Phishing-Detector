"""Text Analysis Module for Phishing and Scam Indicator Detection.

Implements rule-based inspection across categories:
- Urgency and threatening deadlines
- Credential harvesting (passwords, OTPs, PINs, SSNs)
- Advance fees, gift cards, and cryptocurrency payments
- Unrealistic employment, prizes, and lottery guarantees
- Impersonation of trusted entities (banks, tax authorities, courier services)
- Secrecy and coercion tactics
"""

import re
from typing import List, Dict, Any, Tuple

# Pre-compiled regex patterns for high performance and accurate detection
RULES: List[Dict[str, Any]] = [
    # --- Category: Urgency & Coercive Deadlines ---
    {
        "id": "urgency_account_suspended",
        "category": "Urgency & Deadlines",
        "type": "urgency",
        "severity": "High",
        "weight": 25,
        "description": "Claims that an account is suspended, locked, or restricted unless immediate action is taken.",
        "patterns": [
            r"(?i)\b(?:your\s+(?:[a-z]+\s+)?account\s+(?:has\s+been|will\s+be|is)\s+(?:suspended|locked|terminated|restricted|disabled|closed|blocked))\b",
            r"(?i)\b(?:account\s+access\s+has\s+been\s+(?:limited|suspended|temporarily\s+blocked|restricted))\b",
            r"(?i)\b(?:unauthorized\s+activity\s+detected\s+on\s+your\s+account)\b",
            r"(?i)\b(?:security\s+alert:\s*suspicious\s+login\s+detected)\b"
        ]
    },
    {
        "id": "urgency_time_pressure",
        "category": "Urgency & Deadlines",
        "type": "urgency",
        "severity": "Medium",
        "weight": 18,
        "description": "Imposes an artificial deadline or extreme urgency to bypass critical thinking.",
        "patterns": [
            r"(?i)\b(?:within\s+(?:24|48|12)\s*hours?|immediately|right\s+now|without\s+delay)\b",
            r"(?i)\b(?:act\s+fast|urgent\s+action\s+required|final\s+notice|last\s+chance|immediate\s+response)\b",
            r"(?i)\b(?:failure\s+to\s+comply\s+will\s+result\s+in|avoid\s+legal\s+action)\b",
            r"(?i)\b(?:time\s+is\s+running\s+out|respond\s+within\s+\d+\s+(?:minutes|hours))\b"
        ]
    },

    # --- Category: Credential & Sensitive Information Harvesting ---
    {
        "id": "credentials_password_pin",
        "category": "Credential Harvesting",
        "type": "credential_request",
        "severity": "Critical",
        "weight": 35,
        "description": "Explicitly solicits passwords, PIN codes, or sensitive account login credentials.",
        "patterns": [
            r"(?i)\b(?:send|enter|verify|confirm|provide|update)\s+your\s+(?:password|passcode|secret\s+pin|login\s+details|credentials)\b",
            r"(?i)\b(?:current\s+password|security\s+question|login\s+credentials|master\s+password)\b",
            r"(?i)\b(?:click\s+(?:here|the\s+link)\s+to\s+(?:verify|reset|confirm)\s+your\s+(?:password|account))\b"
        ]
    },
    {
        "id": "credentials_otp_2fa",
        "category": "Credential Harvesting",
        "type": "credential_request",
        "severity": "Critical",
        "weight": 35,
        "description": "Requests an OTP (One-Time Password) or two-factor authentication code. Legitimate services never ask for this.",
        "patterns": [
            r"(?i)\b(?:share|send|provide|give|enter|input|reply\s+with)\s+(?:the|your)?\s*(?:otp|one[- ]time\s+password|verification\s+code|auth(?:entication)?\s+code|security\s+token)\b",
            r"(?i)\b(?:enter\s+your\s+password\s+and\s+otp)\b",
            r"(?i)\b(?:do\s+not\s+share\s+this\s+code\s+with\s+anyone\s*-\s*send\s+it\s+to\s+us)\b",
            r"(?i)\b(?:enter\s+the\s+6[- ]digit\s+code\s+sent\s+to\s+your\s+phone)\b"
        ]
    },
    {
        "id": "credentials_ssn_id",
        "category": "Identity Harvesting",
        "type": "identity_request",
        "severity": "High",
        "weight": 25,
        "description": "Requests government identification, Social Security numbers, or official identity documents.",
        "patterns": [
            r"(?i)\b(?:social\s+security\s+number|ssn|national\s+insurance|passport\s+copy|driver'?s\s+license)\b",
            r"(?i)\b(?:attach\s+a\s+photo\s+of\s+your\s+id|upload\s+your\s+identity\s+card)\b"
        ]
    },

    # --- Category: Financial, Payment & Advance Fee Scams ---
    {
        "id": "payment_gift_cards_crypto",
        "category": "Financial & Payment Demands",
        "type": "payment_demand",
        "severity": "Critical",
        "weight": 35,
        "description": "Demands payment via untraceable methods such as gift cards (Apple, Steam, Google Play) or cryptocurrency.",
        "patterns": [
            r"(?i)\b(?:pay\s+via|buy)\s+(?:itunes|apple|google\s+play|steam|amazon|target|walmart)\s+gift\s*cards?\b",
            r"(?i)\b(?:bitcoin|btc|ethereum|eth|crypto(?:currency)?|tether|usdt)\s+(?:wallet|address|transfer|payment)\b",
            r"(?i)\b(?:send\s+\$?\d+.*to\s+(?:the\s+following|this)\s+(?:wallet|bitcoin\s+address))\b"
        ]
    },
    {
        "id": "payment_advance_fee",
        "category": "Financial & Payment Demands",
        "type": "payment_demand",
        "severity": "High",
        "weight": 28,
        "description": "Demands advance processing, customs clearance, courier, or registration fees to release funds or jobs.",
        "patterns": [
            r"(?i)\b(?:upfront|advance|registration|clearance|courier|delivery|processing|refundable)\s+fee\b",
            r"(?i)\b(?:pay\s+(?:a\s+small|an\s+initial)\s+(?:deposit|fee|charge)\s+of\s+\$?\d+)\b",
            r"(?i)\b(?:transfer\s+funds\s+to\s+cover\s+(?:legal|transfer|wire)\s+fees)\b"
        ]
    },
    {
        "id": "banking_wire_fraud",
        "category": "Financial & Payment Demands",
        "type": "payment_demand",
        "severity": "High",
        "weight": 26,
        "description": "Prompts direct wire transfer, Zelle, Venmo, or cash app transactions under pressure.",
        "patterns": [
            r"(?i)\b(?:wire\s+transfer|western\s+union|moneygram|zelle|cash\s*app|venmo)\b",
            r"(?i)\b(?:send\s+money\s+to\s+safe\s+account|move\s+your\s+funds\s+to\s+protect\s+them)\b"
        ]
    },

    # --- Category: Unrealistic Promises & Greed Traps ---
    {
        "id": "offer_fake_job",
        "category": "Unrealistic Promises",
        "type": "unrealistic_offer",
        "severity": "High",
        "weight": 24,
        "description": "Offers implausible work-from-home salary, instant hiring without interviews, or unrealistic bonuses.",
        "patterns": [
            r"(?i)\b(?:earn\s+\$?\d{3,}\s*(?:per|a)\s*(?:day|hour|week)\s+(?:from\s+home|working\s+\d+\s+hours?))\b",
            r"(?i)\b(?:no\s+experience\s+(?:needed|required).*guaranteed\s+(?:income|pay))\b",
            r"(?i)\b(?:you\s+have\s+been\s+selected\s+for\s+(?:a|the)\s+(?:remote|data\s+entry|secret\s+shopper)\s+position)\b",
            r"(?i)\b(?:start\s+today\s+and\s+receive\s+\$?\d+\s+daily)\b"
        ]
    },
    {
        "id": "offer_lottery_inheritance",
        "category": "Unrealistic Promises",
        "type": "unrealistic_offer",
        "severity": "High",
        "weight": 30,
        "description": "Claims you have won a lottery, prize, government grant, or inheritance from a deceased stranger.",
        "patterns": [
            r"(?i)\b(?:congratulations!?\s+you\s+(?:have\s+)?won|selected\s+as\s+a\s+winner|lucky\s+winner)\b",
            r"(?i)\b(?:lottery|sweepstakes|jackpot|unclaimed\s+(?:funds|inheritance|estate|grant))\b",
            r"(?i)\b(?:claim\s+your\s+prize\s+of\s+\$?\d+[\d,]*)\b",
            r"(?i)\b(?:beneficiary\s+of\s+(?:a|the)\s+sum\s+of\s+\$?\d+)\b"
        ]
    },

    # --- Category: Impersonation & Authority Spoofing ---
    {
        "id": "impersonation_delivery_package",
        "category": "Impersonation",
        "type": "impersonation",
        "severity": "Medium",
        "weight": 20,
        "description": "Spoofs parcel and courier services (DHL, FedEx, USPS, UPS) claiming failed delivery or unpaid customs.",
        "patterns": [
            r"(?i)\b(?:package|parcel|shipment)\s+(?:delivery\s+(?:failed|delayed|pending|suspended)|cannot\s+be\s+delivered)\b",
            r"(?i)\b(?:usps|fedex|ups|dhl|royal\s+mail)\s+(?:tracking|notice|alert|reschedule)\b",
            r"(?i)\b(?:update\s+your\s+address\s+to\s+receive\s+your\s+parcel)\b",
            r"(?i)\b(?:pay\s+(?:customs|redelivery)\s+fee\s+of\s+\$?\d+)\b"
        ]
    },
    {
        "id": "impersonation_tech_support",
        "category": "Impersonation",
        "type": "impersonation",
        "severity": "High",
        "weight": 25,
        "description": "Spoofs technology giants (Microsoft, Apple, Geek Squad) claiming malware infection or expired subscriptions.",
        "patterns": [
            r"(?i)\b(?:microsoft|apple|geek\s+squad|norton|mcafee)\s+(?:support|security|alert|billing|renewal)\b",
            r"(?i)\b(?:your\s+computer\s+is\s+(?:infected|compromised)|virus\s+detected)\b",
            r"(?i)\b(?:call\s+(?:our\s+toll-free\s+number|help\s*desk|support)\s+at\s+[\+\d\-\(\)\s]{7,})\b",
            r"(?i)\b(?:auto[- ]renewal\s+of\s+\$?\d+[\d,]*\s+(?:charged|deducted))\b"
        ]
    },
    {
        "id": "impersonation_bank_tax",
        "category": "Impersonation",
        "type": "impersonation",
        "severity": "High",
        "weight": 26,
        "description": "Mimics official tax authorities (IRS, HMRC) or general banking alerts to intimidate.",
        "patterns": [
            r"(?i)\b(?:internal\s+revenue\s+service|irs|tax\s+refund|hmrc|department\s+of\s+revenue)\b",
            r"(?i)\b(?:fraud\s+prevention\s+department|central\s+bank|card\s+services)\b",
            r"(?i)\b(?:warrant\s+for\s+your\s+arrest|tax\s+evasion\s+notice)\b"
        ]
    },

    # --- Category: Coercion & Secrecy ---
    {
        "id": "coercion_secrecy",
        "category": "Coercion & Secrecy",
        "type": "social_engineering",
        "severity": "High",
        "weight": 24,
        "description": "Instructs recipient to keep the communication confidential or not consult relatives/bank officials.",
        "patterns": [
            r"(?i)\b(?:keep\s+this\s+(?:strictly\s+confidential|between\s+us|secret))\b",
            r"(?i)\b(?:do\s+not\s+(?:inform|tell|discuss\s+with)\s+(?:anyone|your\s+bank|your\s+family))\b",
            r"(?i)\b(?:discreet\s+transaction|strictly\s+private)\b"
        ]
    }
]


def analyze_text(text: str) -> List[Dict[str, Any]]:
    """
    Executes rule-based inspection on the input text.
    Returns a list of detected indicators with snippets and score impacts.
    """
    if not text or not text.strip():
        return []

    detected_indicators: List[Dict[str, Any]] = []
    seen_rule_ids = set()

    for rule in RULES:
        for pattern in rule["patterns"]:
            match = re.search(pattern, text)
            if match:
                if rule["id"] not in seen_rule_ids:
                    seen_rule_ids.add(rule["id"])
                    # Extract a localized snippet around the match
                    start = max(0, match.start() - 25)
                    end = min(len(text), match.end() + 25)
                    snippet = text[start:end].strip()
                    if start > 0:
                        snippet = "..." + snippet
                    if end < len(text):
                        snippet = snippet + "..."

                    detected_indicators.append({
                        "type": rule["type"],
                        "category": rule["category"],
                        "severity": rule["severity"],
                        "description": rule["description"],
                        "matched_phrase": snippet,
                        "score_impact": rule["weight"]
                    })
                break  # avoid multiple hits for same rule

    return detected_indicators
