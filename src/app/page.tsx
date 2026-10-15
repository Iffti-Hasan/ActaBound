'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wallet,
  ShieldCheck,
  Bot,
  Swords,
  History,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Topic F: Agent Wallet
            </span>
            <span className="text-xs text-slate-400">Shenzhen FinTechathon 2026</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">ActaBound Command Center</h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Autonomous on-chain agent bounded by deterministic policy controls, isolated private signing, and cryptographic evidence verification.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <Bot className="w-4 h-4" />
            Launch AI Agent
          </Link>
          <Link
            href="/arena"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors border border-slate-700 flex items-center gap-2"
          >
            <Swords className="w-4 h-4" />
            Attack Arena
          </Link>
        </div>
      </div>

      {/* Top Financial & Security Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Total Portfolio Value</span>
            <Wallet className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$1,670.00</div>
          <div className="mt-1 flex items-center text-xs text-emerald-500 font-medium gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.4% (24h estimate)</span>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Protected Reserve</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$200.00</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Guaranteed minimum balance (USDC)
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Remaining Daily Budget</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$150.00</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            $50.00 spent of $200.00 limit
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Attack Arena Security Pass</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-500">18 / 18 (100%)</div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Adversarial scenarios passed
          </div>
        </div>
      </div>

      {/* Main Grid: Active Mandate & Agent Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Mandate Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Active Mandate Boundary
              </h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                Tier 2 — Bounded Executor
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm">
              <div>
                <div className="text-xs text-slate-500">Chain Network</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">Sepolia (11155111)</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Max Single Tx</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">$100.00 USDC</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Daily Cap</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">$200.00 USDC</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Max Slippage</div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">1.0% (100 bps)</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <div>Agent Signing Address: <span className="font-mono text-slate-400">0x1111...1111</span></div>
              <Link href="/mandates" className="text-emerald-500 hover:underline flex items-center gap-1">
                Edit Mandate Rules <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Attack Arena Preview */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Swords className="w-5 h-5 text-amber-500" />
                Autonomous Attack Arena (Live Defense)
              </h2>
              <Link href="/arena" className="text-xs text-emerald-500 hover:underline flex items-center gap-1 font-medium">
                Open Test Lab <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              The policy engine has withstood 18 active adversarial attack scenarios. All prohibited executions were blocked before signing or broadcasting.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Budget Breaker Attack</span>
                </div>
                <span className="font-mono text-emerald-500 font-semibold">BLOCKED (DAILY_BUDGET_EXCEEDED)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Reserve Breach Attack</span>
                </div>
                <span className="font-mono text-emerald-500 font-semibold">BLOCKED (RESERVE_BREACH)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Adversarial Prompt Injection</span>
                </div>
                <span className="font-mono text-emerald-500 font-semibold">NEUTRALIZED BY SANITIZER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Evidence Ledger & System Status */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <History className="w-5 h-5 text-blue-500" />
              Cryptographic Evidence Ledger
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Tamper-evident audit chain linking user intent, policy decisions, and verified receipts.
            </p>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Chain Integrity: Fully Verified (0 altered blocks)</span>
            </div>
            <Link
              href="/ledger"
              className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              Inspect Audit Chain <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Key Security Enclaves</h3>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-center justify-between">
                <span>Signing Key Isolation:</span>
                <span className="font-semibold text-emerald-500">AES-256-GCM Enclave</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Policy Evaluation:</span>
                <span className="font-semibold text-emerald-500">Pure BigInt Engine</span>
              </li>
              <li className="flex items-center justify-between">
                <span>LLM Signing Rights:</span>
                <span className="font-semibold text-emerald-500">Zero Direct Access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
