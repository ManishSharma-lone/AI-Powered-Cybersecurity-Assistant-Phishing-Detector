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
import { Shield, Sparkles, AlertOctagon } from 'lucide-react'

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
        const res = await fetch('/api/health')
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
      const res = await fetch('/api/history')
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
  const handleAnalyze = async () => {
    if (!message.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
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

  const handleDeleteHistoryItem = async (id) => {
    try {
      const res = await fetch(`/api/history/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setHistory((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleClearHistory = async () => {
    try {
      const res = await fetch('/api/history', { method: 'DELETE' })
      if (res.ok) {
        setHistory([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/80 via-purple-50/90 to-blue-100/80 dark:from-[#070b14] dark:via-[#0c1222] dark:to-[#11192e] text-slate-950 dark:text-white flex flex-col relative transition-colors duration-500 font-sans selection:bg-indigo-500/30 selection:text-indigo-950 dark:selection:text-white">
      {/* Background Soft Vibrant Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-indigo-400/25 dark:bg-indigo-600/25 rounded-full blur-[140px] animate-ambient-glow" />
        <div className="absolute top-[25%] right-[-10%] w-[650px] h-[650px] bg-fuchsia-400/25 dark:bg-purple-600/25 rounded-full blur-[150px] animate-ambient-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[-10%] left-[10%] w-[550px] h-[550px] bg-cyan-400/30 dark:bg-cyan-500/20 rounded-full blur-[140px] animate-ambient-glow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        health={health}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10">
        {/* Friendly Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/80 dark:via-purple-950/80 dark:to-pink-950/80 border-2 border-indigo-300 dark:border-indigo-700/80 text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm font-extrabold shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI-Powered Cybersecurity Assistant & Phishing Detector</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.15]">
            Check Any Message or Link <br className="hidden xs:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Before It Tricks You
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed max-w-2xl mx-auto font-bold">
            Instantly evaluate suspicious emails, SMS alerts, fake job offers, or web links. Powered by intelligent security rules and natural language AI with zero privacy risks.
          </p>

          {/* Vibrant Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-300 text-xs font-black shadow-xs">
              ⚡ Instant Risk Score
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border-2 border-blue-300 dark:border-blue-700 text-blue-950 dark:text-blue-300 text-xs font-black shadow-xs">
              🔒 Safe Zero-Network URL Parser
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 border-2 border-purple-300 dark:border-purple-700 text-purple-950 dark:text-purple-300 text-xs font-black shadow-xs">
              🤖 AI Threat Explanations
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-300 text-xs font-black shadow-xs">
              🛡️ Actionable Defense Checklist
            </span>
          </div>
        </div>

        {/* Input Form Card with 1-Click Samples */}
        <MessageForm
          message={message}
          setMessage={setMessage}
          onAnalyze={handleAnalyze}
          loading={loading}
          enableLlm={enableLlm}
          setEnableLlm={setEnableLlm}
          saveHistory={saveHistory}
          setSaveHistory={setSaveHistory}
        />

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 flex items-start gap-3 text-sm shadow-sm">
            <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-rose-950 dark:text-rose-200">Analysis Error</p>
              <p className="text-xs text-rose-800 dark:text-rose-300 font-bold">{error}</p>
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

      {/* Footer */}
      <footer className="border-t-2 border-indigo-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#070b14]/80 backdrop-blur-md py-6 text-center text-xs relative z-10 mt-12 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-black text-slate-950 dark:text-white">
            <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>ShieldGuard AI — Smart Phishing & Scam Detection Assistant</span>
          </p>
          <p className="text-slate-900 dark:text-slate-300 font-extrabold">
            🔒 Safe Zero-Network Architecture • Privacy-Preserving Security
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
    </div>
  )
}
