import React from 'react';
import { 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Calendar, 
  ArrowRight, 
  Users, 
  Tv, 
  Sparkles,
  Zap,
  Building,
  Target,
  Globe2,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { GameState, Fixture } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface DashboardTabProps {
  gameState: GameState;
  onPlayNextMatch: () => void;
  onSimulateInstantly: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  gameState,
  onPlayNextMatch,
  onSimulateInstantly,
  onNavigateTab
}) => {
  const nextFixture = gameState.fixtures.find(f => !f.isCompleted) || gameState.fixtures[0];

  return (
    <div className="space-y-6">
      {/* Chairman Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Chairman Executive Suite · {gameState.country}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, Chairman {gameState.chairmanName}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your governing board holds international stature. Next bilateral clash is scheduled against{' '}
              <strong className="text-white">{nextFixture.opponent}</strong> ({nextFixture.format}) at {nextFixture.venue}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playClickSound();
                onPlayNextMatch();
              }}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm"
            >
              <span>Enter Match Center</span>
              <span>🏏</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onSimulateInstantly();
              }}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-3.5 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 text-sm"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Quick Simulate</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Treasury Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ${(gameState.treasury / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-slate-400 mt-1">
            +12.4% net positive cash flow from media rights
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Fan Approval</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {gameState.fanTrust}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            CricketX social sentiment trending strongly positive
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Board Stability</span>
            <Shield className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black font-mono text-sky-400">
            {gameState.boardStability}%
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Committees and state cricket associations aligned
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-bold tracking-wider">Match Win Record</span>
            <Trophy className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {gameState.totalMatchesWon}W - {gameState.totalMatchesLost}L
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {gameState.trophiesWon.length > 0 ? `${gameState.trophiesWon.length} Major Trophies Won` : 'Tournaments underway'}
          </p>
        </div>
      </div>

      {/* Two Column Grid: Upcoming Fixture Spotlight + Executive Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Match Spotlight */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Next Scheduled International Encounter</span>
              </h3>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {nextFixture.format}
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-center flex-1">
                  <div className="text-lg font-black text-white">{gameState.country}</div>
                  <div className="text-xs text-slate-400">Home Nation</div>
                </div>
                <div className="text-xl font-black text-amber-400 font-mono px-3">VS</div>
                <div className="text-center flex-1">
                  <div className="text-lg font-black text-white">{nextFixture.opponent}</div>
                  <div className="text-xs text-slate-400">Touring Squad</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 text-xs text-slate-400 space-y-1">
                <div>Venue: <strong className="text-slate-200">{nextFixture.venue}, {nextFixture.city}</strong></div>
                <div>Tour Series: <strong className="text-slate-200">{nextFixture.seriesTitle}</strong></div>
                <div>Home Pitch Order: <strong className="text-emerald-400">{gameState.pitchPreference}</strong></div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                playClickSound();
                onPlayNextMatch();
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
            >
              <span>Play Live Tactical Match</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playClickSound();
                onNavigateTab('fixtures');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
            >
              Full Calendar
            </button>
          </div>
        </div>

        {/* Quick Executive Actions Hub */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-base font-bold text-white tracking-tight mb-2">
            Executive Directives Hub
          </h3>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('tactics');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-emerald-500/10 hover:bg-emerald-500/15 rounded-xl border border-emerald-500/30 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Target className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Match Tactics & Opponent War Room</div>
                <div className="text-[11px] text-emerald-400/90 font-mono">
                  {gameState.matchTactics?.battingStrategy || 'Aggressive Batting'} · {gameState.matchTactics?.bowlingBias || 'Pace Bias'}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('squad');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Users className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Squad & Central Contracts</div>
                <div className="text-[11px] text-slate-400">Review salaries, A+ grades, form and fitness</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('crisis');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-rose-500/10 hover:bg-rose-500/15 rounded-xl border border-rose-500/30 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Board Crisis Management Unit</div>
                <div className="text-[11px] text-rose-400/90 font-mono">
                  {gameState.activeCrisis ? '⚡ Active Boardroom Emergency' : 'Zero Active Scandals · Clean Audit'}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-400" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('facilities');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                <Eye className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">4D Visual Facilities & Executive HQ</div>
                <div className="text-[11px] text-slate-400">8K Stadium camera array, pressroom, hospital & luxury soaps</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('market');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Globe2 className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Global Player Market</div>
                <div className="text-[11px] text-slate-400">Scout international stars & negotiate transfer buyouts</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('broadcast');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-sky-500/10 text-sky-400 rounded-lg">
                <Tv className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Media & TV Rights Auctions</div>
                <div className="text-[11px] text-slate-400">Multi-year rights packages and UltraMotion 4K</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('stadiums');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Building className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">Stadium Infrastructure Upgrades</div>
                <div className="text-[11px] text-slate-400">SubAir drainage, LED floodlights, 100k+ arenas</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateTab('poaching');
            }}
            className="w-full flex items-center justify-between p-3.5 bg-slate-950/70 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                <Shield className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-bold text-white">NOCs & Foreign League Poaching</div>
                <div className="text-[11px] text-slate-400">Approve or deny star players for IPL/BBL</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
