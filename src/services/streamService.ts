import axios from 'axios';
import * as cheerio from 'cheerio';
import { Match, Stream } from '../types';
import { format } from 'date-fns';

const STREAM_SOURCES = [
  {
    name: 'OVO Gola',
    baseUrl: 'https://ovo-gola.com',
    matchPattern: '/soccerstreams'
  },
  {
    name: 'LikeStream',
    baseUrl: 'https://likestream.io',
    matchPattern: '/soccer'
  }
];

async function scrapeStreams(matchId: string): Promise<Stream[]> {
  const streams: Stream[] = [];
  
  for (const source of STREAM_SOURCES) {
    try {
      const response = await axios.get(`${source.baseUrl}${source.matchPattern}/${matchId}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      $('.stream-container').each((_, element) => {
        const streamElement = $(element);
        streams.push({
          provider: source.name,
          channel: streamElement.find('.channel-name').text(),
          language: streamElement.find('.language').text() || 'English',
          quality: streamElement.find('.quality').text() || 'HD',
          ads: parseInt(streamElement.find('.ads-count').text()) || 1,
          url: streamElement.find('.stream-link').attr('href') || `${source.baseUrl}${source.matchPattern}/${matchId}`
        });
      });
    } catch (error) {
      console.error(`Failed to scrape streams from ${source.name}:`, error);
    }
  }

  return streams;
}

function getMockMatches(): Match[] {
  return [
    {
      id: 'tottenham-mancity',
      homeTeam: 'Tottenham',
      awayTeam: 'Manchester City',
      league: 'English Premier League',
      time: 'LIVE',
      isLive: true,
      streamQuality: 'HD',
      sport: 'soccer',
      venue: 'Tottenham Hotspur Stadium',
      kickoff: '2025-04-21T21:00:00Z',
      logoUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
      streams: [
        {
          provider: 'SoccerHD',
          channel: 'Sky Premier League HD',
          language: 'English',
          quality: 'HD',
          ads: 1,
          url: 'https://soccerhd.com/match/tottenham-vs-mancity'
        },
        {
          provider: 'MazyStreams',
          channel: 'ESPN+',
          language: 'English',
          quality: 'HD',
          ads: 2,
          url: 'https://mazystreams.xyz/epl/tot-mc'
        }
      ]
    },
    {
      id: 'arsenal-liverpool',
      homeTeam: 'Arsenal',
      awayTeam: 'Liverpool',
      league: 'English Premier League',
      time: 'LIVE',
      isLive: true,
      streamQuality: 'HD',
      sport: 'soccer',
      venue: 'Emirates Stadium',
      kickoff: '2025-04-21T21:00:00Z',
      logoUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
      streams: [
        {
          provider: 'SoccerHD',
          channel: 'Sky Sports Main Event',
          language: 'English',
          quality: 'HD',
          ads: 1,
          url: 'https://soccerhd.com/match/arsenal-vs-liverpool'
        },
        {
          provider: 'StreamHunter',
          channel: 'BT Sport 1',
          language: 'English',
          quality: 'HD',
          ads: 2,
          url: 'https://streamhunter.net/soccer/arsenal-liverpool'
        }
      ]
    },
    {
      id: 'feyenoord-nec',
      homeTeam: 'Feyenoord',
      awayTeam: 'NEC',
      league: 'Dutch KNVB Beker',
      time: 'LIVE',
      isLive: true,
      streamQuality: 'HD',
      sport: 'soccer',
      venue: 'Stadion Feijenoord',
      kickoff: '2025-04-21T18:00:00Z',
      logoUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      streams: [
        {
          provider: 'ovostreams',
          channel: 'SuperSports ENG HD',
          language: 'English',
          quality: 'HD',
          ads: 1,
          url: 'https://ovostreams.com/soccer/feyenoord-vs-nec'
        },
        {
          provider: 'LikeStream.io',
          channel: 'Sky Go UK',
          language: 'English',
          quality: 'HD',
          ads: 1,
          url: 'https://likestream.io/match/feyenoord-nec'
        }
      ]
    }
  ];
}

async function fetchMatchData(): Promise<Match[]> {
  return getMockMatches();
}

export const fetchLiveMatches = async (): Promise<Match[]> => {
  return fetchMatchData();
};

export const formatKickoff = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy h:mm a');
};