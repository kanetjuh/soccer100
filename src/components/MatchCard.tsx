import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Match } from '../types';
import { Clock } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const navigate = useNavigate();
  
  if (!match) return null;

  // Function to process logo URL
  const getLogoUrl = (url: string | undefined): string => {
    if (!url) return "https://scdn.monster/api/img/football/league/default";
    
    // If it's a direct HTTPS URL, use it as is
    if (url.startsWith('https://')) {
      return url;
    }
    
    // Otherwise, assume it's a league code and construct the URL
    return `https://scdn.monster/api/img/football/league/${url}`;
  };

  // Check if match is live (includes minutes, HT, or PENS)
  const isLiveMatch = match.time.includes("'") || match.time === "HT" || match.time === "PENS";
  
  // Check if match is finished (FT or FT+Pens)
  const isFinished = match.time === "FT" || match.time === "FT+Pens";
  
  // Determine if match is scheduled (has time in HH:MM format)
  const isScheduled = /^\d{2}:\d{2}$/.test(match.time);
  
  // Get scores with default of 0
  const homeScore = match.homeScore ?? 0;
  const awayScore = match.awayScore ?? 0;

  // Determine if it's a 0-0 match
  const isZeroZero = homeScore === 0 && awayScore === 0;

  // Style conditions
  const shouldBeGray = isScheduled || (isLiveMatch && isZeroZero);
  const isHomeWinning = (isLiveMatch || isFinished) && !isZeroZero && homeScore > awayScore;
  const isAwayWinning = (isLiveMatch || isFinished) && !isZeroZero && awayScore > homeScore;

  // Time display styling
  const timeColor = (match.time === "HT" || match.time.includes("'")) ? "text-yellow-500" : "text-gray-400";

  // Generate match URL
  const matchUrl = `/match/${match.league.toLowerCase().replace(/\s+/g, '-')}/${match.homeTeam.toLowerCase().replace(/\s+/g, '-')}-vs-${match.awayTeam.toLowerCase().replace(/\s+/g, '-')}/${match.id}`;

  const handleMatchClick = () => {
    navigate(matchUrl);
  };

  return (
    <div 
      onClick={handleMatchClick}
      className="flex items-center py-4 px-4 hover:bg-[#1c1e23] transition-colors cursor-pointer group"
    >
      {/* Home Team */}
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform">
          <img 
            src={getLogoUrl(match.homeTeamLogo)}
            alt={match.homeTeam}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://scdn.monster/api/img/football/league/default";
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className={`${isHomeWinning ? 'text-white font-bold' : 'text-gray-400'} group-hover:text-white transition-colors`}>
            {match.homeTeam}
          </span>
          <span className={`text-2xl ${isHomeWinning ? 'text-white font-bold' : shouldBeGray ? 'text-gray-400' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            {homeScore}
          </span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center justify-center min-w-[120px]">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <Clock className={`w-4 h-4 ${isLiveMatch ? 'text-yellow-500 animate-pulse' : 'text-gray-400'}`} />
          <span className={`text-sm font-medium ${timeColor}`}>{match.time}</span>
        </div>
        {isLiveMatch && (
          <div className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full mb-1 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
            LIVE
          </div>
        )}
        <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">VS</span>
      </div>

      {/* Away Team */}
      <div className="flex items-center space-x-3 justify-end flex-1">
        <div className="flex flex-col items-end">
          <span className={`${isAwayWinning ? 'text-white font-bold' : 'text-gray-400'} group-hover:text-white transition-colors`}>
            {match.awayTeam}
          </span>
          <span className={`text-2xl ${isAwayWinning ? 'text-white font-bold' : shouldBeGray ? 'text-gray-400' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            {awayScore}
          </span>
        </div>
        <div className="w-12 h-12 flex-shrink-0 group-hover:scale-105 transition-transform">
          <img 
            src={getLogoUrl(match.awayTeamLogo)}
            alt={match.awayTeam}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://scdn.monster/api/img/football/league/default";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;