import { motion } from "framer-motion";
import { Plus, Download, Users, FileText } from "lucide-react";

const stats = [
  { value: "846", label: "Total Registrations", change: "+24% this week", positive: true },
  { value: "78%", label: "Avg Conversion Rate", change: "+5% vs last month", positive: true },
  { value: "5", label: "Active Forms", change: "No change", positive: false },
  { value: "7.8", label: "Avg Fields per Form", change: "Optimal", positive: false },
];

const forms = [
  { name: "EFC MPU Annual Summit 2026", registered: 312, fields: 10, conversion: 81, status: "ACTIVE", updated: "Updated 2 hours ago" },
  { name: "Sports Science Masterclass", registered: 189, fields: 6, conversion: 72, status: "ACTIVE", updated: "Updated 1 day ago" },
  { name: "Injury Prevention Workshop", registered: 245, fields: 8, conversion: 68, status: "ACTIVE", updated: "Updated 3 hours ago" },
  { name: "Nutrition & Performance Seminar", registered: 156, fields: 7, conversion: 74, status: "ACTIVE", updated: "Updated 5 hours ago" },
  { name: "Speed Networking Session", registered: 0, fields: 5, conversion: 0, status: "DRAFT", updated: "Updated 5 days ago" },
];

const recentRegistrations = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@eurofootball.com", event: "EFC MPU Annual Summit 2026", type: "VIP", time: "5 minutes ago", color: "bg-primary" },
  { initials: "MC", name: "Michael Chen", email: "m.chen@sportsci.io", event: "Injury Prevention Workshop", type: "GENERAL", time: "12 minutes ago", color: "bg-purple-500" },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@physiolab.com", event: "EFC MPU Annual Summit 2026", type: "SPONSOR", time: "18 minutes ago", color: "bg-primary" },
  { initials: "DK", name: "David Kim", email: "david.kim@athleteperf.com", event: "Sports Science Masterclass", type: "GENERAL", time: "25 minutes ago", color: "bg-purple-500" },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@nutrition.net", event: "Nutrition & Performance Seminar", type: "VIP", time: "32 minutes ago", color: "bg-primary" },
];

const typeColors: Record<string, string> = {
  VIP: "text-destructive",
  GENERAL: "text-primary",
  SPONSOR: "text-purple-600",
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EventRegistration() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download className="h-4 w-4" /> Export Data
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Create Form
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            <p className={`text-xs mt-1 ${s.positive ? "text-primary" : "text-muted-foreground"}`}>{s.change}</p>
          </div>
        ))}
      </motion.div>

      <div className="flex gap-6">
        {/* Registration Forms */}
        <motion.div variants={item} className="flex-1 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Registration Forms</h2>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All</button>
          </div>
          <div className="divide-y divide-border">
            {forms.map((form) => (
              <div key={form.name} className="px-6 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{form.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {form.registered} registered</span>
                      <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {form.fields} fields</span>
                      <span>{form.conversion}% conversion</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Edit Form</button>
                    <button className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">View Responses</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wide ${form.status === "ACTIVE" ? "text-primary" : "text-muted-foreground"}`}>
                    {form.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{form.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Registrations */}
        <motion.div variants={item} className="hidden xl:block w-80 shrink-0 rounded-lg border border-border bg-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Registrations</h2>
          </div>
          <div className="divide-y divide-border">
            {recentRegistrations.map((r) => (
              <div key={r.name} className="px-5 py-4 flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <span className={`text-[10px] font-bold uppercase ${typeColors[r.type]}`}>{r.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{r.email}</p>
                  <p className="text-xs text-muted-foreground">{r.event}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{r.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
