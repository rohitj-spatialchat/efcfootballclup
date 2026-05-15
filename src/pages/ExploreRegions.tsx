import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EFC_REGIONS, EFC_COUNTRIES } from "@/lib/efcData";

const regionMeta: Record<string, { gradient: string; image: string; tagline: string }> = {
  "Southeast Europe":     { gradient: "from-amber-400 to-orange-500", image: "https://images.unsplash.com/photo-1555990538-32ec1ed7c4e0?w=600&h=300&fit=crop", tagline: "Balkan football culture and tactical heritage." },
  "England":              { gradient: "from-rose-400 to-red-500",     image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?w=600&h=300&fit=crop", tagline: "Home of the Premier League and modern football." },
  "Scotland":             { gradient: "from-blue-400 to-indigo-500",  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop", tagline: "Highland clubs, history and rivalry." },
  "Ireland":              { gradient: "from-emerald-400 to-teal-500", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=600&h=300&fit=crop", tagline: "Emerald isle football community." },
  "Northern Ireland":     { gradient: "from-green-400 to-emerald-500",image: "https://images.unsplash.com/photo-1580130544577-e7c0a8e0e7d6?w=600&h=300&fit=crop", tagline: "Tight-knit clubs and developing talent." },
  "Wales":                { gradient: "from-red-400 to-rose-500",     image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=600&h=300&fit=crop", tagline: "Cymru pride and rising national talent." },
  "German-Speaking Core": { gradient: "from-zinc-500 to-neutral-700", image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=600&h=300&fit=crop", tagline: "Bundesliga-led structure and innovation." },
  "Eurasian":             { gradient: "from-fuchsia-400 to-purple-500",image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=600&h=300&fit=crop", tagline: "Cross-continental football crossroads." },
  "Benelux":              { gradient: "from-orange-400 to-amber-500", image: "https://images.unsplash.com/photo-1534351590666-13e3e96c5017?w=600&h=300&fit=crop", tagline: "Total football and player development." },
  "Central Europe":       { gradient: "from-sky-400 to-cyan-500",     image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&h=300&fit=crop", tagline: "Tradition meets modern coaching." },
  "Scandinavia":          { gradient: "from-cyan-400 to-blue-500",    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=600&h=300&fit=crop", tagline: "Nordic structure and youth pathways." },
  "Central-South Europe": { gradient: "from-yellow-400 to-orange-500",image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=300&fit=crop", tagline: "Tactical mastery and Mediterranean flair." },
  "Eastern Europe":       { gradient: "from-violet-400 to-purple-500",image: "https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=600&h=300&fit=crop", tagline: "Resilience, technique and emerging clubs." },
  "Iberia":               { gradient: "from-pink-400 to-rose-500",    image: "https://images.unsplash.com/photo-1551859548-09b34a8b8c2d?w=600&h=300&fit=crop", tagline: "Possession football and elite academies." },
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export default function ExploreRegions() {
  const [query, setQuery] = useState("");

  const regions = EFC_REGIONS.map((name) => {
    const countries = EFC_COUNTRIES.filter((c) => c.region === name);
    const meta = regionMeta[name] ?? { gradient: "from-slate-400 to-slate-600", image: "", tagline: "EFC member region." };
    return { name, slug: slugify(name), countries, ...meta };
  }).filter((r) => r.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Explore Regions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover EFC regions, their member countries and community activity.
          </p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search regions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {regions.map((r) => (
          <motion.div
            key={r.slug}
            variants={item}
            className="rounded-xl border border-border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow group/card"
          >
            <Link to={`/regions/${r.slug}`}>
              <div className={`h-36 bg-gradient-to-br ${r.gradient} relative overflow-hidden`}>
                {r.image && (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover opacity-60 group-hover/card:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="h-10 w-10 rounded-lg bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-card/80 backdrop-blur-sm border-0 text-[10px]">
                    <Globe className="h-2.5 w-2.5 mr-1" />
                    {r.countries.length} countries
                  </Badge>
                </div>
              </div>
            </Link>

            <div className="p-4 space-y-3">
              <Link to={`/regions/${r.slug}`}>
                <h3 className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                  {r.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{r.tagline}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {(r.countries.length * 47).toLocaleString()} members
                </span>
                <Link to={`/regions/${r.slug}`} className="text-primary hover:underline font-medium">
                  Explore →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {regions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MapPin className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No regions found matching "{query}"</p>
        </div>
      )}
    </div>
  );
}
