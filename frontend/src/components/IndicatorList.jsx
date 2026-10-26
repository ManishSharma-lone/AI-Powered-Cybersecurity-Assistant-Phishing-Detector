import React from 'react'
import { AlertCircle, Zap, Shield, KeyRound, CreditCard, UserX } from 'lucide-react'

export default function IndicatorList({ indicators }) {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="color-card rounded-3xl p-6 sm:p-8 text-center border-2 border-emerald-300 dark:border-emerald-800">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 mb-2">
          <Shield className="w-6 h-6" />
        </div>
        <h4 className="text-base font-extrabold text-slate-950 dark:text-white">
          No Scam Patterns Found
        </h4>
        <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 max-w-md mx-auto">
          The analyzed text does not exhibit common phishing keywords like urgent threats, password requests, or fake fees.
        </p>
      </div>
    )
  }

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-600 text-white font-black'
      case 'High':
        return 'bg-red-600 text-white font-black'
      case 'Medium':
        return 'bg-amber-500 text-slate-950 font-black'
      default:
        return 'bg-slate-700 text-white font-bold'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Credential Harvesting':
      case 'Identity Harvesting':
        return KeyRound
      case 'Financial & Payment Demands':
        return CreditCard
      case 'Urgency & Deadlines':
        return Zap
      case 'Impersonation':
        return UserX
      default:
        return AlertCircle
    }
  }

  return (
    <div className="color-card rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-lg card-highlight overflow-hidden animate-fade-up">
      <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h3 className="font-black text-slate-950 dark:text-white text-lg">
            Detected Warning Signs ({indicators.length})
          </h3>
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-indigo-950 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-3 py-1 rounded-full border-2 border-indigo-300 dark:border-indigo-800">
          Detection Rules
        </span>
      </div>

      <div className="space-y-3.5">
        {indicators.map((ind, index) => {
          const Icon = getCategoryIcon(ind.category)
          return (
            <div
              key={index}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition space-y-3 shadow-xs animate-stagger"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-black text-slate-950 dark:text-white">
                    {ind.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-3 py-0.5 rounded-full shadow-xs ${getSeverityBadge(
                      ind.severity
                    )}`}
                  >
                    {ind.severity} Risk
                  </span>
                  <span className="text-xs font-mono font-black text-indigo-950 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border-2 border-indigo-300 dark:border-indigo-700">
                    +{ind.score_impact} pts
                  </span>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-950 dark:text-slate-100 leading-relaxed font-sans">
                {ind.description}
              </p>

              {ind.matched_phrase && (
                <div className="bg-amber-100/90 dark:bg-amber-950/60 rounded-xl px-4 py-3 border-2 border-amber-400 dark:border-amber-700">
                  <p className="text-xs sm:text-sm font-mono font-black text-amber-950 dark:text-amber-100 leading-relaxed">
                    <span className="text-amber-900 dark:text-amber-300 mr-2 uppercase font-black tracking-wider">Trigger Word:</span>
                    "{ind.matched_phrase}"
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
