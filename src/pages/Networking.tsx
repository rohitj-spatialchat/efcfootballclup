import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Shuffle, Search, MapPin, UserPlus, Send, Trophy, Flag, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTeamLogo, getTeamLogoFallback, normalizeMember } from "@/lib/efcData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserAvatarUrl } from "@/lib/userAvatar";

const onlineUsers = [
  {
    name: "Dr. Marco Rossi",
    team: "AC Milan",
    country: "Italy",
    role: "Sports Medicine",
    location: "Milan, Italy",
    score: 9.4,
    mpuPoints: 87500,
    mutualConnections: 12,
    bio: "Leading sports medicine specialist at AC Milan. Passionate about injury prevention and athlete longevity.",
    skills: ["Sports Medicine", "Injury Prevention", "Rehabilitation"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Sarah Mitchell",
    team: "Manchester City",
    country: "England",
    role: "Physiotherapist",
    location: "Manchester, UK",
    score: 9.2,
    mpuPoints: 72300,
    mutualConnections: 8,
    bio: "Lead physiotherapist specializing in elite athlete recovery and return-to-play protocols.",
    skills: ["Physiotherapy", "Recovery", "Biomechanics"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Alex Chen",
    team: "Bayern Munich",
    country: "Germany",
    role: "Performance Analyst",
    location: "Munich, Germany",
    score: 8.5,
    mpuPoints: 54800,
    mutualConnections: 5,
    bio: "Engineering lead building next-gen performance analysis infrastructure. 10+ years in sports analytics.",
    skills: ["Data Analytics", "Performance Tracking", "GPS Monitoring"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Emma Johansson",
    team: "Chelsea FC",
    country: "Sweden",
    role: "Sports Scientist",
    location: "London, UK",
    score: 8.0,
    mpuPoints: 41200,
    mutualConnections: 3,
    bio: "Sports scientist specializing in load management and periodization strategies for elite football.",
    skills: ["Load Management", "Periodization", "Testing"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Carlos Mendez",
    team: "AC Sparta Praha",
    country: "Spain",
    role: "S&C Coach",
    location: "Madrid, Spain",
    score: 7.8,
    mpuPoints: 63400,
    mutualConnections: 6,
    bio: "Strength & conditioning specialist focused on power development and injury risk reduction.",
    skills: ["S&C Training", "Power Development", "Injury Prevention"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Amara Diallo",
    team: "Juventus",
    country: "Senegal",
    role: "Team Doctor",
    location: "Turin, Italy",
    score: 9.1,
    mpuPoints: 95100,
    mutualConnections: 10,
    bio: "Head team doctor with expertise in acute sports injuries and return-to-play protocols.",
    skills: ["Sports Medicine", "Acute Care", "Return to Play"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Liam O'Connor",
    team: "Liverpool FC",
    country: "Ireland",
    role: "Nutritionist",
    location: "Liverpool, UK",
    score: 7.2,
    mpuPoints: 38700,
    mutualConnections: 4,
    bio: "Performance nutritionist crafting individualized fueling strategies for elite football players.",
    skills: ["Sports Nutrition", "Supplementation", "Body Composition"],
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
  },
];

function formatPoints(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);
}

const scoreColor = (score: number) => {
  if (score >= 9) return "bg-primary text-primary-foreground";
  if (score >= 7) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const itemAnim = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function NetworkingPage() {
  const { users: authUsers, user: currentAuthUser } = useAuth();

  const allUsers = useMemo(() => {
    // Normalize hardcoded entries against EFC data
    const normalizedOnline = onlineUsers.map((u) => {
      const n = normalizeMember(u.country, u.team);
      return { ...u, country: n.country, team: n.team, location: u.location.replace(u.country, n.country) };
    });
    const existingNames = new Set(normalizedOnline.map((u) => u.name.toLowerCase()));
    const authNetworkUsers = authUsers
      .filter((u) => !existingNames.has(`${u.firstName} ${u.lastName}`.trim().toLowerCase()))
      .map((u) => {
        const n = normalizeMember(u.country, u.club);
        return {
          name: `${u.firstName} ${u.lastName}`.trim(),
          team: n.team,
          country: n.country,
          role: u.position || u.role || "Member",
          location: n.country,
          score: +(Math.random() * 3 + 6.5).toFixed(1),
          mpuPoints: Math.floor(Math.random() * 60000 + 30000),
          mutualConnections: Math.floor(Math.random() * 10 + 1),
          bio: u.bio || `${u.role} at ${n.team}. Passionate about football and professional development.`,
          skills: u.interests?.slice(0, 3) || [u.position || "Football", "Networking", "Development"],
          image: getUserAvatarUrl(u.firstName, u.lastName),
        };
      });
    return [...normalizedOnline, ...authNetworkUsers];
  }, [authUsers]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();
  const currentUser = allUsers[currentIndex];

  const handleShuffle = useCallback(() => {
    let next: number;
    do {
      next = Math.floor(Math.random() * allUsers.length);
    } while (next === currentIndex && allUsers.length > 1);
    setCurrentIndex(next);
  }, [currentIndex]);

  const handleConnect = (name: string) => {
    if (connectedUsers.has(name)) {
      setConnectedUsers(prev => { const n = new Set(prev); n.delete(name); return n; });
      toast({ title: "Connection removed", description: `You disconnected from ${name}.` });
    } else {
      setConnectedUsers(prev => new Set(prev).add(name));
      toast({ title: "Connection request sent!", description: `You sent a connection request to ${name}.` });
    }
  };

  const handleMessage = (name: string) => {
    toast({ title: "Opening chat...", description: `Starting conversation with ${name}.` });
    navigate("/chat");
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Hero Match Card */}
      <motion.div
        variants={itemAnim}
        className="rounded-2xl border border-border bg-card shadow-sm p-8 text-center max-w-xl mx-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full border-4 border-border overflow-hidden">
                <img src={currentUser.image} alt={currentUser.name} className="h-full w-full object-cover" />
              </div>
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card bg-success" />
            </div>

            <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              {getTeamLogo(currentUser.team) && (
                <img src={getTeamLogo(currentUser.team)} alt={currentUser.team} className="h-5 w-5 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getTeamLogoFallback(currentUser.team); }} />
              )}
              <p className="text-sm font-semibold text-primary">{currentUser.team}</p>
            </div>
            <p className="text-sm text-foreground">{currentUser.role}</p>

            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Flag className="h-3 w-3" /> {currentUser.country}
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="h-3 w-3 text-primary" /> {formatPoints(currentUser.mpuPoints)} MPU Points
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed">{currentUser.bio}</p>

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

          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Shuffle className="h-4 w-4" /> Shuffle & Match
          </button>
          <button
            onClick={() => handleConnect(currentUser.name)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors",
              connectedUsers.has(currentUser.name)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground hover:bg-muted"
            )}
          >
            {connectedUsers.has(currentUser.name) ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {connectedUsers.has(currentUser.name) ? "Connected" : "Connect"}
          </button>
          <button
            onClick={() => handleMessage(currentUser.name)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <Send className="h-4 w-4" /> Message
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemAnim} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search members by name, team, country, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </motion.div>

      {/* Online Now */}
      <motion.div variants={itemAnim}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Online Now
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
                    <span
                      className={cn(
                        "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold",
                        scoreColor(u.score),
                      )}
                    >
                      {u.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {getTeamLogo(u.team) && (
                      <img src={getTeamLogo(u.team)} alt={u.team} className="h-4 w-4 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getTeamLogoFallback(u.team); }} />
                    )}
                    <p className="text-xs font-medium text-primary">{u.team}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{u.role}</p>
                </div>
              </div>

              {/* Details row */}
              <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Flag className="h-3 w-3" /> {u.country}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-primary" /> {formatPoints(u.mpuPoints)} MPU Points
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs text-muted-foreground mt-2.5 line-clamp-2 leading-relaxed">{u.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {u.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleConnect(u.name)}
                  className={cn(
                    "flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                    connectedUsers.has(u.name)
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {connectedUsers.has(u.name) ? <Check className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
                  {connectedUsers.has(u.name) ? "Connected" : "Connect"}
                </button>
                <button
                  onClick={() => handleMessage(u.name)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
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
