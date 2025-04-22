import React, { createContext, useContext, useState, useEffect } from 'react';
import { Match } from '../types';
import { fetchLiveMatches, fetchUpcomingMatches } from '../services/api';

interface MatchContextType {
  liveMatches: Match[];
  upcomingMatches: Match[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const MatchContext = createContext<MatchContextType>({
  liveMatches: [],
  upcomingMatches: [],
  loading: true,
  error: null,
  refreshData: async () => {},
});

export const useMatches = () => useContext(MatchContext);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [live, upcoming] = await Promise.all([
        fetchLiveMatches(),
        fetchUpcomingMatches()
      ]);
      setLiveMatches(live);
      setUpcomingMatches(upcoming);
    } catch (err) {
      console.error('Failed to fetch matches:', err);
      setError('Failed to load matches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    // Refresh data every minute
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MatchContext.Provider 
      value={{ 
        liveMatches, 
        upcomingMatches, 
        loading, 
        error,
        refreshData: fetchAllData
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};