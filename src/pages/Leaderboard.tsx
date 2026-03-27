import { motion } from "framer-motion";
import { Trophy, TrendingUp, Star, Flame, Lock, Award } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const levels = [
  { level: 1, title: "Member", pointsRequired: 0, badge: "⚽" },
  { level: 2, title: "Silver", pointsRequired: 50, badge: "🥈" },
  { level: 3, title: "Gold", pointsRequired: 150, badge: "🥇" },
  { level: 4, title: "Platinum", pointsRequired: 400, badge: "🏆" },
  { level: 5, title: "Diamond", pointsRequired: 800, badge: "💎" },
  { level: 6, title: "Elite", pointsRequired: 1500, badge: "👑" },
];

const regions = ["All Regions", "Europe", "Asia", "Americas", "Africa", "Oceania"];

const leaderboard = [
  { rank: 1, name: "Casey Nguyen", mpu: 1600, level: 6, streak: 45, badge: "👑", change: "+120", region: "Asia" },
  { rank: 2, name: "Jamie Lawson", mpu: 950, level: 5, streak: 38, badge: "💎", change: "+95", region: "Europe" },
  { rank: 3, name: "Chris Rodriguez", mpu: 520, level: 4, streak: 22, badge: "🏆", change: "+80", region: "Americas" },
  { rank: 4, name: "Sarah Mitchell", mpu: 190, level: 3, streak: 30, badge: "🥇", change: "+65", region: "Europe" },
  { rank: 5, name: "Alex Chen", mpu: 120, level: 2, streak: 18, badge: "🥈", change: "+50", region: "Asia" },
  { rank: 6, name: "Morgan Davis", mpu: 85, level: 2, streak: 12, badge: "🥈", change: "+40", region: "Americas" },
  { rank: 7, name: "Taylor Kim", mpu: 40, level: 1, streak: 8, badge: "⚽", change: "+35", region: "Asia" },
  { rank: 8, name: "Jordan Blake", mpu: 20, level: 1, streak: 5, badge: "⚽", change: "+20", region: "Africa" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

// Current user stats
const currentUser = { name: "Sarah Mitchell", mpu: 190, level: 3, nextLevelMpu: 400, rank: 4 };

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

  const filteredLeaderboard = selectedRegion === "All Regions"
    ? leaderboard
    : leaderboard.filter((m) => m.region === selectedRegion);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Earn MPU through likes, comments & reposts. Level up and unlock badges!</p>
      </motion.div>

      {/* Your Level Card */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar + level */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold border-2 border-primary">
                SM
              </div>
              <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {currentUser.level}
              </span>
            </div>
            <div>
              <p className="font-semibold text-foreground">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser.mpu} MPU</p>
            </div>
          </div>

          {/* Level badge */}
          <div className="sm:ml-auto text-center sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">
              <Award className="h-4 w-4" /> Level {currentUser.level} — {getLevelTitle(currentUser.level)}
            </span>
            <p className="text-xs text-muted-foreground mt-1">Top 36% of members</p>
          </div>
        </div>

        {/* Level progress */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Level {currentUser.level}</span>
            <span>{currentUser.mpu} / {currentUser.nextLevelMpu} MPU</span>
            <span>Level {currentUser.level + 1}</span>
          </div>
          <Progress value={getLevelProgress(currentUser.mpu)} className="h-2" />
        </div>

        {/* Level milestones */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {levels.map((lvl) => {
            const unlocked = currentUser.mpu >= lvl.pointsRequired;
            return (
              <div
                key={lvl.level}
                className={cn(
                  "rounded-lg border p-3 text-center transition-colors",
                  unlocked
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-muted/30 opacity-60"
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
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Star className="h-4 w-4 text-warning" /> Total MPU
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

      {/* Leaderboard Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" /> Leaderboard
          </h2>
           <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border">
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground w-16">Rank</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Level</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">MPU</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Streak</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaderboard.map((m) => (
                <tr key={m.rank} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-sm">
                    {m.rank <= 3 ? (
                      <span className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                        m.rank === 1 && "bg-yellow-100 text-yellow-700",
                        m.rank === 2 && "bg-gray-100 text-gray-600",
                        m.rank === 3 && "bg-orange-100 text-orange-700"
                      )}>{m.rank}</span>
                    ) : (
                      <span className="text-muted-foreground">#{m.rank}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                        {m.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-primary/10 text-primary px-2 py-0.5">
                      {m.badge} Lv.{m.level}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-foreground text-right font-medium">{m.mpu}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground text-right flex items-center justify-end gap-1">
                    <Flame className="h-3 w-3 text-destructive" /> {m.streak}d
                  </td>
                  <td className="px-5 py-3 text-sm text-success text-right">{m.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
