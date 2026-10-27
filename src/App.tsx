/**
 * Global Cricket Chairman Pro 2026
 * The Ultimate International Cricket Board Governance & Tactical Simulation Game.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  GameState, 
  BoardCountry, 
  Fixture, 
  Player, 
  SplitCaptains, 
  CateringSoundPackage, 
  PitchType,
  ContractGrade,
  MarketListing,
  CrisisEvent,
  CrisisOption
} from './types/game';
import { 
  COUNTRY_PROFILES, 
  INITIAL_SQUADS, 
  INITIAL_COACHES, 
  INITIAL_BROADCAST_DEALS, 
  INITIAL_SPONSORS, 
  INITIAL_UMPIRES, 
  INITIAL_RANKINGS, 
  INITIAL_FIXTURES, 
  INITIAL_LEDGER, 
  INITIAL_NEWS, 
  INITIAL_CRICKETX 
} from './data/initialData';
import { SQUADS_60 } from './data/squads60Data';
import { generateInitialMarket } from './data/marketData';
import { generateCrisis } from './data/crisisData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ExecutiveSetupModal } from './components/ExecutiveSetupModal';
import { LiveMatchCenterModal } from './components/LiveMatchCenterModal';
import { CrisisModal } from './components/CrisisModal';
import { WorldwideNewsTicker } from './components/WorldwideNewsTicker';

// Tabs
import { DashboardTab } from './components/tabs/DashboardTab';
import { CrisisManagementTab } from './components/tabs/CrisisManagementTab';
import { FacilitiesHeadquartersTab } from './components/tabs/FacilitiesHeadquartersTab';
import { MatchTacticsTab } from './components/tabs/MatchTacticsTab';
import { PlayerMarketTab } from './components/tabs/PlayerMarketTab';
import { SquadContractsTab } from './components/tabs/SquadContractsTab';
import { SplitCaptaincyTab } from './components/tabs/SplitCaptaincyTab';
import { CoachingTreesTab } from './components/tabs/CoachingTreesTab';
import { FinanceLedgerTab } from './components/tabs/FinanceLedgerTab';
import { PoachingNocTab } from './components/tabs/PoachingNocTab';
import { PitchCuratorTab } from './components/tabs/PitchCuratorTab';
import { BroadcastingTab } from './components/tabs/BroadcastingTab';
import { StadiumsTab } from './components/tabs/StadiumsTab';
import { SponsorsTab } from './components/tabs/SponsorsTab';
import { CateringDjTab } from './components/tabs/CateringDjTab';
import { UmpiresDrsTab } from './components/tabs/UmpiresDrsTab';
import { SelectionYouthTab } from './components/tabs/SelectionYouthTab';
import { VipCeremoniesTab } from './components/tabs/VipCeremoniesTab';
import { FixturesTab } from './components/tabs/FixturesTab';
import { RankingsTab } from './components/tabs/RankingsTab';
import { NewsWireTab } from './components/tabs/NewsWireTab';
import { CricketXTab } from './components/tabs/CricketXTab';

import { 
  setSoundMuted, 
  playClickSound, 
  playCashChime, 
  playVictoryFanfare 
} from './utils/sound';
import { calculateTacticsSynergy } from './utils/cricketEngine';

const SAVE_KEY = 'cricket_chairman_pro_2026_save_v1';
const MARKET_SAVE_KEY = 'cricket_chairman_pro_2026_market_v1';

export default function App() {
  const [showSetup, setShowSetup] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMatchFixture, setActiveMatchFixture] = useState<Fixture | null>(null);
  const [showMatchAlertModal, setShowMatchAlertModal] = useState(false);

  // Default initial state factory
  const createInitialState = (name = 'Owais', country: BoardCountry = 'India'): GameState => {
    const profile = COUNTRY_PROFILES[country];
    const squadList = SQUADS_60[country] || SQUADS_60['India'];

    return {
      chairmanName: name,
      country,
      boardName: profile.boardName,
      treasury: profile.initialTreasury,
      fanTrust: profile.initialTrust,
      boardStability: profile.initialStability,
      currentDate: new Date(2026, 9, 12).toISOString(),
      isSimulating: false,
      simSpeed: 1,
      activeTab: 'dashboard',
      squad: squadList,
      splitCaptains: {
        testCaptainId: squadList[0]?.id || 'ind-p1',
        testViceCaptainId: squadList[1]?.id || 'ind-p2',
        odiCaptainId: squadList[5]?.id || squadList[0]?.id || 'ind-p6',
        odiViceCaptainId: squadList[3]?.id || 'ind-p4',
        t20CaptainId: squadList[7]?.id || squadList[0]?.id || 'ind-p8',
        t20ViceCaptainId: squadList[4]?.id || 'ind-p5'
      },
      coaches: INITIAL_COACHES,
      ledger: INITIAL_LEDGER,
      pitchPreference: 'Sporting Balanced',
      matchTactics: {
        battingStrategy: 'Aggressive Batting',
        fieldPlacement: 'Defensive Field Placement',
        bowlingBias: 'Pace Bias',
        powerplayRisk: 'Measured',
        drsStance: 'Cautious / Critical Only'
      },
      stadiums: profile.homeStadiums,
      broadcastDeals: INITIAL_BROADCAST_DEALS,
      sponsors: INITIAL_SPONSORS,
      cateringSound: {
        cateringVendor: 'Haldiram Street Food Carnival',
        cateringTier: 'Popular Street Food Carnival',
        cateringPerMatchCost: 250000,
        fanSatisfactionBoost: 8,
        soundPackage: 'Desi Dhol & Brass Band',
        djCostPerMatch: 80000
      },
      umpires: INITIAL_UMPIRES,
      drsCalibrationLevel: 3,
      fixtures: INITIAL_FIXTURES,
      rankings: INITIAL_RANKINGS,
      news: INITIAL_NEWS,
      cricketx: INITIAL_CRICKETX,
      activeMatch: null,
      matchAlertFixture: null,
      activeCrisis: null,
      crisisHistory: [],
      soundEnabled: true,
      totalMatchesWon: 0,
      totalMatchesLost: 0,
      trophiesWon: []
    };
  };

  // State initialization with localStorage fallback
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (!parsed.matchTactics) {
            parsed.matchTactics = {
              battingStrategy: 'Aggressive Batting',
              fieldPlacement: 'Defensive Field Placement',
              bowlingBias: 'Pace Bias',
              powerplayRisk: 'Measured',
              drsStance: 'Cautious / Critical Only'
            };
          }
          if (!parsed.squad || parsed.squad.length < 60) {
            parsed.squad = SQUADS_60[parsed.country as BoardCountry] || SQUADS_60['India'];
          }
          if (parsed.activeCrisis === undefined) {
            parsed.activeCrisis = null;
          }
          if (!parsed.crisisHistory) {
            parsed.crisisHistory = [];
          }
          return parsed;
        } catch (e) {
          console.error('Failed to parse save game:', e);
        }
      }
    }
    return createInitialState();
  });

  // Global Player Market State
  const [marketListings, setMarketListings] = useState<MarketListing[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(MARKET_SAVE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved market listings:', e);
        }
      }
    }
    return generateInitialMarket(gameState.country);
  });

  // Persist market state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MARKET_SAVE_KEY, JSON.stringify(marketListings));
    } catch (e) {
      console.error('Error saving market:', e);
    }
  }, [marketListings]);

  // Check if setup modal is needed
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(SAVE_KEY)) {
      setShowSetup(true);
    }
  }, []);

  // Save game to localStorage
  const saveGame = useCallback(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }, [gameState]);

  // Periodic auto-save every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      saveGame();
    }, 30000);
    return () => clearInterval(timer);
  }, [saveGame]);

  // Start new career from modal
  const handleStartCareer = (name: string, country: BoardCountry) => {
    const newState = createInitialState(name, country);
    const newMarket = generateInitialMarket(country);
    setGameState(newState);
    setMarketListings(newMarket);
    setShowSetup(false);
    localStorage.setItem(SAVE_KEY, JSON.stringify(newState));
    localStorage.setItem(MARKET_SAVE_KEY, JSON.stringify(newMarket));
  };

  const handleResetGame = () => {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(MARKET_SAVE_KEY);
    setShowSetup(true);
  };

  // Toggle sim
  const handleToggleSim = () => {
    setGameState((prev) => ({ ...prev, isSimulating: !prev.isSimulating }));
  };

  // Change speed
  const handleChangeSpeed = (speed: number) => {
    setGameState((prev) => ({ ...prev, simSpeed: speed }));
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextVal = !gameState.soundEnabled;
    setSoundMuted(!nextVal);
    setGameState((prev) => ({ ...prev, soundEnabled: nextVal }));
  };

  // Main simulation calendar loop
  useEffect(() => {
    if (!gameState.isSimulating || activeMatchFixture || showMatchAlertModal) return;

    const intervalMs = Math.max(300, 1500 / gameState.simSpeed);
    const simTimer = setInterval(() => {
      setGameState((prev) => {
        const currentDate = new Date(prev.currentDate);
        currentDate.setDate(currentDate.getDate() + 1);

        // Check if any fixture falls on or before this new date
        const matchFixture = prev.fixtures.find((f) => {
          if (f.isCompleted) return false;
          const fDate = new Date(f.scheduledDate);
          return (
            currentDate.getFullYear() === fDate.getFullYear() &&
            currentDate.getMonth() === fDate.getMonth() &&
            currentDate.getDate() === fDate.getDate()
          );
        });

        if (matchFixture) {
          // Pause simulation and alert!
          setShowMatchAlertModal(true);
          return {
            ...prev,
            currentDate: currentDate.toISOString(),
            isSimulating: false,
            matchAlertFixture: matchFixture
          };
        }

        // Random crisis check during live career simulation (~3% daily chance)
        if (!prev.activeCrisis && Math.random() < 0.03) {
          const crisis = generateCrisis(prev.country, prev.chairmanName, prev.squad);
          return {
            ...prev,
            currentDate: currentDate.toISOString(),
            isSimulating: false,
            activeCrisis: crisis
          };
        }

        // Slight organic daily revenue & expense simulation
        let treasuryDelta = 0;
        // On 1st of month, credit broadcast and debit contracts
        if (currentDate.getDate() === 1) {
          treasuryDelta += 12000000; // Monthly broadcast payout
          treasuryDelta -= 3000000; // Player salaries
        }

        return {
          ...prev,
          currentDate: currentDate.toISOString(),
          treasury: prev.treasury + treasuryDelta
        };
      });
    }, intervalMs);

    return () => clearInterval(simTimer);
  }, [gameState.isSimulating, gameState.simSpeed, activeMatchFixture, showMatchAlertModal, gameState.activeCrisis]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleSim();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleSound();
      } else if (e.key === 'Escape') {
        if (showMatchAlertModal) setShowMatchAlertModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMatchAlertModal, gameState.soundEnabled]);

  // Match management
  const handleOpenMatchModal = (fixture?: Fixture) => {
    const targetFix = fixture || gameState.matchAlertFixture || gameState.fixtures.find(f => !f.isCompleted) || gameState.fixtures[0];
    setShowMatchAlertModal(false);
    setActiveMatchFixture(targetFix);
  };

  const handleSimulateInstantly = () => {
    const targetFix = gameState.matchAlertFixture || gameState.fixtures.find(f => !f.isCompleted) || gameState.fixtures[0];
    setShowMatchAlertModal(false);

    playCashChime();
    const synergy = calculateTacticsSynergy(gameState.matchTactics, targetFix.opponent);
    const winProbability = Math.min(0.90, Math.max(0.20, 0.65 + synergy.synergyScore * 0.006));
    const won = Math.random() < winProbability;
    const margin = won ? 'won by 5 wickets' : 'lost by 14 runs';
    const tacticalEdgeText = synergy.synergyScore !== 0 ? ` (${synergy.synergyScore > 0 ? '+' : ''}${synergy.synergyScore}% tactical synergy impact)` : '';
    const summary = `${gameState.country} ${margin} against ${targetFix.opponent} at ${targetFix.venue}${tacticalEdgeText}.`;

    handleMatchComplete(summary, won, won ? 4500000 : 1500000, won ? 5 : -2, targetFix);
  };

  const handleMatchComplete = (
    resultText: string,
    won: boolean,
    treasuryGain: number,
    trustGain: number,
    fixtureOverride?: Fixture
  ) => {
    const activeFix = fixtureOverride || activeMatchFixture;
    if (!activeFix) return;

    setGameState((prev) => {
      // Update fixture status
      const updatedFixtures = prev.fixtures.map((f) => {
        if (f.id === activeFix.id) {
          return {
            ...f,
            isCompleted: true,
            resultSummary: resultText
          };
        }
        return f;
      });

      // Update Rankings points
      const updatedRankings = prev.rankings.map((r) => {
        if (r.country === prev.country) {
          return {
            ...r,
            points: r.points + (won ? 40 : 10),
            t20Rating: won ? r.t20Rating + 1 : Math.max(90, r.t20Rating - 1)
          };
        }
        return r;
      });

      // Generate Breaking News
      const newNews = [
        {
          id: `news-${Date.now()}`,
          title: `${prev.country} ${won ? 'Triumphs in Thrilling Fashion' : 'Falls Short'} Against ${activeFix.opponent}`,
          body: resultText + ` Chairman ${prev.chairmanName} praised the team effort and venue turnout.`,
          category: 'Match Day' as const,
          timestamp: 'Just now',
          impactTrust: trustGain
        },
        ...prev.news
      ];

      // Generate CricketX Tweets
      const newTweet = {
        id: `cx-${Date.now()}`,
        handle: won ? '@PureCricketFan' : '@CricketCritic',
        displayName: won ? 'National Cricket Pride' : 'Tactics Breakdown',
        avatarBg: won ? '#10b981' : '#ef4444',
        content: won
          ? `WHAT A WIN! ${resultText} Chairman ${prev.chairmanName}'s split captaincy and coaching upgrades paid off big time! 🏆🏏`
          : `Tough defeat today. We needed better shot selection in the middle overs. Back to the drawing board for Chairman ${prev.chairmanName}.`,
        timestamp: 'Just now',
        likes: won ? 6540 : 3410,
        retweets: won ? 1220 : 640,
        sentiment: won ? ('positive' as const) : ('negative' as const)
      };

      // Trophies if all fixtures won
      const newTrophies = [...prev.trophiesWon];
      if (won && (prev.totalMatchesWon + 1) % 3 === 0) {
        newTrophies.push(`${activeFix.seriesTitle} Champions 2026`);
      }

      return {
        ...prev,
        treasury: prev.treasury + treasuryGain,
        fanTrust: Math.min(100, Math.max(20, prev.fanTrust + trustGain)),
        totalMatchesWon: prev.totalMatchesWon + (won ? 1 : 0),
        totalMatchesLost: prev.totalMatchesLost + (won ? 0 : 1),
        fixtures: updatedFixtures,
        rankings: updatedRankings,
        news: newNews,
        cricketx: [newTweet, ...prev.cricketx],
        trophiesWon: newTrophies,
        matchAlertFixture: null
      };
    });

    setActiveMatchFixture(null);
  };

  // Handle player updates
  const handleUpdateSquad = (updatedSquad: Player[], treasuryDelta: number = 0) => {
    setGameState((prev) => ({
      ...prev,
      squad: updatedSquad,
      treasury: prev.treasury + treasuryDelta
    }));
  };

  // Handle coach upgrade
  const handleUpgradeCoach = (coachId: string, cost: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - cost,
      boardStability: Math.min(100, prev.boardStability + 2),
      coaches: prev.coaches.map((c) => (c.id === coachId ? { ...c, level: c.level + 1 } : c))
    }));
  };

  // Handle NOC Decision
  const handleNocDecision = (playerId: string, decision: 'approved' | 'denied' | 'conditional', feeGain: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury + feeGain,
      fanTrust: decision === 'approved' ? Math.max(30, prev.fanTrust - 3) : Math.min(100, prev.fanTrust + 2),
      squad: prev.squad.map((p) => {
        if (p.id === playerId) {
          return {
            ...p,
            requestedNoc: false,
            fitness: decision === 'approved' ? Math.max(50, p.fitness - 10) : decision === 'conditional' ? Math.max(60, p.fitness - 5) : p.fitness,
            morale: decision === 'denied' ? 'Frustrated' : 'Ecstatic'
          };
        }
        return p;
      })
    }));
  };

  // Handle pitch preference change
  const handleChangePitch = (newPitch: PitchType) => {
    setGameState((prev) => ({ ...prev, pitchPreference: newPitch }));
  };

  // Handle media rights
  const handleSignNewDeal = (network: string, annualVal: number, years: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury + 25000000, // Sign-on advance
      boardStability: Math.min(100, prev.boardStability + 5),
      broadcastDeals: [
        {
          id: `deal-${Date.now()}`,
          network,
          format: 'Global TV + OTT',
          annualValue: annualVal,
          yearsRemaining: years,
          techEquipped: {
            ultraMotion4K: true,
            spiderCam: true,
            hawkEyePrecision: true,
            droneAerials: true
          }
        },
        ...prev.broadcastDeals
      ]
    }));
  };

  const handleUpgradeTech = (dealId: string, techKey: keyof GameState['broadcastDeals'][0]['techEquipped'], cost: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - cost,
      fanTrust: Math.min(100, prev.fanTrust + 3),
      broadcastDeals: prev.broadcastDeals.map((d) => {
        if (d.id === dealId) {
          return {
            ...d,
            techEquipped: { ...d.techEquipped, [techKey]: true }
          };
        }
        return d;
      })
    }));
  };

  // Handle stadium upgrade
  const handleUpgradeStadium = (stadiumId: string, type: 'capacity' | 'drainage' | 'boxes', cost: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - cost,
      fanTrust: Math.min(100, prev.fanTrust + 4),
      stadiums: prev.stadiums.map((s) => {
        if (s.id === stadiumId) {
          return {
            ...s,
            capacity: type === 'capacity' ? s.capacity + 8000 : s.capacity,
            drainageSystem: type === 'drainage' ? 'SubAir Vacuum' : s.drainageSystem,
            corporateBoxes: type === 'boxes' ? s.corporateBoxes + 15 : s.corporateBoxes
          };
        }
        return s;
      })
    }));
  };

  // Handle sponsor renewal
  const handleRenewSponsor = (sponsorId: string) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury + 15000000,
      fanTrust: Math.min(100, prev.fanTrust + 2),
      sponsors: prev.sponsors.map((sp) => {
        if (sp.id === sponsorId) {
          return { ...sp, yearsLeft: sp.yearsLeft + 2 };
        }
        return sp;
      })
    }));
  };

  // Handle catering & sound
  const handleUpdatePackage = (updated: Partial<CateringSoundPackage>) => {
    setGameState((prev) => ({
      ...prev,
      fanTrust: Math.min(100, prev.fanTrust + 3),
      cateringSound: { ...prev.cateringSound, ...updated }
    }));
  };

  // Handle umpires & DRS
  const handleUpgradeDrs = (cost: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - cost,
      drsCalibrationLevel: Math.min(5, prev.drsCalibrationLevel + 1)
    }));
  };

  const handleTrainUmpires = (cost: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - cost,
      umpires: prev.umpires.map((u) => ({
        ...u,
        drsAccuracy: Math.min(99.6, u.drsAccuracy + 0.4)
      }))
    }));
  };

  // Handle youth promotion
  const handlePromoteWonderkid = (wonderkid: Player) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - 250000,
      boardStability: Math.min(100, prev.boardStability + 2),
      squad: [wonderkid, ...prev.squad]
    }));
  };

  // Handle VIP invitation
  const handleInviteGuest = (cost: number, trustGain: number, guestName: string) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury - cost,
      fanTrust: Math.min(100, prev.fanTrust + trustGain),
      news: [
        {
          id: `news-${Date.now()}`,
          title: `${guestName} Confirmed for Upcoming Match Opening Ceremony`,
          body: `Global television syndicate viewership projections spiked as state protocols and protocol convoys prepare for the flagship encounter.`,
          category: 'Board Executive' as const,
          timestamp: 'Just now',
          impactTrust: trustGain
        },
        ...prev.news
      ]
    }));
  };

  // Handle CricketX user tweet
  const handlePostTweet = (content: string) => {
    playCashChime();
    const myPost = {
      id: `cx-${Date.now()}`,
      handle: `@Chairman_${gameState.chairmanName.replace(/\s+/g, '')}`,
      displayName: `${gameState.chairmanName} (Chairman)`,
      avatarBg: '#0284c7',
      content,
      timestamp: 'Just now',
      likes: 12400,
      retweets: 3890,
      sentiment: 'positive' as const
    };

    setGameState((prev) => ({
      ...prev,
      fanTrust: Math.min(100, prev.fanTrust + 2),
      cricketx: [myPost, ...prev.cricketx]
    }));
  };

  // Handle scouting an international player
  const handleScoutPlayer = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      treasury: Math.max(0, prev.treasury - 500000),
      ledger: [
        {
          id: `ledger-scout-${Date.now()}`,
          date: new Date(prev.currentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          description: `International Scout Dossier: Verification Mission`,
          amount: -500000,
          category: 'Scouting',
          status: 'Cleared'
        },
        ...prev.ledger
      ]
    }));

    setMarketListings((prev) =>
      prev.map((item) => {
        if (item.player.id === playerId) {
          return { ...item, scouted: true };
        }
        return item;
      })
    );
  };

  // Handle completing an international player transfer
  const handleCompleteTransfer = (
    player: Player,
    transferFee: number,
    salary: number,
    contractYears: number,
    grade: ContractGrade,
    rolePledge: string,
    signingBonus: number
  ) => {
    const totalOutlay = transferFee + signingBonus;

    const transferredPlayer: Player = {
      ...player,
      salary,
      contractYears,
      grade,
      morale: 'Ecstatic',
      form: Math.min(100, player.form + 5)
    };

    const newsArticle = {
      id: `news-transfer-${Date.now()}`,
      title: `BLOCKBUSTER TRANSFER: ${player.name} Signs with ${gameState.boardName}!`,
      body: `In an unprecedented international boardroom coup, Chairman ${gameState.chairmanName} has finalized the acquisition of ${player.name} from ${player.country} for an international transfer buyout of $${(transferFee / 1000000).toFixed(2)}M. The player has been registered with immediate effect under a Grade ${grade} contract.`,
      category: 'Squad & Selection' as const,
      timestamp: 'Just now',
      impactTrust: 8
    };

    const cricketxPost = {
      id: `cx-transfer-${Date.now()}`,
      handle: `@CricketInsiderHQ`,
      displayName: 'Global Cricket Insider 🏏',
      avatarBg: '#10b981',
      content: `🚨 OFFICIAL BREAKING: Here we go! ${player.name} completes historic move to ${gameState.boardName} for $${(transferFee / 1000000).toFixed(2)}M buyout fee! Chairman ${gameState.chairmanName} flexing financial firepower in the 2026 window! #CricketTransfers #${gameState.country}`,
      timestamp: '1m ago',
      likes: 38200,
      retweets: 11400,
      sentiment: 'positive' as const
    };

    const ledgerEntry = {
      id: `ledger-transfer-${Date.now()}`,
      date: new Date(gameState.currentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: `Transfer Buyout & Signing Bonus: ${player.name} (${player.country})`,
      amount: -totalOutlay,
      category: 'Player Transfers' as const,
      status: 'Cleared' as const
    };

    setGameState((prev) => ({
      ...prev,
      treasury: Math.max(0, prev.treasury - totalOutlay),
      fanTrust: Math.min(100, prev.fanTrust + 8),
      boardStability: Math.min(100, prev.boardStability + 5),
      squad: [transferredPlayer, ...prev.squad],
      news: [newsArticle, ...prev.news],
      cricketx: [cricketxPost, ...prev.cricketx],
      ledger: [ledgerEntry, ...prev.ledger]
    }));

    // Remove player from market listings
    setMarketListings((prev) => prev.filter((item) => item.player.id !== player.id));
  };

  // Crisis resolution handler
  const handleResolveCrisis = (crisis: CrisisEvent, option: CrisisOption) => {
    const resolvedCrisis: CrisisEvent = {
      ...crisis,
      resolved: true,
      chosenOptionId: option.id
    };

    const ledgerItem = option.cost > 0 ? {
      id: `ledger-crisis-${Date.now()}`,
      date: new Date(gameState.currentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: `Emergency Crisis Directive: ${crisis.title} (${option.label})`,
      amount: -option.cost,
      category: 'Fines & Taxes' as const,
      status: 'Cleared' as const
    } : null;

    const newsDispatch = {
      id: `news-crisis-${Date.now()}`,
      title: `CRISIS UPDATE: ${crisis.title}`,
      body: `Chairman ${gameState.chairmanName} has officially enacted resolution directive: "${option.label}". ${option.verdictText}`,
      category: 'Board Executive' as const,
      timestamp: 'Just now',
      impactTrust: option.fanTrustImpact
    };

    const cxSentiment = option.fanTrustImpact >= 0 ? 'positive' as const : 'negative' as const;
    const cricketxPost = {
      id: `cx-crisis-${Date.now()}`,
      handle: `@CricketInsiderHQ`,
      displayName: 'Global Cricket Insider 🏏',
      avatarBg: option.fanTrustImpact >= 0 ? '#10b981' : '#f43f5e',
      content: `BREAKING: Chairman ${gameState.chairmanName} ratifies decisive directive on the ${crisis.category} situation: "${option.label}". ${option.verdictText} #CricketGovernance #${gameState.country}`,
      timestamp: 'Just now',
      likes: Math.floor(18000 + Math.random() * 20000),
      retweets: Math.floor(4000 + Math.random() * 6000),
      sentiment: cxSentiment
    };

    setGameState((prev) => ({
      ...prev,
      treasury: Math.max(0, prev.treasury - option.cost),
      fanTrust: Math.max(5, Math.min(100, prev.fanTrust + option.fanTrustImpact)),
      boardStability: Math.max(5, Math.min(100, prev.boardStability + option.boardStabilityImpact)),
      squad: prev.squad.map((p) => ({
        ...p,
        morale: option.teamMoraleImpact > 5 ? 'Ecstatic' : option.teamMoraleImpact < -10 ? 'Frustrated' : p.morale
      })),
      ledger: ledgerItem ? [ledgerItem, ...prev.ledger] : prev.ledger,
      news: [newsDispatch, ...prev.news],
      cricketx: [cricketxPost, ...prev.cricketx],
      activeCrisis: null,
      crisisHistory: [resolvedCrisis, ...prev.crisisHistory]
    }));
  };

  const handleTriggerRandomCrisis = () => {
    const crisis = generateCrisis(gameState.country, gameState.chairmanName, gameState.squad);
    setGameState((prev) => ({
      ...prev,
      activeCrisis: crisis,
      isSimulating: false
    }));
  };

  // Facilities Handlers
  const handleBoostSquadFitness = (cost: number, fitnessGain: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: Math.max(0, prev.treasury - cost),
      squad: prev.squad.map((p) => ({
        ...p,
        fitness: Math.min(100, p.fitness + fitnessGain)
      }))
    }));
  };

  const handleUpgradeFacilityTech = (cost: number, techName: string) => {
    setGameState((prev) => ({
      ...prev,
      treasury: Math.max(0, prev.treasury - cost),
      boardStability: Math.min(100, prev.boardStability + 4),
      fanTrust: Math.min(100, prev.fanTrust + 3)
    }));
  };

  const handleCollectMerchRevenue = (revenue: number) => {
    setGameState((prev) => ({
      ...prev,
      treasury: prev.treasury + revenue,
      ledger: [
        {
          id: `ledger-merch-${Date.now()}`,
          date: new Date(prev.currentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          description: `Official Retail & Corporate Suite Amenities Payout`,
          amount: revenue,
          category: 'Sponsorship' as const,
          status: 'Cleared' as const
        },
        ...prev.ledger
      ]
    }));
  };

  const handleChairmanMeetingResponse = (attitude: string, trustDelta: number, stabilityDelta: number) => {
    setGameState((prev) => ({
      ...prev,
      fanTrust: Math.max(5, Math.min(100, prev.fanTrust + trustDelta)),
      boardStability: Math.max(5, Math.min(100, prev.boardStability + stabilityDelta))
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Top Header */}
      <Header
        gameState={gameState}
        onToggleSim={handleToggleSim}
        onChangeSpeed={handleChangeSpeed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleSound={handleToggleSound}
        onOpenMatchModal={() => handleOpenMatchModal()}
        onQuickSave={saveGame}
        onResetGame={handleResetGame}
      />

      {/* Worldwide 28K Broadcast English News Ticker Bar */}
      <WorldwideNewsTicker
        country={gameState.country}
        chairmanName={gameState.chairmanName}
      />

      <div className="flex flex-1 h-[calc(100vh-98px)] relative overflow-hidden">
        {/* Collapsible Sidebar Navigation */}
        <Sidebar
          collapsed={sidebarCollapsed}
          activeTab={gameState.activeTab}
          onSelectTab={(tabId) => setGameState((prev) => ({ ...prev, activeTab: tabId }))}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          {gameState.activeTab === 'dashboard' && (
            <DashboardTab
              gameState={gameState}
              onPlayNextMatch={() => handleOpenMatchModal()}
              onSimulateInstantly={handleSimulateInstantly}
              onNavigateTab={(tabId) => setGameState((prev) => ({ ...prev, activeTab: tabId }))}
            />
          )}

          {gameState.activeTab === 'crisis' && (
            <CrisisManagementTab
              activeCrisis={gameState.activeCrisis}
              crisisHistory={gameState.crisisHistory}
              treasury={gameState.treasury}
              fanTrust={gameState.fanTrust}
              boardStability={gameState.boardStability}
              onOpenActiveCrisis={() => {}}
              onTriggerRandomCrisis={handleTriggerRandomCrisis}
            />
          )}

          {gameState.activeTab === 'facilities' && (
            <FacilitiesHeadquartersTab
              country={gameState.country}
              boardName={gameState.boardName}
              chairmanName={gameState.chairmanName}
              treasury={gameState.treasury}
              squad={gameState.squad}
              onBoostSquadFitness={handleBoostSquadFitness}
              onUpgradeFacilityTech={handleUpgradeFacilityTech}
              onCollectMerchRevenue={handleCollectMerchRevenue}
              onChairmanMeetingResponse={handleChairmanMeetingResponse}
            />
          )}

          {gameState.activeTab === 'tactics' && (
            <MatchTacticsTab
              tactics={gameState.matchTactics}
              nextFixture={gameState.fixtures.find(f => !f.isCompleted) || gameState.fixtures[0]}
              ourCountry={gameState.country}
              headCoach={gameState.coaches.find(c => c.title === 'Head Coach') || gameState.coaches[0]}
              onUpdateTactics={(newTactics) => setGameState((prev) => ({ ...prev, matchTactics: newTactics }))}
            />
          )}

          {gameState.activeTab === 'market' && (
            <PlayerMarketTab
              marketListings={marketListings}
              treasury={gameState.treasury}
              userCountry={gameState.country}
              boardName={gameState.boardName}
              onScoutPlayer={handleScoutPlayer}
              onCompleteTransfer={handleCompleteTransfer}
            />
          )}

          {gameState.activeTab === 'squad' && (
            <SquadContractsTab
              squad={gameState.squad}
              treasury={gameState.treasury}
              onUpdateSquad={handleUpdateSquad}
            />
          )}

          {gameState.activeTab === 'captaincy' && (
            <SplitCaptaincyTab
              squad={gameState.squad}
              splitCaptains={gameState.splitCaptains}
              onUpdateCaptains={(updated) => setGameState((prev) => ({ ...prev, splitCaptains: updated }))}
            />
          )}

          {gameState.activeTab === 'coaching' && (
            <CoachingTreesTab
              coaches={gameState.coaches}
              treasury={gameState.treasury}
              onUpgradeCoach={handleUpgradeCoach}
            />
          )}

          {gameState.activeTab === 'finance' && (
            <FinanceLedgerTab
              treasury={gameState.treasury}
              ledger={gameState.ledger}
            />
          )}

          {gameState.activeTab === 'poaching' && (
            <PoachingNocTab
              squad={gameState.squad}
              onNocDecision={handleNocDecision}
            />
          )}

          {gameState.activeTab === 'curator' && (
            <PitchCuratorTab
              pitchPreference={gameState.pitchPreference}
              onChangePitch={handleChangePitch}
            />
          )}

          {gameState.activeTab === 'broadcast' && (
            <BroadcastingTab
              deals={gameState.broadcastDeals}
              treasury={gameState.treasury}
              onSignNewDeal={handleSignNewDeal}
              onUpgradeTech={handleUpgradeTech}
            />
          )}

          {gameState.activeTab === 'stadiums' && (
            <StadiumsTab
              stadiums={gameState.stadiums}
              treasury={gameState.treasury}
              onUpgradeStadium={handleUpgradeStadium}
            />
          )}

          {gameState.activeTab === 'sponsors' && (
            <SponsorsTab
              sponsors={gameState.sponsors}
              onRenewSponsor={handleRenewSponsor}
            />
          )}

          {gameState.activeTab === 'catering' && (
            <CateringDjTab
              currentPackage={gameState.cateringSound}
              onUpdatePackage={handleUpdatePackage}
            />
          )}

          {gameState.activeTab === 'umpires' && (
            <UmpiresDrsTab
              umpires={gameState.umpires}
              drsLevel={gameState.drsCalibrationLevel}
              treasury={gameState.treasury}
              onUpgradeDrs={handleUpgradeDrs}
              onTrainUmpires={handleTrainUmpires}
            />
          )}

          {gameState.activeTab === 'selection' && (
            <SelectionYouthTab
              squad={gameState.squad}
              treasury={gameState.treasury}
              onPromoteWonderkid={handlePromoteWonderkid}
            />
          )}

          {gameState.activeTab === 'vip' && (
            <VipCeremoniesTab
              treasury={gameState.treasury}
              onInviteGuest={handleInviteGuest}
            />
          )}

          {gameState.activeTab === 'fixtures' && (
            <FixturesTab
              fixtures={gameState.fixtures}
              gameState={gameState}
              onPlayFixture={(fix) => handleOpenMatchModal(fix)}
            />
          )}

          {gameState.activeTab === 'rankings' && (
            <RankingsTab
              rankings={gameState.rankings}
              ourCountry={gameState.country}
            />
          )}

          {gameState.activeTab === 'news' && (
            <NewsWireTab news={gameState.news} />
          )}

          {gameState.activeTab === 'cricketx' && (
            <CricketXTab
              posts={gameState.cricketx}
              chairmanName={gameState.chairmanName}
              country={gameState.country}
              onPostTweet={handlePostTweet}
            />
          )}
        </main>
      </div>

      {/* Setup / Onboarding Modal */}
      {showSetup && <ExecutiveSetupModal onStartCareer={handleStartCareer} />}

      {/* Match Day Alert Notification Modal */}
      {showMatchAlertModal && gameState.matchAlertFixture && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
              <span>⚡ Match Day Alert</span>
            </div>
            <h3 className="text-xl font-black text-white">
              {gameState.country} vs {gameState.matchAlertFixture.opponent}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your squad is scheduled to play today at {gameState.matchAlertFixture.venue}. The pitch has been prepared to your ordered {gameState.pitchPreference} specification.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleOpenMatchModal(gameState.matchAlertFixture!)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Enter Live Match Center 🏏</span>
              </button>
              <button
                onClick={handleSimulateInstantly}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-3 rounded-xl text-xs border border-slate-700 transition-colors"
              >
                Simulate Instantly
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Tactical Match Simulation Modal */}
      {activeMatchFixture && (
        <LiveMatchCenterModal
          fixture={activeMatchFixture}
          gameState={gameState}
          onClose={() => setActiveMatchFixture(null)}
          onMatchComplete={(resText, won, treasGain, trustGain) =>
            handleMatchComplete(resText, won, treasGain, trustGain)
          }
        />
      )}

      {/* Emergency Crisis Resolution Summit Modal */}
      {gameState.activeCrisis && (
        <CrisisModal
          crisis={gameState.activeCrisis}
          treasury={gameState.treasury}
          boardName={gameState.boardName}
          onResolveCrisis={handleResolveCrisis}
        />
      )}
    </div>
  );
}
