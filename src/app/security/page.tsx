'use client';

import React from 'react';
import { ShieldCheck, Lock, CheckCircle, FileText, Download } from 'lucide-react';

const CONTROLS = [
  {
    name: 'LLM Key Isolation Enclave',
    status: 'IMPLEMENTED & TESTED',
    category: 'Key Management',
    description: 'Private keys are encrypted via AES-256-GCM and kept isolated from LLM prompt contexts.',
  },
  {
    name: 'Deterministic Policy Engine',
    status: 'IMPLEMENTED & TESTED',
    category: 'Authorization',
    description: 'Pure BigInt arithmetic enforcing spending caps, reserve preservation, and allowlists without floating-point errors.',
  },
  {
    name: 'Canonical Fingerprint Verification',
    status: 'IMPLEMENTED & TESTED',
    category: 'Integrity',
    description: 'Computes SHA-256 digest of normalized payload and verifies against policy permit before signing.',
  },
  {
    name: 'Evidence Ledger Hash Chain',
    status: 'IMPLEMENTED & TESTED',
    category: 'Auditability',
    description: 'Cryptographic block hash chaining linking user prompt to policy evaluation, tx hash, and receipt.',
  },
  {
    name: 'Autonomous Attack Arena',
    status: 'IMPLEMENTED & TESTED',
    category: 'Adversarial Testing',
    description: '18 automated security test scenarios executing against live backend engines.',
  },
  {
    name: 'Risk Controller Circuit Breakers',
    status: 'IMPLEMENTED & TESTED',
    category: 'Resilience',
    description: 'Automated state escalation to PAUSED or BLOCKED upon detecting anomalies or staleness.',
  },
];

export default function SecurityPage() {
  const exportReport = () => {
    const jsonStr = JSON.stringify(CONTROLS, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'actabound-security-self-assessment.json';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Security & Compliance Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Security Self-Assessment &middot; OWASP LLM Alignment &middot; Verified Controls Matrix
          </p>
        </div>
        <button
          onClick={exportReport}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors border border-slate-700"
        >
          <Download className="w-3.5 h-3.5" />
          Export Security Assessment
        </button>
      </div>

      {/* Permission Tiers Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { tier: 'Tier 0', title: 'Observer', desc: 'Read-only queries' },
          { tier: 'Tier 1', title: 'Planner', desc: 'Simulation & twin preview' },
          { tier: 'Tier 2', title: 'Bounded Executor', desc: 'Autonomous within mandate (Active)' },
          { tier: 'Tier 3', title: 'Owner Approval', desc: 'Explicit human signature' },
        ].map((t) => (
          <div key={t.tier} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-[10px] font-mono text-emerald-500 uppercase font-semibold">{t.tier}</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{t.title}</div>
            <div className="text-[11px] text-slate-500 mt-1">{t.desc}</div>
          </div>
        ))}
      </div>

      {/* Controls Matrix */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Defense Controls</h2>
          <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> All 6 Controls Active
          </span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {CONTROLS.map((ctrl) => (
            <div key={ctrl.name} className="p-4 flex items-center justify-between text-xs">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{ctrl.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                    {ctrl.category}
                  </span>
                </div>
                <div className="text-slate-500 dark:text-slate-400">{ctrl.description}</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                {ctrl.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
