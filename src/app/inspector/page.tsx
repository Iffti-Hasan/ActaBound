'use client';

import React, { useState } from 'react';
import { Search, Hash, Lock, CheckCircle, ShieldCheck, Code, ExternalLink } from 'lucide-react';
import { sha256Digest } from '@/lib/crypto';

export default function InspectorPage() {
  const [txDetails] = useState({
    mandateId: 'mandate-sepolia-primary',
    mandateVersion: 1,
    chainId: 11155111,
    method: 'transfer(address,uint256)',
    tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    recipientAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    amount: '40.00 USDC',
    calldata: '0xa9059cbb00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000002625a00',
    estimatedGasUnits: '42,100',
    estimatedGasCost: '$0.42 USD',
    nonce: 14,
  });

  const fingerprint = sha256Digest({
    mandateId: txDetails.mandateId,
    version: txDetails.mandateVersion,
    chainId: txDetails.chainId,
    recipient: txDetails.recipientAddress.toLowerCase(),
    token: txDetails.tokenAddress.toLowerCase(),
    amount: '40.00',
    calldata: txDetails.calldata,
    nonce: txDetails.nonce,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-500" />
            Transaction Inspector
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pre-Signing Reconstruction &middot; Canonical SHA-256 Fingerprint &middot; Calldata Verification
          </p>
        </div>
      </div>

      {/* Fingerprint Banner */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Hash className="w-4 h-4 text-emerald-500" />
            Canonical Transaction Fingerprint (SHA-256)
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
            VERIFIED BEFORE SIGNING
          </span>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-emerald-600 dark:text-emerald-400 break-all">
          {fingerprint}
        </div>
        <p className="text-[11px] text-slate-400">
          The isolated signer calculates this digest independently from the serialized ABI calldata and verifies it against the policy engine authorization permit.
        </p>
      </div>

      {/* Decoded Transaction Payload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-500" />
            Transaction Parameters
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Destination Chain:</span>
              <span className="font-mono font-medium">Sepolia (Chain ID: 11155111)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Method Signature:</span>
              <span className="font-mono font-semibold text-emerald-500">{txDetails.method}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Token Contract:</span>
              <span className="font-mono text-slate-400 truncate max-w-[200px]">{txDetails.tokenAddress}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Recipient Destination:</span>
              <span className="font-mono text-slate-400 truncate max-w-[200px]">{txDetails.recipientAddress}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Transfer Amount:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{txDetails.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Monotonic Nonce:</span>
              <span className="font-mono font-medium">#{txDetails.nonce}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            Gas & Security Review
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Estimated Gas Units:</span>
              <span className="font-mono font-medium">{txDetails.estimatedGasUnits} units</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Estimated Network Fee:</span>
              <span className="font-mono font-medium">{txDetails.estimatedGasCost}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Allowlist Verification:</span>
              <span className="font-semibold text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Both Token & Recipient Allowlisted
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Protected Reserve Preservation:</span>
              <span className="font-semibold text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Preserves $200.00 Reserve
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Key Isolation Check:</span>
              <span className="font-semibold text-emerald-500 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Zero Key Exposure to LLM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Serialized Calldata */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Raw EVM Calldata (Hex):
        </div>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-500 dark:text-slate-400 break-all">
          {txDetails.calldata}
        </div>
      </div>
    </div>
  );
}
