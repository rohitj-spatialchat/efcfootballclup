import { motion } from "framer-motion";
import { Plus, Upload, Search, UserPlus, MoreVertical } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { value: "6", label: "Total Attendees" },
  { value: "3", label: "Checked In" },
  { value: "3", label: "VIP Attendees" },
  { value: "69%", label: "Avg Engagement" },
];

const filters = ["All", "Checked In", "Registered", "VIP"];

const attendees = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@eurofootball.com", role: "Head of Sports Science", team: "FC Barcelona", event: "EFC MPU Annual Summit 2026", status: "CHECKED IN", engagement: 92, tags: ["VIP", "Speaker"], color: "bg-primary" },
  { initials: "MC", name: "Michael Chen", email: "m.chen@sportsci.io", role: "Performance Analyst", team: "Bayern Munich", event: "Injury Prevention Workshop", status: "REGISTERED", engagement: 78, tags: ["Sponsor"], color: "bg-purple-500" },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@physiolab.com", role: "Lead Physiotherapist", team: "Real Madrid", event: "EFC MPU Annual Summit 2026", status: "CHECKED IN", engagement: 85, tags: ["VIP"], color: "bg-primary" },
  { initials: "DK", name: "David Kim", email: "david.kim@athleteperf.com", role: "S&C Coach", team: "Manchester City", event: "Sports Science Masterclass", status: "REGISTERED", engagement: 65, tags: [], color: "bg-purple-500" },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@nutrition.net", role: "Nutritionist", team: "Juventus", event: "Nutrition & Performance Seminar", status: "CHECKED IN", engagement: 94, tags: ["VIP", "Sponsor"], color: "bg-primary" },
  { initials: "JW", name: "James Wilson", email: "j.wilson@rehabcenter.com", role: "Rehabilitation Specialist", team: "Liverpool FC", event: "EFC MPU Annual Summit 2026", status: "INVITED", engagement: 0, tags: ["Speaker"], color: "bg-muted-foreground" },
];

const statusColors: Record<string, string> = {
  "CHECKED IN": "text-primary",
  "REGISTERED": "text-purple-600",
  "INVITED": "text-muted-foreground",
};

const engagementColor = (val: number) => {
  if (val >= 80) return "bg-primary";
  if (val >= 50) return "bg-amber-500";
  return "bg-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EventPeople() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Upload className="h-4 w-4" /> Import CSV
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Attendee
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card p-5 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendee</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Football Team</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Engagement</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {attendees.map((a) => (
              <tr key={a.name} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {a.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{a.role}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{a.team}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{a.event}</td>
                <td className="px-5 py-4">
                  <span className={cn("text-xs font-bold uppercase", statusColors[a.status])}>{a.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${engagementColor(a.engagement)}`} style={{ width: `${a.engagement}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{a.engagement}%</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    {a.tags.length > 0 ? a.tags.map((tag) => (
                      <span key={tag} className={cn(
                        "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase",
                        tag === "VIP" ? "bg-primary/10 text-primary" :
                        tag === "Speaker" ? "bg-amber-500/10 text-amber-600" :
                        "bg-purple-500/10 text-purple-600"
                      )}>
                        {tag}
                      </span>
                    )) : <span className="text-muted-foreground">—</span>}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-muted-foreground hover:text-foreground"><UserPlus className="h-4 w-4" /></button>
                    <button className="text-muted-foreground hover:text-foreground"><MoreVertical className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
