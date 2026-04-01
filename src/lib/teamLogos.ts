// Using football-data.org crests CDN (free, CORS-enabled)
export const teamLogos: Record<string, string> = {
  "AFC Ajax": "https://crests.football-data.org/678.png",
  "AC Milan": "https://crests.football-data.org/98.png",
  "Inter Milan": "https://crests.football-data.org/108.png",
  "SL Benfica": "https://crests.football-data.org/1903.png",
  "FC Porto": "https://crests.football-data.org/503.png",
  "Arsenal FC": "https://crests.football-data.org/57.png",
  "Chelsea FC": "https://crests.football-data.org/61.png",
  "Manchester City": "https://crests.football-data.org/65.png",
  "Bayern Munich": "https://crests.football-data.org/5.png",
  "Liverpool FC": "https://crests.football-data.org/64.png",
  "Juventus": "https://crests.football-data.org/109.png",
  "AC Sparta Praha": "https://crests.football-data.org/747.png",
};

export const getTeamLogo = (team: string): string | undefined => teamLogos[team];
