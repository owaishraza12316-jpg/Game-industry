import React, { useState, useMemo } from 'react';
import { 
  Globe2, 
  Search, 
  Filter, 
  DollarSign, 
  Shield, 
  Zap, 
  Award, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Handshake, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { 
  BoardCountry, 
  ContractGrade, 
  MarketListing, 
  Player 
} from '../../types/game';
import { playClickSound, playCashChime, playVictoryFanfare } from '../../utils/sound';

interface PlayerMarketTabProps {
  marketListings: MarketListing[];
  treasury: number;
  userCountry: BoardCountry;
  boardName: string;
  onScoutPlayer: (playerId: string) => void;
  onCompleteTransfer: (
    player: Player,
    transferFee: number,
    salary: number,
    contractYears: number,
    grade: ContractGrade,
    rolePledge: string,
    signingBonus: number
  ) => void;
}

export const PlayerMarketTab: React.FC<PlayerMarketTabProps> = ({
  marketListings,
  treasury,
  userCountry,
  boardName,
  onScoutPlayer,
  onCompleteTransfer,
}) => {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [minRating, setMinRating] = useState<number>(80);

  // Active negotiation modal
  const [activeListing, setActiveListing] = useState<MarketListing | null>(null);
  const [negotiationPhase, setNegotiationPhase] = useState<'board_fee' | 'player_terms' | 'completed' | 'failed'>('board_fee');
  
  // Phase 1: Transfer Fee negotiation state
  const [offeredFee, setOfferedFee] = useState<number>(0);
  const [currentBoardDemand, setCurrentBoardDemand] = useState<number>(0);
  const [boardPatience, setBoardPatience] = useState<number>(3);
  const [boardDialogue, setBoardDialogue] = useState<string>('');

  // Phase 2: Personal Terms negotiation state
  const [offeredSalary, setOfferedSalary] = useState<number>(1.5);
  const [offeredYears, setOfferedYears] = useState<number>(3);
  const [offeredBonus, setOfferedBonus] = useState<number>(1000000);
  const [offeredGrade, setOfferedGrade] = useState<ContractGrade>('A');
  const [offeredRole, setOfferedRole] = useState<'Marquee Icon (Guaranteed Starter)' | 'First XI Regular' | 'Squad Rotation'>('First XI Regular');
  const [agentDialogue, setAgentDialogue] = useState<string>('');

  // Toast / feedback message
  const [feedbackToast, setFeedbackToast] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const triggerToast = (type: 'success' | 'info' | 'error', message: string) => {
    setFeedbackToast({ type, message });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Available countries excluding user's own country
  const countryOptions = useMemo(() => {
    const list = Array.from(new Set(marketListings.map((l) => l.player.country)));
    return ['ALL', ...list];
  }, [marketListings]);

  // Roles list
  const roleOptions = [
    'ALL',
    'Opening Batter',
    'Top Order',
    'Middle Order',
    'Wicketkeeper Batter',
    'Pace All-Rounder',
    'Spin All-Rounder',
    'Fast Bowler',
    'Express Pacer',
    'Mystery Spinner',
    'Leg Spinner',
    'Left-Arm Orthodox'
  ];

  // Filtered listings
  const filteredListings = useMemo(() => {
    return marketListings.filter((item) => {
      if (selectedCountry !== 'ALL' && item.player.country !== selectedCountry) return false;
      if (selectedRole !== 'ALL' && item.player.role !== selectedRole) return false;
      if (selectedStatus !== 'ALL' && item.parentBoardStatus !== selectedStatus) return false;
      if (item.player.rating < minRating) return false;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = item.player.name.toLowerCase().includes(query);
        const matchesCountry = item.player.country.toLowerCase().includes(query);
        const matchesRole = item.player.role.toLowerCase().includes(query);
        if (!matchesName && !matchesCountry && !matchesRole) return false;
      }
      return true;
    });
  }, [marketListings, selectedCountry, selectedRole, selectedStatus, minRating, searchTerm]);

  // Open negotiation modal
  const handleStartNegotiation = (listing: MarketListing) => {
    playClickSound();
    setActiveListing(listing);
    setNegotiationPhase('board_fee');
    setCurrentBoardDemand(listing.transferFeeDemand);
    // Initial offer starts at 85% of demand rounded to nearest 500k
    const initialOffer = Math.round((listing.transferFeeDemand * 0.85) / 500000) * 500000;
    setOfferedFee(initialOffer);
    setBoardPatience(3);
    setBoardDialogue(
      `"Welcome Chairman. ${listing.player.name} is a cornerstone of our national setup. We are asking $${(listing.transferFeeDemand / 1000000).toFixed(1)}M to sanction this international buyout."`
    );

    // Initial personal terms
    setOfferedSalary(listing.minimumSalaryDemand);
    setOfferedYears(listing.player.contractYears || 3);
    setOfferedBonus(1000000);
    setOfferedGrade(listing.player.grade || 'A');
    setOfferedRole(listing.player.rating >= 92 ? 'Marquee Icon (Guaranteed Starter)' : 'First XI Regular');
    setAgentDialogue(
      `"My client is eager to consider representing your board, provided our financial value and squad standing are respected."`
    );
  };

  // Phase 1: Submit fee offer to parent board
  const handleSubmitFeeOffer = () => {
    if (!activeListing) return;
    playClickSound();

    if (offeredFee > treasury) {
      triggerToast('error', 'Insufficient funds in board treasury for this buyout offer!');
      return;
    }

    const demand = currentBoardDemand;

    // Full demand met or exceeded
    if (offeredFee >= demand) {
      playCashChime();
      setNegotiationPhase('player_terms');
      setBoardDialogue(
        `"Offer accepted! An international transfer buyout of $${(offeredFee / 1000000).toFixed(2)}M is ratified by our executive committee. You have permission to negotiate personal terms with ${activeListing.player.name}'s representation."`
      );
      return;
    }

    // Near demand (within 10%)
    if (offeredFee >= demand * 0.9) {
      const counterFee = Math.round((demand * 0.95) / 250000) * 250000;
      setCurrentBoardDemand(counterFee);
      setBoardPatience((prev) => prev - 1);
      setBoardDialogue(
        `"Your offer of $${(offeredFee / 1000000).toFixed(2)}M is close, but we cannot sell short. Meet us at $${(counterFee / 1000000).toFixed(2)}M and we will grant immediate transfer clearance."`
      );
      return;
    }

    // Significant lowball (between 70% and 89%)
    if (offeredFee >= demand * 0.7) {
      const newPatience = boardPatience - 1;
      setBoardPatience(newPatience);
      if (newPatience <= 0) {
        setNegotiationPhase('failed');
        setBoardDialogue(
          `"We feel your offers fail to acknowledge the international pedigree of ${activeListing.player.name}. Our committee has terminated negotiations."`
        );
      } else {
        const counterFee = Math.round((demand * 0.98) / 250000) * 250000;
        setCurrentBoardDemand(counterFee);
        setBoardDialogue(
          `"Unacceptable lowball for a world-class international. We insist on $${(counterFee / 1000000).toFixed(2)}M minimum. Our patience is wearing thin (${newPatience} rounds remaining)."`
        );
      }
      return;
    }

    // Extreme lowball (< 70%)
    const remainingPatience = boardPatience - 2;
    setBoardPatience(remainingPatience);
    if (remainingPatience <= 0) {
      setNegotiationPhase('failed');
      setBoardDialogue(
        `"This insultingly low bid of $${(offeredFee / 1000000).toFixed(2)}M has offended our board. All transfer talks are officially terminated."`
      );
    } else {
      setBoardDialogue(
        `"Are you joking, Chairman? $${(offeredFee / 1000000).toFixed(2)}M is completely detached from the market. We demand $${(demand / 1000000).toFixed(1)}M."`
      );
    }
  };

  // Phase 2: Calculate personal terms interest score
  const calculatePlayerInterest = () => {
    if (!activeListing) return 50;
    let score = activeListing.interestLevel;

    // Salary comparison
    const salaryDiffRatio = offeredSalary / activeListing.minimumSalaryDemand;
    if (salaryDiffRatio >= 1.25) score += 25;
    else if (salaryDiffRatio >= 1.1) score += 15;
    else if (salaryDiffRatio >= 1.0) score += 8;
    else if (salaryDiffRatio < 0.9) score -= 30;
    else score -= 15;

    // Signing bonus boost
    score += Math.min(20, Math.floor(offeredBonus / 250000) * 3);

    // Contract length preference
    if (activeListing.player.age > 33) {
      // Veterans love long contracts (security)
      if (offeredYears >= 3) score += 12;
    } else if (activeListing.player.age < 25) {
      // Young stars prefer 2-3 years for flexibility
      if (offeredYears <= 3) score += 8;
    }

    // Grade and Role
    if (offeredRole === 'Marquee Icon (Guaranteed Starter)') score += 15;
    if (offeredRole === 'Squad Rotation' && activeListing.player.rating >= 90) score -= 35;
    if (offeredGrade === 'A+') score += 10;

    return Math.max(5, Math.min(99, score));
  };

  // Submit personal terms
  const handleSubmitPlayerTerms = () => {
    if (!activeListing) return;
    playClickSound();

    const totalUpfrontCost = offeredFee + offeredBonus;
    if (totalUpfrontCost > treasury) {
      triggerToast('error', 'Insufficient treasury funds to cover transfer fee plus upfront signing bonus!');
      return;
    }

    const interest = calculatePlayerInterest();

    if (interest >= 65) {
      // Deal sealed!
      setNegotiationPhase('completed');
      playVictoryFanfare();
      setAgentDialogue(
        `"We have an agreement! ${activeListing.player.name} is thrilled to sign with ${boardName} on an annual compensation package of $${offeredSalary.toFixed(2)}M/yr as our promised ${offeredRole}. Here is the signed contract!"`
      );
    } else {
      triggerToast('info', 'The player hesitated on these terms. Consider increasing salary, signing bonus, or squad role pledge!');
      setAgentDialogue(
        `"My client feels this proposal does not match our expectations. We require higher compensation or a more guaranteed starting marquee status to relocate."`
      );
    }
  };

  // Final confirmation to sign and close
  const handleFinalizeTransfer = () => {
    if (!activeListing) return;
    onCompleteTransfer(
      activeListing.player,
      offeredFee,
      offeredSalary,
      offeredYears,
      offeredGrade,
      offeredRole,
      offeredBonus
    );
    setActiveListing(null);
    triggerToast('success', `Transfer Complete: ${activeListing.player.name} is now registered in your national squad!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div
          className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl border text-sm font-semibold flex items-center gap-3 animate-slideIn ${
            feedbackToast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
              : feedbackToast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-300'
              : 'bg-sky-950/90 border-sky-500/50 text-sky-300'
          }`}
        >
          {feedbackToast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {feedbackToast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {feedbackToast.type === 'info' && <Sparkles className="w-5 h-5 text-sky-400" />}
          <span>{feedbackToast.message}</span>
        </div>
      )}

      {/* Hero Overview Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/50 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Globe2 className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Global Player Transfer Market</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                2026 Window Open
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Scout international superstars from rival national boards, negotiate multi-phase buyout fees with foreign board executives, and ratify marquee contracts for your governing board.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Available Treasury</div>
              <div className="text-lg font-black text-emerald-400">
                ${(treasury / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Listed Targets</div>
              <div className="text-lg font-black text-white">{filteredListings.length}</div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Scout Cost</div>
              <div className="text-lg font-black text-amber-400">$500k</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search by name */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search player, nation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Country filter */}
          <div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
            >
              <option value="ALL">All National Boards</option>
              {countryOptions.filter((c) => c !== 'ALL').map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Role filter */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role === 'ALL' ? 'All Playing Roles' : role}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500/50"
            >
              <option value="ALL">All Transfer Statuses</option>
              <option value="Open to Offers">Open to Offers</option>
              <option value="Transfer Listed">Transfer Listed</option>
              <option value="Demanding Premium">Demanding Premium</option>
              <option value="Reluctant to Sell">Reluctant to Sell</option>
            </select>
          </div>

          {/* Min Rating */}
          <div className="flex items-center gap-3 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
              Min OVR: <strong className="text-emerald-400">{minRating}</strong>
            </span>
            <input
              type="range"
              min="80"
              max="95"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Market Listing Grid */}
      {filteredListings.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-12 text-center space-y-3">
          <Globe2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No Players Matching Filter Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your playing role, parent board, or overall rating thresholds.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCountry('ALL');
              setSelectedRole('ALL');
              setSelectedStatus('ALL');
              setMinRating(80);
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map((item) => {
            const { player, transferFeeDemand, minimumSalaryDemand, parentBoardStatus, scouted, scoutReport } = item;
            const canAffordBuyout = treasury >= transferFeeDemand;

            return (
              <div
                key={player.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  {/* Card Header: Country, Status, Rating */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                        <span>{player.country}</span>
                        <span>·</span>
                        <span>{player.role}</span>
                        <span>·</span>
                        <span>Age {player.age}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">{player.name}</h3>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black text-emerald-400">{player.rating}</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">OVR RATING</div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="mb-4">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border inline-block ${
                        parentBoardStatus === 'Transfer Listed'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : parentBoardStatus === 'Open to Offers'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : parentBoardStatus === 'Demanding Premium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      }`}
                    >
                      {parentBoardStatus}
                    </span>
                  </div>

                  {/* Attributes Matrix */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-4 text-center">
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold">BAT</div>
                      <div className="text-xs font-bold text-slate-200">{player.battingRating}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold">BOWL</div>
                      <div className="text-xs font-bold text-slate-200">{player.bowlingRating}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold">FIT</div>
                      <div className="text-xs font-bold text-slate-200">{player.fitness}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold">FORM</div>
                      <div className="text-xs font-bold text-slate-200">{player.form}%</div>
                    </div>
                  </div>

                  {/* Financial Requirements */}
                  <div className="space-y-1.5 text-xs border-t border-slate-800/80 pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Board Buyout Fee:</span>
                      <span className="font-bold text-white">${(transferFeeDemand / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Base Wage Demand:</span>
                      <span className="font-bold text-emerald-400">${minimumSalaryDemand.toFixed(2)}M / yr</span>
                    </div>
                  </div>

                  {/* Scouting Dossier section */}
                  {scouted && scoutReport ? (
                    <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 mb-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Scout Dossier Verified
                        </span>
                        <span>Clutch: {scoutReport.clutchRating}/100</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-500">Injury Risk: </span>
                          <span
                            className={
                              scoutReport.injuryRisk === 'Low'
                                ? 'text-emerald-400 font-bold'
                                : scoutReport.injuryRisk === 'Moderate'
                                ? 'text-amber-400 font-bold'
                                : 'text-rose-400 font-bold'
                            }
                          >
                            {scoutReport.injuryRisk}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Mindset: </span>
                          <span className="text-slate-300 font-bold">{scoutReport.temperament}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 italic">"{scoutReport.scoutVerdict}"</p>
                    </div>
                  ) : (
                    <div className="bg-slate-950/40 border border-dashed border-slate-800 rounded-xl p-3 mb-4 text-center">
                      <p className="text-[11px] text-slate-500 mb-2">Unscouted target. Hidden clutch & temperament data.</p>
                      <button
                        onClick={() => {
                          if (treasury < 500000) {
                            triggerToast('error', 'Insufficient funds ($500,000 required for scouting dossier)');
                            return;
                          }
                          playClickSound();
                          playCashChime();
                          onScoutPlayer(player.id);
                          triggerToast('success', `Scouting report completed for ${player.name}`);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-[11px] font-bold rounded-lg transition inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Scout Dossier ($500k)
                      </button>
                    </div>
                  )}
                </div>

                {/* Negotiation Trigger Button */}
                <button
                  onClick={() => handleStartNegotiation(item)}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition"
                >
                  <Handshake className="w-4 h-4" />
                  <span>Enter Transfer Negotiations</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Negotiation War Room Modal */}
      {activeListing && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Handshake className="w-4 h-4" />
                  <span>Executive Transfer War Room</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  Negotiating for {activeListing.player.name} ({activeListing.player.country})
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  {activeListing.player.role} · Rating {activeListing.player.rating} · Represented by {activeListing.player.country} Cricket Board
                </div>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveListing(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Negotiation Step Indicator */}
            <div className="flex items-center gap-3 mb-6 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div
                className={`flex-1 flex items-center gap-2 text-xs font-bold ${
                  negotiationPhase === 'board_fee'
                    ? 'text-emerald-400'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    negotiationPhase === 'board_fee'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  1
                </div>
                <span>Phase 1: Board Buyout Fee</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <div
                className={`flex-1 flex items-center gap-2 text-xs font-bold ${
                  negotiationPhase === 'player_terms' || negotiationPhase === 'completed'
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    negotiationPhase === 'player_terms'
                      ? 'bg-emerald-500 text-slate-950'
                      : negotiationPhase === 'completed'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  2
                </div>
                <span>Phase 2: Personal Terms</span>
              </div>
            </div>

            {/* Phase 1: Board-to-Board Buyout Fee */}
            {negotiationPhase === 'board_fee' && (
              <div className="space-y-6">
                {/* Dialogue Box */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3">
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0 h-fit">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                      {activeListing.player.country} Cricket Board Committee
                    </div>
                    <p className="text-xs text-slate-300 mt-1 italic leading-relaxed">
                      {boardDialogue}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Patience: {'★'.repeat(Math.max(0, boardPatience))}{'☆'.repeat(Math.max(0, 3 - boardPatience))}</span>
                      <span>·</span>
                      <span>Target Asking Demand: <strong className="text-white">${(currentBoardDemand / 1000000).toFixed(2)}M</strong></span>
                    </div>
                  </div>
                </div>

                {/* Offer Input & Controls */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Your Transfer Buyout Offer:
                    </label>
                    <span className="text-xl font-black text-emerald-400">
                      ${(offeredFee / 1000000).toFixed(2)}M
                    </span>
                  </div>

                  <input
                    type="range"
                    min="3000000"
                    max={Math.max(currentBoardDemand * 1.3, 30000000)}
                    step="500000"
                    value={offeredFee}
                    onChange={(e) => setOfferedFee(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => setOfferedFee((prev) => Math.max(1000000, prev - 1000000))}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-lg"
                    >
                      -$1.0M
                    </button>
                    <button
                      onClick={() => setOfferedFee((prev) => prev + 500000)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-lg"
                    >
                      +$500k
                    </button>
                    <button
                      onClick={() => setOfferedFee((prev) => prev + 2000000)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-lg"
                    >
                      +$2.0M
                    </button>
                    <button
                      onClick={() => setOfferedFee(currentBoardDemand)}
                      className="px-2.5 py-1 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-500/30 text-xs font-bold text-emerald-400 rounded-lg ml-auto"
                    >
                      Match Full Asking Price (${(currentBoardDemand / 1000000).toFixed(2)}M)
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-3">
                    <span>Treasury Balance: ${(treasury / 1000000).toFixed(2)}M</span>
                    <span>Remaining Post-Transfer: ${((treasury - offeredFee) / 1000000).toFixed(2)}M</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveListing(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Walk Away from Table
                  </button>
                  <button
                    onClick={handleSubmitFeeOffer}
                    disabled={offeredFee > treasury}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                      offeredFee > treasury
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                    }`}
                  >
                    <span>Submit Buyout Offer to {activeListing.player.country}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Phase 2: Personal Terms & Contract Negotiation */}
            {negotiationPhase === 'player_terms' && (
              <div className="space-y-6">
                {/* Agent Dialogue */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3">
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 h-fit">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      Authorized Player Representative
                    </div>
                    <p className="text-xs text-slate-300 mt-1 italic leading-relaxed">
                      {agentDialogue}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400">
                      Baseline Expectation: ${activeListing.minimumSalaryDemand.toFixed(2)}M/yr · Minimum Grade {activeListing.player.grade}
                    </div>
                  </div>
                </div>

                {/* Contract Customization Options */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
                  {/* Base Salary */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-300">Annual Guaranteed Wage:</label>
                      <span className="text-sm font-black text-emerald-400">${offeredSalary.toFixed(2)}M / year</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="4.5"
                      step="0.05"
                      value={offeredSalary}
                      onChange={(e) => setOfferedSalary(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Contract Years & Signing Bonus in 2 cols */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Contract Duration:</label>
                      <select
                        value={offeredYears}
                        onChange={(e) => setOfferedYears(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value={1}>1 Year (Short term)</option>
                        <option value={2}>2 Years</option>
                        <option value={3}>3 Years (Standard)</option>
                        <option value={4}>4 Years (Long term)</option>
                        <option value={5}>5 Years (Superstar lock)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Upfront Signing Bonus:</label>
                      <select
                        value={offeredBonus}
                        onChange={(e) => setOfferedBonus(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value={0}>$0 (No upfront bonus)</option>
                        <option value={500000}>$500,000</option>
                        <option value={1000000}>$1,000,000</option>
                        <option value={2000000}>$2,000,000</option>
                        <option value={3500000}>$3,500,000 (Golden Handshake)</option>
                      </select>
                    </div>
                  </div>

                  {/* Role Pledge & Central Contract Grade */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Promised Squad Hierarchy:</label>
                      <select
                        value={offeredRole}
                        onChange={(e) => setOfferedRole(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value="Marquee Icon (Guaranteed Starter)">Marquee Icon (Guaranteed Starter)</option>
                        <option value="First XI Regular">First XI Regular</option>
                        <option value="Squad Rotation">Squad Rotation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Central Contract Tier:</label>
                      <select
                        value={offeredGrade}
                        onChange={(e) => setOfferedGrade(e.target.value as ContractGrade)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value="A+">Grade A+ (Elite Top Bracket)</option>
                        <option value="A">Grade A (Senior Core)</option>
                        <option value="B">Grade B (Regular Pool)</option>
                        <option value="C">Grade C (Development)</option>
                      </select>
                    </div>
                  </div>

                  {/* Acceptance Probability Meter */}
                  <div className="border-t border-slate-800/80 pt-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-400">Player Interest & Acceptance Likelihood:</span>
                      <span
                        className={
                          calculatePlayerInterest() >= 75
                            ? 'text-emerald-400'
                            : calculatePlayerInterest() >= 55
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }
                      >
                        {calculatePlayerInterest()}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          calculatePlayerInterest() >= 75
                            ? 'bg-emerald-500'
                            : calculatePlayerInterest() >= 55
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${calculatePlayerInterest()}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setNegotiationPhase('board_fee')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Back to Fee Negotiation
                  </button>
                  <button
                    onClick={handleSubmitPlayerTerms}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition"
                  >
                    <span>Offer Contract Package</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Phase 3: Completed / Contract Ratification */}
            {negotiationPhase === 'completed' && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white">Deal Sealed & Terms Accepted!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    {activeListing.player.name} has formally accepted your contract offer. Sanction the transfer payment to welcome them to the squad immediately.
                  </p>
                </div>

                {/* Final Cost Breakdown */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Board Buyout to {activeListing.player.country}:</span>
                    <span className="font-bold text-white">${(offeredFee / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Player Signing Bonus:</span>
                    <span className="font-bold text-white">${(offeredBonus / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm">
                    <span className="text-emerald-400">Total Immediate Treasury Outlay:</span>
                    <span className="text-emerald-400">${((offeredFee + offeredBonus) / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="text-[10px] text-slate-500 italic mt-1">
                    Annual wage of ${offeredSalary.toFixed(2)}M/yr for {offeredYears} years logged under central payroll.
                  </div>
                </div>

                <button
                  onClick={handleFinalizeTransfer}
                  className="w-full max-w-md py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-950/60 transition"
                >
                  Ratify Transfer & Register Player
                </button>
              </div>
            )}

            {/* Negotiation Failed Screen */}
            {negotiationPhase === 'failed' && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/40">
                  <XCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white">Negotiations Collapsed</h4>
                  <p className="text-xs text-rose-300 max-w-md mx-auto leading-relaxed italic">
                    {boardDialogue}
                  </p>
                </div>
                <button
                  onClick={() => setActiveListing(null)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Close Negotiation Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
