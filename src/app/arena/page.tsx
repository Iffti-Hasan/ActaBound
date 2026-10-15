'use client';

import React, { useState, useEffect } from 'react';
import {
  Swords,
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { ATTACK_SCENARIOS, AttackResult } from '@/lib/attack-arena/scenarios';

export default function ArenaPage() {
  const [results, setResults] = useState<Record<string, AttackResult>>({});
  const [runningId, setRunningId] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);

  // Auto-run first scenario or load default state
  useEffect(() => {
    // initialize results map with passed tests on initial mount
    const initialMap: Record<string, AttackResult> = {};
    Promise.all(
      ATTACK_SCENARIOS.map(async (s) => {
        const res = await s.run();
        initialMap[s.id] = res;
      })
    ).then(() => setResults({ ...initialMap }));
  }, []);

  const runSingle = async (scenarioId: string) => {
    setRunningId(scenarioId);
    try {
      const res = await fetch('/api/arena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId }),
      });
      const data = await res.json();
      if (data.result) {
        setResults((prev) => ({ ...prev, [scenarioId]: data.result }));
      }
    } catch {
      // fallback
    } finally {
      setRunningId(null);
    }
  };

  const runAll = async () => {
    setRunningAll(true);
    try {
      const res = await fetch('/api/arena', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.summary?.results) {
        const map: Record<string, AttackResult> = {};
        data.summary.results.forEach((r: AttackResult) => {
          map[r.scenarioId] = r;
        });
        setResults(map);
      }
    } catch {
      // fallback
    } finally {
      setRunningAll(false);
    }
  };

  const total = ATTACK_SCENARIOS.length;
  const passed = Object.values(results).filter((r) => r.passed).length;
  const failed = Object.values(results).filter((r) => !r.passed).length;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-500" />
            Autonomous Attack Arena
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            18-Scenario Adversarial Red-Team Laboratory &middot; Verifying Policy and Risk Controls Under Attack
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runAll}
            disabled={runningAll || runningId !== null}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            {runningAll ? (
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            Run All 18 Scenarios
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Scenarios</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{total}</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Attacks Defended (Passed)</div>
          <div className="mt-1 text-2xl font-bold text-emerald-500">{passed}</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Bypasses (Failed)</div>
          <div className="mt-1 text-2xl font-bold text-rose-500">{failed}</div>
        </div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Defense Success Rate</div>
          <div className="mt-1 text-2xl font-bold text-emerald-500">{passRate}%</div>
        </div>
      </div>

      {/* Scenarios Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            Active Adversarial Test Scenarios
          </h2>
          <span className="text-xs text-slate-500">Live Backend Verification</span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {ATTACK_SCENARIOS.map((scenario) => {
            const res = results[scenario.id];
            const isRunning = runningId === scenario.id;

            return (
              <div key={scenario.id} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">
                        {scenario.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {scenario.threatCategory}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{scenario.description}</p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-4 pt-1">
                      <span>Expected: <span className="font-mono text-slate-300">{scenario.expectedResult}</span></span>
                      {res && (
                        <span>Enforcer: <span className="font-semibold text-emerald-400">{res.enforcementComponent}</span></span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {res ? (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          res.passed
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {res.passed ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            DEFENDED (PASS)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            BYPASS (FAIL)
                          </>
                        )}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Not Run</span>
                    )}

                    <button
                      onClick={() => runSingle(scenario.id)}
                      disabled={isRunning || runningAll}
                      className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
                    >
                      {isRunning ? <RotateCcw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                      Run Test
                    </button>
                  </div>
                </div>

                {res && (
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="truncate max-w-xl">Actual: {res.actualResult}</span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
                      <Clock className="w-3 h-3" />
                      {res.durationMs}ms
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
