import React, { useState, useRef } from 'react';
import LeagueCard from './LeagueCard';
import { Filter, Search, X } from 'lucide-react';
import { Match } from '../types';
import { useMatches } from '../context/MatchContext';

type FilterType = 'all' | 'live' | 'finished' | 'upcoming';

const LiveSection: React.FC = () => {
  const { liveMatches: matches, loading, error } = useMatches();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const isLiveMatch = (match: Match) => {
    const timeStr = match.time.toLowerCase();
    return (
      timeStr.includes("'") || // Match minutes (e.g., "45'")
      timeStr === "ht" || // Halftime
      timeStr === "pens" || // Penalties
      timeStr.includes("qtr") || // Quarters for other sports
      match.isLive
    );
  };

  const isFinishedMatch = (match: Match) => {
    const timeStr = match.time.toLowerCase();
    return timeStr.includes('ft'); // This will match both "FT" and "FT+Pens"
  };

  const getMatchMinutes = (match: Match): number => {
    const timeStr = match.time.toLowerCase();
    if (timeStr.includes("'")) {
      const minutes = parseInt(timeStr);
      return isNaN(minutes) ? 0 : minutes;
    }
    return 0;
  };

  const getMatchPriority = (match: Match): number => {
    const timeStr = match.time.toLowerCase();
    
    // Special states
    if (timeStr === "ht") return 1000; // Highest priority for halftime
    if (timeStr === "pens") return 900; // Very high priority for penalties
    
    // Live matches priority based on minutes
    if (isLiveMatch(match)) {
      const minutes = getMatchMinutes(match);
      // Higher priority for matches closer to ending (90 minutes for soccer)
      return 800 + (minutes >= 90 ? 90 : minutes);
    }
    
    // Scheduled matches priority (negative to sort after live matches)
    if (/^\d{2}:\d{2}$/.test(timeStr)) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return -((hours * 60) + minutes); // Earlier times get higher priority
    }
    
    return 0;
  };

  const getMatchScore = (match: Match): number => {
    return (match.homeScore || 0) + (match.awayScore || 0);
  };

  // Filter and sort matches
  const processedMatches = matches
    .filter(match => {
      const matchesSearch = 
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (searchQuery.toLowerCase() === 'live') {
        return isLiveMatch(match);
      }

      switch (activeFilter) {
        case 'live':
          return isLiveMatch(match);
        case 'finished':
          return isFinishedMatch(match);
        case 'upcoming':
          return !isLiveMatch(match) && !isFinishedMatch(match) && match.time.match(/^\d{2}:\d{2}$/);
        default:
          return true;
      }
    })
    .sort((a, b) => {
      // First sort by live status
      const aIsLive = isLiveMatch(a);
      const bIsLive = isLiveMatch(b);
      if (aIsLive !== bIsLive) return bIsLive ? 1 : -1;

      // Then by match priority (time-based)
      const priorityDiff = getMatchPriority(b) - getMatchPriority(a);
      if (priorityDiff !== 0) return priorityDiff;

      // For matches with same priority, sort by total score (higher scores first)
      if (aIsLive && bIsLive) {
        return getMatchScore(b) - getMatchScore(a);
      }

      // For scheduled matches, sort by time (earliest first)
      if (!aIsLive && !bIsLive) {
        const aTime = a.time.split(':').map(Number);
        const bTime = b.time.split(':').map(Number);
        return (aTime[0] * 60 + aTime[1]) - (bTime[0] * 60 + bTime[1]);
      }

      return 0;
    });

  // Group matches by league
  const matchesByLeague = processedMatches.reduce((acc, match) => {
    if (!acc[match.league]) {
      acc[match.league] = [];
    }
    acc[match.league].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Matches', value: 'all' },
    { label: 'Live Now', value: 'live' },
    { label: 'Finished', value: 'finished' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  if (loading) {
    return (
      <section className="py-8 px-4 md:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4 md:px-8">
        <div className="text-center py-8 text-red-500">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Live Now
          </h2>
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#14161a] text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-[#1f2227]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center text-gray-300 hover:text-white text-sm bg-[#14161a] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
            >
              <Filter className="w-4 h-4 mr-1" />
              {filters.find(f => f.value === activeFilter)?.label || 'Filter'}
            </button>
            {isFilterMenuOpen && (
              <div 
                ref={filterMenuRef}
                className="absolute right-0 mt-2 w-48 bg-[#14161a] rounded-lg shadow-lg border border-[#1f2227] py-1 z-50"
              >
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setActiveFilter(filter.value);
                      setIsFilterMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      activeFilter === filter.value
                        ? 'bg-emerald-600/20 text-emerald-500'
                        : 'text-gray-300 hover:bg-[#1c1e23]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(matchesByLeague).map(([league, leagueMatches]) => (
          <LeagueCard 
            key={league}
            league={{
              id: league,
              name: league,
              sport: 'soccer',
              logoUrl: leagueMatches[0]?.logoUrl
            }}
            matches={leagueMatches}
          />
        ))}
      </div>
      
      {processedMatches.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400">
          No matches found {searchQuery && `for "${searchQuery}"`}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-[#14161a] hover:bg-[#1c1e23] text-white rounded-full transition-colors text-sm">
          View More Live Matches
        </button>
      </div>
    </section>
  );
};

export default LiveSection;