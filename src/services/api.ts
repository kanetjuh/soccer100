import axios from 'axios';
import { Match } from '../types';

const API_BASE_URL = 'https://scdn.monster/api/sport/football/';
const LOGO_BASE_URL = 'https://scdn.monster/api/img/soccer/';

const api = axios.create({
  baseURL: API_BASE_URL
});

interface ApiTeam {
  ab: string;
  sd: string;
  n: string;
  i: string;
}

interface ApiCompetitor {
  i: string;
  sc: number;
  t: ApiTeam;
}

interface ApiMatch {
  i: string;
  n: string;
  d: string;
  l: string;
  s: {
    cl: string;
    dc: string;
    tp: {
      i: string;
      cm: boolean;
      dsc: string;
      dt: string;
      n: string;
      sdt: string;
      st: string;
    };
  };
  c: ApiCompetitor[];
  v: {
    fn: string;
    i: string;
  };
}

interface ApiResponse {
  gs: ApiMatch[];
  lgn: string;
  slug: string;
}

const getTeamLogo = (teamId: string): string => {
  return `${LOGO_BASE_URL}${teamId}.png`;
};

const formatMatchTime = (timeStr: string): string => {
  if (!timeStr) return 'TBD';

  // For match minutes (e.g., "45'" or "45+2'"), keep as is
  if (timeStr.includes("'")) {
    return timeStr;
  }

  // For special states
  const lowerTimeStr = timeStr.toLowerCase();
  if (lowerTimeStr === 'halftime' || lowerTimeStr === 'half-time') {
    return 'HT';
  }
  if (lowerTimeStr === 'fulltime' || lowerTimeStr === 'full-time') {
    return 'FT';
  }
  if (lowerTimeStr === 'penalties' || lowerTimeStr === 'pens') {
    return 'PENS';
  }

  // For quarters (NBA, NFL)
  if (lowerTimeStr.includes('qtr') || lowerTimeStr.includes('quarter')) {
    return timeStr.replace('Quarter', 'QTR').replace('quarter', 'QTR');
  }

  // For full timestamps (e.g., "Mon, April 21st at 8:30 PM EDT")
  if (timeStr.includes('at')) {
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2}) (AM|PM)/i);
    if (timeMatch) {
      const [_, hours, minutes, period] = timeMatch;
      let hour = parseInt(hours);
      
      // Convert to 24-hour format
      if (period.toLowerCase() === 'pm' && hour < 12) hour += 12;
      if (period.toLowerCase() === 'am' && hour === 12) hour = 0;
      
      return `${String(hour).padStart(2, '0')}:${minutes}`;
    }
  }

  // For timestamps already in HH:MM format
  if (timeStr.includes(':')) {
    try {
      const [hours, minutes] = timeStr.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
    } catch (error) {
      console.warn('Error formatting time:', timeStr, error);
    }
  }

  return timeStr;
};

const transformMatch = (match: ApiMatch, leagueName: string): Match => {
  const homeTeam = match.c[0];
  const awayTeam = match.c[1];
  const formattedTime = formatMatchTime(match.s.cl);

  return {
    id: match.i,
    homeTeam: homeTeam.t.n,
    awayTeam: awayTeam.t.n,
    homeScore: homeTeam.sc,
    awayScore: awayTeam.sc,
    homeTeamLogo: getTeamLogo(homeTeam.t.i),
    awayTeamLogo: getTeamLogo(awayTeam.t.i),
    league: leagueName,
    time: formattedTime,
    isLive: match.s.tp.st === 'live',
    streamQuality: 'HD',
    sport: 'soccer',
    venue: match.v.fn,
    timeInMinutes: formattedTime.includes("'") ? parseInt(formattedTime) : undefined
  };
};

export const fetchLiveMatches = async (): Promise<Match[]> => {
  if (!navigator.onLine) {
    throw new Error('No internet connection available');
  }

  try {
    const response = await api.get('');
    
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid API response format');
    }

    const matches: Match[] = [];
    response.data.forEach((league: ApiResponse) => {
      const leagueMatches = league.gs.map(match => transformMatch(match, league.lgn));
      matches.push(...leagueMatches);
    });

    return matches;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('No response received from the API server');
      }
    }
    throw error;
  }
};

export const fetchUpcomingMatches = async (): Promise<Match[]> => {
  if (!navigator.onLine) {
    throw new Error('No internet connection available');
  }

  try {
    const response = await api.get('');
    
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid API response format');
    }

    const matches: Match[] = [];
    response.data.forEach((league: ApiResponse) => {
      const leagueMatches = league.gs
        .filter(match => match.s.tp.st === 'pre')
        .map(match => transformMatch(match, league.lgn));
      matches.push(...leagueMatches);
    });

    return matches;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        throw new Error('No response received from the API server');
      }
    }
    throw error;
  }
};