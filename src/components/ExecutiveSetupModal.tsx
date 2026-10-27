import React, { useState } from 'react';
import { BoardCountry } from '../types/game';
import { COUNTRY_PROFILES } from '../data/initialData';
import { playClickSound, playVictoryFanfare } from '../utils/sound';

interface ExecutiveSetupModalProps {
  onStartCareer: (name: string, country: BoardCountry) => void;
}

export const ExecutiveSetupModal: React.FC<ExecutiveSetupModalProps> = ({ onStartCareer }) => {
  const [name, setName] = useState('Owais');
  const [selectedCountry, setSelectedCountry] = useState<BoardCountry>('India');

  const selectedProfile = COUNTRY_PROFILES[selectedCountry];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    playVictoryFanfare();
    onStartCareer(name.trim(), selectedCountry);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🏏</span>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Global Cricket Chairman Pro 2026
            </h2>
          </div>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Welcome to the premier international cricket governance and tactical simulation. Command multi-million dollar broadcasting syndicates, national squads, stadium infrastructure, and live high-pressure match calls.
          </p>

          <form onSubmit={handleStart} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Your Chairman Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="e.g. Owais, Sir Donald, or Jay"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select National Governing Board:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(COUNTRY_PROFILES) as BoardCountry[]).map((c) => {
                  const prof = COUNTRY_PROFILES[c];
                  const isSelected = selectedCountry === c;
                  return (
                    <button
                      type="button"
                      key={c}
                      onClick={() => {
                        playClickSound();
                        setSelectedCountry(c);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{prof.flagEmoji}</span>
                        <span className="text-xs font-bold text-white truncate">{c}</span>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400">
                        ${(prof.initialTreasury / 1000000).toFixed(0)}M Treasury
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Board summary preview */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Governing Body:</span>
                <span className="font-semibold text-white">{selectedProfile.boardName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Flagship Arena:</span>
                <span className="font-semibold text-amber-400">
                  {selectedProfile.homeStadiums[0]?.name} ({selectedProfile.homeStadiums[0]?.capacity.toLocaleString()} seats)
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Board Stability Baseline:</span>
                <span className="font-semibold text-sky-400">{selectedProfile.initialStability}%</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 text-sm"
            >
              <span>Assume Executive Chairmanship</span>
              <span>🚀</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
