import React, { useState } from 'react';
import { Crown, Sparkles, CheckCircle2, Star, ShieldAlert } from 'lucide-react';
import { playClickSound, playVictoryFanfare } from '../../utils/sound';

interface VipCeremoniesTabProps {
  treasury: number;
  onInviteGuest: (cost: number, trustGain: number, guestName: string) => void;
}

export const VipCeremoniesTab: React.FC<VipCeremoniesTabProps> = ({
  treasury,
  onInviteGuest
}) => {
  const [notice, setNotice] = useState<string | null>(null);

  const VIP_GUESTS = [
    {
      id: 'vip-1',
      title: 'Prime Minister & Head of State',
      role: 'Diplomatic State Dignitary',
      cost: 4500000,
      trustGain: 8,
      desc: 'High-security convoy, national anthem parade, coin toss ceremonial presentation.',
      impact: 'Massive political backing, 100% capacity sellout, global state telecast.'
    },
    {
      id: 'vip-2',
      title: 'Bollywood & Hollywood Global Superstar',
      role: 'Entertainment Icon',
      cost: 3200000,
      trustGain: 6,
      desc: 'Innings break live performance, stadium aerial pyro, international red carpet arrival.',
      impact: '+35% CricketX social buzz, youth fan engagement skyrockets.'
    },
    {
      id: 'vip-3',
      title: 'Cricket Hall of Fame Legends Delegation',
      role: 'Heritage & Legacy Council',
      cost: 1500000,
      trustGain: 5,
      desc: 'Sachin Tendulkar, Ricky Ponting & Brian Lara ringing the five-minute match bell.',
      impact: 'Universal purist acclaim, board integrity benchmarked at peak.'
    }
  ];

  const handleInvite = (guest: typeof VIP_GUESTS[0]) => {
    if (treasury < guest.cost) {
      alert('Insufficient treasury funds to finance this high-profile ceremonial suite.');
      return;
    }
    playVictoryFanfare();
    onInviteGuest(guest.cost, guest.trustGain, guest.title);
    setNotice(`${guest.title} confirmed attendance! Global media spotlight locked onto our match.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          <Crown className="w-4 h-4" />
          <span>Diplomatic Protocol & Entertainment Grandeur</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          VIP Chief Guests & Ceremonies Suite
        </h2>
        <p className="text-xs text-slate-400">
          Invite Heads of State, cultural icons, and living cricket legends to headline opening ceremonies and finals. Elevates commercial viewership and fan prestige worldwide.
        </p>
      </div>

      {notice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VIP_GUESTS.map((guest) => (
          <div
            key={guest.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  {guest.role}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  +{guest.trustGain}% Trust
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-2">{guest.title}</h3>
              <p className="text-xs text-slate-400 mb-4">{guest.desc}</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs mb-4 text-slate-300">
                <strong className="text-white block mb-1">Impact:</strong>
                {guest.impact}
              </div>
            </div>

            <button
              onClick={() => handleInvite(guest)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Invite to Ceremony (${(guest.cost / 1000000).toFixed(1)}M)</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
