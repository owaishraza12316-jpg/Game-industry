import React, { useState } from 'react';
import { Handshake, Award, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { Sponsor } from '../../types/game';
import { playCashChime } from '../../utils/sound';

interface SponsorsTabProps {
  sponsors: Sponsor[];
  onRenewSponsor: (sponsorId: string) => void;
}

export const SponsorsTab: React.FC<SponsorsTabProps> = ({
  sponsors,
  onRenewSponsor
}) => {
  const [signedNotice, setSignedNotice] = useState<string | null>(null);

  const handleRenew = (sp: Sponsor) => {
    playCashChime();
    onRenewSponsor(sp.id);
    setSignedNotice(`Commercial agreement renewed with ${sp.brand} for an additional 2 years!`);
    setTimeout(() => setSignedNotice(null), 3500);
  };

  const totalSponsorValue = sponsors.reduce((acc, curr) => acc + curr.annualValue, 0);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Handshake className="w-4 h-4" />
            <span>Corporate Partnerships & Brand Syndication</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Commercial Sponsors Marketplace
          </h2>
          <p className="text-xs text-slate-400">
            Sign multi-million dollar jersey sponsorships, boundary hoarding placements, and official national beverage partnerships.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right shrink-0">
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Sponsor Portfolio</div>
          <div className="text-xl font-black font-mono text-emerald-400">
            ${(totalSponsorValue / 1000000).toFixed(1)}M / year
          </div>
        </div>
      </div>

      {signedNotice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{signedNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsors.map((sp) => (
          <div
            key={sp.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {sp.tier}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800">
                  {sp.yearsLeft} Years Remaining
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md"
                  style={{ backgroundColor: sp.logoColor }}
                >
                  {sp.brand.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{sp.brand}</h3>
                  <div className="text-xs text-slate-400">Official Brand Sponsor</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs space-y-2 mb-4 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Payout:</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    ${(sp.annualValue / 1000000).toFixed(1)}M USD
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Board Reputation Index:</span>
                  <span className="text-amber-400 font-bold">+{sp.reputationBonus}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRenew(sp)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Renew & Extend (+2 Years)</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
