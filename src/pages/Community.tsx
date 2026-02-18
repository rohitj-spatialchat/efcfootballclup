import { motion } from "framer-motion";
import { Search, Plus, Settings, ChevronDown, MoreHorizontal, Globe, Users, Link2, Tag, User, BarChart3, Mail, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const communitySidebar = [
  { label: "Audience", icon: Users },
  { label: "Manage audience", icon: Users, active: true },
  { label: "Segments", icon: BarChart3 },
  { label: "Invite links", icon: Link2 },
  { label: "Tags", icon: Tag },
  { label: "Profile fields", icon: User },
  { label: "Bulk logs", icon: BarChart3 },
];

const members = [
  { name: "Kwame Adebayo", email: "adebayo@gmail.com", team: "AFC Ajax", country: "Netherlands", score: 9.2, role: "Member", joined: "Apr 12, 2024", flag: "🇳🇱" },
  { name: "Robert Fox", email: "robertfox@gmail.com", team: "AC Milan", country: "Italy", score: 9.4, role: "Member", joined: "Mar 5, 2024", flag: "🇮🇹" },
  { name: "Mei Wong", email: "meiwong@gmail.com", team: "Juventus FC", country: "Italy", score: 8.0, role: "Member", joined: "Jun 22, 2024", flag: "🇮🇹" },
  { name: "Dianne Russell", email: "drussell@yahoo.com", team: "S.C. Braga", country: "Portugal", score: 9.2, role: "Moderator", joined: "Mar 9, 2023", flag: "🇵🇹" },
  { name: "Kristin Watson", email: "kristin@watson.com", team: "FC Porto", country: "Portugal", score: 9.2, role: "Admin", joined: "Sep 19, 2022", flag: "🇵🇹" },
  { name: "Carlos Ramirez", email: "ramirez@yahoo.com", team: "Chelsea F.C.", country: "England", score: 6.7, role: "Member", joined: "Jul 8, 2024", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Ravi Patel", email: "ravi@email.com", team: "Manchester City", country: "United Kingdom", score: 9.2, role: "Moderator", joined: "Dec 1, 2023", flag: "🇬🇧" },
];

const scoreColor = (score: number) => {
  if (score >= 9) return "bg-success text-success-foreground";
  if (score >= 7) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function CommunityPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex gap-0 -m-6">
      {/* Community Sidebar */}
      <div className="hidden md:flex w-48 shrink-0 flex-col border-r border-border bg-card p-3 space-y-0.5 min-h-[calc(100vh-3.5rem)]">
        {communitySidebar.map((sideItem) => (
          <button
            key={sideItem.label}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm w-full text-left transition-colors",
              sideItem.active
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted"
            )}
          >
            <sideItem.icon className="h-4 w-4" />
            {sideItem.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-5">
        <motion.div variants={item} className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Manage audience</h1>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Add
            </button>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div variants={item} className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="text-foreground font-medium">All 720</span>
          <span>Contacts 719</span>
          <span>Members 700</span>
          <span>Invited 700</span>
          <span>Admins 4</span>
          <span>Members 18</span>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item} className="flex items-center gap-2 flex-wrap">
          {["+ Name", "+ Email marketing", "+ Member", "+ Source", "+ Data added"].map((f) => (
            <button key={f} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
              {f}
            </button>
          ))}
          <button className="text-xs text-muted-foreground hover:text-foreground">+ Add filter</button>
        </motion.div>

        {/* Action bar */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">720 people</span>
            <button className="text-xs text-muted-foreground hover:text-foreground">Save segment</button>
            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">Bulk actions <ChevronDown className="h-3 w-3" /></button>
            <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">More <ChevronDown className="h-3 w-3" /></button>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
              ↗ Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              + Add member
            </button>
          </div>
        </motion.div>

        {/* Members Table */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">NAME</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">TEAM</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">COUNTRY</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">SCORE</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">ROLE</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">JOINED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {members.map((m, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground flex items-center gap-1.5">
                      {m.flag} {m.team}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{m.country}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold", scoreColor(m.score))}>
                      {m.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{m.role}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{m.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
}
