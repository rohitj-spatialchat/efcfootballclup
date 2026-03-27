import { motion } from "framer-motion";
import { Trophy, TrendingUp, Star, Flame, Lock, Award, Crown, ThumbsUp, MessageSquare, Users, Share2, Heart } from "lucide-react";
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

const avatarUrl = (name: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

const leaderboard = [
  { rank: 1, name: "Casey Nguyen", mpu: 1600, level: 6, streak: 45, badge: "👑", change: "+120", region: "Asia", team: "FC Tokyo" },
  { rank: 2, name: "Jamie Lawson", mpu: 950, level: 5, streak: 38, badge: "💎", change: "+95", region: "Europe", team: "AC Milan" },
  { rank: 3, name: "Chris Rodriguez", mpu: 520, level: 4, streak: 22, badge: "🏆", change: "+80", region: "Americas", team: "LA Galaxy" },
  { rank: 4, name: "Sarah Mitchell", mpu: 190, level: 3, streak: 30, badge: "🥇", change: "+65", region: "Europe", team: "Chelsea FC" },
  { rank: 5, name: "Alex Chen", mpu: 120, level: 2, streak: 18, badge: "🥈", change: "+50", region: "Asia", team: "Shanghai SIPG" },
  { rank: 6, name: "Morgan Davis", mpu: 85, level: 2, streak: 12, badge: "🥈", change: "+40", region: "Americas", team: "Toronto FC" },
  { rank: 7, name: "Taylor Kim", mpu: 40, level: 1, streak: 8, badge: "⚽", change: "+35", region: "Asia", team: "Ulsan HD" },
  { rank: 8, name: "Jordan Blake", mpu: 20, level: 1, streak: 5, badge: "⚽", change: "+20", region: "Africa", team: "Al Ahly" },
  { rank: 9, name: "Lucas Fernandez", mpu: 1450, level: 6, streak: 40, badge: "👑", change: "+110", region: "Americas", team: "Inter Miami" },
  { rank: 10, name: "Yuki Tanaka", mpu: 870, level: 5, streak: 35, badge: "💎", change: "+88", region: "Asia", team: "Yokohama FM" },
  { rank: 11, name: "Oliver Smith", mpu: 480, level: 4, streak: 20, badge: "🏆", change: "+72", region: "Europe", team: "Arsenal FC" },
  { rank: 12, name: "Fatima Al-Rashid", mpu: 350, level: 3, streak: 28, badge: "🥇", change: "+60", region: "Africa", team: "Wydad AC" },
  { rank: 13, name: "Liam O'Brien", mpu: 260, level: 3, streak: 15, badge: "🥇", change: "+55", region: "Europe", team: "Celtic FC" },
  { rank: 14, name: "Diego Morales", mpu: 175, level: 3, streak: 10, badge: "🥇", change: "+45", region: "Americas", team: "Boca Juniors" },
  { rank: 15, name: "Priya Sharma", mpu: 95, level: 2, streak: 14, badge: "🥈", change: "+38", region: "Asia", team: "Mumbai City" },
  { rank: 16, name: "Noah Williams", mpu: 60, level: 2, streak: 9, badge: "🥈", change: "+30", region: "Oceania", team: "Melbourne City" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

// Current user stats
const currentUser = { name: "Sarah Mitchell", mpu: 190, level: 3, nextLevelMpu: 400, rank: 4 };

const top3 = leaderboard.filter((m) => m.rank <= 3).sort((a, b) => a.rank - b.rank);

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
          Earn MPU Points through likes, comments & reposts. Level up and unlock badges!
        </p>
      </motion.div>

      {/* Your Level Card + Podium */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Your Level Card */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card p-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={avatarUrl(currentUser.name)} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">SM</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {currentUser.level}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.mpu} MPU</p>
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
              <span>{currentUser.mpu} / {currentUser.nextLevelMpu} MPU</span>
              <span>Level {currentUser.level + 1}</span>
            </div>
            <Progress value={getLevelProgress(currentUser.mpu)} className="h-2" />
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {levels.map((lvl) => {
              const unlocked = currentUser.mpu >= lvl.pointsRequired;
              return (
                <div
                  key={lvl.level}
                  className={cn(
                    "rounded-lg border p-3 text-center transition-colors",
                    unlocked ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30 opacity-60",
                  )}
                >
                  <span className="text-xl">{lvl.badge}</span>
                  <p className="text-xs font-medium text-foreground mt-1">{lvl.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                    {!unlocked && <Lock className="h-3 w-3" />}
                    {lvl.pointsRequired} pts
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6 shadow-card flex flex-col">
          <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <Trophy className="h-4 w-4 text-primary" /> Top Performers
          </h3>
          <div className="flex-1 flex items-end justify-center gap-3">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <Avatar className="h-12 w-12 border-2 border-muted-foreground/40">
                <AvatarImage src={avatarUrl(top3[1].name)} alt={top3[1].name} />
                <AvatarFallback className="bg-muted text-muted-foreground text-sm font-bold">
                  {top3[1].name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium text-foreground mt-1.5 text-center max-w-[80px] truncate">{top3[1].name}</p>
              <p className="text-xs text-muted-foreground">{top3[1].mpu} MPU</p>
              <div className="mt-2 w-20 bg-muted/60 rounded-t-lg flex flex-col items-center justify-end pt-3 pb-2" style={{ height: 80 }}>
                <span className="text-lg">🥈</span>
                <span className="text-xs font-bold text-muted-foreground">#2</span>
              </div>
            </div>
            {/* 1st place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Crown className="h-5 w-5 text-primary absolute -top-5 left-1/2 -translate-x-1/2" />
                <Avatar className="h-14 w-14 border-2 border-primary">
                  <AvatarImage src={avatarUrl(top3[0].name)} alt={top3[0].name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                    {top3[0].name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs font-medium text-foreground mt-1.5 text-center max-w-[80px] truncate">{top3[0].name}</p>
              <p className="text-xs text-muted-foreground">{top3[0].mpu} MPU</p>
              <div className="mt-2 w-20 bg-primary/15 rounded-t-lg flex flex-col items-center justify-end pt-3 pb-2" style={{ height: 110 }}>
                <span className="text-lg">🥇</span>
                <span className="text-xs font-bold text-primary">#1</span>
              </div>
            </div>
            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <Avatar className="h-12 w-12 border-2 border-accent">
                <AvatarImage src={avatarUrl(top3[2].name)} alt={top3[2].name} />
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-bold">
                  {top3[2].name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium text-foreground mt-1.5 text-center max-w-[80px] truncate">{top3[2].name}</p>
              <p className="text-xs text-muted-foreground">{top3[2].mpu} MPU</p>
              <div className="mt-2 w-20 bg-accent/20 rounded-t-lg flex flex-col items-center justify-end pt-3 pb-2" style={{ height: 60 }}>
                <span className="text-lg">🥉</span>
                <span className="text-xs font-bold text-accent-foreground">#3</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Star className="h-4 w-4 text-warning" /> Total MPU Points
          </div>
          <p className="text-2xl font-semibold text-foreground">{currentUser.mpu}</p>
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

      {/* How to Earn MPU Points */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card p-5">
        <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Star className="h-4 w-4 text-primary" /> How to Earn MPU Points
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: ThumbsUp, label: "Like a Post", points: "+2 MPU", color: "text-primary" },
            { icon: MessageSquare, label: "Comment", points: "+5 MPU", color: "text-primary" },
            { icon: Share2, label: "Repost / Share", points: "+3 MPU", color: "text-primary" },
            { icon: Users, label: "Networking", points: "+10 MPU", color: "text-primary" },
            { icon: Heart, label: "Receive a Like", points: "+1 MPU", color: "text-primary" },
          ].map((action) => (
            <div key={action.label} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-muted/30 p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <action.icon className={cn("h-5 w-5", action.color)} />
              </div>
              <p className="text-xs font-medium text-foreground">{action.label}</p>
              <span className="text-xs font-bold text-primary">{action.points}</span>
            </div>
          ))}
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
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground w-16">Rank</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Region</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground">Team</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Level</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">MPU Points</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaderboard.map((m, i) => (
                <tr key={m.rank} className={cn("hover:bg-muted/30 transition-colors", i % 2 === 0 && "bg-muted/10")}>
                  <td className="px-5 py-3.5 text-sm">
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
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl(m.name)} alt={m.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {m.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{m.region}</td>
                  <td className="px-5 py-3.5 text-sm text-foreground">{m.team}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-primary/10 text-primary px-2 py-0.5">
                      {m.badge} Lv.{m.level}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-foreground text-right font-medium">{m.mpu}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground text-right flex items-center justify-end gap-1">
                    <Flame className="h-3 w-3 text-destructive" /> {m.streak}d
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
