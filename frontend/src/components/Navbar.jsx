import React from 'react'
import { Shield, History, Info, Sun, Moon } from 'lucide-react'

export default function Navbar({
  darkMode,
  setDarkMode,
  health,
  onOpenHistory,
  onOpenDocs,
  historyCount
}) {
  const isHealthy = health?.status === 'healthy'

  return (
    <header className="sticky top-0 z-40 border-b border-indigo-200/60 dark:border-indigo-900/40 bg-white/90 dark:bg-[#0c1222]/90 backdrop-blur-2xl transition-colors duration-300 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-fuchsia-600 shadow-md shadow-indigo-500/30 text-white font-bold shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-300 dark:via-blue-300 dark:to-fuchsia-400 bg-clip-text text-transparent">
                ShieldGuard
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs">
                AI ACTIVE
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-200 hidden sm:block">
              Phishing & Online Scam Detection Assistant
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Engine Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700 text-xs text-emerald-950 dark:text-emerald-300 font-black shadow-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthy
                  ? 'bg-emerald-600 shadow-[0_0_8px_#10b981]'
                  : 'bg-amber-400 animate-ping'
              }`}
            />
            <span>{isHealthy ? 'System Online' : 'Connecting...'}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 dark:from-slate-800 dark:to-slate-900 dark:hover:from-slate-700 dark:hover:to-slate-800 text-slate-950 dark:text-amber-300 border-2 border-amber-300 dark:border-slate-700 transition text-xs font-black shadow-xs cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden xs:inline font-bold">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-700" />
                <span className="hidden xs:inline font-bold">Dark</span>
              </>
            )}
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-950 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-800 text-xs font-black transition cursor-pointer shadow-xs"
            title="Scan History"
          >
            <History className="w-4 h-4 text-blue-700 dark:text-blue-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 bg-blue-700 text-white rounded-full text-[10px] font-black">
                {historyCount}
              </span>
            )}
          </button>

          {/* About / Help */}
          <button
            onClick={onOpenDocs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-950 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-800 text-xs font-black transition cursor-pointer shadow-xs"
            title="How It Works"
          >
            <Info className="w-4 h-4 text-purple-700 dark:text-purple-400" />
            <span className="hidden sm:inline">About</span>
          </button>
        </div>
      </div>
    </header>
  )
}
