import React from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Menu, 
  Flame, 
  TrendingUp, 
  Calendar,
  Save,
  RotateCcw
} from 'lucide-react';
import { GameState } from '../types/game';
import { playClickSound } from '../utils/sound';

interface HeaderProps {
  gameState: GameState;
  onToggleSim: () => void;
  onChangeSpeed: (speed: number) => void;
  onToggleSidebar: () => void;
  onToggleSound: () => void;
  onOpenMatchModal: () => void;
  onQuickSave: () => void;
  onResetGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gameState,
  onToggleSim,
  onChangeSpeed,
  onToggleSidebar,
  onToggleSound,
  onOpenMatchModal,
  onQuickSave,
  onResetGame
}) => {
  const currentDateFormatted = new Date(gameState.currentDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left: Brand / Chairman Profile */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => {
            playClickSound();
            onToggleSidebar();
          }}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle Navigation Menu"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-white tracking-tight leading-none whitespace-nowrap">
              {gameState.chairmanName}
            </h1>
            <span className="text-xs text-amber-400 font-medium bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
              Chairman
            </span>
          </div>
          <p className="text-xs text-slate-400 truncate max-w-[200px] md:max-w-xs mt-0.5">
            {gameState.boardName}
          </p>
        </div>
      </div>

      {/* Center: Live Simulation Controls */}
      <div className="flex items-center gap-2 md:gap-3 bg-slate-950/80 border border-slate-800 py-1.5 px-3 rounded-xl">
        <button
          onClick={() => {
            playClickSound();
            onToggleSim();
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            gameState.isSimulating
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
              : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20'
          }`}
          title="Spacebar to Play/Pause"
        >
          {gameState.isSimulating ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Sim</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
          {[1, 2, 5, 10].map((spd) => (
            <button
              key={spd}
              onClick={() => {
                playClickSound();
                onChangeSpeed(spd);
              }}
              className={`px-1.5 py-0.5 text-[11px] rounded font-mono font-medium transition-colors ${
                gameState.simSpeed === spd
                  ? 'bg-slate-700 text-amber-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-800 pl-3 text-xs text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-200">{currentDateFormatted}</span>
        </div>

        {gameState.matchAlertFixture && (
          <button
            onClick={() => {
              playClickSound();
              onOpenMatchModal();
            }}
            className="flex items-center gap-1.5 bg-rose-500 text-white text-xs px-2.5 py-1 rounded-lg animate-pulse font-bold tracking-wide ml-1"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>MATCH READY!</span>
          </button>
        )}
      </div>

      {/* Right: Board Meters & Sound & Save */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Treasury */}
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Treasury
          </span>
          <span className="text-sm font-bold font-mono text-emerald-400">
            ${(gameState.treasury / 1000000).toFixed(1)}M
          </span>
        </div>

        {/* Fan Trust */}
        <div className="hidden xl:flex flex-col items-end border-l border-slate-800 pl-3">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Fan Trust
          </span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span className="text-sm font-bold font-mono text-amber-400">
              {gameState.fanTrust}%
            </span>
          </div>
        </div>

        {/* Board Stability */}
        <div className="hidden xl:flex flex-col items-end border-l border-slate-800 pl-3">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
            Stability
          </span>
          <span className="text-sm font-bold font-mono text-sky-400">
            {gameState.boardStability}%
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
          <button
            onClick={() => {
              playClickSound();
              onToggleSound();
            }}
            className={`p-2 rounded-lg transition-colors ${
              gameState.soundEnabled
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-rose-400 hover:bg-rose-950/40'
            }`}
            title={gameState.soundEnabled ? 'Mute Sounds (M)' : 'Unmute Sounds (M)'}
          >
            {gameState.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playClickSound();
              onQuickSave();
            }}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Save Game to Browser"
          >
            <Save className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              if (window.confirm('Start a new career as Chairman? All unsaved progress will reset.')) {
                onResetGame();
              }
            }}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Career"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
