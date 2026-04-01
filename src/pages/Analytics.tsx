import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, Globe, Users, Trophy, TrendingUp, MessageSquare,
  Award, MapPin, Briefcase, Shield, Activity, ArrowUpRight,
  ArrowDownRight, Filter, ChevronDown, Flame, Star, Target,
  Zap, Heart, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────

const regionData = [
  { name: "United Kingdom", members: 245, posts: 1840, mpuPoints: 58200, engagement: 92 },
  { name: "DACH", members: 189, posts: 1420, mpuPoints: 44800, engagement: 87 },
  { name: "Balkans", members: 156, posts: 980, mpuPoints: 32100, engagement: 78 },
  { name: "Nordics", members: 134, posts: 870, mpuPoints: 28900, engagement: 82 },
  { name: "Iberico", members: 112, posts: 760, mpuPoints: 24500, engagement: 75 },
  { name: "Latin", members: 98, posts: 640, mpuPoints: 19800, engagement: 71 },
  { name: "Benelux", members: 87, posts: 520, mpuPoints: 17200, engagement: 68 },
  { name: "Central", members: 76, posts: 410, mpuPoints: 13600, engagement: 64 },
  { name: "Eastern", members: 65, posts: 340, mpuPoints: 11200, engagement: 61 },
  { name: "RU+", members: 42, posts: 190, mpuPoints: 6800, engagement: 55 },
];

const disciplineData = [
  { name: "Sport & Exercise", members: 312, posts: 2180, mpuPoints: 72400, topContributor: "Carlos Ramirez" },
  { name: "Nutrition", members: 245, posts: 1960, mpuPoints: 58900, topContributor: "Mei Wong" },
  { name: "Strength & Power", members: 198, posts: 1540, mpuPoints: 48200, topContributor: "Robert Fox" },
  { name: "Sport Psychology", members: 167, posts: 1280, mpuPoints: 39800, topContributor: "Dianne Russell" },
  { name: "Medical & Physiotherapy", members: 156, posts: 1120, mpuPoints: 35200, topContributor: "Kwame Adebayo" },
  { name: "Science", members: 134, posts: 980, mpuPoints: 29400, topContributor: "Ravi Patel" },
  { name: "Fitness & Exercise Physiology", members: 112, posts: 840, mpuPoints: 24800, topContributor: "Esther Howard" },
];

const teamData = [
  { name: "AFC Ajax", members: 34, posts: 420, mpuPoints: 18200, engagement: 94 },
  { name: "AC Milan", members: 28, posts: 380, mpuPoints: 15800, engagement: 89 },
  { name: "Arsenal FC", members: 42, posts: 560, mpuPoints: 22400, engagement: 91 },
  { name: "Chelsea FC", members: 38, posts: 490, mpuPoints: 19600, engagement: 88 },
  { name: "Manchester City", members: 45, posts: 620, mpuPoints: 24800, engagement: 93 },
  { name: "Bayern Munich", members: 36, posts: 440, mpuPoints: 17600, engagement: 86 },
  { name: "Liverpool FC", members: 40, posts: 540, mpuPoints: 21200, engagement: 90 },
  { name: "Inter Milan", members: 25, posts: 310, mpuPoints: 12400, engagement: 82 },
  { name: "Juventus", members: 22, posts: 280, mpuPoints: 11200, engagement: 79 },
  { name: "SL Benfica", members: 18, posts: 220, mpuPoints: 8800, engagement: 76 },
];

const postTypeData = [
  { type: "Discussion", count: 3240, engagement: 85, avgLikes: 12.4, avgComments: 8.2 },
  { type: "Research", count: 1860, engagement: 92, avgLikes: 18.6, avgComments: 14.1 },
  { type: "Case Study", count: 980, engagement: 88, avgLikes: 15.2, avgComments: 11.8 },
  { type: "Question", count: 2140, engagement: 79, avgLikes: 8.4, avgComments: 16.3 },
  { type: "Media", count: 1420, engagement: 94, avgLikes: 22.1, avgComments: 6.5 },
  { type: "Poll", count: 640, engagement: 76, avgLikes: 6.8, avgComments: 4.2 },
];

const topContributors = [
  { name: "Carlos Ramirez", team: "Arsenal FC", posts: 186, mpuPoints: 12400, level: "Elite" },
  { name: "Mei Wong", team: "Manchester City", posts: 164, mpuPoints: 10800, level: "Diamond" },
  { name: "Robert Fox", team: "Chelsea FC", posts: 152, mpuPoints: 9600, level: "Diamond" },
  { name: "Dianne Russell", team: "Liverpool FC", posts: 138, mpuPoints: 8800, level: "Platinum" },
  { name: "Kwame Adebayo", team: "Bayern Munich", posts: 124, mpuPoints: 7600, level: "Platinum" },
];

const engagementTrends = [
  { month: "Oct", posts: 1240, likes: 8400, comments: 4200, newMembers: 45 },
  { month: "Nov", posts: 1380, likes: 9200, comments: 4800, newMembers: 52 },
  { month: "Dec", posts: 1120, likes: 7800, comments: 3900, newMembers: 38 },
  { month: "Jan", posts: 1560, likes: 10400, comments: 5400, newMembers: 64 },
  { month: "Feb", posts: 1720, likes: 11800, comments: 6100, newMembers: 71 },
  { month: "Mar", posts: 1890, likes: 12600, comments: 6800, newMembers: 78 },
];

const summaryStats = [
  { label: "Total Members", value: "1,204", change: "+12.4%", positive: true, icon: Users },
  { label: "Total Posts", value: "10,280", change: "+18.6%", positive: true, icon: MessageSquare },
  { label: "Total MPU Points", value: "257,100", change: "+22.1%", positive: true, icon: Flame },
  { label: "Engagement Rate", value: "84.2%", change: "+5.3%", positive: true, icon: TrendingUp },
  { label: "Active Regions", value: "10", change: "+2", positive: true, icon: Globe },
  { label: "Avg Posts/Member", value: "8.5", change: "+1.2", positive: true, icon: Activity },
];

// ── Helpers ───────────────────────────────────────────────────────────

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } } };

const maxBar = (data: { mpuPoints: number }[]) => Math.max(...data.map((d) => d.mpuPoints));

const levelColor: Record<string, string> = {
  Elite: "bg-amber-500/20 text-amber-600",
  Diamond: "bg-blue-500/20 text-blue-600",
  Platinum: "bg-purple-500/20 text-purple-600",
  Gold: "bg-yellow-500/20 text-yellow-700",
};

type Tab = "overview" | "regions" | "disciplines" | "teams" | "posts";

// ── Component ─────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [timePeriod, setTimePeriod] = useState("Last 30 Days");

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: BarChart3 },
    { key: "regions", label: "Regions", icon: Globe },
    { key: "disciplines", label: "Disciplines", icon: Briefcase },
    { key: "teams", label: "Teams", icon: Shield },
    { key: "posts", label: "Posts", icon: MessageSquare },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-8">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Engagement Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor community engagement across regions, disciplines, and teams</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-card pl-3 pr-8 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Last 12 Months</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={fadeUp} className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200",
              tab === t.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === "overview" && <OverviewTab key="overview" />}
        {tab === "regions" && <RegionsTab key="regions" />}
        {tab === "disciplines" && <DisciplinesTab key="disciplines" />}
        {tab === "teams" && <TeamsTab key="teams" />}
        {tab === "posts" && <PostsTab key="posts" />}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {summaryStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <s.icon className="h-4 w-4 text-muted-foreground" />
              <span className={cn("text-[10px] font-semibold flex items-center gap-0.5", s.positive ? "text-emerald-600" : "text-destructive")}>
                {s.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.change}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Engagement Trend */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-4">Engagement Trend (6 Months)</h3>
        <div className="space-y-3">
          {engagementTrends.map((m, i) => {
            const maxPosts = Math.max(...engagementTrends.map((e) => e.posts));
            return (
              <motion.div
                key={m.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-medium text-muted-foreground w-8">{m.month}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-7 bg-muted/50 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(m.posts / maxPosts) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.06 }}
                      className="h-full rounded-lg bg-gradient-to-r from-primary/80 to-primary flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] font-semibold text-primary-foreground">{m.posts}</span>
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground w-44 shrink-0">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-rose-400" />{m.likes.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3 text-blue-400" />{m.comments.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3 text-emerald-400" />+{m.newMembers}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Two columns: Top Regions by MPU + Top Contributors */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top regions by MPU */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" /> Top Regions by MPU Points
          </h3>
          <div className="space-y-2.5">
            {regionData.slice(0, 5).map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <span className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                  i === 0 ? "bg-amber-500/20 text-amber-600" : i === 1 ? "bg-slate-300/30 text-slate-600" : i === 2 ? "bg-orange-400/20 text-orange-600" : "bg-muted text-muted-foreground"
                )}>
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground flex-1 min-w-0 truncate">{r.name}</span>
                <div className="w-28 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.mpuPoints / maxBar(regionData)) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-14 text-right">{(r.mpuPoints / 1000).toFixed(1)}k</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Contributors */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" /> Top Contributors
          </h3>
          <div className="space-y-3">
            {topContributors.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.team}</p>
                </div>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", levelColor[c.level] || "bg-muted text-muted-foreground")}>
                  {c.level}
                </span>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1 justify-end"><Flame className="h-3 w-3 text-amber-500" />{c.mpuPoints.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">{c.posts} posts</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Discipline with most posts */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" /> Disciplines by Post Volume
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {disciplineData.slice(0, 4).map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold",
                  i === 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  #{i + 1}
                </span>
                {i === 0 && <Star className="h-4 w-4 text-amber-500" />}
              </div>
              <p className="text-sm font-semibold text-foreground mb-1 truncate">{d.name}</p>
              <p className="text-2xl font-bold text-foreground">{d.posts.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">posts · {d.members} members</p>
              <div className="mt-2 pt-2 border-t border-border">
                <p className="text-[10px] text-muted-foreground">Top: <span className="text-foreground font-medium">{d.topContributor}</span></p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Regions Tab ───────────────────────────────────────────────────────

function RegionsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Region Performance</h3>
          <p className="text-xs text-muted-foreground mt-1">Complete breakdown of engagement metrics by region</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Region</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Members</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Posts</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">MPU Points</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {regionData.map((r, i) => (
                <motion.tr
                  key={r.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "h-6 w-6 rounded-full inline-flex items-center justify-center text-[10px] font-bold",
                      i < 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}>{i + 1}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{r.members}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{r.posts.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                      <Flame className="h-3 w-3 text-amber-500" />{r.mpuPoints.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${r.engagement}%` }}
                          transition={{ duration: 0.5, delay: i * 0.04 }}
                          className={cn("h-full rounded-full", r.engagement >= 80 ? "bg-emerald-500" : r.engagement >= 65 ? "bg-amber-500" : "bg-rose-500")}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{r.engagement}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Region MPU bar chart */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-4">MPU Points Distribution by Region</h3>
        <div className="space-y-2">
          {regionData.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-muted-foreground w-32 truncate text-right">{r.name}</span>
              <div className="flex-1 h-6 bg-muted/40 rounded-md overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(r.mpuPoints / maxBar(regionData)) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-md bg-gradient-to-r from-primary/60 to-primary flex items-center justify-end pr-2"
                >
                  <span className="text-[10px] font-semibold text-primary-foreground">{(r.mpuPoints / 1000).toFixed(1)}k</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Disciplines Tab ───────────────────────────────────────────────────

function DisciplinesTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {disciplineData.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold",
                i === 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>
                #{i + 1}
              </span>
              {i === 0 && <Award className="h-5 w-5 text-amber-500" />}
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{d.name}</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{d.members}</p>
                <p className="text-[10px] text-muted-foreground">Members</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{d.posts.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Posts</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Flame className="h-3 w-3 text-amber-500" />{d.mpuPoints.toLocaleString()} MPU</span>
              <span className="text-[10px] text-muted-foreground">⭐ {d.topContributor}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Teams Tab ─────────────────────────────────────────────────────────

function TeamsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Team Engagement Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Team</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Members</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Posts</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">MPU Points</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamData.sort((a, b) => b.mpuPoints - a.mpuPoints).map((t, i) => (
                <motion.tr
                  key={t.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "h-6 w-6 rounded-full inline-flex items-center justify-center text-[10px] font-bold",
                      i < 3 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}>{i + 1}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" />{t.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{t.members}</td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">{t.posts}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                      <Flame className="h-3 w-3 text-amber-500" />{t.mpuPoints.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${t.engagement}%` }}
                          transition={{ duration: 0.5, delay: i * 0.04 }}
                          className={cn("h-full rounded-full", t.engagement >= 85 ? "bg-emerald-500" : t.engagement >= 75 ? "bg-amber-500" : "bg-rose-500")}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{t.engagement}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ── Posts Tab ──────────────────────────────────────────────────────────

function PostsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {postTypeData.map((p, i) => (
          <motion.div
            key={p.type}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">{p.type}</h4>
              <span className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                p.engagement >= 90 ? "bg-emerald-500/10 text-emerald-600" : p.engagement >= 80 ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"
              )}>
                {p.engagement}% eng.
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{p.count.toLocaleString()}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-rose-400" />{p.avgLikes} avg</span>
              <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3 text-blue-400" />{p.avgComments} avg</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.engagement}%` }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
