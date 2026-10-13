import React from 'react'
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Cpu,
  Layers,
  Link2
} from 'lucide-react'

export default function RiskResult({ result }) {
  if (!result) return null

  const {
    risk_level,
    risk_score,
    summary,
    indicators,
    urls,
    processing_time_ms,
    llm_used,
    llm_provider
  } = result

  const isHigh = risk_level === 'High'
  const isMed = risk_level === 'Medium'

  const theme = isHigh
    ? {
        cardBg: 'bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 dark:from-rose-950/80 dark:via-red-950/60 dark:to-slate-900 border-2 border-red-400 dark:border-red-500 shadow-xl shadow-red-500/10',
        badge: 'bg-red-600 text-white shadow-md shadow-red-600/30',
        color: '#ef4444',
        trackColor: darkMode => darkMode ? '#3f1118' : '#fee2e2',
        icon: ShieldAlert,
        title: '🚨 HIGH RISK — PHISHING OR SCAM DETECTED'
      }
    : isMed
    ? {
        cardBg: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/80 dark:via-yellow-950/60 dark:to-slate-900 border-2 border-amber-400 dark:border-amber-500 shadow-xl shadow-amber-500/10',
        badge: 'bg-amber-600 text-white shadow-md shadow-amber-600/30',
        color: '#f59e0b',
        trackColor: darkMode => darkMode ? '#3c2409' : '#fef3c7',
        icon: AlertTriangle,
        title: '⚠️ MEDIUM RISK — SUSPICIOUS SIGNS FOUND'
      }
    : {
        cardBg: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/80 dark:via-teal-950/60 dark:to-slate-900 border-2 border-emerald-400 dark:border-emerald-500 shadow-xl shadow-emerald-500/10',
        badge: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30',
        color: '#10b981',
        trackColor: darkMode => darkMode ? '#063024' : '#d1fae5',
        icon: ShieldCheck,
        title: '✅ LOW RISK — MESSAGE APPEARS SAFE'
      }

  const Icon = theme.icon
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (risk_score / 100) * circumference

  return (
    <div className={`rounded-3xl p-6 sm:p-8 ${theme.cardBg} transition-all`}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Animated Radial Score Gauge */}
        <div className="relative flex flex-col items-center justify-center shrink-0">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-black/10 dark:stroke-white/10"
                strokeWidth="14"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={theme.color}
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1s ease-out'
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white font-mono tracking-tight">
                {risk_score}
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-200">
                SCORE / 100
              </span>
            </div>
          </div>
        </div>

        {/* Verdict Details & Explanations with High Contrast */}
        <div className="flex-1 text-center md:text-left space-y-3.5">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide ${theme.badge}`}
            >
              <Icon className="w-4 h-4" />
              <span>{theme.title}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight leading-snug">
            {summary}
          </h3>

          <p className="text-sm font-bold text-slate-950 dark:text-slate-100 leading-relaxed max-w-2xl">
            {isHigh &&
              'Critical red flags detected: This message demands immediate urgency, requests passwords or verification codes, or points to an unauthorized link.'}
            {isMed &&
              'Potential warning signs detected: This message uses manipulative phrasing or links that warrant independent verification before taking any action.'}
            {!isHigh && !isMed &&
              'No obvious automated phishing or scam patterns detected. However, always exercise normal caution with unexpected attachments or links.'}
          </p>

          {/* Key Facts Colorful Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs font-black">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-950 dark:text-indigo-200 border-2 border-indigo-300 dark:border-indigo-800 shadow-xs">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{indicators.length} Warning Indicators</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-800 shadow-xs">
              <Link2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{urls.length} Links Inspected</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-950 dark:text-teal-200 border-2 border-teal-300 dark:border-teal-800 shadow-xs font-mono">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{processing_time_ms} ms</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-950 dark:text-fuchsia-200 border-2 border-fuchsia-300 dark:border-fuchsia-800 shadow-xs">
              <Cpu className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
              <span className="truncate max-w-[200px]">
                {llm_used ? 'AI Security Engine' : 'Heuristic Rules Engine'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
