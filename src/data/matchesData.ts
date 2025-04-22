import { Match, Sport } from '../types';

export const liveMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    time: '45:00',
    isLive: true,
    streamQuality: 'HD',
    sport: 'soccer',
    homeTeamLogo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg',
    homeScore: 2,
    awayScore: 1
  },
  {
    id: '2',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    league: 'La Liga',
    time: '32:15',
    isLive: true,
    streamQuality: 'HD',
    sport: 'soccer',
    homeTeamLogo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    homeScore: 1,
    awayScore: 1
  },
  {
    id: '3',
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Golden State Warriors',
    league: 'NBA',
    time: '3rd QTR',
    isLive: true,
    streamQuality: 'HD',
    sport: 'basketball',
    homeTeamLogo: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg',
    homeScore: 87,
    awayScore: 82
  },
  {
    id: '4',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    league: 'Bundesliga',
    time: '67:30',
    isLive: true,
    streamQuality: 'HD',
    sport: 'soccer',
    homeTeamLogo: 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg',
    homeScore: 3,
    awayScore: 2
  },
  {
    id: '5',
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'San Francisco 49ers',
    league: 'NFL',
    time: '4th QTR',
    isLive: true,
    streamQuality: 'HD',
    sport: 'nfl',
    homeTeamLogo: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg',
    homeScore: 24,
    awayScore: 21
  },
];

export const upcomingMatches: Match[] = [
  {
    id: '6',
    homeTeam: 'Juventus',
    awayTeam: 'Inter Milan',
    league: 'Serie A',
    time: 'Today, 20:45',
    isLive: false,
    streamQuality: 'HD',
    sport: 'soccer',
    homeTeamLogo: 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg'
  },
  {
    id: '7',
    homeTeam: 'PSG',
    awayTeam: 'Monaco',
    league: 'Ligue 1',
    time: 'Tomorrow, 19:00',
    isLive: false,
    streamQuality: 'HD',
    sport: 'soccer',
    homeTeamLogo: 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg'
  },
  {
    id: '8',
    homeTeam: 'UFC 300: Pereira',
    awayTeam: 'Prochazka',
    league: 'UFC',
    time: 'Saturday, 22:00',
    isLive: false,
    streamQuality: 'HD',
    sport: 'mma',
    homeTeamLogo: 'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg'
  },
  {
    id: '9',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    time: 'Sunday, 16:30',
    isLive: false,
    streamQuality: 'HD',
    sport: 'soccer',
    homeTeamLogo: 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg'
  },
  {
    id: '10',
    homeTeam: 'Dallas Cowboys',
    awayTeam: 'Philadelphia Eagles',
    league: 'NFL',
    time: 'Sunday, 19:00',
    isLive: false,
    streamQuality: 'HD',
    sport: 'nfl',
    homeTeamLogo: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg',
    awayTeamLogo: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg'
  },
];

export const popularLeagues = [
  { id: '1', name: 'Premier League', sport: 'soccer', logoUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '2', name: 'La Liga', sport: 'soccer', logoUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '3', name: 'Serie A', sport: 'soccer', logoUrl: 'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '4', name: 'Bundesliga', sport: 'soccer', logoUrl: 'https://images.pexels.com/photos/3148452/pexels-photo-3148452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '5', name: 'Ligue 1', sport: 'soccer', logoUrl: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '6', name: 'NBA', sport: 'basketball', logoUrl: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '7', name: 'NFL', sport: 'nfl', logoUrl: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '8', name: 'UFC', sport: 'mma', logoUrl: 'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];