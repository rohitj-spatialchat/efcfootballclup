import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, MessageSquare, Calendar, Info, ThumbsUp, Share2, Send, MoreHorizontal,
  Pin, ImagePlus, X, BookmarkPlus, Flag, EyeOff, Dumbbell, FlaskConical, Apple,
  Brain, Stethoscope, Zap, HeartPulse, UserPlus, Settings, Search, ChevronDown,
  Plus, BarChart3, Trash2, PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const groupsData: Record<string, {
  label: string;
  icon: React.ElementType;
  description: string;
  memberCount: number;
  postCount: number;
  color: string;
  members: { name: string; avatar: string; role: string; online: boolean }[];
  posts: { id: number; author: string; avatar: string; time: string; title: string; body: string; image: string | null; likes: number; comments: number; pinned: boolean }[];
  events: { title: string; date: string; attendees: number }[];
  rules: string[];
}> = {
  "sport-exercise": {
    label: "Sport & Exercise",
    icon: Dumbbell,
    description: "A dedicated space for professionals to discuss sport and exercise science, training methodologies, and physical performance optimization in football.",
    memberCount: 342,
    postCount: 1289,
    color: "bg-emerald-500/10 text-emerald-600",
    members: [
      { name: "Dr. Marco Rossi", avatar: "MR", role: "Admin", online: true },
      { name: "Sarah Mitchell", avatar: "SM", role: "Moderator", online: true },
      { name: "James Parker", avatar: "JP", role: "Member", online: false },
      { name: "Lena Schmidt", avatar: "LS", role: "Member", online: true },
      { name: "Carlos Garcia", avatar: "CG", role: "Member", online: false },
      { name: "Aisha Okafor", avatar: "AO", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Marco Rossi", avatar: "MR", time: "2h ago", title: "Periodization strategies for in-season training", body: "How are clubs managing training load during congested fixture periods? We've found that undulating periodization with RPE-guided adjustments has significantly reduced our soft tissue injury rates.\n\nKey principles we follow:\n1. Monitor acute:chronic workload ratio weekly\n2. Adjust session RPE targets based on match schedule\n3. Implement mandatory recovery protocols post-match", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop", likes: 34, comments: 12, pinned: true },
      { id: 2, author: "Sarah Mitchell", avatar: "SM", time: "5h ago", title: "New VO2max testing protocols for pre-season", body: "We've been experimenting with field-based VO2max estimation using GPS data instead of traditional lab tests. Early results show strong correlation (r=0.89) with lab values while being far more practical for squad-wide testing.", image: null, likes: 28, comments: 8, pinned: false },
      { id: 3, author: "Lena Schmidt", avatar: "LS", time: "1d ago", title: "Sprint mechanics workshop recap", body: "Just wrapped up an incredible 2-day workshop on sprint mechanics with Dr. Matt Brughelli. Key takeaways on hip extension patterns and their relationship with hamstring injury risk. Happy to share my notes with anyone interested!", image: "https://images.unsplash.com/photo-1461896836934-bd45ba7d8f73?w=800&h=400&fit=crop", likes: 56, comments: 19, pinned: false },
    ],
    events: [
      { title: "Sport Science Roundtable Q1", date: "Mar 15, 2026", attendees: 45 },
      { title: "Pre-Season Testing Workshop", date: "Apr 2, 2026", attendees: 32 },
      { title: "Guest Speaker: Dr. Tim Gabbett", date: "Apr 18, 2026", attendees: 120 },
    ],
    rules: [
      "Share evidence-based content with proper references",
      "Respect confidentiality — no club-specific data without permission",
      "Be constructive in discussions and debates",
      "No promotional or commercial content without admin approval",
    ],
  },
  "science": {
    label: "Science",
    icon: FlaskConical,
    description: "Explore the latest research in sports science, biomechanics, and performance analytics. Share papers, discuss findings, and bridge the gap between research and practice.",
    memberCount: 278,
    postCount: 945,
    color: "bg-blue-500/10 text-blue-600",
    members: [
      { name: "Alex Chen", avatar: "AC", role: "Admin", online: true },
      { name: "Prof. Nina Volkov", avatar: "NV", role: "Moderator", online: false },
      { name: "Tom Bradley", avatar: "TB", role: "Member", online: true },
      { name: "Yuki Tanaka", avatar: "YT", role: "Member", online: false },
    ],
    posts: [
      { id: 1, author: "Alex Chen", avatar: "AC", time: "3h ago", title: "Meta-analysis on eccentric training and injury reduction", body: "Just published: our systematic review of 47 RCTs on eccentric training protocols. Results show a 51% reduction in muscle strain injuries when combining Nordic hamstring exercises with hip-focused eccentrics.", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop", likes: 67, comments: 24, pinned: true },
      { id: 2, author: "Prof. Nina Volkov", avatar: "NV", time: "1d ago", title: "Biomechanical analysis of change-of-direction movements", body: "Sharing preliminary data from our motion capture study on COD mechanics in elite footballers. Significant differences found between ACL-injured and non-injured cohorts in knee valgus angles during 45° cuts.", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=400&fit=crop", likes: 45, comments: 15, pinned: false },
      { id: 3, author: "Tom Bradley", avatar: "TB", time: "2d ago", title: "🗳️ POLL: Most impactful sports science technology?", body: "A. GPS/GNSS tracking\nB. Force plates\nC. Motion capture\nD. Wearable EMG sensors", image: null, likes: 33, comments: 19, pinned: false },
      { id: 4, author: "Yuki Tanaka", avatar: "YT", time: "4d ago", title: "Blood biomarker monitoring in professional football", body: "We've implemented quarterly blood panels for our entire squad. Key markers we track: ferritin, vitamin D, testosterone:cortisol ratio, CRP, and CK. Early intervention based on trends has reduced illness incidence by 30%.", image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&h=400&fit=crop", likes: 52, comments: 28, pinned: false },
    ],
    events: [
      { title: "Research Methodology Workshop", date: "Mar 20, 2026", attendees: 28 },
      { title: "Journal Club: BJSM Latest", date: "Apr 5, 2026", attendees: 35 },
    ],
    rules: [
      "Always cite sources when sharing research findings",
      "Distinguish clearly between established evidence and preliminary data",
      "Be respectful of differing methodological approaches",
    ],
  },
  "nutrition": {
    label: "Nutrition",
    icon: Apple,
    description: "Everything related to sports nutrition, supplementation, and dietary strategies for optimal athlete performance and recovery.",
    memberCount: 195,
    postCount: 632,
    color: "bg-orange-500/10 text-orange-600",
    members: [
      { name: "Emma Johansson", avatar: "EJ", role: "Admin", online: true },
      { name: "Dr. Kwame Adebayo", avatar: "KA", role: "Member", online: false },
      { name: "Sophie Laurent", avatar: "SL", role: "Moderator", online: true },
    ],
    posts: [
      { id: 1, author: "Emma Johansson", avatar: "EJ", time: "4h ago", title: "Match-day nutrition protocols: what's changed?", body: "The traditional carb-loading approach is evolving. Here's our updated match-day nutrition timeline that's improved perceived energy levels in 80% of our squad members.", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop", likes: 41, comments: 16, pinned: true },
      { id: 2, author: "Dr. Kwame Adebayo", avatar: "KA", time: "1d ago", title: "Hydration strategies for hot climate matches", body: "We tested individualized sweat-rate protocols vs standard fluid guidelines during pre-season in Dubai. Players on personalized plans showed 12% less performance decline in the second half.\n\nKey findings:\n1. Sweat rate varies hugely — 0.5L to 2.5L per hour\n2. Sodium concentration in sweat differs by 3x between players\n3. Pre-cooling with ice slurries improved time to fatigue by 8%", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop", likes: 55, comments: 21, pinned: false },
      { id: 3, author: "Sophie Laurent", avatar: "SL", time: "2d ago", title: "🗳️ POLL: Best recovery meal timing post-match?", body: "A. Within 30 minutes\nB. 30-60 minutes after\nC. 1-2 hours after\nD. Whenever the player feels ready", image: null, likes: 38, comments: 27, pinned: false },
      { id: 4, author: "Emma Johansson", avatar: "EJ", time: "3d ago", title: "Supplement stack review: what's actually evidence-based?", body: "After reviewing 200+ papers, here's our tier list for football-specific supplementation:\n\nTier 1 (Strong evidence): Creatine, Caffeine, Vitamin D\nTier 2 (Moderate evidence): Beta-alanine, Tart cherry juice, Omega-3\nTier 3 (Limited evidence): Beetroot juice, Collagen peptides\nTier 4 (Insufficient evidence): BCAAs (if protein adequate), HMB", image: "https://images.unsplash.com/photo-1505576399279-0d754c0d8fba?w=800&h=400&fit=crop", likes: 94, comments: 45, pinned: false },
    ],
    events: [
      { title: "Nutrition Masterclass", date: "Mar 25, 2026", attendees: 52 },
    ],
    rules: [
      "No unsubstantiated supplement claims",
      "Respect individual dietary choices and cultural considerations",
      "Evidence-based recommendations only",
    ],
  },
  "sport-psychology": {
    label: "Sport Psychology",
    icon: Brain,
    description: "Mental performance, resilience, team dynamics, and psychological well-being in professional football.",
    memberCount: 156,
    postCount: 478,
    color: "bg-purple-500/10 text-purple-600",
    members: [
      { name: "Dr. Ravi Patel", avatar: "RP", role: "Admin", online: true },
      { name: "Mei Wong", avatar: "MW", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Ravi Patel", avatar: "RP", time: "6h ago", title: "Building psychological resilience after long-term injury", body: "Our 12-week psychological intervention program for ACL-reconstructed players has shown remarkable improvements in return-to-sport confidence scores. Key components include visualization, graduated exposure, and peer mentoring.", image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800&h=400&fit=crop", likes: 72, comments: 31, pinned: true },
      { id: 2, author: "Mei Wong", avatar: "MW", time: "1d ago", title: "🗳️ POLL: Biggest mental health challenge for players?", body: "A. Performance anxiety before big matches\nB. Dealing with social media criticism\nC. Coping with injury setbacks\nD. Managing work-life balance", image: null, likes: 64, comments: 38, pinned: false },
      { id: 3, author: "Dr. Ravi Patel", avatar: "RP", time: "3d ago", title: "Pre-match visualization techniques that actually work", body: "We ran a controlled study with 24 players over a season. Those who completed structured 10-min visualization sessions before matches reported 40% higher confidence and showed measurably better decision-making under pressure.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop", likes: 58, comments: 22, pinned: false },
    ],
    events: [],
    rules: ["Maintain confidentiality about specific athlete cases", "Be sensitive when discussing mental health topics"],
  },
  "medical-physiotherapy": {
    label: "Medical & Physiotherapy",
    icon: Stethoscope,
    description: "Clinical discussions on injury diagnosis, rehabilitation protocols, and medical best practices in professional football.",
    memberCount: 289,
    postCount: 1102,
    color: "bg-red-500/10 text-red-600",
    members: [
      { name: "Dr. Anna Weber", avatar: "AW", role: "Admin", online: true },
      { name: "Paulo Mendes", avatar: "PM", role: "Moderator", online: false },
      { name: "Dr. Fatima Al-Hassan", avatar: "FA", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Anna Weber", avatar: "AW", time: "1h ago", title: "Updated ACL rehabilitation timeline", body: "Based on our latest outcomes data (n=47 athletes), we're recommending extending the minimum RTP criteria to include 9 months + psychological readiness assessment.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop", likes: 89, comments: 42, pinned: true },
      { id: 2, author: "Paulo Mendes", avatar: "PM", time: "1d ago", title: "🗳️ POLL: Most common muscle injury in your squad?", body: "A. Hamstring strain\nB. Quadriceps strain\nC. Calf strain\nD. Adductor/groin injury", image: null, likes: 47, comments: 33, pinned: false },
      { id: 3, author: "Dr. Fatima Al-Hassan", avatar: "FA", time: "2d ago", title: "Platelet-rich plasma therapy: where do we stand?", body: "Our systematic review of PRP in muscle injuries shows mixed evidence. However, for specific tendinopathies, the results are more promising. Here's a breakdown of when we consider PRP in our clinical pathway.", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=400&fit=crop", likes: 61, comments: 29, pinned: false },
    ],
    events: [
      { title: "Rehabilitation Case Study Series", date: "Mar 12, 2026", attendees: 64 },
    ],
    rules: ["No specific medical advice for individual cases", "Respect patient confidentiality at all times"],
  },
  "strength-power": {
    label: "Strength & Power",
    icon: Zap,
    description: "Strength training methodologies, power development, and resistance training programming for footballers.",
    memberCount: 221,
    postCount: 756,
    color: "bg-amber-500/10 text-amber-600",
    members: [
      { name: "Jake Morrison", avatar: "JM", role: "Admin", online: true },
      { name: "Viktor Petrov", avatar: "VP", role: "Member", online: false },
    ],
    posts: [
      { id: 1, author: "Jake Morrison", avatar: "JM", time: "8h ago", title: "Velocity-based training: practical implementation", body: "We've transitioned from percentage-based programming to VBT for all our main lifts. Here's our autoregulation framework using mean concentric velocity zones.", image: null, likes: 53, comments: 22, pinned: true },
    ],
    events: [],
    rules: ["Safety first — always discuss proper form and progressions", "Share programming rationale, not just exercises"],
  },
  "fitness-exercise-physiology": {
    label: "Fitness & Exercise Physiology",
    icon: HeartPulse,
    description: "Cardiovascular fitness, endurance training, and exercise physiology research applied to football performance.",
    memberCount: 187,
    postCount: 543,
    color: "bg-pink-500/10 text-pink-600",
    members: [
      { name: "Dr. Lisa Park", avatar: "LP", role: "Admin", online: true },
      { name: "Oscar Nilsson", avatar: "ON", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Lisa Park", avatar: "LP", time: "12h ago", title: "Heart rate variability as a readiness indicator", body: "3-season longitudinal data on HRV monitoring in our first team. Strong predictive value for illness susceptibility when combined with subjective wellness scores.", image: null, likes: 38, comments: 14, pinned: true },
    ],
    events: [
      { title: "Endurance Training Symposium", date: "Apr 10, 2026", attendees: 40 },
    ],
    rules: ["Use standardized terminology when discussing physiological concepts"],
  },
};

const slugify = (label: string) =>
  label.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemAnim = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Group() {
  const { slug } = useParams();
  const { toast } = useToast();
  const group = slug ? groupsData[slug] : null;
  const [activeTab, setActiveTab] = useState<"discussions" | "members" | "events" | "about">("discussions");
  const [joined, setJoined] = useState(true);
  const [posts, setPosts] = useState(group?.posts || []);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [postMode, setPostMode] = useState<"post" | "poll">("post");

  // Poll state for groups
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1 day");

  const addPollOption = () => {
    if (pollOptions.length < 6) setPollOptions([...pollOptions, ""]);
  };
  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== index));
  };
  const updatePollOption = (index: number, value: string) => {
    setPollOptions(pollOptions.map((o, i) => (i === index ? value : o)));
  };

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Group not found</h2>
        <p className="text-sm text-muted-foreground mb-4">The group you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const Icon = group.icon;

  const handleCreatePost = () => {
    if (postMode === "poll") {
      if (!pollQuestion.trim()) {
        toast({ title: "Poll question is required", variant: "destructive" });
        return;
      }
      const validOptions = pollOptions.filter(o => o.trim());
      if (validOptions.length < 2) {
        toast({ title: "At least 2 options are required", variant: "destructive" });
        return;
      }
      const newPost = {
        id: Date.now(),
        author: "Demo User",
        avatar: "DE",
        time: "Just now",
        title: pollQuestion,
        body: validOptions.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join("\n"),
        image: null,
        likes: 0,
        comments: 0,
        pinned: false,
      };
      setPosts([newPost, ...posts]);
      setPollQuestion("");
      setPollOptions(["", ""]);
      setPostMode("post");
      setCreatePostOpen(false);
      toast({ title: "Poll published!", description: `Your poll is now live in ${group.label}.` });
      return;
    }
    if (!newPostBody.trim()) {
      toast({ title: "Post cannot be empty", variant: "destructive" });
      return;
    }
    const newPost = {
      id: Date.now(),
      author: "Demo User",
      avatar: "DE",
      time: "Just now",
      title: newPostTitle || newPostBody.slice(0, 60),
      body: newPostBody,
      image: null,
      likes: 0,
      comments: 0,
      pinned: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostBody("");
    setPostMode("post");
    setCreatePostOpen(false);
    toast({ title: "Post published!", description: `Your post is now live in ${group.label}.` });
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleJoin = () => {
    setJoined(!joined);
    toast({ title: joined ? `Left ${group.label}` : `Joined ${group.label}!` });
  };

  const filteredMembers = group.members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "popular") return b.likes - a.likes;
    return 0; // already in recent order
  });

  const pinnedPosts = sortedPosts.filter(p => p.pinned);
  const regularPosts = sortedPosts.filter(p => !p.pinned);

  const tabs = [
    { key: "discussions" as const, label: "Discussions", icon: MessageSquare, count: posts.length },
    { key: "members" as const, label: "Members", icon: Users, count: group.memberCount },
    { key: "events" as const, label: "Events", icon: Calendar, count: group.events.length },
    { key: "about" as const, label: "About", icon: Info },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-5">
      {/* Group Header */}
      <motion.div variants={itemAnim} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 800 112" fill="none">
              <path d="M0 56 Q200 0 400 56 T800 56" stroke="currentColor" strokeWidth="1" className="text-primary" />
              <path d="M0 80 Q200 30 400 80 T800 80" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </svg>
          </div>
        </div>
        <div className="px-6 pb-5 -mt-8">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center border-4 border-card shadow-md", group.color)}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold text-foreground">{group.label}</h1>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {group.memberCount} members</span>
                  <span>•</span>
                  <span>{group.postCount} posts</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={joined ? "outline" : "default"}
                size="sm"
                onClick={handleJoin}
                className="rounded-full"
              >
                {joined ? "Joined ✓" : <><UserPlus className="h-3.5 w-3.5 mr-1" /> Join Group</>}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(`EFC Community — ${group.label}`); toast({ title: "Link copied!" }); }}>
                    <Share2 className="h-4 w-4 mr-2" /> Share group
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Notifications muted" })}>
                    <Settings className="h-4 w-4 mr-2" /> Mute notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast({ title: "Group reported" })} className="text-destructive focus:text-destructive">
                    <Flag className="h-4 w-4 mr-2" /> Report group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border px-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count !== undefined && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-1">{tab.count}</Badge>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === "discussions" && (
        <div className="space-y-4">
          {/* Sort + Create Post Button */}
          <motion.div variants={itemAnim} className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  {sortBy === "recent" ? "Recent" : "Popular"} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSortBy("recent")} className={sortBy === "recent" ? "bg-accent" : ""}>Most Recent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")} className={sortBy === "popular" ? "bg-accent" : ""}>Most Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => { setPostMode("post"); setCreatePostOpen(true); }} className="rounded-full">
              <Plus className="h-4 w-4 mr-1" /> Create Post
            </Button>
          </motion.div>

          {/* Pinned posts */}
          {pinnedPosts.map(post => (
            <motion.div key={post.id} variants={itemAnim} className="rounded-lg border border-primary/20 bg-card shadow-card overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 pt-3 text-xs text-primary font-medium">
                <Pin className="h-3 w-3" /> Pinned
              </div>
              <PostCard post={post} onLike={handleLike} toast={toast} />
            </motion.div>
          ))}

          {/* Regular posts */}
          {regularPosts.map(post => (
            <motion.div key={post.id} variants={itemAnim} className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
              <PostCard post={post} onLike={handleLike} toast={toast} />
            </motion.div>
          ))}

          {posts.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No discussions yet. Be the first to post!</p>
              <Button size="sm" className="mt-3" onClick={() => setCreatePostOpen(true)}>Start a Discussion</Button>
            </div>
          )}
        </div>
      )}

      {activeTab === "members" && (
        <motion.div variants={itemAnim} className="rounded-lg border border-border bg-card shadow-card">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Invite link copied!" })}>
              <UserPlus className="h-3.5 w-3.5 mr-1" /> Invite
            </Button>
          </div>
          <div className="divide-y divide-border">
            {filteredMembers.map(member => (
              <div key={member.name} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                      {member.avatar}
                    </div>
                    {member.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.role === "Admin" ? "default" : member.role === "Moderator" ? "secondary" : "outline"} className="text-[10px] px-1.5 py-0">
                        {member.role}
                      </Badge>
                      {member.online && <span className="text-[10px] text-emerald-500">Online</span>}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast({ title: `Viewing ${member.name}'s profile` })}>View Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({ title: `Message sent to ${member.name}` })}>Send Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "events" && (
        <div className="space-y-4">
          {group.events.length > 0 ? group.events.map((event, i) => (
            <motion.div key={i} variants={itemAnim} className="rounded-lg border border-border bg-card p-4 shadow-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.date} • {event.attendees} attending</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast({ title: "RSVP confirmed!", description: `You're attending "${event.title}"` })}>
                RSVP
              </Button>
            </motion.div>
          )) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No upcoming events for this group.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "about" && (
        <motion.div variants={itemAnim} className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-2">About this group</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{group.description}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-3">Group Rules</h3>
            <ol className="space-y-2">
              {group.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                  {rule}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-2">Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-2xl font-bold text-foreground">{group.memberCount}</p><p className="text-xs text-muted-foreground">Members</p></div>
              <div><p className="text-2xl font-bold text-foreground">{group.postCount}</p><p className="text-xs text-muted-foreground">Posts</p></div>
              <div><p className="text-2xl font-bold text-foreground">{group.events.length}</p><p className="text-xs text-muted-foreground">Events</p></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Create Post Dialog */}
      <Dialog open={createPostOpen} onOpenChange={(open) => { setCreatePostOpen(open); if (!open) setPostMode("post"); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              Create in {group.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Post / Poll toggle */}
            <div className="flex gap-1 p-1 rounded-lg bg-muted">
              <button
                onClick={() => setPostMode("post")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  postMode === "post" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <PenTool className="h-3.5 w-3.5" /> Post
              </button>
              <button
                onClick={() => setPostMode("poll")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  postMode === "poll" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <BarChart3 className="h-3.5 w-3.5" /> Poll
              </button>
            </div>

            {postMode === "post" ? (
              <>
                <input
                  type="text"
                  placeholder="Discussion title"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newPostBody}
                  onChange={e => setNewPostBody(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </>
            ) : (
              <>
                <Textarea
                  placeholder="Ask your question..."
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
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
                        onChange={e => updatePollOption(i, e.target.value)}
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
                  <select
                    value={pollDuration}
                    onChange={e => setPollDuration(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option>1 day</option>
                    <option>3 days</option>
                    <option>1 week</option>
                    <option>2 weeks</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" onClick={() => setCreatePostOpen(false)}>Cancel</Button>
              <Button onClick={handleCreatePost}>
                <Send className="h-4 w-4 mr-1" /> {postMode === "poll" ? "Post Poll" : "Post"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

/* Reusable Post Card */
function PostCard({ post, onLike, toast }: {
  post: { id: number; author: string; avatar: string; time: string; title: string; body: string; image: string | null; likes: number; comments: number };
  onLike: (id: number) => void;
  toast: (opts: { title: string; description?: string }) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">{post.avatar}</div>
          <div>
            <p className="text-sm font-semibold text-foreground">{post.author}</p>
            <p className="text-xs text-muted-foreground">{post.time}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast({ title: "Post saved!" })}><BookmarkPlus className="h-4 w-4 mr-2" /> Save</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(post.title); toast({ title: "Link copied!" }); }}><Share2 className="h-4 w-4 mr-2" /> Copy link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast({ title: "Post reported" })} className="text-destructive focus:text-destructive"><Flag className="h-4 w-4 mr-2" /> Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-4 pb-3">
        <h3 className="text-sm font-semibold text-foreground mb-2">{post.title}</h3>
        <p className={cn("text-sm text-muted-foreground leading-relaxed whitespace-pre-line", !expanded && "line-clamp-4")}>{post.body}</p>
        {post.body.length > 200 && (
          <button onClick={() => setExpanded(!expanded)} className="text-xs font-bold text-foreground mt-1 hover:text-primary transition-colors">
            {expanded ? "SHOW LESS" : "READ MORE..."}
          </button>
        )}
      </div>
      {post.image && (
        <div className="px-4 pb-3">
          <img src={post.image} alt="" className="w-full rounded-lg object-cover max-h-72" />
        </div>
      )}
      <div className="px-4 pb-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>
      <div className="flex items-center border-t border-border divide-x divide-border">
        <button onClick={() => onLike(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <ThumbsUp className="h-4 w-4" /> Like
        </button>
        <button onClick={() => toast({ title: "Comment section coming soon!" })} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <MessageSquare className="h-4 w-4" /> Comment
        </button>
        <button onClick={() => { navigator.clipboard.writeText(post.title); toast({ title: "Link copied!" }); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>
    </>
  );
}
