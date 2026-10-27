import React, { useState } from 'react';
import { 
  Building2, 
  Tv, 
  Dumbbell, 
  Mic, 
  HeartPulse, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Shield, 
  Activity, 
  Flame, 
  Zap, 
  Compass, 
  Droplet,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BoardCountry, Player, FacilityRoomId } from '../../types/game';
import { playClickSound, playCashChime, playVictoryFanfare } from '../../utils/sound';

interface FacilitiesHeadquartersTabProps {
  country: BoardCountry;
  boardName: string;
  chairmanName: string;
  treasury: number;
  squad: Player[];
  onBoostSquadFitness: (cost: number, fitnessGain: number) => void;
  onUpgradeFacilityTech: (cost: number, name: string) => void;
  onCollectMerchRevenue: (revenue: number) => void;
  onChairmanMeetingResponse: (attitude: string, trustDelta: number, stabilityDelta: number) => void;
}

export const FacilitiesHeadquartersTab: React.FC<FacilitiesHeadquartersTabProps> = ({
  country,
  boardName,
  chairmanName,
  treasury,
  squad,
  onBoostSquadFitness,
  onUpgradeFacilityTech,
  onCollectMerchRevenue,
  onChairmanMeetingResponse
}) => {
  const [activeRoom, setActiveRoom] = useState<FacilityRoomId>('boardroom');

  // Boardroom Meeting Dialogue State
  const [meetingPartner, setMeetingPartner] = useState<'Coach' | 'Captain' | 'Commercial' | 'Agent'>('Coach');
  const [meetingDialogueLog, setMeetingDialogueLog] = useState<string[]>([
    `Head Coach: "Welcome Chairman ${chairmanName}. We have calibrated the high-performance drills. How do you want us approaching squad discipline this week?"`
  ]);

  // Pressroom Conference Question State
  const [pressQuestionIndex, setPressQuestionIndex] = useState(0);
  const [pressAnswerFeedback, setPressAnswerFeedback] = useState<string | null>(null);

  // Merchandise status
  const [merchCollectedToday, setMerchCollectedToday] = useState(false);

  // Press questions
  const PRESS_QUESTIONS = [
    {
      journalist: 'David Miller (The Global Cricket Herald)',
      question: `"Chairman, critics argue your board is prioritizing lucrative TV broadcast packages over red-ball player welfare. What is your response?"`,
      options: [
        { label: 'Diplomatic Statesman', text: '"Our broadcast revenue directly subsidizes grassroots facilities and player pensions across all three formats."', trust: 4, stab: 3 },
        { label: 'Aggressive / Combative', text: '"Without our financial vision, professional cricket wouldn’t exist at this world-class standard. Next question."', trust: -2, stab: 5 },
        { label: 'Charismatic Reformer', text: '"We are introducing historic revenue-sharing incentives for Test players starting this very quarter."', trust: 6, stab: 2 }
      ]
    },
    {
      journalist: 'Sunil Sen (CricAsia Network)',
      question: `"Rumors persist of friction regarding player NOCs for private franchise T20 leagues. Will you clamp down or grant total player autonomy?"`,
      options: [
        { label: 'National Integrity First', text: '"National duty remains supreme. No player represents private leagues during official international windows."', trust: 5, stab: 4 },
        { label: 'Commercial Harmony', text: '"We are partnering constructively with global leagues while securing handsome NOC indemnity fees for our board."', trust: 3, stab: 4 },
        { label: 'Player-Centric Liberty', text: '"We trust our athletes. Career longevity requires commercial freedom alongside national pride."', trust: 2, stab: -2 }
      ]
    }
  ];

  const handleAnswerPress = (opt: typeof PRESS_QUESTIONS[0]['options'][0]) => {
    playClickSound();
    playCashChime();
    setPressAnswerFeedback(`You responded with ${opt.label}: "${opt.text}"`);
    onChairmanMeetingResponse(opt.label, opt.trust, opt.stab);
    setTimeout(() => {
      setPressQuestionIndex((prev) => (prev + 1) % PRESS_QUESTIONS.length);
      setPressAnswerFeedback(null);
    }, 3500);
  };

  const handleMeetingAttitude = (attitude: 'Diplomatic' | 'Aggressive' | 'Visionary' | 'Fiscal') => {
    playClickSound();
    let reply = '';
    let trustDelta = 2;
    let stabDelta = 2;

    if (attitude === 'Diplomatic') {
      reply = `Chairman (${attitude}): "Let us build consensus across all stakeholders. Balance athlete recovery with board targets."`;
      trustDelta = 4;
      stabDelta = 3;
    } else if (attitude === 'Aggressive') {
      reply = `Chairman (${attitude}): "Excuses do not win world championships. Deliver ruthless execution or step aside for hungry youth."`;
      trustDelta = -1;
      stabDelta = 5;
    } else if (attitude === 'Visionary') {
      reply = `Chairman (${attitude}): "We are revolutionizing international cricket. Modern 8K tactical analytics will propel us to #1 in all ICC rankings."`;
      trustDelta = 5;
      stabDelta = 2;
    } else {
      reply = `Chairman (${attitude}): "Financial sustainability comes first. Every dollar invested in facilities must yield silverware."`;
      trustDelta = 2;
      stabDelta = 4;
    }

    setMeetingDialogueLog((prev) => [reply, ...prev]);
    onChairmanMeetingResponse(attitude, trustDelta, stabDelta);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* 4D Facility Complex Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-500/15 text-indigo-400 rounded-lg">
                <Building2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                4D Visual Facility Complex & Executive HQ
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                8K Broadcast Specification
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Inspect multi-dimensional facility infrastructure across the stadium bowl, biomechanics training nets, media conference pressrooms, recovery medical wards, and luxury hospitality megastores.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 p-3 rounded-xl shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Treasury Balance</div>
              <div className="text-base font-black text-emerald-400">${(treasury / 1000000).toFixed(2)}M</div>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Squad Size</div>
              <div className="text-base font-black text-white">{squad.length} Players</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Room Facility Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'boardroom', label: 'Executive Boardroom', icon: <Users className="w-4 h-4" /> },
          { id: 'stadium', label: '4D Stadium (8K Quality)', icon: <Camera className="w-4 h-4" /> },
          { id: 'training', label: 'High-Performance Nets', icon: <Dumbbell className="w-4 h-4" /> },
          { id: 'pressroom', label: 'Pressroom & Scrums', icon: <Mic className="w-4 h-4" /> },
          { id: 'restroom', label: 'Locker Room & Restrooms', icon: <Droplet className="w-4 h-4" /> },
          { id: 'hospital', label: 'Physio Hospital & Rehab', icon: <HeartPulse className="w-4 h-4" /> },
          { id: 'merchandise', label: 'Merchandise & Luxury Soaps', icon: <ShoppingBag className="w-4 h-4" /> }
        ].map((room) => {
          const isActive = activeRoom === room.id;
          return (
            <button
              key={room.id}
              onClick={() => {
                playClickSound();
                setActiveRoom(room.id as FacilityRoomId);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/60'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{room.icon}</span>
              <span>{room.label}</span>
            </button>
          );
        })}
      </div>

      {/* Room 1: Executive Boardroom Live Meetings */}
      {activeRoom === 'boardroom' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Chairman’s Executive Round Table</span>
                </h3>
                <p className="text-xs text-slate-400">Engage in live talking dialogues with senior officials to assert leadership attitude.</p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {(['Coach', 'Captain', 'Commercial', 'Agent'] as const).map((partner) => (
                  <button
                    key={partner}
                    onClick={() => {
                      playClickSound();
                      setMeetingPartner(partner);
                      setMeetingDialogueLog((prev) => [
                        `${partner}: "Chairman, we are seated and ready for your strategic guidance."`,
                        ...prev
                      ]);
                    }}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                      meetingPartner === partner
                        ? 'bg-indigo-500 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {partner}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Dialogue Log */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-64 overflow-y-auto space-y-3 font-sans text-xs">
              {meetingDialogueLog.map((log, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border ${
                    log.startsWith('Chairman')
                      ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Attitude Selection Triggers */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Choose Chairman’s Attitude Response:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleMeetingAttitude('Diplomatic')}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-left transition hover:bg-emerald-950/20"
                >
                  <div className="text-xs font-bold text-emerald-400">Diplomatic</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">+4 Trust, +3 Stability</div>
                </button>

                <button
                  onClick={() => handleMeetingAttitude('Aggressive')}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-rose-500/50 rounded-xl text-left transition hover:bg-rose-950/20"
                >
                  <div className="text-xs font-bold text-rose-400">Aggressive / Fierce</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">+5 Stability, Tough Discipline</div>
                </button>

                <button
                  onClick={() => handleMeetingAttitude('Visionary')}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-left transition hover:bg-indigo-950/20"
                >
                  <div className="text-xs font-bold text-indigo-400">Visionary Reformer</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">+5 Trust, Media Buzz</div>
                </button>

                <button
                  onClick={() => handleMeetingAttitude('Fiscal')}
                  className="p-3 bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left transition hover:bg-amber-950/20"
                >
                  <div className="text-xs font-bold text-amber-400">Fiscal Hawk</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">+4 Stability, Budget Discipline</div>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Executive Committee Directives</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="font-bold text-white">Annual ICC Voting Stance</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Aligned with Tier-1 members on global revenue pool allocation.</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="font-bold text-white">Central Contract Oversight</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Strict adherence to fitness benchmarks (16.1 minimum Yo-Yo threshold).</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="font-bold text-white">State Association Accord</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Quarterly grassroots development grants confirmed.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room 2: 4D Stadium (8K Quality) */}
      {activeRoom === 'stadium' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-indigo-400" />
                  <span>4D Visual Stadium Architecture & 8K Camera Array</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Full 4D visual spatial overview of the premier international arena, turf matrix, and 8K UltraMotion camera angles.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                8K UltraHDR Live Feed
              </span>
            </div>

            {/* Visual 4D Stadium Blueprint Rendering */}
            <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-8 overflow-hidden min-h-[320px] flex items-center justify-center">
              {/* Stadium Oval Field Graphic */}
              <div className="w-full max-w-xl aspect-[16/9] border-4 border-emerald-500/40 rounded-[100px] relative bg-emerald-950/30 flex items-center justify-center shadow-2xl shadow-emerald-950/80">
                {/* 30 Yard Circle */}
                <div className="w-3/5 h-3/5 border-2 border-dashed border-emerald-400/50 rounded-[60px] flex items-center justify-center">
                  {/* Pitch Strip */}
                  <div className="w-16 h-40 bg-amber-900/40 border border-amber-600/60 rounded flex flex-col justify-between p-1 items-center shadow-lg">
                    <div className="w-6 h-0.5 bg-white/80" />
                    <span className="text-[9px] font-mono text-amber-300 font-bold">22 YARDS</span>
                    <div className="w-6 h-0.5 bg-white/80" />
                  </div>
                </div>

                {/* 8K Camera Nodes */}
                <div className="absolute top-2 left-6 bg-slate-900/90 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/40 flex items-center gap-1">
                  <Camera className="w-3 h-3" /> 8K SpiderCam A
                </div>
                <div className="absolute bottom-2 right-6 bg-slate-900/90 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/40 flex items-center gap-1">
                  <Camera className="w-3 h-3" /> 8K UltraMotion Slip Cam
                </div>
                <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-slate-900/90 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/40 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Hawk-Eye LiDAR
                </div>
                <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-slate-900/90 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-500/40 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Snicko Acoustical
                </div>
              </div>
            </div>

            {/* Stadium Specification Diagnostics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Turf Matrix</div>
                <div className="text-sm font-bold text-white mt-1">Bermuda Hybrid Grass</div>
                <div className="text-emerald-400 text-[10px] mt-0.5">Compaction: 98% Optimal</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Lighting Specification</div>
                <div className="text-sm font-bold text-white mt-1">3200 Lux Ring of Fire</div>
                <div className="text-indigo-400 text-[10px] mt-0.5">Zero Shadow Flicker</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Drainage Telemetry</div>
                <div className="text-sm font-bold text-white mt-1">SubAir Vacuum Exhaust</div>
                <div className="text-sky-400 text-[10px] mt-0.5">Drains 200mm/hr rainfall</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-bold">8K Ultra Broadcast</div>
                <div className="text-sm font-bold text-white mt-1">48 Native 8K Rigs</div>
                <div className="text-amber-400 text-[10px] mt-0.5">High Dynamic Range</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room 3: High-Performance Nets & Biomechanics Training Station */}
      {activeRoom === 'training' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  <span>High-Performance Training Station & Biomechanics Lab</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Automated programmable 160 kph bowling machines, high-speed biomechanics sensors, and cryogenic recovery.
                </p>
              </div>
              <button
                onClick={() => {
                  if (treasury < 1500000) return;
                  playCashChime();
                  onUpgradeFacilityTech(1500000, 'AI Biomechanics Radar');
                }}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/60"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Upgrade AI Motion Tracking ($1.5M)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>Fast Bowling Biomechanics</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  High-speed 1000fps cameras track front foot landing impact, shoulder hip separation, and arm flexion angle.
                </p>
                <div className="text-emerald-400 font-bold text-[11px]">Injury Risk Reduction: +22%</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>Spin Bowling Flight Tunnel</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Aerodynamic wind velocity simulator analyzing RPM revolutions, dip, drift, and deceptive bounce vectors.
                </p>
                <div className="text-sky-400 font-bold text-[11px]">Spin Deception Boost: +18%</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Power Hitting Range</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Bat launch angle optimization and exit velocity telemetry for powerplay and death over acceleration.
                </p>
                <div className="text-amber-400 font-bold text-[11px]">Boundary Strike Rate: +14%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room 4: Pressroom & Live Media Scrums */}
      {activeRoom === 'pressroom' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mic className="w-4 h-4 text-rose-400" />
                  <span>Live Pressroom & Global Media Scrums</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Global cricket correspondents pose hard questions. Your attitude response directly sways public sentiment.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                LIVE BROADCAST
              </span>
            </div>

            {/* Journalist Prompt Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                {PRESS_QUESTIONS[pressQuestionIndex].journalist}
              </div>
              <div className="text-sm font-semibold text-white italic leading-relaxed">
                {PRESS_QUESTIONS[pressQuestionIndex].question}
              </div>

              {pressAnswerFeedback && (
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs font-semibold animate-fadeIn">
                  {pressAnswerFeedback}
                </div>
              )}
            </div>

            {/* Response Options */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Chairman’s Official Podium Stance:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {PRESS_QUESTIONS[pressQuestionIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerPress(opt)}
                    className="p-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-left transition space-y-1.5"
                  >
                    <div className="text-xs font-bold text-indigo-300">{opt.label}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      {opt.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room 5: Restrooms & Player Dressing Room */}
      {activeRoom === 'restroom' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-sky-400" />
                  <span>Dressing Rooms, Player Restrooms & Ice Baths</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect squad morale, team huddle culture, and individual player attitude ratings.
                </p>
              </div>
            </div>

            {/* Squad Attitude Quick Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {squad.slice(0, 12).map((player) => (
                <div
                  key={player.id}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white">{player.name}</div>
                    <div className="text-[10px] text-slate-400">{player.role} · Grade {player.grade}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {player.attitude || 'Model Professional'}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-1">Morale: {player.morale}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Room 6: Medical Physio Hospital & Rehab Clinic */}
      {activeRoom === 'hospital' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  <span>National Cricket Hospital & Physio Recovery Clinic</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Orthopedic MRI scans, hyperbaric oxygen chambers, and intensive squad reconditioning therapy.
                </p>
              </div>

              <button
                onClick={() => {
                  if (treasury < 500000) return;
                  playCashChime();
                  onBoostSquadFitness(500000, 12);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-950/60"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Squad Cryotherapy Boost ($500k)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">Hyperbaric Oxygen Pods</div>
                <p className="text-slate-400 text-[11px]">Accelerates soft tissue recovery from 14 days down to 4 days.</p>
                <div className="text-emerald-400 font-bold text-[10px]">Status: Active & Operational</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">Orthopedic Diagnostic Wing</div>
                <p className="text-slate-400 text-[11px]">3T MRI and dynamic stress ultrasound screening for stress fractures.</p>
                <div className="text-emerald-400 font-bold text-[10px]">Status: Active & Operational</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-white">Sports Nutrition & Hydration Lab</div>
                <p className="text-slate-400 text-[11px]">Custom electrolyte profiles and anti-cramp glycogen loading.</p>
                <div className="text-emerald-400 font-bold text-[10px]">Status: Active & Operational</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Room 7: Merchandise Megastore & Luxury Soap/Concessions */}
      {activeRoom === 'merchandise' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Official Merchandise Megastore & Luxury Concessions</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Commercial retail outlets, national test caps, replica jerseys, and luxury corporate suite amenity soaps.
                </p>
              </div>

              <button
                onClick={() => {
                  if (merchCollectedToday) return;
                  playCashChime();
                  setMerchCollectedToday(true);
                  onCollectMerchRevenue(3200000);
                }}
                disabled={merchCollectedToday}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  merchCollectedToday
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-950/60'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{merchCollectedToday ? 'Retail Revenue Collected' : 'Collect Retail Payout ($3.2M)'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white">Official Test & ODI Jerseys</div>
                <p className="text-slate-400 text-[11px]">Breathable moisture-wicking fabric with embroidered board crest.</p>
                <div className="text-emerald-400 font-bold text-[11px]">Gross Monthly Margin: $4.5M</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white">VIP Suite Luxury Artisan Soaps & Grooming</div>
                <p className="text-slate-400 text-[11px]">
                  Bespoke sandalwood, bergamot & shea butter soaps branded for corporate luxury boxes and presidential hospitality suites.
                </p>
                <div className="text-amber-400 font-bold text-[11px]">Corporate Box Rating: 5-Star Luxury</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white">Collector Heritage Memorabilia</div>
                <p className="text-slate-400 text-[11px]">Signed match-used willow bats and framed commemorative tournament coins.</p>
                <div className="text-sky-400 font-bold text-[11px]">Annual Auction Value: $1.8M</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
