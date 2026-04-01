import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock, MapPin, Users, MoreHorizontal, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  timezone: string;
  thumbnail: string;
  organizer: string;
  organizerAvatar: string;
  attendees: number;
  type: "webinar" | "match" | "training" | "social";
  month: string;
  year: string;
}

const upcomingEvents: EventItem[] = [
  {
    id: "1",
    title: "EFC Championship Match Day | Quarter Finals Live Stream",
    date: "15 April, 2026",
    time: "7:00 PM",
    timezone: "Europe/London (GMT)",
    thumbnail: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 342,
    type: "match",
    month: "April",
    year: "2026",
  },
  {
    id: "2",
    title: "EFC Webinar | Tactical Analysis: Modern Football Formations",
    date: "22 April, 2026",
    time: "3:00 PM",
    timezone: "Europe/Berlin (CET)",
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 128,
    type: "webinar",
    month: "April",
    year: "2026",
  },
  {
    id: "3",
    title: "EFC Youth Academy | Open Training Session & Tryouts",
    date: "28 April, 2026",
    time: "10:00 AM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=180&fit=crop",
    organizer: "Youth Academy Coach",
    organizerAvatar: "",
    attendees: 56,
    type: "training",
    month: "April",
    year: "2026",
  },
  {
    id: "4",
    title: "EFC Community Social | Fan Meet & Greet with Players",
    date: "05 May, 2026",
    time: "5:00 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 210,
    type: "social",
    month: "May",
    year: "2026",
  },
];

const pastEvents: EventItem[] = [
  {
    id: "5",
    title: "EFC Webinar 26th March 2026 | Football Analytics Masterclass: Building...",
    date: "26 March, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 189,
    type: "webinar",
    month: "March",
    year: "2026",
  },
  {
    id: "6",
    title: "EFC Webinar 19th March 2026 | Developing Professional Judgment...",
    date: "19 March, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 145,
    type: "webinar",
    month: "March",
    year: "2026",
  },
  {
    id: "7",
    title: "EFC Webinar 12th March 2026 | Fitness Matters for Everyone: E...",
    date: "12 March, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 167,
    type: "webinar",
    month: "March",
    year: "2026",
  },
  {
    id: "8",
    title: "EFC Webinar 5th March 2026 | Networking without Noise 📌",
    date: "05 March, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 203,
    type: "webinar",
    month: "March",
    year: "2026",
  },
  {
    id: "9",
    title: "EFC Webinar 26th February 2026 | How to Use the Career Serv...",
    date: "26 February, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 134,
    type: "webinar",
    month: "February",
    year: "2026",
  },
  {
    id: "10",
    title: "EFC Webinar 19th February 2026 | Personal Branding in the D...",
    date: "19 February, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300&h=180&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 112,
    type: "webinar",
    month: "February",
    year: "2026",
  },
];

const typeColors: Record<string, string> = {
  webinar: "bg-destructive/10 text-destructive",
  match: "bg-primary/10 text-primary",
  training: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  social: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
};

const typeLabels: Record<string, string> = {
  webinar: "🔴 Webinar",
  match: "⚽ Match Day",
  training: "🏋️ Training",
  social: "🎉 Social",
};

function groupByMonth(events: EventItem[]) {
  const grouped: Record<string, EventItem[]> = {};
  events.forEach((e) => {
    const key = `${e.month} ${e.year}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });
  return grouped;
}

export default function Calendar() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const navigate = useNavigate();
  const events = activeTab === "upcoming" ? upcomingEvents : pastEvents;
  const grouped = groupByMonth(events);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {(["upcoming", "past"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="calendar-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Events List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {Object.entries(grouped).map(([monthYear, items]) => (
            <div key={monthYear} className="mb-8">
              <h2 className="text-base font-bold text-foreground mb-4">{monthYear}</h2>
              <div className="space-y-3">
                {items.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.005, y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={() => navigate(`/calendar/${event.id}`)}
                    className="group flex gap-4 p-3 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/20 cursor-pointer transition-all duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="w-28 h-20 rounded-md overflow-hidden shrink-0 bg-muted">
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground mb-0.5">
                            {event.date}, {event.time}
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 font-medium ${typeColors[event.type]}`}>
                              {typeLabels[event.type]}
                            </Badge>
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Timezone : {event.timezone}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="shrink-0 p-1 rounded hover:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={event.organizerAvatar} />
                            <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                              {event.organizer.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{event.organizer}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
