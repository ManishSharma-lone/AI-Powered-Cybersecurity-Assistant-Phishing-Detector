import React from 'react'
import { Shield, History, Info, Sun, Moon, Zap } from 'lucide-react'

export default function Navbar({
  darkMode,
  setDarkMode,
  health,
  onOpenHistory,
  onOpenDocs,
  historyCount,
  activeTab = 'scanner',
  setActiveTab
}) {
  const isHealthy = health?.status === 'healthy'

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 dark:border-indigo-900/30 bg-white/80 dark:bg-[#060c1a]/90 backdrop-blur-2xl transition-all duration-300 shadow-lg shadow-indigo-500/5 dark:shadow-indigo-500/10">
      <div className="max-w-[1780px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-3 group shrink-0">
          {/* Animated Shield Icon */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/40 text-white shrink-0 overflow-hidden animate-neon-ring">
            <Shield className="w-5 h-5 text-white animate-shield relative z-10" />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight gradient-text-brand">
                ShieldGuard
              </span>
              <span className="hidden xs:flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white shadow-md shadow-indigo-500/30">
                <Zap className="w-2.5 h-2.5" />
                AI
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:block tracking-wide">
              Phishing &amp; Scam Detection Engine
            </p>
          </div>
        </div>

        {/* Center Mode Navigation */}
        {setActiveTab && (
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-slate-900/80 border border-slate-300/60 dark:border-indigo-900/50 backdrop-blur-md">
            {[
              { id: 'scanner', label: 'DETECT', sub: 'AI SCANNER' },
              { id: 'dashboard', label: 'PROTECT', sub: 'SOC HUD' },
              { id: 'analytics', label: 'RESPOND', sub: 'ANALYTICS' }
            ].map((t) => {
              const active = activeTab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{t.label}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-300/40 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {t.sub}
                  </span>
                </button>
              )
            })}
          </nav>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">

          {/* Engine Status Badge */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
            isHealthy
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 dark:text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400 dark:text-amber-300'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-amber-400 animate-ping'}`} />
            <span>{isHealthy ? 'System Online' : 'Connecting…'}</span>
          </div>

          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="btn-lift flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/60 shadow-sm"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* History Button */}
          <button
            id="history-btn"
            onClick={onOpenHistory}
            className="btn-lift flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50 shadow-sm"
            title="Scan History"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.5 bg-indigo-600 text-white rounded-full text-[9px] font-black leading-none">
                {historyCount}
              </span>
            )}
          </button>

          {/* Docs/About */}
          <button
            id="docs-btn"
            onClick={onOpenDocs}
            className="btn-lift flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50 shadow-sm"
            title="How It Works"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">About</span>
          </button>

        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    </header>
  )
}
