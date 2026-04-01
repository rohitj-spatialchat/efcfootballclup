import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Lock, Globe, Search, Dumbbell, FlaskConical, Apple, Brain, Stethoscope, Zap, HeartPulse } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const groupsList = [
  {
    slug: "sport-exercise",
    label: "Sport & Exercise",
    icon: Dumbbell,
    description: "Training methodologies, physical performance optimization in football.",
    memberCount: 342,
    privacy: "Open" as const,
    joined: true,
    color: "from-emerald-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=300&fit=crop",
  },
  {
    slug: "science",
    label: "Science",
    icon: FlaskConical,
    description: "Sports science research, data analytics and evidence-based practice.",
    memberCount: 287,
    privacy: "Open" as const,
    joined: true,
    color: "from-blue-400 to-indigo-500",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=300&fit=crop",
  },
  {
    slug: "nutrition",
    label: "Nutrition",
    icon: Apple,
    description: "Nutritional strategies for elite athlete performance and recovery.",
    memberCount: 198,
    privacy: "Open" as const,
    joined: true,
    color: "from-orange-400 to-red-500",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=300&fit=crop",
  },
  {
    slug: "sport-psychology",
    label: "Sport Psychology",
    icon: Brain,
    description: "Mental performance, psychological readiness and athlete wellbeing.",
    memberCount: 156,
    privacy: "Private" as const,
    joined: true,
    color: "from-purple-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=300&fit=crop",
  },
  {
    slug: "medical-physiotherapy",
    label: "Medical & Physiotherapy",
    icon: Stethoscope,
    description: "Injury management, rehabilitation protocols and medical best practices.",
    memberCount: 412,
    privacy: "Private" as const,
    joined: false,
    color: "from-cyan-400 to-blue-500",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=300&fit=crop",
  },
  {
    slug: "strength-power",
    label: "Strength & Power",
    icon: Zap,
    description: "Strength training, power development and resistance programming.",
    memberCount: 231,
    privacy: "Open" as const,
    joined: false,
    color: "from-amber-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop",
  },
  {
    slug: "fitness-exercise-physiology",
    label: "Fitness & Exercise Physiology",
    icon: HeartPulse,
    description: "Cardiovascular fitness, exercise physiology and endurance training.",
    memberCount: 178,
    privacy: "Open" as const,
    joined: true,
    color: "from-rose-400 to-red-500",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=300&fit=crop",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const ExploreGroups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState(groupsList);
  const { toast } = useToast();

  const filteredGroups = groups.filter((g) =>
    g.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinToggle = (slug: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.slug !== slug) return g;
        const newJoined = !g.joined;
        toast({
          title: newJoined ? `Joined ${g.label}` : `Left ${g.label}`,
          description: newJoined ? "You are now a member of this group." : "You have left this group.",
        });
        return { ...g, joined: newJoined, memberCount: newJoined ? g.memberCount + 1 : g.memberCount - 1 };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Explore Groups</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover and join communities that match your interests
          </p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      {/* Groups Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {filteredGroups.map((group) => (
          <motion.div
            key={group.slug}
            variants={item}
            className="rounded-xl border border-border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow group/card"
          >
            {/* Cover Image */}
            <Link to={`/groups/${group.slug}`}>
              <div className={`h-36 bg-gradient-to-br ${group.color} relative overflow-hidden`}>
                <img
                  src={group.image}
                  alt={group.label}
                  className="w-full h-full object-cover opacity-60 group-hover/card:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="h-10 w-10 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <group.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Content */}
            <div className="p-4 space-y-3">
              <Link to={`/groups/${group.slug}`}>
                <h3 className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                  {group.label}
                </h3>
              </Link>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {group.description}
              </p>

              {/* Meta Row */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {group.memberCount.toLocaleString()}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] px-2 py-0 ${
                    group.privacy === "Private"
                      ? "border-amber-500/30 text-amber-600"
                      : "border-emerald-500/30 text-emerald-600"
                  }`}
                >
                  {group.privacy === "Private" ? (
                    <Lock className="h-2.5 w-2.5 mr-1" />
                  ) : (
                    <Globe className="h-2.5 w-2.5 mr-1" />
                  )}
                  {group.privacy}
                </Badge>
              </div>

              {/* Join Button */}
              <Button
                variant={group.joined ? "outline" : "default"}
                size="sm"
                className="w-full text-xs"
                onClick={() => handleJoinToggle(group.slug)}
              >
                {group.joined ? "Joined" : "Join Group"}
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No groups found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default ExploreGroups;
