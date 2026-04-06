import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useViewMode } from "@/contexts/ViewModeContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Rss,
  Megaphone,
  Send,
  Users,
  ChevronUp,
  ChevronDown,
  Search,
  Bell,
  MessageCircle,
  Dumbbell,
  FlaskConical,
  Apple,
  Brain,
  Stethoscope,
  Zap,
  HeartPulse,
  Globe,
  Menu,
  X,
  User,
  Settings,
  Moon,
  HelpCircle,
  Flame,
  Video,
  Radio,
  MapPin,
  Shield,
  Mountain,
  Compass,
  Landmark,
  Snowflake,
  Sun,
  Castle,
  Grape,
  Activity,
  RotateCcw,
  CalendarClock,
  CalendarDays,
  ClipboardList,
  UserCheck,
  UsersRound,
  BarChart3,
  MonitorPlay,
  Cog,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Hand,
  Share,
  MessageSquare,
  FileText,
  BarChart,
  Plus,
  PenTool,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import efcLogo from "@/assets/efclogo.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Knowledge Hub", path: "/knowledge" },
  { label: "Member Directory", path: "/community" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Networking", path: "/networking" },
  { label: "Rewards", path: "/redemption" },
  { label: "AI Search", path: "/ai-search" },
];

const groups = [
  { label: "Sport & Exercise", icon: Dumbbell, slug: "sport-exercise" },
  { label: "Science", icon: FlaskConical, slug: "science" },
  { label: "Nutrition", icon: Apple, slug: "nutrition" },
  { label: "Sport Psychology", icon: Brain, slug: "sport-psychology" },
  { label: "Medical & Physiotherapy", icon: Stethoscope, slug: "medical-physiotherapy" },
  { label: "Strength & Power", icon: Zap, slug: "strength-power" },
  { label: "Fitness & Exercise Physiology", icon: HeartPulse, slug: "fitness-exercise-physiology" },
];

const spatialRooms = [
  { name: "Balkans", icon: Mountain },
  { name: "United Kingdom", icon: Landmark },
  { name: "DACH", icon: Castle },
  { name: "RU+", icon: Compass },
  { name: "Benelux", icon: Grape },
  { name: "Central", icon: MapPin },
  { name: "Nordics", icon: Snowflake },
  { name: "Latin", icon: Sun },
  { name: "Eastern", icon: Shield },
  { name: "Iberico", icon: Globe },
  { name: "Injury Prevention", icon: Activity },
  { name: "Return to Performance", icon: RotateCcw },
  { name: "Periodization", icon: CalendarClock },
];

const notifications = [
  {
    title: "⚽ Transfer Window Update",
    desc: "Breaking: Major midfielder signing confirmed for Champions League contender",
    time: "5m ago",
    unread: true,
  },
  {
    title: "🏥 Injury Report Alert",
    desc: "Key striker ruled out for 6 weeks with hamstring tear ahead of derby",
    time: "15m ago",
    unread: true,
  },
  {
    title: "📊 New Research Published",
    desc: "Groundbreaking study on GPS load monitoring and injury prevention released",
    time: "1h ago",
    unread: true,
  },
  {
    title: "🏆 Match Analysis Available",
    desc: "Post-match tactical breakdown: pressing intensity & defensive transitions",
    time: "3h ago",
    unread: false,
  },
];

const channels = ["General", "Announcements", "Sports Science", "Injury Prevention", "Nutrition"];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { viewMode, isAdmin, toggleViewMode } = useViewMode();
  const { toast } = useToast();
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [spatialOpen, setSpatialOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [liveSessionOpen, setLiveSessionOpen] = useState(false);
  const [sessionType, setSessionType] = useState("video");
  const [dmOpen, setDmOpen] = useState(false);
  const [dmTab, setDmTab] = useState("Inbox");
  const [activeContact, setActiveContact] = useState("Robert Fox");
  const [spatialRoomOpen, setSpatialRoomOpen] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [spatialChatTab, setSpatialChatTab] = useState<"chat" | "qa" | "polls" | "docs">("chat");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const dmRef = useRef<HTMLDivElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (dmRef.current && !dmRef.current.contains(e.target as Node)) setDmOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          {/* Logo + Nav */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-2 shrink-0">
              <img src={efcLogo} alt="EFC Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-foreground text-sm">EFC MPU Community</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-4 overflow-x-auto scrollbar-hide">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-2.5 py-1.5 text-[13px] rounded-md whitespace-nowrap transition-colors shrink-0",
                      active
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Admin/User View Toggle */}
            <button
              onClick={toggleViewMode}
              className={cn(
                "hidden lg:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors mr-2",
                isAdmin
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted text-muted-foreground border border-border",
              )}
            >
              {isAdmin ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {isAdmin ? "Admin View" : "User View"}
            </button>

            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                className="h-9 w-44 rounded-full border border-border bg-muted/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:bg-background transition-colors"
              />
            </div>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
                className="relative rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 rounded-lg border border-border bg-card shadow-elevated z-50">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                    <button className="text-xs text-primary hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n, i) => (
                      <div
                        key={i}
                        className={cn(
                          "px-3 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0",
                          n.unread && "bg-primary/5",
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
                          <div className={cn(!n.unread && "ml-4")}>
                            <p className="text-xs font-semibold text-foreground">{n.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{n.desc}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Chat */}
            <div ref={dmRef} className="relative">
              <button
                onClick={() => {
                  setDmOpen(!dmOpen);
                  setNotifOpen(false);
                  setProfileOpen(false);
                }}
                className="relative rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
              {dmOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-[360px] rounded-lg border border-border bg-card shadow-elevated z-50 flex flex-col"
                  style={{ maxHeight: "calc(100vh - 4rem)" }}
                >
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-base font-semibold text-foreground">Direct messages</h2>
                    <button onClick={() => setDmOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 px-4 pt-3 pb-2">
                    {["Inbox", "Unread", "Agents"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setDmTab(tab)}
                        className={cn(
                          "text-sm pb-1",
                          dmTab === tab
                            ? "text-foreground font-medium border-b-2 border-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {tab === "Agents" ? "✨ Agents" : tab}
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search for a name"
                        className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div className="px-4 py-1">
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">✨ Agents</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {[
                      {
                        name: "Clarity Coach",
                        time: "9:45",
                        preview: "Just wanted to check in and se...",
                        agent: true,
                      },
                      {
                        name: "Carlos Ramirez",
                        time: "10:18",
                        preview: "Creating a space where clients...",
                        unread: true,
                      },
                      { name: "Robert, Edwin +2", time: "10:30", preview: "How you're feeling about this w..." },
                      { name: "Robert Fox", time: "10:46", preview: "Can we discuss that project we...", active: true },
                      {
                        name: "Dianne Russell",
                        time: "11:08",
                        preview: "I just crossed a new income mil...",
                        unread: true,
                      },
                      { name: "Mei Wong", time: "12:45", preview: "Wanted to share something exci...", unread: true },
                      { name: "Kwame Adebayo", time: "1:03", preview: "I was thinking about our niche cl..." },
                      { name: "Ravi Patel", time: "1:18", preview: "I made a new client offer today!..." },
                      { name: "Esther Howard", time: "9:45", preview: "Hope you're doing well. Any pla..." },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setActiveContact(c.name);
                          setDmOpen(false);
                          navigate("/chat");
                        }}
                        className={cn(
                          "flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                          activeContact === c.name && "bg-muted/50",
                        )}
                      >
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                          {c.agent
                            ? "🤖"
                            : c.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{c.name}</span>
                            <span className="text-[10px] text-muted-foreground">{c.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                        </div>
                        {c.unread && <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />}
                      </button>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button
                      onClick={() => {
                        setDmOpen(false);
                        navigate("/chat");
                      }}
                      className="w-full text-center text-sm text-primary hover:underline font-medium"
                    >
                      Open all messages
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                  DE
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-border bg-card shadow-elevated z-50 py-3">
                  <div className="flex flex-col items-center pb-3 border-b border-border px-4">
                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-semibold mb-2">
                      DE
                    </div>
                    <p className="text-sm font-semibold text-foreground">Demo</p>
                    <p className="text-xs text-muted-foreground">@demostudent16553</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning">
                      <Flame className="h-3 w-3" /> 800
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="h-4 w-4 text-muted-foreground" /> My Profile
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/analytics");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 text-muted-foreground" /> Analytics
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/settings");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/community");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" /> Community Members
                    </button>
                    <button
                      onClick={() => {
                        document.documentElement.classList.toggle("dark");
                        setProfileOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Moon className="h-4 w-4 text-muted-foreground" /> Dark Mode
                      </span>
                      <div className="h-5 w-9 rounded-full bg-muted relative">
                        <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform" />
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        toast({ title: "Support", description: "Use the help chat widget in the bottom-right corner for support." });
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-muted-foreground" /> Support
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card p-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-md transition-colors",
                    active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex shrink-0 flex-col border-r border-border bg-card overflow-y-auto transition-all duration-300 relative",
            sidebarCollapsed ? "w-14" : "w-56",
          )}
        >
          {/* Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-3 z-10 h-6 w-6 rounded-full border border-border bg-card shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {sidebarCollapsed ? <ChevronsRight className="h-3.5 w-3.5" /> : <ChevronsLeft className="h-3.5 w-3.5" />}
          </button>

          <div className={cn("p-3 space-y-0.5", sidebarCollapsed && "px-2")}>
            <Link
              to="/"
              title="Feed"
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                sidebarCollapsed && "justify-center px-0",
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Rss className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && "Feed"}
            </Link>
            <Link
              to="/announcements"
              title="Announcements"
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors",
                sidebarCollapsed && "justify-center px-0",
              )}
            >
              <Megaphone className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && "Announcements"}
            </Link>
            <Link
              to="/chat"
              title="Direct Message EFC MPU"
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                sidebarCollapsed && "justify-center px-0",
                location.pathname === "/chat"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Send className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && "Direct Message EFC MPU"}
            </Link>
            <Link
              to="/explore-groups"
              title="Explore Groups"
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                sidebarCollapsed && "justify-center px-0",
                location.pathname === "/explore-groups"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Compass className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && "Explore Groups"}
            </Link>
            <Link
              to="/calendar"
              title="Calendar"
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                sidebarCollapsed && "justify-center px-0",
                location.pathname.startsWith("/calendar")
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <CalendarDays className="h-4 w-4 shrink-0" />
              {!sidebarCollapsed && "Calendar"}
            </Link>
          </div>

          {/* Groups */}
          <div className={cn("px-3 mt-2", sidebarCollapsed && "px-2")}>
            <button
              onClick={() => !sidebarCollapsed && setGroupsOpen(!groupsOpen)}
              title="Groups"
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors",
                sidebarCollapsed && "justify-center px-0",
              )}
            >
              <span className="flex items-center gap-2.5">
                <Users className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && "Groups"}
              </span>
              {!sidebarCollapsed &&
                (groupsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />)}
            </button>
            {groupsOpen && !sidebarCollapsed && (
              <div className="ml-3 mt-0.5 space-y-0.5">
                {groups.map((g) => (
                  <Link
                    key={g.label}
                    to={`/groups/${g.slug}`}
                    className={cn(
                      "flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-xs transition-colors",
                      location.pathname === `/groups/${g.slug}`
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <g.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="text-left">{g.label}</span>
                  </Link>
                ))}
              </div>
            )}
            {sidebarCollapsed && (
              <div className="mt-0.5 space-y-0.5">
                {groups.map((g) => (
                  <Link
                    key={g.label}
                    to={`/groups/${g.slug}`}
                    title={g.label}
                    className={cn(
                      "flex items-center justify-center rounded-md py-2 transition-colors",
                      location.pathname === `/groups/${g.slug}`
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <g.icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Spatial Room */}
          <div className={cn("px-3 mt-2", sidebarCollapsed && "px-2")}>
            <button
              onClick={() => !sidebarCollapsed && setSpatialOpen(!spatialOpen)}
              title="Spatial Room"
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors",
                sidebarCollapsed && "justify-center px-0",
              )}
            >
              <span className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && "Spatial Room"}
              </span>
              {!sidebarCollapsed &&
                (spatialOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />)}
            </button>
            {spatialOpen && !sidebarCollapsed && (
              <div className="ml-3 mt-0.5 space-y-0.5 pb-4">
                {spatialRooms.map((room) => (
                  <a
                    key={room.name}
                    href="https://app.spatial.chat/s/RCg3AlBcmcqAPTeHxDXN?room=rxTXTyLCcNoTM0zYde35"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <room.icon className="h-3.5 w-3.5 shrink-0" />
                    {room.name}
                  </a>
                ))}
              </div>
            )}
            {sidebarCollapsed && (
              <div className="mt-0.5 space-y-0.5 pb-4">
                {spatialRooms.map((room) => (
                  <a
                    key={room.name}
                    href="https://app.spatial.chat/s/RCg3AlBcmcqAPTeHxDXN?room=rxTXTyLCcNoTM0zYde35"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={room.name}
                    className="flex items-center justify-center w-full rounded-md py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <room.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Start Live Session Button - at bottom (admin only) */}
          {isAdmin && (
            <div className={cn("px-3 py-4 mt-auto", sidebarCollapsed && "px-2")}>
              <button
                onClick={() => setLiveSessionOpen(true)}
                title="Start live session"
                className={cn(
                  "flex items-center justify-center gap-2.5 w-full rounded-lg border-2 border-dashed border-border px-3 py-3 text-sm font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-colors",
                  sidebarCollapsed && "px-0",
                )}
              >
                <Video className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && "Start live session"}
              </button>
            </div>
          )}
        </aside>

        {/* Event Sub-Sidebar */}
        {location.pathname === "/events" && (
          <aside className="hidden lg:flex w-48 shrink-0 flex-col border-r border-border bg-card py-4">
            <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Event Management
            </h3>
            <nav className="space-y-0.5 px-2">
              {[
                { label: "Event", icon: ClipboardList, tab: "" },
                { label: "Registration", icon: UserCheck, tab: "registration", adminOnly: true },
                { label: "People", icon: UsersRound, tab: "people", adminOnly: true },
                { label: "Engagement", icon: Flame, tab: "engagement", adminOnly: true },
                { label: "Analytics", icon: BarChart3, tab: "analytics", adminOnly: true },
                { label: "Recording", icon: MonitorPlay, tab: "recording", adminOnly: true },
                { label: "Settings", icon: Cog, tab: "settings", adminOnly: true },
              ]
                .filter((item) => !item.adminOnly || isAdmin)
                .map((item) => {
                  const params = new URLSearchParams(location.search);
                  const currentTab = params.get("tab") || "";
                  const isActive = currentTab === item.tab;
                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.tab ? `/events?tab=${item.tab}` : "/events")}
                      className={cn(
                        "flex items-center gap-2.5 w-full rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Create Live Session Dialog */}
      <Dialog open={liveSessionOpen} onOpenChange={setLiveSessionOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">Create Live Session</DialogTitle>
          </DialogHeader>
          <div className="border-t border-primary/30 mb-2" />
          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-foreground">
                Session Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter session name"
                className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground">
                Post in Channel <span className="text-destructive">*</span>
              </label>
              <select className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
                <option value="">Select channel</option>
                {channels.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground">Session Type</label>
              <div className="flex gap-3 mt-1.5">
                <button
                  onClick={() => setSessionType("video")}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors",
                    sessionType === "video"
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Video className="h-4 w-4" /> Video Call
                </button>
                <button
                  onClick={() => setSessionType("webinar")}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors",
                    sessionType === "webinar"
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Radio className="h-4 w-4" /> Webinar
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                <span className="font-medium">Participation</span> : Everyone can switch on their mic and camera
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground">Description</label>
              <textarea
                placeholder=""
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 min-h-[80px] resize-y"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground">Cover Picture</label>
              <div className="mt-1.5 flex items-center justify-center rounded-md border-2 border-dashed border-border px-4 py-4 cursor-pointer hover:border-primary/30 transition-colors">
                <span className="text-sm text-muted-foreground">+ Upload Live Call Thumbnail</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Size: 16:9 or 1600 by 900px</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
            <button
              onClick={() => setLiveSessionOpen(false)}
              className="rounded-md border border-border px-5 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setLiveSessionOpen(false)}
              className="rounded-md bg-[hsl(220,20%,14%)] px-5 py-2 text-sm font-medium text-white hover:bg-[hsl(220,20%,20%)] transition-colors"
            >
              Create Live Session
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Spatial Room Overlay */}
      <AnimatePresence>
        {spatialRoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[hsl(230,25%,12%)] flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium text-sm">Spatial Event</span>
                <div className="flex items-center gap-1.5 text-white/50 text-sm">
                  <Users className="h-4 w-4" />
                  <span>120</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 hover:bg-white/20 transition-colors">
                  <Users className="h-4 w-4" /> INVITE
                </button>
                <button className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 hover:bg-white/20 transition-colors">
                  <Video className="h-4 w-4" /> MEET
                </button>
                <button
                  onClick={() => setSpatialRoomOpen(null)}
                  className="rounded-full bg-destructive/80 hover:bg-destructive p-1.5 text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left - Toolbar */}
              <div className="w-12 shrink-0 flex flex-col items-center py-4 gap-4 border-r border-white/10">
                {[Users, MessageSquare, FileText, PenTool, Share].map((Icon, i) => (
                  <button
                    key={i}
                    className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>

              {/* Center - Main Stage with Background */}
              <div className="flex-1 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      {
                        "United Kingdom":
                          "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&h=1080&fit=crop')",
                        DACH: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop')",
                      }[spatialRoomOpen || ""] ||
                      "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')",
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* EFC Logo watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/10 text-[120px] font-black tracking-wider">EFC</span>
                </div>

                {/* Floating participant avatars */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-end gap-4">
                  {[
                    { name: "Riddhik", color: "border-primary" },
                    { name: "Dr. Rossi", color: "border-amber-400" },
                    { name: "Sarah M.", color: "border-green-400" },
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div
                        className={`h-14 w-14 rounded-full border-2 ${p.color} bg-[hsl(230,20%,18%)] flex items-center justify-center`}
                      >
                        <span className="text-white text-xs font-bold">
                          {p.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-[10px] text-white/70 bg-black/40 rounded px-1.5 py-0.5">{p.name}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Toolbar */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {[Plus, PenTool, Monitor, MessageSquare].map((Icon, i) => (
                    <button
                      key={i}
                      className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5" />
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
                  <button className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors backdrop-blur-sm">
                    <Share className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSpatialRoomOpen(null)}
                    className="h-11 w-11 rounded-full bg-destructive/80 hover:bg-destructive flex items-center justify-center text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-6 right-6 text-white/50 text-sm">45%</div>

                {/* Help buttons bottom-left */}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  <button className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm">
                    <HelpCircle className="h-4 w-4" />
                  </button>
                  <button className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Right - Rooms Sidebar */}
              <div className="w-64 shrink-0 bg-[hsl(230,20%,14%)] border-l border-white/10 flex flex-col">
                {/* Search */}
                <div className="p-3 flex items-center justify-between border-b border-white/10">
                  <Search className="h-4 w-4 text-white/40" />
                  <div className="flex items-center gap-2">
                    <button className="h-7 w-7 rounded bg-primary flex items-center justify-center text-white">
                      <User className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded bg-white/10 flex items-center justify-center text-white/60 hover:text-white">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Room list */}
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                  {/* Active room */}
                  <div className="rounded-md bg-primary/20 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white flex items-center gap-2">
                        <span className="text-primary">▼</span> EFC Welcome Lobby
                      </span>
                      <span className="text-[10px] text-white/50">1/50</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 ml-4">
                      <div className="h-6 w-6 rounded-full bg-primary/30 flex items-center justify-center text-[10px] text-white font-bold">
                        RK
                      </div>
                      <span className="text-xs text-white/80">Riddhik</span>
                      <span className="text-[10px] bg-primary/30 text-primary-foreground rounded px-1.5 py-0.5">
                        You
                      </span>
                    </div>
                  </div>

                  {/* Other rooms */}
                  {[
                    { name: "EFC Networking Room", icon: "▶", capacity: "0/50" },
                    { name: "Stage", icon: "▶", capacity: "0/5000", special: true },
                    { name: "Workshop Room", icon: "▶", capacity: "0/50" },
                    { name: "Manchester City", icon: "📁", capacity: "" },
                    { name: "Networking Room", icon: "▶", capacity: "0/50" },
                  ].map((room) => (
                    <button
                      key={room.name}
                      className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-white/40 text-xs">{room.icon}</span>
                        {room.name}
                      </span>
                      {room.capacity && <span className="text-[10px] text-white/40">{room.capacity}</span>}
                    </button>
                  ))}
                </div>

                {/* Add Room */}
                <div className="p-3 border-t border-white/10">
                  <button className="flex items-center justify-center gap-2 w-full rounded-md bg-white/5 hover:bg-white/10 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors">
                    <Plus className="h-4 w-4" /> Add Room
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
