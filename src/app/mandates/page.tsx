'use client';

import React, { useState } from 'react';
import { ScrollText, ShieldCheck, AlertCircle, Save, Ban, Lock } from 'lucide-react';

export default function MandateStudioPage() {
  const [tier, setTier] = useState('BOUNDED_EXECUTOR');
  const [dailyBudget, setDailyBudget] = useState('200.00');
  const [maxTx, setMaxTx] = useState('100.00');
  const [reserve, setReserve] = useState('200.00');
  const [slippageBps, setSlippageBps] = useState('100');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-emerald-500" />
            Mandate Studio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Bounded Financial Constraints &middot; Permission Tiers &middot; Deterministic Policy Rules
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Mandate configuration successfully updated and sealed into Evidence Ledger!
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Permission Tier Selection */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              1. Permission Tier
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                {
                  id: 'OBSERVER',
                  name: 'Tier 0 — Observer',
                  desc: 'Read-only queries. Zero plan construction or signing authority.',
                },
                {
                  id: 'PLANNER',
                  name: 'Tier 1 — Planner',
                  desc: 'May simulate plans in Financial Twin, but cannot sign or broadcast.',
                },
                {
                  id: 'BOUNDED_EXECUTOR',
                  name: 'Tier 2 — Bounded Executor (Active)',
                  desc: 'Autonomous execution strictly bounded within mandate limits.',
                },
                {
                  id: 'OWNER_APPROVAL',
                  name: 'Tier 3 — Owner Approval Required',
                  desc: 'Every action mandates explicit human cryptographic signature.',
                },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors block ${
                    tier === item.id
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={item.id}
                    checked={tier === item.id}
                    onChange={(e) => setTier(e.target.value)}
                    className="sr-only"
                  />
                  <div className="font-semibold text-xs text-slate-900 dark:text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Numerical Spending Limits */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              2. Quantitative Financial Boundaries (USDC)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Protected Reserve Minimum</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500 font-mono">
                    $
                  </span>
                  <input
                    type="text"
                    value={reserve}
                    onChange={(e) => setReserve(e.target.value)}
                    className="w-full px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Guaranteed inviolable capital reserve.</p>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Max Single Transaction Limit</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500 font-mono">
                    $
                  </span>
                  <input
                    type="text"
                    value={maxTx}
                    onChange={(e) => setMaxTx(e.target.value)}
                    className="w-full px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Caps maximum exposure per action.</p>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Cumulative Daily Spending Cap</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-lg text-slate-500 font-mono">
                    $
                  </span>
                  <input
                    type="text"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-r-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Resets automatically every 24 hours.</p>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Max Allowable Slippage</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={slippageBps}
                    onChange={(e) => setSlippageBps(e.target.value)}
                    className="w-full px-3 py-2 rounded-l-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg text-slate-500 font-mono">
                    bps
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">100 bps = 1.0% maximum price impact.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Allowlists and Actions */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Allowlists</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Permitted Token Address:</span>
                <span className="font-mono text-[11px] p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block truncate text-slate-700 dark:text-slate-300">
                  0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 (USDC)
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Permitted Recipient Address:</span>
                <span className="font-mono text-[11px] p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block truncate text-slate-700 dark:text-slate-300">
                  0x70997970C51812dc3A010C7d01b50e0d17dc79C8
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                Update Mandate Rules
              </button>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20 text-xs space-y-3">
            <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Emergency Revocation
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Revoking the mandate immediately invalidates all delegated authority. The policy engine will block any subsequent action fail-closed.
            </p>
            <button
              type="button"
              onClick={() => alert('Mandate revoked. All agent operations paused.')}
              className="w-full py-2 px-3 rounded-lg border border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Revoke Mandate Immediately
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
