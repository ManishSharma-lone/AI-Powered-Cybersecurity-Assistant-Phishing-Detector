import React from 'react'
import {
  Link2,
  Lock,
  Unlock,
  AlertTriangle,
  Server,
  Globe,
  Flag
} from 'lucide-react'

export default function UrlInspector({ urls }) {
  if (!urls || urls.length === 0) return null

  return (
    <div className="color-card rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-indigo-200 dark:border-indigo-900/60 shadow-lg card-highlight overflow-hidden animate-fade-up">
      <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-black text-slate-950 dark:text-white text-lg">
            Links Checked in Message ({urls.length})
          </h3>
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-purple-950 dark:text-purple-200 bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-full border-2 border-purple-300 dark:border-purple-800">
          Zero-Network Parser
        </span>
      </div>

      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
        Web addresses are inspected structurally without opening them, protecting you from malicious servers.
      </p>

      <div className="space-y-3.5">
        {urls.map((item, index) => {
          const isHighRisk = item.risk_score >= 35

          return (
            <div
              key={index}
              className={`p-4 rounded-2xl border-2 transition space-y-3 shadow-xs animate-stagger ${
                isHighRisk
                  ? 'bg-rose-50/90 dark:bg-rose-950/40 border-red-500 dark:border-red-500/80'
                  : 'bg-white dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {item.is_https ? (
                    <span className="p-1.5 rounded-lg bg-emerald-600 text-white font-bold shrink-0" title="Secure HTTPS">
                      <Lock className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="p-1.5 rounded-lg bg-red-600 text-white font-bold shrink-0" title="Insecure HTTP">
                      <Unlock className="w-4 h-4" />
                    </span>
                  )}
                  <span className="text-sm font-mono font-black text-slate-950 dark:text-white truncate">
                    {item.url}
                  </span>
                </div>

                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full font-black shadow-xs ${
                    item.risk_score >= 40
                      ? 'bg-red-600 text-white'
                      : item.risk_score >= 20
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  RISK: {item.risk_score}/100
                </span>
              </div>

              {/* Colorful Technical Property Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white border-2 border-slate-300 dark:border-slate-700 font-black">
                  <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Host: {item.domain}</span>
                </div>

                {item.is_ip_address && (
                  <div className="px-3 py-1 rounded-xl bg-red-600 text-white font-black shadow-xs">
                    ⚠️ Raw IP Host (Dangerous)
                  </div>
                )}

                {item.has_typosquatting && (
                  <div className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-black shadow-xs">
                    🚨 Fake Brand Impersonation
                  </div>
                )}

                {item.has_suspicious_tld && (
                  <div className="px-3 py-1 rounded-xl bg-orange-600 text-white font-black shadow-xs">
                    🚩 High-Risk Extension
                  </div>
                )}

                {item.is_shortener && (
                  <div className="px-3 py-1 rounded-xl bg-purple-600 text-white font-black shadow-xs">
                    🔗 Hidden Shortener Link
                  </div>
                )}
              </div>

              {/* Specific Warnings List */}
              {item.flags && item.flags.length > 0 && (
                <div className="pt-2 border-t-2 border-red-200 dark:border-red-900/60 space-y-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-red-900 dark:text-red-400">
                    Why this link is dangerous:
                  </span>
                  <ul className="space-y-1">
                    {item.flags.map((flag, fIdx) => (
                      <li key={fIdx} className="text-xs text-red-950 dark:text-red-200 font-black flex items-start gap-1.5">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
