// Map of team names to their logo URLs (official crest images)
export const teamLogos: Record<string, string> = {
  "AFC Ajax": "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Ajax_Amsterdam.svg/180px-Ajax_Amsterdam.svg.png",
  "AC Milan": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/180px-Logo_of_AC_Milan.svg.png",
  "Inter Milan": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/180px-FC_Internazionale_Milano_2021.svg.png",
  "SL Benfica": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/180px-SL_Benfica_logo.svg.png",
  "FC Porto": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/180px-FC_Porto.svg.png",
  "Arsenal FC": "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/180px-Arsenal_FC.svg.png",
  "Chelsea FC": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/180px-Chelsea_FC.svg.png",
  "Manchester City": "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/180px-Manchester_City_FC_badge.svg.png",
  "Bayern Munich": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/180px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
  "Liverpool FC": "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/180px-Liverpool_FC.svg.png",
  "Juventus": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Juventus_FC_-_pictogram.svg/180px-Juventus_FC_-_pictogram.svg.png",
  "AC Sparta Praha": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/AC_Sparta_Praha_logo.svg/180px-AC_Sparta_Praha_logo.svg.png",
};

export const getTeamLogo = (team: string): string | undefined => teamLogos[team];
