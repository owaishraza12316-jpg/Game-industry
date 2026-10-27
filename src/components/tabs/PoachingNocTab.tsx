import React, { useState } from 'react';
import { Scale, AlertTriangle, CheckCircle, XCircle, DollarSign, ShieldAlert } from 'lucide-react';
import { Player } from '../../types/game';
import { playClickSound, playCashChime } from '../../utils/sound';

interface PoachingNocTabProps {
  squad: Player[];
  onNocDecision: (playerId: string, decision: 'approved' | 'denied' | 'conditional', feeGain: number) => void;
}

export const PoachingNocTab: React.FC<PoachingNocTabProps> = ({
  squad,
  onNocDecision
}) => {
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const pendingNocs = squad.filter((p) => p.requestedNoc);

  const handleDecision = (player: Player, decision: 'approved' | 'denied' | 'conditional') => {
    let fee = 0;
    if (decision === 'approved') {
      fee = (player.nocFeeOffer || 1.5) * 1000000;
      playCashChime();
      setActionNotice(`Full NOC Granted for ${player.name}. Board received $${(fee / 1000000).toFixed(2)}M franchise release fee.`);
    } else if (decision === 'conditional') {
      fee = ((player.nocFeeOffer || 1.5) / 2) * 1000000;
      playCashChime();
      setActionNotice(`Conditional 5-Match Window Granted for ${player.name}. Board collected $${(fee / 1000000).toFixed(2)}M.`);
    } else {
      playClickSound();
      setActionNotice(`NOC Denied for ${player.name}. National duty prioritized for upcoming bilateral tour.`);
    }

    onNocDecision(player.id, decision, fee);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
          <Scale className="w-4 h-4" />
          <span>International Regulatory Affairs & Player Welfare</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Foreign League Poaching & NOC Approvals
        </h2>
        <p className="text-xs text-slate-400">
          Global private franchise leagues (IPL, BBL, PSL, SA20, The Hundred) seek release certificates for your marquee stars. Weigh lucrative release compensation against player burnout and tour clashes.
        </p>
      </div>

      {actionNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {pendingNocs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
          <ShieldAlert className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">All NOC Applications Cleared</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No foreign league release certificates currently pending executive sign-off. All contracted national players are focused on international commitments.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingNocs.map((player) => (
            <div
              key={player.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{player.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    Rating {player.rating}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  Target League: <strong className="text-emerald-400">{player.nocFranchise || 'Overseas T20 Franchise'}</strong>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                  <span>
                    Release Bounty Offer: <strong className="text-white font-mono">${(player.nocFeeOffer || 1.5).toFixed(1)}M</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Current Fitness: <strong className="text-white font-mono">{player.fitness}%</strong>
                  </span>
                  <span>·</span>
                  <span className="text-amber-400">
                    Risk: -10% Fitness & Tour Fatigue
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => handleDecision(player, 'approved')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Grant Full NOC (+${(player.nocFeeOffer || 1.5).toFixed(1)}M)</span>
                </button>

                <button
                  onClick={() => handleDecision(player, 'conditional')}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold px-3 py-2.5 rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
                >
                  <span>Conditional 5-Match Cap</span>
                </button>

                <button
                  onClick={() => handleDecision(player, 'denied')}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-2.5 rounded-xl transition-all border border-rose-500/30 flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Veto / Deny NOC</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
