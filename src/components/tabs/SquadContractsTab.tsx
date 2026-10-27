import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Activity, 
  HeartPulse, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle,
  FileCheck2,
  Search,
  Filter,
  Briefcase
} from 'lucide-react';
import { Player, ContractGrade } from '../../types/game';
import { playClickSound, playCashChime } from '../../utils/sound';

interface SquadContractsTabProps {
  squad: Player[];
  treasury: number;
  onUpdateSquad: (updatedSquad: Player[], treasuryDelta?: number) => void;
}

export const SquadContractsTab: React.FC<SquadContractsTabProps> = ({
  squad,
  treasury,
  onUpdateSquad
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const filteredSquad = useMemo(() => {
    return squad.filter((p) => {
      if (selectedGrade !== 'ALL' && p.grade !== selectedGrade) return false;
      if (selectedCategory === 'Batters' && !p.role.includes('Batter') && !p.role.includes('Finisher') && !p.role.includes('Anchor')) return false;
      if (selectedCategory === 'Bowlers' && !p.role.includes('Pacer') && !p.role.includes('Spinner') && !p.role.includes('Specialist')) return false;
      if (selectedCategory === 'All-Rounders' && !p.role.includes('All-Rounder')) return false;
      if (selectedCategory === 'Keepers' && !p.role.includes('Wicketkeeper')) return false;

      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesRole = p.role.toLowerCase().includes(q);
        const matchesAgent = (p.agentName || '').toLowerCase().includes(q);
        if (!matchesName && !matchesRole && !matchesAgent) return false;
      }
      return true;
    });
  }, [squad, selectedGrade, selectedCategory, searchTerm]);

  const handleChangeGrade = (playerId: string, newGrade: ContractGrade) => {
    playClickSound();
    const updated = squad.map((p) => {
      if (p.id === playerId) {
        let newSalary = p.salary;
        if (newGrade === 'A+') newSalary = 2.5;
        else if (newGrade === 'A') newSalary = 1.8;
        else if (newGrade === 'B') newSalary = 1.2;
        else if (newGrade === 'C') newSalary = 0.8;
        else newSalary = 0.35;

        return { ...p, grade: newGrade, salary: newSalary, morale: 'Confident' as const };
      }
      return p;
    });
    onUpdateSquad(updated);
    showFeedback(`Contract grade updated to ${newGrade}!`);
  };

  const handleExtendContract = (playerId: string) => {
    const cost = 500000;
    if (treasury < cost) {
      alert('Insufficient board treasury funds to sign contract extension bonus!');
      return;
    }
    playCashChime();
    const updated = squad.map((p) => {
      if (p.id === playerId) {
        return {
          ...p,
          contractYears: p.contractYears + 1,
          morale: 'Ecstatic' as const,
          form: Math.min(100, p.form + 4)
        };
      }
      return p;
    });
    onUpdateSquad(updated, -cost);
    showFeedback(`Contract extended by 1 year with a signing bonus! Morale boosted.`);
  };

  const handleRehabPlayer = (playerId: string) => {
    const cost = 200000;
    if (treasury < cost) {
      alert('Insufficient funds for sports science medical rehabilitation.');
      return;
    }
    playClickSound();
    const updated = squad.map((p) => {
      if (p.id === playerId) {
        return {
          ...p,
          fitness: 100,
          isInjured: false,
          form: Math.min(100, p.form + 5)
        };
      }
      return p;
    });
    onUpdateSquad(updated, -cost);
    showFeedback(`Intensive rehab complete! Player fitness restored to 100%.`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Users className="w-4 h-4" />
            <span>National Central Contracts Management</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            National Squad & Dynamic Agent Ratings ({squad.length} Players)
          </h2>
          <p className="text-xs text-slate-400">
            60-Player national hierarchy across Grade A+, A, B, C and Domestic/Youth tiers. Review player attitudes and agency representation.
          </p>
        </div>

        {feedbackMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by player, role, agent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="ALL">All Contract Tiers (60 Total)</option>
            <option value="A+">Grade A+ (Elite)</option>
            <option value="A">Grade A (Core)</option>
            <option value="B">Grade B (Regular)</option>
            <option value="C">Grade C (Development)</option>
            <option value="Domestic / Youth">Domestic / Youth Circuit</option>
          </select>
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="ALL">All Disciplines</option>
            <option value="Batters">Batters (Top/Middle/Finisher)</option>
            <option value="Bowlers">Bowlers (Pace & Spin)</option>
            <option value="All-Rounders">All-Rounders</option>
            <option value="Keepers">Wicketkeepers</option>
          </select>
        </div>
      </div>

      {/* Roster Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Player & Representation</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Age</th>
                <th className="py-3 px-4 font-semibold text-center">Rating</th>
                <th className="py-3 px-4 font-semibold text-center">Attitude</th>
                <th className="py-3 px-4 font-semibold text-center">Contract Grade</th>
                <th className="py-3 px-4 font-semibold text-right">Annual Salary</th>
                <th className="py-3 px-4 font-semibold text-center">Form</th>
                <th className="py-3 px-4 font-semibold text-center">Fitness</th>
                <th className="py-3 px-4 font-semibold text-center">Morale</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSquad.map((p) => {
                const isTopRating = p.rating >= 92;
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {isTopRating && <span title="World Class Star">⭐</span>}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {p.agentName ? `Rep: ${p.agentName}` : `${p.matches} matches · ${p.runs} runs`}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{p.role}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{p.age}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                        p.rating >= 90
                          ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                          : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                      }`}>
                        {p.rating}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                        {p.attitude || 'Model Professional'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select
                        value={p.grade}
                        onChange={(e) => handleChangeGrade(p.id, e.target.value as ContractGrade)}
                        className="bg-slate-950 border border-slate-700 text-white rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                      >
                        <option value="A+">Grade A+</option>
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C</option>
                        <option value="Domestic / Youth">Domestic</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-400">
                      ${p.salary.toFixed(2)}M
                      <span className="text-[10px] text-slate-400 block">
                        ({p.contractYears} yrs left)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-mono font-semibold text-slate-200">{p.form}%</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-mono font-semibold ${
                        p.fitness < 85 ? 'text-rose-400 font-bold' : 'text-emerald-400'
                      }`}>
                        {p.fitness}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] font-semibold text-slate-300">{p.morale}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleExtendContract(p.id)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded text-[11px] font-bold border border-slate-700 transition-colors"
                          title="Extend contract by 1 year (Costs $500k bonus)"
                        >
                          +1 Yr
                        </button>
                        <button
                          onClick={() => handleRehabPlayer(p.id)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded text-[11px] font-bold border border-slate-700 transition-colors"
                          title="Send to Sports Science Rehab (Restores Fitness to 100%, Costs $200k)"
                        >
                          Rehab
                        </button>
                      </div>
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
