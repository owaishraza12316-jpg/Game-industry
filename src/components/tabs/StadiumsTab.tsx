import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle, ArrowUp, ShieldCheck, Users, Sun } from 'lucide-react';
import { Stadium } from '../../types/game';
import { playCashChime } from '../../utils/sound';

interface StadiumsTabProps {
  stadiums: Stadium[];
  treasury: number;
  onUpgradeStadium: (stadiumId: string, upgradeType: 'capacity' | 'drainage' | 'boxes', cost: number) => void;
}

export const StadiumsTab: React.FC<StadiumsTabProps> = ({
  stadiums,
  treasury,
  onUpgradeStadium
}) => {
  const [notice, setNotice] = useState<string | null>(null);

  const handleUpgrade = (stadium: Stadium, type: 'capacity' | 'drainage' | 'boxes', cost: number) => {
    if (treasury < cost) {
      alert(`Insufficient treasury funds ($${(cost / 1000000).toFixed(1)}M required).`);
      return;
    }
    playCashChime();
    onUpgradeStadium(stadium.id, type, cost);
    setNotice(`Infrastructure project approved for ${stadium.name}! Upgrades active.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <Building2 className="w-4 h-4" />
          <span>Municipal Arenas & Architectural Masterplans</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Stadium Infrastructure & Native City Arenas
        </h2>
        <p className="text-xs text-slate-400">
          Supercharge iconic home arenas. Expanding seating capacity multiplies match-day gate receipts, while vacuum drainage prevents costly rain interruptions.
        </p>
      </div>

      {notice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stadiums.map((s) => (
          <div
            key={s.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-black text-white">{s.name}</h3>
                  <p className="text-xs text-slate-400">{s.city}</p>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Grade {s.conditionGrade}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs my-4 font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Seating Capacity</span>
                  <span className="font-bold text-white text-sm">{s.capacity.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Corporate Suites</span>
                  <span className="font-bold text-amber-400 text-sm">{s.corporateBoxes} Boxes</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-900 flex justify-between">
                  <span className="text-slate-400">Sub-Surface Drainage:</span>
                  <span className="text-emerald-400 font-bold">{s.drainageSystem}</span>
                </div>
                <div className="col-span-2 flex justify-between">
                  <span className="text-slate-400">Lighting Array:</span>
                  <span className="text-sky-400 font-bold">{s.floodlightsLevel}</span>
                </div>
              </div>
            </div>

            {/* Upgrade Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleUpgrade(s, 'capacity', 12000000)}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>+8k Seats ($12M)</span>
              </button>

              <button
                onClick={() => handleUpgrade(s, 'drainage', 10000000)}
                disabled={s.drainageSystem === 'SubAir Vacuum'}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  s.drainageSystem === 'SubAir Vacuum'
                    ? 'bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>{s.drainageSystem === 'SubAir Vacuum' ? 'SubAir Active' : 'SubAir Drain ($10M)'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
