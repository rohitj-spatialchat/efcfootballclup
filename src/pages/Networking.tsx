import { motion } from "framer-motion";
import { Search, Shuffle, Users, Video, MapPin, Briefcase, ChevronDown, Flame } from "lucide-react";
import { useState } from "react";

const people = [
  { name: "Dr. Marco Rossi", role: "Head of Sports Medicine", club: "AC Milan", country: "Italy", avatar: "MR", karma: 1890, online: true },
  { name: "Sarah Mitchell", role: "Lead Physiotherapist", club: "Manchester City", country: "England", avatar: "SM", karma: 1560, online: true },
  { name: "Alex Chen", role: "Performance Analyst", club: "Bayern Munich", country: "Germany", avatar: "AC", karma: 1240, online: true },
  { name: "Emma Johansson", role: "Sports Scientist", club: "Chelsea FC", country: "Sweden", avatar: "EJ", karma: 980, online: false },
  { name: "Carlos Mendez", role: "Strength & Conditioning", club: "Real Madrid", country: "Spain", avatar: "CM", karma: 870, online: true },
  { name: "Yuki Tanaka", role: "Rehabilitation Specialist", club: "PSG", country: "Japan", avatar: "YT", karma: 720, online: false },
  { name: "Amara Diallo", role: "Team Doctor", club: "Juventus", country: "Senegal", avatar: "AD", karma: 640, online: true },
  { name: "Liam O'Connor", role: "Nutrition Specialist", club: "Liverpool FC", country: "Ireland", avatar: "LO", karma: 590, online: false },
];

const filters = ["All", "Online Now", "My Network"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function NetworkingPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "Online Now" ? people.filter(p => p.online) : people;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Networking</h1>
          <p className="text-sm text-muted-foreground mt-1">Connect with community members for meaningful conversations</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Shuffle className="h-4 w-4" /> Shuffle & Match
        </button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={item} className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members..."
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  activeFilter === f ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Role <ChevronDown className="h-3 w-3" />
          </span>
        </div>
      </motion.div>

      {/* People Table - Leaderboard Style */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Community Members
          </h2>
          <span className="text-xs text-muted-foreground">{filtered.length} members</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border">
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Role</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground">Club</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Karma</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((m) => (
                <tr key={m.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                          {m.avatar}
                        </div>
                        {m.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{m.name}</span>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {m.country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Briefcase className="h-3 w-3" /> {m.role}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-foreground">{m.club}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                      <Flame className="h-3 w-3 text-warning" /> {m.karma.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Video className="h-3 w-3" /> Connect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
