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
  Sparkles,
  TrendingUp,
  Trophy,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EFC_REGIONS, EFC_COUNTRIES } from "@/lib/efcData";
import { useToast } from "@/hooks/use-toast";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const regionGradient: Record<string, string> = {
  "Southeast Europe": "from-amber-500 via-orange-500 to-red-600",
  "England": "from-rose-500 via-red-500 to-rose-700",
  "Scotland": "from-blue-500 via-indigo-500 to-blue-700",
  "Ireland": "from-emerald-500 via-teal-500 to-green-700",
  "Northern Ireland": "from-green-500 via-emerald-500 to-teal-700",
  "Wales": "from-red-500 via-rose-500 to-pink-700",
  "German-Speaking Core": "from-zinc-600 via-neutral-700 to-zinc-900",
  "Eurasian": "from-fuchsia-500 via-purple-500 to-violet-700",
  "Benelux": "from-orange-500 via-amber-500 to-yellow-600",
  "Central Europe": "from-sky-500 via-cyan-500 to-blue-700",
  "Scandinavia": "from-cyan-500 via-sky-500 to-blue-700",
  "Central-South Europe": "from-yellow-500 via-orange-500 to-red-600",
  "Eastern Europe": "from-violet-500 via-purple-500 to-fuchsia-700",
  "Iberia": "from-pink-500 via-rose-500 to-red-700",
};

const samplePosts = (region: string) => [
  {
    id: 1,
    author: "Marco Rossi",
    role: "Head of Performance",
    time: "2h ago",
    content: `Excited to share that our ${region} working group will host a tactical roundtable next week. Looking forward to insights on pressing structures across our member clubs.`,
    likes: 42,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    author: "Anna Schmidt",
    role: "Sports Scientist",
    time: "1d ago",
    content: `New benchmark report on GPS load monitoring across ${region} academies is now available in the Knowledge Hub. Strong correlation between weekly load variability and soft tissue injuries.`,
    likes: 87,
    comments: 21,
    shares: 14,
  },
  {
    id: 3,
    author: "Lukas Novak",
    role: "U19 Coach",
    time: "2d ago",
    content: `Open invitation: ${region} youth coaches meetup this Friday on SpatialChat. Topic: transition from academy to first team. Drop a comment to RSVP.`,
    likes: 31,
    comments: 12,
    shares: 2,
  },
];

const initials = (n: string) =>
  n
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default function RegionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const region = EFC_REGIONS.find((r) => slugify(r) === slug);

  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [requested, setRequested] = useState(false);

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
  const gradient = regionGradient[region] ?? "from-slate-500 to-slate-700";

  const trending = [
    { tag: "TacticalAnalysis", posts: 124 },
    { tag: "YouthDevelopment", posts: 98 },
    { tag: "SportsScience", posts: 76 },
    { tag: "SetPieces", posts: 54 },
  ];

  const topContributors = [
    { name: "Marco Rossi", role: "Head of Performance", points: 2840 },
    { name: "Anna Schmidt", role: "Sports Scientist", points: 2310 },
    { name: "Lukas Novak", role: "U19 Coach", points: 1980 },
  ];

  const handleRequest = () => {
    setRequested(true);
    toast({
      title: "Request sent",
      description: `Your request to join ${region} is pending approval.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <Link
        to="/explore-regions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Regions
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl bg-gradient-to-br ${gradient} relative overflow-hidden p-8 sm:p-10 text-white shadow-xl`}
      >
        {/* decorative orbs */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-black/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />

        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-1 ring-white/30">
                <MapPin className="h-5 w-5" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/20 text-white border-0 text-[10px] backdrop-blur-md">
                <Sparkles className="h-2.5 w-2.5 mr-1" /> EFC Region
              </Badge>
              <Badge className="bg-emerald-400/20 text-emerald-50 hover:bg-emerald-400/20 border-0 text-[10px] backdrop-blur-md">
                <Activity className="h-2.5 w-2.5 mr-1" /> Active now
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{region}</h1>
            <p className="text-sm sm:text-base text-white/85 mt-3 leading-relaxed">
              Connect with member clubs, federations and practitioners across {region}. Share insights, attend events and collaborate on the future of football.
            </p>
            <div className="flex items-center gap-5 mt-5 text-xs sm:text-sm text-white/85">
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4" /> {countries.length} countries
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {(countries.length * 47).toLocaleString()} members
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="h-4 w-4" /> {countries.length * 12} posts this week
              </span>
            </div>
          </div>

          <Button
            disabled={requested}
            onClick={handleRequest}
            className="bg-white text-foreground hover:bg-white/90 disabled:opacity-100 disabled:bg-white/90 shadow-lg"
          >
            {requested ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Request Pending
              </>
            ) : (
              <>Request to Join</>
            )}
          </Button>
        </div>

        {/* hero stat strip */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { label: "Countries", value: countries.length, icon: Globe },
            { label: "Members", value: (countries.length * 47).toLocaleString(), icon: Users },
            { label: "Clubs", value: countries.length * 6, icon: Trophy },
            { label: "Events / mo", value: countries.length * 3, icon: Calendar },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-4"
            >
              <div className="flex items-center gap-2 text-white/80 text-[11px] uppercase tracking-wider">
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </div>
              <div className="text-2xl font-bold mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Recent posts
            </h2>
            <button className="text-xs text-primary font-medium hover:underline">
              View all
            </button>
          </div>

          {posts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center text-xs font-semibold shrink-0 ring-1 ring-primary/20">
                  {initials(p.author)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">
                      {p.author}
                    </span>
                    <span className="text-xs text-muted-foreground">· {p.role}</span>
                    <span className="text-xs text-muted-foreground">· {p.time}</span>
                  </div>
                  <p className="text-sm text-foreground/90 mt-2 leading-relaxed">
                    {p.content}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                    <button
                      onClick={() =>
                        setLiked((l) => ({ ...l, [p.id]: !l[p.id] }))
                      }
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors ${
                        liked[p.id] ? "text-rose-500" : ""
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          liked[p.id] ? "fill-rose-500" : ""
                        }`}
                      />
                      {p.likes + (liked[p.id] ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors">
                      <MessageCircle className="h-3.5 w-3.5" /> {p.comments}
                    </button>
                    <button
                      onClick={() =>
                        toast({
                          title: "Shared",
                          description: "Post link copied to clipboard.",
                        })
                      }
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Share2 className="h-3.5 w-3.5" /> {p.shares}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          {/* Member countries */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Flag className="h-4 w-4 text-primary" /> Member Countries
            </h3>
            <div className="space-y-1">
              {countries.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between text-xs px-2.5 py-2 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer"
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
          </div>

          {/* Trending topics */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Trending in {region}
            </h3>
            <div className="flex flex-wrap gap-2">
              {trending.map((t) => (
                <button
                  key={t.tag}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary text-xs font-medium transition-colors"
                >
                  #{t.tag}
                  <span className="text-[10px] text-muted-foreground group-hover:text-primary">
                    {t.posts}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Upcoming
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { d: "Mar 12", t: `${region} Tactical Roundtable` },
                { d: "Mar 19", t: "Performance Benchmarking Webinar" },
                { d: "Mar 26", t: "Youth Pathway Open Q&A" },
              ].map((e) => (
                <div
                  key={e.t}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center text-[10px] font-semibold shrink-0 ring-1 ring-primary/15">
                    {e.d}
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{e.t}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      Online · Free for members
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top contributors */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" /> Top Contributors
            </h3>
            <div className="space-y-2.5">
              {topContributors.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center text-[11px] font-semibold ring-1 ring-primary/20">
                      {initials(c.name)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center ring-2 ring-card">
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {c.role}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-primary">
                    {c.points.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
