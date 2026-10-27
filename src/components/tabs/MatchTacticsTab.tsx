import React, { useState, useEffect, useCallback } from 'react';
import { 
  Crosshair, 
  Shield, 
  Swords, 
  Zap, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Compass,
  Sparkles,
  Bot,
  RefreshCw,
  Copy,
  Check,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { 
  MatchTacticsPreset, 
  BattingStrategy, 
  FieldPlacementStrategy, 
  BowlingBiasStrategy, 
  Fixture, 
  BoardCountry,
  CoachStaff
} from '../../types/game';
import { 
  calculateTacticsSynergy, 
  OPPONENT_TACTICAL_PROFILES 
} from '../../utils/cricketEngine';
import { playClickSound, playCashChime } from '../../utils/sound';

interface MatchTacticsTabProps {
  tactics: MatchTacticsPreset;
  nextFixture: Fixture;
  ourCountry: BoardCountry;
  headCoach?: CoachStaff;
  onUpdateTactics: (newTactics: MatchTacticsPreset) => void;
}

export const MatchTacticsTab: React.FC<MatchTacticsTabProps> = ({
  tactics,
  nextFixture,
  ourCountry,
  headCoach,
  onUpdateTactics
}) => {
  const [currentTactics, setCurrentTactics] = useState<MatchTacticsPreset>(tactics);
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  // AI Tactical Feedback State
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackLoading, setFeedbackLoading] = useState<boolean>(false);
  const [feedbackSource, setFeedbackSource] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const oppCountry = nextFixture.opponent;
  const oppProfile = OPPONENT_TACTICAL_PROFILES[oppCountry] || OPPONENT_TACTICAL_PROFILES['Australia'];

  // Calculate live dynamic synergy against the scheduled opponent
  const synergy = calculateTacticsSynergy(currentTactics, oppCountry);

  const coachName = headCoach?.name || 'Gautam Gambhir';
  const coachSpecialty = headCoach?.specialty || 'High-Pressure Mentality & Aggressive Tactics';

  // Request AI-powered tactical feedback from server
  const fetchTacticalFeedback = useCallback(async (tacticsToAnalyze: MatchTacticsPreset) => {
    setFeedbackLoading(true);
    try {
      const res = await fetch('/api/tactical-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tactics: tacticsToAnalyze,
          opponent: oppCountry,
          ourCountry,
          coachName,
          coachSpecialty,
          venue: nextFixture.venue,
          format: nextFixture.format
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      setFeedbackText(data.feedback);
      setFeedbackSource(data.source === 'gemini-3.8-flash' ? 'Gemini 3.8 Flash AI' : 'Head Coach Strategic Brain');
    } catch (err) {
      console.warn('Tactical feedback fetch error, using local expert fallback:', err);
      // Local robust simulation fallback
      const fallback = `**Tactical Verdict**: Deploying ${tacticsToAnalyze.battingStrategy} and ${tacticsToAnalyze.bowlingBias} produces an aggressive tactical edge against ${oppCountry}, provided our ${tacticsToAnalyze.fieldPlacement.toLowerCase()} remains disciplined under pressure.

**Why This Plan Succeeds**:
1. ${tacticsToAnalyze.battingStrategy} exerts prompt psychological strain on ${oppCountry}'s opening bowling attack, breaking their metronomic channel lengths early.
2. Backing ${tacticsToAnalyze.bowlingBias} directly attacks ${oppCountry}'s known vulnerabilities, forcing hurried shots against variable bounce.

**Key Hazards & Points of Failure**:
- If ${oppCountry}'s top order survives the powerplay intact, ${tacticsToAnalyze.fieldPlacement.toLowerCase()} may concede soft singles that ease their required run rate pressure.

**Coach's Executive Recommendation**:
Maintain suffocating inner-ring containment in overs 7–15 before unleashing toe-crushing reverse-swing yorkers in the death overs.`;
      setFeedbackText(fallback);
      setFeedbackSource('Simulated Head Coach Intelligence');
    } finally {
      setFeedbackLoading(false);
    }
  }, [oppCountry, ourCountry, coachName, coachSpecialty, nextFixture.venue, nextFixture.format]);

  // Initial load of tactical feedback
  useEffect(() => {
    if (!feedbackText && !feedbackLoading) {
      fetchTacticalFeedback(currentTactics);
    }
  }, [fetchTacticalFeedback, feedbackText, feedbackLoading, currentTactics]);

  const handleApplyStrategy = (updates: Partial<MatchTacticsPreset>) => {
    playClickSound();
    const updated = { ...currentTactics, ...updates };
    setCurrentTactics(updated);
    onUpdateTactics(updated);
    setSavedBanner('Team strategy locked in! Live match simulation engine updated.');
    setTimeout(() => setSavedBanner(null), 3000);

    // Re-evaluate tactical feedback with updated choices
    fetchTacticalFeedback(updated);
  };

  const handleCopyFeedback = () => {
    playClickSound();
    navigator.clipboard.writeText(feedbackText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const BATTING_OPTIONS: { id: BattingStrategy; title: string; desc: string; statMod: string }[] = [
    {
      id: 'Aggressive Batting',
      title: 'Aggressive Batting',
      desc: 'High-intent front-foot attack. Batters step out, hunt early boundaries, and pressure bowlers.',
      statMod: '+25% Boundary Rate · +15% Wicket Hazard'
    },
    {
      id: 'Controlled Aggression',
      title: 'Controlled Aggression',
      desc: 'Positive strike rotation, aggressive running between wickets, punishing loose length deliveries.',
      statMod: '+10% Run Rate · Balanced Risk'
    },
    {
      id: 'Anchor & Accumulate',
      title: 'Anchor & Accumulate',
      desc: 'Classical defensive discipline. Protect stumps, blunt swinging deliveries, build long partnerships.',
      statMod: '-32% Wicket Loss · Preserves Top Order'
    },
    {
      id: 'Counter-Punching',
      title: 'Counter-Punching',
      desc: 'Absorb the opposition opening pace attack, then unleash counter-attacks in middle and death overs.',
      statMod: '+18% Death Over Acceleration'
    }
  ];

  const FIELDING_OPTIONS: { id: FieldPlacementStrategy; title: string; desc: string; statMod: string }[] = [
    {
      id: 'Defensive Field Placement',
      title: 'Defensive Field Placement',
      desc: 'Rope-guarding boundary riders and deep sweepers. Denies boundaries, forces opposition into singles.',
      statMod: '-22% Opponent Boundaries · Starves Momentum'
    },
    {
      id: 'Attacking Slips & Ring',
      title: 'Attacking Slips & Ring',
      desc: '3 slips, gully, and forward short leg in close. Maximizes edge catches and close-in dismissals.',
      statMod: '+20% Edge Catch Chance · Concedes Extra 1s'
    },
    {
      id: 'Deep Boundary Sweeper Lock',
      title: 'Deep Boundary Sweeper Lock',
      desc: 'Sweepers positioned in deep mid-wicket, long-on, long-off, and deep square leg to suffocate sixes.',
      statMod: '-30% Maximum Sixes · Defensive Containment'
    },
    {
      id: 'Spin Trap & Choke',
      title: 'Spin Trap & Choke',
      desc: 'Packed 30-yard inner ring with silly mid-off and short mid-wicket to trap batters against spin.',
      statMod: '+24% Turn Wickets · Pressure Catches'
    }
  ];

  const BOWLING_OPTIONS: { id: BowlingBiasStrategy; title: string; desc: string; statMod: string }[] = [
    {
      id: 'Pace Bias',
      title: 'Pace Bias',
      desc: 'Command the bowling unit to exploit sheer pace, seam deviation, and bouncer barrages.',
      statMod: '+15% Wicket Lethality vs Tentative Batters'
    },
    {
      id: 'Spin Bias',
      title: 'Spin Bias',
      desc: 'Heavily rotate mystery and finger spinners in tandem. Exploit pitch turning angles and flight drift.',
      statMod: '+22% Spin Deception · Lowers Powerplay Pace'
    },
    {
      id: 'Balanced Rotation',
      title: 'Balanced Rotation',
      desc: 'Standard professional rotation of 3 frontline seamers and 2 specialist spin controllers.',
      statMod: 'Versatile Across All Pitch Conditions'
    },
    {
      id: 'Death Yorker Priority',
      title: 'Death Yorker Priority',
      desc: 'Hold back lead pacers for pinpoint toe-crushing yorkers and knuckle-balls in overs 16–20.',
      statMod: '-1.4 Economy in Closing Death Overs'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Target className="w-4 h-4" />
            <span>Tactical Operations & Pre-Match Gameplans</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Match Tactics & Tactical Bias Engine
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Pre-set your squad's default gameplan across Batting Aggression, Field Placement Geometry, and Pace vs Spin Bowling Bias. These strategic directives dynamically calibrate the live match simulation based on your opponent’s strengths and flaws.
          </p>
        </div>

        {savedBanner && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{savedBanner}</span>
          </div>
        )}
      </div>

      {/* Opponent Tactical Scout & Matchup Edge Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Opponent Intel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Next Opponent Scouting Dossier</span>
              </span>
              <span className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {oppCountry} ({nextFixture.format})
              </span>
            </div>

            <h3 className="text-lg font-black text-white mb-1">
              {oppProfile.playStyle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase">Batting Tendency</span>
                <span className="font-bold text-white">{oppProfile.battingTendency}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase">Bowling Tendency</span>
                <span className="font-bold text-sky-400">{oppProfile.bowlingTendency}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs space-y-2 text-slate-300">
              <div>
                <strong className="text-white">Signature Strength: </strong>
                {oppProfile.strengths}
              </div>
              <div>
                <strong className="text-rose-400">Tactical Vulnerability: </strong>
                {oppProfile.vulnerability}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Scout Advice: {oppProfile.counterTacticAdvice}</span>
          </div>
        </div>

        {/* Dynamic Synergy & Tactical Edge Meter */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calculated Matchup Advantage
              </span>
              <span className={`text-base font-black font-mono px-2.5 py-0.5 rounded ${
                synergy.synergyScore >= 15
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : synergy.synergyScore >= 0
                  ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                {synergy.synergyScore > 0 ? `+${synergy.synergyScore}%` : `${synergy.synergyScore}%`} Edge
              </span>
            </div>

            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  synergy.synergyScore >= 15
                    ? 'bg-emerald-500'
                    : synergy.synergyScore >= 0
                    ? 'bg-amber-400'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(10, ((synergy.synergyScore + 50) / 100) * 100))}%` }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-white text-[11px] uppercase tracking-wider">
                Tactical Insights vs {oppCountry}:
              </div>
              {synergy.advantages.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-2 text-emerald-300 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </div>
              ))}
              {synergy.cautions.map((cau, idx) => (
                <div key={idx} className="flex items-start gap-2 text-rose-300 bg-rose-500/5 p-2 rounded-lg border border-rose-500/20">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{cau}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800 font-mono">
            Directly impacts ball-by-ball match simulation and win probability.
          </div>
        </div>
      </div>

      {/* AI-Powered Tactical Feedback & Coach's Justification Text Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Head Coach's AI Tactical Feedback
                  </h3>
                  {feedbackSource && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      {feedbackSource}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">
                  {coachName} · {coachSpecialty}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  fetchTacticalFeedback(currentTactics);
                }}
                disabled={feedbackLoading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors disabled:opacity-50"
                title="Re-run AI tactical debrief against opponent style"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${feedbackLoading ? 'animate-spin text-emerald-400' : ''}`} />
                <span>{feedbackLoading ? 'Analyzing...' : 'Re-Analyze Tactics'}</span>
              </button>

              {feedbackText && (
                <button
                  type="button"
                  onClick={handleCopyFeedback}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
                  title="Copy Tactical Feedback to Clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Feedback Body */}
          {feedbackLoading ? (
            <div className="py-8 px-4 flex flex-col items-center justify-center space-y-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-xs font-mono text-slate-300">
                Coach {coachName} is analyzing tactical matchup against {oppCountry}'s playing style...
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm text-center">
                Evaluating boundary hazard, seam deviation, pitch friction, and middle-overs choke variables.
              </p>
            </div>
          ) : feedbackText ? (
            <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 text-xs text-slate-200 leading-relaxed font-sans space-y-3">
              {feedbackText.split('\n\n').map((paragraph, pIdx) => {
                // If it starts with **Header**:
                const matchHeader = paragraph.match(/^\*\*(.*?)\*\*:(.*)/s);
                if (matchHeader) {
                  const headerTitle = matchHeader[1];
                  const content = matchHeader[2];
                  const isVerdict = headerTitle.toLowerCase().includes('verdict');
                  const isSuccess = headerTitle.toLowerCase().includes('succeed');
                  const isHazard = headerTitle.toLowerCase().includes('hazard') || headerTitle.toLowerCase().includes('fail');
                  const isRec = headerTitle.toLowerCase().includes('recommendation');

                  return (
                    <div 
                      key={pIdx} 
                      className={`p-3 rounded-lg border ${
                        isVerdict 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
                          : isHazard 
                          ? 'bg-rose-500/5 border-rose-500/20 text-slate-200'
                          : isSuccess
                          ? 'bg-sky-500/5 border-sky-500/20 text-slate-200'
                          : isRec
                          ? 'bg-amber-500/5 border-amber-500/20 text-amber-200'
                          : 'bg-slate-900/60 border-slate-800/80'
                      }`}
                    >
                      <div className="font-bold text-white text-xs mb-1.5 flex items-center gap-1.5">
                        {isVerdict && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                        {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                        {isHazard && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                        {isRec && <Target className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{headerTitle}</span>
                      </div>
                      <div className="text-slate-300 leading-relaxed text-xs">
                        {content.split('\n').map((line, lIdx) => {
                          const trimmed = line.trim();
                          if (trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) {
                            return (
                              <div key={lIdx} className="flex items-start gap-2 my-1 pl-1">
                                <span className="text-emerald-400 font-mono mt-0.5">·</span>
                                <span>{trimmed.replace(/^[-*]|\d+\.\s*/, '')}</span>
                              </div>
                            );
                          }
                          return <p key={lIdx} className="my-1">{trimmed}</p>;
                        })}
                      </div>
                    </div>
                  );
                }

                // Regular paragraph
                return (
                  <p key={pIdx} className="text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-xl border border-slate-800">
              Click "Re-Analyze Tactics" to generate tactical debrief from Coach {coachName}.
            </div>
          )}
        </div>
      </div>

      {/* Strategy Section 1: Batting Approach */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">1. Batting Strategy Directive</h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Current: {currentTactics.battingStrategy}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {BATTING_OPTIONS.map((opt) => {
            const isSelected = currentTactics.battingStrategy === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => handleApplyStrategy({ battingStrategy: opt.id })}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{opt.title}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{opt.desc}</p>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold pt-2 border-t border-slate-900">
                  {opt.statMod}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Strategy Section 2: Field Placement Geometry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" />
            <h3 className="text-base font-bold text-white">2. Field Placement Geometry</h3>
          </div>
          <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
            Current: {currentTactics.fieldPlacement}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {FIELDING_OPTIONS.map((opt) => {
            const isSelected = currentTactics.fieldPlacement === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => handleApplyStrategy({ fieldPlacement: opt.id })}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-500 text-white shadow-md shadow-sky-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{opt.title}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{opt.desc}</p>
                </div>
                <div className="text-[11px] font-mono text-sky-400 font-semibold pt-2 border-t border-slate-900">
                  {opt.statMod}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Strategy Section 3: Bowling Bias & Rotation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">3. Bowling Bias & Tactical Rotation</h3>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Current: {currentTactics.bowlingBias}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {BOWLING_OPTIONS.map((opt) => {
            const isSelected = currentTactics.bowlingBias === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => handleApplyStrategy({ bowlingBias: opt.id })}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{opt.title}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{opt.desc}</p>
                </div>
                <div className="text-[11px] font-mono text-amber-400 font-semibold pt-2 border-t border-slate-900">
                  {opt.statMod}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Operational Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Powerplay Intent */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Powerplay Risk Intent (Overs 1–6)
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {currentTactics.powerplayRisk}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['High Risk', 'Measured', 'Conservative'] as const).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => handleApplyStrategy({ powerplayRisk: r })}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                  currentTactics.powerplayRisk === r
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* DRS Appeals Policy */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              DRS Appeal Protocol
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {currentTactics.drsStance}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(['Aggressive Appeals', 'Cautious / Critical Only'] as const).map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => handleApplyStrategy({ drsStance: d })}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                  currentTactics.drsStance === d
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
