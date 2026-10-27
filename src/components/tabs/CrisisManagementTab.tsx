import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  History, 
  Users, 
  Award, 
  Heart, 
  DollarSign, 
  Flame, 
  HelpCircle,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { CrisisEvent, CrisisOption } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface CrisisManagementTabProps {
  activeCrisis: CrisisEvent | null;
  crisisHistory: CrisisEvent[];
  treasury: number;
  fanTrust: number;
  boardStability: number;
  onOpenActiveCrisis: () => void;
  onTriggerRandomCrisis: () => void;
}

export const CrisisManagementTab: React.FC<CrisisManagementTabProps> = ({
  activeCrisis,
  crisisHistory,
  treasury,
  fanTrust,
  boardStability,
  onOpenActiveCrisis,
  onTriggerRandomCrisis
}) => {
  return (
    <div className="space-y-6 text-slate-100">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-rose-500/15 text-rose-400 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Board Crisis Management Unit</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Integrity & Scandals
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              High-stakes boardroom disputes, sponsor corruption probes, pitch tampering allegations, and dressing room rebellions. Every executive decision balances financial outlay against fan trust and squad morale.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playClickSound();
                onTriggerRandomCrisis();
              }}
              className="px-4 py-2.5 bg-rose-600/90 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-rose-950/60"
            >
              <Flame className="w-4 h-4" />
              <span>Simulate Board Emergency</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Crisis Spotlight */}
      {activeCrisis ? (
        <div className="bg-rose-950/30 border-2 border-rose-500/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden animate-pulse">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4" />
                <span>Active Unresolved Emergency · {activeCrisis.severity}</span>
              </div>
              <h3 className="text-lg font-black text-white">{activeCrisis.title}</h3>
              <div className="text-xs text-slate-400 mt-0.5">Source: {activeCrisis.source}</div>
            </div>
            <button
              onClick={onOpenActiveCrisis}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition shadow-lg shrink-0"
            >
              Enter Crisis Summit
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            {activeCrisis.description}
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
          <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">No Immediate Boardroom Emergencies</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            All state associations, integrity commissioners, and commercial sponsors are quiet. Continue simulating fixtures or trigger an emergency drill above.
          </p>
        </div>
      )}

      {/* Historic Crisis Log */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Historic Crisis Log ({crisisHistory.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Archive Record</span>
        </div>

        {crisisHistory.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 italic">
            No past crises logged in board archives yet.
          </div>
        ) : (
          <div className="space-y-3">
            {crisisHistory.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                    <span className="text-[11px] text-slate-500">{item.date} · Source: {item.source}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 shrink-0">
                    Resolved
                  </span>
                </div>

                {item.chosenOptionId && (
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 mt-2">
                    <div className="text-[11px] font-bold text-slate-300">
                      Directive Enacted: {item.options.find((o) => o.id === item.chosenOptionId)?.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      "{item.options.find((o) => o.id === item.chosenOptionId)?.verdictText}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
