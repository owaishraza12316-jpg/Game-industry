export type BoardCountry = 
  | 'India' 
  | 'Australia' 
  | 'England' 
  | 'Pakistan' 
  | 'South Africa' 
  | 'New Zealand'
  | 'West Indies';

export type PlayerRole = 
  | 'Opening Batter' 
  | 'Top-Order Batter' 
  | 'Middle-Order Anchor' 
  | 'Power Finisher' 
  | 'Wicketkeeper Batter' 
  | 'Pace All-Rounder' 
  | 'Spin All-Rounder' 
  | 'Express Pacer' 
  | 'Swing Specialist' 
  | 'Mystery Spinner' 
  | 'Finger Spinner';

export type ContractGrade = 'A+' | 'A' | 'B' | 'C' | 'Domestic / Youth';

export interface Player {
  id: string;
  name: string;
  country: BoardCountry;
  role: PlayerRole;
  age: number;
  rating: number; // 60-99
  battingRating: number;
  bowlingRating: number;
  fieldingRating: number;
  leadership: number;
  grade: ContractGrade;
  salary: number; // in Millions USD
  contractYears: number;
  form: number; // 0-100
  fitness: number; // 0-100
  morale: 'Ecstatic' | 'Confident' | 'Neutral' | 'Frustrated';
  matches: number;
  runs: number;
  battingAvg: number;
  strikeRate: number;
  centuries: number;
  fifties: number;
  wickets: number;
  bowlingAvg: number;
  economy: number;
  bestBowling: string;
  isInjured?: boolean;
  injuryDurationDays?: number;
  requestedNoc?: boolean;
  nocFranchise?: string;
  nocFeeOffer?: number;
  agentName?: string;
  agentAgency?: string;
  attitude?: 'Model Professional' | 'Fiery Rebel' | 'Charismatic Icon' | 'Demanding Diva' | 'Quiet Grinder';
}

export interface SplitCaptains {
  testCaptainId: string;
  testViceCaptainId: string;
  odiCaptainId: string;
  odiViceCaptainId: string;
  t20CaptainId: string;
  t20ViceCaptainId: string;
}

export interface CoachStaff {
  id: string;
  title: string;
  name: string;
  specialty: string;
  level: number; // 1 to 5
  upgradeCost: number;
  description: string;
  effectDescription: string;
}

export interface LedgerItem {
  id: string;
  date: string;
  description: string;
  category: 'Broadcasting' | 'Sponsorship' | 'Ticketing' | 'ICC Distribution' | 'Player Retainers' | 'Stadium Maintenance' | 'Travel & Logistics' | 'Staff Payroll' | 'Fines & Taxes' | 'Player Transfers' | 'Scouting';
  amount: number; // positive for revenue, negative for expense
  status: 'Cleared' | 'Pending';
}

export type PitchType = 'Green Top' | 'Dustbowl' | 'Flat Batting Paradise' | 'Sporting Balanced' | 'Dry Cracker' | 'Overcast Swing';
export type WeatherType = 'Bright & Sunny' | 'Humid & Overcast' | 'Evening Dew Factor' | 'Windy & Crisp';

export interface Stadium {
  id: string;
  name: string;
  city: string;
  capacity: number;
  conditionGrade: 'A+' | 'A' | 'B' | 'Renovating';
  corporateBoxes: number;
  floodlightsLevel: string;
  drainageSystem: 'SubAir Vacuum' | 'Hybrid Turf' | 'Standard French Drain';
  upgradeCost: number;
}

export interface BroadcastDeal {
  id: string;
  network: string;
  format: 'Global TV + OTT' | 'Linear Cable Only' | 'Digital Streaming Package';
  annualValue: number;
  yearsRemaining: number;
  techEquipped: {
    ultraMotion4K: boolean;
    spiderCam: boolean;
    hawkEyePrecision: boolean;
    droneAerials: boolean;
  };
}

export interface Sponsor {
  id: string;
  tier: 'Title Sponsor' | 'Jersey Chest Partner' | 'Lead Arm Sponsor' | 'Official Beverage Partner' | 'Stadium Tech Partner';
  brand: string;
  annualValue: number;
  yearsLeft: number;
  reputationBonus: number;
  logoColor: string;
}

export interface CateringSoundPackage {
  cateringVendor: string;
  cateringTier: 'Gourmet Luxury' | 'Popular Street Food Carnival' | 'Standard Franchise Kiosks';
  cateringPerMatchCost: number;
  fanSatisfactionBoost: number;
  soundPackage: 'Desi Dhol & Brass Band' | 'EDM Arena Hype Setup' | 'Traditional English Brass' | 'Calypso Steelpan & Horns' | 'Aussie Stadium Rock';
  djCostPerMatch: number;
}

export interface Umpire {
  id: string;
  name: string;
  panel: 'ICC Elite Panel' | 'International Panel' | 'Domestic Premier Panel';
  drsAccuracy: number; // percentage e.g. 97.8%
  experienceMatches: number;
  calmnessRating: number;
}

export interface Fixture {
  id: string;
  opponent: BoardCountry;
  format: 'T20I' | 'ODI' | 'Test Match';
  seriesTitle: string;
  venue: string;
  city: string;
  scheduledDate: string; // ISO format or string
  dateObj: Date;
  isCompleted: boolean;
  resultSummary?: string;
  ourScore?: string;
  oppScore?: string;
  marginWonOrLost?: string;
}

export interface RankingEntry {
  rank: number;
  country: BoardCountry;
  testRating: number;
  odiRating: number;
  t20Rating: number;
  points: number;
}

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  category: 'Board Executive' | 'Match Day' | 'Franchise & NOC' | 'Squad & Selection' | 'Financial & Media';
  timestamp: string;
  impactTrust?: number;
}

export interface CricketXPost {
  id: string;
  handle: string;
  displayName: string;
  avatarBg: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface BallEvent {
  ballIndex: number;
  overNum: number;
  ballInOver: number;
  bowlerName: string;
  batterName: string;
  runs: number;
  isWicket: boolean;
  wicketType?: string;
  dismissedPlayer?: string;
  isBoundaryFour: boolean;
  isBoundarySix: boolean;
  commentary: string;
  radarX: number; // 0 to 100 on visual pitch
  radarY: number; // 0 to 100 on visual pitch
  shotDirectionDeg: number; // 0 - 360 for wagon wheel
  speedKph: number;
  drsReviewed?: boolean;
  drsResult?: 'OUT_UPHELD' | 'NOT_OUT_OVERTURNED' | 'NOT_OUT_UPHELD' | 'OUT_OVERTURNED';
}

export interface MatchScorecard {
  ourTeamName: string;
  oppTeamName: string;
  format: string;
  venue: string;
  pitch: PitchType;
  weather: WeatherType;
  ourInnings: {
    runs: number;
    wickets: number;
    overs: number;
    batting: {
      name: string;
      runs: number;
      balls: number;
      fours: number;
      sixes: number;
      isOut: boolean;
      dismissalText: string;
    }[];
    bowling: {
      name: string;
      overs: number;
      maidens: number;
      runs: number;
      wickets: number;
      economy: number;
    }[];
  };
  oppInnings: {
    runs: number;
    wickets: number;
    overs: number;
    batting: {
      name: string;
      runs: number;
      balls: number;
      fours: number;
      sixes: number;
      isOut: boolean;
      dismissalText: string;
    }[];
    bowling: {
      name: string;
      overs: number;
      maidens: number;
      runs: number;
      wickets: number;
      economy: number;
    }[];
  };
  isFirstInningsComplete: boolean;
  isMatchFinished: boolean;
  matchResultText: string;
  targetRuns?: number;
  manOfTheMatch?: string;
}

export type BattingStrategy = 
  | 'Aggressive Batting' 
  | 'Controlled Aggression' 
  | 'Anchor & Accumulate' 
  | 'Counter-Punching';

export type FieldPlacementStrategy = 
  | 'Attacking Slips & Ring' 
  | 'Defensive Field Placement' 
  | 'Deep Boundary Sweeper Lock' 
  | 'Spin Trap & Choke';

export type BowlingBiasStrategy = 
  | 'Pace Bias' 
  | 'Spin Bias' 
  | 'Balanced Rotation' 
  | 'Death Yorker Priority';

export interface MatchTacticsPreset {
  battingStrategy: BattingStrategy;
  fieldPlacement: FieldPlacementStrategy;
  bowlingBias: BowlingBiasStrategy;
  powerplayRisk: 'High Risk' | 'Measured' | 'Conservative';
  drsStance: 'Aggressive Appeals' | 'Cautious / Critical Only';
}

export interface GameState {
  chairmanName: string;
  country: BoardCountry;
  boardName: string;
  treasury: number; // in USD
  fanTrust: number; // 0-100
  boardStability: number; // 0-100
  currentDate: string; // ISO string
  isSimulating: boolean;
  simSpeed: number; // 1, 2, 5, 10
  activeTab: string;
  squad: Player[];
  splitCaptains: SplitCaptains;
  coaches: CoachStaff[];
  ledger: LedgerItem[];
  pitchPreference: PitchType;
  matchTactics: MatchTacticsPreset;
  stadiums: Stadium[];
  broadcastDeals: BroadcastDeal[];
  sponsors: Sponsor[];
  cateringSound: CateringSoundPackage;
  umpires: Umpire[];
  drsCalibrationLevel: number; // 1 to 5
  fixtures: Fixture[];
  rankings: RankingEntry[];
  news: NewsItem[];
  cricketx: CricketXPost[];
  activeMatch: {
    fixture: Fixture;
    scorecard: MatchScorecard;
    ballHistory: BallEvent[];
    currentBallIndex: number;
    currentBowlerIndex: number;
    currentStrikerIndex: number;
    currentNonStrikerIndex: number;
    tacticalPrompt: {
      active: boolean;
      title: string;
      description: string;
      optionA: { label: string; effect: string };
      optionB: { label: string; effect: string };
    } | null;
    isDrsPromptActive: boolean;
    drsCountdown: number;
    drsHawkEyeAnimation: boolean;
    drsOutcomeText: string;
  } | null;
  matchAlertFixture: Fixture | null;
  activeCrisis: CrisisEvent | null;
  crisisHistory: CrisisEvent[];
  soundEnabled: boolean;
  totalMatchesWon: number;
  totalMatchesLost: number;
  trophiesWon: string[];
}

export type FacilityRoomId = 
  | 'boardroom' 
  | 'stadium' 
  | 'training' 
  | 'pressroom' 
  | 'restroom' 
  | 'hospital' 
  | 'merchandise';

export interface CrisisOption {
  id: string;
  label: string;
  description: string;
  cost: number; // in USD
  fanTrustImpact: number;
  boardStabilityImpact: number;
  teamMoraleImpact: number;
  verdictText: string;
}

export interface CrisisEvent {
  id: string;
  title: string;
  category: 'Player Dispute' | 'Sponsor Scandal' | 'Pitch Whistleblower' | 'Doping Controversy' | 'Geopolitical Boycott' | 'Gate & Protocol Chaos';
  severity: 'Critical Emergency' | 'High Alert' | 'Boardroom Headache';
  description: string;
  source: string;
  options: CrisisOption[];
  date: string;
  resolved?: boolean;
  chosenOptionId?: string;
}

export interface MarketListing {
  player: Player;
  transferFeeDemand: number; // in USD
  minimumSalaryDemand: number; // in Millions USD
  interestLevel: number; // 0 to 100
  parentBoardStatus: 'Open to Offers' | 'Demanding Premium' | 'Reluctant to Sell' | 'Transfer Listed';
  scouted?: boolean;
  scoutReport?: {
    clutchRating: number; // 0-100
    injuryRisk: 'Low' | 'Moderate' | 'High';
    temperament: 'Model Professional' | 'Ambitious & Demanding' | 'Charismatic Leader';
    scoutVerdict: string;
  };
}

export interface NegotiationState {
  targetPlayer: Player;
  transferFeeDemand: number;
  offeredTransferFee: number;
  offeredSalary: number; // Millions USD
  offeredYears: number;
  offeredSigningBonus: number; // USD
  offeredRole: 'Marquee Icon (Guaranteed Starter)' | 'First XI Regular' | 'Squad Rotation';
  offeredGrade: ContractGrade;
  currentPhase: 'board_fee' | 'player_terms' | 'completed' | 'rejected';
  boardResponseText: string;
  playerResponseText: string;
  playerPatience: number;
  interestScore: number;
}
