# ShieldGuard AI — AI-Powered Phishing and Scam Detection Assistant

A modern, full-stack cybersecurity application designed to evaluate suspicious messages, emails, SMS notices, fake job offers, and deceptive URLs using **multi-layered heuristic analysis**, **zero-network safe URL inspection**, and **LLM-powered security explanations**.

---

## 🌟 Key Highlights & Features

- **100% Free & Open-Source Stack**: No mandatory paid APIs or threat intelligence subscriptions.
- **LangChain Expression Language (LCEL)**: Uses LangChain's `ChatPromptTemplate`, `ChatGroq`, and `StrOutputParser` pipeline with prompt-injection defenses and an automatic offline fallback to a **built-in Heuristic Analysis Engine**.
- **Zero-Network Safe URL Inspection**: Parses URLs mathematically using `urllib.parse` and `ipaddress` without initiating outbound HTTP connections, eliminating server-side request forgery (SSRF) and malware infection risks.
- **Behavioral Scam Indicators**: Flags urgent deadlines, credential harvesting (passwords, OTPs, PINs), gift card/crypto advance fees, fake job offers, and authority impersonation (banks, postal services, tax agencies).
- **Calibrated Risk Gauge**: Animated radial score meter (0 to 100) mapped to **Low**, **Medium**, and **High** threat levels.
- **Interactive Defensive Checklist**: Check off recommended safety actions with celebratory completion rewards.
- **Privacy First (FR-12)**: Zero full message body retention by default; optional privacy-preserving SQLite scan history with full deletion controls.
- **One-Click Synthetic Test Scenarios**: Instant presets for Bank Suspension, Delivery Parcel Scams, Remote Job Traps, and Legitimate Team Emails.

---

## 🏗️ Architecture Overview

```
                      ┌─────────────────────────────────────────┐
                      │          React.js + Vite Frontend       │
                      │       Tailwind CSS + Lucide Icons       │
                      └────────────────────┬────────────────────┘
                                           │ HTTP POST /api/analyze
                                           ▼
                      ┌─────────────────────────────────────────┐
                      │             FastAPI Backend             │
                      │         Input Validation (Pydantic)     │
                      └───────┬─────────────────────────┬───────┘
                              │                         │
            ┌─────────────────▼────────┐      ┌─────────▼────────────────┐
            │   Text Rules Engine      │      │    Safe URL Inspector    │
            │  Regex & Behavioral Scam │      │   Structural & TLD flags │
            │       Indicators         │      │   Zero Outbound Requests │
            └─────────────────┬────────┘      └─────────┬────────────────┘
                              │                         │
                              └───────────┬─────────────┘
                                          ▼
                      ┌─────────────────────────────────────────┐
                      │          Risk Assessment Engine         │
                      │       Score Calculation & Thresholds    │
                      └───────────────────┬─────────────────────┘
                                          │
                 ┌────────────────────────┴────────────────────────┐
                 ▼                                                 ▼
     ┌───────────────────────┐                         ┌───────────────────────┐
     │     LangChain LCEL    │                         │ Local Heuristic Engine│
     │ Prompt | Groq | Parser│  [Fallback / Offline]   │ Offline Safe Generator│
     │   (llama-3.3-70b)     │ ◄─────────────────────► │                       │
     └───────────────────────┘                         └───────────────────────┘
                                          │
                                          ▼
                      ┌─────────────────────────────────────────┐
                      │    Optional SQLite History (Opt-In)     │
                      └─────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.10+** (Tested on Python 3.13)
- **Node.js 18+** (Tested on Node.js v22)

---

### 1. Backend Setup

Open a terminal in the project root:

```bash
cd backend

# Create and activate Python virtual environment
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# macOS / Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Add your Groq API Key in .env for Cloud LLM
# Copy .env.example to .env and set:
# GROQ_API_KEY=gsk_...
# Note: If left empty, the built-in Heuristic Engine runs 100% offline!

# Start the FastAPI server
uvicorn main:app --reload --port 8000
```

The backend interactive documentation will be accessible at:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check**: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

---

### 2. Frontend Setup

Open a new terminal in the project root:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open your browser at:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

### 3. Running Automated Tests

Run the backend Pytest test suite:

```bash
cd backend
.\venv\Scripts\python -m pytest -v
```

All 16 unit and API integration tests will run:
- Urgency and deadline detection
- Credential harvesting pattern tests
- Gift card and cryptocurrency extortion tests
- URL extraction and IP address detection
- Typosquatting and suspicious TLD tests
- API health check, empty input rejection, and history flows

---

## 🔒 Security & Privacy Practices

1. **Anti-Prompt Injection**: Message text sent to the LLM is isolated inside `<UNTRUSTED_CONTENT>` tags with strict system constraints instructing the model to treat the content solely as inert data.
2. **Safe Structural Inspection**: No network connections are made to the URLs found in messages. URLs are analyzed purely through syntactic rules (TLDs, subdomains, IP host patterns, brand keywords).
3. **Privacy Retention (FR-12)**: By default, full message bodies are not written to disk or database. Only when the user enables "Save to History" is a truncated 80-character snippet and score logged in local SQLite. Users can delete individual records or clear all history with a single click.

---

## 📜 License & Disclaimer
This tool is created for educational and security-awareness purposes. Heuristic scores represent rule-based indicators and do not provide absolute guarantees of message authenticity or malice. Always independently verify unexpected communications with official organizations.
