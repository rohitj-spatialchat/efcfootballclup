import { motion } from "framer-motion";
import { Calendar, Download, Star, Clock, Diamond } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Views", value: "12,458", change: "+15.3%", positive: true },
  { label: "Avg Session Duration", value: "42m", change: "+8.7%", positive: true },
  { label: "Engagement Rate", value: "78%", change: "+12.1%", positive: true },
  { label: "Conversion Rate", value: "24%", change: "-3.2%", positive: false },
];

const events = [
  { name: "Product Launch Webinar", registrations: 245, attendance: 198, rate: 81, engagement: 92, satisfaction: 4.8 },
  { name: "Q1 Team All-Hands", registrations: 189, attendance: 165, rate: 87, engagement: 85, satisfaction: 4.6 },
  { name: "Customer Success Summit", registrations: 412, attendance: 356, rate: 86, engagement: 88, satisfaction: 4.9 },
  { name: "Tech Talk Series", registrations: 87, attendance: 72, rate: 83, engagement: 76, satisfaction: 4.4 },
];

const trafficSources = [
  { name: "Direct", visitors: 4250, pct: 42 },
  { name: "Email Campaign", visitors: 3180, pct: 31 },
  { name: "Social Media", visitors: 1720, pct: 17 },
  { name: "Referral", visitors: 1020, pct: 10 },
];

const topPages = [
  { name: "Event Landing Page", views: 5420, time: "3m 24s", bounce: "32%" },
  { name: "Registration Form", views: 3890, time: "2m 15s", bounce: "18%" },
  { name: "Speaker Profiles", views: 2340, time: "1m 45s", bounce: "45%" },
  { name: "Agenda Page", views: 1980, time: "2m 50s", bounce: "28%" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function AnalyticsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-primary hover:bg-muted transition-colors">
          <Calendar className="h-3.5 w-3.5" /> Date Range
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Download className="h-3.5 w-3.5" /> Export Report
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className={cn("text-xs font-medium", s.positive ? "text-success" : "text-destructive")}>{s.change}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Event Performance */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Event Performance</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Registrations</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendance</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendance Rate</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Engagement</th>
              <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Satisfaction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((e) => (
              <tr key={e.name}>
                <td className="py-4 text-sm font-medium text-foreground">{e.name}</td>
                <td className="py-4 text-sm text-muted-foreground">{e.registrations}</td>
                <td className="py-4 text-sm text-muted-foreground">{e.attendance}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${e.rate}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground">{e.rate}%</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className={cn("text-xs font-bold", e.engagement >= 85 ? "text-success" : "text-warning")}>{e.engagement}%</span>
                </td>
                <td className="py-4">
                  <span className="text-sm text-foreground flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" /> {e.satisfaction}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Traffic Sources</h2>
          <div className="space-y-5">
            {trafficSources.map((t) => (
              <div key={t.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{t.name}</span>
                  <span className="text-sm text-muted-foreground">{t.visitors.toLocaleString()} visitors</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-1">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${t.pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{t.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Pages</h2>
          <div className="space-y-4">
            {topPages.map((p) => (
              <div key={p.name} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{p.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {p.time}</span>
                  <span className="flex items-center gap-1"><Diamond className="h-3 w-3" /> {p.bounce} bounce</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
