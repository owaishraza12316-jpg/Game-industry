import React, { useState } from 'react';
import { Tv, Sparkles, CheckCircle, Video, Camera, Cpu, Award } from 'lucide-react';
import { BroadcastDeal } from '../../types/game';
import { playCashChime, playClickSound } from '../../utils/sound';

interface BroadcastingTabProps {
  deals: BroadcastDeal[];
  treasury: number;
  onSignNewDeal: (network: string, annualVal: number, years: number) => void;
  onUpgradeTech: (dealId: string, techName: keyof BroadcastDeal['techEquipped'], cost: number) => void;
}

export const BroadcastingTab: React.FC<BroadcastingTabProps> = ({
  deals,
  treasury,
  onSignNewDeal,
  onUpgradeTech
}) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAuction = () => {
    playCashChime();
    const network = 'Global Star Sports & Prime OTT Syndicate';
    const annualVal = 72000000;
    const years = 4;
    onSignNewDeal(network, annualVal, years);
    setFeedback(`Record-breaking 4-year $288M ($72M/yr) Global Media Rights deal signed! Initial installment credited.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleTechPurchase = (deal: BroadcastDeal, techKey: keyof BroadcastDeal['techEquipped']) => {
    const cost = 8000000;
    if (treasury < cost) {
      alert('Insufficient board treasury funds to procure this broadcast hardware suite ($8.0M needed).');
      return;
    }
    playCashChime();
    onUpgradeTech(deal.id, techKey, cost);
    setFeedback(`Advanced broadcast technology deployed! Viewer satisfaction and global commercial appeal boosted.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
            <Tv className="w-4 h-4" />
            <span>Commercial Telecast & Global OTT Media Rights</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Broadcasting & Media Rights Auction
          </h2>
          <p className="text-xs text-slate-400">
            Monetize live matches across linear broadcast, satellite, and mobile streaming syndicates. Equip match feeds with state-of-the-art camera tech.
          </p>
        </div>

        <button
          onClick={handleAuction}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all shadow-xl shadow-emerald-500/20 text-xs flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Mega Rights Auction</span>
        </button>
      </div>

      {feedback && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Broadcast Rights Cards */}
      <div className="space-y-4">
        {deals.map((d) => (
          <div
            key={d.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
              <div>
                <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                  {d.format}
                </span>
                <h3 className="text-lg font-black text-white">{d.network}</h3>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-mono text-emerald-400">
                  ${(d.annualValue / 1000000).toFixed(1)}M / year
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {d.yearsRemaining} years remaining on covenant
                </div>
              </div>
            </div>

            {/* Broadcast Tech Upgrades */}
            <div className="border-t border-slate-800 pt-4">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Stadium Production & Camera Array Specifications
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* UltraMotion 4K */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Camera className="w-4 h-4 text-sky-400" />
                      <span>UltraMotion 4K</span>
                    </div>
                    <p className="text-[11px] text-slate-400">1000fps bat-edge micro slow-motion.</p>
                  </div>
                  {d.techEquipped.ultraMotion4K ? (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Equipped
                    </span>
                  ) : (
                    <button
                      onClick={() => handleTechPurchase(d, 'ultraMotion4K')}
                      className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 py-1.5 px-2 rounded-lg border border-slate-700 transition-colors"
                    >
                      Install ($8M)
                    </button>
                  )}
                </div>

                {/* Spidercam */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Video className="w-4 h-4 text-purple-400" />
                      <span>SpiderCam Wire</span>
                    </div>
                    <p className="text-[11px] text-slate-400">3D aerial swoop over pitch and bowler run-up.</p>
                  </div>
                  {d.techEquipped.spiderCam ? (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Equipped
                    </span>
                  ) : (
                    <button
                      onClick={() => handleTechPurchase(d, 'spiderCam')}
                      className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 py-1.5 px-2 rounded-lg border border-slate-700 transition-colors"
                    >
                      Install ($8M)
                    </button>
                  )}
                </div>

                {/* HawkEye Precision */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      <span>HawkEye 3D AI</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Sub-millimeter ball-tracking for LBWs.</p>
                  </div>
                  {d.techEquipped.hawkEyePrecision ? (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Equipped
                    </span>
                  ) : (
                    <button
                      onClick={() => handleTechPurchase(d, 'hawkEyePrecision')}
                      className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 py-1.5 px-2 rounded-lg border border-slate-700 transition-colors"
                    >
                      Install ($8M)
                    </button>
                  )}
                </div>

                {/* Drone Aerials */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Drone Fleet</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Skyline panoramic intro and pyro shots.</p>
                  </div>
                  {d.techEquipped.droneAerials ? (
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Equipped
                    </span>
                  ) : (
                    <button
                      onClick={() => handleTechPurchase(d, 'droneAerials')}
                      className="text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 py-1.5 px-2 rounded-lg border border-slate-700 transition-colors"
                    >
                      Install ($8M)
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
