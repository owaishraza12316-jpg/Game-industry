import React, { useState } from 'react';
import { Landmark, TrendingUp, TrendingDown, DollarSign, Download, Filter } from 'lucide-react';
import { LedgerItem } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface FinanceLedgerTabProps {
  treasury: number;
  ledger: LedgerItem[];
}

export const FinanceLedgerTab: React.FC<FinanceLedgerTabProps> = ({
  treasury,
  ledger
}) => {
  const [filterType, setFilterType] = useState<'all' | 'revenue' | 'expense'>('all');

  const filteredItems = ledger.filter((item) => {
    if (filterType === 'revenue') return item.amount > 0;
    if (filterType === 'expense') return item.amount < 0;
    return true;
  });

  const totalRevenue = ledger.filter(i => i.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = Math.abs(ledger.filter(i => i.amount < 0).reduce((acc, curr) => acc + curr.amount, 0));
  const netSurplus = totalRevenue - totalExpense;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <Landmark className="w-4 h-4" />
          <span>Fiduciary Governance & Fiscal Transparency</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Board Financial Audit & Tax Ledger
        </h2>
        <p className="text-xs text-slate-400">
          Complete cash accounting of broadcasting installments, commercial sponsorships, player retainer payroll, and stadium maintenance.
        </p>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Gross Operating Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            +${(totalRevenue / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Media rights distributions and title sponsorships
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Total Operating Outflows</span>
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-400">
            -${(totalExpense / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Contracts, charter flights & venue maintenance
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Fiscal Year Net Surplus</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            ${(netSurplus / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Reinvestable into grassroots, stadiums, and coaching
          </p>
        </div>
      </div>

      {/* Ledger Filter and Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Filter Ledger:</span>
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => { playClickSound(); setFilterType('all'); }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterType === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => { playClickSound(); setFilterType('revenue'); }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterType === 'revenue' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => { playClickSound(); setFilterType('expense'); }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  filterType === 'expense' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Expenses
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {filteredItems.length} transactions recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold text-right">Amount (USD)</th>
                <th className="py-3 px-4 font-semibold text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-white">{item.description}</td>
                  <td className="py-3 px-4 text-slate-400">{item.category}</td>
                  <td className={`py-3 px-4 text-right font-mono font-bold ${
                    item.amount > 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {item.amount > 0 ? '+' : '-'}${Math.abs(item.amount).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status}
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
};
