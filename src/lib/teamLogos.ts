// Using API-Football CDN for reliable team crest images
export const teamLogos: Record<string, string> = {
  "AFC Ajax": "https://media.api-sports.io/football/teams/194.png",
  "AC Milan": "https://media.api-sports.io/football/teams/489.png",
  "Inter Milan": "https://media.api-sports.io/football/teams/505.png",
  "SL Benfica": "https://media.api-sports.io/football/teams/211.png",
  "FC Porto": "https://media.api-sports.io/football/teams/212.png",
  "Arsenal FC": "https://media.api-sports.io/football/teams/42.png",
  "Chelsea FC": "https://media.api-sports.io/football/teams/49.png",
  "Manchester City": "https://media.api-sports.io/football/teams/50.png",
  "Bayern Munich": "https://media.api-sports.io/football/teams/157.png",
  "Liverpool FC": "https://media.api-sports.io/football/teams/40.png",
  "Juventus": "https://media.api-sports.io/football/teams/496.png",
  "AC Sparta Praha": "https://media.api-sports.io/football/teams/553.png",
};

export const getTeamLogo = (team: string): string | undefined => teamLogos[team];
