import { motion } from "framer-motion";
import { Trophy, TrendingUp, Star, Flame, Lock, Award, Users, Target, Zap, Medal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import TopPodium from "@/components/leaderboard/TopPodium";
import LiveActivityFeed from "@/components/leaderboard/LiveActivityFeed";
import RewardsPreview from "@/components/leaderboard/RewardsPreview";

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

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

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
  const [timePeriod, setTimePeriod] = useState("This Month");

  const filteredLeaderboard =
    selectedRegion === "All Regions" ? leaderboard : leaderboard.filter((m) => m.region === selectedRegion);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Earn MPU Points through likes, comments & reposts. Level up and unlock badges!
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-accent-foreground">16 Active Members</span>
          </div>
        </div>
      </motion.div>

      {/* Your Progress Card — Enhanced */}
      <motion.div variants={item} className="relative rounded-2xl border border-border bg-gradient-to-r from-card via-card to-accent/20 p-6 shadow-elevated overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar + level */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-18 w-18 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-xl font-bold border-2 border-primary shadow-md">
                SM
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm ring-2 ring-card"
              >
                {currentUser.level}
              </motion.span>
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-warning" />
                {currentUser.mpu} MPU Points
              </p>
            </div>
          </div>

          {/* Level badge */}
          <div className="sm:ml-auto text-center sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold shadow-sm">
              <Award className="h-4 w-4" /> Level {currentUser.level} — {getLevelTitle(currentUser.level)}
            </span>
            <p className="text-xs text-muted-foreground mt-1.5 flex items-center justify-center sm:justify-end gap-1">
              <Medal className="h-3 w-3" /> Top 36% of members
            </p>
          </div>
        </div>

        {/* Level progress */}
        <div className="relative mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              {levels[currentUser.level - 1]?.badge} Level {currentUser.level}
            </span>
            <span className="text-primary font-semibold">
              {currentUser.mpu} / {currentUser.nextLevelMpu} MPU
            </span>
            <span className="flex items-center gap-1">
              Level {currentUser.level + 1} {levels[currentUser.level]?.badge}
            </span>
          </div>
          <div className="relative">
            <Progress value={getLevelProgress(currentUser.mpu)} className="h-3 rounded-full" />
            <div
              className="absolute top-0 h-3 rounded-full bg-primary/20 animate-pulse"
              style={{ width: `${getLevelProgress(currentUser.mpu)}%` }}
            />
          </div>
        </div>

        {/* Level milestones */}
        <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {levels.map((lvl) => {
            const unlocked = currentUser.mpu >= lvl.pointsRequired;
            return (
              <motion.div
                key={lvl.level}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "rounded-xl border p-2.5 text-center transition-all duration-200 cursor-default",
                  unlocked
                    ? "border-primary/30 bg-primary/5 shadow-sm"
                    : "border-border bg-muted/20 opacity-50",
                )}
              >
                <span className="text-lg">{lvl.badge}</span>
                <p className="text-[10px] font-semibold text-foreground mt-0.5">{lvl.title}</p>
                <p className="text-[9px] text-muted-foreground flex items-center justify-center gap-0.5">
                  {!unlocked && <Lock className="h-2.5 w-2.5" />}
                  {lvl.pointsRequired} pts
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div variants={item}>
        <TopPodium users={leaderboard.sort((a, b) => a.rank - b.rank)} />
      </motion.div>

      {/* Quick Stats + Live Activity Feed */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Star,
              iconColor: "text-warning",
              iconBg: "bg-warning/10",
              label: "Total MPU Points",
              value: currentUser.mpu,
              sub: "+65 this week",
              subColor: "text-success",
            },
            {
              icon: Target,
              iconColor: "text-primary",
              iconBg: "bg-primary/10",
              label: "Your Rank",
              value: `#${currentUser.rank}`,
              sub: "↑ 2 positions",
              subColor: "text-success",
            },
            {
              icon: Flame,
              iconColor: "text-destructive",
              iconBg: "bg-destructive/10",
              label: "Streak",
              value: "30 days",
              sub: "🔥 Personal best!",
              subColor: "text-warning",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2, scale: 1.01 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", stat.iconBg)}>
                  <stat.icon className={cn("h-4 w-4", stat.iconColor)} />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className={cn("text-xs mt-1 font-medium", stat.subColor)}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>
        <LiveActivityFeed />
      </motion.div>

      {/* Rewards Preview */}
      <motion.div variants={item}>
        <RewardsPreview />
      </motion.div>

      {/* Leaderboard Table — Enhanced */}
      <motion.div variants={item} className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 pb-3 gap-3">
          <h2 className="font-bold text-foreground flex items-center gap-2 text-base">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            Full Rankings
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-muted p-1">
              {["All Time", "This Month", "This Week"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTimePeriod(f)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    timePeriod === f
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border bg-muted/40">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground w-16">Rank</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Member</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Region</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Team</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Level</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">MPU Points</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLeaderboard.map((m, i) => {
                const isCurrentUser = m.name === currentUser.name;
                return (
                  <motion.tr
                    key={m.rank}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.02 * i }}
                    className={cn(
                      "hover:bg-accent/30 transition-colors",
                      isCurrentUser && "bg-primary/5 hover:bg-primary/10",
                      !isCurrentUser && i % 2 === 0 && "bg-muted/10",
                    )}
                  >
                    <td className="px-5 py-3.5 text-sm">
                      {m.rank <= 3 ? (
                        <span
                          className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-sm",
                            m.rank === 1 && "bg-warning/20 text-warning ring-1 ring-warning/30",
                            m.rank === 2 && "bg-muted text-muted-foreground ring-1 ring-border",
                            m.rank === 3 && "bg-accent text-accent-foreground ring-1 ring-border",
                          )}
                        >
                          {m.rank}
                        </span>
                      ) : (
                        <span className="text-muted-foreground font-medium">#{m.rank}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shadow-sm",
                          isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary",
                        )}>
                          {m.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <span className={cn("text-sm font-semibold text-foreground", isCurrentUser && "text-primary")}>
                            {m.name}
                          </span>
                          {isCurrentUser && (
                            <span className="ml-2 text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">YOU</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{m.region}</td>
                    <td className="px-5 py-3.5 text-sm text-foreground">{m.team}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold rounded-full bg-primary/10 text-primary px-2.5 py-0.5">
                        {m.badge} Lv.{m.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-bold text-foreground">{m.mpu}</span>
                      <span className="text-[10px] text-success ml-1 font-medium">{m.change}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground text-right">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-destructive" />
                        <span className="font-medium">{m.streak}d</span>
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
