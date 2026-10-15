'use client';

import React from 'react';
import { HelpCircle, ExternalLink, ShieldCheck, CheckCircle, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Award className="w-3 h-3" /> Shenzhen FinTechathon 2026
          </span>
          <span className="text-xs text-slate-400">International Track &middot; Topic F</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          ActaBound: Mandate-Governed Autonomous On-Chain Wallet
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Autonomous Finance. Bounded Authority. Verifiable Actions.
        </p>
      </div>

      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Competition Submission Overview</h2>
        <p>
          ActaBound was built specifically for the <strong>2026 Shenzhen International FinTech Competition (FinTechathon)</strong> under the theme <em>&quot;AI as a Financial Participant&quot;</em> for <strong>Topic F: Agent Wallet — Autonomous On-Chain Wallet</strong>.
        </p>
        <p>
          Unlike naive chatbots or transaction simulators, ActaBound enforces genuine bounded autonomy: the AI agent interprets goals, constructs structured plans, and evaluates them against an immutable mandate using a <strong>pure, deterministic policy engine</strong>. If any boundary (daily cap, protected reserve, allowlist, or expiry) is breached, the transaction is blocked before signing or broadcasting.
        </p>
      </div>

      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Core Architectural Innovations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">1. Financial Twin</div>
            <p className="text-slate-500">
              Pre-flight balance sheet simulation displaying before/after balances, fee projections, and reserve margins before execution.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">2. Autonomous Attack Arena</div>
            <p className="text-slate-500">
              Interactive red-team lab with 18 real adversarial security scenarios proving live policy engine enforcement.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">3. Cryptographic Evidence Ledger</div>
            <p className="text-slate-500">
              Tamper-evident audit chain linking user prompts to policy decisions, transaction hashes, and on-chain receipts.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white">4. Isolated Signer Enclave</div>
            <p className="text-slate-500">
              Zero LLM access to private signing keys. AES-256-GCM encrypted key storage separate from planning models.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Competition Submission Deliverables</h2>
        <ul className="space-y-2 text-slate-500 dark:text-slate-400">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Technical Documentation: <code className="text-slate-300">docs/submission/technical-documentation.md</code></span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Security Self-Assessment Report: <code className="text-slate-300">docs/submission/security-self-assessment.md</code></span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Presentation Outline Deck (10 min): <code className="text-slate-300">docs/submission/presentation-outline.md</code></span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Demonstration Script (5 min): <code className="text-slate-300">docs/submission/demo-script.md</code></span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Execution Evidence Template: <code className="text-slate-300">docs/submission/execution-evidence-template.md</code></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
