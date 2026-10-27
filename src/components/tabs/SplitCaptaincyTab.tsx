import React from 'react';
import { ShieldAlert, Star, Crown, CheckCircle2, Zap } from 'lucide-react';
import { Player, SplitCaptains } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface SplitCaptaincyTabProps {
  squad: Player[];
  splitCaptains: SplitCaptains;
  onUpdateCaptains: (updated: SplitCaptains) => void;
}

export const SplitCaptaincyTab: React.FC<SplitCaptaincyTabProps> = ({
  squad,
  splitCaptains,
  onUpdateCaptains
}) => {
  const getPlayer = (id: string) => squad.find((p) => p.id === id) || squad[0];

  const handleSelectCaptain = (format: 'test' | 'odi' | 't20', isVice: boolean, id: string) => {
    playClickSound();
    const updated = { ...splitCaptains };
    if (format === 'test') {
      if (isVice) updated.testViceCaptainId = id;
      else updated.testCaptainId = id;
    } else if (format === 'odi') {
      if (isVice) updated.odiViceCaptainId = id;
      else updated.odiCaptainId = id;
    } else {
      if (isVice) updated.t20ViceCaptainId = id;
      else updated.t20CaptainId = id;
    }
    onUpdateCaptains(updated);
  };

  const testCap = getPlayer(splitCaptains.testCaptainId);
  const odiCap = getPlayer(splitCaptains.odiCaptainId);
  const t20Cap = getPlayer(splitCaptains.t20CaptainId);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <Crown className="w-4 h-4" />
          <span>High-Performance Leadership Group</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Split Captaincy & Tactical Leadership
        </h2>
        <p className="text-xs text-slate-400">
          Assign format-specialist captains to reduce fatigue and optimize in-game tactical decisiveness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Test Captaincy Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Red-Ball Cricket
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/30">
                Test Match
              </span>
            </div>

            <h3 className="text-lg font-black text-white mb-1">{testCap.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{testCap.role}</p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Leadership Rating:</span>
                <span className="font-mono font-bold text-amber-400">{testCap.leadership}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tactical Composure:</span>
                <span className="font-mono font-bold text-white">Elite (Sessions 4 & 5)</span>
              </div>
              <div className="pt-2 border-t border-slate-900 text-[11px] text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>+12% Lower-order batting grit and bowling discipline</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Appoint Test Captain:
            </label>
            <select
              value={splitCaptains.testCaptainId}
              onChange={(e) => handleSelectCaptain('test', false, e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5 font-semibold focus:outline-none focus:border-emerald-500"
            >
              {squad.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.role} · Lead: {p.leadership})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ODI Captaincy Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                White-Ball 50-Over
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-400/10 text-sky-300 border border-sky-400/30">
                ODI Format
              </span>
            </div>

            <h3 className="text-lg font-black text-white mb-1">{odiCap.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{odiCap.role}</p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Leadership Rating:</span>
                <span className="font-mono font-bold text-sky-400">{odiCap.leadership}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fielding Strategy:</span>
                <span className="font-mono font-bold text-white">Ring Choke (Overs 11-40)</span>
              </div>
              <div className="pt-2 border-t border-slate-900 text-[11px] text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>-0.4 Economy rate during middle overs squeeze</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Appoint ODI Captain:
            </label>
            <select
              value={splitCaptains.odiCaptainId}
              onChange={(e) => handleSelectCaptain('odi', false, e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5 font-semibold focus:outline-none focus:border-emerald-500"
            >
              {squad.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.role} · Lead: {p.leadership})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* T20I Captaincy Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                High-Octane 20-Over
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-400/10 text-purple-300 border border-purple-400/30">
                T20I Match
              </span>
            </div>

            <h3 className="text-lg font-black text-white mb-1">{t20Cap.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{t20Cap.role}</p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Leadership Rating:</span>
                <span className="font-mono font-bold text-purple-400">{t20Cap.leadership}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Powerplay Bravado:</span>
                <span className="font-mono font-bold text-white">Aggressive Front-Foot</span>
              </div>
              <div className="pt-2 border-t border-slate-900 text-[11px] text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>+15% Boundary conversion rate in overs 1 to 6</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Appoint T20I Captain:
            </label>
            <select
              value={splitCaptains.t20CaptainId}
              onChange={(e) => handleSelectCaptain('t20', false, e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl p-2.5 font-semibold focus:outline-none focus:border-emerald-500"
            >
              {squad.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.role} · Lead: {p.leadership})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
