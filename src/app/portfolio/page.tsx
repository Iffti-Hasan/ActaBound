'use client';

import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Search,
  PieChart as PieChartIcon,
  Shield,
  Layers,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Sliders,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

const INITIAL_POSITIONS = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    balance: '500.00',
    price: 1.0,
    value: 500.0,
    allocation: 29.9,
    status: 'Protected Reserve ($200.00)',
    color: '#10b981',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    balance: '0.45',
    price: 2600.0,
    value: 1170.0,
    allocation: 70.1,
    status: 'Unbounded',
    color: '#6366f1',
  },
];

const LIQUIDITY_BREAKDOWN = [
  { name: 'Available USDC', value: 300, fill: '#10b981', description: 'Autonomous agent operational budget' },
  { name: 'Protected Reserve', value: 200, fill: '#f59e0b', description: 'Mandate-enforced inviolable reserve' },
  { name: 'Native ETH', value: 1170, fill: '#6366f1', description: 'Unbounded long-term asset reserve' },
];

export default function PortfolioPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [positions] = useState(INITIAL_POSITIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'charts' | 'table'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = positions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pieData = positions.map((p) => ({
    name: `${p.name} (${p.symbol})`,
    value: p.value,
    allocation: `${p.allocation}%`,
    color: p.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md text-xs space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">{data.name}</p>
          <p className="text-emerald-500 font-mono font-bold">${data.value?.toLocaleString()}</p>
          {data.payload?.allocation && (
            <p className="text-slate-500 text-[11px]">Allocation: {data.payload.allocation}</p>
          )}
          {data.payload?.description && (
            <p className="text-slate-400 text-[11px]">{data.payload.description}</p>
          )}
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
            <Wallet className="w-5 h-5 text-emerald-500" />
            Portfolio & Asset Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Testnet Assets &middot; Reserve Encumbrances &middot; Bounded Allocation Strategy
          </p>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Views
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'charts'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Charts
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Table
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Total Balance Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$1,670.00</div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Sepolia Testnet Portfolio
          </div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Mandatory Reserve Encumbered</span>
            <Shield className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$200.00 USDC</div>
          <div className="mt-1 text-xs text-slate-400">Locked by Mandate Boundary</div>
        </div>
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Available for Autonomous Operations</span>
            <Layers className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">$300.00 USDC</div>
          <div className="mt-1 text-xs text-slate-400">Bounded by $100 single tx limit</div>
        </div>
      </div>

      {/* Interactive Visual Charts Section */}
      {(activeTab === 'all' || activeTab === 'charts') && mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Allocation Donut Chart */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-500" />
                Asset Allocation Distribution
              </h2>
              <span className="text-[11px] font-mono text-slate-400">Total: $1,670.00</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(val) => <span className="text-xs text-slate-600 dark:text-slate-300">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">USDC: $500.00</div>
                  <div className="text-[10px] text-slate-400">29.9% Portfolio Weight</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500 shrink-0"></span>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">ETH: $1,170.00</div>
                  <div className="text-[10px] text-slate-400">70.1% Portfolio Weight</div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Liquidity vs Encumbrance Breakdown */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-500" />
                Liquidity & Mandate Encumbrance
              </h2>
              <span className="text-[11px] font-mono text-emerald-500">Autonomous Ready</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LIQUIDITY_BREAKDOWN} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(v) => `$${v}`}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {LIQUIDITY_BREAKDOWN.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>$200 Reserve Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>$300 Spendable Cap</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assets Table */}
      {(activeTab === 'all' || activeTab === 'table') && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
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
              <tbody className="divide-y divide-slate-200 dark:border-slate-800">
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
                    <td className="p-3 font-mono font-medium">
                      {pos.balance} {pos.symbol}
                    </td>
                    <td className="p-3 font-mono">${pos.price.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold">${pos.value.toLocaleString()}</td>
                    <td className="p-3 font-mono text-emerald-500">{pos.allocation}%</td>
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
      )}
    </div>
  );
}
