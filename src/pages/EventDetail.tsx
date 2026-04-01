import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users, Share2, Bookmark, ExternalLink, Video } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const allEvents: Record<string, {
  id: string;
  title: string;
  date: string;
  time: string;
  timezone: string;
  thumbnail: string;
  organizer: string;
  organizerAvatar: string;
  attendees: number;
  type: string;
  description: string;
  location: string;
  duration: string;
  speakers: { name: string; role: string; avatar: string }[];
  agenda: { time: string; topic: string }[];
}> = {
  "1": {
    id: "1",
    title: "EFC Championship Match Day | Quarter Finals Live Stream",
    date: "15 April, 2026",
    time: "7:00 PM",
    timezone: "Europe/London (GMT)",
    thumbnail: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 342,
    type: "match",
    description: "Join us live for the EFC Championship Quarter Finals! Watch the best teams compete for a spot in the semi-finals. This thrilling match promises edge-of-your-seat action with top-tier football talent. Don't miss the pre-match analysis and post-match discussion with our expert panel.",
    location: "Online — Live Stream via Zoom",
    duration: "2 hours 30 minutes",
    speakers: [
      { name: "Coach Marcus", role: "Head Coach", avatar: "" },
      { name: "David Park", role: "Match Analyst", avatar: "" },
    ],
    agenda: [
      { time: "6:45 PM", topic: "Pre-match Analysis & Predictions" },
      { time: "7:00 PM", topic: "Kick-off — Quarter Final Match" },
      { time: "7:45 PM", topic: "Half-time Discussion" },
      { time: "8:45 PM", topic: "Full-time Whistle & Post-match Review" },
    ],
  },
  "2": {
    id: "2",
    title: "EFC Webinar | Tactical Analysis: Modern Football Formations",
    date: "22 April, 2026",
    time: "3:00 PM",
    timezone: "Europe/Berlin (CET)",
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 128,
    type: "webinar",
    description: "Dive deep into modern football tactics with our expert coaches. Learn about the latest formations, pressing systems, and tactical innovations that are shaping the beautiful game. Interactive Q&A included.",
    location: "Online — Zoom Webinar",
    duration: "1 hour 30 minutes",
    speakers: [
      { name: "Alex Turner", role: "Tactical Analyst", avatar: "" },
      { name: "Sarah Mitchell", role: "Youth Development Coach", avatar: "" },
    ],
    agenda: [
      { time: "3:00 PM", topic: "Introduction to Modern Formations" },
      { time: "3:30 PM", topic: "Case Studies: Top League Tactics" },
      { time: "4:00 PM", topic: "Q&A with Analysts" },
    ],
  },
  "3": {
    id: "3",
    title: "EFC Youth Academy | Open Training Session & Tryouts",
    date: "28 April, 2026",
    time: "10:00 AM",
    timezone: "Europe/London (GMT)",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    organizer: "Youth Academy Coach",
    organizerAvatar: "",
    attendees: 56,
    type: "training",
    description: "Open online training session for aspiring young footballers. Join our virtual coaching drills, learn techniques from experienced coaches, and get personalised feedback. All skill levels welcome!",
    location: "Online — Zoom Training Room",
    duration: "3 hours",
    speakers: [
      { name: "Coach James", role: "Youth Academy Director", avatar: "" },
    ],
    agenda: [
      { time: "10:00 AM", topic: "Registration & Warm-up" },
      { time: "10:30 AM", topic: "Skills Assessment Drills" },
      { time: "11:30 AM", topic: "Small-sided Games" },
      { time: "12:30 PM", topic: "Feedback & Next Steps" },
    ],
  },
  "4": {
    id: "4",
    title: "EFC Community Social | Fan Meet & Greet with Players",
    date: "05 May, 2026",
    time: "5:00 PM",
    timezone: "Europe/Madrid (CET)",
    thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 210,
    type: "social",
    description: "An exclusive virtual meet and greet with EFC's star players! Join the live video call, ask questions, and hear stories from behind the scenes. Limited spots available!",
    location: "Online — Google Meet",
    duration: "2 hours",
    speakers: [
      { name: "Team Captain", role: "Player", avatar: "" },
      { name: "PR Manager", role: "Event Host", avatar: "" },
    ],
    agenda: [
      { time: "5:00 PM", topic: "Welcome & Refreshments" },
      { time: "5:30 PM", topic: "Player Introductions & Q&A" },
      { time: "6:15 PM", topic: "Photo & Autograph Session" },
      { time: "6:45 PM", topic: "Closing Remarks" },
    ],
  },
  "5": {
    id: "5",
    title: "EFC Webinar 26th March 2026 | Football Analytics Masterclass",
    date: "26 March, 2026",
    time: "2:54 PM",
    timezone: "Europe/London (GMT)",
    thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 189,
    type: "webinar",
    description: "Learn how data analytics is revolutionising football. From xG models to player tracking, explore the tools and techniques used by professional clubs.",
    location: "Online — Zoom Webinar",
    duration: "1 hour 30 minutes",
    speakers: [{ name: "Data Team Lead", role: "Analytics", avatar: "" }],
    agenda: [
      { time: "2:54 PM", topic: "Introduction to Football Analytics" },
      { time: "3:30 PM", topic: "Live Demo & Q&A" },
    ],
  },
  "6": {
    id: "6",
    title: "EFC Webinar 19th March 2026 | Developing Professional Judgment",
    date: "19 March, 2026",
    time: "2:54 PM",
    timezone: "Europe/Berlin (CET)",
    thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 145,
    type: "webinar",
    description: "A session focused on developing professional judgment skills both on and off the pitch.",
    location: "Online — Zoom Webinar",
    duration: "1 hour",
    speakers: [{ name: "EFC Admin", role: "Host", avatar: "" }],
    agenda: [{ time: "2:54 PM", topic: "Session Start" }],
  },
  "7": {
    id: "7",
    title: "EFC Webinar 12th March 2026 | Fitness Matters for Everyone",
    date: "12 March, 2026",
    time: "2:54 PM",
    timezone: "Europe/Paris (CET)",
    thumbnail: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 167,
    type: "webinar",
    description: "Understanding fitness fundamentals for athletes and fans alike.",
    location: "Online — Zoom Webinar",
    duration: "1 hour",
    speakers: [{ name: "Fitness Coach", role: "Trainer", avatar: "" }],
    agenda: [{ time: "2:54 PM", topic: "Session Start" }],
  },
  "8": {
    id: "8",
    title: "EFC Webinar 5th March 2026 | Networking without Noise 📌",
    date: "05 March, 2026",
    time: "2:54 PM",
    timezone: "Europe/London (GMT)",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 203,
    type: "webinar",
    description: "Master the art of meaningful professional networking in the sports industry.",
    location: "Online — Zoom Webinar",
    duration: "1 hour",
    speakers: [{ name: "EFC Admin", role: "Host", avatar: "" }],
    agenda: [{ time: "2:54 PM", topic: "Session Start" }],
  },
  "9": {
    id: "9",
    title: "EFC Webinar 26th February 2026 | How to Use the Career Services",
    date: "26 February, 2026",
    time: "2:54 PM",
    timezone: "Europe/Berlin (CET)",
    thumbnail: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 134,
    type: "webinar",
    description: "Learn about the career services available to EFC community members.",
    location: "Online — Zoom Webinar",
    duration: "1 hour",
    speakers: [{ name: "Career Advisor", role: "Advisor", avatar: "" }],
    agenda: [{ time: "2:54 PM", topic: "Session Start" }],
  },
  "10": {
    id: "10",
    title: "EFC Webinar 19th February 2026 | Personal Branding in the Digital Age",
    date: "19 February, 2026",
    time: "2:54 PM",
    timezone: "Asia/Kolkata",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=400&fit=crop",
    organizer: "EFC Admin",
    organizerAvatar: "",
    attendees: 112,
    type: "webinar",
    description: "Build your personal brand as a football professional in the digital world.",
    location: "Online — Zoom",
    duration: "1 hour",
    speakers: [{ name: "Brand Strategist", role: "Speaker", avatar: "" }],
    agenda: [{ time: "2:54 PM", topic: "Session Start" }],
  },
};

const typeColors: Record<string, string> = {
  webinar: "bg-destructive/10 text-destructive border-destructive/20",
  match: "bg-primary/10 text-primary border-primary/20",
  training: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
  social: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20",
};

const typeLabels: Record<string, string> = {
  webinar: "🔴 Webinar",
  match: "⚽ Match Day",
  training: "🏋️ Training",
  social: "🎉 Social",
};

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const event = allEvents[eventId || ""];

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Event not found</h2>
        <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/calendar")}>Back to Calendar</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto py-6 px-4"
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/calendar")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Events
      </button>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-xl overflow-hidden mb-6 aspect-[2.2/1] bg-muted"
      >
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <Badge className={`mb-2 ${typeColors[event.type]}`}>
            {typeLabels[event.type]}
          </Badge>
          <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-6"
        >
          {/* Description */}
          <Card>
            <CardContent className="p-5">
              <h2 className="text-base font-semibold text-foreground mb-3">About this Event</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>

          {/* Agenda */}
          <Card>
            <CardContent className="p-5">
              <h2 className="text-base font-semibold text-foreground mb-4">Agenda</h2>
              <div className="space-y-3">
                {event.agenda.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      {i < event.agenda.length - 1 && (
                        <div className="w-px h-8 bg-border" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary">{item.time}</p>
                      <p className="text-sm text-foreground">{item.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <Card>
              <CardContent className="p-5">
                <h2 className="text-base font-semibold text-foreground mb-4">Speakers</h2>
                <div className="grid grid-cols-2 gap-3">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={speaker.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {speaker.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{speaker.name}</p>
                        <p className="text-xs text-muted-foreground">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Event Info Card */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{event.date}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{event.time} ({event.timezone})</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{event.location}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium text-foreground">{event.duration}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Attendees</p>
                  <p className="text-sm font-medium text-foreground">{event.attendees} registered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizer */}
          <Card>
            <CardContent className="p-5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Organized by</h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={event.organizerAvatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {event.organizer.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{event.organizer}</p>
                  <p className="text-xs text-muted-foreground">Community Admin</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" size="lg">
              <Video className="h-4 w-4 mr-2" />
              Join Event
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" size="sm">
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                Share
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                Save
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
