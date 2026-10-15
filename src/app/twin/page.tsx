'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ArrowRight, ShieldCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { simulateFinancialTwin, AssetPosition } from '@/lib/simulation/twin';
import { StructuredPlan } from '@/lib/ai/types';

const currentPositions: AssetPosition[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    balance: '500.00',
    priceUsd: 1.0,
    decimals: 6,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    balance: '0.45',
    priceUsd: 2600.0,
    decimals: 18,
  },
];

export default function FinancialTwinPage() {
  const [amount, setAmount] = useState('60.00');

  const plan: StructuredPlan = {
    intentType: 'transfer',
    chainId: 11155111,
    assetIn: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    amount: amount || '0.00',
    destination: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    slippageBps: 0,
    explanation: `Proposed transfer of ${amount} USDC`,
    isPromptInjection: false,
  };

  const simulation = simulateFinancialTwin(
    currentPositions,
    plan,
    '200.00',
    '200.00',
    '50.00'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
            Financial Twin Simulation Workspace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pre-Execution Balance Sheet Modeling &middot; Reserve Guarantee &middot; Constraint Forecasting
          </p>
        </div>
      </div>

      {/* Interactive Simulation Input */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Simulate Proposed USDC Transfer Amount:
        </label>
        <div className="flex items-center gap-3 max-w-md">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="e.g. 50.00"
          />
          <span className="text-xs font-semibold text-slate-400">USDC</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Try entering <span className="font-mono text-emerald-500">60.00</span> (feasible), <span className="font-mono text-rose-500">180.00</span> (budget breach), or <span className="font-mono text-rose-500">350.00</span> (reserve breach).
        </p>
      </div>

      {/* Side-by-Side Before vs After Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before Execution */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">State Before Execution</h2>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Current Live State
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Total Portfolio Value:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                ${simulation.before.totalValueUsd.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">USDC Balance:</span>
              <span className="font-mono font-medium">{simulation.before.availableBalance} USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Protected Reserve:</span>
              <span className="font-mono font-semibold text-emerald-500">
                ${simulation.before.protectedReserve} USDC
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Remaining Daily Budget:</span>
              <span className="font-mono font-medium">{simulation.before.dailyBudgetRemaining} USDC</span>
            </div>
          </div>
        </div>

        {/* After Execution */}
        <div
          className={`p-6 rounded-xl border shadow-sm space-y-4 ${
            simulation.isFeasible
              ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              : 'bg-rose-50/20 dark:bg-rose-950/20 border-rose-500/30'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Projected State After Execution</h2>
            <span
              className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                simulation.isFeasible
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
              }`}
            >
              {simulation.isFeasible ? 'Feasible Plan' : 'Constraint Breach'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Total Portfolio Value:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                ${simulation.after.totalValueUsd.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">USDC Balance:</span>
              <span className="font-mono font-medium">{simulation.after.availableBalance} USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Reserve Margin:</span>
              <span
                className={`font-mono font-bold ${
                  simulation.reserveBreached ? 'text-rose-500' : 'text-emerald-500'
                }`}
              >
                {simulation.reserveBreached ? 'BREACHED' : `+${simulation.reserveMargin} USDC`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Remaining Daily Budget:</span>
              <span
                className={`font-mono font-bold ${
                  simulation.budgetBreached ? 'text-rose-500' : 'text-slate-900 dark:text-white'
                }`}
              >
                {simulation.budgetBreached ? 'EXCEEDED' : `${simulation.after.dailyBudgetRemaining} USDC`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explainability Banner */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          Twin Explainability Assessment
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">{simulation.summaryExplanation}</p>
        {simulation.alternativePlan && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 font-medium">
            {simulation.alternativePlan}
          </div>
        )}
      </div>
    </div>
  );
}
