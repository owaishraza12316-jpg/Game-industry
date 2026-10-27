import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, UserPlus, Award } from 'lucide-react';
import { Player } from '../../types/game';
import { playClickSound, playCashChime } from '../../utils/sound';

interface SelectionYouthTabProps {
  squad: Player[];
  treasury: number;
  onPromoteWonderkid: (wonderkid: Player) => void;
}

export const SelectionYouthTab: React.FC<SelectionYouthTabProps> = ({
  squad,
  treasury,
  onPromoteWonderkid
}) => {
  const [scoutedWonderkids, setScoutedWonderkids] = useState<Player[]>([
    {
      id: `youth-${Date.now()}-1`,
      name: 'Amanullah Tariq',
      country: 'India',
      role: 'Express Pacer',
      age: 18,
      rating: 81,
      battingRating: 42,
      bowlingRating: 88,
      fieldingRating: 86,
      leadership: 72,
      grade: 'Domestic / Youth',
      salary: 0.2,
      contractYears: 3,
      form: 95,
      fitness: 99,
      morale: 'Ecstatic',
      matches: 4,
      runs: 24,
      battingAvg: 12.0,
      strikeRate: 85.0,
      centuries: 0,
      fifties: 0,
      wickets: 14,
      bowlingAvg: 17.5,
      economy: 4.8,
      bestBowling: '5/22'
    },
    {
      id: `youth-${Date.now()}-2`,
      name: 'Kavindu Fernando',
      country: 'India',
      role: 'Opening Batter',
      age: 17,
      rating: 80,
      battingRating: 85,
      bowlingRating: 30,
      fieldingRating: 88,
      leadership: 70,
      grade: 'Domestic / Youth',
      salary: 0.2,
      contractYears: 3,
      form: 98,
      fitness: 100,
      morale: 'Ecstatic',
      matches: 6,
      runs: 380,
      battingAvg: 63.3,
      strikeRate: 114.0,
      centuries: 2,
      fifties: 1,
      wickets: 0,
      bowlingAvg: 0,
      economy: 0,
      bestBowling: '0/0'
    }
  ]);

  const [notice, setNotice] = useState<string | null>(null);

  const handleScanAcademy = () => {
    playClickSound();
    const wonderkidNames = [
      'Aryan Vaidya', 'Siddharth Kaul Jr', 'Devdutt Patel', 'Haris Mehmood', 'Callum Richardson', 'Kwame Nkosi'
    ];
    const roles: Player['role'][] = ['Opening Batter', 'Express Pacer', 'Mystery Spinner', 'Pace All-Rounder'];

    const chosenName = wonderkidNames[Math.floor(Math.random() * wonderkidNames.length)];
    const chosenRole = roles[Math.floor(Math.random() * roles.length)];

    const newProspect: Player = {
      id: `youth-${Date.now()}-${Math.random()}`,
      name: chosenName,
      country: squad[0]?.country || 'India',
      role: chosenRole,
      age: 17 + Math.floor(Math.random() * 3),
      rating: 79 + Math.floor(Math.random() * 5),
      battingRating: chosenRole.includes('Batter') ? 86 : 40,
      bowlingRating: chosenRole.includes('Pacer') || chosenRole.includes('Spinner') ? 88 : 35,
      fieldingRating: 85,
      leadership: 70,
      grade: 'Domestic / Youth',
      salary: 0.25,
      contractYears: 3,
      form: 95,
      fitness: 98,
      morale: 'Ecstatic',
      matches: 2,
      runs: 45,
      battingAvg: 22.5,
      strikeRate: 110.0,
      centuries: 0,
      fifties: 0,
      wickets: 6,
      bowlingAvg: 18.0,
      economy: 5.2,
      bestBowling: '3/18'
    };

    setScoutedWonderkids([newProspect, ...scoutedWonderkids]);
    setNotice(`Under-19 National Championship scanned! Found 17-year-old wonderkid ${chosenName} (${chosenRole}).`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleDraft = (prospect: Player) => {
    playCashChime();
    onPromoteWonderkid(prospect);
    setScoutedWonderkids(scoutedWonderkids.filter((p) => p.id !== prospect.id));
    setNotice(`${prospect.name} promoted to the Senior National Squad!`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>National Scouting Grid & Form-First Selection Logic</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Selection Committee & Youth Wonderkid Pipeline
          </h2>
          <p className="text-xs text-slate-400">
            Scan domestic tournaments to discover 17-19 year old prodigies before global private franchise leagues poach them.
          </p>
        </div>

        <button
          onClick={handleScanAcademy}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all shadow-xl shadow-emerald-500/20 text-xs flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Scan Domestic Under-19 Circuit</span>
        </button>
      </div>

      {notice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Scouted Wonderkids Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Scouted Academy Prospects Ready for National Promotion
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scoutedWonderkids.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-base font-bold text-white">{p.name}</h4>
                    <span className="text-xs text-slate-400">{p.role} · Age {p.age}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    Rating {p.rating}
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs my-3 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Form:</span>
                    <span className="text-emerald-400 font-bold">{p.form}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fitness:</span>
                    <span className="text-emerald-400 font-bold">{p.fitness}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Projected Peak:</span>
                    <span className="text-amber-400 font-bold">95+ Superstar Rating</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDraft(p)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign to Senior National Squad ($250k)</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
