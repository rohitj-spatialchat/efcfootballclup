import { motion } from "framer-motion";
import { Plus, Search, Pencil, Settings, Video, Play, Download, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useViewMode } from "@/contexts/ViewModeContext";
import EventRegistration from "@/components/EventRegistration";
import EventPeople from "@/components/EventPeople";
import EventAnalytics from "@/components/events/EventAnalytics";
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
  const { isAdmin } = useViewMode();

  // Admin-only tabs: redirect to events list in user view
  if (!isAdmin && activeTab && activeTab !== "") return <Navigate to="/events" replace />;

  if (activeTab === "registration") return <EventRegistration />;
  if (activeTab === "people") return <EventPeople />;
  if (activeTab === "analytics") return <EventAnalytics />;
  if (activeTab === "recording") return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recordings</h1>
          <p className="text-sm text-muted-foreground mt-1">Access all recorded sessions and presentations</p>
        </div>
      </motion.div>
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Injury Prevention Keynote", speaker: "Dr. Marco Rossi", date: "Feb 18, 2026", duration: "45:32", views: 234, thumb: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=225&fit=crop" },
          { title: "ACL Rehabilitation Workshop", speaker: "Sarah Johnson", date: "Feb 18, 2026", duration: "1:12:08", views: 189, thumb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=225&fit=crop" },
          { title: "GPS Load Monitoring Panel", speaker: "Alex Chen", date: "Feb 17, 2026", duration: "52:15", views: 312, thumb: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=225&fit=crop" },
          { title: "Nutrition for Elite Recovery", speaker: "Lisa Anderson", date: "Feb 17, 2026", duration: "38:44", views: 156, thumb: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=225&fit=crop" },
          { title: "Return to Play Protocols", speaker: "James Wilson", date: "Feb 16, 2026", duration: "1:05:20", views: 278, thumb: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=225&fit=crop" },
          { title: "Periodization Masterclass", speaker: "Emma Johansson", date: "Feb 15, 2026", duration: "55:10", views: 198, thumb: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=225&fit=crop" },
        ].map((rec) => (
          <div key={rec.title} className="rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative aspect-video">
              <img src={rec.thumb} alt={rec.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 rounded px-1.5 py-0.5 text-[10px] text-white font-medium">{rec.duration}</div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground truncate">{rec.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{rec.speaker}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{rec.date}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{rec.views}</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground mt-1">{isAdmin ? "Manage all your webinars, conferences, and meetings" : "Browse upcoming webinars, conferences, and meetings"}</p>
        </div>
        {isAdmin && (
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Create New Event
          </button>
        )}
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
              {isAdmin && <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Revenue</th>}
              {isAdmin && <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>}
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
