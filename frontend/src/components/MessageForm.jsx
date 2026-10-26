import React from 'react'
import {
  Send,
  Sparkles,
  Clipboard,
  Trash2,
  Database,
  ShieldAlert,
  Package,
  Briefcase,
  MailCheck,
  Zap
} from 'lucide-react'

const SAMPLE_MESSAGES = [
  {
    icon: ShieldAlert,
    title: 'Bank Security Alert',
    badge: 'Phishing Threat',
    bg: 'border-red-500 bg-gradient-to-br from-red-100 via-rose-50 to-orange-100 dark:from-red-950/60 dark:via-rose-950/40 dark:to-slate-900 text-red-950 dark:text-red-100 shadow-sm',
    badgeBg: 'bg-red-600 text-white',
    iconColor: 'text-red-600 dark:text-red-400',
    text: `SECURITY ALERT: Unauthorized access detected on your Chase account. Your account has been temporarily restricted. To restore access and prevent complete termination within 24 hours, click http://192.168.1.55/chase-security/login immediately and confirm your password and 6-digit OTP code.`
  },
  {
    icon: Package,
    title: 'Postal Delivery SMS',
    badge: 'Deceptive Link',
    bg: 'border-amber-500 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 dark:from-amber-950/60 dark:via-yellow-950/40 dark:to-slate-900 text-amber-950 dark:text-amber-100 shadow-sm',
    badgeBg: 'bg-amber-600 text-white',
    iconColor: 'text-amber-700 dark:text-amber-400',
    text: `USPS Final Notice: We could not deliver your package #US94029284 because the delivery address was missing information. Please update your details and pay the $2.85 customs clearance fee within 12 hours at https://usps-track-package.xyz/update or your parcel will be returned.`
  },
  {
    icon: Briefcase,
    title: 'Easy Remote Job',
    badge: 'Advance Fee Scam',
    bg: 'border-purple-500 bg-gradient-to-br from-purple-100 via-fuchsia-50 to-indigo-100 dark:from-purple-950/60 dark:via-fuchsia-950/40 dark:to-slate-900 text-purple-950 dark:text-purple-100 shadow-sm',
    badgeBg: 'bg-purple-600 text-white',
    iconColor: 'text-purple-700 dark:text-purple-400',
    text: `Congratulations! You have been selected for a remote data entry assistant position at Global Tech. Earn $850 per day working 2 hours from home. No experience needed. Guaranteed income. A refundable registration and equipment fee of $75 is required to reserve your equipment. Contact us at bit.ly/3instantJob`
  },
  {
    icon: MailCheck,
    title: 'Normal Meeting Email',
    badge: 'Safe Example',
    bg: 'border-emerald-500 bg-gradient-to-br from-emerald-100 via-teal-50 to-green-100 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-slate-900 text-emerald-950 dark:text-emerald-100 shadow-sm',
    badgeBg: 'bg-emerald-600 text-white',
    iconColor: 'text-emerald-700 dark:text-emerald-400',
    text: `Hi Alex, please find the quarterly sprint retrospective notes in our shared Google Drive folder. Let me know if you have any questions before tomorrow morning's 10:00 AM sync meeting. Best regards, Jordan.`
  }
]

export default function MessageForm({
  message,
  setMessage,
  onAnalyze,
  loading,
  enableLlm,
  setEnableLlm,
  saveHistory,
  setSaveHistory
}) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) setMessage(text)
    } catch {}
  }

  const handleClear = () => {
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim() || loading) return
    onAnalyze()
  }

  return (
    <div className="color-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border-2 border-indigo-300 dark:border-indigo-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 card-highlight">
      {/* Animated Scan Beam */}
      {loading && (
        <div className="absolute inset-x-0 top-0 h-1.5 loading-bar z-10 pointer-events-none" />
      )}

      {/* Header and 1-Click Samples */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 fill-indigo-500/20" />
              <span>Paste Suspicious Message or URL</span>
            </h2>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-200 mt-1">
              Test emails, SMS alerts, fake job offers, or suspicious web addresses
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs rounded-xl bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-950 dark:text-indigo-200 border-2 border-indigo-300 dark:border-indigo-700 font-extrabold transition shadow-xs cursor-pointer"
              title="Paste from clipboard"
            >
              <Clipboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Paste Text</span>
            </button>
            {message && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 text-rose-950 dark:text-rose-200 border-2 border-rose-300 dark:border-rose-700 font-extrabold transition shadow-xs cursor-pointer"
                title="Clear text"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* 1-Click Sample Chips with High Contrast & Colors */}
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white mb-2.5 flex items-center gap-1.5">
            <span>✨ Test with Real-World Sample Messages:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_MESSAGES.map((sample, idx) => {
              const Icon = sample.icon
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(sample.text)}
                  className={`text-left p-3.5 rounded-2xl border-2 transition flex flex-col justify-between cursor-pointer group shadow-sm hover:scale-[1.02] ${sample.bg}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 shrink-0 ${sample.iconColor}`} />
                    <p className="font-black text-sm leading-snug">
                      {sample.title}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${sample.badgeBg}`}>
                      {sample.badge}
                    </span>
                    <span className="text-xs font-black text-slate-950 dark:text-white group-hover:underline">
                      Load &gt;
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Textarea Form with Maximum Readability */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste suspicious text here... Example: 'Your bank account has been suspended! Click this link immediately and enter your password and OTP to unblock...'"
            rows={5}
            maxLength={15000}
            disabled={loading}
            className="w-full bg-slate-50 dark:bg-[#070c18] border-2 border-indigo-300 dark:border-indigo-800 rounded-2xl p-4 text-base font-bold text-slate-950 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-3 focus:ring-indigo-500/40 focus:border-indigo-600 transition resize-y leading-relaxed shadow-inner disabled:opacity-50"
          />
          <div className="flex justify-between items-center mt-2 px-1 text-xs font-black text-slate-900 dark:text-slate-200">
            <span>🛡️ Evaluated with 25+ Security Detection Rules + Safe URL Parser</span>
            <span>{message.length.toLocaleString()} / 15,000 characters</span>
          </div>
        </div>

        {/* Feature Switches and Giant Colorful Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t-2 border-indigo-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
            {/* AI Explanation Switch */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableLlm}
                onChange={(e) => setEnableLlm(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 relative"></div>
              <span className="flex items-center gap-1.5 font-black text-slate-950 dark:text-white">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                AI Threat Explanation
              </span>
            </label>

            {/* Local History Switch */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={saveHistory}
                onChange={(e) => setSaveHistory(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 relative"></div>
              <span className="flex items-center gap-1.5 font-black text-slate-950 dark:text-white">
                <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Save to Scan History
              </span>
            </label>
          </div>

          {/* Big Vibrant Radiant Analyze Button */}
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className={`spin-border w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2.5 shadow-xl ${
              !message.trim() || loading
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-700'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/40 hover:shadow-indigo-500/70 hover:shadow-2xl cursor-pointer active:scale-[0.98] animate-gradient-shift'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 rounded-full animate-spin" style={{border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white'}} />
                <span>Scanning Message...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Check for Scams Now</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
