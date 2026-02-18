import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus, Video, ChevronRight } from "lucide-react";
import { useState } from "react";

type ViewMode = "list" | "calendar";

const events = [
  {
    id: 1,
    title: "Leadership Workshop: Building High-Performance Teams",
    date: "Mar 12, 2026",
    time: "2:00 PM – 4:00 PM",
    location: "Virtual",
    attendees: 45,
    category: "Workshop",
    status: "upcoming",
    speaker: "Dr. Sarah Mitchell",
  },
  {
    id: 2,
    title: "Tech Talks: AI in Business Strategy",
    date: "Mar 15, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Innovation Hub, San Francisco",
    attendees: 128,
    category: "Talk",
    status: "upcoming",
    speaker: "Alex Chen",
  },
  {
    id: 3,
    title: "Community Networking Mixer",
    date: "Mar 18, 2026",
    time: "6:00 PM – 8:30 PM",
    location: "The Grand Lounge, NYC",
    attendees: 67,
    category: "Social",
    status: "upcoming",
    speaker: "",
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    date: "Mar 22, 2026",
    time: "5:00 PM – 9:00 PM",
    location: "Virtual",
    attendees: 89,
    category: "Competition",
    status: "upcoming",
    speaker: "Panel of Investors",
  },
  {
    id: 5,
    title: "Design Thinking Masterclass",
    date: "Mar 28, 2026",
    time: "1:00 PM – 5:00 PM",
    location: "Creative Studio, Austin",
    attendees: 32,
    category: "Workshop",
    status: "upcoming",
    speaker: "Morgan Davis",
  },
];

const categories = ["All", "Workshop", "Talk", "Social", "Competition"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = selectedCategory === "All" ? events : events.filter((e) => e.category === selectedCategory);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground mt-1">Discover and join upcoming community events</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors self-start">
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            className="h-9 w-56 rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </motion.div>

      {/* Events List */}
      <motion.div variants={item} className="space-y-3">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="group rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                    {event.category}
                  </span>
                  {event.location === "Virtual" && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-info font-medium">
                      <Video className="h-3 w-3" /> Virtual
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                {event.speaker && (
                  <p className="text-xs text-muted-foreground mt-0.5">Speaker: {event.speaker}</p>
                )}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {event.attendees} attending
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
