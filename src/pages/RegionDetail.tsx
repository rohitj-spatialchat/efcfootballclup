import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  MapPin,
  Users,
  Globe,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  Flag,
  Info,
  MoreHorizontal,
  UserPlus,
  CheckCircle2,
  Pin,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EFC_REGIONS, EFC_COUNTRIES } from "@/lib/efcData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const regionBanners: Record<string, string> = {
  "Southeast Europe": "https://images.unsplash.com/photo-1555990538-32ec1ed7c4e0?w=900&h=300&fit=crop",
  "England": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&h=300&fit=crop",
  "Scotland": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=300&fit=crop",
  "Ireland": "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=900&h=300&fit=crop",
  "Northern Ireland": "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=900&h=300&fit=crop",
  "Wales": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&h=300&fit=crop",
  "German-Speaking Core": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&h=300&fit=crop",
  "Eurasian": "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=900&h=300&fit=crop",
  "Benelux": "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?w=900&h=300&fit=crop",
  "Central Europe": "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=900&h=300&fit=crop",
  "Scandinavia": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&h=300&fit=crop",
  "Central-South Europe": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&h=300&fit=crop",
  "Eastern Europe": "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=900&h=300&fit=crop",
  "Iberia": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=900&h=300&fit=crop",
};

const FALLBACK_BANNER =
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&h=300&fit=crop";

const samplePosts = (region: string) => [
  {
    id: 1,
    author: "Marco Rossi",
    role: "Head of Performance",
    time: "2h ago",
    title: `${region} tactical roundtable next week`,
    body: `Excited to share that our ${region} working group will host a tactical roundtable next week. Looking forward to insights on pressing structures across our member clubs.`,
    likes: 42,
    comments: 8,
    shares: 3,
    pinned: true,
  },
  {
    id: 2,
    author: "Anna Schmidt",
    role: "Sports Scientist",
    time: "1d ago",
    title: "GPS load monitoring benchmarks released",
    body: `New benchmark report on GPS load monitoring across ${region} academies is now available in the Knowledge Hub. Strong correlation between weekly load variability and soft tissue injuries.`,
    likes: 87,
    comments: 21,
    shares: 14,
    pinned: false,
  },
  {
    id: 3,
    author: "Lukas Novak",
    role: "U19 Coach",
    time: "2d ago",
    title: "Youth coaches meetup — open invitation",
    body: `Open invitation: ${region} youth coaches meetup this Friday on SpatialChat. Topic: transition from academy to first team. Drop a comment to RSVP.`,
    likes: 31,
    comments: 12,
    shares: 2,
    pinned: false,
  },
];

const initials = (n: string) =>
  n.split(" ").map((p) => p[0]).join("").slice(0, 2);

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemAnim = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

type TabKey = "discussions" | "countries" | "events" | "about";

export default function RegionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const region = EFC_REGIONS.find((r) => slugify(r) === slug);

  const [activeTab, setActiveTab] = useState<TabKey>("discussions");
  const [requested, setRequested] = useState(false);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  if (!region) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <MapPin className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm mb-4">Region not found.</p>
        <Button variant="outline" onClick={() => navigate("/explore-regions")}>
          Back to regions
        </Button>
      </div>
    );
  }

  const countries = EFC_COUNTRIES.filter((c) => c.region === region);
  const posts = samplePosts(region);
  const memberCount = countries.length * 47;
  const banner = regionBanners[region] ?? FALLBACK_BANNER;

  const events = [
    { title: `${region} Tactical Roundtable`, date: "Mar 12, 2026", attendees: 45 },
    { title: "Performance Benchmarking Webinar", date: "Mar 19, 2026", attendees: 62 },
    { title: "Youth Pathway Open Q&A", date: "Mar 26, 2026", attendees: 38 },
  ];

  const handleRequest = () => {
    setRequested(true);
    toast({
      title: "Request sent",
      description: `Your request to join ${region} is pending approval.`,
    });
  };

  const tabs: { key: TabKey; label: string; icon: React.ElementType; count?: number }[] = [
    { key: "discussions", label: "Discussions", icon: MessageCircle, count: posts.length },
    { key: "countries", label: "Countries", icon: Flag, count: countries.length },
    { key: "events", label: "Events", icon: Calendar, count: events.length },
    { key: "about", label: "About", icon: Info },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-5"
    >
      <Link
        to="/explore-regions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Regions
      </Link>

      {/* Region Header */}
      <motion.div
        variants={itemAnim}
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <div className="relative">
          <div className="h-64 overflow-hidden">
            <img
              src={banner}
              alt={region}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_BANNER;
              }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex items-end justify-between gap-4">
            <div className="flex items-end gap-4 min-w-0">
              <div className="h-20 w-20 rounded-xl border-4 border-white/20 shadow-lg flex-shrink-0 bg-card flex items-center justify-center">
                <MapPin className="h-9 w-9 text-primary" />
              </div>
              <div className="pb-1 min-w-0">
                <Badge className="bg-white/20 hover:bg-white/20 text-white border-0 text-[10px] mb-1 backdrop-blur-sm">
                  EFC Region
                </Badge>
                <h1 className="text-xl font-bold text-white drop-shadow-md truncate">
                  {region}
                </h1>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" /> {countries.length} countries
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {memberCount.toLocaleString()} members
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleRequest}
                disabled={requested}
                className={cn(
                  "rounded-full",
                  requested && "bg-white/20 border border-white/30 text-white hover:bg-white/20 disabled:opacity-100",
                )}
                variant={requested ? "outline" : "default"}
              >
                {requested ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Requested
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3.5 w-3.5 mr-1" /> Request to Join
                  </>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(`EFC Region — ${region}`);
                      toast({ title: "Link copied!" });
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Share region
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toast({ title: "Notifications muted" })}
                  >
                    <Settings className="h-4 w-4 mr-2" /> Mute notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => toast({ title: "Region reported" })}
                    className="text-destructive focus:text-destructive"
                  >
                    <Flag className="h-4 w-4 mr-2" /> Report region
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count !== undefined && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-1">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Discussions */}
      {activeTab === "discussions" && (
        <div className="space-y-4">
          {posts.map((p) => (
            <motion.div
              key={p.id}
              variants={itemAnim}
              className={cn(
                "rounded-lg border bg-card shadow-sm overflow-hidden",
                p.pinned ? "border-primary/20" : "border-border",
              )}
            >
              {p.pinned && (
                <div className="flex items-center gap-1.5 px-4 pt-3 text-xs text-primary font-medium">
                  <Pin className="h-3 w-3" /> Pinned
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                    {initials(p.author)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">
                        {p.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {p.role}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {p.time}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mt-1.5">
                      {p.title}
                    </h3>
                    <p className="text-sm text-foreground/85 mt-1 leading-relaxed">
                      {p.body}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                      <button
                        onClick={() =>
                          setLiked((l) => ({ ...l, [p.id]: !l[p.id] }))
                        }
                        className={cn(
                          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors",
                          liked[p.id] && "text-rose-500",
                        )}
                      >
                        <Heart
                          className={cn(
                            "h-3.5 w-3.5",
                            liked[p.id] && "fill-rose-500",
                          )}
                        />
                        {p.likes + (liked[p.id] ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors">
                        <MessageCircle className="h-3.5 w-3.5" /> {p.comments}
                      </button>
                      <button
                        onClick={() =>
                          toast({
                            title: "Shared",
                            description: "Post link copied to clipboard.",
                          })
                        }
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-muted transition-colors"
                      >
                        <Share2 className="h-3.5 w-3.5" /> {p.shares}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Countries */}
      {activeTab === "countries" && (
        <motion.div
          variants={itemAnim}
          className="rounded-lg border border-border bg-card shadow-sm p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Flag className="h-4 w-4 text-primary" /> Member Countries
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {countries.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between text-sm px-3 py-2.5 rounded-md hover:bg-muted/60 transition-colors"
              >
                <span className="text-foreground font-medium">{c.name}</span>
                {c.uefaRank && (
                  <Badge variant="outline" className="text-[10px]">
                    UEFA #{c.uefaRank}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Events */}
      {activeTab === "events" && (
        <motion.div
          variants={itemAnim}
          className="rounded-lg border border-border bg-card shadow-sm p-5 space-y-2"
        >
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Upcoming Events
          </h3>
          {events.map((e) => (
            <div
              key={e.title}
              className="flex items-center justify-between p-3 rounded-md border border-border hover:border-primary/30 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center text-[10px] font-semibold shrink-0">
                  {e.date.split(",")[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {e.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {e.attendees} attending · Online
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-full">
                RSVP
              </Button>
            </div>
          ))}
        </motion.div>
      )}

      {/* About */}
      {activeTab === "about" && (
        <motion.div
          variants={itemAnim}
          className="rounded-lg border border-border bg-card shadow-sm p-5 space-y-4"
        >
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> About this region
            </h3>
            <p className="text-sm text-foreground/85 leading-relaxed">
              Connect with member clubs, federations and practitioners across {region}. Share insights, attend events and collaborate on the future of football in your region.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md bg-muted/40 p-3 text-center">
              <div className="text-lg font-bold text-foreground">{countries.length}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Countries</div>
            </div>
            <div className="rounded-md bg-muted/40 p-3 text-center">
              <div className="text-lg font-bold text-foreground">{memberCount.toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Members</div>
            </div>
            <div className="rounded-md bg-muted/40 p-3 text-center">
              <div className="text-lg font-bold text-foreground">{countries.length * 6}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Clubs</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
