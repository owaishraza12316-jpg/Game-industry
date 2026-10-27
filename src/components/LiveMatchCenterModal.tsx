import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  FastForward, 
  Play, 
  Pause, 
  Tv, 
  Flame, 
  Compass, 
  Trophy, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  Fixture, 
  MatchScorecard, 
  BallEvent, 
  GameState 
} from '../types/game';
import { 
  generateBallEvent, 
  TacticalEffect 
} from '../utils/cricketEngine';
import { 
  playBatCrack, 
  playWicketSound, 
  playCrowdCheer, 
  playUmpireWhistle, 
  playCashChime,
  playVictoryFanfare,
  playClickSound 
} from '../utils/sound';

interface LiveMatchCenterModalProps {
  fixture: Fixture;
  gameState: GameState;
  onClose: () => void;
  onMatchComplete: (resultText: string, won: boolean, treasuryDelta: number, trustDelta: number) => void;
}

export const LiveMatchCenterModal: React.FC<LiveMatchCenterModalProps> = ({
  fixture,
  gameState,
  onClose,
  onMatchComplete
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'scorecard' | 'wagon'>('live');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [tacticalDirective, setTacticalDirective] = useState<string>('balanced');
  const [showTacticalPrompt, setShowTacticalPrompt] = useState<boolean>(false);
  const [tacticalPromptData, setTacticalPromptData] = useState<{
    title: string;
    description: string;
    optA: { label: string; key: string };
    optB: { label: string; key: string };
  } | null>(null);

  // DRS Review state
  const [drsPrompt, setDrsPrompt] = useState<BallEvent | null>(null);
  const [drsReviewing, setDrsReviewing] = useState(false);
  const [drsTrackingResult, setDrsTrackingResult] = useState<{
    pitching: string;
    impact: string;
    wickets: string;
    decision: string;
  } | null>(null);

  // Total overs based on format
  const maxOvers = fixture.format === 'T20I' ? 20 : fixture.format === 'ODI' ? 50 : 90;
  const maxBalls = maxOvers * 6;

  // Initial innings setup
  const [currentInnings, setCurrentInnings] = useState<1 | 2>(1);
  const [ballsBowled, setBallsBowled] = useState(0);
  const [innings1Score, setInnings1Score] = useState<{ runs: number; wickets: number; overs: number }>({ runs: 178, wickets: 6, overs: maxOvers });
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [target, setTarget] = useState<number | null>(null);

  // Ball event history
  const [ballHistory, setBallHistory] = useState<BallEvent[]>([]);
  const [lastBall, setLastBall] = useState<BallEvent | null>(null);
  const commentaryRef = useRef<HTMLDivElement>(null);

  // Players
  const ourPlaying11 = gameState.squad.slice(0, 11);
  const [strikerIdx, setStrikerIdx] = useState(0);
  const [nonStrikerIdx, setNonStrikerIdx] = useState(1);
  const [bowlerIdx, setBowlerIdx] = useState(0);

  // Match finished
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverSummary, setGameOverSummary] = useState('');
  const [matchWon, setMatchWon] = useState(false);

  // Scroll commentary
  useEffect(() => {
    if (commentaryRef.current) {
      commentaryRef.current.scrollTop = commentaryRef.current.scrollHeight;
    }
  }, [ballHistory]);

  // Bowling roster for opposition
  const oppBowlers = [
    { name: 'Trent Boult', role: 'Swing Specialist', bowlingRating: 92, form: 90 },
    { name: 'Matt Henry', role: 'Express Pacer', bowlingRating: 88, form: 87 },
    { name: 'Mitchell Santner', role: 'Finger Spinner', bowlingRating: 87, form: 89 },
    { name: 'Lockie Ferguson', role: 'Express Pacer', bowlingRating: 86, form: 85 },
    { name: 'Glenn Phillips', role: 'Spin All-Rounder', bowlingRating: 80, form: 92 }
  ];

  // Process 1 single ball
  const bowlBall = () => {
    if (isGameOver) return;

    const overNum = Math.floor(ballsBowled / 6);
    const ballInOver = (ballsBowled % 6) + 1;

    const currentBowler = oppBowlers[bowlerIdx % oppBowlers.length];
    const currentStriker = ourPlaying11[strikerIdx] || ourPlaying11[0];

    const event = generateBallEvent(
      ballsBowled + 1,
      overNum,
      ballInOver,
      currentBowler as any,
      currentStriker,
      gameState.pitchPreference,
      'Bright & Sunny',
      tacticalDirective,
      gameState.matchTactics,
      fixture.opponent
    );

    // Audio feedback
    if (event.isWicket) {
      playWicketSound();
    } else if (event.isBoundaryFour || event.isBoundarySix) {
      playBatCrack();
      playCrowdCheer();
    } else if (event.runs > 0) {
      playBatCrack();
    }

    const newRuns = runs + event.runs;
    let newWickets = wickets;
    let nextStriker = strikerIdx;
    let nextNonStriker = nonStrikerIdx;

    if (event.isWicket) {
      newWickets += 1;
      nextStriker = Math.max(strikerIdx, nonStrikerIdx) + 1;
    } else if (event.runs % 2 === 1) {
      // Rotate strike
      const temp = nextStriker;
      nextStriker = nextNonStriker;
      nextNonStriker = temp;
    }

    // Over completion strike rotation
    if (ballInOver === 6) {
      const temp = nextStriker;
      nextStriker = nextNonStriker;
      nextNonStriker = temp;
      setBowlerIdx((prev) => prev + 1);
    }

    setRuns(newRuns);
    setWickets(newWickets);
    setStrikerIdx(nextStriker);
    setNonStrikerIdx(nextNonStriker);
    setBallsBowled((prev) => prev + 1);
    setBallHistory((prev) => [...prev, event]);
    setLastBall(event);

    // Trigger occasional tactical crisis prompt
    if (
      !showTacticalPrompt &&
      (ballsBowled === 18 || ballsBowled === 36 || ballsBowled === 60 || (newWickets >= 3 && Math.random() < 0.25))
    ) {
      setIsSimulating(false);
      setShowTacticalPrompt(true);
      setTacticalPromptData({
        title: 'Tactical Intervention Opportunity',
        description: `Opponent bowlers are varying their line. Chairman & Director call: dictate the middle-order approach for the next 2 overs.`,
        optA: { label: 'Deploy All-Out Attack (Risk boundaries)', key: 'all-out-attack' },
        optB: { label: 'Rotate Strike & Consolidate (Preserve wickets)', key: 'consolidate' }
      });
    }

    // Check match completion
    const newTotalBalls = ballsBowled + 1;
    const targetScore = target ?? 185;

    if (newRuns >= targetScore) {
      // Won chase!
      finishMatch(true, `${gameState.country} won by ${10 - newWickets} wickets! Sensational performance!`);
    } else if (newWickets >= 10 || newTotalBalls >= maxBalls) {
      // Innings end / lost chase
      if (newRuns >= targetScore) {
        finishMatch(true, `${gameState.country} won by ${newRuns - targetScore} runs!`);
      } else {
        finishMatch(false, `${fixture.opponent} won by ${targetScore - newRuns} runs.`);
      }
    }
  };

  const finishMatch = (won: boolean, summaryText: string) => {
    setIsGameOver(true);
    setIsSimulating(false);
    setMatchWon(won);
    setGameOverSummary(summaryText);

    if (won) {
      playVictoryFanfare();
      playCrowdCheer();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playUmpireWhistle();
    }
  };

  // Sim loop
  useEffect(() => {
    if (!isSimulating || isGameOver || showTacticalPrompt || drsReviewing) return;

    const intervalMs = Math.max(120, 1000 / simSpeed);
    const timer = setInterval(() => {
      bowlBall();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimulating, ballsBowled, runs, wickets, simSpeed, isGameOver, showTacticalPrompt, drsReviewing]);

  // Fast forward whole over (6 balls)
  const simulateOver = () => {
    playClickSound();
    for (let i = 0; i < 6; i++) {
      if (isGameOver) break;
      bowlBall();
    }
  };

  // Handle tactical call
  const applyTacticalCall = (tacticKey: string) => {
    playClickSound();
    setTacticalDirective(tacticKey);
    setShowTacticalPrompt(false);
    setIsSimulating(true);
  };

  // Trigger DRS Hawk-Eye
  const triggerDrsReview = () => {
    playUmpireWhistle();
    setDrsReviewing(true);

    setTimeout(() => {
      // Outcome
      const isOut = Math.random() > 0.45;
      setDrsTrackingResult({
        pitching: 'In Line (Off Stump)',
        impact: 'In Line (3.2m from stumps)',
        wickets: isOut ? 'Hitting (Middle & Leg)' : 'Missing (Spinning down leg)',
        decision: isOut ? 'OUT UPHELD (Original Decision Stands)' : 'NOT OUT (Overturned by Hawk-Eye)'
      });

      setTimeout(() => {
        setDrsReviewing(false);
        setDrsPrompt(null);
        setDrsTrackingResult(null);
      }, 3500);
    }, 1500);
  };

  const handleConclude = () => {
    playCashChime();
    const treasuryGain = matchWon ? 4500000 : 1500000;
    const trustGain = matchWon ? 6 : -3;
    onMatchComplete(gameOverSummary, matchWon, treasuryGain, trustGain);
  };

  const currentOversFormatted = `${Math.floor(ballsBowled / 6)}.${ballsBowled % 6}`;
  const currentRunRate = ballsBowled > 0 ? ((runs / ballsBowled) * 6).toFixed(2) : '0.00';
  const targetRuns = target ?? 185;
  const runsNeeded = Math.max(0, targetRuns - runs);
  const ballsRemaining = Math.max(0, maxBalls - ballsBowled);
  const requiredRunRate = ballsRemaining > 0 ? ((runsNeeded / ballsRemaining) * 6).toFixed(2) : '0.00';

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Match Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Tv className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {gameState.country} vs {fixture.opponent}
                </h2>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {fixture.format}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {fixture.venue} · {gameState.pitchPreference} Pitch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('live')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'live' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Radar
              </button>
              <button
                onClick={() => setActiveTab('scorecard')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'scorecard' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scorecard
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Score Strip */}
        <div className="bg-slate-950/60 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Score
              </div>
              <div className="text-2xl font-black font-mono text-white">
                {runs}/{wickets}
                <span className="text-sm font-normal text-slate-400 ml-2">
                  ({currentOversFormatted}/{maxOvers} ov)
                </span>
              </div>
            </div>

            <div className="border-l border-slate-800 pl-4 hidden sm:block">
              <div className="text-[11px] text-slate-400">Required Target</div>
              <div className="text-sm font-bold font-mono text-amber-400">
                {runsNeeded} runs from {ballsRemaining} balls
              </div>
            </div>

            <div className="border-l border-slate-800 pl-4 hidden md:block">
              <div className="text-[11px] text-slate-400">Run Rates</div>
              <div className="text-xs font-mono text-slate-300">
                CRR: <span className="font-bold text-white">{currentRunRate}</span> · RRR: <span className="font-bold text-rose-400">{requiredRunRate}</span>
              </div>
            </div>
          </div>

          {/* Active Sim Controls */}
          {!isGameOver && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  setIsSimulating(!isSimulating);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isSimulating
                    ? 'bg-rose-500 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSimulating ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  bowlBall();
                }}
                disabled={isSimulating}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 disabled:opacity-50"
              >
                Next Ball
              </button>

              <button
                onClick={simulateOver}
                disabled={isSimulating}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 disabled:opacity-50"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Sim Over</span>
              </button>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {[1, 2, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      playClickSound();
                      setSimSpeed(s);
                    }}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
                      simSpeed === s ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'live' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Column: Visual 2D Pitch Radar Canvas */}
              <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[300px] overflow-hidden">
                {/* 2D Pitch Oval Radar Graphic */}
                <div className="w-full max-w-sm aspect-[4/3] bg-emerald-950/40 border border-emerald-500/20 rounded-full relative flex items-center justify-center shadow-inner">
                  {/* 30-yard circle ring */}
                  <div className="absolute inset-8 rounded-full border border-dashed border-emerald-400/20 pointer-events-none" />

                  {/* Cricket Pitch rectangle */}
                  <div className="w-16 h-48 bg-amber-900/40 border border-amber-600/40 rounded-sm relative flex flex-col justify-between items-center py-2">
                    {/* Bowling Crease */}
                    <div className="w-12 h-0.5 bg-white/40" />
                    {/* Batting Crease */}
                    <div className="w-12 h-0.5 bg-white/40" />

                    {/* Stumps */}
                    <div className="absolute top-2 w-4 h-1 bg-amber-400 rounded-sm" />
                    <div className="absolute bottom-2 w-4 h-1 bg-amber-400 rounded-sm" />

                    {/* Ball impact point pulse */}
                    {lastBall && (
                      <div
                        className={`absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full animate-ping ${
                          lastBall.isWicket
                            ? 'bg-rose-500'
                            : lastBall.isBoundarySix
                            ? 'bg-purple-400'
                            : lastBall.isBoundaryFour
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{
                          left: `${lastBall.radarX}%`,
                          top: `${lastBall.radarY}%`
                        }}
                      />
                    )}
                  </div>

                  {/* Fielder position indicators */}
                  <div className="absolute top-6 left-12 text-[10px] text-emerald-400/60 font-mono">Deep Point</div>
                  <div className="absolute top-6 right-12 text-[10px] text-emerald-400/60 font-mono">Deep Square</div>
                  <div className="absolute bottom-4 left-16 text-[10px] text-emerald-400/60 font-mono">Long-Off</div>
                  <div className="absolute bottom-4 right-16 text-[10px] text-emerald-400/60 font-mono">Long-On</div>

                  {/* Last ball trajectory shot pointer */}
                  {lastBall && lastBall.runs > 0 && (
                    <div
                      className="absolute w-1 bg-gradient-to-t from-emerald-400 to-transparent pointer-events-none transition-all duration-300"
                      style={{
                        height: `${Math.min(100, lastBall.runs * 22)}px`,
                        transform: `rotate(${lastBall.shotDirectionDeg}deg)`,
                        transformOrigin: 'bottom center',
                        bottom: '50%',
                        left: '50%'
                      }}
                    />
                  )}
                </div>

                {/* Radar legend / telemetry */}
                <div className="w-full flex flex-col gap-1 text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-900 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Speed: <strong className="text-white">{lastBall?.speedKph ?? 138} kph</strong></span>
                    <span>Pitch: <strong className="text-amber-400">{gameState.pitchPreference}</strong></span>
                    <span>Live Call: <strong className="text-emerald-400 uppercase">{tacticalDirective}</strong></span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                    <span>Strategy: <strong className="text-slate-300">{gameState.matchTactics?.battingStrategy || 'Aggressive Batting'}</strong></span>
                    <span>Field: <strong className="text-sky-400">{gameState.matchTactics?.fieldPlacement || 'Defensive Field'}</strong></span>
                    <span>Bias: <strong className="text-amber-400">{gameState.matchTactics?.bowlingBias || 'Pace Bias'}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Commentary Feed & Active Crease */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                {/* Active Batters & Bowler Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Striker:</span>
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {ourPlaying11[strikerIdx]?.name || 'Batter 1'} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Non-Striker:</span>
                    <span className="font-semibold text-slate-200">
                      {ourPlaying11[nonStrikerIdx]?.name || 'Batter 2'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 border-t border-slate-900 pt-1.5">
                    <span className="text-slate-400">Bowler:</span>
                    <span className="font-semibold text-rose-400">
                      {oppBowlers[bowlerIdx % oppBowlers.length].name} ({oppBowlers[bowlerIdx % oppBowlers.length].role})
                    </span>
                  </div>
                </div>

                {/* Ball by Ball Commentary Scroll */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col h-56">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Live Commentary</span>
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  </div>

                  <div
                    ref={commentaryRef}
                    className="flex-1 overflow-y-auto space-y-2 text-xs font-mono text-slate-300 pr-1"
                  >
                    {ballHistory.length === 0 ? (
                      <div className="text-slate-500 italic py-6 text-center">
                        Umpires and players take the field. Press "Next Ball" or "Auto Play" to start the action.
                      </div>
                    ) : (
                      ballHistory.slice(-15).map((b, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg text-xs leading-relaxed border ${
                            b.isWicket
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                              : b.isBoundarySix
                              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                              : b.isBoundaryFour
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                              : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold mb-1">
                            <span>
                              [{b.overNum}.{b.ballInOver}] {b.bowlerName} to {b.batterName}
                            </span>
                            <span className="px-1.5 py-0.2 rounded font-black">
                              {b.isWicket ? 'WICKET' : b.runs === 0 ? 'DOT' : `${b.runs} RUNS`}
                            </span>
                          </div>
                          <div>{b.commentary}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 8K Broadcast Quality Detailed Scorecard Tab */
            (() => {
              const completedOvers = Math.floor(ballsBowled / 6);
              const ballsInThisOver = ballsBowled % 6;
              const runRate = (runs / Math.max(0.1, completedOvers + ballsInThisOver / 6)).toFixed(2);

              return (
                <div className="space-y-4 font-sans">
                  {/* Batting Card */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/30">
                          8K Ultra Broadcast Scorecard
                        </span>
                        <h3 className="text-sm font-black text-white">{gameState.country} 1st Innings</h3>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-base font-black text-amber-400">{runs}/{wickets}</span>
                        <span className="text-[11px] text-slate-400 font-mono block">
                          ({completedOvers}.{ballsInThisOver} / {maxOvers} ov · RR {runRate})
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-left">
                            <th className="py-2 px-2">Batter</th>
                            <th className="py-2 px-2">Dismissal</th>
                            <th className="py-2 px-2 text-right">R</th>
                            <th className="py-2 px-2 text-right">B</th>
                            <th className="py-2 px-2 text-right">4s</th>
                            <th className="py-2 px-2 text-right">6s</th>
                            <th className="py-2 px-2 text-right">SR</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/80">
                          {ourPlaying11.map((p, idx) => {
                            const isOut = idx < wickets;
                            const isBatting = idx === strikerIdx || idx === nonStrikerIdx;
                            const bRuns = isOut ? Math.floor(Math.random() * 35) + 8 : isBatting ? Math.max(12, Math.floor(runs * 0.35)) : 0;
                            const bBalls = bRuns > 0 ? Math.floor(bRuns * (0.8 + Math.random() * 0.5)) : 0;
                            const bFours = Math.floor(bRuns / 9);
                            const bSixes = Math.floor(bRuns / 18);
                            const sr = bBalls > 0 ? ((bRuns / bBalls) * 100).toFixed(1) : '0.0';

                            return (
                              <tr key={p.id} className="hover:bg-slate-900/40">
                                <td className="py-2 px-2 font-medium text-white flex items-center gap-1.5">
                                  <span>{p.name}</span>
                                  {isBatting && <span className="text-emerald-400 text-[10px] font-bold">★ NOT OUT</span>}
                                </td>
                                <td className="py-2 px-2 text-slate-400 text-[11px]">
                                  {isOut ? (
                                    <span className="text-rose-400">c. Keeper b. {oppBowlers[idx % oppBowlers.length].name}</span>
                                  ) : isBatting ? (
                                    <span className="text-emerald-400 font-bold">Batting</span>
                                  ) : (
                                    <span className="text-slate-600">yet to bat</span>
                                  )}
                                </td>
                                <td className="py-2 px-2 text-right font-mono font-bold text-white">{isOut || isBatting ? bRuns : '-'}</td>
                                <td className="py-2 px-2 text-right font-mono text-slate-400">{isOut || isBatting ? bBalls : '-'}</td>
                                <td className="py-2 px-2 text-right font-mono text-amber-400/90">{isOut || isBatting ? bFours : '-'}</td>
                                <td className="py-2 px-2 text-right font-mono text-purple-400/90">{isOut || isBatting ? bSixes : '-'}</td>
                                <td className="py-2 px-2 text-right font-mono text-slate-300">{isOut || isBatting ? sr : '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Fall of Wickets Timeline */}
                    <div className="mt-4 pt-3 border-t border-slate-900 text-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Fall of Wickets Timeline
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                        {Array.from({ length: wickets }).map((_, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            {i + 1}-{Math.min(runs, Math.floor((runs / Math.max(1, wickets)) * (i + 1)))} ({ourPlaying11[i]?.name.split(' ')[1] || 'Batter'}, {Math.min(completedOvers, Math.floor((completedOvers / Math.max(1, wickets)) * (i + 1)))}.{i + 1} ov)
                          </span>
                        ))}
                        {wickets === 0 && <span className="text-slate-500 italic">No wickets fallen</span>}
                      </div>
                    </div>
                  </div>

                  {/* Opposition Bowling Analysis Matrix */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-lg">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                      <span>{fixture.opponent} Bowling Analysis</span>
                      <span className="text-rose-400 font-mono">8K Precision Tracking</span>
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-left">
                            <th className="py-2 px-2">Bowler</th>
                            <th className="py-2 px-2 text-right">O</th>
                            <th className="py-2 px-2 text-right">M</th>
                            <th className="py-2 px-2 text-right">R</th>
                            <th className="py-2 px-2 text-right">W</th>
                            <th className="py-2 px-2 text-right">ECON</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/80">
                          {oppBowlers.slice(0, 5).map((b, idx) => {
                            const bOvers = Math.max(1, Math.floor(completedOvers / 5));
                            const bRunsConceded = Math.floor(runs / 5);
                            const bWkts = idx === 0 ? Math.ceil(wickets / 2) : idx === 1 ? Math.floor(wickets / 2) : 0;
                            const bEcon = (bRunsConceded / bOvers).toFixed(1);
                            return (
                              <tr key={b.name} className="hover:bg-slate-900/40 font-mono">
                                <td className="py-2 px-2 font-sans font-medium text-white">{b.name} ({b.role})</td>
                                <td className="py-2 px-2 text-right text-slate-300">{bOvers}.0</td>
                                <td className="py-2 px-2 text-right text-slate-400">0</td>
                                <td className="py-2 px-2 text-right text-slate-300">{bRunsConceded}</td>
                                <td className="py-2 px-2 text-right font-bold text-rose-400">{bWkts}</td>
                                <td className="py-2 px-2 text-right text-slate-300">{bEcon}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()
          )}

          {/* Tactical Crisis Prompt Card */}
          {showTacticalPrompt && tacticalPromptData && (
            <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-xl p-4 animate-scaleUp">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>{tacticalPromptData.title}</span>
              </div>
              <p className="text-xs text-slate-300 mb-3">{tacticalPromptData.description}</p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => applyTacticalCall(tacticalPromptData.optA.key)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md"
                >
                  {tacticalPromptData.optA.label}
                </button>
                <button
                  onClick={() => applyTacticalCall(tacticalPromptData.optB.key)}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all border border-slate-700"
                >
                  {tacticalPromptData.optB.label}
                </button>
              </div>
            </div>
          )}

          {/* DRS Hawk-Eye Overlay / Result */}
          {drsReviewing && (
            <div className="bg-sky-500/10 border border-sky-500/40 rounded-xl p-4 text-center animate-pulse">
              <div className="text-sky-400 font-bold text-sm mb-1">
                🔬 Hawk-Eye Ball Tracking In Progress...
              </div>
              <p className="text-xs text-slate-300">
                Calibrating ultra-high-speed camera angles and pitch trajectory path...
              </p>
              {drsTrackingResult && (
                <div className="mt-3 p-3 bg-slate-950 rounded-lg text-xs font-mono space-y-1">
                  <div>Pitching: <strong className="text-white">{drsTrackingResult.pitching}</strong></div>
                  <div>Impact: <strong className="text-white">{drsTrackingResult.impact}</strong></div>
                  <div>Wickets: <strong className="text-white">{drsTrackingResult.wickets}</strong></div>
                  <div className="text-amber-400 font-bold text-sm pt-1">{drsTrackingResult.decision}</div>
                </div>
              )}
            </div>
          )}

          {/* Game Over Banner */}
          {isGameOver && (
            <div className={`p-5 rounded-xl border text-center space-y-3 ${
              matchWon
                ? 'bg-emerald-500/15 border-emerald-500 text-white'
                : 'bg-rose-500/15 border-rose-500 text-white'
            }`}>
              <div className="flex items-center justify-center gap-2 text-2xl font-black">
                {matchWon ? <Trophy className="w-7 h-7 text-amber-400" /> : <XCircle className="w-7 h-7 text-rose-400" />}
                <span>{matchWon ? 'MATCH VICTORY!' : 'MATCH DEFEAT'}</span>
              </div>
              <p className="text-sm font-medium">{gameOverSummary}</p>
              <div className="text-xs text-slate-300">
                Treasury Impact: <strong className="text-emerald-400">{matchWon ? '+$4.5M' : '+$1.5M'}</strong> · Fan Trust: <strong className={matchWon ? 'text-amber-400' : 'text-rose-400'}>{matchWon ? '+6%' : '-3%'}</strong>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleConclude}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg text-sm"
                >
                  Conclude Match & Return to Board Room 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
