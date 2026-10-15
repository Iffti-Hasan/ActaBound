'use client';

import React, { useState } from 'react';
import { Wallet, Search, ArrowUpRight, ArrowDownRight, PieChart, Shield } from 'lucide-react';

const INITIAL_POSITIONS = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    balance: '500.00',
    price: 1.0,
    value: 500.0,
    allocation: '29.9%',
    status: 'Protected Reserve ($200.00)',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    balance: '0.45',
    price: 2600.0,
    value: 1170.0,
    allocation: '70.1%',
    status: 'Unbounded',
  },
];

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positions] = useState(INITIAL_POSITIONS);

  const filtered = positions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-500" />
            Portfolio & Asset Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Testnet Assets &middot; Reserve Encumbrances &middot; Bounded Allocation Strategy
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Balance Value</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">$1,670.00</div>
          <div className="mt-1 text-xs text-emerald-500 font-medium">Demo Sepolia Testnet</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Mandatory Reserve Encumbered</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">$200.00 USDC</div>
          <div className="mt-1 text-xs text-slate-400">Locked by Mandate v1</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Available for Autonomous Operations</div>
          <div className="mt-1 text-2xl font-bold text-emerald-500">$300.00 USDC</div>
          <div className="mt-1 text-xs text-slate-400">Bounded by $100 single tx limit</div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search token or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <span className="text-xs font-mono text-slate-500">2 Assets Configured</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Asset</th>
                <th className="p-3">Contract Address</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Market Price</th>
                <th className="p-3">Total Value</th>
                <th className="p-3">Allocation</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.map((pos) => (
                <tr key={pos.symbol} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                      {pos.symbol.slice(0, 1)}
                    </span>
                    <div>
                      <div>{pos.name}</div>
                      <div className="text-[10px] text-slate-400">{pos.symbol}</div>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-400">
                    {pos.address === '0x0000000000000000000000000000000000000000'
                      ? 'Native ETH'
                      : `${pos.address.slice(0, 8)}...${pos.address.slice(-6)}`}
                  </td>
                  <td className="p-3 font-mono font-medium">{pos.balance} {pos.symbol}</td>
                  <td className="p-3 font-mono">${pos.price.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold">${pos.value.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-500">{pos.allocation}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {pos.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
