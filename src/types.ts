export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  time: string;
  isLive: boolean;
  streamQuality: 'HD' | 'SD' | 'LQ';
  sport: Sport;
  logoUrl?: string;
  venue?: string;
  kickoff?: string;
  streams?: Stream[];
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  homeScore?: number;
  awayScore?: number;
  timeInMinutes?: number;
  formation?: string;
}

export interface Stream {
  provider: string;
  channel: string;
  language: string;
  quality: string;
  ads: number;
  url: string;
}

export type Sport = 'soccer' | 'basketball' | 'nfl' | 'mma' | 'other';

export interface League {
  id: string;
  name: string;
  sport: Sport;
  logoUrl: string;
}

export interface TimelineEvent {
  id: string;
  type: {
    id: string;
    text: string;
  };
  text: string;
  shortText: string;
  period: {
    number: number;
  };
  clock: {
    value: number;
    displayValue: string;
  };
  team?: {
    id: string;
    displayName: string;
  };
  participants?: {
    athlete: {
      displayName: string;
    };
  }[];
}

export interface MatchStats {
  team: {
    name: string;
    abbreviation: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export interface TableTeam {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  position: number;
}

export interface Player {
  name: string;
  number: string;
  position?: string;
  isStarting: boolean;
  events?: {
    type: string;
    minute: string;
  }[];
}