'use client';

import React from 'react';
import {
  HelpCircle,
  ShieldCheck,
  CheckCircle,
  Award,
  Layers,
  Lock,
  Cpu,
  History,
  Sliders,
  Swords,
  Workflow,
  Server,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Autonomous Financial Agent
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Enterprise Mandate Engine &middot; Bounded Execution
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          About ActaBound
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Autonomous Finance. Bounded Authority. Verifiable Actions.
        </p>
      </div>

      {/* Product Mission & Core Thesis */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Workflow className="w-4 h-4 text-emerald-500" />
          Mission & Core Architecture
        </h2>
        <p>
          <strong>ActaBound</strong> is an autonomous on-chain wallet and execution engine designed for secure Web3 operations. It establishes that artificial intelligence can autonomously participate in financial protocols safely only when bounded by <strong>deterministic policy controls</strong>, <strong>isolated private signing</strong>, and <strong>cryptographically verifiable evidence trails</strong>.
        </p>
        <p>
          Unlike unconstrained chatbots or simple transaction generators that delegate signing keys directly to an LLM, ActaBound enforces genuine bounded autonomy: the AI agent interprets goals, constructs structured plans, and evaluates them against an immutable mandate using a <strong>pure, deterministic policy engine</strong>. If any boundary—such as daily spending limits, protected balance reserves, allowlisted recipients, or transaction caps—is breached, the transaction is permanently blocked before signing or broadcasting.
        </p>
      </div>

      {/* Trust & Execution Hierarchy */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          5-Tier Trust & Execution Hierarchy
        </h2>
        <div className="space-y-3">
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Tier 1: Human User (Mandate Authority)</div>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Configures immutable operational boundaries: protected reserve floors, daily spending ceilings, and allowed tokens.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Tier 2: AI Planning Agent (Probabilistic Intent Parser)</div>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Parses natural language requests into structured execution plans. Operates in an unprivileged memory sandbox with zero access to private keys.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Tier 3: Deterministic Policy Guard Barrier (Mathematical Invariant Verifier)</div>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Strict, zero-drift BigInt rules engine. Evaluates spending limits, reserve encumbrances, and allowlists. Executes fail-closed on any violation.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Tier 4: Isolated Signer Enclave (Hardware/KMS Security Boundary)</div>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                AES-256-GCM encrypted enclave. Signs transactions only when supplied with a cryptographically verified ALLOW certificate from the policy guard.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              5
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">Tier 5: EVM Smart Contract Vault (On-Chain Settlement)</div>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                On-chain smart contract vault (BoundedExecutor.sol) enforcing destination allowlists, transaction caps, and emergency pause switches.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Core Functional Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              1. Financial Twin Simulator
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Pre-flight balance sheet simulation displaying before/after balances, fee projections, and reserve margins before execution.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-500" />
              2. Autonomous Attack Arena
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Interactive red-team lab with 18 automated adversarial security scenarios proving live policy engine enforcement.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-4 h-4 text-blue-500" />
              3. Cryptographic Evidence Ledger
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Tamper-evident SHA-256 audit chain linking user prompts to policy decisions, transaction hashes, and on-chain receipts.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-500" />
              4. Isolated Signer Enclave
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Zero LLM access to private signing keys. AES-256-GCM encrypted key storage strictly separated from planning models.
            </p>
          </div>
        </div>
      </div>

      {/* System Technical Specifications */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-slate-400" />
          Technical Environment & Standards
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Chain Network</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Ethereum Sepolia</div>
            <div className="text-[10px] text-slate-500 font-mono">EVM ID: 11155111</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Precision Math</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Pure BigInt</div>
            <div className="text-[10px] text-slate-500 font-mono">0 Float Drift</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Audit Hash</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">SHA-256 Chained</div>
            <div className="text-[10px] text-slate-500 font-mono">Merkle Audit Trail</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">KMS Encryption</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">AES-256-GCM</div>
            <div className="text-[10px] text-slate-500 font-mono">12-Byte IV Enclave</div>
          </div>
        </div>
      </div>
    </div>
  );
}
