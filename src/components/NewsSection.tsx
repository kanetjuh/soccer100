import React from 'react';
import { ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  imageUrl: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Nottingham Forest reclaim PL top three spot with win over Tottenham',
    source: 'OneFootball',
    time: '2025-04-21T10:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg',
    link: '#'
  },
  {
    id: '2',
    title: 'Leeds and Burnley promoted to the Premier League',
    source: 'OneFootball',
    time: '2025-04-21T09:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    link: '#'
  },
  {
    id: '3',
    title: 'Leverkusen set deadline for Real Madrid decision as Alonso agreement revealed',
    source: 'The Football Faithful',
    time: '2025-04-21T08:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
    link: '#'
  },
  {
    id: '4',
    title: 'Guardiola on facing "impressive" Aston Villa at Etihad Stadium',
    source: 'Manchester City F.C.',
    time: '2025-04-21T07:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
    link: '#'
  }
];

const NewsSection: React.FC = () => {
  const [latestNews, ...otherNews] = newsItems;

  return (
    <section className="py-8 px-4">
      <h2 className="text-xl font-bold text-white mb-4">Top News</h2>
      <div className="space-y-4">
        {/* Latest news - larger card */}
        <a 
          href={latestNews.link}
          className="block bg-[#14161a] rounded-lg overflow-hidden hover:bg-[#1c1e23] transition-colors border border-[#1f2227] hover:border-emerald-500/50"
        >
          <div className="aspect-[16/9] relative">
            <img 
              src={latestNews.imageUrl} 
              alt={latestNews.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">
              {latestNews.title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{latestNews.source}</span>
              <div className="flex items-center">
                <span>{formatDistanceToNow(new Date(latestNews.time), { addSuffix: true })}</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </a>

        {/* Other news - smaller cards */}
        {otherNews.map((item) => (
          <a 
            key={item.id}
            href={item.link}
            className="flex items-center gap-3 bg-[#14161a] rounded-lg overflow-hidden hover:bg-[#1c1e23] transition-colors border border-[#1f2227] hover:border-emerald-500/50"
          >
            <div className="w-24 h-24 flex-shrink-0">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-2 pr-3 min-w-0">
              <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.source}</span>
                <div className="flex items-center whitespace-nowrap">
                  <span>{formatDistanceToNow(new Date(item.time), { addSuffix: true })}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;