import React, { useState } from 'react'
import {
  Lock,
  Unlock,
  AlertTriangle,
  Shield,
  ShieldAlert,
  Flame,
  Bug,
  Radio,
  User,
  KeyRound,
  CheckCircle2
} from 'lucide-react'

export default function SocTopRow({ onLaunchScanner, currentScanResult }) {
  const [username, setUsername] = useState('SecAdmin_01')
  const [password, setPassword] = useState('••••••••')
  const [authSuccess, setAuthSuccess] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setAuthSuccess(true)
    setTimeout(() => setAuthSuccess(false), 3000)
  }

  // Check if current scan detected threats
  const hasThreat = currentScanResult?.risk_level === 'High' || currentScanResult?.risk_level === 'Medium'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
      {/* 1. SYSTEM SECURE Concentric Circle Dial (cols 3) */}
      <div className="lg:col-span-3 hud-card rounded-md p-4 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="relative w-36 h-36 flex items-center justify-center my-1">
          {/* Outer dashed spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00f0ff]/40 animate-[spin_18s_linear_infinite]" />
          {/* Middle segmented ring */}
          <div className="absolute inset-2 rounded-full border border-[#00f0ff]/60 border-t-transparent border-b-transparent animate-[spin_10s_linear_infinite_reverse]" />
          {/* Inner glowing circle */}
          <div className="absolute inset-5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#00f0ff] glow-cyan" />
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="font-orbitron font-bold text-sm tracking-widest text-[#00f0ff] glow-cyan uppercase">
            SYSTEM SECURE
          </h3>
          <p className="text-[10px] font-mono text-cyan-400/70 tracking-wider">
            All protections active
          </p>
        </div>
      </div>

      {/* 2. THREAT DETECTED Red Alert Circle Dial (cols 3) */}
      <div
        className={`lg:col-span-3 rounded-md p-4 flex flex-col items-center justify-center relative overflow-hidden transition-all ${
          hasThreat ? 'hud-card-alert' : 'hud-card-alert bg-rose-950/20'
        }`}
      >
        <div className="relative w-36 h-36 flex items-center justify-center my-1">
          {/* Outer red dashed ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#ff1e3c]/50 animate-[spin_14s_linear_infinite]" />
          {/* Middle red ring */}
          <div className="absolute inset-2 rounded-full border border-[#ff1e3c]/70 border-l-transparent border-r-transparent animate-[spin_8s_linear_infinite_reverse]" />
          {/* Inner glowing red circle */}
          <div className="absolute inset-5 rounded-full bg-[#ff1e3c]/15 border border-[#ff1e3c] shadow-[0_0_25px_rgba(255,30,60,0.5)] flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[#ff1e3c] glow-red animate-pulse" />
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="font-orbitron font-bold text-sm tracking-widest text-[#ff1e3c] glow-red uppercase">
            THREAT DETECTED
          </h3>
          <p className="text-[10px] font-mono text-rose-400/70 tracking-wider">
            {hasThreat
              ? `${currentScanResult.risk_level} Risk: ${currentScanResult.indicators.length} Alert(s)`
              : 'Suspicious activity monitored'}
          </p>
        </div>
      </div>

      {/* 3. SCANNING 87% Dial & Bar (cols 2) */}
      <div className="lg:col-span-2 hud-card rounded-md p-3.5 flex flex-col items-center justify-between">
        <div className="relative w-28 h-28 flex items-center justify-center my-1">
          {/* Rotating arcs */}
          <div className="absolute inset-0 rounded-full border-2 border-[#00f0ff]/30 border-t-[#00f0ff] animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-teal-500/30 border-b-teal-400 animate-[spin_6s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full bg-cyan-950/40 border border-cyan-500/50 flex flex-col items-center justify-center text-center">
            <Shield className="w-5 h-5 text-[#00f0ff] mb-0.5" />
            <span className="text-[9px] font-orbitron text-cyan-300">SCANNING</span>
            <span className="text-xs font-mono font-bold text-[#00f0ff]">87%</span>
          </div>
        </div>

        {/* Horizontal glowing progress bar as in image */}
        <div className="w-full space-y-1 mt-1">
          <div className="h-2 w-full bg-cyan-950/80 rounded-xs overflow-hidden border border-cyan-500/30">
            <div className="h-full bg-gradient-to-r from-teal-400 to-[#00f0ff] w-[87%] shadow-[0_0_8px_#00f0ff]" />
          </div>
        </div>
      </div>

      {/* 4. FIREWALL STATUS / ANTIVIRUS / IDS EQUALIZERS (cols 2) */}
      <div className="lg:col-span-2 hud-card rounded-md p-3 flex flex-col justify-between space-y-2">
        {/* Firewall */}
        <div className="p-2 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-[10px] font-orbitron text-cyan-200">FIREWALL STATUS</p>
              <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                ACTIVE
              </p>
            </div>
          </div>
          {/* Animated Equalizer Soundwave */}
          <div className="flex items-end gap-0.5 h-4 w-12">
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-1" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-2" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-3" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-4" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-2" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-1" />
          </div>
        </div>

        {/* Antivirus */}
        <div className="p-2 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-[10px] font-orbitron text-cyan-200">ANTIVIRUS</p>
              <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                RUNNING
              </p>
            </div>
          </div>
          <div className="flex items-end gap-0.5 h-4 w-12">
            <span className="w-1 bg-cyan-400 rounded-xs animate-eq-3" />
            <span className="w-1 bg-cyan-400 rounded-xs animate-eq-1" />
            <span className="w-1 bg-cyan-400 rounded-xs animate-eq-4" />
            <span className="w-1 bg-cyan-400 rounded-xs animate-eq-2" />
            <span className="w-1 bg-cyan-400 rounded-xs animate-eq-3" />
          </div>
        </div>

        {/* Intrusion Detection */}
        <div className="p-2 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <div>
              <p className="text-[10px] font-orbitron text-cyan-200">INTRUSION DETECT</p>
              <p className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                MONITORING
              </p>
            </div>
          </div>
          <div className="flex items-end gap-0.5 h-4 w-12">
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-2" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-4" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-1" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-3" />
            <span className="w-1 bg-[#00f0ff] rounded-xs animate-eq-2" />
          </div>
        </div>
      </div>

      {/* 5. USER AUTHENTICATION / TERMINAL LOGIN (cols 2) */}
      <div className="lg:col-span-2 hud-card rounded-md p-3 flex flex-col justify-between space-y-2">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            USER AUTHENTICATION
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#00f0ff]" />
            </div>
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#020b18] border border-cyan-500/30 rounded px-2 py-0.5 text-[11px] font-mono text-cyan-200 focus:outline-none focus:border-[#00f0ff]"
                placeholder="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020b18] border border-cyan-500/30 rounded px-2 py-0.5 text-[11px] font-mono text-cyan-200 focus:outline-none focus:border-[#00f0ff]"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-1 rounded bg-[#051e3c] hover:bg-cyan-600 border border-[#00f0ff]/50 hover:border-[#00f0ff] text-[#00f0ff] hover:text-white font-orbitron text-xs font-bold tracking-widest uppercase transition shadow-[0_0_10px_rgba(0,240,255,0.2)] flex items-center justify-center gap-1.5"
          >
            {authSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">AUTHORIZED</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>LOGIN</span>
              </>
            )}
          </button>
        </form>

        <p className="text-[9px] font-mono text-center text-cyan-500/60">
          Multi-Factor Authentication
        </p>
      </div>
    </div>
  )
}
