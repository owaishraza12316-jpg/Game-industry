import React, { useState } from 'react';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { RankingEntry } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface RankingsTabProps {
  rankings: RankingEntry[];
  ourCountry: string;
}

export const RankingsTab: React.FC<RankingsTabProps> = ({
  rankings,
  ourCountry
}) => {
  const [format, setFormat] = useState<'all' | 'test' | 'odi' | 't20'>('all');

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Trophy className="w-4 h-4" />
            <span>Official International Cricket Council Standings</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            ICC Rankings & Franchise Tables
          </h2>
          <p className="text-xs text-slate-400">
            Real-time standings across Test, ODI, and T20I formats based on weighted bilateral series points.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['all', 'test', 'odi', 't20'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                playClickSound();
                setFormat(f);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors uppercase ${
                format === f ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold text-center">Rank</th>
                <th className="py-3 px-4 font-semibold">National Board</th>
                <th className="py-3 px-4 font-semibold text-center">Test Rating</th>
                <th className="py-3 px-4 font-semibold text-center">ODI Rating</th>
                <th className="py-3 px-4 font-semibold text-center">T20I Rating</th>
                <th className="py-3 px-4 font-semibold text-right">ICC Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {rankings.map((r) => {
                const isOurBoard = r.country === ourCountry;
                return (
                  <tr
                    key={r.country}
                    className={`transition-colors ${
                      isOurBoard
                        ? 'bg-amber-400/10 font-bold'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-bold text-white">
                      #{r.rank}
                    </td>
                    <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                      <span>{r.country}</span>
                      {isOurBoard && (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-400/20 px-1.5 py-0.2 rounded">
                          OUR BOARD
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-amber-400">
                      {r.testRating}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-sky-400">
                      {r.odiRating}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-purple-400">
                      {r.t20Rating}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      {r.points.toLocaleString()} pts
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
