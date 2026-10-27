import React, { useState, useEffect } from 'react';
import { Globe2, Radio, Sparkles, TrendingUp, ChevronRight, Pause, Play } from 'lucide-react';
import { BoardCountry } from '../types/game';

interface WorldwideNewsTickerProps {
  country: BoardCountry;
  chairmanName: string;
}

const GLOBAL_HEADLINES = [
  { bureau: 'LONDON (Lord’s)', text: 'ECB confirms revolutionary multi-tiered Test match central contract structure with guaranteed match retention bonuses.' },
  { bureau: 'MUMBAI (BCCI HQ)', text: 'BCCI General Body ratifies $3.8 Billion digital streaming rights auction for the upcoming quadriennial international calendar.' },
  { bureau: 'DUBAI (ICC Bureau)', text: 'ICC Integrity Unit confirms 100% clean certification for ongoing bilateral DRS calibrations and ultra-motion ball tracking.' },
  { bureau: 'MELBOURNE (Cricket Australia)', text: 'CA High-Performance Centre unveils 8K biometric bowling radar technology to detect lumbar stress anomalies in fast bowlers.' },
  { bureau: 'LAHORE (Gaddafi Stadium)', text: 'PCB confirms sold-out bilateral series opening encounters with state-of-the-art presidential protocol security convoy.' },
  { bureau: 'CAPE TOWN (Newlands)', text: 'Cricket South Africa establishes emergency $15M franchise retention pool to fend off private overseas league poachers.' },
  { bureau: 'WELLINGTON (Basin Reserve)', text: 'NZC introduces advanced hybrid vacuum drainage systems across all premier test venues ahead of wet winter tours.' },
  { bureau: 'BRIDGETOWN (Kensington Oval)', text: 'Cricket West Indies announces landmark commercial apparel partnership and youth fast-bowling academy grant.' }
];

export const WorldwideNewsTicker: React.FC<WorldwideNewsTickerProps> = ({
  country,
  chairmanName
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GLOBAL_HEADLINES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeHeadline = GLOBAL_HEADLINES[currentIndex];

  return (
    <div className="bg-slate-950/95 border-b border-slate-800/80 px-4 py-1.5 flex items-center justify-between text-xs font-sans select-none shrink-0 z-10 backdrop-blur-sm">
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Live Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-400 font-black text-[10px] uppercase tracking-wider shrink-0">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>GLOBAL WIRE 28K</span>
        </div>

        {/* Bureau Tag */}
        <span className="text-[11px] font-bold text-amber-400 font-mono shrink-0 hidden sm:inline">
          [{activeHeadline.bureau}]
        </span>

        {/* Scrolling text */}
        <div className="text-slate-300 text-xs truncate max-w-xl md:max-w-3xl lg:max-w-5xl transition-all duration-300">
          {activeHeadline.text}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2 shrink-0 pl-2 text-slate-500">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-1 hover:text-slate-200 transition"
          title={isPaused ? 'Resume ticker' : 'Pause ticker'}
        >
          {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % GLOBAL_HEADLINES.length)}
          className="p-1 hover:text-slate-200 transition"
          title="Next headline"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
