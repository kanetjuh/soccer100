import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchDetails from '../components/MatchDetails';
import NewsSection from '../components/NewsSection';
import { useMatches } from '../context/MatchContext';
import FooterSection from '../components/FooterSection';
import GoogleAd from '../components/GoogleAd';

const MatchDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { liveMatches, upcomingMatches } = useMatches();
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find the match in either live or upcoming matches
  const match = [...liveMatches, ...upcomingMatches].find(m => m.id === id);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://scdn.monster/api/game/football/eng.1/${id}`);
        const data = await response.json();
        setApiData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load match data');
        console.error('Error fetching match data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (match) {
      fetchMatchData();
    }
  }, [match, id]);

  if (!match) {
    return (
      <div className="min-h-screen bg-[#0f1214] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Match Not Found</h1>
            <p className="text-gray-400">The match you're looking for doesn't exist or has ended.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1214] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Loading match details...</h1>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1214] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Error Loading Match</h1>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1214] pt-20">
      <div className="relative max-w-[1920px] mx-auto">
        {/* Left Ad */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <GoogleAd />
        </div>

        {/* Right Ad */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 hidden xl:block">
          <GoogleAd />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 py-8">
          <div className="flex-1">
            <MatchDetails match={match} apiData={apiData} />
          </div>
          <div className="lg:w-80">
            <NewsSection />
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default MatchDetailsPage;