import { 
  BallEvent, 
  MatchScorecard, 
  PitchType, 
  WeatherType, 
  Player, 
  Fixture,
  BoardCountry,
  MatchTacticsPreset
} from '../types/game';
import { INITIAL_SQUADS } from '../data/initialData';

export interface OpponentTacticalProfile {
  country: BoardCountry;
  playStyle: string;
  battingTendency: 'Ultra-Aggressive' | 'Disciplined Anchors' | 'Volatile Powerhitters' | 'Calculated Spin-Attackers';
  bowlingTendency: 'Express Pace Barrage' | 'Swing & Seam Precision' | 'Subcontinental Spin Trap' | 'Balanced Attack';
  strengths: string;
  vulnerability: string;
  counterTacticAdvice: string;
}

export const OPPONENT_TACTICAL_PROFILES: Record<BoardCountry, OpponentTacticalProfile> = {
  Australia: {
    country: 'Australia',
    playStyle: 'Hard-Nosed Aggression & Fast Bowling Hostility',
    battingTendency: 'Ultra-Aggressive',
    bowlingTendency: 'Express Pace Barrage',
    strengths: 'Destructive powerplay hitters (Travis Head) and searing pace (Pat Cummins, Mitchell Starc).',
    vulnerability: 'Vulnerable when starved of boundaries by middle-overs spin traps and deep sweepers.',
    counterTacticAdvice: 'Deploy Spin Bias + Defensive Field Placement to restrict boundary flow.'
  },
  England: {
    country: 'England',
    playStyle: 'Bazball High-Tempo All-Out Boundary Assault',
    battingTendency: 'Ultra-Aggressive',
    bowlingTendency: 'Express Pace Barrage',
    strengths: 'Relentless strike rate and deep power hitting (Buttler, Brook).',
    vulnerability: 'High wicket attrition when facing disciplined short-pitch pace or ring field traps.',
    counterTacticAdvice: 'Deploy Pace Bias + Attacking Slips & Ring to induce reckless edges.'
  },
  'New Zealand': {
    country: 'New Zealand',
    playStyle: 'Tactical Precision, Strike Rotation & Relentless Discipline',
    battingTendency: 'Disciplined Anchors',
    bowlingTendency: 'Swing & Seam Precision',
    strengths: 'Williamson anchoring innings; tight line-and-length swing bowling (Boult/Henry).',
    vulnerability: 'Low boundary acceleration under steep required run rates.',
    counterTacticAdvice: 'Deploy Aggressive Batting + Pace Bias to put early pressure on their swing bowlers.'
  },
  Pakistan: {
    country: 'Pakistan',
    playStyle: 'Lightning Fast Bowling Sparks & Flamboyant Strokeplay',
    battingTendency: 'Volatile Powerhitters',
    bowlingTendency: 'Express Pace Barrage',
    strengths: 'Shaheen & Naseem lethal new ball swing; Babar anchor class.',
    vulnerability: 'Middle-order collapse risk when suffocated by slow turners and dot balls.',
    counterTacticAdvice: 'Deploy Spin Bias + Controlled Aggression to grind out victories.'
  },
  'South Africa': {
    country: 'South Africa',
    playStyle: 'High-Velocity Pace & Brutal Death Finishes',
    battingTendency: 'Volatile Powerhitters',
    bowlingTendency: 'Express Pace Barrage',
    strengths: 'Klaasen monstrous hitting against spin; Rabada lethal yorkers.',
    vulnerability: 'Vulnerable against sharp finger/mystery spinners turning away from right-handers.',
    counterTacticAdvice: 'Deploy Defensive Field Placement + Death Yorker Priority to deny late fireworks.'
  },
  India: {
    country: 'India',
    playStyle: 'Complete Modern Cricket Mastery & Formidable Depth',
    battingTendency: 'Calculated Spin-Attackers',
    bowlingTendency: 'Balanced Attack',
    strengths: 'Supreme top order (Rohit/Kohli) and Bumrah death mastery.',
    vulnerability: 'Pressure rises if early wickets tumble in powerplay.',
    counterTacticAdvice: 'Deploy Attacking Slips + Controlled Aggression for sustained pressure.'
  },
  'West Indies': {
    country: 'West Indies',
    playStyle: 'Boundary-Clearing Maximums & Caribbean Power-Hitting',
    battingTendency: 'Volatile Powerhitters',
    bowlingTendency: 'Balanced Attack',
    strengths: 'Nicholas Pooran raw six-hitting power and explosive tail-end cameos.',
    vulnerability: 'High dot-ball percentage; vulnerable against turning mystery spin.',
    counterTacticAdvice: 'Deploy Spin Bias + Deep Boundary Sweeper Lock to starve sixes.'
  }
};

export interface TacticalEffect {
  runRateMultiplier: number;
  wicketChanceMultiplier: number;
  boundaryChanceMultiplier: number;
  riskFactor: number;
  synergyDescription: string;
  synergyScore: number; // -100 to +100
}

export function calculateTacticsSynergy(
  tactics: MatchTacticsPreset,
  opponentCountry: BoardCountry
): { synergyScore: number; advantages: string[]; cautions: string[] } {
  const oppProfile = OPPONENT_TACTICAL_PROFILES[opponentCountry] || OPPONENT_TACTICAL_PROFILES['Australia'];
  let score = 0;
  const advantages: string[] = [];
  const cautions: string[] = [];

  // Batting Strategy vs Opponent Bowling
  if (tactics.battingStrategy === 'Aggressive Batting') {
    if (oppProfile.bowlingTendency === 'Swing & Seam Precision') {
      score += 18;
      advantages.push('Aggressive Batting disrupts swing bowlers by forcing them off their ideal lengths.');
    } else if (oppProfile.bowlingTendency === 'Express Pace Barrage') {
      score -= 10;
      cautions.push('Aggressive Batting against Express Pace carries higher risk of top edges and slips.');
    } else {
      score += 8;
      advantages.push('High boundary rate exerts constant pressure on the field.');
    }
  } else if (tactics.battingStrategy === 'Anchor & Accumulate') {
    if (oppProfile.bowlingTendency === 'Express Pace Barrage') {
      score += 15;
      advantages.push('Defensive anchor blunts ferocious fast bowlers, draining their energy in long spells.');
    } else {
      score += 5;
      advantages.push('Low wicket loss preserves top-order stability.');
    }
  } else if (tactics.battingStrategy === 'Controlled Aggression') {
    score += 12;
    advantages.push('Balanced strokeplay adapts smoothly to varied bowling spells.');
  }

  // Field Placement vs Opponent Batting
  if (tactics.fieldPlacement === 'Defensive Field Placement') {
    if (oppProfile.battingTendency === 'Ultra-Aggressive' || oppProfile.battingTendency === 'Volatile Powerhitters') {
      score += 20;
      advantages.push('Defensive Field Placement suffocates aggressive boundary hitters into frustration shots.');
    } else {
      score += 5;
    }
  } else if (tactics.fieldPlacement === 'Attacking Slips & Ring') {
    if (oppProfile.battingTendency === 'Volatile Powerhitters') {
      score += 15;
      advantages.push('Catchers in close exploit reckless flashy shots outside off stump.');
    } else if (oppProfile.battingTendency === 'Ultra-Aggressive') {
      score -= 8;
      cautions.push('Attacking Slips can leak boundaries if aggressive hitters find gaps.');
    }
  } else if (tactics.fieldPlacement === 'Deep Boundary Sweeper Lock') {
    if (oppProfile.battingTendency === 'Ultra-Aggressive') {
      score += 16;
      advantages.push('Boundary sweepers turn potential sixes into singles.');
    }
  }

  // Bowling Bias vs Opponent Vulnerability
  if (tactics.bowlingBias === 'Spin Bias') {
    if (opponentCountry === 'Australia' || opponentCountry === 'West Indies' || opponentCountry === 'Pakistan') {
      score += 22;
      advantages.push(`Spin Bias targets ${opponentCountry}'s historical vulnerability against turning balls.`);
    } else {
      score += 6;
    }
  } else if (tactics.bowlingBias === 'Pace Bias') {
    if (opponentCountry === 'England' || opponentCountry === 'New Zealand') {
      score += 18;
      advantages.push(`Pace Bias tests ${opponentCountry}'s footwork with sharp seam movement.`);
    } else {
      score += 8;
    }
  } else if (tactics.bowlingBias === 'Death Yorker Priority') {
    score += 14;
    advantages.push('Death Yorkers choke opposition run rate in the decisive closing overs.');
  }

  return {
    synergyScore: Math.max(-50, Math.min(50, score)),
    advantages,
    cautions
  };
}

export function calculateTacticalEffect(
  tactic: string,
  tacticsPreset?: MatchTacticsPreset,
  opponentCountry?: BoardCountry
): TacticalEffect {
  let runRateMultiplier = 1.0;
  let wicketChanceMultiplier = 1.0;
  let boundaryChanceMultiplier = 1.0;
  let riskFactor = 0.1;

  // Apply in-match micro tactic if triggered
  switch (tactic) {
    case 'short-ball':
      runRateMultiplier *= 1.1;
      wicketChanceMultiplier *= 1.5;
      boundaryChanceMultiplier *= 1.3;
      riskFactor = 0.3;
      break;
    case 'spin-choke':
      runRateMultiplier *= 0.65;
      wicketChanceMultiplier *= 1.2;
      boundaryChanceMultiplier *= 0.7;
      riskFactor = 0.1;
      break;
    case 'death-yorkers':
      runRateMultiplier *= 0.8;
      wicketChanceMultiplier *= 1.4;
      boundaryChanceMultiplier *= 0.75;
      riskFactor = 0.2;
      break;
    case 'all-out-attack':
      runRateMultiplier *= 1.25;
      wicketChanceMultiplier *= 1.6;
      boundaryChanceMultiplier *= 1.4;
      riskFactor = 0.4;
      break;
    case 'consolidate':
      runRateMultiplier *= 0.75;
      wicketChanceMultiplier *= 0.5;
      boundaryChanceMultiplier *= 0.6;
      riskFactor = 0.05;
      break;
  }

  // Factor in Match Tactics pre-set
  let synergyDesc = 'Standard tactical configuration active.';
  let synergyScore = 0;

  if (tacticsPreset) {
    if (tacticsPreset.battingStrategy === 'Aggressive Batting') {
      runRateMultiplier *= 1.18;
      boundaryChanceMultiplier *= 1.25;
      wicketChanceMultiplier *= 1.15;
    } else if (tacticsPreset.battingStrategy === 'Anchor & Accumulate') {
      runRateMultiplier *= 0.85;
      wicketChanceMultiplier *= 0.68;
      boundaryChanceMultiplier *= 0.80;
    } else if (tacticsPreset.battingStrategy === 'Controlled Aggression') {
      runRateMultiplier *= 1.05;
      boundaryChanceMultiplier *= 1.08;
    }

    if (tacticsPreset.fieldPlacement === 'Defensive Field Placement') {
      runRateMultiplier *= 0.90;
      boundaryChanceMultiplier *= 0.78;
    } else if (tacticsPreset.fieldPlacement === 'Attacking Slips & Ring') {
      wicketChanceMultiplier *= 1.22;
      runRateMultiplier *= 1.08;
    } else if (tacticsPreset.fieldPlacement === 'Deep Boundary Sweeper Lock') {
      boundaryChanceMultiplier *= 0.70;
      runRateMultiplier *= 0.92;
    }

    if (opponentCountry) {
      const syn = calculateTacticsSynergy(tacticsPreset, opponentCountry);
      synergyScore = syn.synergyScore;
      if (synergyScore > 10) {
        synergyDesc = `Favorable match tactical edge (+${synergyScore}%) against ${opponentCountry}!`;
        wicketChanceMultiplier *= 1.12;
        boundaryChanceMultiplier *= 1.10;
      } else if (synergyScore < -5) {
        synergyDesc = `Opponent style counters your setup (${synergyScore}% disadvantage).`;
        wicketChanceMultiplier *= 0.90;
      }
    }
  }

  return {
    runRateMultiplier,
    wicketChanceMultiplier,
    boundaryChanceMultiplier,
    riskFactor,
    synergyDescription: synergyDesc,
    synergyScore
  };
}

export function generateBallEvent(
  ballIndex: number,
  overNum: number,
  ballInOver: number,
  bowler: Player,
  batter: Player,
  pitch: PitchType,
  weather: WeatherType,
  tactic: string = 'balanced',
  tacticsPreset?: MatchTacticsPreset,
  opponentCountry?: BoardCountry
): BallEvent {
  const tacticalMod = calculateTacticalEffect(tactic, tacticsPreset, opponentCountry);

  // Pitch influence
  let pitchPaceBonus = 0;
  let pitchSpinBonus = 0;
  let pitchBattingBonus = 0;

  if (pitch === 'Green Top' || pitch === 'Overcast Swing') {
    pitchPaceBonus = 12;
  } else if (pitch === 'Dustbowl') {
    pitchSpinBonus = 15;
  } else if (pitch === 'Flat Batting Paradise') {
    pitchBattingBonus = 15;
  }

  // Effective ratings
  const bowlerSkill = (bowler.bowlingRating || 75) + (bowler.role.includes('Spinner') ? pitchSpinBonus : pitchPaceBonus);
  const batterSkill = (batter.battingRating || 75) + pitchBattingBonus;

  // Rating delta (-30 to +30)
  const diff = (batterSkill * (batter.form / 100)) - (bowlerSkill * (bowler.form / 100));

  // Wicket calculation
  const baseWicketChance = 0.048; // roughly 1 in 20 balls in T20/ODI
  const wicketChance = Math.max(0.015, Math.min(0.22, (baseWicketChance - diff * 0.001) * tacticalMod.wicketChanceMultiplier));

  const roll = Math.random();

  let runs = 0;
  let isWicket = false;
  let wicketType: string | undefined = undefined;
  let dismissedPlayer: string | undefined = undefined;
  let isBoundaryFour = false;
  let isBoundarySix = false;
  let commentary = '';
  let shotDirectionDeg = Math.floor(Math.random() * 360);
  const speedKph = Math.floor(
    bowler.role.includes('Spinner') 
      ? 86 + Math.random() * 14 
      : 135 + Math.random() * 18
  );

  // 2D Pitch radar coordinates (percentage 0 to 100)
  // X: 45-55 (stump lines), Y: 10-85 (short to full)
  const lengthRoll = Math.random();
  let radarY = 50; // good length
  let radarX = 47 + Math.random() * 6; // around off-middle

  if (tactic === 'short-ball' || lengthRoll < 0.25) {
    radarY = 25 + Math.random() * 15; // short / bouncer
  } else if (lengthRoll > 0.75) {
    radarY = 70 + Math.random() * 15; // yorker / full
  } else {
    radarY = 45 + Math.random() * 20; // good length
  }

  if (roll < wicketChance) {
    isWicket = true;
    dismissedPlayer = batter.name;
    const wTypeRoll = Math.random();
    if (wTypeRoll < 0.35) {
      wicketType = 'Caught';
      const catchPositions = ['deep midwicket', 'point', 'long-on', 'cover', 'slip', 'third man'];
      const pos = catchPositions[Math.floor(Math.random() * catchPositions.length)];
      commentary = `OUT! Lofted in the air towards ${pos}... and taken cleanly! ${batter.name} departs!`;
    } else if (wTypeRoll < 0.60) {
      wicketType = 'Bowled';
      commentary = `OUT! Clean bowled! Absolute peach of a delivery, clatters into the stumps! ${bowler.name} strikes!`;
    } else if (wTypeRoll < 0.85) {
      wicketType = 'LBW';
      commentary = `OUT! Loud shout for LBW... umpire Nitin Menon raises the finger! Trapped plumb in front!`;
    } else {
      wicketType = 'Caught Behind';
      commentary = `OUT! Edged and taken by the keeper! Faintest of nicks through to the gloves!`;
    }
  } else {
    // Scoring runs
    const scoreRoll = Math.random();
    if (scoreRoll < 0.38 / tacticalMod.runRateMultiplier) {
      // Dot ball
      runs = 0;
      const dotPhrases = [
        `Beaten outside off-stump! Wonderful shape and seam movement.`,
        `Defended solidly with soft hands towards mid-on. No run.`,
        `Driven firmly straight to extra cover. Fielder fields cleanly.`,
        `Speared in at the toes, tucked to square leg, no run possible.`,
        `Short and fast, swayed away harmlessly to the keeper.`
      ];
      commentary = dotPhrases[Math.floor(Math.random() * dotPhrases.length)];
    } else if (scoreRoll < 0.65) {
      runs = 1;
      shotDirectionDeg = 90 + Math.floor(Math.random() * 120);
      commentary = `Pushed into the gap at mid-wicket for a sharp, confident single.`;
    } else if (scoreRoll < 0.77) {
      runs = 2;
      shotDirectionDeg = 30 + Math.floor(Math.random() * 80);
      commentary = `Worked away into the deep cover pocket. Good sprint between the wickets for a brace!`;
    } else if (scoreRoll < 0.90) {
      runs = 4;
      isBoundaryFour = true;
      shotDirectionDeg = Math.random() > 0.5 ? 45 + Math.random() * 40 : 210 + Math.random() * 40;
      const fourPhrases = [
        `FOUR! Crunched through the covers with imperious timing! Racing away to the boundary rope!`,
        `FOUR! Pulled emphatically past midwicket! Splendid cricket shot!`,
        `FOUR! Delicate late dab past slip, beats third man all the way!`,
        `FOUR! Driven on the up straight down the ground, no fielder moved!`
      ];
      commentary = fourPhrases[Math.floor(Math.random() * fourPhrases.length)];
    } else {
      runs = 6;
      isBoundarySix = true;
      shotDirectionDeg = 120 + Math.floor(Math.random() * 120);
      const sixPhrases = [
        `SIX! High, handsome and into the second tier! Massive maximum over long-on! 🚀`,
        `SIX! Stand and deliver! Picked the bones out of that short ball and sent it into orbit!`,
        `SIX! Slog sweep dispatched into the crowd! What an exhibition of power! 💥`
      ];
      commentary = sixPhrases[Math.floor(Math.random() * sixPhrases.length)];
    }
  }

  return {
    ballIndex,
    overNum,
    ballInOver,
    bowlerName: bowler.name,
    batterName: batter.name,
    runs,
    isWicket,
    wicketType,
    dismissedPlayer,
    isBoundaryFour,
    isBoundarySix,
    commentary,
    radarX,
    radarY,
    shotDirectionDeg,
    speedKph
  };
}

export function initializeMatchScorecard(
  fixture: Fixture,
  ourCountry: BoardCountry,
  ourSquad: Player[],
  pitch: PitchType,
  weather: WeatherType
): MatchScorecard {
  const oppCountry = fixture.opponent;
  const oppSquad = INITIAL_SQUADS[oppCountry] || INITIAL_SQUADS['Australia'];

  // Select top 11
  const ourPlaying11 = ourSquad.slice(0, 11);
  const oppPlaying11 = oppSquad.slice(0, 11);

  return {
    ourTeamName: ourCountry,
    oppTeamName: oppCountry,
    format: fixture.format,
    venue: fixture.venue,
    pitch,
    weather,
    ourInnings: {
      runs: 0,
      wickets: 0,
      overs: 0,
      batting: ourPlaying11.map(p => ({
        name: p.name,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
        dismissalText: 'Not Out'
      })),
      bowling: ourPlaying11.filter(p => p.role.includes('Pacer') || p.role.includes('Spinner') || p.role.includes('All-Rounder')).map(p => ({
        name: p.name,
        overs: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        economy: 0
      }))
    },
    oppInnings: {
      runs: 0,
      wickets: 0,
      overs: 0,
      batting: oppPlaying11.map(p => ({
        name: p.name,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
        dismissalText: 'Not Out'
      })),
      bowling: oppPlaying11.filter(p => p.role.includes('Pacer') || p.role.includes('Spinner') || p.role.includes('All-Rounder')).map(p => ({
        name: p.name,
        overs: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        economy: 0
      }))
    },
    isFirstInningsComplete: false,
    isMatchFinished: false,
    matchResultText: 'Match in progress...'
  };
}
