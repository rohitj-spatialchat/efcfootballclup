import { motion } from "framer-motion";
import { Plus, Search, Pencil, Settings, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventRegistration from "@/components/EventRegistration";
import EventPeople from "@/components/EventPeople";
const filterTabs = [
  { label: "All", count: 7, active: true },
  { label: "Live", count: 1 },
  { label: "Scheduled", count: 3 },
  { label: "Draft", count: 2 },
  { label: "Ended", count: 1 },
];

const events = [
  { name: "EFC MPU Annual Summit 2026", type: "Conference", date: "Feb 18, 2026", status: "Live", registrations: 312, capacity: 500, revenue: "$2,450" },
  { name: "Sports Science Masterclass", type: "Webinar", date: "Feb 22, 2026", status: "Scheduled", registrations: 156, capacity: 200, revenue: "-" },
  { name: "Injury Prevention Workshop", type: "Workshop", date: "Feb 25, 2026", status: "Scheduled", registrations: 412, capacity: 1000, revenue: "$8,900" },
  { name: "Nutrition & Performance Seminar", type: "Webinar", date: "Mar 1, 2026", status: "Draft", registrations: 0, capacity: 300, revenue: "-" },
  { name: "ACL Recovery Symposium", type: "Conference", date: "Jan 15, 2026", status: "Ended", registrations: 45, capacity: 50, revenue: "-" },
  { name: "Strength & Conditioning Camp", type: "Workshop", date: "Mar 10, 2026", status: "Scheduled", registrations: 12, capacity: 50, revenue: "$1,200" },
  { name: "Speed Networking Session", type: "Meeting", date: "Mar 15, 2026", status: "Draft", registrations: 0, capacity: 100, revenue: "-" },
];

const statusStyles: Record<string, string> = {
  Live: "text-destructive",
  Scheduled: "text-primary",
  Draft: "text-muted-foreground",
  Ended: "text-muted-foreground",
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "";

  if (activeTab === "registration") return <EventRegistration />;
  if (activeTab === "people") return <EventPeople />;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all your webinars, conferences, and meetings</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Create New Event
        </button>
      </motion.div>

      {/* Filters + Search */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {filterTabs.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={cn(
                "text-sm transition-colors",
                activeFilter === f.label
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label} <span className="text-muted-foreground">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            className="h-9 w-56 rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event Name</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Registrations</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Capacity</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Revenue</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {events.map((e) => {
              const regPct = e.capacity > 0 ? (e.registrations / e.capacity) * 100 : 0;
              return (
                <tr key={e.name} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-foreground">{e.name}</p>
                    <p className="text-xs text-muted-foreground">{e.type}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">{e.date}</td>
                  <td className="px-5 py-4">
                    <span className={cn("text-xs font-medium flex items-center gap-1", statusStyles[e.status])}>
                      {e.status === "Live" && <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />}
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{e.registrations}</span>
                      <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${regPct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{e.capacity}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{e.revenue}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                      <button className="text-muted-foreground hover:text-foreground"><Settings className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
