import React from 'react';
import LeagueCard from './LeagueCard';
import { popularLeagues } from '../data/matchesData';
import { Trophy } from 'lucide-react';

const PopularLeagues: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center justify-center">
          <Trophy className="w-6 h-6 mr-2 text-emerald-500" />
          Popular Leagues & Tournaments
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find streams for the biggest leagues and tournaments from around the world. 
          All in one place, always up to date.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {popularLeagues.map((league) => (
          <LeagueCard 
            key={league.id} 
            league={league}
            matches={[]} // Pass an empty array as matches if no matches are available
          />
        ))}
      </div>
    </section>
  );
};

export default PopularLeagues;