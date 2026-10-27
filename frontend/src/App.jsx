import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MessageForm from './components/MessageForm'
import RiskResult from './components/RiskResult'
import IndicatorList from './components/IndicatorList'
import UrlInspector from './components/UrlInspector'
import AiExplanation from './components/AiExplanation'
import RecommendationList from './components/RecommendationList'
import HistoryModal from './components/HistoryModal'
import DocsModal from './components/DocsModal'
import SocTopRow from './components/SocTopRow'
import SocMiddleRow from './components/SocMiddleRow'
import SocBottomRow from './components/SocBottomRow'
import IncidentModal from './components/IncidentModal'
import { Shield, Sparkles, AlertOctagon } from 'lucide-react'

const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '')

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [health, setHealth] = useState(null)
  const [enableLlm, setEnableLlm] = useState(true)
  const [saveHistory, setSaveHistory] = useState(false)
  const [history, setHistory] = useState([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const [isIncidentOpen, setIsIncidentOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('scanner')

  // Sync dark / light theme to <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Fetch API Health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`)
        if (res.ok) {
          const data = await res.json()
          setHealth(data)
        }
      } catch (err) {
        console.warn('Backend connecting...', err)
      }
    }
    checkHealth()
    const timer = setInterval(checkHealth, 30000)
    return () => clearInterval(timer)
  }, [])

  // Fetch SQLite History
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`)
      if (res.ok) {
        const data = await res.json()
        setHistory(data)
      }
    } catch (err) {
      console.warn('History fetch error:', err)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  // Run Threat Analysis via FastAPI backend
  const handleAnalyze = async (overrideText = null) => {
    const textToScan = (typeof overrideText === 'string' ? overrideText : message).trim()
    if (!textToScan) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToScan,
          enable_llm: enableLlm,
          save_history: saveHistory
        })
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error (${response.status})`)
      }

      const data = await response.json()
      setResult(data)

      if (saveHistory) {
        fetchHistory()
      }
    } catch (err) {
      setError(err.message || 'Analysis failed. Please verify that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  // Load sample from blocked incident dossier directly into analyzer
  const handleLoadIncident = (sampleText) => {
    setMessage(sampleText)
    setActiveTab('scanner')
    handleAnalyze(sampleText)
  }

  const handleDeleteHistoryItem = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/history/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleClearHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`, { method: 'DELETE' })
      if (res.ok) {
        setHistory([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/60 to-purple-50/80 dark:from-[#050810] dark:via-[#080e1c] dark:to-[#0d1528] text-slate-950 dark:text-white flex flex-col relative transition-colors duration-500 font-sans selection:bg-indigo-500/30 selection:text-indigo-950 dark:selection:text-white">

      {/* Cyber Grid Overlay */}
      <div className="fixed inset-0 cyber-grid opacity-100 dark:opacity-60 pointer-events-none z-0" />

      {/* Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-16 w-[700px] h-[700px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[160px] animate-orb" />
        <div className="absolute top-[30%] -right-24 w-[600px] h-[600px] bg-violet-500/15 dark:bg-purple-600/20 rounded-full blur-[160px] animate-orb-slow" />
        <div className="absolute -bottom-32 left-[15%] w-[550px] h-[550px] bg-cyan-500/15 dark:bg-cyan-500/18 rounded-full blur-[140px] animate-orb-med" />
        {/* Floating particles */}
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-indigo-400/60 dark:bg-indigo-400/50" style={{'--dur':'9s','--delay':'0s'}} />
        <div className="particle absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-violet-400/60 dark:bg-violet-400/50" style={{'--dur':'12s','--delay':'2s'}} />
        <div className="particle absolute top-1/2 left-2/3 w-2 h-2 rounded-full bg-cyan-400/60 dark:bg-cyan-400/50" style={{'--dur':'8s','--delay':'4s'}} />
        <div className="particle absolute top-[15%] right-1/4 w-1.5 h-1.5 rounded-full bg-fuchsia-400/60 dark:bg-fuchsia-400/50" style={{'--dur':'11s','--delay':'1s'}} />
        <div className="particle absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-emerald-400/60 dark:bg-emerald-400/50" style={{'--dur':'14s','--delay':'3s'}} />
        <div className="particle absolute top-3/4 right-1/5 w-1.5 h-1.5 rounded-full bg-amber-400/60 dark:bg-amber-400/50" style={{'--dur':'10s','--delay':'5s'}} />
      </div>

      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        health={health}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        historyCount={history.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex items-center justify-center gap-1.5 p-2 bg-white/70 dark:bg-[#060c1a]/90 backdrop-blur-xl border-b border-indigo-200/40 dark:border-indigo-900/40 relative z-20">
        {[
          { id: 'scanner', label: 'DETECT' },
          { id: 'dashboard', label: 'PROTECT (HUD)' },
          { id: 'analytics', label: 'RESPOND' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
              activeTab === t.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── VIEW 1: CYBER SOC OPERATIONS HUD ── */}
      {activeTab === 'dashboard' && (
        <main className="flex-1 max-w-[1780px] w-full mx-auto px-3 sm:px-6 py-6 space-y-4 relative z-10 animate-fadeIn">
          {/* Header banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cyan-500/25">
            <div>
              <h2 className="font-orbitron font-bold text-lg sm:text-2xl text-[#00f0ff] glow-cyan tracking-wider flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-ping" />
                CYBER THREAT OPERATIONS // SOC HUD
              </h2>
              <p className="text-[11px] font-mono text-cyan-400/70 uppercase tracking-widest mt-0.5">
                Zero-Trust Defensive Perimeter &bull; Live Telemetry Feed &bull; Heuristics Core
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('scanner')}
                className="px-4 py-2 rounded bg-cyan-950/80 hover:bg-[#00f0ff] hover:text-slate-950 border border-[#00f0ff] text-[#00f0ff] font-orbitron text-xs font-bold tracking-wider uppercase transition shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                + Launch AI Threat Scanner
              </button>
            </div>
          </div>

          <SocTopRow
            onLaunchScanner={() => setActiveTab('scanner')}
            currentScanResult={result}
          />
          <SocMiddleRow />
          <SocBottomRow
            onOpenScanner={() => setActiveTab('scanner')}
            onOpenIncidentModal={() => setIsIncidentOpen(true)}
          />
        </main>
      )}

      {/* ── VIEW 2: GLOBAL THREAT ANALYTICS ── */}
      {activeTab === 'analytics' && (
        <main className="flex-1 max-w-[1780px] w-full mx-auto px-3 sm:px-6 py-6 space-y-4 relative z-10 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-500/25">
            <div>
              <h2 className="font-orbitron font-bold text-lg sm:text-2xl text-purple-400 tracking-wider flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7] animate-ping" />
                GLOBAL THREAT INTELLIGENCE &bull; ANALYTICS
              </h2>
              <p className="text-[11px] font-mono text-purple-300/70 uppercase tracking-widest mt-0.5">
                Attack Vectors &bull; Resource Telemetry &bull; Real-Time Radar
              </p>
            </div>
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-4 py-2 rounded bg-purple-950/80 hover:bg-purple-600 hover:text-white border border-purple-500 text-purple-200 font-orbitron text-xs font-bold tracking-wider uppercase transition shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
            >
              Analyze Suspicious Message
            </button>
          </div>

          <SocMiddleRow />
          <SocBottomRow
            onOpenScanner={() => setActiveTab('scanner')}
            onOpenIncidentModal={() => setIsIncidentOpen(true)}
          />
        </main>
      )}

      {/* ── VIEW 3: AI SCANNER & PHISHING DETECTOR ── */}
      {activeTab === 'scanner' && (
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-7 sm:space-y-10 relative z-10 animate-fadeIn">

          {/* ── Hero Banner ── */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">

            {/* Animated badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-400/30 dark:border-indigo-400/25 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-sparkle" />
              <span>AI-Powered Cybersecurity &amp; Phishing Detection</span>
            </div>

            {/* Main heading */}
            <h1 className="animate-fade-up-d1 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="block text-slate-900 dark:text-white mb-1">Detect Every Scam &amp;</span>
              <span className="gradient-text-hero">Phishing Attack</span>
            </h1>

            <p className="animate-fade-up-d2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
              Instantly analyze suspicious emails, SMS, fake job offers, and malicious links with AI-powered threat intelligence. Zero data leaks — 100% private.
            </p>

            {/* Feature pills with bounce-in */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <span className="animate-bounce-in inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/18 border border-emerald-500/35 text-emerald-700 dark:text-emerald-300 text-xs font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                ⚡ Instant Risk Score
              </span>
              <span className="animate-bounce-in-d1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/18 border border-blue-500/35 text-blue-700 dark:text-blue-300 text-xs font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                🔒 Zero-Network URL Parser
              </span>
              <span className="animate-bounce-in-d2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-500/10 dark:bg-violet-500/18 border border-violet-500/35 text-violet-700 dark:text-violet-300 text-xs font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                🤖 AI Threat Explanations
              </span>
              <span className="animate-bounce-in-d3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/18 border border-amber-500/35 text-amber-700 dark:text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
                🛡️ Defense Checklist
              </span>
            </div>

            {/* Live stats bar */}
            <div className="animate-fade-up-d3 stats-bar rounded-2xl px-6 py-3 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><span className="text-indigo-500">✦</span> 25+ Detection Rules</span>
              <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
              <span className="flex items-center gap-1.5"><span className="text-violet-500">✦</span> 0ms Network Calls for URLs</span>
              <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
              <span className="flex items-center gap-1.5"><span className="text-cyan-500">✦</span> LLM-Powered Explanations</span>
            </div>
          </div>

          {/* Input Form Card */}
          <div className="animate-fade-up-d3">
            <MessageForm
              message={message}
              setMessage={setMessage}
              onAnalyze={() => handleAnalyze()}
              loading={loading}
              enableLlm={enableLlm}
              setEnableLlm={setEnableLlm}
              saveHistory={saveHistory}
              setSaveHistory={setSaveHistory}
            />
          </div>

          {/* Error Alert */}
          {error && (
            <div className="animate-fade-up flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-950/50 border border-rose-400/40 dark:border-rose-700/50 text-rose-700 dark:text-rose-300 text-sm backdrop-blur-sm shadow-lg">
              <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-800 dark:text-rose-200">Analysis Error</p>
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Dynamic Analysis Results */}
          {result && (
            <div className="space-y-6 pt-2 animate-fadeIn">
              {/* 1. Score & Risk Level Gauge */}
              <RiskResult result={result} />

              {/* 2. Detected Indicators & Structural URL Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <IndicatorList indicators={result.indicators} />
                <UrlInspector urls={result.urls} />
              </div>

              {/* 3. Plain English AI Explanation */}
              <AiExplanation
                explanation={result.explanation}
                llmUsed={result.llm_used}
                llmProvider={result.llm_provider}
              />

              {/* 4. Actionable Next Steps Checklist */}
              <RecommendationList
                recommendations={result.recommendations}
                disclaimer={result.disclaimer}
              />
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-8 border-t border-white/10 dark:border-indigo-900/20 bg-white/50 dark:bg-[#050810]/70 backdrop-blur-xl py-8 text-xs">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-400">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span>ShieldGuard AI &mdash; Phishing &amp; Scam Detection</span>
          </p>
          <p className="text-slate-400 dark:text-slate-500">
            🔒 Zero-Network Architecture &bull; Privacy-First Security
          </p>
        </div>
      </footer>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectSnippet={(snippet) => setMessage(snippet)}
        onDeleteItem={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
      />

      {/* How It Works Modal */}
      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Blocked Intrusion Incident Modal */}
      <IncidentModal
        isOpen={isIncidentOpen}
        onClose={() => setIsIncidentOpen(false)}
        onLoadIncidentToScanner={handleLoadIncident}
      />
    </div>
  )
}
