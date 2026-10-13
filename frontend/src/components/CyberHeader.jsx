import React from 'react'
import { Shield, Radio, Terminal, History, Info, Zap } from 'lucide-react'

export default function CyberHeader({
  activeTab,
  setActiveTab,
  onOpenHistory,
  onOpenDocs,
  health,
  historyCount
}) {
  const isHealthy = health?.status === 'healthy'

  return (
    <header className="border-b border-cyan-500/20 bg-[#010612]/95 backdrop-blur-xl px-4 sm:px-6 py-2.5 relative z-40 select-none">
      <div className="max-w-[1780px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo Title as seen in Image */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <h1 className="text-xl sm:text-2xl font-black tracking-widest text-[#00f0ff] font-orbitron glow-cyan flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00f0ff] rounded-xs shadow-[0_0_10px_#00f0ff] animate-ping" />
              CYBER SECURITY
            </h1>
            <p className="text-[9px] font-mono tracking-[0.28em] text-cyan-400/60 uppercase">
              CYBER SECURITY // THREAT OPS COMMAND HUD
            </p>
          </div>
        </div>

        {/* Action Navigation: PROTECT, DETECT, RESPOND, SECURE from image */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {[
            { id: 'dashboard', label: 'PROTECT', sub: 'SOC HUD' },
            { id: 'scanner', label: 'DETECT', sub: 'AI SCANNER' },
            { id: 'analytics', label: 'RESPOND', sub: 'ANALYTICS' },
            { id: 'history', label: 'SECURE', sub: 'HISTORY LOG' }
          ].map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'history') onOpenHistory()
                  else setActiveTab(item.id)
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-sm font-orbitron text-xs sm:text-sm font-bold tracking-widest uppercase transition-all flex flex-col items-center border ${
                  isActive
                    ? 'border-[#00f0ff] bg-cyan-950/70 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'border-transparent text-cyan-400/60 hover:text-cyan-200 hover:bg-cyan-950/30'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[8px] font-mono text-cyan-500/50 tracking-normal">
                  {item.sub}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Engine status & docs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#030e22] border border-cyan-500/30 font-mono text-[11px] text-cyan-300">
            <span
              className={`w-2 h-2 rounded-full ${
                isHealthy
                  ? 'bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]'
                  : 'bg-amber-400 animate-ping'
              }`}
            />
            <span>{isHealthy ? 'SYS ONLINE' : 'CONNECTING'}</span>
            <span className="text-cyan-500/40">|</span>
            <span className="text-[#00f0ff] text-[10px]">LCEL AI ACTIVE</span>
          </div>

          <button
            onClick={onOpenDocs}
            className="p-1.5 rounded bg-[#030e22] hover:bg-[#07193b] border border-cyan-500/30 text-cyan-300 hover:text-[#00f0ff] transition"
            title="Architecture & Methodology"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
