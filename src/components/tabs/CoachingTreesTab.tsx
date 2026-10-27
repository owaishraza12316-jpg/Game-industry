import React from 'react';
import { GraduationCap, ArrowUpCircle, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { CoachStaff } from '../../types/game';
import { playCashChime } from '../../utils/sound';

interface CoachingTreesTabProps {
  coaches: CoachStaff[];
  treasury: number;
  onUpgradeCoach: (coachId: string, cost: number) => void;
}

export const CoachingTreesTab: React.FC<CoachingTreesTabProps> = ({
  coaches,
  treasury,
  onUpgradeCoach
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>High-Performance Academy & Technical Staff</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Coaching Trees & Staff Specialization
        </h2>
        <p className="text-xs text-slate-400">
          Invest board treasury funds to elevate specialist coaches. Each tier permanently strengthens squad attributes and match-day execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coaches.map((c) => {
          const isMaxLevel = c.level >= 5;
          const canAfford = treasury >= c.upgradeCost;

          return (
            <div
              key={c.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      {c.title}
                    </span>
                    <h3 className="text-lg font-black text-white">{c.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className="text-xs font-mono text-slate-400">Tier:</span>
                    <span className="text-xs font-mono font-black text-amber-400">
                      {c.level}/5
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4">{c.description}</p>

                {/* Level Progress Pip Bar */}
                <div className="flex gap-1.5 mb-4">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        lvl <= c.level ? 'bg-emerald-400' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Specialty Focus: {c.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Active Boost: {c.effectDescription}</span>
                  </div>
                </div>
              </div>

              <div>
                {isMaxLevel ? (
                  <div className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Maximum Tier Master Level Attained</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!canAfford) {
                        alert('Insufficient board treasury funds for this coaching upgrade.');
                        return;
                      }
                      playCashChime();
                      onUpgradeCoach(c.id, c.upgradeCost);
                    }}
                    disabled={!canAfford}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      canAfford
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <ArrowUpCircle className="w-4 h-4" />
                    <span>
                      Upgrade to Tier {c.level + 1} (${(c.upgradeCost / 1000000).toFixed(1)}M)
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
