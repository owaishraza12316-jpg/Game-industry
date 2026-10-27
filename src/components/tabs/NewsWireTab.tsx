import React, { useState } from 'react';
import { Newspaper, Filter, Clock, TrendingUp } from 'lucide-react';
import { NewsItem } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface NewsWireTabProps {
  news: NewsItem[];
}

export const NewsWireTab: React.FC<NewsWireTabProps> = ({ news }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Board Executive', 'Match Day', 'Franchise & NOC', 'Squad & Selection'];

  const filtered = selectedCat === 'All' ? news : news.filter((n) => n.category === selectedCat);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Official Global Wire & Press Communiqué</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Global News Wire
          </h2>
          <p className="text-xs text-slate-400">
            Real-time coverage of executive board decisions, multi-million dollar sponsorships, player injuries, and international match reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                playClickSound();
                setSelectedCat(c);
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCat === c ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                {item.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.timestamp}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">{item.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{item.body}</p>

            {item.impactTrust && item.impactTrust !== 0 && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Impact on Fan Trust: +{item.impactTrust}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
