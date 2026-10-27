import { BoardCountry, CrisisEvent, Player } from '../types/game';

export const PRESET_CRISES: Omit<CrisisEvent, 'id' | 'date'>[] = [
  {
    title: 'Dressing Room Rebellion: Captaincy Rift Leaked to Media',
    category: 'Player Dispute',
    severity: 'High Alert',
    source: 'Anonymous Senior Player Dossier (Daily Cricket Gazette)',
    description: 'A bitter ideological schism between senior players and the team captain has been leaked to the press. Several senior players threaten to boycott the upcoming bilateral series unless the chairman intervenes immediately.',
    options: [
      {
        id: 'opt-settle-peace',
        label: 'Broker Executive Treaty & Financial Retention Incentive',
        description: 'Host private five-star summit, issue discretionary performance bonuses of $4,000,000 to senior core, and reaffirm the captain publicly.',
        cost: 4000000,
        fanTrustImpact: 6,
        boardStabilityImpact: 10,
        teamMoraleImpact: 12,
        verdictText: 'The chairman personally brokered a boardroom armistice. Senior players signed peace accords, though board accounts take a noticeable dent.'
      },
      {
        id: 'opt-bench-rebels',
        label: 'Hardline Crackdown: Strip Contracts & Bench Rebels',
        description: 'Demonstrate absolute board authority. Demote the ringleaders to Domestic Grade C contracts and promote academy youth.',
        cost: 0,
        fanTrustImpact: -12,
        boardStabilityImpact: -8,
        teamMoraleImpact: -25,
        verdictText: 'Iron-fisted discipline enforced. The dressing room is shocked into silence, but team chemistry and morale crater ahead of the tour.'
      },
      {
        id: 'opt-gag-order',
        label: 'Impose Legal NDAs & Code of Conduct Fines',
        description: 'Hire premier crisis management PR firm for $1,200,000 and levy $50,000 internal fines on all squad members.',
        cost: 1200000,
        fanTrustImpact: -4,
        boardStabilityImpact: 5,
        teamMoraleImpact: -8,
        verdictText: 'The leak was contained under threat of heavy litigation. Fans suspect a cover-up, but the public controversy dissipates.'
      }
    ]
  },
  {
    title: 'Title Sponsor Offshore Investigation & Integrity Audit',
    category: 'Sponsor Scandal',
    severity: 'Critical Emergency',
    source: 'Federal Financial Crimes Unit & Interpol Financial Desk',
    description: 'Your premier jersey title sponsor has been named in an international offshore money-laundering and unregulated sports wagering syndicate investigation. Television networks are demanding their logo be stripped from national kit before tomorrow’s broadcast.',
    options: [
      {
        id: 'opt-cancel-sponsor',
        label: 'Immediate Contract Termination & Forfeit Guaranteed Retainers',
        description: 'Tear up the $18,000,000 contract on moral grounds. Absorb the commercial revenue shortfall to safeguard national dignity.',
        cost: 18000000,
        fanTrustImpact: 18,
        boardStabilityImpact: 8,
        teamMoraleImpact: 2,
        verdictText: 'Principled executive action won international acclaim from the ICC and fans, although the board treasury must absorb the loss of funds.'
      },
      {
        id: 'opt-stand-by-sponsor',
        label: 'Stand Firm: Invoke Presumption of Innocence',
        description: 'Refuse to breach the contract without formal conviction. Pocket the sponsorship money while issuing a cautious press statement.',
        cost: 0,
        fanTrustImpact: -24,
        boardStabilityImpact: -15,
        teamMoraleImpact: -5,
        verdictText: 'Treasury intact, but social media erupts with #BoycottTheBoard. Sponsors and rights partners distance themselves from your leadership.'
      },
      {
        id: 'opt-blackout-patch',
        label: 'Temporary Kit Blackout & Independent Forensic Inquiry',
        description: 'Cover the logo with black tape during matches and commission an independent judicial probe for $2,500,000.',
        cost: 2500000,
        fanTrustImpact: 5,
        boardStabilityImpact: 4,
        teamMoraleImpact: 0,
        verdictText: 'A calculated middle path that maintained broadcast composure without violating contractual indemnity clauses.'
      }
    ]
  },
  {
    title: 'ICC Official Complaint: Pitch Tampering & Curator Whistleblower',
    category: 'Pitch Whistleblower',
    severity: 'High Alert',
    source: 'Visiting Board Official Dossier to ICC Match Referee',
    description: 'A disgruntled assistant stadium groundsman has alleged that your board executive ordered the head curator to chemically treat pitch surfaces to eliminate opposition pace advantages.',
    options: [
      {
        id: 'opt-independent-curator-audit',
        label: 'Invite ICC Independent Soil Agronomists & Full Transparency',
        description: 'Pay $800,000 for neutral international soil testing and televise the pitch inspection live.',
        cost: 800000,
        fanTrustImpact: 10,
        boardStabilityImpact: 6,
        teamMoraleImpact: 4,
        verdictText: 'Complete agronomical exoneration was verified by neutral ICC experts. Visiting board withdrew their complaint with an apology.'
      },
      {
        id: 'opt-curator-severance',
        label: 'Sack the Whistleblower & Pay Non-Disclosure Settlement',
        description: 'Quietly terminate the rogue assistant curator with a $1,500,000 legal settlement to prevent further public disclosures.',
        cost: 1500000,
        fanTrustImpact: -8,
        boardStabilityImpact: 2,
        teamMoraleImpact: -6,
        verdictText: 'The legal settlement sealed the leaks, but persistent murmurs linger across commentary boxes worldwide.'
      },
      {
        id: 'opt-counter-charge',
        label: 'Aggressive Retaliation: Accuse Visiting Board of Sour Grapes',
        description: 'Hold a fiery press conference ridiculing the allegations as an excuse for poor batting technique.',
        cost: 0,
        fanTrustImpact: -5,
        boardStabilityImpact: -12,
        teamMoraleImpact: 8,
        verdictText: 'Domestic fans cheered the pugnacious press conference, but diplomatic ties with rival boards plummeted to an all-time low.'
      }
    ]
  },
  {
    title: 'Marquee Pacer Failed Unannounced Fitness & Doping Screen',
    category: 'Doping Controversy',
    severity: 'Critical Emergency',
    source: 'World Anti-Doping Agency (WADA) Compliance Dispatch',
    description: 'Your premier international strike bowler has returned an adverse analytical finding for a prohibited stimulant during pre-series camp testing. The media has already caught wind of an impending provisional suspension.',
    options: [
      {
        id: 'opt-b-sample-challenge',
        label: 'Engage Elite Swiss Sports Arbitration Barristers',
        description: 'Expend $3,200,000 on top-tier legal appeals arguing unintentional contamination via prescribed asthma medication.',
        cost: 3200000,
        fanTrustImpact: -3,
        boardStabilityImpact: 4,
        teamMoraleImpact: 14,
        verdictText: 'Legal team successfully secured an interim stay. The pacer remains eligible while proceedings continue in Lausanne.'
      },
      {
        id: 'opt-full-suspension',
        label: 'Immediate 12-Month Board Suspension & Public Reprimand',
        description: 'Adopt zero tolerance. Strip the player’s retainer and remove them from all national facilities immediately.',
        cost: 0,
        fanTrustImpact: 14,
        boardStabilityImpact: 8,
        teamMoraleImpact: -20,
        verdictText: 'Your uncompromising stance was hailed as a benchmark for sporting integrity, though bowling attack strength is gutted.'
      },
      {
        id: 'opt-medical-rehab',
        label: 'Confidential Medical Leave & Physio Reconditioning',
        description: 'Classify the absence as an acute muscular stress injury and fund $1,000,000 in clinical rehabilitation overseas.',
        cost: 1000000,
        fanTrustImpact: 2,
        boardStabilityImpact: 2,
        teamMoraleImpact: 2,
        verdictText: 'The narrative was deftly managed as medical rehabilitation, avoiding a scorched-earth public scandal.'
      }
    ]
  },
  {
    title: 'Geopolitical Impasse: Foreign Ministry Security Boycott Threat',
    category: 'Geopolitical Boycott',
    severity: 'Critical Emergency',
    source: 'Ministry of Foreign Affairs Security Advisory',
    description: 'Sudden regional political tensions have prompted your national foreign office to advise canceling the marquee $45,000,000 bilateral tour. Broadcast syndicates threaten massive contract breach penalties if the games do not proceed.',
    options: [
      {
        id: 'opt-neutral-venue',
        label: 'Shift Entire Tour to Neutral Dubai / London Hub',
        description: 'Pay $7,500,000 in emergency logistics, stadium charters, and luxury hotels to preserve full broadcast television revenue.',
        cost: 7500000,
        fanTrustImpact: 8,
        boardStabilityImpact: 12,
        teamMoraleImpact: 5,
        verdictText: 'Diplomatic crisis averted! Neutral venue staged spectacular cricket with full broadcast syndication preserved.'
      },
      {
        id: 'opt-cancel-tour',
        label: 'Honor Foreign Office Directive: Cancel the Series',
        description: 'Declare force majeure. Forfeit prospective series broadcast revenue and pay $10,000,000 in cancellation damages.',
        cost: 10000000,
        fanTrustImpact: -15,
        boardStabilityImpact: 5,
        teamMoraleImpact: -12,
        verdictText: 'National sovereign policy was honored, though financial sheets bled heavily from aborted broadcasting commitments.'
      },
      {
        id: 'opt-presidential-security',
        label: 'Guarantee Head-of-State Presidential Security Escort',
        description: 'Underwrite $5,000,000 in armored motorcades, elite commando details, and secure hotel bio-bubbles.',
        cost: 5000000,
        fanTrustImpact: 12,
        boardStabilityImpact: 15,
        teamMoraleImpact: 8,
        verdictText: 'Impenetrable security Protocols were successfully delivered. Touring squad praised the chairman for five-star hospitality.'
      }
    ]
  },
  {
    title: 'VIP Gate Stampede & Counterfeit Ticket Scalping Racket',
    category: 'Gate & Protocol Chaos',
    severity: 'High Alert',
    source: 'Metropolitan Police Commissioner & Stadium Security',
    description: 'During a sold-out blockbuster encounter, over 15,000 angry fans with counterfeit tickets were locked out, triggering clashes outside Gate 4 and international broadcast interruptions.',
    options: [
      {
        id: 'opt-full-refund-upgrade',
        label: 'Issue Instant Digital Ticket Refunds & $3M Stadium Tech Upgrade',
        description: 'Compensate all affected supporters with full refunds ($2,000,000) and install biometric facial entry turnstiles ($3,000,000).',
        cost: 5000000,
        fanTrustImpact: 16,
        boardStabilityImpact: 9,
        teamMoraleImpact: 4,
        verdictText: 'Fans commended the swift executive refunds. Turnstiles upgraded to world-class aviation-grade security.'
      },
      {
        id: 'opt-blame-police',
        label: 'Deflect Blame onto Municipal Police Logistics',
        description: 'Issue official statement placing entire responsibility on municipal crowd marshals without paying compensation.',
        cost: 0,
        fanTrustImpact: -22,
        boardStabilityImpact: -14,
        teamMoraleImpact: 0,
        verdictText: 'A PR disaster. Supporters protested outside the cricket headquarters, causing fan trust to crater.'
      },
      {
        id: 'opt-stadium-voucher',
        label: 'Provide Free Concession Vouchers & Merchandise Kits',
        description: 'Distribute $1,200,000 worth of official merchandise apparel and premium catering passes for future encounters.',
        cost: 1200000,
        fanTrustImpact: 6,
        boardStabilityImpact: 3,
        teamMoraleImpact: 2,
        verdictText: 'The fan grievance council accepted the goodwill gesture, cooling off the immediate social media storm.'
      }
    ]
  }
];

export function generateCrisis(country: BoardCountry, chairmanName: string, squad: Player[]): CrisisEvent {
  const seed = PRESET_CRISES[Math.floor(Math.random() * PRESET_CRISES.length)];
  return {
    id: `crisis-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: seed.title,
    category: seed.category,
    severity: seed.severity,
    source: seed.source,
    description: seed.description,
    options: seed.options.map((opt) => ({ ...opt })),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}
