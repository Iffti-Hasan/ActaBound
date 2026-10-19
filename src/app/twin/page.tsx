'use client';

import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  BarChart2,
  TrendingDown,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const numAmount = parseFloat(amount) || 0;

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

  // Dynamic Chart Data for Before vs After
  const chartData = [
    {
      scenario: 'Current State',
      balance: 500,
      reserveFloor: 200,
      spend: 0,
      status: 'Current Balance',
    },
    {
      scenario: 'Projected State',
      balance: Math.max(0, 500 - numAmount),
      reserveFloor: 200,
      spend: numAmount,
      status: simulation.isFeasible ? 'Within Mandate' : 'BREACH DETECTED',
    },
  ];

  const CustomTwinTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md text-xs space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">{data.scenario}</p>
          <p className="text-slate-600 dark:text-slate-300">
            USDC Balance: <span className="font-mono font-bold">${data.balance.toFixed(2)}</span>
          </p>
          <p className="text-amber-500">
            Protected Reserve Floor: <span className="font-mono font-bold">$200.00</span>
          </p>
          {data.spend > 0 && (
            <p className="text-rose-500">
              Proposed Spend: <span className="font-mono font-bold">-${data.spend.toFixed(2)}</span>
            </p>
          )}
          <p className={`text-[10px] font-semibold mt-1 ${simulation.isFeasible ? 'text-emerald-500' : 'text-rose-500'}`}>
            Status: {data.status}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>Quick Test Scenarios:</span>
          <button
            onClick={() => setAmount('60.00')}
            className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono"
          >
            60.00 (Permitted)
          </button>
          <button
            onClick={() => setAmount('180.00')}
            className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono"
          >
            180.00 (Budget Breach)
          </button>
          <button
            onClick={() => setAmount('350.00')}
            className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-mono"
          >
            350.00 (Reserve Breach)
          </button>
        </div>
      </div>

      {/* Interactive Visual Simulation Chart */}
      {mounted && (
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              Dynamic Reserve Boundary Simulation
            </h2>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-500 rounded"></span>
                <span className="text-slate-500">Protected Reserve ($200.00)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    simulation.isFeasible ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                  }`}
                ></span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {simulation.isFeasible ? 'Permitted by Mandate' : 'Blocked by Mandate'}
                </span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  dataKey="scenario"
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(v) => `$${v}`}
                  domain={[0, 600]}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTwinTooltip />} />
                <ReferenceLine
                  y={200}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  label={{
                    value: 'Reserve Floor: $200.00',
                    position: 'insideTopRight',
                    fill: '#f59e0b',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
                <Bar dataKey="balance" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => {
                    const isBreach = index === 1 && !simulation.isFeasible;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={isBreach ? '#f43f5e' : index === 0 ? '#10b981' : '#3b82f6'}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Safety Buffer Indicator */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {simulation.isFeasible ? (
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              )}
              <span className="text-slate-700 dark:text-slate-300">
                {simulation.isFeasible
                  ? `Safety Buffer Remaining: +$${simulation.reserveMargin} USDC above protected reserve.`
                  : `Safety Buffer Breached: Proposed transaction breaches active policy bounds.`}
              </span>
            </div>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                simulation.isFeasible
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
              }`}
            >
              {simulation.isFeasible ? 'STATUS: SAFE' : 'STATUS: BLOCKED'}
            </span>
          </div>
        </div>
      )}

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
