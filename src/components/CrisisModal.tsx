import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  DollarSign, 
  Heart, 
  Users, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Flame,
  FileText
} from 'lucide-react';
import { CrisisEvent, CrisisOption } from '../types/game';
import { playClickSound, playCashChime, playWicketSound } from '../utils/sound';

interface CrisisModalProps {
  crisis: CrisisEvent;
  treasury: number;
  boardName: string;
  onResolveCrisis: (crisis: CrisisEvent, option: CrisisOption) => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({
  crisis,
  treasury,
  boardName,
  onResolveCrisis
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(crisis.options[0]?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedOption = crisis.options.find((o) => o.id === selectedOptionId) || crisis.options[0];

  const handleConfirm = () => {
    if (!selectedOption) return;
    setIsSubmitting(true);
    playClickSound();
    if (selectedOption.cost > 0) {
      playCashChime();
    } else {
      playWicketSound();
    }
    setTimeout(() => {
      onResolveCrisis(crisis, selectedOption);
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border-2 border-rose-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-6 text-slate-100">
        {/* Urgent Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg animate-pulse">
                <Flame className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Emergency Boardroom Summit · {crisis.severity}
              </span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight mt-1.5">
              {crisis.title}
            </h2>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>Source: {crisis.source}</span>
              <span>·</span>
              <span className="text-slate-300 font-semibold">{crisis.date}</span>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-5 text-xs text-slate-300 leading-relaxed">
          {crisis.description}
        </div>

        {/* Available Executive Directives */}
        <div className="space-y-3 mb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Select Executive Resolution Directive:</span>
          </div>

          <div className="space-y-2.5">
            {crisis.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const cannotAfford = opt.cost > treasury;

              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (cannotAfford) return;
                    playClickSound();
                    setSelectedOptionId(opt.id);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30'
                      : cannotAfford
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-50 cursor-not-allowed'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-rose-400 bg-rose-500 text-slate-950'
                            : 'border-slate-600 bg-slate-900'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-tight">{opt.label}</h4>
                    </div>

                    <div className="text-xs font-mono font-bold shrink-0">
                      {opt.cost > 0 ? (
                        <span className="text-rose-400">-${(opt.cost / 1000000).toFixed(2)}M Outlay</span>
                      ) : (
                        <span className="text-emerald-400">$0 Direct Cost</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 pl-6 leading-relaxed mb-3">
                    {opt.description}
                  </p>

                  {/* Impact Metric Chips */}
                  <div className="flex flex-wrap items-center gap-3 pl-6 text-[11px] font-semibold border-t border-slate-800/60 pt-2.5">
                    <span
                      className={`flex items-center gap-1 ${
                        opt.fanTrustImpact >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      Fan Trust: {opt.fanTrustImpact >= 0 ? `+${opt.fanTrustImpact}%` : `${opt.fanTrustImpact}%`}
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        opt.boardStabilityImpact >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      Stability: {opt.boardStabilityImpact >= 0 ? `+${opt.boardStabilityImpact}%` : `${opt.boardStabilityImpact}%`}
                    </span>

                    <span
                      className={`flex items-center gap-1 ${
                        opt.teamMoraleImpact >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                      Team Morale: {opt.teamMoraleImpact >= 0 ? `+${opt.teamMoraleImpact}%` : `${opt.teamMoraleImpact}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Option Outcome Preview */}
        {selectedOption && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-5 text-[11px] text-slate-400 flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-semibold">Immediate Boardroom Settlement: </span>
              <strong className="text-white">${(selectedOption.cost / 1000000).toFixed(2)}M</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold">Remaining Treasury: </span>
              <strong className="text-emerald-400">
                ${((treasury - selectedOption.cost) / 1000000).toFixed(2)}M
              </strong>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleConfirm}
          disabled={isSubmitting || !selectedOption || selectedOption.cost > treasury}
          className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
            isSubmitting
              ? 'bg-slate-800 text-slate-500 cursor-wait'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/60'
          }`}
        >
          <span>Ratify Resolution Directive</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
