import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  TrendingUp,
  Award,
  ArrowUpRight,
  Clock,
  MessageSquare,
  Megaphone,
} from "lucide-react";

const stats = [
  { label: "Total Members", value: "2,847", change: "+12%", icon: Users },
  { label: "Active Events", value: "18", change: "+3", icon: Calendar },
  { label: "Engagement Rate", value: "73%", change: "+5%", icon: TrendingUp },
  { label: "Karma Points", value: "14.2K", change: "+820", icon: Award },
];

const announcements = [
  { title: "Q1 Community Meetup", desc: "Join us for the quarterly meetup on March 15th", time: "2h ago", type: "event" },
  { title: "New Knowledge Base Articles", desc: "15 new resources added to the leadership section", time: "5h ago", type: "content" },
  { title: "Platform Update v2.4", desc: "Speed networking now supports video calls", time: "1d ago", type: "update" },
];

const upcomingEvents = [
  { title: "Leadership Workshop", date: "Mar 12", attendees: 45, category: "Workshop" },
  { title: "Tech Talks: AI in Business", date: "Mar 15", attendees: 128, category: "Talk" },
  { title: "Networking Mixer", date: "Mar 18", attendees: 67, category: "Social" },
  { title: "Startup Pitch Night", date: "Mar 22", attendees: 89, category: "Competition" },
];

const recentActivity = [
  { user: "Sarah M.", action: "joined the community", time: "10m ago" },
  { user: "Alex K.", action: "earned 50 karma points", time: "25m ago" },
  { user: "Jamie L.", action: "registered for Tech Talks", time: "1h ago" },
  { user: "Chris R.", action: "shared a resource in Knowledge Hub", time: "2h ago" },
  { user: "Morgan P.", action: "completed speed networking session", time: "3h ago" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, John. Here's what's happening in your community.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
              <span className="text-xs font-medium text-success flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <motion.div variants={item} className="lg:col-span-2 rounded-lg border border-border bg-card shadow-card">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-primary" />
              Announcements
            </h2>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="divide-y divide-border">
            {announcements.map((a, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0 ml-4">
                    <Clock className="h-3 w-3" />
                    {a.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Recent Activity
            </h2>
          </div>
          <div className="px-5 pb-4 space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold shrink-0 mt-0.5">
                  {a.user.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Upcoming Events
          </h2>
          <button className="text-xs text-primary hover:underline">View all events</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border">
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Event</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Date</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Category</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Attendees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {upcomingEvents.map((e, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3 text-sm font-medium text-foreground">{e.title}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{e.date}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground text-right">{e.attendees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
