import React from 'react'
import { X, Skull, ShieldAlert, ArrowRight, AlertTriangle, Terminal } from 'lucide-react'

export default function IncidentModal({ isOpen, onClose, onLoadIncidentToScanner }) {
  if (!isOpen) return null

  const incidents = [
    {
      id: 'INC-9042',
      type: 'Phishing Credential Extortion',
      severity: 'CRITICAL',
      source: '192.168.1.55 (Spoofed Chase Gateway)',
      time: '14:26:05 UTC',
      sample: 'SECURITY ALERT: Unauthorized access detected on your Chase account. Your account has been temporarily restricted. Click http://192.168.1.55/chase-security/login immediately and confirm your password and 6-digit OTP code.'
    },
    {
      id: 'INC-9041',
      type: 'Malicious Disposable TLD Link',
      severity: 'HIGH',
      source: 'usps-track-package.xyz',
      time: '14:20:12 UTC',
      sample: 'USPS Final Notice: Update your delivery address and pay the $2.85 customs fee at https://usps-track-package.xyz/update within 12 hours.'
    },
    {
      id: 'INC-9039',
      type: 'Advance Fee Employment Scam',
      severity: 'HIGH',
      source: 'bit.ly/3instantJob (Hidden redirect)',
      time: '13:58:44 UTC',
      sample: 'Congratulations! Selected for remote data entry. Earn $850/day. A refundable registration fee of $75 is required to reserve equipment at bit.ly/3instantJob'
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="hud-card-alert w-full max-w-2xl rounded-lg p-5 sm:p-6 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <Skull className="w-6 h-6 text-[#ff1e3c] glow-red animate-pulse" />
            <div>
              <h3 className="font-orbitron font-bold text-base text-[#ff1e3c] tracking-wider uppercase">
                UNAUTHORIZED ACCESS // INCIDENT DOSSIER
              </h3>
              <p className="text-[10px] font-mono text-rose-300">
                ACTIVE THREAT INTELLIGENCE FEED // 3 INTRUSION ATTEMPTS BLOCKED
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of blocked incidents */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className="p-3.5 rounded bg-[#0b0306] border border-rose-500/30 space-y-2 hover:border-rose-500/60 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-orbitron text-xs font-bold text-white">
                    {inc.id}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-rose-950 text-[#ff1e3c] border border-rose-500/50">
                    {inc.severity}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {inc.time}
                </span>
              </div>

              <p className="text-xs font-mono text-rose-200">
                <strong>Threat Vector:</strong> {inc.type}
              </p>

              <div className="p-2 rounded bg-black/60 border border-rose-500/20 text-[11px] font-mono text-slate-300">
                "{inc.sample}"
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    onLoadIncidentToScanner(inc.sample)
                    onClose()
                  }}
                  className="px-3 py-1 rounded bg-rose-950 hover:bg-[#ff1e3c] text-rose-200 hover:text-white border border-rose-500 text-xs font-orbitron font-bold tracking-wider uppercase transition flex items-center gap-1.5"
                >
                  <span>Dispatch to AI Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
