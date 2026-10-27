import React, { useState } from 'react';
import { Music, Utensils, CheckCircle2, Volume2, Sparkles, Smile } from 'lucide-react';
import { CateringSoundPackage } from '../../types/game';
import { playClickSound, playCrowdCheer } from '../../utils/sound';

interface CateringDjTabProps {
  currentPackage: CateringSoundPackage;
  onUpdatePackage: (updated: Partial<CateringSoundPackage>) => void;
}

export const CateringDjTab: React.FC<CateringDjTabProps> = ({
  currentPackage,
  onUpdatePackage
}) => {
  const [notice, setNotice] = useState<string | null>(null);

  const SOUND_OPTIONS: { name: CateringSoundPackage['soundPackage']; desc: string; vibe: string }[] = [
    {
      name: 'Desi Dhol & Brass Band',
      desc: 'High-energy live Punjabi dhols, nagada beats, and brass trumpet fanfares during boundaries.',
      vibe: 'Deafening Stadium Euphoria (+10% Crowd Roar)'
    },
    {
      name: 'EDM Arena Hype Setup',
      desc: 'Thumping sub-bass drops, electronic stadium horns, and synchronized light show stings.',
      vibe: 'Modern Franchise Rave Vibe'
    },
    {
      name: 'Traditional English Brass',
      desc: 'Classic Barmy Army trumpet tunes, Jerusalem chants, and vintage acoustic stadium melodies.',
      vibe: 'Heritage Test Match Atmosphere'
    },
    {
      name: 'Calypso Steelpan & Horns',
      desc: 'Irresistible Caribbean rhythm, brass conch blasts, and carnival party energy on the boundary.',
      vibe: 'Festive Party Carnival'
    },
    {
      name: 'Aussie Stadium Rock',
      desc: 'Blasting hard rock guitar riffs and thumping chants from the Great Southern Stand.',
      vibe: 'Intense Boxing Day Roar'
    }
  ];

  const handleSelectSound = (soundName: CateringSoundPackage['soundPackage']) => {
    playClickSound();
    playCrowdCheer();
    onUpdatePackage({ soundPackage: soundName });
    setNotice(`Stadium audio setup changed to "${soundName}"!`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSelectCatering = (tier: CateringSoundPackage['cateringTier'], vendor: string) => {
    playClickSound();
    onUpdatePackage({ cateringTier: tier, cateringVendor: vendor });
    setNotice(`Stadium food hospitality vendor changed to "${vendor}"!`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
          <Music className="w-4 h-4" />
          <span>Match-Day Fan Flexes, Concessions & Soundscapes</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Catering, DJ Sound & Arena Atmosphere
        </h2>
        <p className="text-xs text-slate-400">
          Curate stadium decibel levels, live boundary brass rhythms, and hospitality food concessions to drive stadium ticket demand and fan approval.
        </p>
      </div>

      {notice && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Sound Packages Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-purple-400" />
          <span>Select Match-Day Sound & DJ Audio Package</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOUND_OPTIONS.map((opt) => {
            const isSelected = currentPackage.soundPackage === opt.name;
            return (
              <div
                key={opt.name}
                onClick={() => handleSelectSound(opt.name)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-500/10 border-purple-500 shadow-md shadow-purple-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white">{opt.name}</h4>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded border border-purple-400/20">
                        Active Sound
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{opt.desc}</p>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold pt-2 border-t border-slate-900">
                  {opt.vibe}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Catering Concessions Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Utensils className="w-4 h-4 text-amber-400" />
          <span>Stadium Food Concessions & VIP Hospitality Menu</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => handleSelectCatering('Popular Street Food Carnival', 'Haldiram & Chai Hub')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentPackage.cateringTier === 'Popular Street Food Carnival'
                ? 'bg-amber-500/10 border-amber-500'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <h4 className="text-sm font-bold text-white mb-1">Street Food Carnival</h4>
            <p className="text-xs text-slate-400 mb-2">Samosas, Biryani, Vada Pav, and hot masala chai.</p>
            <span className="text-xs font-mono text-emerald-400 font-bold">+8% Fan Satisfaction</span>
          </div>

          <div
            onClick={() => handleSelectCatering('Gourmet Luxury', 'Michelin Star Corporate Lounge')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentPackage.cateringTier === 'Gourmet Luxury'
                ? 'bg-amber-500/10 border-amber-500'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <h4 className="text-sm font-bold text-white mb-1">Gourmet Luxury Suites</h4>
            <p className="text-xs text-slate-400 mb-2">Artisanal charcuterie, truffle canapés, premium vintage champagne.</p>
            <span className="text-xs font-mono text-amber-400 font-bold">+15% VIP Box Revenue</span>
          </div>

          <div
            onClick={() => handleSelectCatering('Standard Franchise Kiosks', 'Global Stadium Snacks')}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              currentPackage.cateringTier === 'Standard Franchise Kiosks'
                ? 'bg-amber-500/10 border-amber-500'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <h4 className="text-sm font-bold text-white mb-1">Standard Kiosks</h4>
            <p className="text-xs text-slate-400 mb-2">Popcorn, soft drinks, burgers, and hot dogs.</p>
            <span className="text-xs font-mono text-slate-300 font-bold">Standard Margins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
