import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowUp, MoreHorizontal, ThumbsUp, MessageSquare, Share2, Pencil, Clock, TrendingUp as TrendingIcon } from "lucide-react";
import { useState } from "react";
import efcLogo from "@/assets/efclogo.png";

const featuredPosts = [
  {
    title: "🏟️ EFC MPU 2025 Injury Prevention Summit | Register Now...",
    desc: "Hello Members 🎉 We're thrilled to announce the upcoming summit focusing on...",
    author: "Community Admin",
  },
  {
    title: "🌍 Football Medicine Conference in Germany | ...",
    desc: "Hello, learners! Ready to take your career in football medicine gl...",
    author: "Community Admin",
  },
  {
    title: "⚽ World Day of Sports Medicine | Let's Share ...",
    desc: "Hello, Members! At EFC, we believe that...",
    author: "Community Admin",
  },
];

const posts = [
  {
    author: "Dr. Marco Rossi",
    avatar: "MR",
    time: "27m ago",
    channel: "Feed",
    title: "When innovation becomes optics, credibility becomes collateral.",
    body: "The recent developments in football injury prevention technology have raised important questions about evidence-based practice vs. marketing claims.\n\nIt's a credibility test.\n\nIn the sports science era, perception moves faster than verification. But practitioners cannot afford to confuse showcasing technology with claiming validated outcomes.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
    likes: 42,
    comments: 12,
  },
  {
    author: "Sarah Mitchell",
    avatar: "SM",
    time: "2h ago",
    channel: "Feed",
    title: "Hamstring injury prevention: what the latest research tells us",
    body: "Just published our latest findings on eccentric strengthening protocols for elite footballers. The Nordic hamstring exercise remains the gold standard, but there's growing evidence for complementary approaches.\n\nKey takeaway: Individualised load management combined with targeted strengthening reduces hamstring injuries by up to 65%.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    likes: 89,
    comments: 23,
  },
  {
    author: "Alex Chen",
    avatar: "AC",
    time: "5h ago",
    channel: "Science",
    title: "GPS data and its role in injury risk assessment",
    body: "We've been tracking high-speed running distance and acceleration patterns across our first team squad for 3 seasons now. The correlation between acute:chronic workload ratio spikes and soft tissue injuries is striking.\n\nHere's what we've learned about practical thresholds...",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=400&fit=crop",
    likes: 56,
    comments: 18,
  },
  {
    author: "Emma Johansson",
    avatar: "EJ",
    time: "8h ago",
    channel: "Feed",
    title: "Return to play after ACL reconstruction: a multidisciplinary approach",
    body: "Our club's RTP protocol now includes psychological readiness assessment alongside physical benchmarks. The results have been remarkable — reinjury rates dropped significantly since we adopted this holistic framework.\n\nSharing our complete protocol for discussion...",
    image: null,
    likes: 34,
    comments: 9,
  },
];

const trendingNews = [
  { title: "\"Stability gives you strength\" — Xherdan Shaqiri on youth development at FC Basel", time: "2h ago" },
  { title: "Five standout moments from EFC in 2025", time: "4h ago" },
  { title: "Clubs receive record €9m from UEFA Women's EURO 2025", time: "6h ago" },
  { title: "New study reveals impact of altitude training on injury rates", time: "8h ago" },
];

const filterTabs = [
  { label: "Recent", icon: Clock, active: true },
  { label: "Top Posts", icon: ArrowUp, active: false },
  { label: "Trending", icon: TrendingIcon, active: false, hasDropdown: true },
  { label: "Following", icon: null, active: false },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

const Index = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex gap-6">
      {/* Main Feed Column */}
      <div className="flex-1 space-y-5 min-w-0">
        {/* Hero Banner */}
        <motion.div
          variants={item}
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(190, 80%, 60%), hsl(280, 60%, 65%), hsl(330, 70%, 60%))",
          }}
        >
          <div className="relative p-8 pb-6">
            <div className="flex items-start">
              <img src={efcLogo} alt="EFC Logo" className="h-20 w-20 rounded-full object-cover border-2 border-white/20" />
            </div>
            <h2 className="text-3xl font-bold text-white mt-8 mb-4">Welcome to the EFC MPU Community</h2>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 300" fill="none">
                <path d="M0 150 Q200 50 400 150 T800 150" stroke="white" strokeWidth="2" />
                <path d="M0 200 Q200 100 400 200 T800 200" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Featured Posts</h2>
            <button className="text-xs font-medium text-primary hover:underline">EDIT ORDER</button>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {featuredPosts.map((fp, i) => (
                <div key={i} className="min-w-[200px] flex-1 rounded-lg border border-border bg-muted/30 p-3">
                  <div className="h-24 rounded-md bg-primary/10 mb-3 flex items-center justify-center">
                    <span className="text-3xl">⚽</span>
                  </div>
                  <p className="text-xs font-medium text-foreground line-clamp-2 mb-1">{fp.title}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">{fp.desc}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <img src={efcLogo} alt="" className="h-5 w-5 rounded-full object-cover" />
                    </div>
                    <span className="text-[11px] font-medium text-foreground">{fp.author}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setFeaturedIndex(Math.max(0, featuredIndex - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 h-7 w-7 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              onClick={() => setFeaturedIndex(Math.min(featuredPosts.length - 1, featuredIndex + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 h-7 w-7 rounded-full bg-card border border-border shadow-card flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Create Post */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
              DE
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="What's on your mind, Demo?"
                className="w-full h-10 rounded-full border border-input bg-background px-4 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
              />
              <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={item} className="flex items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                tab.active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
              {tab.label}
              {tab.hasDropdown && <ChevronRight className="h-3 w-3 rotate-90" />}
            </button>
          ))}
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            Select Topic <ChevronRight className="h-3 w-3 rotate-90" />
          </button>
        </motion.div>

        {/* Posts Feed - Scrollable */}
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {posts.map((post, i) => (
            <motion.div key={i} variants={item} className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
              {/* Post Header */}
              <div className="flex items-start justify-between p-4 pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                    {post.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground uppercase">{post.author}</p>
                    <p className="text-xs text-muted-foreground">Posted in {post.channel} • {post.time}</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h3 className="text-sm font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-4">{post.body}</p>
                <button className="text-xs font-bold text-foreground mt-1">READ MORE...</button>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="px-4 pb-3">
                  <img src={post.image} alt="" className="w-full rounded-lg object-cover max-h-80" />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center border-t border-border divide-x divide-border">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <ThumbsUp className="h-4 w-4" /> Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <MessageSquare className="h-4 w-4" /> Comment
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Trending News */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20">
          <motion.div variants={item} className="rounded-lg border border-border bg-card p-4 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <TrendingIcon className="h-4 w-4 text-primary" />
              Trending News
            </h3>
            <div className="space-y-3">
              {trendingNews.map((news, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{news.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
