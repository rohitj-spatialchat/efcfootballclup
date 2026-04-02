import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Calendar, Download, Star, Clock, Diamond, TrendingUp, TrendingDown,
  Users, Eye, Play, BarChart3, Brain, Sparkles, Video, Settings,
  MessageSquare, ThumbsUp, Share2, Zap, Target, PieChart, Activity,
  ArrowUpRight, ArrowDownRight, Monitor, Mic, Globe, Mail,
} from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

// Overview stats
const overviewStats = [
  { label: "Total Registrations", value: "1,247", change: "+18.3%", positive: true, icon: Users },
  { label: "Attendance Rate", value: "84%", change: "+5.2%", positive: true, icon: Target },
  { label: "Avg. Session Duration", value: "42m", change: "+8.7%", positive: true, icon: Clock },
  { label: "Engagement Score", value: "92/100", change: "+12.1%", positive: true, icon: Zap },
  { label: "Total Revenue", value: "$12,550", change: "+22.4%", positive: true, icon: TrendingUp },
  { label: "NPS Score", value: "4.8/5", change: "-0.1", positive: false, icon: Star },
];

// AI Insights
const aiInsights = [
  {
    title: "Peak Registration Window",
    insight: "72% of registrations occur within 48 hours of email campaigns. Consider sending reminders 2 days before events.",
    confidence: 94,
    type: "optimization" as const,
  },
  {
    title: "Audience Retention Drop",
    insight: "Viewer drop-off peaks at the 35-minute mark. Sessions under 40 minutes retain 91% of attendees vs 67% for longer ones.",
    confidence: 88,
    type: "warning" as const,
  },
  {
    title: "Top Performing Content",
    insight: "Workshop-style events generate 3.2x more engagement than lecture formats. Injury Prevention topics drive the highest attendance.",
    confidence: 91,
    type: "insight" as const,
  },
  {
    title: "Revenue Opportunity",
    insight: "Members who attend 2+ events have a 78% higher lifetime value. Consider bundled event packages to increase repeat attendance.",
    confidence: 86,
    type: "optimization" as const,
  },
];

const insightColors = {
  optimization: "border-primary/30 bg-primary/5",
  warning: "border-amber-500/30 bg-amber-500/5",
  insight: "border-emerald-500/30 bg-emerald-500/5",
};
const insightIcons = {
  optimization: Target,
  warning: TrendingDown,
  insight: Sparkles,
};

// Event performance
const eventPerformance = [
  { name: "EFC MPU Annual Summit 2026", registrations: 312, attendance: 267, rate: 86, engagement: 94, satisfaction: 4.9, revenue: "$2,450" },
  { name: "Sports Science Masterclass", registrations: 156, attendance: 134, rate: 86, engagement: 88, satisfaction: 4.7, revenue: "$0" },
  { name: "Injury Prevention Workshop", registrations: 412, attendance: 356, rate: 86, engagement: 92, satisfaction: 4.8, revenue: "$8,900" },
  { name: "ACL Recovery Symposium", registrations: 45, attendance: 41, rate: 91, engagement: 82, satisfaction: 4.5, revenue: "$0" },
];

// Recording analytics
const recordingStats = [
  { title: "Injury Prevention Keynote", speaker: "Dr. Marco Rossi", views: 1234, avgWatch: "38m", completion: 85, likes: 89, shares: 23 },
  { title: "ACL Rehabilitation Workshop", speaker: "Sarah Johnson", views: 989, avgWatch: "52m", completion: 72, likes: 67, shares: 18 },
  { title: "GPS Load Monitoring Panel", speaker: "Alex Chen", views: 1512, avgWatch: "44m", completion: 84, likes: 112, shares: 34 },
  { title: "Nutrition for Elite Recovery", speaker: "Lisa Anderson", views: 756, avgWatch: "32m", completion: 88, likes: 54, shares: 12 },
];

// Traffic sources
const trafficSources = [
  { name: "Email Campaign", visitors: 4250, pct: 42, icon: Mail },
  { name: "Direct", visitors: 3180, pct: 31, icon: Globe },
  { name: "Social Media", visitors: 1720, pct: 17, icon: Share2 },
  { name: "Referral", visitors: 1020, pct: 10, icon: ArrowUpRight },
];

// Engagement timeline (hourly)
const engagementTimeline = [
  { time: "9 AM", messages: 12, reactions: 45, polls: 3 },
  { time: "10 AM", messages: 34, reactions: 89, polls: 8 },
  { time: "11 AM", messages: 56, reactions: 134, polls: 12 },
  { time: "12 PM", messages: 45, reactions: 112, polls: 6 },
  { time: "1 PM", messages: 23, reactions: 67, polls: 4 },
  { time: "2 PM", messages: 67, reactions: 156, polls: 15 },
  { time: "3 PM", messages: 78, reactions: 189, polls: 18 },
  { time: "4 PM", messages: 45, reactions: 98, polls: 7 },
];

// Settings quick config
const settingsConfig = [
  { label: "Auto-record sessions", enabled: true },
  { label: "Send analytics digest weekly", enabled: true },
  { label: "Track individual engagement", enabled: false },
  { label: "Enable AI recommendations", enabled: true },
  { label: "Public analytics dashboard", enabled: false },
];

type Tab = "overview" | "ai" | "recordings" | "engagement" | "settings";

export default function EventAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [settingsState, setSettingsState] = useState(settingsConfig);
  const { toast } = useToast();

  // Date Range
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-03-31");
  const [appliedRange, setAppliedRange] = useState("Jan 1 – Mar 31, 2026");

  const tabs: { label: string; id: Tab; icon: typeof BarChart3 }[] = [
    { label: "Overview", id: "overview", icon: BarChart3 },
    { label: "AI Analytics", id: "ai", icon: Brain },
    { label: "Recordings", id: "recordings", icon: Video },
    { label: "Engagement", id: "engagement", icon: Activity },
    { label: "Settings", id: "settings", icon: Settings },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive insights into your event performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Calendar className="h-3.5 w-3.5" /> Date Range
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download className="h-3.5 w-3.5" /> Export Report
          </button>
        </div>
      </motion.div>

      {/* Sub-tabs */}
      <motion.div variants={item} className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {overviewStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className={cn("inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5", s.positive ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive")}>
                      {s.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {s.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Event Performance Table */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Event Performance</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Registrations</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendance</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rate</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Engagement</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {eventPerformance.map((e) => (
                  <tr key={e.name} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{e.name}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{e.registrations}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{e.attendance}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${e.rate}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{e.rate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn("text-xs font-bold", e.engagement >= 90 ? "text-emerald-600" : "text-amber-600")}>{e.engagement}%</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-foreground flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> {e.satisfaction}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{e.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Traffic Sources</h2>
            <div className="space-y-4">
              {trafficSources.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.name} className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{t.name}</span>
                        <span className="text-sm text-muted-foreground">{t.visitors.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${t.pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-10 text-right">{t.pct}%</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="space-y-6">
          {/* AI Header */}
          <motion.div variants={item} className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI-Powered Insights</h2>
                <p className="text-sm text-muted-foreground">Automated analysis of your event data patterns</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="rounded-lg bg-card/60 backdrop-blur p-4 text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground mt-1">Insights Generated</p>
              </div>
              <div className="rounded-lg bg-card/60 backdrop-blur p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">89%</p>
                <p className="text-xs text-muted-foreground mt-1">Avg Confidence</p>
              </div>
              <div className="rounded-lg bg-card/60 backdrop-blur p-4 text-center">
                <p className="text-2xl font-bold text-amber-600">4</p>
                <p className="text-xs text-muted-foreground mt-1">Action Items</p>
              </div>
            </div>
          </motion.div>

          {/* Insights */}
          <div className="space-y-4">
            {aiInsights.map((insight, idx) => {
              const Icon = insightIcons[insight.type];
              return (
                <motion.div
                  key={idx}
                  variants={item}
                  className={cn("rounded-xl border p-5", insightColors[insight.type])}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-card flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
                        <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.insight}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* AI Predictions */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Predicted Next Event Performance
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Expected Registrations", value: "280-320", icon: Users },
                { label: "Predicted Attendance", value: "85-90%", icon: Target },
                { label: "Est. Engagement", value: "88-94%", icon: Zap },
                { label: "Revenue Forecast", value: "$3,200", icon: TrendingUp },
              ].map((p) => {
                const PIcon = p.icon;
                return (
                  <div key={p.label} className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 text-center">
                    <PIcon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">{p.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === "recordings" && (
        <div className="space-y-6">
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Views", value: "4,491", icon: Eye },
              { label: "Avg Watch Time", value: "41.5m", icon: Clock },
              { label: "Avg Completion", value: "82%", icon: Monitor },
              { label: "Total Shares", value: "87", icon: Share2 },
            ].map((s) => {
              const SIcon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-border bg-card p-5">
                  <SIcon className="h-5 w-5 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              );
            })}
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Recording Performance</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Recording</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Views</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg Watch</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Completion</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Likes</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Shares</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recordingStats.map((r) => (
                  <tr key={r.title} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-foreground">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.speaker}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.views.toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{r.avgWatch}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${r.completion}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{r.completion}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" /> {r.likes}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Share2 className="h-3 w-3" /> {r.shares}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}

      {activeTab === "engagement" && (
        <div className="space-y-6">
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Chat Messages", value: "360", icon: MessageSquare, change: "+24%" },
              { label: "Reactions", value: "890", icon: ThumbsUp, change: "+31%" },
              { label: "Poll Responses", value: "73", icon: PieChart, change: "+15%" },
              { label: "Q&A Questions", value: "48", icon: Mic, change: "+8%" },
            ].map((s) => {
              const SIcon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between mb-2">
                    <SIcon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-emerald-600">{s.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Engagement Timeline */}
          <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Engagement Timeline</h2>
            <div className="space-y-3">
              {engagementTimeline.map((t) => {
                const total = t.messages + t.reactions + t.polls;
                const maxTotal = Math.max(...engagementTimeline.map((e) => e.messages + e.reactions + e.polls));
                const barWidth = (total / maxTotal) * 100;
                return (
                  <div key={t.time} className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground w-14 shrink-0">{t.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 h-7">
                        <div className="h-full rounded-l bg-primary/70" style={{ width: `${(t.messages / total) * barWidth}%` }} title={`${t.messages} messages`} />
                        <div className="h-full bg-emerald-500/70" style={{ width: `${(t.reactions / total) * barWidth}%` }} title={`${t.reactions} reactions`} />
                        <div className="h-full rounded-r bg-amber-500/70" style={{ width: `${(t.polls / total) * barWidth}%` }} title={`${t.polls} polls`} />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right shrink-0">{total}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-border">
              <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2.5 w-2.5 rounded-sm bg-primary/70" /> Messages</span>
              <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/70" /> Reactions</span>
              <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-2.5 w-2.5 rounded-sm bg-amber-500/70" /> Polls</span>
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">Analytics Settings</h2>
            <p className="text-sm text-muted-foreground mb-6">Configure how event analytics are tracked and reported.</p>
            <div className="space-y-4">
              {settingsState.map((s, i) => (
                <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                  <button
                    onClick={() => {
                      const updated = [...settingsState];
                      updated[i] = { ...updated[i], enabled: !updated[i].enabled };
                      setSettingsState(updated);
                    }}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors",
                      s.enabled ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <span className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform",
                      s.enabled && "translate-x-5"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">Report Schedule</h2>
            <p className="text-sm text-muted-foreground mb-4">Configure automated analytics reports.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Frequency</label>
                <select className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Weekly</option>
                  <option>Bi-weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Recipients</label>
                <input
                  type="text"
                  placeholder="admin@efcclub.com"
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end">
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
