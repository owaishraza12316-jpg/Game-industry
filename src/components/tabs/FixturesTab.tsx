import React from 'react';
import { CalendarDays, Play } from 'lucide-react';
import { Fixture, GameState } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface FixturesTabProps {
  fixtures: Fixture[];
  gameState: GameState;
  onPlayFixture: (fixture: Fixture) => void;
}

export const FixturesTab: React.FC<FixturesTabProps> = ({
  fixtures,
  gameState,
  onPlayFixture
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <CalendarDays className="w-4 h-4" />
          <span>ICC Future Tours Programme (FTP) Scheduling</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Fixtures & International Tour Itinerary
        </h2>
        <p className="text-xs text-slate-400">
          Official calendar of bilateral series, World Test Championship fixtures, and ICC trophy clashes.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Opponent</th>
                <th className="py-3 px-4 font-semibold">Format</th>
                <th className="py-3 px-4 font-semibold">Tour Series</th>
                <th className="py-3 px-4 font-semibold">Venue & City</th>
                <th className="py-3 px-4 font-semibold">Scheduled Date</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {fixtures.map((f, idx) => {
                const isNext = !f.isCompleted && (idx === 0 || fixtures[idx - 1]?.isCompleted);
                return (
                  <tr
                    key={f.id}
                    className={`transition-colors ${
                      isNext
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/15'
                        : f.isCompleted
                        ? 'bg-slate-950/40 opacity-75'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <span>{f.opponent}</span>
                      {isNext && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/20 px-1.5 py-0.5 rounded">
                          UPCOMING
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-amber-400">{f.format}</td>
                    <td className="py-3 px-4 text-slate-300">{f.seriesTitle}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {f.venue}, {f.city}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">{f.scheduledDate}</td>
                    <td className="py-3 px-4 text-center">
                      {f.isCompleted ? (
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          Completed
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Scheduled
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isNext ? (
                        <button
                          onClick={() => {
                            playClickSound();
                            onPlayFixture(f);
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 ml-auto"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play</span>
                        </button>
                      ) : f.isCompleted ? (
                        <span className="text-[11px] text-slate-400 italic font-mono">
                          {f.resultSummary || 'Finished'}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
