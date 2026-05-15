import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, MapPin, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EFC_REGIONS, EFC_COUNTRIES } from "@/lib/efcData";

const regionMeta: Record<string, { gradient: string; tagline: string }> = {
  "Southeast Europe":     { gradient: "from-amber-400 via-orange-500 to-red-500",      tagline: "Balkan football culture and tactical heritage." },
  "England":              { gradient: "from-rose-400 via-red-500 to-rose-600",         tagline: "Home of the Premier League and modern football." },
  "Scotland":             { gradient: "from-blue-400 via-indigo-500 to-blue-700",      tagline: "Highland clubs, history and rivalry." },
  "Ireland":              { gradient: "from-emerald-400 via-teal-500 to-green-600",    tagline: "Emerald isle football community." },
  "Northern Ireland":     { gradient: "from-green-400 via-emerald-500 to-teal-600",    tagline: "Tight-knit clubs and developing talent." },
  "Wales":                { gradient: "from-red-400 via-rose-500 to-pink-600",         tagline: "Cymru pride and rising national talent." },
  "German-Speaking Core": { gradient: "from-zinc-500 via-neutral-700 to-zinc-800",     tagline: "Bundesliga-led structure and innovation." },
  "Eurasian":             { gradient: "from-fuchsia-400 via-purple-500 to-violet-600", tagline: "Cross-continental football crossroads." },
  "Benelux":              { gradient: "from-orange-400 via-amber-500 to-yellow-600",   tagline: "Total football and player development." },
  "Central Europe":       { gradient: "from-sky-400 via-cyan-500 to-blue-600",         tagline: "Tradition meets modern coaching." },
  "Scandinavia":          { gradient: "from-cyan-400 via-sky-500 to-blue-600",         tagline: "Nordic structure and youth pathways." },
  "Central-South Europe": { gradient: "from-yellow-400 via-orange-500 to-red-500",     tagline: "Tactical mastery and Mediterranean flair." },
  "Eastern Europe":       { gradient: "from-violet-400 via-purple-500 to-fuchsia-600", tagline: "Resilience, technique and emerging clubs." },
  "Iberia":               { gradient: "from-pink-400 via-rose-500 to-red-600",         tagline: "Possession football and elite academies." },
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
