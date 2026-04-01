// Using logo.clearbit.com for reliable team logos
export const teamLogos: Record<string, string> = {
  "AFC Ajax": "https://img.icons8.com/color/48/ajax.png",
  "AC Milan": "https://img.icons8.com/color/48/ac-milan.png",
  "Inter Milan": "https://img.icons8.com/color/48/inter-milan.png",
  "SL Benfica": "https://img.icons8.com/color/48/benfica.png",
  "FC Porto": "https://img.icons8.com/color/48/fc-porto.png",
  "Arsenal FC": "https://img.icons8.com/color/48/arsenal.png",
  "Chelsea FC": "https://img.icons8.com/color/48/chelsea.png",
  "Manchester City": "https://img.icons8.com/color/48/manchester-city.png",
  "Bayern Munich": "https://img.icons8.com/color/48/bayern-munich.png",
  "Liverpool FC": "https://img.icons8.com/color/48/liverpool.png",
  "Juventus": "https://img.icons8.com/color/48/juventus.png",
  "AC Sparta Praha": "https://img.icons8.com/color/48/ac-sparta-praha.png",
};

export const getTeamLogo = (team: string): string | undefined => teamLogos[team];
