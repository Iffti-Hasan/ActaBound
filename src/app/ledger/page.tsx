'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  ExternalLink,
  Hash,
  Clock,
  Layers,
  CheckCircle,
} from 'lucide-react';

interface EvidenceRecord {
  sequenceNumber: number;
  timestamp: string;
  eventType: string;
  actor: string;
  correlationId: string;
  payloadHash: string;
  previousHash: string;
  currentHash: string;
  txHash?: string;
  status: string;
  payload: any;
}

export default function LedgerPage() {
  const [records, setRecords] = useState<EvidenceRecord[]>([]);
  const [integrity, setIntegrity] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);

  const fetchLedger = async () => {
    try {
      const res = await fetch('/api/ledger');
      const data = await res.json();
      setRecords(data.records || []);
      setIntegrity(data.integrity);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const handleVerify = async () => {
    setVerifying(true);
    await fetchLedger();
    setTimeout(() => setVerifying(false), 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            Evidence Ledger
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cryptographically Hash-Linked Audit Trail &middot; Verifiable Event Provenance for AI Operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            {verifying ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            Verify Cryptographic Chain
          </button>
        </div>
      </div>

      {/* Integrity Status Banner */}
      {integrity && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between ${
            integrity.isValid
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/30 text-rose-800 dark:text-rose-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {integrity.isValid ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
            )}
            <div>
              <div className="font-bold text-sm">
                {integrity.isValid ? 'Tamper-Evident Chain Verified' : 'Cryptographic Integrity Warning'}
              </div>
              <div className="text-xs opacity-90">{integrity.message}</div>
            </div>
          </div>
          <div className="text-xs font-mono font-medium opacity-80 hidden sm:block">
            {integrity.totalBlocks} Blocks Verified
          </div>
        </div>
      )}

      {/* Records Timeline Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            Audit Chain Blocks
          </h2>
          <span className="text-xs text-slate-500">Hash Algorithm: SHA-256</span>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {records.slice().reverse().map((rec) => (
            <div key={rec.sequenceNumber} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Block #{rec.sequenceNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                    {rec.eventType}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {rec.actor}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(rec.timestamp).toLocaleTimeString()}
                  </span>
                  <span
                    className={`font-semibold ${
                      rec.status === 'SUCCESS' ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
              </div>

              {/* Cryptographic Hashes */}
              <div className="space-y-1 font-mono text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span>Current Block Digest:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate max-w-sm sm:max-w-md">
                    {rec.currentHash}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] opacity-75">
                  <span>Previous Block Link:</span>
                  <span className="truncate max-w-sm sm:max-w-md">{rec.previousHash}</span>
                </div>
                {rec.txHash && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>On-Chain TxHash:</span>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${rec.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                      {rec.txHash.slice(0, 20)}... <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
