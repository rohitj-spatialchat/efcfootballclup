import { motion } from "framer-motion";
import { Search, ChevronRight, ArrowUp, Plus, MoreHorizontal } from "lucide-react";
import efcLogo from "@/assets/efclogo.png";

const onlineUsers = [
  { name: "Alex", avatar: "A" },
  { name: "Sarah", avatar: "S" },
  { name: "Mike", avatar: "M" },
  { name: "Emma", avatar: "E" },
  { name: "Chris", avatar: "C" },
  { name: "Taylor", avatar: "T" },
  { name: "Jordan", avatar: "J" },
  { name: "Casey", avatar: "K" },
  { name: "Morgan", avatar: "O" },
  { name: "Jamie", avatar: "D" },
];

const newsArticles = [
  {
    title: '"Stability gives you strength"- Xherdan Shaqiri on youth development at FC Basel and the choices young players face',
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
  },
  {
    title: "Five standout moments from EFC in 2025",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
  },
  {
    title: "Clubs receive record €9m from UEFA Women's EURO 2025",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=250&fit=crop",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

const Index = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5 max-w-4xl">
      {/* Start Here Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          Start Here
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center text-primary text-[10px] font-semibold">
                {["AW", "JD", "MK"][i - 1]}
              </div>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">+233</span>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            New Post
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Hero Banner - Gradient */}
      <motion.div
        variants={item}
        className="relative rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(190, 80%, 60%), hsl(280, 60%, 65%), hsl(330, 70%, 60%))",
        }}
      >
        <div className="relative p-8 pb-6">
          <div className="flex items-start justify-between">
            <img src={efcLogo} alt="EFC Logo" className="h-20 w-20 rounded-full object-cover border-2 border-white/20" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-48 rounded-lg bg-white/90 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 transition-shadow"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mt-8 mb-4">Welcome to the EFC MPU Community</h2>
          {/* Decorative swirl lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 300" fill="none">
              <path d="M0 150 Q200 50 400 150 T800 150" stroke="white" strokeWidth="2" />
              <path d="M0 200 Q200 100 400 200 T800 200" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Info Cards Row */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Spatial Rooms */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">Spatial Rooms</h3>
          <p className="text-xs text-muted-foreground">United Kingdom EFC MPU Event</p>
          <p className="text-xs text-muted-foreground mb-2">65 speakers in Geography</p>
          <button className="inline-flex items-center rounded-full bg-success px-3 py-1 text-xs font-medium text-success-foreground hover:bg-success/90 transition-colors">
            Join Now
          </button>
        </div>

        {/* Announcements */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">Announcements</h3>
          <p className="text-xs text-muted-foreground">Apr 22, 2024</p>
        </div>

        {/* New Feature Update */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">New Feature Update</h3>
          <p className="text-xs text-muted-foreground">AI Assistant Live</p>
        </div>

        {/* Engagement Score */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-1">Your Engagement Score</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-foreground">78</span>
            <span className="text-xs text-success flex items-center gap-0.5 font-medium">
              <ArrowUp className="h-3 w-3" />
              Active this week
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on posts, replies, and interactions</p>
          <button className="mt-2 inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            View Activity Breakdown <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </motion.div>

      {/* People You Follow - Online Now */}
      <motion.div variants={item}>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          People You Follow - Online Now{" "}
          <span className="text-xs font-normal text-muted-foreground">(Active right now - start a conversation)</span>
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          {onlineUsers.map((u, i) => (
            <div key={i} className="relative cursor-pointer">
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold border-2 border-card">
                {u.avatar}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-success" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* News Articles */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {newsArticles.map((article, i) => (
            <div key={i} className="group cursor-pointer">
              <p className="text-xs text-foreground font-medium mb-2 line-clamp-3 group-hover:text-primary transition-colors">
                {article.title}
              </p>
              <div className="rounded-lg overflow-hidden aspect-[16/10]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
