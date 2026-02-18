import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, Star, Flame } from "lucide-react";
import { useState } from "react";

const leaderboard = [
  { rank: 1, name: "Casey Nguyen", karma: 2100, streak: 45, badge: "🏆", change: "+120" },
  { rank: 2, name: "Jamie Lawson", karma: 1890, streak: 38, badge: "🥈", change: "+95" },
  { rank: 3, name: "Chris Rodriguez", karma: 1560, streak: 22, badge: "🥉", change: "+80" },
  { rank: 4, name: "Sarah Mitchell", karma: 1240, streak: 30, badge: "", change: "+65" },
  { rank: 5, name: "Alex Chen", karma: 980, streak: 18, badge: "", change: "+50" },
  { rank: 6, name: "Morgan Davis", karma: 870, streak: 12, badge: "", change: "+40" },
  { rank: 7, name: "Taylor Kim", karma: 720, streak: 8, badge: "", change: "+35" },
  { rank: 8, name: "Jordan Blake", karma: 640, streak: 5, badge: "", change: "+20" },
];

const filters = ["All Time", "This Month", "This Week"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState("This Month");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Karma & Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Recognize contributions and celebrate community leaders</p>
      </motion.div>

      {/* Your Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Star className="h-4 w-4 text-warning" /> Your Karma
          </div>
          <p className="text-2xl font-semibold text-foreground">1,240</p>
          <p className="text-xs text-success mt-1">+65 this week</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <TrendingUp className="h-4 w-4 text-primary" /> Your Rank
          </div>
          <p className="text-2xl font-semibold text-foreground">#4</p>
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

      {/* Leaderboard */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" /> Leaderboard
          </h2>
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeFilter === f ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border">
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground w-16">Rank</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Karma</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Streak</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaderboard.map((m) => (
                <tr key={m.rank} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-sm">
                    {m.badge ? <span className="text-lg">{m.badge}</span> : <span className="text-muted-foreground">#{m.rank}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                        {m.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-foreground text-right font-medium">{m.karma.toLocaleString()}</td>
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
