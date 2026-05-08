import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Star,
  Flame,
  Award,
  Heart,
  MessageCircle,
  Users,
  X,
  Filter,
  CalendarIcon,
} from "lucide-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getUserAvatarUrl } from "@/lib/userAvatar";
const levels = [
  { level: 1, title: "Member", pointsRequired: 0, badge: "⚽" },
  { level: 2, title: "Silver", pointsRequired: 50, badge: "🥈" },
  { level: 3, title: "Gold", pointsRequired: 150, badge: "🥇" },
  { level: 4, title: "Platinum", pointsRequired: 400, badge: "🏆" },
  { level: 5, title: "Diamond", pointsRequired: 800, badge: "💎" },
  { level: 6, title: "Elite", pointsRequired: 1500, badge: "👑" },
];

const allBadges = [
  { id: "first-post", label: "First Post", icon: "📝", description: "Published your first post" },
  { id: "10-likes", label: "10 Likes", icon: "❤️", description: "Received 10 likes" },
  { id: "50-likes", label: "50 Likes", icon: "💖", description: "Received 50 likes" },
  { id: "100-likes", label: "Century Club", icon: "💯", description: "Received 100 likes" },
  { id: "commenter", label: "Commenter", icon: "💬", description: "Left 25 comments" },
  { id: "networker", label: "Networker", icon: "🤝", description: "Connected with 10 people" },
  { id: "streak-7", label: "7-Day Streak", icon: "🔥", description: "7-day activity streak" },
  { id: "streak-30", label: "30-Day Streak", icon: "⚡", description: "30-day activity streak" },
  { id: "event-star", label: "Event Star", icon: "🌟", description: "Attended 5 events" },
  { id: "team-player", label: "Team Player", icon: "⛹️", description: "Active in 3+ groups" },
  { id: "top-10", label: "Top 10", icon: "🏅", description: "Reached top 10 ranking" },
  { id: "mentor", label: "Mentor", icon: "🎓", description: "Helped 5 new members" },
];

import { EFC_REGIONS, normalizeMember } from "@/lib/efcData";
const regions = ["All Regions", ...EFC_REGIONS];

const disciplines = [
  "All Disciplines",
  "Sport & Exercise",
  "Nutrition",
  "Physiotherapy",
  "Sport Psychology",
  "Performance Analysis",
  "Coaching",
  "Fitness & Conditioning",
  "Scouting",
  "Management",
  "Commercial",
  "Business Development",
  "Community",
];

// Discipline mapping for dummy users based on their role
const roleToDiscipline: Record<string, string> = {
  "Head of Performance": "Performance Analysis",
  "Sports Nutritionist": "Nutrition",
  "Lead Physiotherapist": "Physiotherapy",
  "Sport Psychologist": "Sport Psychology",
  "Rehabilitation Specialist": "Physiotherapy",
  "Strength & Conditioning Coach": "Fitness & Conditioning",
  "Exercise Physiologist": "Sport & Exercise",
  "Performance Analyst": "Performance Analysis",
  "Sr. Head of Commercial": "Commercial",
  "Business Development Manager": "Business Development",
  "Community Leader": "Community",
  Member: "Sport & Exercise",
};

// Static leaderboard entries (non-dummy users)
const staticLeaderboard = [
  {
    name: "Casey Nguyen",
    likes: 420,
    comments: 350,
    networking: 280,
    streak: 45,
    change: "+110",
    region: "Americas",
    team: "LA Galaxy",
    discipline: "Coaching",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "streak-30",
      "event-star",
      "top-10",
      "mentor",
    ],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jamie Lawson",
    likes: 380,
    comments: 310,
    networking: 260,
    streak: 38,
    change: "+95",
    region: "Europe",
    team: "AC Milan",
    discipline: "Nutrition",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "streak-30",
      "event-star",
      "top-10",
    ],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Chris Rodriguez",
    likes: 210,
    comments: 170,
    networking: 140,
    streak: 22,
    change: "+80",
    region: "Europe",
    team: "Sevilla FC",
    discipline: "Physiotherapy",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "event-star",
    ],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Sarah Mitchell",
    likes: 75,
    comments: 65,
    networking: 50,
    streak: 30,
    change: "+65",
    region: "Europe",
    team: "Chelsea FC",
    discipline: "Sport & Exercise",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "networker", "streak-7", "streak-30"],
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Morgan Davis",
    likes: 35,
    comments: 28,
    networking: 22,
    streak: 12,
    change: "+40",
    region: "Europe",
    team: "RB Leipzig",
    discipline: "Coaching",
    earnedBadges: ["first-post", "10-likes", "commenter", "streak-7"],
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jordan Blake",
    likes: 8,
    comments: 7,
    networking: 5,
    streak: 5,
    change: "+20",
    region: "Africa",
    team: "Al Ahly",
    discipline: "Scouting",
    earnedBadges: ["first-post", "10-likes"],
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Yuki Tanaka",
    likes: 340,
    comments: 290,
    networking: 240,
    streak: 35,
    change: "+88",
    region: "Europe",
    team: "Aberdeen FC",
    discipline: "Performance Analysis",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "streak-30",
      "top-10",
    ],
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Oliver Smith",
    likes: 190,
    comments: 160,
    networking: 130,
    streak: 20,
    change: "+72",
    region: "Europe",
    team: "Arsenal FC",
    discipline: "Sport Psychology",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "event-star",
      "team-player",
    ],
    photo: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Fatima Al-Rashid",
    likes: 140,
    comments: 115,
    networking: 95,
    streak: 28,
    change: "+60",
    region: "Africa",
    team: "Wydad AC",
    discipline: "Fitness & Conditioning",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "networker", "streak-7", "event-star"],
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Liam O'Brien",
    likes: 105,
    comments: 85,
    networking: 70,
    streak: 15,
    change: "+55",
    region: "Europe",
    team: "Celtic FC",
    discipline: "Management",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "networker", "streak-7"],
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Lara Johnson",
    likes: 38,
    comments: 32,
    networking: 25,
    streak: 14,
    change: "+38",
    region: "Europe",
    team: "Juventus",
    discipline: "Nutrition",
    earnedBadges: ["first-post", "10-likes", "commenter", "streak-7"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  },
];

// Predefined stats for dummy users by id
const dummyUserStats: Record<
  string,
  { likes: number; comments: number; networking: number; streak: number; change: string; earnedBadges: string[] }
> = {
  u1: {
    likes: 310,
    comments: 260,
    networking: 210,
    streak: 32,
    change: "+85",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "streak-30",
      "top-10",
    ],
  },
  u2: {
    likes: 245,
    comments: 200,
    networking: 165,
    streak: 25,
    change: "+75",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "event-star",
    ],
  },
  u3: {
    likes: 180,
    comments: 150,
    networking: 120,
    streak: 18,
    change: "+68",
    earnedBadges: ["first-post", "10-likes", "50-likes", "100-likes", "commenter", "networker", "streak-7"],
  },
  u4: {
    likes: 160,
    comments: 135,
    networking: 110,
    streak: 21,
    change: "+62",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "event-star",
    ],
  },
  u5: {
    likes: 130,
    comments: 105,
    networking: 85,
    streak: 16,
    change: "+55",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "networker", "streak-7"],
  },
  u6: {
    likes: 95,
    comments: 80,
    networking: 65,
    streak: 14,
    change: "+48",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "networker", "streak-7"],
  },
  u7: {
    likes: 85,
    comments: 70,
    networking: 55,
    streak: 11,
    change: "+42",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "streak-7"],
  },
  u8: {
    likes: 70,
    comments: 58,
    networking: 45,
    streak: 9,
    change: "+35",
    earnedBadges: ["first-post", "10-likes", "50-likes", "commenter", "streak-7"],
  },
  u9: {
    likes: 55,
    comments: 45,
    networking: 35,
    streak: 8,
    change: "+30",
    earnedBadges: ["first-post", "10-likes", "commenter", "streak-7"],
  },
  u10: {
    likes: 42,
    comments: 35,
    networking: 28,
    streak: 7,
    change: "+25",
    earnedBadges: ["first-post", "10-likes", "commenter"],
  },
  u11: {
    likes: 200,
    comments: 170,
    networking: 140,
    streak: 24,
    change: "+78",
    earnedBadges: [
      "first-post",
      "10-likes",
      "50-likes",
      "100-likes",
      "commenter",
      "networker",
      "streak-7",
      "streak-30",
      "event-star",
      "team-player",
    ],
  },
};

type LeaderboardEntry = {
  rank: number;
  name: string;
  likes: number;
  comments: number;
  networking: number;
  level: number;
  streak: number;
  badge: string;
  change: string;
  region: string;
  team: string;
  discipline: string;
  earnedBadges: string[];
  photo?: string;
};

function getLevelTitle(level: number) {
  return levels.find((l) => l.level === level)?.title ?? "";
}

function getLevelProgress(xp: number) {
  const currentLevel = levels.filter((l) => xp >= l.pointsRequired).pop()!;
  const nextLevel = levels.find((l) => l.level === currentLevel.level + 1);
  if (!nextLevel) return 100;
  const range = nextLevel.pointsRequired - currentLevel.pointsRequired;
  const progress = xp - currentLevel.pointsRequired;
  return Math.round((progress / range) * 100);
}

function getNextLevelMpu(level: number) {
  const next = levels.find((l) => l.level === level + 1);
  return next ? next.pointsRequired : 9999;
}

function EarnedBadges({ badgeIds }: { badgeIds: string[] }) {
  const earned = allBadges.filter((b) => badgeIds.includes(b.id));
  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-muted-foreground mb-2">Earned Badges</p>
      <div className="flex flex-wrap gap-2">
        {earned.map((b) => (
          <div
            key={b.id}
            title={b.description}
            className="group relative inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
          >
            <span className="text-sm">{b.icon}</span>
            <span>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const { users, user: currentAuthUser } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedDiscipline, setSelectedDiscipline] = useState("All Disciplines");
  const [timePeriod, setTimePeriod] = useState("This Month");
  const [selectedMember, setSelectedMember] = useState<LeaderboardEntry | null>(null);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  const getMpu = (m: { likes: number; comments: number; networking: number }) => m.likes + m.comments + m.networking;

  const getLevel = (mpu: number) => {
    const lvl = levels.filter((l) => mpu >= l.pointsRequired).pop()!;
    return lvl;
  };

  // Build full leaderboard merging dummy users + static entries
  const leaderboard = useMemo(() => {
    const entries: Omit<LeaderboardEntry, "rank">[] = [];

    // Add dummy users from auth context
    users.forEach((u) => {
      const stats = dummyUserStats[u.id];
      if (!stats) return;
      const name = `${u.firstName} ${u.lastName}`;
      const mpu = stats.likes + stats.comments + stats.networking;
      const lvl = getLevel(mpu);
      const norm = normalizeMember(u.country, u.club);
      entries.push({
        name,
        likes: stats.likes,
        comments: stats.comments,
        networking: stats.networking,
        level: lvl.level,
        streak: stats.streak,
        badge: lvl.badge,
        change: stats.change,
        region: norm.region,
        team: norm.team,
        discipline: roleToDiscipline[u.role] || "Sport & Exercise",
        earnedBadges: stats.earnedBadges,
        photo: getUserAvatarUrl(u.firstName, u.lastName),
      });
    });

    // Add static entries (avoid duplicates by name) — pass through normalizer
    const existingNames = new Set(entries.map((e) => e.name));
    staticLeaderboard.forEach((s) => {
      if (existingNames.has(s.name)) return;
      const mpu = s.likes + s.comments + s.networking;
      const lvl = getLevel(mpu);
      const norm = normalizeMember(undefined, s.team);
      entries.push({
        ...s,
        team: norm.team,
        region: norm.region,
        level: lvl.level,
        badge: lvl.badge,
      });
    });
    // Sort by MPU descending and assign sequential ranks
    entries.sort((a, b) => getMpu(b) - getMpu(a));
    return entries.map((e, i) => ({ ...e, rank: i + 1 }));
  }, [users]);

  const filteredLeaderboard = leaderboard.filter((m) => {
    if (selectedRegion !== "All Regions" && m.region !== selectedRegion) return false;
    if (selectedDiscipline !== "All Disciplines" && m.discipline !== selectedDiscipline) return false;
    return true;
  });

  const currentUserName = currentAuthUser
    ? `${currentAuthUser.firstName} ${currentAuthUser.lastName}`
    : "Sarah Mitchell";
  const displayMember = selectedMember || leaderboard.find((m) => m.name === currentUserName) || leaderboard[0];
  const displayMpu = getMpu(displayMember);
  const displayNextMpu = getNextLevelMpu(displayMember.level);
  const isViewingOther = selectedMember && selectedMember.name !== currentUserName;

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Earn MPU Points through likes, comments & networking. Level up and unlock badges!
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div variants={item}>
        <div className="rounded-lg border border-border bg-card p-6 shadow-card relative">
          {isViewingOther && (
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={displayMember.photo} alt={displayMember.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                    {displayMember.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {displayMember.level}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{displayMember.name}</p>
                <p className="text-sm text-muted-foreground">{displayMpu} MPU Points</p>
              </div>
            </div>
            <div className="sm:ml-auto text-center sm:text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
                <Award className="h-4 w-4" /> Level {displayMember.level} — {getLevelTitle(displayMember.level)}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                {isViewingOther ? `Rank #${displayMember.rank}` : "Top 36% of members"}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Level {displayMember.level}</span>
              <span>
                {displayMpu} / {displayNextMpu} MPU Points
              </span>
              <span>Level {displayMember.level + 1}</span>
            </div>
            <Progress value={getLevelProgress(displayMpu)} className="h-2" />
          </div>

          <EarnedBadges badgeIds={displayMember.earnedBadges} />
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Star className="h-4 w-4 text-warning" /> Total MPU Points
          </div>
          <p className="text-2xl font-semibold text-foreground">{displayMpu}</p>
          <p className="text-xs text-success mt-1">{displayMember.change} this week</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4 text-primary" /> {isViewingOther ? "Their" : "Your"} Rank
          </div>
          <p className="text-2xl font-semibold text-foreground">#{displayMember.rank}</p>
          <p className="text-xs text-success mt-1">↑ 2 positions</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Flame className="h-4 w-4 text-destructive" /> Streak
          </div>
          <p className="text-2xl font-semibold text-foreground">{displayMember.streak} days</p>
          <p className="text-xs text-muted-foreground mt-1">
            {displayMember.streak >= 30 ? "Personal best!" : "Keep it up!"}
          </p>
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center justify-between p-5 pb-3 gap-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" /> Leaderboard
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              {["All Time", "This Month", "This Week"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTimePeriod(f)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium transition-all",
                    timePeriod === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <select
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 w-[100px] justify-start text-left text-xs font-medium",
                      !dateFrom && "text-muted-foreground",
                    )}
                  >
                    {dateFrom ? format(dateFrom, "dd MMM") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <span className="text-xs text-muted-foreground">–</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 w-[100px] justify-start text-left text-xs font-medium",
                      !dateTo && "text-muted-foreground",
                    )}
                  >
                    {dateTo ? format(dateTo, "dd MMM") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed min-w-[950px]">
            <colgroup>
              <col className="w-[5%]" />
              <col className="w-[18%]" />
              <col className="w-[14%]" />
              <col className="w-[9%]" />
              <col className="w-[12%]" />
              <col className="w-[8%]" />
              <col className="w-[8%]" />
              <col className="w-[9%]" />
              <col className="w-[9%]" />
              <col className="w-[8%]" />
            </colgroup>
            <thead>
              <tr className="border-t border-border bg-muted/40">
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Rank</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Discipline</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Region</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-muted-foreground">Team</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-muted-foreground">Level</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3 w-3" /> Likes
                  </span>
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> Comments
                  </span>
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> Networking
                  </span>
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-muted-foreground">MPU Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaderboard.map((m, i) => {
                const mpu = getMpu(m);
                const isSelected = selectedMember?.name === m.name;
                return (
                  <tr
                    key={m.rank}
                    onClick={() => setSelectedMember(m)}
                    className={cn(
                      "hover:bg-muted/30 transition-colors cursor-pointer",
                      i % 2 === 0 && "bg-muted/10",
                      isSelected && "bg-primary/5 ring-1 ring-inset ring-primary/20",
                    )}
                  >
                    <td className="px-3 py-3 text-sm">
                      {m.rank <= 3 ? (
                        <span
                          className={cn(
                            "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                            m.rank === 1 && "bg-primary/20 text-primary",
                            m.rank === 2 && "bg-muted text-muted-foreground",
                            m.rank === 3 && "bg-accent text-accent-foreground",
                          )}
                        >
                          {m.rank}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">#{m.rank}</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src={m.photo} alt={m.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {m.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground truncate">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-muted-foreground truncate">{m.discipline}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground truncate">{m.region}</td>
                    <td className="px-3 py-3 text-sm text-foreground truncate">{m.team}</td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-primary/10 text-primary px-2 py-0.5">
                        {m.badge} Lv.{m.level}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-muted-foreground text-center">{m.likes}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground text-center">{m.comments}</td>
                    <td className="px-3 py-3 text-sm text-muted-foreground text-center">{m.networking}</td>
                    <td className="px-3 py-3 text-sm text-foreground text-center font-semibold">{mpu}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
