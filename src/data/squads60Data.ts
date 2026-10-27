import { BoardCountry, Player, PlayerRole, ContractGrade } from '../types/game';

// Agency names for cricket representation
const AGENT_AGENCIES = [
  'Apex Sports Management (London)',
  'Cornerstone Talent Representation (Mumbai)',
  'TLA Worldwide (Melbourne)',
  'Insignia Sports Global (Dubai)',
  'ProSport International (Cape Town)',
  'Kahn Sports Media (Auckland)',
  'Carib Elite Athlete Partners (Bridgetown)'
];

const AGENT_NAMES = [
  'Alistair Crawford',
  'Bunty Sajdeh',
  'James Henderson',
  'Imtiaz Jamil',
  'Neil Manthorp',
  'Leanne McGoldrick',
  'Marlon Samuels Sr.',
  'David Folb',
  'Simon Katich',
  'Zaid Farooq',
  'Graeme Pollock Jr.',
  'Craig McMillan'
];

type AttitudeType = 'Model Professional' | 'Fiery Rebel' | 'Charismatic Icon' | 'Demanding Diva' | 'Quiet Grinder';

// 60-player roster seeds for each country
interface SeedPlayer {
  name: string;
  role: PlayerRole;
  age: number;
  rating: number;
  bat: number;
  bowl: number;
  fld: number;
  lead: number;
  grade: ContractGrade;
  salary: number; // Millions USD
  years: number;
  attitude: AttitudeType;
  runs: number;
  avg: number;
  sr: number;
  wkts: number;
  bAvg: number;
  econ: number;
  bestB: string;
}

const INDIA_60_SEEDS: SeedPlayer[] = [
  // 1-15: World Class Elite & Seniors
  { name: 'Rohit Sharma', role: 'Opening Batter', age: 39, rating: 93, bat: 95, bowl: 35, fld: 82, lead: 97, grade: 'A+', salary: 3.2, years: 1, attitude: 'Charismatic Icon', runs: 18900, avg: 49.1, sr: 92.4, wkts: 15, bAvg: 45.2, econ: 5.6, bestB: '2/27' },
  { name: 'Virat Kohli', role: 'Top-Order Batter', age: 38, rating: 95, bat: 97, bowl: 25, fld: 94, lead: 96, grade: 'A+', salary: 3.5, years: 2, attitude: 'Model Professional', runs: 26800, avg: 53.6, sr: 93.8, wkts: 9, bAvg: 60.1, econ: 6.2, bestB: '1/13' },
  { name: 'Jasprit Bumrah', role: 'Express Pacer', age: 32, rating: 97, bat: 28, bowl: 99, fld: 88, lead: 90, grade: 'A+', salary: 3.5, years: 3, attitude: 'Model Professional', runs: 420, avg: 9.8, sr: 65.0, wkts: 395, bAvg: 20.4, econ: 4.5, bestB: '6/19' },
  { name: 'Shubman Gill', role: 'Opening Batter', age: 27, rating: 91, bat: 93, bowl: 20, fld: 90, lead: 88, grade: 'A+', salary: 2.5, years: 4, attitude: 'Model Professional', runs: 5800, avg: 48.5, sr: 98.2, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Rishabh Pant', role: 'Wicketkeeper Batter', age: 29, rating: 92, bat: 93, bowl: 15, fld: 91, lead: 86, grade: 'A+', salary: 2.6, years: 3, attitude: 'Fiery Rebel', runs: 4850, avg: 43.8, sr: 130.5, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Hardik Pandya', role: 'Pace All-Rounder', age: 33, rating: 90, bat: 89, bowl: 88, fld: 92, lead: 91, grade: 'A', salary: 2.4, years: 2, attitude: 'Charismatic Icon', runs: 4200, avg: 34.5, sr: 142.1, wkts: 185, bAvg: 28.5, econ: 6.8, bestB: '4/24' },
  { name: 'Ravindra Jadeja', role: 'Spin All-Rounder', age: 37, rating: 91, bat: 86, bowl: 93, fld: 98, lead: 84, grade: 'A+', salary: 2.8, years: 1, attitude: 'Model Professional', runs: 6200, avg: 36.2, sr: 86.4, wkts: 560, bAvg: 29.1, econ: 4.8, bestB: '7/42' },
  { name: 'Ravichandran Ashwin', role: 'Finger Spinner', age: 40, rating: 90, bat: 78, bowl: 94, fld: 75, lead: 92, grade: 'A', salary: 2.2, years: 1, attitude: 'Quiet Grinder', runs: 3400, avg: 26.5, sr: 72.0, wkts: 740, bAvg: 24.2, econ: 3.2, bestB: '7/59' },
  { name: 'Mohammed Shami', role: 'Swing Specialist', age: 36, rating: 92, bat: 24, bowl: 94, fld: 80, lead: 78, grade: 'A', salary: 2.2, years: 2, attitude: 'Quiet Grinder', runs: 850, avg: 11.2, sr: 74.0, wkts: 448, bAvg: 25.1, econ: 5.1, bestB: '7/57' },
  { name: 'Mohammed Siraj', role: 'Express Pacer', age: 32, rating: 89, bat: 20, bowl: 91, fld: 86, lead: 76, grade: 'A', salary: 1.8, years: 3, attitude: 'Fiery Rebel', runs: 280, avg: 8.5, sr: 60.0, wkts: 260, bAvg: 26.8, econ: 5.0, bestB: '6/21' },
  { name: 'Kuldeep Yadav', role: 'Mystery Spinner', age: 31, rating: 90, bat: 25, bowl: 93, fld: 82, lead: 74, grade: 'A', salary: 1.9, years: 3, attitude: 'Model Professional', runs: 390, avg: 10.5, sr: 64.0, wkts: 295, bAvg: 24.5, econ: 5.2, bestB: '6/25' },
  { name: 'Axar Patel', role: 'Spin All-Rounder', age: 32, rating: 89, bat: 85, bowl: 89, fld: 91, lead: 80, grade: 'A', salary: 1.7, years: 3, attitude: 'Quiet Grinder', runs: 2800, avg: 31.8, sr: 115.0, wkts: 220, bAvg: 27.2, econ: 5.1, bestB: '6/38' },
  { name: 'Yashasvi Jaiswal', role: 'Opening Batter', age: 24, rating: 92, bat: 95, bowl: 30, fld: 91, lead: 82, grade: 'A', salary: 2.2, years: 4, attitude: 'Model Professional', runs: 3100, avg: 56.4, sr: 108.0, wkts: 4, bAvg: 40.0, econ: 6.5, bestB: '1/12' },
  { name: 'Rinku Singh', role: 'Power Finisher', age: 29, rating: 88, bat: 90, bowl: 20, fld: 93, lead: 75, grade: 'B', salary: 1.4, years: 3, attitude: 'Model Professional', runs: 1950, avg: 49.0, sr: 168.5, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Suryakumar Yadav', role: 'Top-Order Batter', age: 36, rating: 92, bat: 96, bowl: 20, fld: 92, lead: 91, grade: 'A+', salary: 2.7, years: 2, attitude: 'Charismatic Icon', runs: 5600, avg: 42.1, sr: 167.8, wkts: 2, bAvg: 35.0, econ: 7.2, bestB: '1/5' },

  // 16-30: Proven Senior Pool & Multi-Format Core
  { name: 'Shreyas Iyer', role: 'Middle-Order Anchor', age: 31, rating: 88, bat: 90, bowl: 22, fld: 86, lead: 88, grade: 'B', salary: 1.5, years: 2, attitude: 'Ambitious & Demanding' as any, runs: 4900, avg: 44.5, sr: 96.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Sanju Samson', role: 'Wicketkeeper Batter', age: 31, rating: 87, bat: 89, bowl: 10, fld: 88, lead: 86, grade: 'B', salary: 1.4, years: 2, attitude: 'Quiet Grinder', runs: 3200, avg: 38.2, sr: 138.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'KL Rahul', role: 'Wicketkeeper Batter', age: 34, rating: 89, bat: 90, bowl: 10, fld: 89, lead: 87, grade: 'A', salary: 2.1, years: 2, attitude: 'Model Professional', runs: 8200, avg: 46.2, sr: 94.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Arshdeep Singh', role: 'Swing Specialist', age: 27, rating: 88, bat: 20, bowl: 90, fld: 84, lead: 74, grade: 'B', salary: 1.5, years: 3, attitude: 'Quiet Grinder', runs: 120, avg: 6.0, sr: 68.0, wkts: 195, bAvg: 23.4, econ: 6.9, bestB: '5/32' },
  { name: 'Tilak Varma', role: 'Top-Order Batter', age: 24, rating: 87, bat: 89, bowl: 65, fld: 90, lead: 76, grade: 'B', salary: 1.2, years: 4, attitude: 'Model Professional', runs: 1850, avg: 42.0, sr: 138.0, wkts: 8, bAvg: 30.0, econ: 6.8, bestB: '2/18' },
  { name: 'Ruturaj Gaikwad', role: 'Opening Batter', age: 29, rating: 87, bat: 89, bowl: 20, fld: 88, lead: 89, grade: 'B', salary: 1.3, years: 3, attitude: 'Model Professional', runs: 2900, avg: 43.0, sr: 132.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Washington Sundar', role: 'Spin All-Rounder', age: 27, rating: 87, bat: 84, bowl: 88, fld: 88, lead: 78, grade: 'B', salary: 1.3, years: 3, attitude: 'Model Professional', runs: 1600, avg: 34.0, sr: 98.0, wkts: 110, bAvg: 28.0, econ: 4.9, bestB: '7/59' },
  { name: 'Shivam Dube', role: 'Pace All-Rounder', age: 33, rating: 85, bat: 88, bowl: 75, fld: 80, lead: 72, grade: 'B', salary: 1.2, years: 2, attitude: 'Quiet Grinder', runs: 2400, avg: 33.0, sr: 148.0, wkts: 45, bAvg: 34.0, econ: 7.9, bestB: '3/30' },
  { name: 'Prasidh Krishna', role: 'Express Pacer', age: 30, rating: 85, bat: 18, bowl: 88, fld: 82, lead: 70, grade: 'B', salary: 1.0, years: 3, attitude: 'Quiet Grinder', runs: 80, avg: 5.0, sr: 50.0, wkts: 115, bAvg: 27.5, econ: 5.8, bestB: '4/12' },
  { name: 'Mayank Yadav', role: 'Express Pacer', age: 24, rating: 86, bat: 15, bowl: 92, fld: 84, lead: 68, grade: 'B', salary: 1.1, years: 4, attitude: 'Fiery Rebel', runs: 40, avg: 6.0, sr: 55.0, wkts: 62, bAvg: 19.8, econ: 6.8, bestB: '4/14' },
  { name: 'Nitish Kumar Reddy', role: 'Pace All-Rounder', age: 23, rating: 85, bat: 86, bowl: 84, fld: 89, lead: 74, grade: 'B', salary: 1.1, years: 4, attitude: 'Model Professional', runs: 950, avg: 36.0, sr: 145.0, wkts: 38, bAvg: 25.0, econ: 7.2, bestB: '3/22' },
  { name: 'Abhishek Sharma', role: 'Opening Batter', age: 26, rating: 86, bat: 89, bowl: 72, fld: 86, lead: 75, grade: 'B', salary: 1.1, years: 3, attitude: 'Fiery Rebel', runs: 1800, avg: 35.0, sr: 172.0, wkts: 22, bAvg: 31.0, econ: 7.8, bestB: '3/15' },
  { name: 'Harshit Rana', role: 'Express Pacer', age: 24, rating: 84, bat: 45, bowl: 87, fld: 83, lead: 70, grade: 'C', salary: 0.8, years: 3, attitude: 'Fiery Rebel', runs: 160, avg: 14.0, sr: 110.0, wkts: 72, bAvg: 24.0, econ: 7.5, bestB: '4/33' },
  { name: 'Dhruv Jurel', role: 'Wicketkeeper Batter', age: 25, rating: 85, bat: 87, bowl: 10, fld: 90, lead: 78, grade: 'B', salary: 0.9, years: 4, attitude: 'Model Professional', runs: 980, avg: 41.0, sr: 115.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Sai Sudharsan', role: 'Top-Order Batter', age: 25, rating: 85, bat: 88, bowl: 30, fld: 88, lead: 76, grade: 'B', salary: 0.9, years: 4, attitude: 'Model Professional', runs: 1450, avg: 47.0, sr: 118.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },

  // 31-45: Domestic Heavyweights & Specialized Weapons
  { name: 'Sarfaraz Khan', role: 'Middle-Order Anchor', age: 29, rating: 85, bat: 89, bowl: 25, fld: 80, lead: 72, grade: 'B', salary: 0.95, years: 2, attitude: 'Quiet Grinder', runs: 4200, avg: 59.0, sr: 78.0, wkts: 3, bAvg: 45.0, econ: 4.8, bestB: '1/18' },
  { name: 'Mukesh Kumar', role: 'Swing Specialist', age: 33, rating: 83, bat: 18, bowl: 86, fld: 80, lead: 70, grade: 'C', salary: 0.75, years: 2, attitude: 'Quiet Grinder', runs: 90, avg: 6.0, sr: 50.0, wkts: 125, bAvg: 28.0, econ: 5.4, bestB: '4/23' },
  { name: 'Avesh Khan', role: 'Express Pacer', age: 30, rating: 84, bat: 22, bowl: 87, fld: 82, lead: 72, grade: 'B', salary: 0.85, years: 2, attitude: 'Fiery Rebel', runs: 120, avg: 8.0, sr: 75.0, wkts: 140, bAvg: 27.0, econ: 7.2, bestB: '4/24' },
  { name: 'Ishan Kishan', role: 'Wicketkeeper Batter', age: 28, rating: 86, bat: 88, bowl: 10, fld: 87, lead: 80, grade: 'B', salary: 1.2, years: 2, attitude: 'Fiery Rebel', runs: 3400, avg: 37.0, sr: 135.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Umran Malik', role: 'Express Pacer', age: 27, rating: 83, bat: 15, bowl: 91, fld: 80, lead: 65, grade: 'C', salary: 0.75, years: 3, attitude: 'Fiery Rebel', runs: 50, avg: 5.0, sr: 60.0, wkts: 88, bAvg: 26.5, econ: 7.9, bestB: '5/25' },
  { name: 'Navdeep Saini', role: 'Express Pacer', age: 34, rating: 81, bat: 25, bowl: 85, fld: 82, lead: 68, grade: 'C', salary: 0.65, years: 1, attitude: 'Quiet Grinder', runs: 140, avg: 10.0, sr: 62.0, wkts: 110, bAvg: 30.5, econ: 6.2, bestB: '4/35' },
  { name: 'Deepak Chahar', role: 'Swing Specialist', age: 34, rating: 83, bat: 65, bowl: 86, fld: 82, lead: 74, grade: 'C', salary: 0.8, years: 1, attitude: 'Model Professional', runs: 420, avg: 22.0, sr: 120.0, wkts: 135, bAvg: 25.8, econ: 7.1, bestB: '6/7' },
  { name: 'Shardul Thakur', role: 'Pace All-Rounder', age: 35, rating: 83, bat: 75, bowl: 85, fld: 82, lead: 76, grade: 'C', salary: 0.85, years: 1, attitude: 'Fiery Rebel', runs: 1400, avg: 24.0, sr: 112.0, wkts: 165, bAvg: 31.0, econ: 6.5, bestB: '7/61' },
  { name: 'Bhuvneshwar Kumar', role: 'Swing Specialist', age: 36, rating: 84, bat: 55, bowl: 87, fld: 85, lead: 80, grade: 'C', salary: 0.9, years: 1, attitude: 'Model Professional', runs: 1100, avg: 18.0, sr: 88.0, wkts: 310, bAvg: 26.0, econ: 5.2, bestB: '5/24' },
  { name: 'Yuzvendra Chahal', role: 'Mystery Spinner', age: 36, rating: 85, bat: 10, bowl: 88, fld: 80, lead: 74, grade: 'B', salary: 1.1, years: 1, attitude: 'Charismatic Icon', runs: 110, avg: 5.0, sr: 45.0, wkts: 345, bAvg: 24.8, econ: 6.8, bestB: '6/25' },
  { name: 'Ravi Bishnoi', role: 'Mystery Spinner', age: 26, rating: 85, bat: 20, bowl: 88, fld: 91, lead: 72, grade: 'B', salary: 1.0, years: 3, attitude: 'Quiet Grinder', runs: 85, avg: 7.0, sr: 60.0, wkts: 125, bAvg: 21.0, econ: 6.6, bestB: '4/16' },
  { name: 'Varun Chakaravarthy', role: 'Mystery Spinner', age: 35, rating: 86, bat: 12, bowl: 89, fld: 78, lead: 68, grade: 'B', salary: 1.1, years: 2, attitude: 'Quiet Grinder', runs: 45, avg: 4.0, sr: 50.0, wkts: 110, bAvg: 19.5, econ: 6.2, bestB: '5/17' },
  { name: 'Rahul Chahar', role: 'Mystery Spinner', age: 27, rating: 82, bat: 22, bowl: 84, fld: 85, lead: 70, grade: 'C', salary: 0.65, years: 2, attitude: 'Model Professional', runs: 90, avg: 8.0, sr: 65.0, wkts: 95, bAvg: 26.5, econ: 6.9, bestB: '4/27' },
  { name: 'Ravisrinivasan Sai Kishore', role: 'Finger Spinner', age: 30, rating: 83, bat: 45, bowl: 86, fld: 84, lead: 76, grade: 'C', salary: 0.7, years: 2, attitude: 'Quiet Grinder', runs: 280, avg: 15.0, sr: 80.0, wkts: 130, bAvg: 22.0, econ: 4.8, bestB: '5/28' },
  { name: 'Shahbaz Ahmed', role: 'Spin All-Rounder', age: 31, rating: 82, bat: 78, bowl: 83, fld: 86, lead: 75, grade: 'C', salary: 0.65, years: 2, attitude: 'Model Professional', runs: 950, avg: 28.0, sr: 110.0, wkts: 75, bAvg: 29.0, econ: 5.6, bestB: '4/35' },

  // 46-60: Emerging Wonderkids & First-Class Proteges
  { name: 'Prabhsimran Singh', role: 'Opening Batter', age: 26, rating: 83, bat: 86, bowl: 10, fld: 85, lead: 72, grade: 'C', salary: 0.65, years: 3, attitude: 'Fiery Rebel', runs: 1200, avg: 34.0, sr: 152.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Rajat Patidar', role: 'Top-Order Batter', age: 33, rating: 84, bat: 87, bowl: 15, fld: 85, lead: 76, grade: 'C', salary: 0.75, years: 2, attitude: 'Quiet Grinder', runs: 2600, avg: 44.0, sr: 140.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Devdutt Padikkal', role: 'Top-Order Batter', age: 26, rating: 83, bat: 86, bowl: 15, fld: 86, lead: 75, grade: 'C', salary: 0.7, years: 3, attitude: 'Model Professional', runs: 2100, avg: 39.0, sr: 124.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Abhimanyu Easwaran', role: 'Opening Batter', age: 31, rating: 83, bat: 87, bowl: 20, fld: 86, lead: 82, grade: 'C', salary: 0.65, years: 2, attitude: 'Model Professional', runs: 7400, avg: 49.5, sr: 65.0, wkts: 2, bAvg: 40.0, econ: 4.2, bestB: '1/12' },
  { name: 'Tanush Kotian', role: 'Spin All-Rounder', age: 27, rating: 82, bat: 76, bowl: 84, fld: 85, lead: 75, grade: 'Domestic / Youth', salary: 0.5, years: 3, attitude: 'Quiet Grinder', runs: 1100, avg: 38.0, sr: 72.0, wkts: 85, bAvg: 25.0, econ: 3.8, bestB: '5/48' },
  { name: 'Shams Mulani', role: 'Spin All-Rounder', age: 29, rating: 82, bat: 75, bowl: 85, fld: 84, lead: 74, grade: 'Domestic / Youth', salary: 0.5, years: 2, attitude: 'Quiet Grinder', runs: 1600, avg: 32.0, sr: 70.0, wkts: 180, bAvg: 24.5, econ: 3.4, bestB: '6/52' },
  { name: 'Akash Deep', role: 'Express Pacer', age: 29, rating: 83, bat: 35, bowl: 86, fld: 82, lead: 70, grade: 'C', salary: 0.75, years: 3, attitude: 'Fiery Rebel', runs: 210, avg: 12.0, sr: 90.0, wkts: 120, bAvg: 23.5, econ: 5.4, bestB: '5/56' },
  { name: 'Khaleel Ahmed', role: 'Swing Specialist', age: 28, rating: 83, bat: 18, bowl: 86, fld: 82, lead: 68, grade: 'C', salary: 0.75, years: 2, attitude: 'Model Professional', runs: 65, avg: 6.0, sr: 55.0, wkts: 130, bAvg: 27.0, econ: 7.2, bestB: '4/25' },
  { name: 'Tushar Deshpande', role: 'Express Pacer', age: 31, rating: 82, bat: 25, bowl: 85, fld: 81, lead: 70, grade: 'C', salary: 0.65, years: 2, attitude: 'Fiery Rebel', runs: 140, avg: 10.0, sr: 70.0, wkts: 115, bAvg: 26.0, econ: 7.6, bestB: '4/27' },
  { name: 'Yash Dayal', role: 'Swing Specialist', age: 28, rating: 82, bat: 20, bowl: 85, fld: 82, lead: 68, grade: 'Domestic / Youth', salary: 0.55, years: 2, attitude: 'Quiet Grinder', runs: 50, avg: 5.0, sr: 50.0, wkts: 92, bAvg: 27.5, econ: 7.4, bestB: '4/31' },
  { name: 'Musheer Khan', role: 'Top-Order Batter', age: 21, rating: 81, bat: 85, bowl: 65, fld: 86, lead: 74, grade: 'Domestic / Youth', salary: 0.45, years: 4, attitude: 'Model Professional', runs: 780, avg: 48.0, sr: 75.0, wkts: 12, bAvg: 30.0, econ: 4.8, bestB: '3/35' },
  { name: 'Sameer Rizvi', role: 'Power Finisher', age: 22, rating: 80, bat: 84, bowl: 30, fld: 88, lead: 70, grade: 'Domestic / Youth', salary: 0.45, years: 4, attitude: 'Charismatic Icon', runs: 450, avg: 35.0, sr: 160.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Anshul Kamboj', role: 'Express Pacer', age: 24, rating: 81, bat: 25, bowl: 85, fld: 84, lead: 70, grade: 'Domestic / Youth', salary: 0.45, years: 3, attitude: 'Quiet Grinder', runs: 90, avg: 10.0, sr: 60.0, wkts: 65, bAvg: 21.0, econ: 5.2, bestB: '8/69' },
  { name: 'Kumar Kushagra', role: 'Wicketkeeper Batter', age: 22, rating: 80, bat: 83, bowl: 10, fld: 86, lead: 72, grade: 'Domestic / Youth', salary: 0.4, years: 4, attitude: 'Model Professional', runs: 850, avg: 39.0, sr: 110.0, wkts: 0, bAvg: 0, econ: 0, bestB: '0/0' },
  { name: 'Suyash Sharma', role: 'Mystery Spinner', age: 23, rating: 80, bat: 10, bowl: 84, fld: 84, lead: 65, grade: 'Domestic / Youth', salary: 0.4, years: 3, attitude: 'Quiet Grinder', runs: 25, avg: 4.0, sr: 45.0, wkts: 45, bAvg: 25.0, econ: 7.2, bestB: '3/30' }
];

// Helper to expand seed rosters to 60 players per nation with realistic names, statistics, agents, and attitudes
function buildCountryRoster(
  country: BoardCountry,
  countryPrefix: string,
  topNames: { name: string; role: PlayerRole; rating: number; bat: number; bowl: number; fld: number; grade: ContractGrade; salary: number; age: number; att: AttitudeType }[],
  domesticNames: string[]
): Player[] {
  const roster: Player[] = [];

  // Add the curated top stars
  topNames.forEach((star, idx) => {
    const isBatsman = star.bat > star.bowl;
    const isBowler = star.bowl > star.bat;
    roster.push({
      id: `${countryPrefix}-p${idx + 1}`,
      name: star.name,
      country,
      role: star.role,
      age: star.age,
      rating: star.rating,
      battingRating: star.bat,
      bowlingRating: star.bowl,
      fieldingRating: star.fld,
      leadership: Math.floor(70 + Math.random() * 26),
      grade: star.grade,
      salary: star.salary,
      contractYears: Math.floor(1 + Math.random() * 4),
      form: Math.floor(78 + Math.random() * 20),
      fitness: Math.floor(82 + Math.random() * 16),
      morale: 'Confident',
      matches: Math.floor(25 + Math.random() * 150),
      runs: isBatsman ? Math.floor(1500 + Math.random() * 7500) : Math.floor(100 + Math.random() * 900),
      battingAvg: isBatsman ? Number((36 + Math.random() * 16).toFixed(1)) : Number((10 + Math.random() * 12).toFixed(1)),
      strikeRate: isBatsman ? Number((80 + Math.random() * 55).toFixed(1)) : Number((50 + Math.random() * 40).toFixed(1)),
      centuries: isBatsman ? Math.floor(Math.random() * 15) : 0,
      fifties: isBatsman ? Math.floor(5 + Math.random() * 30) : Math.floor(Math.random() * 2),
      wickets: isBowler ? Math.floor(60 + Math.random() * 350) : Math.floor(Math.random() * 15),
      bowlingAvg: isBowler ? Number((21 + Math.random() * 9).toFixed(1)) : 0,
      economy: isBowler ? Number((4.5 + Math.random() * 2.5).toFixed(1)) : 0,
      bestBowling: isBowler ? `${Math.floor(4 + Math.random() * 3)}/${Math.floor(15 + Math.random() * 35)}` : '0/0',
      agentName: AGENT_NAMES[idx % AGENT_NAMES.length],
      agentAgency: AGENT_AGENCIES[idx % AGENT_AGENCIES.length],
      attitude: star.att
    });
  });

  // Fill up to 60 players with domestic & youth talents
  const rolesPool: PlayerRole[] = [
    'Opening Batter',
    'Top-Order Batter',
    'Middle-Order Anchor',
    'Power Finisher',
    'Wicketkeeper Batter',
    'Pace All-Rounder',
    'Spin All-Rounder',
    'Express Pacer',
    'Swing Specialist',
    'Mystery Spinner',
    'Finger Spinner'
  ];

  const attitudesPool: AttitudeType[] = [
    'Model Professional',
    'Fiery Rebel',
    'Charismatic Icon',
    'Demanding Diva',
    'Quiet Grinder'
  ];

  while (roster.length < 60) {
    const curIdx = roster.length;
    const name = domesticNames[curIdx % domesticNames.length] || `Domestic Talent ${curIdx + 1}`;
    const role = rolesPool[curIdx % rolesPool.length];
    const isBatsman = role.includes('Batter') || role.includes('Finisher') || role.includes('Anchor');
    const isBowler = role.includes('Pacer') || role.includes('Spinner') || role.includes('Specialist');
    const isAllRounder = role.includes('All-Rounder');

    const rating = Math.floor(79 + Math.random() * 8);
    const batRating = isBatsman ? Math.floor(82 + Math.random() * 8) : isAllRounder ? Math.floor(75 + Math.random() * 8) : Math.floor(20 + Math.random() * 30);
    const bowlRating = isBowler ? Math.floor(83 + Math.random() * 8) : isAllRounder ? Math.floor(78 + Math.random() * 7) : Math.floor(15 + Math.random() * 25);

    roster.push({
      id: `${countryPrefix}-p${curIdx + 1}`,
      name: `${name} ${curIdx >= domesticNames.length ? 'II' : ''}`.trim(),
      country,
      role,
      age: Math.floor(19 + Math.random() * 14),
      rating,
      battingRating: batRating,
      bowlingRating: bowlRating,
      fieldingRating: Math.floor(80 + Math.random() * 12),
      leadership: Math.floor(65 + Math.random() * 20),
      grade: curIdx < 40 ? 'C' : 'Domestic / Youth',
      salary: Number((0.35 + Math.random() * 0.55).toFixed(2)),
      contractYears: Math.floor(1 + Math.random() * 3),
      form: Math.floor(75 + Math.random() * 22),
      fitness: Math.floor(85 + Math.random() * 13),
      morale: 'Neutral',
      matches: Math.floor(5 + Math.random() * 45),
      runs: isBatsman ? Math.floor(400 + Math.random() * 2200) : Math.floor(50 + Math.random() * 350),
      battingAvg: isBatsman ? Number((30 + Math.random() * 14).toFixed(1)) : 14.5,
      strikeRate: isBatsman ? Number((100 + Math.random() * 45).toFixed(1)) : 68.0,
      centuries: isBatsman ? Math.floor(Math.random() * 4) : 0,
      fifties: isBatsman ? Math.floor(2 + Math.random() * 8) : 0,
      wickets: isBowler || isAllRounder ? Math.floor(20 + Math.random() * 95) : 0,
      bowlingAvg: isBowler || isAllRounder ? Number((22 + Math.random() * 10).toFixed(1)) : 0,
      economy: isBowler || isAllRounder ? Number((5.0 + Math.random() * 2.2).toFixed(1)) : 0,
      bestBowling: isBowler || isAllRounder ? `${Math.floor(3 + Math.random() * 3)}/${Math.floor(18 + Math.random() * 30)}` : '0/0',
      agentName: AGENT_NAMES[(curIdx + 3) % AGENT_NAMES.length],
      agentAgency: AGENT_AGENCIES[(curIdx + 1) % AGENT_AGENCIES.length],
      attitude: attitudesPool[curIdx % attitudesPool.length]
    });
  }

  return roster;
}

// Country seeds
const AUSTRALIA_TOP: Parameters<typeof buildCountryRoster>[2] = [
  { name: 'Pat Cummins', role: 'Express Pacer', age: 33, rating: 96, bat: 75, bowl: 97, fld: 90, grade: 'A+', salary: 3.4, att: 'Charismatic Icon' },
  { name: 'Travis Head', role: 'Opening Batter', age: 32, rating: 94, bat: 95, bowl: 65, fld: 91, grade: 'A+', salary: 3.1, att: 'Fiery Rebel' },
  { name: 'Mitchell Starc', role: 'Express Pacer', age: 36, rating: 94, bat: 60, bowl: 96, fld: 89, grade: 'A+', salary: 3.2, att: 'Model Professional' },
  { name: 'Steve Smith', role: 'Top-Order Batter', age: 37, rating: 93, bat: 95, bowl: 40, fld: 94, grade: 'A+', salary: 3.0, att: 'Quiet Grinder' },
  { name: 'Glenn Maxwell', role: 'Spin All-Rounder', age: 37, rating: 90, bat: 92, bowl: 84, fld: 96, grade: 'A', salary: 2.4, att: 'Charismatic Icon' },
  { name: 'Josh Hazlewood', role: 'Swing Specialist', age: 35, rating: 93, bat: 20, bowl: 95, fld: 86, grade: 'A+', salary: 2.8, att: 'Model Professional' },
  { name: 'Marnus Labuschagne', role: 'Top-Order Batter', age: 32, rating: 89, bat: 92, bowl: 60, fld: 92, grade: 'A', salary: 2.1, att: 'Quiet Grinder' },
  { name: 'Mitchell Marsh', role: 'Pace All-Rounder', age: 34, rating: 90, bat: 91, bowl: 84, fld: 88, grade: 'A', salary: 2.3, att: 'Charismatic Icon' },
  { name: 'Cameron Green', role: 'Pace All-Rounder', age: 27, rating: 91, bat: 90, bowl: 89, fld: 95, grade: 'A+', salary: 2.6, att: 'Model Professional' },
  { name: 'Adam Zampa', role: 'Mystery Spinner', age: 34, rating: 90, bat: 20, bowl: 92, fld: 85, grade: 'A', salary: 2.2, att: 'Model Professional' },
  { name: 'Nathan Lyon', role: 'Finger Spinner', age: 38, rating: 91, bat: 30, bowl: 93, fld: 86, grade: 'A', salary: 2.3, att: 'Model Professional' },
  { name: 'Josh Inglis', role: 'Wicketkeeper Batter', age: 31, rating: 88, bat: 90, bowl: 10, fld: 92, grade: 'B', salary: 1.6, att: 'Quiet Grinder' },
  { name: 'Alex Carey', role: 'Wicketkeeper Batter', age: 35, rating: 88, bat: 89, bowl: 10, fld: 93, grade: 'B', salary: 1.7, att: 'Model Professional' },
  { name: 'Jake Fraser-McGurk', role: 'Opening Batter', age: 24, rating: 87, bat: 91, bowl: 20, fld: 90, grade: 'B', salary: 1.4, att: 'Fiery Rebel' },
  { name: 'Tim David', role: 'Power Finisher', age: 30, rating: 87, bat: 92, bowl: 30, fld: 89, grade: 'B', salary: 1.5, att: 'Charismatic Icon' }
];

const AUSTRALIA_DOMESTIC = [
  'Cooper Connolly', 'Lance Morris', 'Jhye Richardson', 'Nathan Ellis', 'Sean Abbott', 'Ashton Agar',
  'Todd Murphy', 'Matthew Kuhnemann', 'Michael Neser', 'Scott Boland', 'Mark Steketee', 'Aaron Hardie',
  'Will Sutherland', 'Cameron Bancroft', 'Marcus Harris', 'Matt Renshaw', 'Nathan McSweeney', 'Oliver Davies',
  'Sam Konstas', 'Jason Sangha', 'Mitchell Swepson', 'Joel Paris', 'Marcus Stoinis', 'Riley Meredith',
  'Jason Behrendorff', 'Ben McDermott', 'Josh Philippe', 'Jake Weatherald', 'Jordan Silk', 'Kurtis Patterson',
  'Jimmy Peirson', 'Xavier Bartlett', 'Spencer Johnson', 'Tanveer Sangha', 'Will Pucovski', 'Teague Wyllie',
  'Mahli Beardman', 'Callum Vidler', 'Charlie Anderson', 'Campbell Kellaway', 'Henry Thornton', 'Beau Webster',
  'Wes Agar', 'Jack Edwards', 'Daniel Sams', 'Matthew Short', 'Chris Green', 'Ben Dwarshuis', 'Peter Siddle'
];

const ENGLAND_TOP: Parameters<typeof buildCountryRoster>[2] = [
  { name: 'Ben Stokes', role: 'Pace All-Rounder', age: 35, rating: 95, bat: 93, bowl: 90, fld: 95, grade: 'A+', salary: 3.3, att: 'Charismatic Icon' },
  { name: 'Joe Root', role: 'Top-Order Batter', age: 35, rating: 96, bat: 98, bowl: 65, fld: 93, grade: 'A+', salary: 3.4, att: 'Model Professional' },
  { name: 'Jos Buttler', role: 'Wicketkeeper Batter', age: 36, rating: 93, bat: 95, bowl: 10, fld: 91, grade: 'A+', salary: 3.0, att: 'Charismatic Icon' },
  { name: 'Harry Brook', role: 'Middle-Order Anchor', age: 27, rating: 93, bat: 96, bowl: 40, fld: 92, grade: 'A+', salary: 2.8, att: 'Model Professional' },
  { name: 'Jofra Archer', role: 'Express Pacer', age: 31, rating: 92, bat: 45, bowl: 96, fld: 89, grade: 'A+', salary: 2.7, att: 'Fiery Rebel' },
  { name: 'Mark Wood', role: 'Express Pacer', age: 36, rating: 91, bat: 30, bowl: 95, fld: 85, grade: 'A', salary: 2.4, att: 'Charismatic Icon' },
  { name: 'Ben Duckett', role: 'Opening Batter', age: 31, rating: 89, bat: 92, bowl: 15, fld: 87, grade: 'A', salary: 1.9, att: 'Quiet Grinder' },
  { name: 'Zak Crawley', role: 'Opening Batter', age: 28, rating: 88, bat: 91, bowl: 15, fld: 90, grade: 'A', salary: 1.8, att: 'Model Professional' },
  { name: 'Ollie Pope', role: 'Top-Order Batter', age: 28, rating: 88, bat: 90, bowl: 10, fld: 91, grade: 'A', salary: 1.8, att: 'Model Professional' },
  { name: 'Gus Atkinson', role: 'Express Pacer', age: 28, rating: 89, bat: 55, bowl: 91, fld: 86, grade: 'A', salary: 1.9, att: 'Quiet Grinder' },
  { name: 'Shoaib Bashir', role: 'Finger Spinner', age: 22, rating: 86, bat: 20, bowl: 89, fld: 83, grade: 'B', salary: 1.1, att: 'Model Professional' },
  { name: 'Liam Livingstone', role: 'Spin All-Rounder', age: 33, rating: 88, bat: 90, bowl: 82, fld: 92, grade: 'A', salary: 1.9, att: 'Charismatic Icon' },
  { name: 'Sam Curran', role: 'Pace All-Rounder', age: 28, rating: 88, bat: 85, bowl: 87, fld: 89, grade: 'A', salary: 2.0, att: 'Fiery Rebel' },
  { name: 'Phil Salt', role: 'Opening Batter', age: 29, rating: 89, bat: 92, bowl: 10, fld: 88, grade: 'A', salary: 1.9, att: 'Fiery Rebel' },
  { name: 'Will Jacks', role: 'Spin All-Rounder', age: 27, rating: 88, bat: 89, bowl: 83, fld: 91, grade: 'B', salary: 1.6, att: 'Model Professional' }
];

const ENGLAND_DOMESTIC = [
  'Adil Rashid', 'Saqib Mahmood', 'Josh Tongue', 'Brydon Carse', 'Olly Stone', 'Rehan Ahmed',
  'Jacob Bethell', 'Jordan Cox', 'Jamie Smith', 'Sam Hain', 'Dan Lawrence', 'Keaton Jennings',
  'Dom Sibley', 'Rory Burns', 'Tom Banton', 'Dawid Malan', 'David Willey', 'Liam Dawson',
  'Reece Topley', 'Luke Wood', 'Chris Jordan', 'Craig Overton', 'Jamie Overton', 'Matthew Fisher',
  'Toby Roland-Jones', 'Sam Cook', 'Simon Harmer', 'Josh Bohannon', 'Rob Yates', 'James Rew',
  'Sonny Baker', 'Tom Aspinwall', 'George Scrimshaw', 'Farhan Ahmed', 'Ned Leonard', 'Dillon Pennington',
  'John Turner', 'Josh Hull', 'Dan Mousley', 'Matt Critchley', 'Louis Kimber', 'Wayne Madsen',
  'Adam Lyth', 'Alex Davies', 'Ben Cox', 'Ollie Robinson', 'Matt Parkinson', 'Tom Hartley'
];

const PAKISTAN_TOP: Parameters<typeof buildCountryRoster>[2] = [
  { name: 'Babar Azam', role: 'Top-Order Batter', age: 32, rating: 94, bat: 96, bowl: 20, fld: 89, grade: 'A+', salary: 2.5, att: 'Model Professional' },
  { name: 'Mohammad Rizwan', role: 'Wicketkeeper Batter', age: 34, rating: 93, bat: 94, bowl: 10, fld: 95, grade: 'A+', salary: 2.4, att: 'Charismatic Icon' },
  { name: 'Shaheen Shah Afridi', role: 'Express Pacer', age: 26, rating: 95, bat: 45, bowl: 97, fld: 88, grade: 'A+', salary: 2.7, att: 'Fiery Rebel' },
  { name: 'Naseem Shah', role: 'Express Pacer', age: 23, rating: 92, bat: 40, bowl: 94, fld: 86, grade: 'A+', salary: 2.2, att: 'Model Professional' },
  { name: 'Haris Rauf', role: 'Express Pacer', age: 32, rating: 89, bat: 20, bowl: 92, fld: 87, grade: 'A', salary: 1.8, att: 'Fiery Rebel' },
  { name: 'Fakhar Zaman', role: 'Opening Batter', age: 36, rating: 89, bat: 92, bowl: 20, fld: 88, grade: 'A', salary: 1.7, att: 'Charismatic Icon' },
  { name: 'Shadab Khan', role: 'Spin All-Rounder', age: 28, rating: 88, bat: 86, bowl: 87, fld: 94, grade: 'A', salary: 1.8, att: 'Charismatic Icon' },
  { name: 'Salman Ali Agha', role: 'Spin All-Rounder', age: 32, rating: 88, bat: 89, bowl: 83, fld: 89, grade: 'A', salary: 1.6, att: 'Model Professional' },
  { name: 'Saim Ayub', role: 'Opening Batter', age: 24, rating: 88, bat: 91, bowl: 60, fld: 88, grade: 'B', salary: 1.4, att: 'Model Professional' },
  { name: 'Abdullah Shafique', role: 'Opening Batter', age: 26, rating: 87, bat: 89, bowl: 15, fld: 87, grade: 'B', salary: 1.3, att: 'Quiet Grinder' },
  { name: 'Shan Masood', role: 'Top-Order Batter', age: 36, rating: 87, bat: 89, bowl: 20, fld: 87, grade: 'A', salary: 1.7, att: 'Model Professional' },
  { name: 'Saud Shakeel', role: 'Middle-Order Anchor', age: 30, rating: 88, bat: 91, bowl: 40, fld: 86, grade: 'A', salary: 1.6, att: 'Quiet Grinder' },
  { name: 'Abrar Ahmed', role: 'Mystery Spinner', age: 27, rating: 88, bat: 20, bowl: 91, fld: 82, grade: 'B', salary: 1.3, att: 'Model Professional' },
  { name: 'Kamran Ghulam', role: 'Middle-Order Anchor', age: 30, rating: 86, bat: 88, bowl: 60, fld: 85, grade: 'B', salary: 1.1, att: 'Quiet Grinder' },
  { name: 'Aamir Jamal', role: 'Pace All-Rounder', age: 29, rating: 86, bat: 82, bowl: 88, fld: 86, grade: 'B', salary: 1.2, att: 'Fiery Rebel' }
];

const PAKISTAN_DOMESTIC = [
  'Mohammad Ali', 'Mir Hamza', 'Khurram Shahzad', 'Haseebullah Khan', 'Mohammad Haris', 'Sahibzada Farhan',
  'Tayyab Tahir', 'Omair Yousuf', 'Rohail Nazir', 'Shahnawaz Dahani', 'Abbas Afridi', 'Mohammad Wasim Jr',
  'Zaman Khan', 'Ihsanullah', 'Arshad Iqbal', 'Faheem Ashraf', 'Mubasir Khan', 'Mehran Mumtaz',
  'Qasim Akram', 'Sufiyan Muqeem', 'Faisal Akram', 'Haider Ali', 'Danish Aziz', 'Hussain Talat',
  'Asif Ali', 'Usman Khan', 'Irfan Khan Niazi', 'Jahandad Khan', 'Ali Raza', 'Ubaid Shah',
  'Shahzaib Khan', 'Shamyl Hussain', 'Saad Baig', 'Arafat Minhas', 'Mohammad Zeeshan', 'Ahmed Daniyal',
  'Usama Mir', 'Imad Wasim', 'Mohammad Amir', 'Azam Khan', 'Mohammad Nawaz', 'Hasan Ali',
  'Akif Javed', 'Amad Butt', 'Bismillah Khan', 'Saad Ali', 'Zafar Gohar', 'Zahid Mahmood'
];

const SOUTH_AFRICA_TOP: Parameters<typeof buildCountryRoster>[2] = [
  { name: 'Kagiso Rabada', role: 'Express Pacer', age: 31, rating: 96, bat: 35, bowl: 98, fld: 90, grade: 'A+', salary: 2.8, att: 'Charismatic Icon' },
  { name: 'Heinrich Klaasen', role: 'Wicketkeeper Batter', age: 35, rating: 94, bat: 96, bowl: 10, fld: 90, grade: 'A+', salary: 2.7, att: 'Fiery Rebel' },
  { name: 'Aiden Markram', role: 'Top-Order Batter', age: 31, rating: 91, bat: 92, bowl: 70, fld: 95, grade: 'A+', salary: 2.4, att: 'Model Professional' },
  { name: 'David Miller', role: 'Power Finisher', age: 37, rating: 90, bat: 93, bowl: 10, fld: 92, grade: 'A', salary: 2.2, att: 'Charismatic Icon' },
  { name: 'Anrich Nortje', role: 'Express Pacer', age: 32, rating: 91, bat: 20, bowl: 95, fld: 86, grade: 'A', salary: 2.2, att: 'Fiery Rebel' },
  { name: 'Marco Jansen', role: 'Pace All-Rounder', age: 26, rating: 90, bat: 84, bowl: 92, fld: 91, grade: 'A', salary: 2.1, att: 'Quiet Grinder' },
  { name: 'Keshav Maharaj', role: 'Finger Spinner', age: 36, rating: 90, bat: 55, bowl: 92, fld: 87, grade: 'A', salary: 2.0, att: 'Model Professional' },
  { name: 'Temba Bavuma', role: 'Middle-Order Anchor', age: 36, rating: 88, bat: 89, bowl: 15, fld: 93, grade: 'A', salary: 1.9, att: 'Model Professional' },
  { name: 'Tristan Stubbs', role: 'Wicketkeeper Batter', age: 25, rating: 89, bat: 92, bowl: 60, fld: 93, grade: 'A', salary: 1.8, att: 'Charismatic Icon' },
  { name: 'Gerald Coetzee', role: 'Express Pacer', age: 25, rating: 88, bat: 60, bowl: 91, fld: 87, grade: 'B', salary: 1.5, att: 'Fiery Rebel' },
  { name: 'Lungi Ngidi', role: 'Express Pacer', age: 30, rating: 87, bat: 20, bowl: 89, fld: 84, grade: 'B', salary: 1.5, att: 'Quiet Grinder' },
  { name: 'Tony de Zorzi', role: 'Opening Batter', age: 29, rating: 86, bat: 88, bowl: 15, fld: 86, grade: 'B', salary: 1.2, att: 'Model Professional' },
  { name: 'Ryan Rickelton', role: 'Wicketkeeper Batter', age: 29, rating: 87, bat: 89, bowl: 10, fld: 88, grade: 'B', salary: 1.3, att: 'Model Professional' },
  { name: 'Nandre Burger', role: 'Express Pacer', age: 30, rating: 87, bat: 30, bowl: 90, fld: 84, grade: 'B', salary: 1.3, att: 'Fiery Rebel' },
  { name: 'Tabraiz Shamsi', role: 'Mystery Spinner', age: 36, rating: 87, bat: 10, bowl: 89, fld: 80, grade: 'B', salary: 1.4, att: 'Charismatic Icon' }
];

const SOUTH_AFRICA_DOMESTIC = [
  'Kwena Maphaka', 'Dewald Brevis', 'Corbin Bosch', 'Wiaan Mulder', 'Senuran Muthusamy', 'Dane Paterson',
  'Matthew Breetzke', 'Bjorn Fortuin', 'Ottniel Baartman', 'Andile Phehlukwayo', 'Rassie van der Dussen',
  'Reeza Hendricks', 'Lizaad Williams', 'Sisanda Magala', 'George Linde', 'Kyle Verreynne', 'Zubayr Hamza',
  'Beyers Swanepoel', 'Mihlali Mpongwana', 'Eathan Bosch', 'Sinethemba Qeshile', 'Codi Yusuf', 'Tshepo Moreki',
  'Rivaldo Moonsamy', 'Rubin Hermann', 'Marques Ackerman', 'Dayyaan Galiem', 'Patrick Kruger', 'Evan Jones',
  'Jiveshan Pillay', 'Matthew Boast', 'Lhuan-dre Pretorius', 'Steve Stolk', 'Romashan Pillay', 'David Teeger',
  'Ntando Zuma', 'Oliver Whitehead', 'Kwena Maphaka', 'Nqaba Peter', 'Delano Potgieter', 'Prenelan Subrayen',
  'Shaun von Berg', 'Hardus Viljoen', 'Beuran Hendricks', 'Grant Roelofsen', 'Lesiba Ngoepe', 'Jason Smith'
];

const NEW_ZEALAND_TOP: Parameters<typeof buildCountryRoster>[2] = [
  { name: 'Kane Williamson', role: 'Top-Order Batter', age: 36, rating: 95, bat: 97, bowl: 35, fld: 94, grade: 'A+', salary: 2.7, att: 'Model Professional' },
  { name: 'Daryl Mitchell', role: 'Middle-Order Anchor', age: 35, rating: 91, bat: 93, bowl: 75, fld: 92, grade: 'A+', salary: 2.3, att: 'Model Professional' },
  { name: 'Rachin Ravindra', role: 'Spin All-Rounder', age: 26, rating: 92, bat: 93, bowl: 84, fld: 91, grade: 'A+', salary: 2.4, att: 'Model Professional' },
  { name: 'Mitchell Santner', role: 'Spin All-Rounder', age: 34, rating: 90, bat: 82, bowl: 91, fld: 95, grade: 'A', salary: 2.1, att: 'Quiet Grinder' },
  { name: 'Matt Henry', role: 'Swing Specialist', age: 34, rating: 91, bat: 45, bowl: 94, fld: 88, grade: 'A', salary: 2.2, att: 'Quiet Grinder' },
  { name: 'Trent Boult', role: 'Swing Specialist', age: 37, rating: 91, bat: 25, bowl: 94, fld: 92, grade: 'A', salary: 2.3, att: 'Charismatic Icon' },
  { name: 'Glenn Phillips', role: 'Spin All-Rounder', age: 29, rating: 90, bat: 90, bowl: 85, fld: 98, grade: 'A', salary: 2.1, att: 'Fiery Rebel' },
  { name: 'Tom Latham', role: 'Wicketkeeper Batter', age: 34, rating: 88, bat: 90, bowl: 10, fld: 91, grade: 'A', salary: 1.8, att: 'Model Professional' },
  { name: 'Devon Conway', role: 'Opening Batter', age: 35, rating: 89, bat: 92, bowl: 10, fld: 89, grade: 'A', salary: 1.9, att: 'Model Professional' },
  { name: 'Finn Allen', role: 'Opening Batter', age: 27, rating: 88, bat: 91, bowl: 10, fld: 88, grade: 'B', salary: 1.6, att: 'Fiery Rebel' },
  { name: 'Lockie Ferguson', role: 'Express Pacer', age: 35, rating: 89, bat: 20, bowl: 93, fld: 86, grade: 'A', salary: 1.9, att: 'Quiet Grinder' },
  { name: 'Will Young', role: 'Top-Order Batter', age: 33, rating: 87, bat: 89, bowl: 15, fld: 88, grade: 'B', salary: 1.4, att: 'Quiet Grinder' },
  { name: 'Ajaz Patel', role: 'Finger Spinner', age: 37, rating: 87, bat: 25, bowl: 90, fld: 82, grade: 'B', salary: 1.4, att: 'Quiet Grinder' },
  { name: 'Jacob Duffy', role: 'Swing Specialist', age: 32, rating: 85, bat: 30, bowl: 88, fld: 84, grade: 'B', salary: 1.1, att: 'Quiet Grinder' },
  { name: 'Ben Sears', role: 'Express Pacer', age: 28, rating: 86, bat: 20, bowl: 89, fld: 84, grade: 'B', salary: 1.2, att: 'Fiery Rebel' }
];

const NEW_ZEALAND_DOMESTIC = [
  'William O’Rourke', 'Nathan Smith', 'Ish Sodhi', 'Michael Bracewell', 'Mark Chapman', 'Tim Seifert',
  'Adam Milne', 'Blair Tickner', 'Kyle Jamieson', 'Henry Nicholls', 'Colin de Grandhomme', 'Dane Cleaver',
  'Cole McConchie', 'Chad Bowes', 'Dean Foxcroft', 'Adithya Ashok', 'Josh Clarkson', 'Scott Kuggeleijn',
  'Rachin Ravindra', 'Kristian Clarke', 'Matt Fisher', 'Zakary Foulkes', 'Rhys Mariu', 'Mitchell Hay',
  'Nick Kelly', 'Dale Phillips', 'Rory O’Donnell', 'Jake Gibson', 'Tim Robinson', 'Gareth Severin',
  'Troy Johnson', 'Rachael Priest', 'Brett Hampton', 'Matthew McEwan', 'Ollie Pringle', 'Ben Lister',
  'Louis Delport', 'Joe Carter', 'Katene Clarke', 'Jeet Raval', 'Luke Georgeson', 'Cam Fletcher',
  'Hamish Rutherford', 'George Worker', 'Will Somerville', 'Logan van Beek', 'Malcolm Nofal'
];

const WEST_INDIES_TOP: Parameters<typeof buildCountryRoster>[2] = [
  { name: 'Nicholas Pooran', role: 'Wicketkeeper Batter', age: 30, rating: 93, bat: 96, bowl: 10, fld: 91, grade: 'A+', salary: 2.6, att: 'Charismatic Icon' },
  { name: 'Shai Hope', role: 'Wicketkeeper Batter', age: 32, rating: 91, bat: 93, bowl: 10, fld: 92, grade: 'A+', salary: 2.2, att: 'Model Professional' },
  { name: 'Alzarri Joseph', role: 'Express Pacer', age: 29, rating: 90, bat: 45, bowl: 93, fld: 88, grade: 'A', salary: 2.1, att: 'Fiery Rebel' },
  { name: 'Andre Russell', role: 'Pace All-Rounder', age: 38, rating: 90, bat: 93, bowl: 85, fld: 92, grade: 'A', salary: 2.4, att: 'Charismatic Icon' },
  { name: 'Shimron Hetmyer', role: 'Power Finisher', age: 29, rating: 89, bat: 92, bowl: 10, fld: 88, grade: 'A', salary: 1.9, att: 'Fiery Rebel' },
  { name: 'Jason Holder', role: 'Pace All-Rounder', age: 34, rating: 89, bat: 86, bowl: 89, fld: 91, grade: 'A', salary: 2.0, att: 'Model Professional' },
  { name: 'Rovman Powell', role: 'Power Finisher', age: 33, rating: 89, bat: 91, bowl: 70, fld: 92, grade: 'A', salary: 1.9, att: 'Charismatic Icon' },
  { name: 'Shamar Joseph', role: 'Express Pacer', age: 26, rating: 89, bat: 30, bowl: 93, fld: 87, grade: 'A', salary: 1.7, att: 'Charismatic Icon' },
  { name: 'Gudakesh Motie', role: 'Finger Spinner', age: 31, rating: 88, bat: 60, bowl: 91, fld: 87, grade: 'B', salary: 1.5, att: 'Quiet Grinder' },
  { name: 'Akeal Hosein', role: 'Finger Spinner', age: 33, rating: 88, bat: 65, bowl: 90, fld: 90, grade: 'A', salary: 1.6, att: 'Model Professional' },
  { name: 'Sherfane Rutherford', role: 'Power Finisher', age: 28, rating: 87, bat: 90, bowl: 65, fld: 88, grade: 'B', salary: 1.4, att: 'Charismatic Icon' },
  { name: 'Brandon King', role: 'Opening Batter', age: 31, rating: 87, bat: 89, bowl: 10, fld: 86, grade: 'B', salary: 1.4, att: 'Quiet Grinder' },
  { name: 'Kraigg Brathwaite', role: 'Opening Batter', age: 33, rating: 87, bat: 90, bowl: 40, fld: 88, grade: 'A', salary: 1.6, att: 'Model Professional' },
  { name: 'Jayden Seales', role: 'Express Pacer', age: 25, rating: 88, bat: 25, bowl: 91, fld: 86, grade: 'B', salary: 1.4, att: 'Model Professional' },
  { name: 'Romario Shepherd', role: 'Pace All-Rounder', age: 31, rating: 87, bat: 88, bowl: 85, fld: 87, grade: 'B', salary: 1.4, att: 'Charismatic Icon' }
];

const WEST_INDIES_DOMESTIC = [
  'Alick Athanaze', 'Mikyle Louis', 'Kavem Hodge', 'Tevin Imlach', 'Kemar Roach', 'Shannon Gabriel',
  'Oshane Thomas', 'Obed McCoy', 'Fabian Allen', 'Hayden Walsh Jr', 'Evin Lewis', 'Darren Bravo',
  'Keacy Carty', 'Matthew Forde', 'Jewel Andrew', 'Teddy Bishop', 'Kevin Wickham', 'Ashmead Nedd',
  'Ramon Simmonds', 'Nyeem Young', 'Anderson Phillip', 'Marquino Mindley', 'Jomel Warrican', 'Veerasammy Permaul',
  'Bryan Charles', 'Rahkeem Cornwall', 'Joshua Da Silva', 'Yannic Cariah', 'Dominic Drakes', 'Justin Greaves',
  'Raymon Reifer', 'Jahmar Hamilton', 'Kirk McKenzie', 'Jordan Johnson', 'Isai Thorne', 'Nathan Edward',
  'Rivaldo Clarke', 'Mavendra Dindyal', 'Shamar Springer', 'Tagenarine Chanderpaul', 'Kevlon Anderson',
  'Kimani Melius', 'Leonardo Julien', 'Roshon Primus', 'Kofi James', 'Khary Pierre', 'Terrance Hinds'
];

// Build India 60 squad directly using seeds and remaining slots
const INDIA_SQUAD_60: Player[] = INDIA_60_SEEDS.map((s, idx) => ({
  id: `ind-p${idx + 1}`,
  name: s.name,
  country: 'India',
  role: s.role,
  age: s.age,
  rating: s.rating,
  battingRating: s.bat,
  bowlingRating: s.bowl,
  fieldingRating: s.fld,
  leadership: s.lead,
  grade: s.grade,
  salary: s.salary,
  contractYears: s.years,
  form: Math.floor(82 + Math.random() * 16),
  fitness: Math.floor(84 + Math.random() * 14),
  morale: 'Confident',
  matches: Math.floor(15 + Math.random() * 160),
  runs: s.runs,
  battingAvg: s.avg,
  strikeRate: s.sr,
  centuries: s.bat > 85 ? Math.floor(Math.random() * 8) : 0,
  fifties: s.bat > 80 ? Math.floor(3 + Math.random() * 20) : 0,
  wickets: s.wkts,
  bowlingAvg: s.bAvg,
  economy: s.econ,
  bestBowling: s.bestB,
  agentName: AGENT_NAMES[idx % AGENT_NAMES.length],
  agentAgency: AGENT_AGENCIES[idx % AGENT_AGENCIES.length],
  attitude: s.attitude
}));

export const SQUADS_60: Record<BoardCountry, Player[]> = {
  India: INDIA_SQUAD_60,
  Australia: buildCountryRoster('Australia', 'aus', AUSTRALIA_TOP, AUSTRALIA_DOMESTIC),
  England: buildCountryRoster('England', 'eng', ENGLAND_TOP, ENGLAND_DOMESTIC),
  Pakistan: buildCountryRoster('Pakistan', 'pak', PAKISTAN_TOP, PAKISTAN_DOMESTIC),
  'South Africa': buildCountryRoster('South Africa', 'sa', SOUTH_AFRICA_TOP, SOUTH_AFRICA_DOMESTIC),
  'New Zealand': buildCountryRoster('New Zealand', 'nz', NEW_ZEALAND_TOP, NEW_ZEALAND_DOMESTIC),
  'West Indies': buildCountryRoster('West Indies', 'wi', WEST_INDIES_TOP, WEST_INDIES_DOMESTIC)
};
