import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowUp, MoreHorizontal, ThumbsUp, MessageSquare, Share2, Pencil, Clock, TrendingUp as TrendingIcon, Star, Flame, Trophy, ExternalLink, X, Mic, MicOff, Video, VideoOff, Monitor, Hand, Plus, PenTool, MessageCircle, Camera, Settings, Users, Grid3X3, Share, Send, ImagePlus, Tag, BookmarkPlus, Flag, EyeOff, ChevronDown, BarChart3, Trash2, FileText, Paperclip, Smile } from "lucide-react";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import efcLogo from "@/assets/efclogo.png";
import featuredUcl from "@/assets/featured-ucl.png";
import featuredEuro from "@/assets/featured-euro.png";
import featuredEasports from "@/assets/featured-easports.png";

const featuredPosts = [
  {
    title: "UEFA Champions League – state of play",
    image: featuredUcl,
  },
  {
    title: "European clubs receive record €9m benefits for UEFA Women's EURO 2025",
    image: featuredEuro,
  },
  {
    title: "EFC x EA SPORTS FC Partnership",
    image: featuredEasports,
  },
];

const initialPosts = [
  {
    id: 1,
    author: "Dr. Marco Rossi",
    avatar: "MR",
    time: "27m ago",
    channel: "Feed",
    tags: ["Injury Prevention", "Sports Science"],
    title: "When innovation becomes optics, credibility becomes collateral.",
    body: "The recent developments in football injury prevention technology have raised important questions about evidence-based practice vs. marketing claims.\n\nIt's a credibility test.\n\nIn the sports science era, perception moves faster than verification. But practitioners cannot afford to confuse showcasing technology with claiming validated outcomes.",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
    likes: 42,
    comments: 12,
    liked: false,
    saved: false,
    following: true,
  },
  {
    id: 2,
    author: "Sarah Mitchell",
    avatar: "SM",
    time: "2h ago",
    channel: "Feed",
    tags: ["Injury Prevention", "Recovery", "Fitness"],
    title: "Hamstring injury prevention: what the latest research tells us",
    body: "Just published our latest findings on eccentric strengthening protocols for elite footballers. The Nordic hamstring exercise remains the gold standard, but there's growing evidence for complementary approaches.\n\nKey takeaway: Individualised load management combined with targeted strengthening reduces hamstring injuries by up to 65%.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop",
    likes: 89,
    comments: 23,
    liked: false,
    saved: false,
    following: true,
  },
  {
    id: 3,
    author: "Alex Chen",
    avatar: "AC",
    time: "5h ago",
    channel: "Science",
    tags: ["Technology", "Match Analysis", "Sports Science"],
    title: "GPS data and its role in injury risk assessment",
    body: "We've been tracking high-speed running distance and acceleration patterns across our first team squad for 3 seasons now. The correlation between acute:chronic workload ratio spikes and soft tissue injuries is striking.\n\nHere's what we've learned about practical thresholds...",
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=400&fit=crop",
    likes: 56,
    comments: 18,
    liked: false,
    saved: false,
    following: false,
  },
  {
    id: 4,
    author: "Emma Johansson",
    avatar: "EJ",
    time: "8h ago",
    channel: "Feed",
    tags: ["Recovery", "Mental Health"],
    title: "Return to play after ACL reconstruction: a multidisciplinary approach",
    body: "Our club's RTP protocol now includes psychological readiness assessment alongside physical benchmarks. The results have been remarkable — reinjury rates dropped significantly since we adopted this holistic framework.\n\nSharing our complete protocol for discussion...",
    image: null,
    likes: 34,
    comments: 9,
    liked: false,
    saved: false,
    following: false,
  },
];

const trendingNews = [
  { title: "\"Stability gives you strength\" — Xherdan Shaqiri on youth development at FC Basel", time: "2h ago" },
  { title: "Five standout moments from EFC in 2025", time: "4h ago" },
  { title: "Clubs receive record €9m from UEFA Women's EURO 2025", time: "6h ago" },
  { title: "New study reveals impact of altitude training on injury rates", time: "8h ago" },
];

const topicOptions = [
  "All Topics", "Injury Prevention", "Sports Science", "Coaching", "Nutrition",
  "Recovery", "Youth Development", "Tactics", "Match Analysis",
  "Fitness", "Mental Health", "Technology", "Transfer News",
];

const trendingOptions = ["Today", "This Week", "This Month", "All Time"];

const regionOptions = [
  "All Regions", "Western Europe", "Eastern Europe", "Scandinavia",
  "South America", "North America", "Africa", "Middle East", "Asia Pacific",
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

const predefinedTags = [
  "Injury Prevention", "Sports Science", "Coaching", "Nutrition",
  "Recovery", "Youth Development", "Tactics", "Match Analysis",
  "Fitness", "Mental Health", "Technology", "Transfer News",
];

const Index = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [liveEventOpen, setLiveEventOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat");
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [activeFilter, setActiveFilter] = useState("Recent");
  const [trendingPeriod, setTrendingPeriod] = useState("This Week");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());
  const [commentingPost, setCommentingPost] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Post state
  const [postMode, setPostMode] = useState<"post" | "poll">("post");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1 day");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoName, setSelectedVideoName] = useState<string | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedPdfName, setSelectedPdfName] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [postDestination, setPostDestination] = useState("Feed");

  const feedDestinations = [
    "Feed",
    "Sport & Exercise",
    "Science",
    "Nutrition",
    "Sport Psychology",
    "Sport Medicine",
    "Rehabilitation",
  ];

  const addPollOption = () => {
    if (pollOptions.length < 6) setPollOptions([...pollOptions, ""]);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== index));
  };

  const updatePollOption = (index: number, value: string) => {
    setPollOptions(pollOptions.map((o, i) => (i === index ? value : o)));
  };

  const handleCreatePoll = () => {
    if (!pollQuestion.trim()) {
      toast({ title: "Poll question is required", variant: "destructive" });
      return;
    }
    const validOptions = pollOptions.filter((o) => o.trim());
    if (validOptions.length < 2) {
      toast({ title: "At least 2 options are required", variant: "destructive" });
      return;
    }
    const newPoll = {
      id: Date.now(),
      author: "Demo User",
      avatar: "DE",
      time: "Just now",
      channel: "Feed",
      tags: ["Poll"],
      title: pollQuestion,
      body: "",
      image: null,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
      following: true,
      poll: {
        options: validOptions.map((o) => ({ text: o, votes: 0 })),
        totalVotes: 0,
        votedOption: null as number | null,
        duration: pollDuration,
      },
    };
    setFeedPosts([newPoll as any, ...feedPosts]);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setPostMode("post");
    setCreatePostOpen(false);
    toast({ title: "Poll published!", description: "Your poll is now live in the feed." });
  };

  const handleVotePoll = (postId: number, optionIndex: number) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId || !(p as any).poll || (p as any).poll.votedOption !== null) return p;
        const poll = { ...(p as any).poll };
        poll.options = poll.options.map((o: any, i: number) =>
          i === optionIndex ? { ...o, votes: o.votes + 1 } : o
        );
        poll.totalVotes += 1;
        poll.votedOption = optionIndex;
        return { ...p, poll };
      })
    );
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({ title: "Video too large", description: "Max 50MB allowed.", variant: "destructive" });
        return;
      }
      setSelectedVideoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPdfName(file.name);
      setSelectedPdf(URL.createObjectURL(file));
    }
  };

  const handleGifSearch = () => {
    // Placeholder: In a real app you'd open a GIF picker (e.g. Giphy API)
    const sampleGif = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";
    setSelectedGif(sampleGif);
    toast({ title: "GIF added!" });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCreatePost = () => {
    if (!postContent.trim() && !postTitle.trim()) {
      toast({ title: "Post cannot be empty", variant: "destructive" });
      return;
    }
    const newPost = {
      id: Date.now(),
      author: "Demo User",
      avatar: "DE",
      time: "Just now",
      channel: selectedTags[0] || "Feed",
      tags: selectedTags.length > 0 ? selectedTags : ["Feed"],
      title: postTitle || postContent.slice(0, 60),
      body: postContent,
      image: selectedImage,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
      following: true,
    };
    setFeedPosts([newPost, ...feedPosts]);
    setPostContent("");
    setPostTitle("");
    setSelectedTags([]);
    setSelectedImage(null);
    setCreatePostOpen(false);
    toast({ title: "Post published!", description: "Your post is now live in the feed." });
  };

  const handleLike = (postId: number) => {
    setFeedPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handleSave = (postId: number) => {
    setFeedPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, saved: !p.saved } : p
    ));
    const post = feedPosts.find(p => p.id === postId);
    toast({ title: post?.saved ? "Removed from saved" : "Post saved!" });
  };

  const handleShare = (postId: number) => {
    const post = feedPosts.find(p => p.id === postId);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Check out "${post?.title}" on EFC Community`);
      toast({ title: "Link copied!", description: "Post link copied to clipboard." });
    }
  };

  const handleComment = (postId: number) => {
    setCommentingPost(commentingPost === postId ? null : postId);
    setCommentText("");
  };

  const submitComment = (postId: number) => {
    if (!commentText.trim()) return;
    setFeedPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, comments: p.comments + 1 } : p
    ));
    setCommentText("");
    setCommentingPost(null);
    toast({ title: "Comment posted!" });
  };

  const handleHidePost = (postId: number) => {
    setFeedPosts(prev => prev.filter(p => p.id !== postId));
    toast({ title: "Post hidden from your feed." });
  };

  const handleReportPost = (postId: number) => {
    toast({ title: "Post reported", description: "Thank you. Our team will review this post." });
  };

  const toggleExpand = (postId: number) => {
    setExpandedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  // Filter and sort posts
  const getFilteredPosts = () => {
    let filtered = [...feedPosts];

    // Topic filter
    if (selectedTopic !== "All Topics") {
      filtered = filtered.filter(p => p.tags?.includes(selectedTopic));
    }

    // Following filter
    if (activeFilter === "Following") {
      filtered = filtered.filter(p => p.following);
    }

    // Sort
    if (activeFilter === "Top Posts") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (activeFilter === "Trending") {
      filtered.sort((a, b) => (b.likes + b.comments * 2) - (a.likes + a.comments * 2));
    }

    return filtered;
  };

  const displayedPosts = getFilteredPosts();

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
          <div className="relative px-8 py-4">
            <div className="flex items-center gap-4">
              <img src={efcLogo} alt="EFC Logo" className="h-14 w-14 rounded-full object-cover border-2 border-white/20" />
              <h2 className="text-2xl font-bold text-white">Welcome to the EFC MPU Community</h2>
            </div>
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 800 150" fill="none">
                <path d="M0 75 Q200 25 400 75 T800 75" stroke="white" strokeWidth="2" />
                <path d="M0 100 Q200 50 400 100 T800 100" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Ongoing Live Call Banner */}
        <motion.div variants={item} className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-destructive uppercase tracking-wide">● Live Now</span>
                </div>
                <p className="text-sm font-semibold text-foreground">EFC MPU Injury Prevention Summit</p>
                <p className="text-xs text-muted-foreground">12 participants • Started 15 min ago</p>
              </div>
            </div>
            <button
              onClick={() => setLiveEventOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Join Now
            </button>
          </div>
        </motion.div>

        {/* Featured Posts - Hero Carousel */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-4 pb-0">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Featured Posts</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFeaturedIndex(Math.max(0, featuredIndex - 1))}
                className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => setFeaturedIndex(Math.min(featuredPosts.length - 1, featuredIndex + 1))}
                className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="relative rounded-xl overflow-hidden h-72">
              <img src={featuredPosts[featuredIndex].image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-bold text-white leading-snug">{featuredPosts[featuredIndex].title}</h3>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {featuredPosts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === featuredIndex ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Create Post */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
              DE
            </div>
            <div className="flex-1 relative cursor-pointer" onClick={() => setCreatePostOpen(true)}>
              <input
                type="text"
                placeholder="What's on your mind, Demo?"
                readOnly
                className="w-full h-10 rounded-full border border-input bg-background px-4 pr-10 text-sm placeholder:text-muted-foreground cursor-pointer"
              />
              <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Create Post Dialog */}
        <Dialog open={createPostOpen} onOpenChange={(open) => { setCreatePostOpen(open); if (!open) setPostMode("post"); }}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-primary" />
                Create a Post
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
                  DE
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Demo User</p>
                  <p className="text-xs text-muted-foreground">Posting to Feed</p>
                </div>
              </div>

              {/* Post / Poll toggle */}
              <div className="flex gap-1 p-1 rounded-lg bg-muted">
                <button
                  onClick={() => setPostMode("post")}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    postMode === "post" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PenTool className="h-3.5 w-3.5" /> Post
                </button>
                <button
                  onClick={() => setPostMode("poll")}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    postMode === "poll" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" /> Poll
                </button>
              </div>

              {postMode === "post" ? (
                <>
                  <input
                    type="text"
                    placeholder="Post title (optional)"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                  <Textarea
                    placeholder="Write something..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  {selectedImage && (
                    <div className="relative rounded-lg overflow-hidden border border-border">
                      <img src={selectedImage} alt="Selected" className="w-full max-h-48 object-cover" />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground/90 transition-colors"
                      >
                        <X className="h-3 w-3 text-background" />
                      </button>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Select Topics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {predefinedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer text-xs transition-colors"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                      <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="text-muted-foreground">
                        <ImagePlus className="h-4 w-4 mr-1" /> Image
                      </Button>
                    </div>
                    <Button onClick={handleCreatePost} className="rounded-full px-6">
                      <Send className="h-4 w-4 mr-1" /> Post
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Textarea
                    placeholder="Ask your question..."
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="min-h-[80px] resize-none text-base font-medium"
                  />
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <BarChart3 className="h-3 w-3" /> Poll Options
                    </p>
                    {pollOptions.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full border-2 border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                          {String.fromCharCode(65 + i)}
                        </div>
                        <input
                          type="text"
                          placeholder={`Option ${i + 1}`}
                          value={opt}
                          onChange={(e) => updatePollOption(i, e.target.value)}
                          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                        />
                        {pollOptions.length > 2 && (
                          <button onClick={() => removePollOption(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 6 && (
                      <button onClick={addPollOption} className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors mt-1">
                        <Plus className="h-3.5 w-3.5" /> Add option
                      </button>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1.5">Poll Duration</p>
                    <select value={pollDuration} onChange={(e) => setPollDuration(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                      <option>1 day</option>
                      <option>3 days</option>
                      <option>1 week</option>
                      <option>2 weeks</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-end pt-2 border-t border-border">
                    <Button onClick={handleCreatePoll} className="rounded-full px-6">
                      <BarChart3 className="h-4 w-4 mr-1" /> Post Poll
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Filter Tabs */}
        <motion.div variants={item} className="flex items-center gap-2 flex-wrap">
          {/* Recent */}
          <button
            onClick={() => setActiveFilter("Recent")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === "Recent"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Recent
          </button>

          {/* Top Posts */}
          <button
            onClick={() => setActiveFilter("Top Posts")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === "Top Posts"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Top Posts
          </button>

          {/* Trending - Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeFilter === "Trending"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                <TrendingIcon className="h-3.5 w-3.5" />
                Trending
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {trendingOptions.map(option => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => { setActiveFilter("Trending"); setTrendingPeriod(option); }}
                  className={trendingPeriod === option && activeFilter === "Trending" ? "bg-accent" : ""}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Following */}
          <button
            onClick={() => setActiveFilter("Following")}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === "Following"
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            Following
          </button>

          {/* Select Topic - Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                {selectedTopic === "All Topics" ? "Select Topic" : selectedTopic}
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto">
              {topicOptions.map(topic => (
                <DropdownMenuItem
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={selectedTopic === topic ? "bg-accent" : ""}
                >
                  {topic}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Select Region - Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                {selectedRegion === "All Regions" ? "Select Region" : selectedRegion}
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-64 overflow-y-auto">
              {regionOptions.map(region => (
                <DropdownMenuItem
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={selectedRegion === region ? "bg-accent" : ""}
                >
                  {region}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Empty state */}
        {displayedPosts.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-card">
            <p className="text-sm text-muted-foreground">No posts found for this filter.</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => { setActiveFilter("Recent"); setSelectedTopic("All Topics"); setSelectedRegion("All Regions"); }}>
              Clear filters
            </Button>
          </div>
        )}

        {/* Posts Feed - Scrollable */}
        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
          {displayedPosts.map((post) => (
            <motion.div key={post.id} variants={item} className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSave(post.id)}>
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      {post.saved ? "Unsave post" : "Save post"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare(post.id)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleHidePost(post.id)}>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide post
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleReportPost(post.id)} className="text-destructive focus:text-destructive">
                      <Flag className="h-4 w-4 mr-2" />
                      Report post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="px-4 pb-1 flex flex-wrap gap-1">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                  ))}
                </div>
              )}

              {/* Post Content */}
              <div className="px-4 pb-3">
                <h3 className="text-sm font-semibold text-foreground mb-2">{post.title}</h3>
                <p className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line ${expandedPosts.has(post.id) ? "" : "line-clamp-4"}`}>
                  {post.body}
                </p>
                {post.body.length > 200 && (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="text-xs font-bold text-foreground mt-1 hover:text-primary transition-colors"
                  >
                    {expandedPosts.has(post.id) ? "SHOW LESS" : "READ MORE..."}
                  </button>
                )}
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="px-4 pb-3">
                  <img src={post.image} alt="" className="w-full rounded-lg object-cover max-h-80" />
                </div>
              )}

              {/* Poll UI */}
              {(post as any).poll && (() => {
                const poll = (post as any).poll;
                const hasVoted = poll.votedOption !== null;
                return (
                  <div className="px-4 pb-3">
                    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BarChart3 className="h-3.5 w-3.5 text-primary" />
                        <span className="font-medium">Poll • {poll.duration}</span>
                        {hasVoted && <span className="ml-auto">{poll.totalVotes} vote{poll.totalVotes !== 1 ? "s" : ""}</span>}
                      </div>
                      <div className="space-y-2">
                        {poll.options.map((opt: any, i: number) => {
                          const pct = hasVoted && poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                          const isWinner = hasVoted && opt.votes === Math.max(...poll.options.map((o: any) => o.votes));
                          return (
                            <button
                              key={i}
                              onClick={() => !hasVoted && handleVotePoll(post.id, i)}
                              disabled={hasVoted}
                              className={`relative w-full text-left rounded-lg border px-4 py-3 text-sm font-medium transition-all overflow-hidden ${
                                hasVoted
                                  ? poll.votedOption === i
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-foreground"
                                  : "border-border hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer"
                              }`}
                            >
                              {hasVoted && (
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className={`absolute left-0 top-0 bottom-0 rounded-lg ${isWinner ? "bg-primary/15" : "bg-muted/50"}`}
                                />
                              )}
                              <span className="relative flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                  {!hasVoted && (
                                    <span className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px]">
                                      {String.fromCharCode(65 + i)}
                                    </span>
                                  )}
                                  {hasVoted && poll.votedOption === i && (
                                    <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground">✓</span>
                                  )}
                                  {opt.text}
                                </span>
                                {hasVoted && <span className="text-xs font-semibold">{pct}%</span>}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {!hasVoted && (
                        <p className="text-[10px] text-muted-foreground text-center">Select an option to vote</p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Engagement counts */}
              <div className="px-4 pb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              {/* Post Actions */}
              <div className="flex items-center border-t border-border divide-x divide-border">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm transition-colors ${
                    post.liked ? "text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${post.liked ? "fill-primary" : ""}`} /> Like
                </button>
                <button
                  onClick={() => handleComment(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm transition-colors ${
                    commentingPost === post.id ? "text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" /> Comment
                </button>
                <button
                  onClick={() => handleShare(post.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>

              {/* Comment input */}
              <AnimatePresence>
                {commentingPost === post.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border overflow-hidden"
                  >
                    <div className="p-3 flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
                        DE
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && submitComment(post.id)}
                          className="flex-1 rounded-full border border-input bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                          autoFocus
                        />
                        <Button size="sm" className="rounded-full" onClick={() => submitComment(post.id)} disabled={!commentText.trim()}>
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-4 space-y-4">
          {/* Quick Action Buttons */}
          <motion.div variants={item} className="flex gap-2">
            <button
              onClick={() => setLiveEventOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-destructive px-3 py-2.5 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <Video className="h-4 w-4" />
              Go Live
            </button>
            <button
              onClick={() => setCreatePostOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Post
            </button>
          </motion.div>

          {/* Karma / Rank / Streak Stats */}
          <motion.div variants={item} className="space-y-3">
            <div className="rounded-lg border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-sm">Your MPU Points</span>
              </div>
              <p className="text-2xl font-bold text-foreground">1,240</p>
              <p className="text-xs text-emerald-500 font-medium">+65 this week</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingIcon className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Your Rank</span>
              </div>
              <p className="text-2xl font-bold text-foreground">#4</p>
              <p className="text-xs text-emerald-500 font-medium">↑ 2 positions</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Flame className="h-4 w-4 text-destructive" />
                <span className="text-sm">Streak</span>
              </div>
              <p className="text-2xl font-bold text-foreground">30 days</p>
              <p className="text-xs text-muted-foreground font-medium">Personal best!</p>
            </div>
          </motion.div>

          {/* Online Members */}
          <motion.div variants={item} className="rounded-lg border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Online Now</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                127 online
              </span>
            </div>
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="h-8 w-8 rounded-full border-2 border-card object-cover" />
              ))}
              <div className="h-8 w-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                +120
              </div>
            </div>
          </motion.div>

          {/* Mini Leaderboard */}
          <motion.div variants={item} className="rounded-lg border border-border bg-card p-4 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              Leaderboard
            </h3>
            <div className="space-y-2.5">
              {[
                { rank: 1, name: "Dr. Marco Rossi", points: "2,480", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
                { rank: 2, name: "Sarah Mitchell", points: "2,120", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
                { rank: 3, name: "Alex Chen", points: "1,890", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
                { rank: 4, name: "Emma Johansson", points: "1,240", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
                { rank: 5, name: "Kwame Adebayo", points: "1,100", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
              ].map((user) => (
                <div key={user.rank} className="flex items-center gap-2.5">
                  <span className={`text-xs font-bold w-4 text-center ${user.rank <= 3 ? "text-amber-400" : "text-muted-foreground"}`}>
                    {user.rank}
                  </span>
                  <img src={user.image} alt="" className="h-7 w-7 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground">{user.points}</span>
                </div>
              ))}
            </div>
            <a href="/leaderboard" className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-border text-xs font-medium text-primary hover:underline">
              <ExternalLink className="h-3 w-3" />
              View Leaderboard
            </a>
          </motion.div>

          {/* Trending News */}
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

      {/* SpatialChat-style Live Event Overlay */}
      <AnimatePresence>
        {liveEventOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[hsl(230,25%,12%)] flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-4">
                <button className="text-white/60 hover:text-white transition-colors">
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <span className="text-white/40">|</span>
                <span className="text-white font-medium text-sm">EFC Event</span>
                <div className="flex items-center gap-1.5 text-white/50 text-sm">
                  <Users className="h-4 w-4" />
                  <span>120</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-white/60 hover:text-white transition-colors text-sm">Invite</button>
                <button
                  onClick={() => setLiveEventOpen(false)}
                  className="rounded-full bg-destructive/80 hover:bg-destructive p-1.5 text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left - Participant Videos */}
              <div className="w-36 shrink-0 p-3 space-y-3 overflow-y-auto">
                {[
                  { name: "You", color: "border-primary" },
                  { name: "Dr. Rossi", color: "border-amber-400" },
                  { name: "Sarah M.", color: "border-amber-400" },
                  { name: "Alex C.", color: "border-primary" },
                  { name: "Emma J.", color: "border-primary" },
                ].map((p, i) => (
                  <div key={i} className={`rounded-lg border-2 ${p.color} overflow-hidden aspect-square bg-[hsl(230,20%,18%)] flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="h-10 w-10 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-[10px] text-white/70 mt-1">{p.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center - Main Presentation */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 min-w-0">
                <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden bg-[hsl(230,20%,16%)] border border-white/10 relative">
                  <img
                    src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900&h=500&fit=crop"
                    alt="Presentation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-white text-xs font-bold">EFC MPU Injury Prevention Summit</p>
                        <p className="text-white/60 text-[10px]">Live • 12 participants</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participant Avatars Row */}
                <div className="flex items-center gap-3 mt-6">
                  {["M", "N"].map((letter, i) => (
                    <div key={i} className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${i === 0 ? "bg-amber-500" : "bg-primary"}`}>
                      {letter}
                    </div>
                  ))}
                  {[
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="h-12 w-12 rounded-full object-cover border-2 border-white/20" />
                  ))}
                </div>

                {/* Bottom Toolbar */}
                <div className="flex items-center gap-2 mt-6">
                  {[
                    { icon: Plus, active: false },
                    { icon: PenTool, active: false },
                    { icon: Monitor, active: false },
                    { icon: MessageCircle, active: false },
                  ].map((btn, i) => (
                    <button key={i} className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                      <btn.icon className="h-5 w-5" />
                    </button>
                  ))}
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? "bg-destructive/80 text-white" : "bg-primary text-white"}`}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-colors ${isMuted ? "bg-destructive/80 text-white" : "bg-primary text-white"}`}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  {[
                    { icon: Share, active: false },
                    { icon: Grid3X3, active: false },
                  ].map((btn, i) => (
                    <button key={i} className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors">
                      <btn.icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right - Chat Panel */}
              <div className="w-80 shrink-0 border-l border-white/10 flex flex-col bg-[hsl(230,20%,15%)]">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  {["Chat", "Q&A", "Poll", "Docs"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab ? "text-white border-b-2 border-primary" : "text-white/50 hover:text-white/70"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5">
                  {[
                    {
                      name: "Benjamin",
                      time: "3:13pm",
                      avatar: "B",
                      message: "Can you suggest tools or resources to enhance storytelling skills? A book perhaps?",
                      reactions: 5,
                    },
                    {
                      name: "Amelia",
                      time: "3:13pm",
                      avatar: "A",
                      message: "@Benjamin Story Brand by Donald Miller is a good place to start. It lays out the fundamentals!",
                      reactions: 2,
                    },
                    {
                      name: "Ethan",
                      time: "3:13pm",
                      avatar: "E",
                      message: "What are some effective ways to collect customer stories for marketing?",
                      reactions: 0,
                    },
                  ].map((msg, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-xs font-bold shrink-0">
                        {msg.avatar}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold text-white">{msg.name}</span>
                          <span className="text-[10px] text-white/40">{msg.time}</span>
                        </div>
                        <p className="text-sm text-white/70 mt-0.5 leading-relaxed">{msg.message}</p>
                        {msg.reactions > 0 && (
                          <span className="inline-flex items-center gap-1 mt-1.5 text-xs text-amber-400">
                            🔥 {msg.reactions}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2 rounded-full border border-primary/50 bg-white/5 px-4 py-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Contribute to the discussion!"
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                    <button className="text-white/40 hover:text-white transition-colors">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
