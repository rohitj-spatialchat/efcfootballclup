import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, MapPin, Users, Globe, MessageCircle, Heart, Share2, Calendar, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EFC_REGIONS, EFC_COUNTRIES } from "@/lib/efcData";
import { useToast } from "@/hooks/use-toast";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const regionGradient: Record<string, string> = {
  "Southeast Europe": "from-amber-500 to-orange-600",
  "England": "from-rose-500 to-red-600",
  "Scotland": "from-blue-500 to-indigo-600",
  "Ireland": "from-emerald-500 to-teal-600",
  "Northern Ireland": "from-green-500 to-emerald-600",
  "Wales": "from-red-500 to-rose-600",
  "German-Speaking Core": "from-zinc-600 to-neutral-800",
  "Eurasian": "from-fuchsia-500 to-purple-600",
  "Benelux": "from-orange-500 to-amber-600",
  "Central Europe": "from-sky-500 to-cyan-600",
  "Scandinavia": "from-cyan-500 to-blue-600",
  "Central-South Europe": "from-yellow-500 to-orange-600",
  "Eastern Europe": "from-violet-500 to-purple-600",
  "Iberia": "from-pink-500 to-rose-600",
};

const samplePosts = (region: string) => [
  {
    id: 1,
    author: "Marco Rossi",
    role: "Head of Performance",
    time: "2h ago",
    content: `Excited to share that our ${region} working group will host a tactical roundtable next week. Looking forward to insights on pressing structures across our member clubs.`,
    likes: 42, comments: 8, shares: 3,
  },
  {
    id: 2,
    author: "Anna Schmidt",
    role: "Sports Scientist",
    time: "1d ago",
    content: `New benchmark report on GPS load monitoring across ${region} academies is now available in the Knowledge Hub. Strong correlation between weekly load variability and soft tissue injuries.`,
    likes: 87, comments: 21, shares: 14,
  },
  {
    id: 3,
    author: "Lukas Novak",
    role: "U19 Coach",
    time: "2d ago",
    content: `Open invitation: ${region} youth coaches meetup this Friday on SpatialChat. Topic: transition from academy to first team. Drop a comment to RSVP.`,
    likes: 31, comments: 12, shares: 2,
  },
];

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

export default function RegionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const region = EFC_REGIONS.find((r) => slugify(r) === slug);

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
  const gradient = regionGradient[region] ?? "from-slate-500 to-slate-700";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <Link
        to="/explore-regions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to Regions
      </Link>

      {/* Hero */}
      <div className={`rounded-2xl bg-gradient-to-br ${gradient} relative overflow-hidden p-8 text-white shadow-elevated`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <Badge className="bg-white/20 hover:bg-white/20 text-white border-0 text-[10px]">EFC Region</Badge>
            </div>
            <h1 className="text-3xl font-bold">{region}</h1>
            <p className="text-sm text-white/80 mt-2 max-w-xl">
              Connect with member clubs, federations and practitioners across {region}.
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs text-white/80">
              <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> {countries.length} countries</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {(countries.length * 47).toLocaleString()} members</span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-foreground hover:bg-white/90"
            onClick={() => toast({ title: `Joined ${region}`, description: "You'll see updates from this region in your feed." })}
          >
            Join Region
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent posts</h2>
          {posts.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                  {initials(p.author)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{p.author}</span>
                    <span className="text-xs text-muted-foreground">· {p.role}</span>
                    <span className="text-xs text-muted-foreground">· {p.time}</span>
                  </div>
                  <p className="text-sm text-foreground/90 mt-2 leading-relaxed">{p.content}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <button
                      onClick={() => setLiked((l) => ({ ...l, [p.id]: !l[p.id] }))}
                      className={`flex items-center gap-1.5 hover:text-foreground transition-colors ${liked[p.id] ? "text-rose-500" : ""}`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${liked[p.id] ? "fill-rose-500" : ""}`} />
                      {p.likes + (liked[p.id] ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                      <MessageCircle className="h-3.5 w-3.5" /> {p.comments}
                    </button>
                    <button
                      onClick={() => toast({ title: "Shared", description: "Post link copied to clipboard." })}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      <Share2 className="h-3.5 w-3.5" /> {p.shares}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Flag className="h-4 w-4 text-primary" /> Member Countries
            </h3>
            <div className="space-y-1.5">
              {countries.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs px-2 py-1.5 rounded-md hover:bg-muted/60 transition-colors">
                  <span className="text-foreground">{c.name}</span>
                  {c.uefaRank && (
                    <Badge variant="outline" className="text-[10px]">UEFA #{c.uefaRank}</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Upcoming
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { d: "Mar 12", t: `${region} Tactical Roundtable` },
                { d: "Mar 19", t: "Performance Benchmarking Webinar" },
                { d: "Mar 26", t: "Youth Pathway Open Q&A" },
              ].map((e) => (
                <div key={e.t} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/60 transition-colors">
                  <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center text-[10px] font-semibold shrink-0">
                    {e.d}
                  </div>
                  <span className="text-foreground/90">{e.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-3">Region stats</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-lg font-bold text-foreground">{countries.length}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Countries</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-lg font-bold text-foreground">{(countries.length * 47).toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Members</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-lg font-bold text-foreground">{countries.length * 6}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Clubs</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-lg font-bold text-foreground">{countries.length * 3}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Events / mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
