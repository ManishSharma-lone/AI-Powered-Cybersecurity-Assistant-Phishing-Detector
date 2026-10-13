import React from 'react'
import {
  Lock,
  Search,
  Globe2,
  Fingerprint,
  Radio,
  ArrowUp,
  ArrowDown,
  Skull,
  Mail,
  ShieldAlert,
  Server,
  FileCheck,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react'

export default function SocBottomRow({ onOpenScanner, onOpenIncidentModal }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
      {/* 1. DATA ENCRYPTION & FILE SCANNING (cols 3) */}
      <div className="lg:col-span-3 hud-card rounded-md p-3.5 flex flex-col justify-between space-y-3">
        {/* Data Encryption Module */}
        <div className="space-y-1.5 pb-2 border-b border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
                DATA ENCRYPTION
              </p>
              <p className="text-[9px] font-mono text-cyan-400/60 uppercase">SECURE YOUR DATA</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-[#00f0ff]">
              AES-256
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="p-2 rounded bg-[#020b18] border border-cyan-500/30 text-[#00f0ff]">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-cyan-300">
                <span>Encrypting files...</span>
                <span>49%</span>
              </div>
              <div className="h-2 w-full bg-cyan-950/80 rounded-xs overflow-hidden border border-cyan-500/20">
                <div className="h-full bg-gradient-to-r from-teal-400 to-[#00f0ff] w-[49%]" />
              </div>
              <p className="text-[8px] font-mono text-cyan-500/50">Securing sensitive information</p>
            </div>
          </div>
        </div>

        {/* File Scanning Module */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
                FILE SCANNING
              </p>
              <p className="text-[9px] font-mono text-cyan-400/60 uppercase">SCAN FOR THREATS</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
              1,201 files
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="p-2 rounded bg-[#020b18] border border-cyan-500/30 text-cyan-400">
              <Search className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-cyan-300">
                <span className="truncate max-w-[120px]">Scanning... C:\Project\</span>
                <span>13%</span>
              </div>
              <div className="h-2 w-full bg-cyan-950/80 rounded-xs overflow-hidden border border-cyan-500/20">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[13%]" />
              </div>
              <p className="text-[8px] font-mono text-cyan-500/50">Checking for malware and threats</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECURE CONNECTION Globe (cols 2) */}
      <div className="lg:col-span-2 hud-card rounded-md p-3.5 flex flex-col justify-between items-center text-center">
        <div className="w-full flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            SECURE CONNECTION
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        {/* Wireframe Rotating Globe Graphic */}
        <div className="relative w-24 h-24 my-2 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#00f0ff]/50 animate-[spin_8s_linear_infinite_reverse]" />
          <Globe2 className="w-14 h-14 text-[#00f0ff] glow-cyan animate-pulse" />
        </div>

        <div className="space-y-2 w-full">
          <div>
            <p className="text-[11px] font-mono text-cyan-200">VPN Connected...</p>
            <p className="text-[10px] font-mono text-cyan-400/70">192.168.10.24</p>
          </div>

          <button
            onClick={() => {}}
            className="w-full py-1 rounded bg-[#031d36] border border-[#00f0ff] text-[#00f0ff] font-orbitron text-xs font-bold tracking-widest uppercase shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:bg-[#00f0ff] hover:text-slate-950 transition"
          >
            PROTECTED
          </button>
        </div>
      </div>

      {/* 3. SECURITY EVENT LOG (cols 2) */}
      <div className="lg:col-span-2 hud-card rounded-md p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            SECURITY EVENT LOG
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        <div className="space-y-2 py-1 text-[10px] font-mono">
          <div className="flex items-center justify-between gap-1">
            <span className="text-cyan-400 flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              14:28:31 Login success...
            </span>
            <span className="text-cyan-300 px-1 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30">
              INFO
            </span>
          </div>

          <div className="flex items-center justify-between gap-1">
            <span className="text-amber-300 flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              14:27:10 Suspicious IP...
            </span>
            <span className="text-amber-300 px-1 py-0.2 rounded bg-amber-950/60 border border-amber-500/30">
              WARN
            </span>
          </div>

          <div className="flex items-center justify-between gap-1">
            <span className="text-rose-300 flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
              14:26:05 Malware blocked...
            </span>
            <span className="text-rose-300 px-1 py-0.2 rounded bg-rose-950/60 border border-rose-500/30">
              ALERT
            </span>
          </div>

          <div className="flex items-center justify-between gap-1">
            <span className="text-cyan-400 flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              14:24:11 Firewall update...
            </span>
            <span className="text-cyan-300 px-1 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30">
              INFO
            </span>
          </div>
        </div>

        <div className="text-[9px] font-mono text-cyan-500/60 text-center border-t border-cyan-500/20 pt-1">
          Auto-Syncing Event Stream
        </div>
      </div>

      {/* 4. BIOMETRIC AUTHENTICATION HUD (cols 3) */}
      <div className="lg:col-span-3 hud-card rounded-md p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <div>
            <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
              BIOMETRIC <span className="text-[#00f0ff]">AUTHENTICATION</span>
            </span>
            <p className="text-[8px] font-mono text-cyan-400/60">IDENTITY VERIFIED // SECURE ACCESS</p>
          </div>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        <div className="grid grid-cols-12 gap-2 my-2 items-center">
          {/* Fingerprint Scanner Graphic with Vertical Laser Beam */}
          <div className="col-span-5 relative h-28 flex items-center justify-center bg-[#010816] rounded border border-cyan-500/30 overflow-hidden">
            <Fingerprint className="w-16 h-16 text-[#00f0ff] glow-cyan" />
            {/* Animated Laser Scanning Beam */}
            <div className="absolute inset-x-0 h-0.5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-scan-vertical" />
            <div className="absolute top-1 left-1 text-[7px] font-mono text-cyan-400/50">
              SCAN COMPLETED: 99%
            </div>
          </div>

          {/* Verification check items as seen in image */}
          <div className="col-span-7 space-y-1 text-[10px] font-mono">
            <div className="p-1 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
              <div>
                <p className="text-cyan-200 font-bold">Fingerprint</p>
                <p className="text-[8px] text-cyan-500/60">Biometric Scan</p>
              </div>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
              </span>
            </div>

            <div className="p-1 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
              <div>
                <p className="text-cyan-200 font-bold">Face ID</p>
                <p className="text-[8px] text-cyan-500/60">Facial Recognition</p>
              </div>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
              </span>
            </div>

            <div className="p-1 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
              <div>
                <p className="text-cyan-200 font-bold">Device</p>
                <p className="text-[8px] text-cyan-500/60">Trusted Device</p>
              </div>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
              </span>
            </div>

            <div className="p-1 rounded bg-[#020b18] border border-cyan-500/20 flex items-center justify-between">
              <div>
                <p className="text-cyan-200 font-bold">Location</p>
                <p className="text-[8px] text-cyan-500/60">Geolocation Check</p>
              </div>
              <span className="text-[9px] text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
              </span>
            </div>
          </div>
        </div>

        {/* Network Activity Equalizer bar underneath */}
        <div className="pt-1 border-t border-cyan-500/20 flex items-center justify-between">
          <span className="text-[9px] font-orbitron text-cyan-400">NETWORK ACTIVITY</span>
          <div className="flex items-center gap-3 text-[9px] font-mono text-cyan-300">
            <span className="flex items-center gap-0.5">
              <ArrowUp className="w-2.5 h-2.5 text-cyan-400" /> 13.0 Mbps
            </span>
            <span className="flex items-center gap-0.5">
              <ArrowDown className="w-2.5 h-2.5 text-teal-400" /> 80.8 Mbps
            </span>
          </div>
        </div>
      </div>

      {/* 5. THREAT INTELLIGENCE & UNAUTHORIZED ACCESS ALERT (cols 2) */}
      <div className="lg:col-span-2 flex flex-col justify-between space-y-2">
        {/* Threat Intelligence Table */}
        <div className="hud-card rounded-md p-3 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
            <span className="font-orbitron text-[10px] font-bold text-cyan-200 uppercase tracking-wider">
              THREAT INTELLIGENCE
            </span>
            <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
          </div>

          <div className="space-y-1.5 py-1 text-[10px] font-mono">
            {/* Malware */}
            <div className="flex items-center justify-between p-1 rounded bg-[#020b18] border border-cyan-500/20">
              <span className="text-rose-400 flex items-center gap-1 font-bold">
                ☣ Malware
              </span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200">3,426</span>
                <span className="text-rose-400 text-[9px]">↑ 23%</span>
              </div>
            </div>

            {/* Phishing - clickable to launch scanner! */}
            <div
              onClick={onOpenScanner}
              className="flex items-center justify-between p-1 rounded bg-[#020b18] border border-cyan-500/30 hover:border-[#00f0ff] cursor-pointer transition"
              title="Launch Phishing Scanner"
            >
              <span className="text-amber-400 flex items-center gap-1 font-bold">
                ✉ Phishing
              </span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200">1,207</span>
                <span className="text-amber-400 text-[9px]">↑ 14%</span>
              </div>
            </div>

            {/* Ransomware */}
            <div className="flex items-center justify-between p-1 rounded bg-[#020b18] border border-cyan-500/20">
              <span className="text-rose-400 flex items-center gap-1 font-bold">
                💀 Ransomware
              </span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200">637</span>
                <span className="text-emerald-400 text-[9px]">↓ 16%</span>
              </div>
            </div>

            {/* DDoS */}
            <div className="flex items-center justify-between p-1 rounded bg-[#020b18] border border-cyan-500/20">
              <span className="text-cyan-400 flex items-center gap-1 font-bold">
                🔀 DDoS
              </span>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200">319</span>
                <span className="text-rose-400 text-[9px]">↑ 10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* UNAUTHORIZED ACCESS Red Alert Box as seen in image */}
        <div className="hud-card-alert rounded-md p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-rose-950/80 border border-rose-500/60 text-[#ff1e3c]">
              <Skull className="w-5 h-5 glow-red animate-pulse" />
            </div>
            <div>
              <p className="font-orbitron font-bold text-[10px] text-[#ff1e3c] glow-red uppercase">
                UNAUTHORIZED ACCESS
              </p>
              <p className="text-[8px] font-mono text-rose-300">
                Blocked 3 intrusion attempts
              </p>
            </div>
          </div>

          <button
            onClick={onOpenIncidentModal}
            className="px-2 py-1 rounded bg-rose-950 hover:bg-rose-900 border border-rose-500 text-[9px] font-orbitron font-bold text-rose-200 uppercase transition hover:text-white"
          >
            VIEW DETAILS
          </button>
        </div>
      </div>
    </div>
  )
}
