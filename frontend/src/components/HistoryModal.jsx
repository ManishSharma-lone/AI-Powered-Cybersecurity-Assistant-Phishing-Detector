import React from 'react'
import { X, Trash2, History, ArrowRight } from 'lucide-react'

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onSelectSnippet,
  onDeleteItem,
  onClearAll
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="color-card w-full max-w-2xl rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl max-h-[85vh] flex flex-col bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-950 dark:text-white text-lg">
                Saved Scan History
              </h3>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-200">
                Locally stored scan results
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 text-xs rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700 transition flex items-center gap-1.5 font-bold cursor-pointer"
                title="Clear all saved scans"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs font-bold text-slate-900 dark:text-slate-200 shrink-0">
          🔒 Only truncated summaries and risk scores are kept on your device for maximum privacy.
        </p>

        {/* History List */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-950 dark:text-slate-200 text-sm font-black">
              No saved scans found. Turn on "Save to Scan History" when analyzing messages.
            </div>
          ) : (
            history.map((item) => {
              const isHigh = item.risk_level === 'High'
              const isMed = item.risk_level === 'Medium'

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border-2 border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition flex items-center justify-between gap-3.5 shadow-xs"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                          isHigh
                            ? 'bg-red-600 text-white'
                            : isMed
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {item.risk_level} ({item.risk_score}/100)
                      </span>
                      <span className="text-xs text-slate-800 dark:text-slate-300 font-mono font-bold">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-sm text-slate-950 dark:text-white font-mono font-bold truncate">
                      "{item.snippet}"
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-900 dark:text-slate-200 font-bold">
                      <span className="text-indigo-900 dark:text-indigo-400 font-black">{item.indicator_count} indicators</span>
                      <span>•</span>
                      <span className="text-purple-900 dark:text-purple-400 font-black">{item.url_count} links</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onSelectSnippet(item.snippet)
                        onClose()
                      }}
                      className="px-3 py-1.5 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                      title="Load into scanner"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
