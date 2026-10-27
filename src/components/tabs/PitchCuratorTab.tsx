import React from 'react';
import { CloudSunRain, Sparkles, CheckCircle2, Wind } from 'lucide-react';
import { PitchType } from '../../types/game';
import { playClickSound } from '../../utils/sound';

interface PitchCuratorTabProps {
  pitchPreference: PitchType;
  onChangePitch: (newPitch: PitchType) => void;
}

interface PitchCard {
  type: PitchType;
  title: string;
  badge: string;
  description: string;
  paceBonus: string;
  spinBonus: string;
  battingPar: string;
  grassCover: number; // percentage
  soilMoisture: number; // percentage
}

const PITCH_OPTIONS: PitchCard[] = [
  {
    type: 'Green Top',
    title: 'Green Top (Pacer Paradise)',
    badge: 'Heavy Seam & Swing',
    description: 'Generous 8mm grass coating. The ball darts off the seam and swings late through the air.',
    paceBonus: '+15% Wicket Lethality for Express Pacers',
    spinBonus: 'Minimal grip for spinners',
    battingPar: '155 - 170 in T20I (Tricky run chase)',
    grassCover: 85,
    soilMoisture: 65
  },
  {
    type: 'Dustbowl',
    title: 'Subcontinental Dustbowl (Rank Turner)',
    badge: 'Sharp Spin & Variable Bounce',
    description: 'Dry clay surface baked under intense heat. Footmarks develop early with massive spin deviation.',
    paceBonus: 'Limited seam; reverse swing in later overs',
    spinBonus: '+20% Turn & Drift for Finger/Mystery Spinners',
    battingPar: '145 - 160 in T20I (Requires elite footwork)',
    grassCover: 10,
    soilMoisture: 20
  },
  {
    type: 'Flat Batting Paradise',
    title: 'High-Altitude Flat Belter',
    badge: 'True Bounce & Run Feast',
    description: 'Even pace, zero lateral devilment. Batters hit through the line with supreme boundary trust.',
    paceBonus: 'Demands pinpoint yorkers and slower balls',
    spinBonus: 'Flatter trajectory needed to prevent sixes',
    battingPar: '210+ in T20I (Spectacular boundary storm)',
    grassCover: 30,
    soilMoisture: 40
  },
  {
    type: 'Sporting Balanced',
    title: 'Sporting 50/50 Surface',
    badge: 'Fair Battle Bat vs Ball',
    description: 'Firm carry with early movement for pacers that settles into prime batting condition before aiding spin.',
    paceBonus: '+5% Early powerplay swing',
    spinBonus: '+6% Middle-overs grip',
    battingPar: '180 - 195 in T20I (Tactical masterclass)',
    grassCover: 45,
    soilMoisture: 50
  }
];

export const PitchCuratorTab: React.FC<PitchCuratorTabProps> = ({
  pitchPreference,
  onChangePitch
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
          <CloudSunRain className="w-4 h-4" />
          <span>Agronomy & Home Ground Surface Engineering</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Pitch Curator & Weather Dynamics
        </h2>
        <p className="text-xs text-slate-400">
          Exercise sovereign executive authority to instruct home stadium chief curators. Tailor the strip to maximize your squad’s bowling strengths and neutralize touring opponents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PITCH_OPTIONS.map((p) => {
          const isSelected = pitchPreference === p.type;
          return (
            <div
              key={p.type}
              onClick={() => {
                playClickSound();
                onChangePitch(p.type);
              }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-emerald-500/10 border-emerald-500 shadow-xl shadow-emerald-500/10'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {p.badge}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{p.description}</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs space-y-2 mb-4 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pace Dynamics:</span>
                  <span className="text-emerald-400 font-bold">{p.paceBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Spin Dynamics:</span>
                  <span className="text-purple-400 font-bold">{p.spinBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Par Total:</span>
                  <span className="text-amber-400 font-bold">{p.battingPar}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                <span className="text-slate-400">Curator Readiness:</span>
                {isSelected ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active Directive Prepared</span>
                  </span>
                ) : (
                  <span className="text-slate-500">Click to Order This Strip</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
