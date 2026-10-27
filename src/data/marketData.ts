import { BoardCountry, MarketListing, Player } from '../types/game';
import { INITIAL_SQUADS } from './initialData';

export function generateInitialMarket(userCountry: BoardCountry): MarketListing[] {
  const allCountries: BoardCountry[] = [
    'Australia',
    'England',
    'Pakistan',
    'South Africa',
    'New Zealand',
    'West Indies',
    'India'
  ];

  const marketListings: MarketListing[] = [];

  allCountries.forEach((country) => {
    if (country === userCountry) return; // Don't list players from the user's current squad

    const squad = INITIAL_SQUADS[country] || [];
    squad.forEach((player) => {
      // Calculate realistic transfer valuation based on player rating and age
      let baseFee = player.rating >= 94 ? 20000000 : player.rating >= 90 ? 14000000 : 8000000;
      if (player.age < 26) baseFee *= 1.25; // Youth premium
      else if (player.age > 34) baseFee *= 0.8; // Veteran discount

      const statuses: MarketListing['parentBoardStatus'][] = 
        player.rating >= 93 
          ? ['Demanding Premium', 'Reluctant to Sell'] 
          : ['Open to Offers', 'Open to Offers', 'Transfer Listed'];

      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const clutchRating = Math.min(99, Math.floor(player.rating * 0.95 + Math.random() * 8));
      const injuryRisk = player.fitness < 85 ? 'High' : player.fitness < 92 ? 'Moderate' : 'Low';
      const temperaments: NonNullable<MarketListing['scoutReport']>['temperament'][] = [
        'Model Professional',
        'Ambitious & Demanding',
        'Charismatic Leader'
      ];
      const temperament = temperaments[Math.floor(Math.random() * temperaments.length)];

      marketListings.push({
        player,
        transferFeeDemand: Math.round(baseFee / 500000) * 500000,
        minimumSalaryDemand: Number((player.salary * (1.1 + Math.random() * 0.25)).toFixed(2)),
        interestLevel: Math.floor(60 + Math.random() * 30),
        parentBoardStatus: status,
        scouted: false,
        scoutReport: {
          clutchRating,
          injuryRisk,
          temperament,
          scoutVerdict: `World-class ${player.role.toLowerCase()} capable of single-handedly dictating match outcomes. Highly sought after by international boards.`
        }
      });
    });
  });

  // Add a couple of international wonderkid free agents / emerging prospects
  const internationalFreeAgents: Player[] = [
    {
      id: 'fa-1',
      name: 'Finn Allen Jr',
      country: 'New Zealand',
      role: 'Opening Batter',
      age: 22,
      rating: 86,
      battingRating: 89,
      bowlingRating: 30,
      fieldingRating: 88,
      leadership: 72,
      grade: 'B',
      salary: 1.1,
      contractYears: 2,
      form: 91,
      fitness: 96,
      morale: 'Confident',
      matches: 42,
      runs: 1680,
      battingAvg: 41.2,
      strikeRate: 148.0,
      centuries: 3,
      fifties: 10,
      wickets: 0,
      bowlingAvg: 0,
      economy: 0,
      bestBowling: '0/0'
    },
    {
      id: 'fa-2',
      name: 'Kwena Maphaka',
      country: 'South Africa',
      role: 'Express Pacer',
      age: 20,
      rating: 85,
      battingRating: 35,
      bowlingRating: 89,
      fieldingRating: 84,
      leadership: 70,
      grade: 'B',
      salary: 0.95,
      contractYears: 3,
      form: 94,
      fitness: 98,
      morale: 'Ecstatic',
      matches: 24,
      runs: 110,
      battingAvg: 11.0,
      strikeRate: 80.0,
      centuries: 0,
      fifties: 0,
      wickets: 48,
      bowlingAvg: 20.8,
      economy: 5.1,
      bestBowling: '5/29'
    }
  ];

  if (!allCountries.includes(userCountry) || userCountry !== 'New Zealand') {
    marketListings.push({
      player: internationalFreeAgents[0],
      transferFeeDemand: 6500000,
      minimumSalaryDemand: 1.3,
      interestLevel: 88,
      parentBoardStatus: 'Open to Offers',
      scouted: true,
      scoutReport: {
        clutchRating: 88,
        injuryRisk: 'Low',
        temperament: 'Ambitious & Demanding',
        scoutVerdict: 'Explosive top-order power hitter with extraordinary boundary clearing reach in powerplays.'
      }
    });
  }

  return marketListings;
}
