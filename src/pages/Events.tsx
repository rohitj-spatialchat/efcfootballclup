import { motion } from "framer-motion";
import { Search, ChevronDown, Settings, Layers, FileText, Users, Presentation, UserCheck, BarChart3, Video, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const eventSidebarItems = [
  { label: "Event Setup", icon: Settings },
  { label: "Event Modules", icon: Layers },
  { label: "Sessions", icon: FileText, active: true },
  { label: "Admins", icon: Users },
  { label: "Presenters", icon: Presentation },
  { label: "Registrants", icon: UserCheck },
  { label: "Exhibitors", icon: Users },
  { label: "Recording", icon: Video },
  { label: "Analytics", icon: LineChart },
];

const sessions = [
  { name: "Injury Prevention in Football: Integrating Science Into Tra...", date: "May 7 at 9:00 am", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Hamstring Injuries in Football: Causes, Prevention, and Re...", date: "May 7 at 9:30 am", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "ACL Injuries in Football: Mechanisms and Modern Manag...", date: "May 7 at 10:00 am", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Ankle Sprains and Syndesmotic Injuries: Beyond Taping", date: "May 7 at 10:30 am", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Groin and Adductor Injuries: The Hidden Performance Kill...", date: "May 7 at 11:00 am", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Meniscus Injuries in Football: Repair vs Return to Play", date: "May 7 at 11:45 am", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Load Management and Overuse Injuries in Footballers", date: "May 7 at 12:15 pm", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Muscle Injuries: From Acute Strain to Safe Return to Play", date: "May 7 at 1:00 pm", registered: "3,500 / 3,500", type: "Both", manage: true },
  { name: "Injury Prevention in Football: Integrating Science Into Tra...", date: "May 7 at 1:30 pm", registered: "3,500 / 3,500", type: "Both", manage: true },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EventsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex gap-0 -m-6">
      {/* Event Sidebar */}
      <div className="hidden md:flex w-48 shrink-0 flex-col border-r border-border bg-card p-3 space-y-0.5 min-h-[calc(100vh-3.5rem)]">
        {eventSidebarItems.map((sideItem) => (
          <button
            key={sideItem.label}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm w-full text-left transition-colors",
              sideItem.active
                ? "bg-primary/10 text-primary font-medium"
                : sideItem.label === "Presenters"
                ? "text-destructive hover:bg-muted"
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
          <h1 className="text-2xl font-semibold text-foreground">Sessions</h1>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
              Download Section List
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Add Session
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={item} className="flex items-center gap-4 border-b border-border pb-3">
          <button className="text-sm font-medium text-foreground border-b-2 border-primary pb-1">
            All Sessions(47)
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Manage Filters
          </button>
        </motion.div>

        {/* Search & Filters */}
        <motion.div variants={item} className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">Session Type: All <ChevronDown className="h-3 w-3" /></span>
            <span className="flex items-center gap-1">Track: All <ChevronDown className="h-3 w-3" /></span>
          </div>
        </motion.div>

        {/* Sessions Table */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Name ↕</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Date & Time ↕</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Registered ↕</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Virtual/In-person ↕</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sessions.map((s, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">{s.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{s.date}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{s.registered}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                      {s.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary hover:underline font-medium">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.div>
  );
}
