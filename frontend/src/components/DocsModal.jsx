import React from 'react'
import { X, Shield, Cpu, Lock, Code2, CheckCircle2 } from 'lucide-react'

export default function DocsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="color-card animate-modal-in w-full max-w-3xl rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[85vh] flex flex-col bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800 card-highlight overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-950 dark:text-white text-lg">
                About ShieldGuard AI
              </h3>
              <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                Multi-Layered Detection Architecture & Privacy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto space-y-4 pr-1 text-sm text-slate-950 dark:text-slate-200 leading-relaxed flex-1">
          <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-slate-800/80 border-2 border-indigo-200 dark:border-indigo-800/80 space-y-3">
            <h4 className="font-black text-slate-950 dark:text-white text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Multi-Layered Detection Engine</span>
            </h4>
            <p className="font-bold text-slate-900 dark:text-slate-200 text-xs sm:text-sm">
              ShieldGuard AI evaluates incoming text and web links through 3 distinct defensive layers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-slate-700 shadow-xs">
                <p className="font-black text-indigo-600 dark:text-indigo-400 text-sm mb-1">1. Rule Engine</p>
                <p className="text-xs text-slate-900 dark:text-slate-200 font-bold">
                  Detects urgency, fake OTP/passwords, advance fees, and brand impersonation patterns.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-slate-700 shadow-xs">
                <p className="font-black text-purple-600 dark:text-purple-400 text-sm mb-1">2. URL Inspector</p>
                <p className="text-xs text-slate-900 dark:text-slate-200 font-bold">
                  Parses URLs technically for raw IP hosts, typosquatting, shorteners, and risky TLDs safely.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-slate-700 shadow-xs">
                <p className="font-black text-emerald-600 dark:text-emerald-400 text-sm mb-1">3. AI Security Intelligence</p>
                <p className="text-xs text-slate-900 dark:text-slate-200 font-bold">
                  Generates plain English summaries and threat explanations with prompt-injection defense.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border-2 border-emerald-200 dark:border-emerald-800/80 space-y-3">
            <h4 className="font-black text-slate-950 dark:text-white text-base flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Zero-Trust Privacy & Security Safeguards</span>
            </h4>
            <ul className="space-y-2 text-slate-950 dark:text-slate-200 text-xs sm:text-sm font-bold">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero-network URL safety:</strong> URLs are evaluated syntactically; the server never requests the destination target.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No mandatory data storage:</strong> By default, submitted messages are discarded immediately after analysis.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Prompt injection guarded:</strong> Submitted content is securely isolated within protected boundary delimiters.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border-2 border-slate-300 dark:border-slate-700">
            <h4 className="font-black text-slate-950 dark:text-white text-xs sm:text-sm flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Core Detection Capabilities</span>
            </h4>
            <p className="text-slate-900 dark:text-slate-200 text-xs mt-1 font-bold">
              Deterministic Regex Pattern Matching • Safe Syntactic URL Parser • Calibrated 0–100 Risk Engine • Actionable Defensive Precautions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
