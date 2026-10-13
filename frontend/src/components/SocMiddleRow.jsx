import React, { useState } from 'react'
import {
  Globe,
  TrendingUp,
  Cpu,
  HardDrive,
  Wifi,
  ShieldCheck,
  UserCheck,
  Users,
  HardDriveDownload,
  Cloud
} from 'lucide-react'

export default function SocMiddleRow() {
  const [timeframe, setTimeframe] = useState('Last 24 Hours')

  // Sample data points for neon line chart:
  // Points (x, y) mapping to 00:00 -> 24:00
  const points = [
    { x: 10, y: 70 },
    { x: 45, y: 82 },
    { x: 80, y: 65 },
    { x: 115, y: 75 },
    { x: 150, y: 60 },
    { x: 185, y: 40 },
    { x: 220, y: 55 },
    { x: 255, y: 35 },
    { x: 290, y: 65 },
    { x: 325, y: 50 },
    { x: 360, y: 58 },
    { x: 395, y: 42 },
    { x: 430, y: 68 },
    { x: 465, y: 52 },
    { x: 500, y: 60 }
  ]

  const pathD = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`,
    ''
  )
  const areaD = `${pathD} L 500 110 L 10 110 Z`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
      {/* 1. GLOBAL THREAT MAP (cols 3) */}
      <div className="lg:col-span-3 hud-card rounded-md p-3.5 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            GLOBAL THREAT MAP
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        {/* Dotted World Map Graphic with pulsing blips */}
        <div className="relative h-44 my-2 flex items-center justify-center bg-[#010816]/70 rounded border border-cyan-500/10 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* World map silhouette representation via SVG */}
          <svg className="w-full h-full opacity-60" viewBox="0 0 400 200">
            {/* North America dots */}
            <path
              d="M60,40 Q90,30 110,50 Q120,70 90,90 Q70,90 60,60 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="2,3"
            />
            {/* South America dots */}
            <path
              d="M100,105 Q120,110 115,145 Q100,165 95,130 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="2,3"
            />
            {/* Europe dots */}
            <path
              d="M190,45 Q220,40 225,65 Q205,75 190,60 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="2,3"
            />
            {/* Africa dots */}
            <path
              d="M195,85 Q230,85 220,135 Q195,135 190,100 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="2,3"
            />
            {/* Asia dots */}
            <path
              d="M240,40 Q310,40 320,80 Q270,100 240,70 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="2,3"
            />
            {/* Australia dots */}
            <path
              d="M295,120 Q330,120 325,145 Q295,145 295,125 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="2,3"
            />
          </svg>

          {/* Pulsing Attack Origin Points */}
          <div className="absolute top-[32%] left-[24%]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block shadow-[0_0_8px_#f43f5e] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-rose-500 block -mt-2" />
          </div>

          <div className="absolute top-[38%] left-[54%]">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block shadow-[0_0_8px_#f59e0b] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-amber-400 block -mt-2" />
          </div>

          <div className="absolute top-[45%] left-[75%]">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 block shadow-[0_0_8px_#00f0ff] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 block -mt-2" />
          </div>

          {/* Radar Sweep line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-36 h-36 rounded-full border border-cyan-500/20 animate-radar" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-around text-[10px] font-mono text-cyan-300/80 pt-1 border-t border-cyan-500/20">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            High Risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Medium Risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Low Risk
          </span>
        </div>
      </div>

      {/* 2. SECURITY ANALYTICS Line Chart (cols 4) */}
      <div className="lg:col-span-4 hud-card rounded-md p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            SECURITY ANALYTICS
          </span>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-[#020b18] border border-cyan-500/30 text-[10px] font-mono text-cyan-300 rounded px-1.5 py-0.5 focus:outline-none"
          >
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Live Feed</option>
          </select>
        </div>

        {/* Metric Counter */}
        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-xl font-orbitron font-extrabold text-[#00f0ff] glow-cyan">
            1,276
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            +12%
          </span>
        </div>

        {/* Neon Line Chart SVG */}
        <div className="relative h-28 w-full my-1">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 510 115">
            {/* Grid Lines */}
            <line x1="10" y1="20" x2="500" y2="20" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="10" y1="60" x2="500" y2="60" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="10" y1="100" x2="500" y2="100" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.15" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area under curve */}
            <path d={areaD} fill="url(#neonGradient)" />

            {/* Glowing Stroke Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              className="glow-cyan"
            />
          </svg>
        </div>

        {/* Time axis */}
        <div className="flex justify-between text-[9px] font-mono text-cyan-500/60 pt-1 border-t border-cyan-500/20">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
      </div>

      {/* 3. SECURITY ANALYTICS Circular Resource Gauges (cols 3) */}
      <div className="lg:col-span-3 hud-card rounded-md p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            SECURITY ANALYTICS
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        {/* 3 Gauges row */}
        <div className="grid grid-cols-3 gap-2 py-3 items-center">
          {/* CPU Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="22" stroke="#021a30" strokeWidth="4" fill="none" />
                <circle
                  cx="30"
                  cy="30"
                  r="22"
                  stroke="#00f0ff"
                  strokeWidth="4"
                  strokeDasharray="138"
                  strokeDashoffset="78"
                  strokeLinecap="round"
                  fill="none"
                  className="glow-cyan"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-cyan-200">
                43%
              </span>
            </div>
            <span className="font-orbitron text-[10px] text-cyan-300 font-semibold mt-1">
              CPU
            </span>
          </div>

          {/* MEMORY Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="22" stroke="#021a30" strokeWidth="4" fill="none" />
                <circle
                  cx="30"
                  cy="30"
                  r="22"
                  stroke="#14b8a6"
                  strokeWidth="4"
                  strokeDasharray="138"
                  strokeDashoffset="38"
                  strokeLinecap="round"
                  fill="none"
                  className="drop-shadow-[0_0_6px_#14b8a6]"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-teal-200">
                72%
              </span>
            </div>
            <span className="font-orbitron text-[10px] text-teal-300 font-semibold mt-1">
              MEMORY
            </span>
          </div>

          {/* NETWORK Gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="22" stroke="#021a30" strokeWidth="4" fill="none" />
                <circle
                  cx="30"
                  cy="30"
                  r="22"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  strokeDasharray="138"
                  strokeDashoffset="55"
                  strokeLinecap="round"
                  fill="none"
                  className="drop-shadow-[0_0_6px_#06b6d4]"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-cyan-200">
                60%
              </span>
            </div>
            <span className="font-orbitron text-[10px] text-cyan-300 font-semibold mt-1">
              NETWORK
            </span>
          </div>
        </div>

        <div className="text-[9px] font-mono text-cyan-500/60 text-center border-t border-cyan-500/20 pt-1">
          Cluster Node Alpha-01 Verified
        </div>
      </div>

      {/* 4. ACCESS CONTROL Status Badges (cols 2) */}
      <div className="lg:col-span-2 hud-card rounded-md p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1 border-b border-cyan-500/20">
          <span className="font-orbitron text-[11px] font-bold text-cyan-200 uppercase tracking-wider">
            ACCESS CONTROL
          </span>
          <span className="text-[9px] font-mono text-cyan-400/50">:::</span>
        </div>

        <div className="space-y-2 py-1">
          {/* Authorized Users */}
          <div className="flex items-center justify-between p-1.5 rounded bg-[#020b18] border border-cyan-500/20 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-slate-200">Authorized Users</span>
            </div>
          </div>

          {/* Guest Access */}
          <div className="flex items-center justify-between p-1.5 rounded bg-[#020b18] border border-cyan-500/20 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-cyan-500/20 text-cyan-400">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-slate-200">Guest Access</span>
            </div>
          </div>

          {/* External Devices */}
          <div className="flex items-center justify-between p-1.5 rounded bg-[#020b18] border border-rose-500/30 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-rose-500/20 text-rose-400">
                <HardDriveDownload className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-slate-200">External Devices</span>
            </div>
          </div>

          {/* Cloud Access */}
          <div className="flex items-center justify-between p-1.5 rounded bg-[#020b18] border border-cyan-500/20 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-cyan-500/20 text-cyan-400">
                <Cloud className="w-3.5 h-3.5" />
              </span>
              <span className="font-mono text-slate-200">Cloud Access</span>
            </div>
          </div>
        </div>

        <div className="text-[9px] font-mono text-emerald-400/80 text-center border-t border-cyan-500/20 pt-1">
          Zero-Trust Policy Enforced
        </div>
      </div>
    </div>
  )
}
