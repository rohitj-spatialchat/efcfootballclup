import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Trophy, Heart, MessageSquare, Repeat2, Lock, Award } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Team", id: "team" },
  { label: "Gamification", id: "gamification" },
  { label: "Single sign-on (SSO)", id: "sso" },
  { label: "SCIM provisioning", id: "scim" },
  { label: "Two-step authentication", id: "2fa" },
  { label: "Security history", id: "security" },
  { label: "Installed apps", id: "apps" },
  { label: "Access requests", id: "access" },
  { label: "MCP access", id: "mcp" },
];

const filterTabs = [
  { label: "All members", count: 12 },
  { label: "Active members", count: 8 },
  { label: "Pending invites", count: 0 },
  { label: "Inactive members", count: 4 },
];

const sortOptions = [
  { label: "Roles", active: true },
  { label: "Status" },
  { label: "Name" },
  { label: "Email" },
];

const members = [
  { initials: "TG", name: "Tina Geizen", email: "tina@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 hours ago", color: "bg-violet-200 text-violet-700" },
  { initials: "SV", name: "Shanmukha V", email: "shanmukha.v@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "6 hours ago", color: "bg-yellow-200 text-yellow-700" },
  { initials: "RK", name: "Riddhik Kochhar", subtitle: "You", email: "riddhik.k@spatial.chat", role: "Super Administrator", auth: "Two-step", lastLogin: "4 days ago", color: "bg-violet-200 text-violet-700" },
  { initials: "OD", name: "Oleg Danylenko", subtitle: "Owner", email: "oleg@teemyco.com", role: "Super Administrator", extraRoles: "+ 1 others", auth: "Two-step", lastLogin: "4 days ago", color: "bg-violet-200 text-violet-700" },
  { initials: "AB", name: "Andre Borrelly", email: "ab@spatial.chat", role: "Super Administrator", extraRoles: "+ 1 others", auth: "Two-step", lastLogin: "2 weeks ago", color: "bg-green-200 text-green-700" },
  { initials: "JP", name: "James Park", email: "james.p@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 weeks ago", color: "bg-blue-200 text-blue-700" },
  { initials: "SK", name: "Saurav Kumar", email: "saurav.k@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 weeks ago", color: "bg-violet-200 text-violet-700" },
  { initials: "AD", name: "Anastasia Davis", email: "anastasia@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "4 weeks ago", color: "bg-violet-200 text-violet-700" },
];

const defaultLevels = [
  { level: 1, title: "Rookie", pointsRequired: 0, badge: "⚽" },
  { level: 2, title: "Midfielder", pointsRequired: 50, badge: "🥉" },
  { level: 3, title: "Striker", pointsRequired: 150, badge: "🥈" },
  { level: 4, title: "Champion", pointsRequired: 400, badge: "🏆" },
  { level: 5, title: "Legend", pointsRequired: 800, badge: "👑" },
  { level: 6, title: "Hall of Fame", pointsRequired: 1500, badge: "⭐" },
];

const pointRules = [
  { action: "Like", icon: Heart, points: 2, color: "text-destructive" },
  { action: "Comment", icon: MessageSquare, points: 5, color: "text-primary" },
  { action: "Repost", icon: Repeat2, points: 10, color: "text-success" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

function GamificationTab() {
  const [levels, setLevels] = useState(defaultLevels);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Gamification</h2>
        <p className="text-sm text-muted-foreground mt-1">Celebrate engagement and reward your members with gamification.</p>
      </div>

      {/* Point Rules */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Point Rules</h3>
        <p className="text-sm text-muted-foreground">Define how members earn points through engagement.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pointRules.map((rule) => (
            <div key={rule.action} className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
              <div className={cn("h-10 w-10 rounded-full bg-muted flex items-center justify-center", rule.color)}>
                <rule.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{rule.action}</p>
                <p className="text-xs text-muted-foreground">+{rule.points} points</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {levels.map((lvl) => (
            <div key={lvl.level} className="rounded-lg border border-border bg-card p-4 text-center space-y-2">
              <span className="text-3xl">{lvl.badge}</span>
              <p className="text-sm font-medium text-foreground">{lvl.title}</p>
              <p className="text-xs text-muted-foreground">Level {lvl.level}</p>
              {lvl.pointsRequired > 0 && (
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" /> {lvl.pointsRequired} pts
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("team");
  const [activeFilter, setActiveFilter] = useState("All members");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* Tabs */}
      <motion.div variants={item} className="flex items-center gap-6 border-b border-border pb-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-3 text-sm transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "text-primary font-medium border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {activeTab === "gamification" ? (
        <motion.div variants={item}>
          <GamificationTab />
        </motion.div>
      ) : activeTab === "team" ? (
        <>
          {/* Filter tabs + Actions */}
          <motion.div variants={item} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {filterTabs.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setActiveFilter(f.label)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                    activeFilter === f.label
                      ? "bg-primary/10 text-primary"
                      : "border border-border text-foreground hover:bg-muted"
                  )}
                >
                  {f.label} <span className="text-muted-foreground">{f.count}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                <Plus className="h-3 w-3" /> Export
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Plus className="h-3 w-3" /> Add member
              </button>
            </div>
          </motion.div>

          {/* Sort pills */}
          <motion.div variants={item} className="flex items-center gap-2">
            {sortOptions.map((s) => (
              <button
                key={s.label}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors",
                  s.active
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {s.label}
              </button>
            ))}
          </motion.div>

          {/* Table */}
          <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left w-8"><input type="checkbox" className="rounded border-border" /></th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Roles</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Auth</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Login</th>
                  <th className="px-4 py-3 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map((m, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4"><input type="checkbox" className="rounded border-border" /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold", m.color)}>
                          {m.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{m.name}</p>
                          {m.subtitle && <p className="text-xs text-muted-foreground">{m.subtitle}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{m.email}</td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-foreground">{m.role}</span>
                      {m.extraRoles && <span className="text-xs text-muted-foreground ml-1">{m.extraRoles}</span>}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-success">{m.auth}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{m.lastLogin}</td>
                    <td className="px-4 py-4">
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </>
      ) : (
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">This section is coming soon.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
