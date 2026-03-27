import { useState } from "react";
import { Heart, MessageSquare, Repeat2, Lock, Award, Send, PenLine, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultLevels = [
  { level: 1, title: "Member", pointsRequired: 0, badge: "🥉", color: "from-zinc-400 to-zinc-500" },
  { level: 2, title: "Silver", pointsRequired: 50, badge: "🥈", color: "from-slate-300 to-slate-500" },
  { level: 3, title: "Gold", pointsRequired: 150, badge: "🥇", color: "from-yellow-400 to-amber-500" },
  { level: 4, title: "Platinum", pointsRequired: 400, badge: "💎", color: "from-cyan-300 to-cyan-500" },
  { level: 5, title: "Diamond", pointsRequired: 800, badge: "👑", color: "from-blue-400 to-indigo-500" },
  { level: 6, title: "Elite", pointsRequired: 1500, badge: "⭐", color: "from-purple-400 to-pink-500" },
];

const defaultPointRules = [
  { action: "Like", icon: Heart, points: 2, color: "text-destructive", bg: "bg-destructive/10" },
  { action: "Comment", icon: MessageSquare, points: 5, color: "text-primary", bg: "bg-primary/10" },
  { action: "Repost", icon: Repeat2, points: 10, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { action: "Post", icon: PenLine, points: 15, color: "text-amber-600", bg: "bg-amber-500/10" },
  { action: "Networking Message", icon: Send, points: 8, color: "text-blue-600", bg: "bg-blue-500/10" },
];

export default function GamificationTab() {
  const [levels, setLevels] = useState(defaultLevels);
  const [pointRules, setPointRules] = useState(defaultPointRules);

  const updatePoints = (index: number, delta: number) => {
    const updated = [...pointRules];
    const newVal = Math.max(1, updated[index].points + delta);
    updated[index] = { ...updated[index], points: newVal };
    setPointRules(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Gamification</h2>
        <p className="text-sm text-muted-foreground mt-1">Celebrate engagement and reward your members with gamification.</p>
      </div>

      {/* Customizable MPU Point Rules */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
        <h3 className="font-semibold text-foreground">MPU Point Rules</h3>
        <p className="text-sm text-muted-foreground">Customize how many MPU points members earn for each action.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pointRules.map((rule, idx) => (
            <div key={rule.action} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
              <div className={cn("h-11 w-11 rounded-full flex items-center justify-center shrink-0", rule.bg, rule.color)}>
                <rule.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{rule.action}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={() => updatePoints(idx, -1)}
                    className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-bold text-primary min-w-[32px] text-center">+{rule.points}</span>
                  <button
                    onClick={() => updatePoints(idx, 1)}
                    className="h-6 w-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <span className="text-xs text-muted-foreground">MPU</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customize Levels */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Customize Levels</h3>
        <p className="text-sm text-muted-foreground">Tailor level titles to resonate with your community.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {levels.map((lvl, i) => (
            <div key={lvl.level} className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{lvl.level}</span>
                Level {lvl.level}
                <span className="text-xs text-muted-foreground ml-auto">{lvl.pointsRequired} pts required</span>
              </label>
              <input
                type="text"
                value={lvl.title}
                onChange={(e) => {
                  const updated = [...levels];
                  updated[i] = { ...updated[i], title: e.target.value };
                  setLevels(updated);
                }}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" /> Badges & Rewards
        </h3>
        <p className="text-sm text-muted-foreground">Members earn badges upon completing each level.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {levels.map((lvl) => (
            <div key={lvl.level} className="rounded-xl border border-border bg-card p-4 text-center space-y-2 hover:shadow-md transition-shadow">
              <div className={cn("mx-auto h-14 w-14 rounded-full bg-gradient-to-br flex items-center justify-center text-2xl", lvl.color)}>
                {lvl.badge}
              </div>
              <p className="text-sm font-semibold text-foreground">{lvl.title}</p>
              <p className="text-xs text-muted-foreground">Level {lvl.level}</p>
              {lvl.pointsRequired > 0 && (
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" /> {lvl.pointsRequired} MPU
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
