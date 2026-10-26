import React, { useState } from 'react'
import { ShieldCheck, CheckCircle2, AlertTriangle, Copy, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function RecommendationList({ recommendations, disclaimer }) {
  const [checkedItems, setCheckedItems] = useState({})
  const [copied, setCopied] = useState(false)

  if (!recommendations || recommendations.length === 0) return null

  const toggleCheck = (idx) => {
    const updated = { ...checkedItems, [idx]: !checkedItems[idx] }
    setCheckedItems(updated)

    if (recommendations.every((_, i) => updated[i])) {
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } })
      } catch {}
    }
  }

  const handleCopy = () => {
    const text = recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="color-card rounded-3xl p-6 sm:p-8 space-y-5 border-2 border-emerald-300 dark:border-emerald-800/80 shadow-xl bg-white dark:bg-slate-900 card-highlight overflow-hidden animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-emerald-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-950 dark:text-white text-lg tracking-tight">
              Action Plan & Safety Checklist
            </h3>
            <p className="text-xs font-black text-emerald-950 dark:text-emerald-300">
              Immediate Steps to Protect Your Account & Money
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-950 dark:text-white border-2 border-slate-300 dark:border-slate-700 text-xs font-black transition cursor-pointer shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Copy Checklist</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs sm:text-sm font-black text-slate-950 dark:text-slate-100">
        Click each defensive precaution below as you complete it:
      </p>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const isDone = !!checkedItems[index]
          return (
            <div
              key={index}
              onClick={() => toggleCheck(index)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 select-none shadow-xs hover:scale-[1.01] animate-stagger ${
                isDone
                  ? 'bg-emerald-100/90 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 opacity-80'
                  : 'bg-white dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500'
              }`}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div
                className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border-2 transition ${
                  isDone
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 text-transparent'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              </div>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDone
                    ? 'line-through text-slate-600 dark:text-slate-400 font-semibold'
                    : 'text-slate-950 dark:text-white font-black'
                }`}
              >
                {rec}
              </p>
            </div>
          )
        })}
      </div>

      {disclaimer && (
        <div className="mt-4 p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-black">
            <strong className="text-amber-900 dark:text-amber-300 uppercase tracking-wide mr-1.5">Notice:</strong> {disclaimer}
          </p>
        </div>
      )}
    </div>
  )
}
