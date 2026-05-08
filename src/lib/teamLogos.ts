// Re-export from the centralized EFC data source.
// All team / country / region data lives in src/lib/efcData.ts
export { getTeamLogo, getTeamLogoFallback, KNOWN_CLUB_LOGOS as teamLogos } from "./efcData";
