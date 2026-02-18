import { motion } from "framer-motion";
import { Search, Filter, MapPin, Award, Users, Mail } from "lucide-react";
import { useState } from "react";

const members = [
  { name: "Sarah Mitchell", role: "Leadership Coach", team: "Education", location: "San Francisco", karma: 1240, avatar: "SM", online: true },
  { name: "Alex Chen", role: "Tech Strategist", team: "Innovation", location: "New York", karma: 980, avatar: "AC", online: true },
  { name: "Jamie Lawson", role: "Community Manager", team: "Operations", location: "Austin", karma: 2100, avatar: "JL", online: false },
  { name: "Morgan Davis", role: "Design Lead", team: "Creative", location: "London", karma: 870, avatar: "MD", online: true },
  { name: "Chris Rodriguez", role: "Startup Founder", team: "Ventures", location: "Miami", karma: 1560, avatar: "CR", online: false },
  { name: "Taylor Kim", role: "Data Analyst", team: "Innovation", location: "Seattle", karma: 720, avatar: "TK", online: true },
  { name: "Jordan Blake", role: "Content Strategist", team: "Education", location: "Chicago", karma: 640, avatar: "JB", online: false },
  { name: "Casey Nguyen", role: "Product Manager", team: "Operations", location: "Virtual", karma: 1890, avatar: "CN", online: true },
];

const teams = ["All", "Education", "Innovation", "Operations", "Creative", "Ventures"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function CommunityPage() {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const filtered = selectedTeam === "All" ? members : members.filter((m) => m.team === selectedTeam);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Community Members</h1>
        <p className="text-sm text-muted-foreground mt-1">Connect with {members.length} members across the community</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {teams.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTeam(t)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedTeam === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members..."
            className="h-9 w-56 rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <div
            key={m.name}
            className="rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                  {m.avatar}
                </div>
                {m.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{m.name}</p>
                <p className="text-xs text-muted-foreground truncate">{m.role}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{m.team}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{m.location}</span>
              <span className="flex items-center gap-1"><Award className="h-3 w-3" />{m.karma}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-md bg-muted py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
                View Profile
              </button>
              <button className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
                <Mail className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
