import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
  Bookmark,
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import efcLogo from "@/assets/efclogo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Knowledge Hub", path: "/knowledge" },
  { label: "Community Members", path: "/community" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Networking", path: "/networking" },
  { label: "AI Search", path: "/ai-search" },
];

const groups = [
  { label: "Sport & Exercise", icon: Dumbbell },
  { label: "Science", icon: FlaskConical },
  { label: "Nutrition", icon: Apple },
  { label: "Sport Psychology", icon: Brain },
  { label: "Medical & Physiotherapy", icon: Stethoscope },
  { label: "Strength & Power", icon: Zap },
  { label: "Fitness & Exercise Physiology", icon: HeartPulse },
];

const spatialRooms = [
  "Balkans", "United Kingdom", "DACH", "RU+", "Benelux", "Central",
  "Nordics", "Latin", "Eastern", "Iberico", "Injury Prevention",
  "Return to Performance", "Periodization",
];

const notifications = [
  { title: "⚽ Transfer Window Update", desc: "Breaking: Major midfielder signing confirmed for Champions League contender", time: "5m ago", unread: true },
  { title: "🏥 Injury Report Alert", desc: "Key striker ruled out for 6 weeks with hamstring tear ahead of derby", time: "15m ago", unread: true },
  { title: "📊 New Research Published", desc: "Groundbreaking study on GPS load monitoring and injury prevention released", time: "1h ago", unread: true },
  { title: "🏆 Match Analysis Available", desc: "Post-match tactical breakdown: pressing intensity & defensive transitions", time: "3h ago", unread: false },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [spatialOpen, setSpatialOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <img src={efcLogo} alt="EFC Logo" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-semibold text-foreground text-sm">EFC MPU Community</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-4">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors",
                      active
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <Search className="h-4 w-4" />
            </button>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
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
                      <div key={i} className={cn("px-3 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0", n.unread && "bg-primary/5")}>
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
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>

            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-1 cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                  DE
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-border bg-card shadow-elevated z-50 py-3">
                  {/* Profile Header */}
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
                  {/* Menu Items */}
                  <div className="py-1">
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <User className="h-4 w-4 text-muted-foreground" /> My Profile
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Users className="h-4 w-4 text-muted-foreground" /> Community Members
                    </button>
                    <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <span className="flex items-center gap-3">
                        <Moon className="h-4 w-4 text-muted-foreground" /> Dark Mode
                      </span>
                      <div className="h-5 w-9 rounded-full bg-muted relative">
                        <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-transform" />
                      </div>
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
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
                    active
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted"
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
        <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-border bg-card overflow-y-auto">
          <div className="p-3 space-y-0.5">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <Rss className="h-4 w-4" />
              Feed
            </Link>
            <Link
              to="/announcements"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Megaphone className="h-4 w-4" />
              Announcements
            </Link>
            <Link
              to="/messages"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Send className="h-4 w-4" />
              Direct Message EFC MPU
            </Link>
          </div>

          {/* Groups */}
          <div className="px-3 mt-2">
            <button
              onClick={() => setGroupsOpen(!groupsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Users className="h-4 w-4" />
                Groups
              </span>
              {groupsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {groupsOpen && (
              <div className="ml-3 mt-0.5 space-y-0.5">
                {groups.map((g) => (
                  <button
                    key={g.label}
                    className="flex items-center gap-2 w-full rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <g.icon className="h-3.5 w-3.5" />
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Spatial Room */}
          <div className="px-3 mt-2">
            <button
              onClick={() => setSpatialOpen(!spatialOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Globe className="h-4 w-4" />
                Spatial Room
              </span>
              {spatialOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
            {spatialOpen && (
              <div className="ml-3 mt-0.5 space-y-0.5 pb-4">
                {spatialRooms.map((room) => (
                  <button
                    key={room}
                    className="flex items-center gap-2 w-full rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {room}
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
