import { motion } from "framer-motion";
import { BookOpen, Headphones, Video, Search, Clock, Star, ArrowUpRight } from "lucide-react";
import { useState } from "react";

type TabType = "read" | "listen" | "watch";

const resources = [
  { title: "Building Resilient Teams in Remote Settings", type: "read" as TabType, category: "Leadership", duration: "8 min read", rating: 4.8, author: "Dr. Sarah Mitchell" },
  { title: "The Future of AI in Community Building", type: "read" as TabType, category: "Technology", duration: "12 min read", rating: 4.5, author: "Alex Chen" },
  { title: "Effective Stakeholder Communication", type: "read" as TabType, category: "Communication", duration: "6 min read", rating: 4.9, author: "Jamie Lawson" },
  { title: "Leadership Lessons from Top CEOs", type: "listen" as TabType, category: "Leadership", duration: "35 min", rating: 4.7, author: "EFC Podcast" },
  { title: "Design Thinking for Non-Designers", type: "listen" as TabType, category: "Design", duration: "28 min", rating: 4.6, author: "Morgan Davis" },
  { title: "Networking Strategies That Work", type: "listen" as TabType, category: "Growth", duration: "42 min", rating: 4.4, author: "EFC Podcast" },
  { title: "Mastering Public Speaking", type: "watch" as TabType, category: "Communication", duration: "45 min", rating: 4.9, author: "Chris Rodriguez" },
  { title: "Startup Fundraising 101", type: "watch" as TabType, category: "Ventures", duration: "1h 10min", rating: 4.8, author: "Panel Discussion" },
  { title: "Product Market Fit Workshop", type: "watch" as TabType, category: "Strategy", duration: "55 min", rating: 4.3, author: "Taylor Kim" },
];

const tabs: { key: TabType; label: string; icon: typeof BookOpen }[] = [
  { key: "read", label: "Read", icon: BookOpen },
  { key: "listen", label: "Listen", icon: Headphones },
  { key: "watch", label: "Watch", icon: Video },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<TabType>("read");
  const filtered = resources.filter((r) => r.type === activeTab);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Knowledge Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">Explore curated resources to accelerate your growth</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-medium transition-all ${
                activeTab === tab.key ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources..."
            className="h-9 w-56 rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r, i) => (
          <div
            key={i}
            className="group rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                {r.category}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{r.title}</h3>
            <p className="text-xs text-muted-foreground mb-3">by {r.author}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {r.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-warning" /> {r.rating}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
