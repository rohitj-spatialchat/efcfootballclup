import { motion } from "framer-motion";
import { Trophy, TrendingUp, Star, Flame, Award, Heart, MessageCircle, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const levels = [
  { level: 1, title: "Member", pointsRequired: 0, badge: "⚽" },
  { level: 2, title: "Silver", pointsRequired: 50, badge: "🥈" },
  { level: 3, title: "Gold", pointsRequired: 150, badge: "🥇" },
  { level: 4, title: "Platinum", pointsRequired: 400, badge: "🏆" },
  { level: 5, title: "Diamond", pointsRequired: 800, badge: "💎" },
  { level: 6, title: "Elite", pointsRequired: 1500, badge: "👑" },
];

const regions = ["All Regions", "Europe", "Asia", "Americas", "Africa", "Oceania"];

const realPhotos: Record<string, string> = {
  "Casey Nguyen": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "Jamie Lawson": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "Chris Rodriguez": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
  "Sarah Mitchell": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "Alex Chen": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "Morgan Davis": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "Taylor Kim": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face",
  "Jordan Blake": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
  "Lucas Fernandez": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
  "Yuki Tanaka": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
  "Oliver Smith": "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150&h=150&fit=crop&crop=face",
  "Fatima Al-Rashid": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "Liam O'Brien": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
  "Diego Morales": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
  "Priya Sharma": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
  "Noah Williams": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
};

const leaderboard = [
  {
    rank: 1,
    name: "Casey Nguyen",
    likes: 620,
    comments: 530,
    networking: 450,
    level: 6,
    streak: 45,
    badge: "👑",
    change: "+120",
    region: "Asia",
    team: "FC Tokyo",
  },
  {
    rank: 2,
    name: "Jamie Lawson",
    likes: 380,
    comments: 310,
    networking: 260,
    level: 5,
    streak: 38,
    badge: "💎",
    change: "+95",
    region: "Europe",
    team: "AC Milan",
  },
  {
    rank: 3,
    name: "Chris Rodriguez",
    likes: 210,
    comments: 170,
    networking: 140,
    level: 4,
    streak: 22,
    badge: "🏆",
    change: "+80",
    region: "Americas",
    team: "LA Galaxy",
  },
  {
    rank: 4,
    name: "Sarah Mitchell",
    likes: 75,
    comments: 65,
    networking: 50,
    level: 3,
    streak: 30,
    badge: "🥇",
    change: "+65",
    region: "Europe",
    team: "Chelsea FC",
  },
  {
    rank: 5,
    name: "Alex Chen",
    likes: 48,
    comments: 40,
    networking: 32,
    level: 2,
    streak: 18,
    badge: "🥈",
    change: "+50",
    region: "Asia",
    team: "Shanghai SIPG",
  },
  {
    rank: 6,
    name: "Morgan Davis",
    likes: 35,
    comments: 28,
    networking: 22,
    level: 2,
    streak: 12,
    badge: "🥈",
    change: "+40",
    region: "Americas",
    team: "Toronto FC",
  },
  {
    rank: 7,
    name: "Taylor Kim",
    likes: 16,
    comments: 14,
    networking: 10,
    level: 1,
    streak: 8,
    badge: "⚽",
    change: "+35",
    region: "Asia",
    team: "Ulsan HD",
  },
  {
    rank: 8,
    name: "Jordan Blake",
    likes: 8,
    comments: 7,
    networking: 5,
    level: 1,
    streak: 5,
    badge: "⚽",
    change: "+20",
    region: "Africa",
    team: "Al Ahly",
  },
  {
    rank: 9,
    name: "Lucas Fernandez",
    likes: 560,
    comments: 480,
    networking: 410,
    level: 6,
    streak: 40,
    badge: "👑",
    change: "+110",
    region: "Americas",
    team: "Inter Miami",
  },
  {
    rank: 10,
    name: "Yuki Tanaka",
    likes: 340,
    comments: 290,
    networking: 240,
    level: 5,
    streak: 35,
    badge: "💎",
    change: "+88",
    region: "Europe",
    team: "Aberdeen FC",
  },
  {
    rank: 11,
    name: "Oliver Smith",
    likes: 190,
    comments: 160,
    networking: 130,
    level: 4,
    streak: 20,
    badge: "🏆",
    change: "+72",
    region: "Europe",
    team: "Arsenal FC",
  },
  {
    rank: 12,
    name: "Fatima Al-Rashid",
    likes: 140,
    comments: 115,
    networking: 95,
    level: 3,
    streak: 28,
    badge: "🥇",
    change: "+60",
    region: "Africa",
    team: "Wydad AC",
  },
  {
    rank: 13,
    name: "Liam O'Brien",
    likes: 105,
    comments: 85,
    networking: 70,
    level: 3,
    streak: 15,
    badge: "🥇",
    change: "+55",
    region: "Europe",
    team: "Celtic FC",
  },
  {
    rank: 14,
    name: "Diego Morales",
    likes: 70,
    comments: 58,
    networking: 47,
    level: 3,
    streak: 10,
    badge: "🥇",
    change: "+45",
    region: "Americas",
    team: "Boca Juniors",
  },
  {
    rank: 15,
    name: "Priya Sharma",
    likes: 38,
    comments: 32,
    networking: 25,
    level: 2,
    streak: 14,
    badge: "🥈",
    change: "+38",
    region: "Itly",
    team: "Juventus",
  },
  {
    rank: 16,
    name: "Noah Williams",
    likes: 24,
    comments: 20,
    networking: 16,
    level: 2,
    streak: 9,
    badge: "🥈",
    change: "+30",
    region: "Oceania",
    team: "Melbourne City",
  },
];

const getMpu = (m: (typeof leaderboard)[0]) => m.likes + m.comments + m.networking;

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

const currentUser = { name: "Sarah Mitchell", level: 3, nextLevelMpu: 400, rank: 4 };
const currentUserData = leaderboard.find((m) => m.name === currentUser.name)!;
const currentMpu = getMpu(currentUserData);

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

export default function LeaderboardPage() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [timePeriod, setTimePeriod] = useState("This Month");

  const filteredLeaderboard =
    selectedRegion === "All Regions" ? leaderboard : leaderboard.filter((m) => m.region === selectedRegion);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Earn MPU Points through likes, comments & networking. Level up and unlock badges!
        </p>
      </motion.div>

      {/* Your Level Card + Podium */}
      <motion.div variants={item}>
        {/* Your Level Card */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={realPhotos[currentUser.name]} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">SM</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {currentUser.level}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentMpu} MPU Points</p>
              </div>
            </div>
            <div className="sm:ml-auto text-center sm:text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
                <Award className="h-4 w-4" /> Level {currentUser.level} — {getLevelTitle(currentUser.level)}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Top 36% of members</p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Level {currentUser.level}</span>
              <span>
                {currentMpu} / {currentUser.nextLevelMpu} MPU Points
              </span>
              <span>Level {currentUser.level + 1}</span>
            </div>
            <Progress value={getLevelProgress(currentMpu)} className="h-2" />
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Star className="h-4 w-4 text-warning" /> Total MPU Points
          </div>
          <p className="text-2xl font-semibold text-foreground">{currentMpu}</p>
          <p className="text-xs text-success mt-1">+65 this week</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4 text-primary" /> Your Rank
          </div>
          <p className="text-2xl font-semibold text-foreground">#{currentUser.rank}</p>
          <p className="text-xs text-success mt-1">↑ 2 positions</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Flame className="h-4 w-4 text-destructive" /> Streak
          </div>
          <p className="text-2xl font-semibold text-foreground">30 days</p>
          <p className="text-xs text-muted-foreground mt-1">Personal best!</p>
        </div>
      </motion.div>

      {/* Leaderboard Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" /> Leaderboard
          </h2>
          <div className="flex items-center gap-3">
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
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border bg-muted/40">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground w-14">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Region</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Team</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Level</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3 w-3" /> Likes
                  </span>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> Comments
                  </span>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> Networking
                  </span>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">MPU Points</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaderboard.map((m, i) => {
                const mpu = getMpu(m);
                return (
                  <tr key={m.rank} className={cn("hover:bg-muted/30 transition-colors", i % 2 === 0 && "bg-muted/10")}>
                    <td className="px-4 py-3.5 text-sm">
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
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={realPhotos[m.name]} alt={m.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {m.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground">{m.region}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground">{m.team}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-primary/10 text-primary px-2 py-0.5">
                        {m.badge} Lv.{m.level}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground text-right">{m.likes}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground text-right">{m.comments}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground text-right">{m.networking}</td>
                    <td className="px-4 py-3.5 text-sm text-foreground text-right font-semibold">{mpu}</td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground text-right">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="h-3 w-3 text-destructive" /> {m.streak}d
                      </span>
                    </td>
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
