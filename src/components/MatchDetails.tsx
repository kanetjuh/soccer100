import React, { useState } from 'react';
import { Match, TimelineEvent, MatchStats, TableTeam, Player } from '../types';
import { Clock, MapPin, Calendar, Users, Tv, Signal, Trophy, Goal, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MatchDetailsProps {
  match: Match;
  apiData: any;
}

type TabType = 'info' | 'timeline' | 'stats' | 'table' | 'squad';

const MatchDetails: React.FC<MatchDetailsProps> = ({ match, apiData }) => {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const isLiveMatch = match.time.includes("'") || match.time === "HT" || match.time === "PENS";
  const timeColor = (match.time === "HT" || match.time.includes("'")) ? "text-yellow-500" : "text-gray-400";

  // Get available tabs based on data
  const getAvailableTabs = () => {
    const tabs: { id: TabType; label: string }[] = [{ id: 'info', label: 'Info' }];
    
    if (apiData?.kvts?.length > 0) {
      tabs.push({ id: 'timeline', label: 'Timeline' });
    }
    
    if (apiData?.ts?.length > 0) {
      tabs.push({ id: 'stats', label: 'Stats' });
    }
    
    if (apiData?.stg?.[0]?.stg?.length > 0) {
      tabs.push({ id: 'table', label: 'Table' });
    }
    
    if (apiData?.rst?.length > 0) {
      tabs.push({ id: 'squad', label: 'Squad' });
    }

    return tabs;
  };

  const tabs = getAvailableTabs();

  // Pre-match stats
  const getPreMatchStats = () => {
    const homeTeamStats = apiData?.ts?.find((t: any) => t.t.i === match.homeTeamId);
    const awayTeamStats = apiData?.ts?.find((t: any) => t.t.i === match.awayTeamId);

    if (!homeTeamStats || !awayTeamStats) return null;

    return (
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          {homeTeamStats.stsc.map((stat: any, index: number) => (
            <div key={stat.n} className="flex items-center justify-between">
              <span className="text-gray-400">{stat.lbl}</span>
              <div className="flex items-center gap-8">
                <span className="text-white font-medium">{stat.dv}</span>
                <span className="text-gray-400">{awayTeamStats.stsc[index].dv}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Table with highlighted teams
  const renderTable = () => {
    const table = apiData?.stg?.[0]?.stg;
    if (!table) return null;
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Team</th>
              <th className="text-center py-2">P</th>
              <th className="text-center py-2">W</th>
              <th className="text-center py-2">D</th>
              <th className="text-center py-2">L</th>
              <th className="text-center py-2">GF</th>
              <th className="text-center py-2">GA</th>
              <th className="text-center py-2">GD</th>
              <th className="text-center py-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((team: any) => {
              const isHomeTeam = team.i === match.homeTeamId;
              const isAwayTeam = team.i === match.awayTeamId;
              const isMatchTeam = isHomeTeam || isAwayTeam;
              
              return (
                <tr 
                  key={team.i} 
                  className={`border-t border-[#1f2227] text-sm ${
                    isMatchTeam 
                      ? 'bg-[#1c1e23] text-white font-bold' 
                      : 'text-gray-500'
                  }`}
                >
                  <td className="py-2">{team.stt.find((s: any) => s.n === 'rank')?.dv}</td>
                  <td className={`py-2 ${isMatchTeam ? 'text-white' : ''}`}>
                    {team.t}
                  </td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'gamesPlayed')?.dv}</td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'wins')?.dv}</td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'ties')?.dv}</td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'losses')?.dv}</td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'goalsFor')?.dv}</td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'goalsAgainst')?.dv}</td>
                  <td className="py-2 text-center">{team.stt.find((s: any) => s.n === 'pointDifferential')?.dv}</td>
                  <td className={`py-2 text-center ${isMatchTeam ? 'text-white font-bold' : ''}`}>
                    {team.stt.find((s: any) => s.n === 'points')?.dv}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  if (!apiData) {
    return null;
  }

  // Process timeline events from API
  const timelineEvents = apiData.kvts?.map((event: any) => ({
    id: event.id,
    type: event.type,
    text: event.text,
    shortText: event.shortText,
    period: event.period,
    clock: event.clock,
    team: event.team,
    participants: event.participants
  })) || [];

  // Process match stats from API
  const matchStats = apiData.ts?.map((team: any) => ({
    team: {
      name: team.t.n,
      abbreviation: team.t.ab
    },
    stats: team.stsc?.map((stat: any) => ({
      label: stat.lbl,
      value: stat.dv
    })) || []
  })) || [];

  // Process league table from API
  const tableTeams = apiData.stg?.[0]?.stg?.map((team: any) => ({
    name: team.t,
    position: parseInt(team.stt?.find((s: any) => s.n === 'rank')?.dv || '0'),
    played: parseInt(team.stt?.find((s: any) => s.n === 'gamesPlayed')?.dv || '0'),
    won: parseInt(team.stt?.find((s: any) => s.n === 'wins')?.dv || '0'),
    drawn: parseInt(team.stt?.find((s: any) => s.n === 'ties')?.dv || '0'),
    lost: parseInt(team.stt?.find((s: any) => s.n === 'losses')?.dv || '0'),
    goalsFor: parseInt(team.stt?.find((s: any) => s.n === 'goalsFor')?.dv || '0'),
    goalsAgainst: parseInt(team.stt?.find((s: any) => s.n === 'goalsAgainst')?.dv || '0'),
    points: parseInt(team.stt?.find((s: any) => s.n === 'points')?.dv || '0')
  })) || [];

  // Process squad data from API
  const homeTeamData = apiData.rst?.find((team: any) => team.ha === 'home');
  const awayTeamData = apiData.rst?.find((team: any) => team.ha === 'away');

  const homeSquad = homeTeamData?.rst?.map((player: any) => ({
    name: player.ath.dn,
    number: player.jsy,
    isStarting: player.srt,
    events: player.pls?.map((event: any) => ({
      type: event.yc ? 'yellow' : event.rc ? 'red' : event.spl ? 'goal' : 'substitution',
      minute: event.cl.dv
    }))
  })) || [];

  const awaySquad = awayTeamData?.rst?.map((player: any) => ({
    name: player.ath.dn,
    number: player.jsy,
    isStarting: player.srt,
    events: player.pls?.map((event: any) => ({
      type: event.yc ? 'yellow' : event.rc ? 'red' : event.spl ? 'goal' : 'substitution',
      minute: event.cl.dv
    }))
  })) || [];

  // Get form data
  const homeForm = apiData.bsc?.frm?.find((team: any) => team.t.i === homeTeamData?.t.i)?.evs || [];
  const awayForm = apiData.bsc?.frm?.find((team: any) => team.t.i === awayTeamData?.t.i)?.evs || [];

  // Get head to head data
  const h2hMatches = apiData.h2h?.evs || [];

  return (
    <div className="bg-[#0f1214] pt-24">
      {/* Match Header */}
      <div className="bg-[#14161a] border border-[#1f2227] rounded-lg overflow-hidden">
        <div className="px-4 py-8">
          {/* Teams and Score */}
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-3 items-center gap-8 w-full max-w-2xl mx-auto">
              {/* Home Team */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 transform hover:scale-110 transition-transform">
                  <img 
                    src={match.homeTeamLogo} 
                    alt={match.homeTeam}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-white text-xl font-bold">{match.homeTeam}</h2>
                <span className="text-gray-400 text-sm">{homeTeamData?.frt || 'TBD'}</span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center">
                <div className="text-6xl font-bold text-white mb-4 font-mono">
                  {apiData.h?.sc || '0'} - {apiData.a?.sc || '0'}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className={`w-5 h-5 ${isLiveMatch ? 'text-yellow-500 animate-pulse' : 'text-gray-400'}`} />
                  <span className={`font-medium ${timeColor} text-lg`}>{apiData.st?.tp?.dt || 'Not Started'}</span>
                </div>
                {isLiveMatch && (
                  <span className="text-sm bg-red-500/20 text-red-400 px-4 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    LIVE
                  </span>
                )}
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 transform hover:scale-110 transition-transform">
                  <img 
                    src={match.awayTeamLogo} 
                    alt={match.awayTeam}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h2 className="text-white text-xl font-bold">{match.awayTeam}</h2>
                <span className="text-gray-400 text-sm">{awayTeamData?.frt || 'TBD'}</span>
              </div>
            </div>

            {/* League Name */}
            <div className="mt-6 text-emerald-500 font-medium text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              {match.league}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-[#1f2227]">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-emerald-500 border-b-2 border-emerald-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
              <h3 className="text-white text-xl font-bold mb-6">Match Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDistanceToNow(new Date(apiData.d), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>{apiData.v?.fn || 'TBD'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>{match.league}</span>
                </div>
              </div>

              {/* Form Guide */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-4">Recent Form</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{match.homeTeam}:</span>
                    <div className="flex gap-1">
                      {homeForm.slice(0, 5).map((game: any, index: number) => (
                        <span
                          key={index}
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                            game.gr === 'W' ? 'bg-green-500/20 text-green-500' :
                            game.gr === 'D' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {game.gr}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{match.awayTeam}:</span>
                    <div className="flex gap-1">
                      {awayForm.slice(0, 5).map((game: any, index: number) => (
                        <span
                          key={index}
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                            game.gr === 'W' ? 'bg-green-500/20 text-green-500' :
                            game.gr === 'D' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {game.gr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Head to Head */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-4">Head to Head</h4>
                <div className="space-y-2">
                  {h2hMatches.slice(0, 5).map((match: any) => (
                    <div key={match.i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{match.lgn}</span>
                      <span className="text-white">{match.sc}</span>
                      <span className="text-gray-400">{new Date(match.gd).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!apiData?.st?.tp?.st?.includes('post') && getPreMatchStats()}
            </div>

            <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
              <h3 className="text-white text-xl font-bold mb-6">Stream Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Tv className="w-5 h-5" />
                  <span>Stream Quality: {match.streamQuality}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Signal className="w-5 h-5" />
                  <span>Multiple sources available</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
                Watch Stream
              </button>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && apiData?.kvts?.length > 0 && (
          <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
            <h3 className="text-white text-xl font-bold mb-6">Match Timeline</h3>
            <div className="space-y-6">
              {timelineEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-400 text-sm">{event.clock.displayValue}</span>
                    {event.type.text === 'Goal' && <Goal className="w-5 h-5 text-emerald-500" />}
                    {event.type.text === 'Yellow Card' && <div className="w-4 h-5 bg-yellow-500 rounded-sm" />}
                    {event.type.text === 'Red Card' && <div className="w-4 h-5 bg-red-500 rounded-sm" />}
                    {event.type.text === 'Substitution' && <ArrowRight className="w-5 h-5 text-blue-500" />}
                  </div>
                  <div>
                    <p className="text-white">{event.text}</p>
                    {event.participants && event.participants.length > 0 && (
                      <p className="text-gray-400 text-sm">
                        {event.participants.map(p => p.athlete.displayName).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && apiData?.ts?.length > 0 && (
          <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
            <h3 className="text-white text-xl font-bold mb-6">Match Statistics</h3>
            <div className="space-y-4">
              {matchStats[0]?.stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center">
                  <div className="w-1/3 text-right pr-4">
                    <span className="text-white">{matchStats[0].stats[index].value}</span>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-2 bg-[#1f2227] rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-emerald-500"
                        style={{
                          width: `${parseInt(matchStats[0].stats[index].value)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/3 pl-4">
                    <span className="text-white">{matchStats[1].stats[index].value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'table' && apiData?.stg?.[0]?.stg?.length > 0 && (
          <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
            <h3 className="text-white text-xl font-bold mb-6">League Table</h3>
            {renderTable()}
          </div>
        )}

        {activeTab === 'squad' && apiData?.rst?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Home Team Squad */}
            <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-bold">{match.homeTeam}</h3>
                <span className="text-gray-400">{homeTeamData?.frt || 'TBD'}</span>
              </div>
              <div className="space-y-2">
                {homeSquad.map((player) => (
                  <div
                    key={player.number}
                    className="flex items-center justify-between py-2 border-b border-[#1f2227] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 w-8">{player.number}</span>
                      <span className="text-white">{player.name}</span>
                      {!player.isStarting && (
                        <span className="text-xs text-gray-500">(Sub)</span>
                      )}
                    </div>
                    {player.events && player.events.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-400 text-sm">{event.minute}</span>
                        {event.type === 'goal' && <Goal className="w-4 h-4 text-emerald-500" />}
                        {event.type === 'yellow' && <div className="w-3 h-4 bg-yellow-500 rounded-sm" />}
                        {event.type === 'red' && <div className="w-3 h-4 bg-red-500 rounded-sm" />}
                        {event.type === 'substitution' && <ArrowRight className="w-4 h-4 text-blue-500" />}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Away Team Squad */}
            <div className="bg-[#14161a] rounded-lg border border-[#1f2227] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-bold">{match.awayTeam}</h3>
                <span className="text-gray-400">{awayTeamData?.frt || 'TBD'}</span>
              </div>
              <div className="space-y-2">
                {awaySquad.map((player) => (
                  <div
                    key={player.number}
                    className="flex items-center justify-between py-2 border-b border-[#1f2227] last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 w-8">{player.number}</span>
                      <span className="text-white">{player.name}</span>
                      {!player.isStarting && (
                        <span className="text-xs text-gray-500">(Sub)</span>
                      )}
                    </div>
                    {player.events && player.events.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-400 text-sm">{event.minute}</span>
                        {event.type === 'goal' && <Goal className="w-4 h-4 text-emerald-500" />}
                        {event.type === 'yellow' && <div className="w-3 h-4 bg-yellow-500 rounded-sm" />}
                        {event.type === 'red' && <div className="w-3 h-4 bg-red-500 rounded-sm" />}
                        {event.type === 'substitution' && <ArrowRight className="w-4 h-4 text-blue-500" />}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;