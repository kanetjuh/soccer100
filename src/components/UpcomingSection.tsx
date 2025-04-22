import React, { useState } from 'react';
import MatchCard from './MatchCard';
import { CalendarDays, WifiOff } from 'lucide-react';
import { useMatches } from '../context/MatchContext';

const UpcomingSection: React.FC = () => {
  const { upcomingMatches: matches, loading, error } = useMatches();
  const [selectedPeriod, setSelectedPeriod] = useState('All');

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
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <WifiOff className="w-12 h-12 text-red-500" />
          <div className="text-red-500 text-center">
            <p className="font-semibold mb-2">Unable to load matches</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 md:px-8 bg-[#0f1214]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <CalendarDays className="w-5 h-5 mr-2 text-emerald-500" />
          Upcoming Matches
        </h2>
        <div className="flex space-x-2">
          {['All', 'Today', 'Tomorrow', 'This Week'].map((period) => (
            <button 
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                period === selectedPeriod
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#14161a] text-gray-300 hover:bg-[#1c1e23]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="px-6 py-2 bg-[#14161a] hover:bg-[#1c1e23] text-white rounded-full transition-colors text-sm">
          View Full Schedule
        </button>
      </div>
    </section>
  );
};

export default UpcomingSection;