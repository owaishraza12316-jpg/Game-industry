import React, { useState } from 'react';
import { ShieldCheck, Cpu, ArrowUpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Umpire } from '../../types/game';
import { playCashChime, playClickSound } from '../../utils/sound';

interface UmpiresDrsTabProps {
  umpires: Umpire[];
  drsLevel: number;
  treasury: number;
  onUpgradeDrs: (cost: number) => void;
  onTrainUmpires: (cost: number) => void;
}

export const UmpiresDrsTab: React.FC<UmpiresDrsTabProps> = ({
  umpires,
  drsLevel,
  treasury,
  onUpgradeDrs,
  onTrainUmpires
}) => {
  const [notice, setNotice] = useState<string | null>(null);

  const handleUpgradeHawkEye = () => {
    const cost = 5000000;
    if (treasury < cost) {
      alert('Insufficient treasury funds ($5.0M needed).');
      return;
    }
    playCashChime();
    onUpgradeDrs(cost);
    setNotice(`Hawk-Eye sub-surface ball-tracking calibrated to Tier ${drsLevel + 1}! Overturned review accuracy increased.`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleTrainPanel = () => {
    const cost = 1800000;
    if (treasury < cost) {
      alert('Insufficient treasury funds ($1.8M needed).');
      return;
    }
    playCashChime();
    onTrainUmpires(cost);
    setNotice(`Elite Umpire DRS simulation workshop concluded! DRS accuracy improved across the home panel.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Officiating Integrity & Technology Calibration</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Home Umpires Panel & DRS Precision
          </h2>
          <p className="text-xs text-slate-400">
            Maintain the highest standard of fair play. Elite umpires combined with calibrated Hawk-Eye cameras protect home series from costly umpiring blunders.
          </p>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={handleTrainPanel}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-slate-700 text-xs transition-colors"
          >
            Train Umpires ($1.8M)
          </button>
          <button
            onClick={handleUpgradeHawkEye}
            disabled={drsLevel >= 5}
            className={`font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 ${
              drsLevel >= 5
                ? 'bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{drsLevel >= 5 ? 'Max Hawk-Eye Tier' : `Calibrate Hawk-Eye ($5M)`}</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* HawkEye Calibration Meter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-white">Hawk-Eye 3D Ball-Tracking Calibration</h3>
            <p className="text-xs text-slate-400">UltraEdge acoustic sensor and infrared impact detection</p>
          </div>
          <span className="text-sm font-mono font-bold text-emerald-400">Tier {drsLevel}/5</span>
        </div>

        <div className="flex gap-1.5 my-3">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`h-2.5 flex-1 rounded-full ${
                lvl <= drsLevel ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Umpires Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 text-xs font-bold text-white uppercase tracking-wider">
          Active Home Series Officiating Panel
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Umpire</th>
                <th className="py-3 px-4 font-semibold">Panel Level</th>
                <th className="py-3 px-4 font-semibold text-center">DRS Accuracy</th>
                <th className="py-3 px-4 font-semibold text-center">Matches Officiated</th>
                <th className="py-3 px-4 font-semibold text-center">Calmness Rating</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {umpires.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 text-slate-400">{u.panel}</td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                    {u.drsAccuracy.toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-slate-300">
                    {u.experienceMatches}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-amber-400">
                    {u.calmnessRating}/100
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Accredited
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
