'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, Activity } from 'lucide-react';
import { riskController, RiskLevel } from '@/lib/risk/controller';

export default function RiskCenterPage() {
  const [currentLevel, setCurrentLevel] = useState<RiskLevel>(riskController.getRiskLevel());
  const [signals, setSignals] = useState(riskController.getSignals());

  const handlePause = () => {
    riskController.emergencyPause('Operator invoked emergency pause from Risk Center UI.');
    setCurrentLevel(riskController.getRiskLevel());
    setSignals(riskController.getSignals());
  };

  const handleReset = () => {
    riskController.resetToNormal('OPERATOR_MANUAL_RESET');
    setCurrentLevel(riskController.getRiskLevel());
    setSignals(riskController.getSignals());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Risk Center & Autonomy Sentinel
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automated Circuit Breakers &middot; Real-Time Risk Signals &middot; Fail-Closed Enforcers
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentLevel === 'PAUSED' || currentLevel === 'BLOCKED' ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Reset Sentinel to Normal
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              Trigger Emergency Pause
            </button>
          )}
        </div>
      </div>

      {/* State Indicator Banner */}
      <div
        className={`p-5 rounded-xl border flex items-center justify-between ${
          currentLevel === 'NORMAL'
            ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
            : currentLevel === 'CAUTION'
            ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-500/30 text-amber-800 dark:text-amber-300'
            : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-500/30 text-rose-800 dark:text-rose-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 shrink-0" />
          <div>
            <div className="font-bold text-sm">
              Current Risk State: {currentLevel}
            </div>
            <div className="text-xs opacity-90">
              {currentLevel === 'NORMAL'
                ? 'All autonomous execution channels active. No anomalies detected.'
                : currentLevel === 'PAUSED'
                ? 'EMERGENCY HALT: All agent execution blocked fail-closed.'
                : 'Elevated risk detected. Action bounds constrained.'}
            </div>
          </div>
        </div>
        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-current">
          {currentLevel}
        </span>
      </div>

      {/* Signals Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Risk Signals & Sentinels</h2>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {signals.map((sig) => (
            <div key={sig.id} className="p-4 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{sig.metric}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                    {sig.source}
                  </span>
                </div>
                <div className="text-slate-500 dark:text-slate-400">{sig.message}</div>
              </div>

              <div className="text-right font-mono space-y-1 shrink-0">
                <div className="font-bold text-slate-900 dark:text-white">{sig.value}</div>
                <div className="text-[10px] text-slate-400">Threshold: {sig.threshold}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
