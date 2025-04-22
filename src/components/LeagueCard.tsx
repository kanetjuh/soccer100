import React from 'react';
import { Match } from '../types';
import MatchCard from './MatchCard';

interface League {
  id: string;
  name: string;
  sport: string;
  logoUrl?: string;
  slug?: string;
}

interface LeagueCardProps {
  league: League;
  matches: Match[];
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, matches = [] }) => {
  if (!matches) return null;

  // Get league slug from the first match's league property
  // Convert league name to slug format (e.g., "English Premier League" -> "eng.1")
  const getLeagueSlug = (leagueName: string): string => {
    const slugMap: Record<string, string> = {
      'English Premier League': 'eng.1',
      'English League Championship': 'eng.2',
      'Dutch KNVB Beker': 'ned.cup',
      // 'Saudi Pro League': 'ksa.1',
      'French Ligue 2': 'fra.2',
      'Swiss Super League': 'sui.1',
      'English League One': 'eng.3',
      'English League Two': 'eng.4',
      'English National League': 'eng.5',
      'Dutch Vrouwen Eredivisie': 'ned.w.1',
      'Swedish Allsvenskan': 'swe.1',
      'Danish Superliga': 'https://www.sportmonks.com/wp-content/uploads/2023/01/Danish-Superliga.png',
      'Turkish Super Lig': 'tur.1',
      'Spanish LALIGA 2': 'esp.2',
      'Bundesliga': 'ger.1',
      'Serie A': 'ita.1',
      'Ligue 1': 'fra.1',
      'Eredivisie': 'ned.1',
      'Primeira Liga': 'por.1',
      'Champions League': 'champions-league',
      'Europa League': 'europa-league',
      'Conference League': 'conference-league',
      'Brazilian Serie A': 'bra.1',
      'Brazilian Serie B': 'bra.2',
      'Spanish LALIGA': 'esp.1'
    };
    
    return slugMap[leagueName] || leagueName.toLowerCase().replace(/\s+/g, '-');
  };

  const leagueSlug = league.slug || getLeagueSlug(league.name);
  const leagueLogoUrl = `https://scdn.monster/api/img/football/league/${leagueSlug}`;

  return (
    <div className="bg-[#14161a] rounded-lg overflow-hidden border border-[#1f2227]">
      <div className="p-4 border-b border-[#1f2227] flex items-center space-x-3">
        <div className="w-8 h-8 flex-shrink-0">
          <img 
            src={leagueLogoUrl}
            alt={league.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to a default image if the league logo fails to load
              (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg";
            }}
          />
        </div>
        <h3 className="font-medium text-white">{league.name}</h3>
      </div>
      <div className="divide-y divide-[#1f2227]">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default LeagueCard;