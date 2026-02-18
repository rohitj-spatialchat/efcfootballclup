import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
  MessageSquare,
  Bookmark,
  MoreHorizontal,
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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [groupsOpen, setGroupsOpen] = useState(true);
  const [spatialOpen, setSpatialOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="flex items-center gap-1.5">
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <button className="relative rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="rounded-md p-2 text-muted-foreground hover:bg-muted transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold ml-1 cursor-pointer">
              <img src={efcLogo} alt="User" className="h-8 w-8 rounded-full object-cover" />
            </div>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />

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
            {/* Feed */}
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

            {/* Announcements */}
            <Link
              to="/announcements"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Megaphone className="h-4 w-4" />
              Announcements
            </Link>

            {/* Direct Message */}
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
