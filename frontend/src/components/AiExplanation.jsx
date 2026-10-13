import React, { useState } from 'react'
import { Sparkles, Copy, Check, Info } from 'lucide-react'

export default function AiExplanation({ explanation, llmUsed, llmProvider }) {
  const [copied, setCopied] = useState(false)

  if (!explanation) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="color-card rounded-3xl p-6 sm:p-8 space-y-4 border-2 border-indigo-300 dark:border-indigo-800/80 shadow-xl relative overflow-hidden bg-white dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-indigo-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-950 dark:text-white text-lg tracking-tight">
              AI Security Explanation
            </h3>
            <p className="text-xs font-black text-indigo-950 dark:text-indigo-300">
              Plain English Analysis of Identified Risks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-950 dark:text-indigo-200 border-2 border-indigo-300 dark:border-indigo-700 text-xs font-black shadow-xs">
            {llmUsed ? 'AI Threat Intelligence' : 'Heuristic Rules Engine'}
          </span>

          <button
            onClick={handleCopy}
            className="p-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-950 dark:text-white border-2 border-slate-300 dark:border-slate-700 text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            title="Copy explanation"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950/80 rounded-2xl p-5 sm:p-6 border-2 border-indigo-300 dark:border-indigo-900 shadow-inner">
        <p className="text-sm sm:text-base text-slate-950 dark:text-slate-50 leading-relaxed whitespace-pre-line font-bold font-sans">
          {explanation}
        </p>
      </div>

      <p className="text-xs text-slate-900 dark:text-slate-200 flex items-center gap-2 font-black pt-1">
        <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span>Generated for defensive awareness. Never send credentials, click unverified links, or transfer money.</span>
      </p>
    </div>
  )
}
