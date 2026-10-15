'use client';

import React from 'react';
import { Settings, Shield, Server, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          System Settings & Environment Configuration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          ActaBound Node Configuration &middot; RPC Endpoints &middot; Cryptographic Key Store
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-500" />
            Blockchain RPC Configuration
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Target EVM Chain:</span>
              <span className="font-mono p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block">
                Ethereum Sepolia Testnet (ID: 11155111)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Configured RPC URL:</span>
              <span className="font-mono p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block text-slate-400">
                https://rpc.sepolia.org
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Block Explorer:</span>
              <span className="font-mono p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block text-slate-400">
                https://sepolia.etherscan.io
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-500" />
            Cryptographic Enclave & KMS
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block mb-1">Data Encryption Algorithm:</span>
              <span className="font-mono p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block text-emerald-500 font-semibold">
                AES-256-GCM (Fresh 12-byte IV per record)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Key Status:</span>
              <span className="font-mono p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block text-emerald-500">
                Active 32-Byte Secret Loaded via Env
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Database Engine:</span>
              <span className="font-mono p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 block">
                PostgreSQL 16 (Docker Compose) via Prisma ORM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
