import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shuffle, MessageSquare, Search, MapPin, Linkedin, UserPlus, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const onlineUsers = [
  {
    name: "Dr. Marco Rossi", company: "AC Milan", role: "Sports Medicine",
    location: "Milan, Italy", score: 9.4, mutualConnections: 12,
    bio: "Leading sports medicine specialist at AC Milan. Passionate about injury prevention and athlete longevity.",
    skills: ["Sports Medicine", "Injury Prevention", "Rehabilitation"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Sarah Mitchell", company: "Manchester City", role: "Physiotherapist",
    location: "Manchester, UK", score: 9.2, mutualConnections: 8,
    bio: "Serial physiotherapist turned performance lead. Building the future of athlete recovery at scale.",
    skills: ["Physiotherapy", "Recovery", "Biomechanics"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Alex Chen", company: "Bayern Munich", role: "Performance Analyst",
    location: "Munich, Germany", score: 8.5, mutualConnections: 5,
    bio: "Engineering lead building next-gen performance analysis infrastructure. 10+ years in sports analytics.",
    skills: ["Data Analytics", "Performance Tracking", "GPS Monitoring"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Emma Johansson", company: "Chelsea FC", role: "Sports Scientist",
    location: "London, UK", score: 8.0, mutualConnections: 3,
    bio: "Sports scientist specializing in load management and periodization strategies for elite football.",
    skills: ["Load Management", "Periodization", "Testing"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Carlos Mendez", company: "Real Madrid", role: "S&C Coach",
    location: "Madrid, Spain", score: 7.8, mutualConnections: 6,
    bio: "Strength & conditioning specialist focused on power development and injury risk reduction.",
    skills: ["S&C Training", "Power Development", "Injury Prevention"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Amara Diallo", company: "Juventus", role: "Team Doctor",
    location: "Turin, Italy", score: 9.1, mutualConnections: 10,
    bio: "Head team doctor with expertise in acute sports injuries and return-to-play protocols.",
    skills: ["Sports Medicine", "Acute Care", "Return to Play"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Liam O'Connor", company: "Liverpool FC", role: "Nutritionist",
    location: "Liverpool, UK", score: 7.2, mutualConnections: 4,
    bio: "Performance nutritionist crafting individualized fueling strategies for elite football players.",
    skills: ["Sports Nutrition", "Supplementation", "Body Composition"],
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
  },
];

const scoreColor = (score: number) => {
  if (score >= 9) return "bg-primary text-primary-foreground";
  if (score >= 7) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemAnim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function NetworkingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = onlineUsers[currentIndex];

  const handleShuffle = useCallback(() => {
    let next: number;
    do {
      next = Math.floor(Math.random() * onlineUsers.length);
    } while (next === currentIndex && onlineUsers.length > 1);
    setCurrentIndex(next);
  }, [currentIndex]);

  const filteredUsers = onlineUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Hero Match Card */}
      <motion.div variants={itemAnim} className="rounded-2xl border border-border bg-card shadow-sm p-8 text-center max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Profile Photo */}
            <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full border-4 border-border overflow-hidden">
                <img
                  src={currentUser.image}
                  alt={currentUser.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card bg-success" />
            </div>

            {/* Info */}
            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <p className="text-sm font-semibold text-primary mt-0.5">{currentUser.company}</p>
            <p className="text-sm text-muted-foreground">{currentUser.role}</p>

            <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">
              {currentUser.bio}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {currentUser.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* LinkedIn */}
            <a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium mt-3 hover:underline">
              <Linkedin className="h-4 w-4" /> View LinkedIn Profile
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Shuffle className="h-4 w-4" /> Shuffle & Match
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
            <UserPlus className="h-4 w-4" /> Connect
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
            <Send className="h-4 w-4" /> Message
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemAnim} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search members by name, company, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </motion.div>

      {/* Online Now */}
      <motion.div variants={itemAnim}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Online Now
          </h2>
          <span className="text-sm text-muted-foreground">{filteredUsers.length} members</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredUsers.map((u) => (
            <motion.div
              key={u.name}
              variants={itemAnim}
              className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img src={u.image} alt={u.name} className="h-12 w-12 rounded-full object-cover" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground truncate">{u.name}</h3>
                    <span className={cn("shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold", scoreColor(u.score))}>
                      {u.score}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-primary">{u.company}</p>
                  <p className="text-xs text-muted-foreground">{u.role}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {u.location}
              </div>

              {/* Bio */}
              <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">{u.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {u.skills.map((skill) => (
                  <span key={skill} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-3">
                  <a href="#" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                    <Linkedin className="h-3 w-3" /> LinkedIn
                  </a>
                  <span className="text-xs text-muted-foreground">{u.mutualConnections} mutual</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                  <UserPlus className="h-3.5 w-3.5" /> Connect
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  <Send className="h-3.5 w-3.5" /> Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
