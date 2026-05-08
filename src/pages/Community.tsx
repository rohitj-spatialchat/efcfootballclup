import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Settings,
  ChevronDown,
  MoreHorizontal,
  Globe,
  Users,
  Link2,
  Tag,
  User,
  BarChart3,
  Mail,
  Shield,
  Download,
  Trash2,
  UserPlus,
  Ban,
  RefreshCw,
  X,
  MessageCircle,
  LayoutGrid,
  List,
  MapPin,
  Info,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/contexts/ViewModeContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTeamLogo, getTeamLogoFallback, normalizeMember, COUNTRY_TO_REGION, EFC_REGIONS, EFC_COUNTRY_NAMES, EFC_CLUB_NAMES } from "@/lib/efcData";
import { nameToSlug } from "./MemberProfile";

const communitySidebar = [
  { label: "Audience", icon: Users },
  { label: "Manage audience", icon: Users, active: true },
  { label: "Segments", icon: BarChart3 },
  { label: "Invite links", icon: Link2 },
  { label: "Tags", icon: Tag },
  { label: "Profile fields", icon: User },
  { label: "Bulk logs", icon: BarChart3 },
];

function getRegion(country: string): string {
  return COUNTRY_TO_REGION[country] || "British Isles";
}

function getFlag(country: string): string {
  const flags: Record<string, string> = {
    "Germany": "🇩🇪", "France": "🇫🇷", "Italy": "🇮🇹", "Netherlands": "🇳🇱",
    "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Northern Ireland": "🇬🇧",
    "Spain": "🇪🇸", "Portugal": "🇵🇹", "Belgium": "🇧🇪",
    "Denmark": "🇩🇰", "Ireland": "🇮🇪", "Czech Republic": "🇨🇿",
    "Austria": "🇦🇹", "Switzerland": "🇨🇭", "Sweden": "🇸🇪", "Norway": "🇳🇴",
    "Poland": "🇵🇱", "Greece": "🇬🇷", "Turkey": "🇹🇷", "Russia": "🇷🇺",
    "Ukraine": "🇺🇦", "Croatia": "🇭🇷", "Serbia": "🇷🇸", "Hungary": "🇭🇺",
  };
  return flags[country] || "🏳️";
}

const initialMembers = [
  {
    name: "Kwame Adebayo",
    email: "adebayo@gmail.com",
    country: "Netherlands",
    region: "Western Europe",
    discipline: "Nutrition",
    mpu: 920,
    role: "Member",
    position: "Nutritionist",
    title: "Head of Nutrition",
    joined: "Apr 12, 2024",
    flag: "🇳🇱",
    followers: 142,
    following: 89,
    avatar: "https://i.pravatar.cc/150?img=11",
    subscribed: true,
    team: "AFC Ajax",
    format: "Full-time",
  },
  {
    name: "Robert Fox",
    email: "robertfox@gmail.com",
    country: "Italy",
    region: "Southern Europe",
    discipline: "Physiotherapy",
    mpu: 940,
    role: "Member",
    position: "Physiotherapist",
    title: "Senior Physiotherapist",
    joined: "Mar 5, 2024",
    flag: "🇮🇹",
    followers: 230,
    following: 115,
    avatar: "https://i.pravatar.cc/150?img=12",
    subscribed: true,
    team: "AC Milan",
    format: "Full-time",
  },
  {
    name: "Mei Wong",
    email: "meiwong@gmail.com",
    country: "Italy",
    region: "Southern Europe",
    discipline: "Fitness & Conditioning",
    mpu: 800,
    role: "Member",
    position: "Fitness Coach",
    title: "Fitness Coach",
    joined: "Jun 22, 2024",
    flag: "🇮🇹",
    followers: 67,
    following: 43,
    avatar: "https://i.pravatar.cc/150?img=5",
    subscribed: false,
    team: "Sevilla FC",
    format: "Contract",
  },
  {
    name: "Dianne Russell",
    email: "drussell@yahoo.com",
    country: "Portugal",
    region: "Southern Europe",
    discipline: "Scouting",
    mpu: 920,
    role: "Moderator",
    position: "Head Scout",
    title: "Chief Scout",
    joined: "Mar 9, 2023",
    flag: "🇵🇹",
    followers: 312,
    following: 178,
    avatar: "https://i.pravatar.cc/150?img=23",
    subscribed: true,
    team: "Chelsea FC",
    format: "Full-time",
  },
  {
    name: "Kristin Watson",
    email: "kristin@watson.com",
    country: "Portugal",
    region: "Southern Europe",
    discipline: "Management",
    mpu: 920,
    role: "Admin",
    position: "Team Manager",
    title: "Director of Football Operations",
    joined: "Sep 19, 2022",
    flag: "🇵🇹",
    followers: 456,
    following: 201,
    avatar: "https://i.pravatar.cc/150?img=32",
    subscribed: true,
    team: "RB Leipzig",
    format: "Full-time",
  },
  {
    name: "Carlos Ramirez",
    email: "ramirez@yahoo.com",
    country: "England",
    region: "Northern Europe",
    discipline: "Performance Analysis",
    mpu: 670,
    role: "Member",
    position: "Performance Analyst",
    title: "Performance Analyst",
    joined: "Jul 8, 2024",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    followers: 34,
    following: 22,
    avatar: "https://i.pravatar.cc/150?img=53",
    subscribed: false,
    team: "Arsenal FC",
    format: "Part-time",
  },
  {
    name: "Ravi Patel",
    email: "ravi@email.com",
    country: "United Kingdom",
    region: "Northern Europe",
    discipline: "Coaching",
    mpu: 920,
    role: "Moderator",
    position: "Goalkeeper Coach",
    title: "Goalkeeper Coach",
    joined: "Dec 1, 2023",
    flag: "🇬🇧",
    followers: 189,
    following: 97,
    avatar: "https://i.pravatar.cc/150?img=59",
    subscribed: true,
    team: "Celtic FC",
    format: "Full-time",
  },
];

const initialInvited = [
  {
    name: "Hina Okazaki",
    email: "okazaki-h@to-be.co.jp",
    subscribed: true,
    invitationStatus: "—",
    role: "Invited",
    dateAdded: "Mar 27, 2026",
    invitedAt: "—",
  },
  {
    name: "池戸千賀良",
    email: "c.ikedo@tips7.biz",
    subscribed: true,
    invitationStatus: "—",
    role: "Invited",
    dateAdded: "Oct 3, 2025",
    invitedAt: "—",
  },
  {
    name: "Elena Messore",
    email: "elena.messore@terna.it",
    subscribed: true,
    invitationStatus: "—",
    role: "Invited",
    dateAdded: "Dec 16, 2024",
    invitedAt: "—",
  },
  {
    name: "Keshia Case",
    email: "kcase@colearn.com",
    subscribed: true,
    invitationStatus: "—",
    role: "Invited",
    dateAdded: "Jul 9, 2024",
    invitedAt: "Jul 9, 2024",
  },
  {
    name: "Philip",
    email: "philipfields458@gmail.com",
    subscribed: true,
    invitationStatus: "—",
    role: "Invited",
    dateAdded: "Mar 19, 2024",
    invitedAt: "Mar 19, 2024",
  },
  {
    name: "Isabelle Desrosiers",
    email: "idesrosiers@ideoscripto.fr",
    subscribed: true,
    invitationStatus: "—",
    role: "Invited",
    dateAdded: "Dec 12, 2022",
    invitedAt: "Dec 12, 2022",
  },
];

const initialBlocked = [
  { name: "Tomás Silva", email: "tsilva@spam.net", reason: "Spam", blockedAt: "Feb 14, 2026" },
  { name: "Jake Morrison", email: "jake.m@fake.com", reason: "Harassment", blockedAt: "Jan 3, 2026" },
  { name: "Анна Козлова", email: "anna.k@mail.ru", reason: "Inappropriate content", blockedAt: "Nov 20, 2025" },
  { name: "Liu Wei", email: "liuwei88@temp.cn", reason: "Spam", blockedAt: "Sep 5, 2025" },
];

const avatarColors = [
  "bg-primary/80",
  "bg-accent/80",
  "bg-destructive/40",
  "bg-secondary",
  "bg-muted-foreground/30",
  "bg-primary/50",
  "bg-accent/50",
];

const mpuColor = (mpu: number) => {
  if (mpu >= 900) return "bg-success text-success-foreground";
  if (mpu >= 700) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

type ActiveTab = "all" | "contacts" | "members" | "invited" | "admins" | "moderators" | "blocked";

export default function CommunityPage() {
  const { users: authUsers } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useViewMode();

  const authMembers = useMemo(() => {
    const existingEmails = new Set(initialMembers.map((m) => m.email.toLowerCase()));
    return authUsers
      .filter((u) => !existingEmails.has(u.email.toLowerCase()))
      .map((u) => {
        const norm = normalizeMember(u.country, u.club);
        return {
          name: `${u.firstName} ${u.lastName}`.trim(),
          email: u.email,
          country: norm.country,
          region: norm.region,
          discipline: u.position || "General",
          mpu: Math.floor(Math.random() * 400 + 600),
          role: "Member",
          position: u.position || "",
          title: u.role || "",
          joined: "Apr 2026",
          flag: getFlag(norm.country),
          followers: Math.floor(Math.random() * 200),
          following: Math.floor(Math.random() * 100),
          avatar: "",
          subscribed: true,
          team: norm.team,
          format: "Full-time",
        };
      });
  }, [authUsers]);

  const [members, setMembers] = useState(initialMembers);
  const [invited, setInvited] = useState(initialInvited);
  const [blocked, setBlocked] = useState(initialBlocked);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [showInviteBanner, setShowInviteBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMember, setNewMember] = useState({ name: "", email: "", country: "", role: "Member" });
  const [followedMembers, setFollowedMembers] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({
    region: "",
    discipline: "",
    country: "",
    team: "",
    title: "",
    format: "",
    role: "",
    emailMarketing: "",
  });
  const [invitedFilters, setInvitedFilters] = useState<Record<string, string>>({
    name: "",
    email: "",
    tag: "",
    invitationStatus: "",
    invitedAt: "",
    segment: "",
  });
  const [blockedFilters, setBlockedFilters] = useState<Record<string, string>>({
    name: "",
    email: "",
    reason: "",
  });

  // Normalize the static seed members against EFC data so country/team/region
  // always come from the source PDFs.
  const normalizedStatic = useMemo(
    () =>
      members.map((m) => {
        const norm = normalizeMember(m.country, m.team);
        return { ...m, country: norm.country, region: norm.region, team: norm.team, flag: getFlag(norm.country) };
      }),
    [members],
  );

  const allMembers = useMemo(() => [...normalizedStatic, ...authMembers], [normalizedStatic, authMembers]);

  // Filter options — Region/Country/Football Team show the FULL EFC list,
  // other dropdowns are derived from the visible members.
  const filterOptions = {
    region: [...EFC_REGIONS].sort(),
    discipline: [...new Set(allMembers.map((m) => m.discipline))].sort(),
    country: [...EFC_COUNTRY_NAMES].sort(),
    team: [...EFC_CLUB_NAMES].sort(),
    title: [...new Set(allMembers.map((m) => m.title).filter(Boolean))].sort(),
    format: [...new Set(allMembers.map((m) => m.format))].sort(),
    role: [...new Set(allMembers.map((m) => m.role))].sort(),
    emailMarketing: ["Subscribed", "Unsubscribed"],
  };

  const invitedFilterOptions = {
    name: [...new Set(invited.map((m) => m.name))].sort(),
    email: [...new Set(invited.map((m) => m.email))].sort(),
    tag: ["VIP", "Speaker", "Sponsor", "Early Access"],
    invitationStatus: ["Pending", "Accepted", "Expired", "—"],
    invitedAt: [...new Set(invited.map((m) => m.invitedAt).filter((d) => d !== "—"))].sort(),
    segment: ["All Members", "New Invites", "Follow-up Needed"],
  };

  const blockedFilterOptions = {
    name: [...new Set(blocked.map((m) => m.name))].sort(),
    email: [...new Set(blocked.map((m) => m.email))].sort(),
    reason: [...new Set(blocked.map((m) => m.reason))].sort(),
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = () =>
    setFilters({ region: "", discipline: "", country: "", team: "", title: "", format: "", role: "", emailMarketing: "" });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({ title: "Missing fields", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    if (activeTab === "invited") {
      const inv = {
        name: newMember.name,
        email: newMember.email,
        subscribed: true,
        invitationStatus: "—",
        role: "Invited",
        dateAdded: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        invitedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      };
      setInvited((prev) => [inv, ...prev]);
      setNewMember({ name: "", email: "", country: "", role: "Member" });
      setAddMemberOpen(false);
      toast({ title: "Invited", description: `${inv.name} has been invited to the community.` });
    } else {
      const member = {
        ...newMember,
        position: "",
        title: "",
        region: "Unknown",
        discipline: "General",
        format: "Full-time",
        mpu: Math.floor(Math.random() * 400 + 600),
        joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        flag: "🏳️",
        followers: Math.floor(Math.random() * 200),
        following: Math.floor(Math.random() * 100),
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        subscribed: Math.random() > 0.5,
        team: "Unassigned",
      };
      setMembers((prev) => [member, ...prev]);
      setNewMember({ name: "", email: "", country: "", role: "Member" });
      setAddMemberOpen(false);
      toast({ title: "Member added", description: `${member.name} has been added to the community.` });
    }
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Country", "MPU", "Email Marketing", "Role", "Joined"].join(","),
      ...allMembers.map((m) =>
        [m.name, m.email, m.country, m.mpu, m.subscribed ? "Subscribed" : "Unsubscribed", m.role, m.joined].join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "community-members.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Member data has been downloaded as CSV." });
  };

  const handleBulkDelete = () => {
    if (selectedMembers.length === 0) {
      toast({ title: "No selection", description: "Select members first using checkboxes.", variant: "destructive" });
      return;
    }
    setMembers((prev) => prev.filter((_, i) => !selectedMembers.includes(i)));
    toast({ title: "Removed", description: `${selectedMembers.length} member(s) removed.` });
    setSelectedMembers([]);
  };

  const handleBulkRoleChange = (role: string) => {
    if (selectedMembers.length === 0) {
      toast({ title: "No selection", description: "Select members first using checkboxes.", variant: "destructive" });
      return;
    }
    setMembers((prev) => prev.map((m, i) => (selectedMembers.includes(i) ? { ...m, role } : m)));
    toast({ title: "Role updated", description: `${selectedMembers.length} member(s) set to ${role}.` });
    setSelectedMembers([]);
  };

  const toggleSelect = (idx: number) => {
    setSelectedMembers((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  const toggleSelectAll = () => {
    if (selectedMembers.length === allMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(allMembers.map((_, i) => i));
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const preFilteredMembers =
    activeTab === "all"
      ? allMembers
      : activeTab === "contacts"
        ? allMembers.slice(0, allMembers.length - 1)
        : activeTab === "members"
          ? allMembers.filter((m) => m.role === "Member")
          : activeTab === "admins"
            ? allMembers.filter((m) => m.role === "Admin")
            : activeTab === "moderators"
              ? allMembers.filter((m) => m.role === "Moderator")
              : allMembers;

  const query = searchQuery.toLowerCase().trim();
  const filteredMembers = preFilteredMembers.filter((m) => {
    if (query && !m.name.toLowerCase().includes(query) && !m.email.toLowerCase().includes(query)) return false;
    if (filters.region && m.region !== filters.region) return false;
    if (filters.discipline && m.discipline !== filters.discipline) return false;
    if (filters.country && m.country !== filters.country) return false;
    if (filters.team && m.team !== filters.team) return false;
    if (filters.title && m.title !== filters.title) return false;
    if (filters.format && m.format !== filters.format) return false;
    if (filters.role && m.role !== filters.role) return false;
    if (filters.emailMarketing) {
      const isSub = filters.emailMarketing === "Subscribed";
      if (m.subscribed !== isSub) return false;
    }
    return true;
  });

  const filteredInvited = invited.filter((m) => {
    if (query && !m.name.toLowerCase().includes(query) && !m.email.toLowerCase().includes(query)) return false;
    if (invitedFilters.name && m.name !== invitedFilters.name) return false;
    if (invitedFilters.email && m.email !== invitedFilters.email) return false;
    if (invitedFilters.invitationStatus && m.invitationStatus !== invitedFilters.invitationStatus) return false;
    if (invitedFilters.invitedAt && m.invitedAt !== invitedFilters.invitedAt) return false;
    return true;
  });

  const filteredBlocked = blocked.filter((m) => {
    if (query && !m.name.toLowerCase().includes(query) && !m.email.toLowerCase().includes(query)) return false;
    if (blockedFilters.name && m.name !== blockedFilters.name) return false;
    if (blockedFilters.email && m.email !== blockedFilters.email) return false;
    if (blockedFilters.reason && m.reason !== blockedFilters.reason) return false;
    return true;
  });

  const isInvitedTab = activeTab === "invited";
  const isBlockedTab = activeTab === "blocked";

  const allTabs: { key: ActiveTab; label: string; count: number; isNew?: boolean; adminOnly?: boolean }[] = [
    { key: "all", label: "All", count: allMembers.length },
    { key: "contacts", label: "Contacts", count: allMembers.length - 1, isNew: true },
    { key: "members", label: "Members", count: allMembers.filter((m) => m.role === "Member").length },
    { key: "invited", label: "Invited", count: invited.length, adminOnly: true },
    { key: "admins", label: "Admins", count: allMembers.filter((m) => m.role === "Admin").length, adminOnly: true },
    {
      key: "moderators",
      label: "Moderators",
      count: allMembers.filter((m) => m.role === "Moderator").length,
      adminOnly: true,
    },
    { key: "blocked", label: "Blocked", count: blocked.length, adminOnly: true },
  ];
  const tabs = allTabs.filter((t) => !t.adminOnly || isAdmin);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex gap-0 -m-6">
      {/* Community Sidebar - admin only */}
      {isAdmin && (
        <div className="hidden md:flex w-48 shrink-0 flex-col border-r border-border bg-card p-3 space-y-0.5 min-h-[calc(100vh-3.5rem)]">
          {communitySidebar.map((sideItem) => (
            <button
              key={sideItem.label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm w-full text-left transition-colors",
                sideItem.active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted",
              )}
            >
              <sideItem.icon className="h-4 w-4" />
              {sideItem.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-5">
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">{isAdmin ? "Manage audience" : "Member Directory"}</h1>
          {isAdmin && (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50 bg-popover border border-border shadow-lg">
                  <DropdownMenuItem onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" /> Export all
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setMembers(initialMembers);
                      toast({ title: "Reset", description: "Member list restored to defaults." });
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Reset list
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => setAddMemberOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                Invite
              </button>
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <motion.div variants={item} className="flex items-center gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedMembers([]);
                setSearchQuery("");
              }}
              className={cn(
                "relative px-3 py-2.5 text-sm font-medium transition-colors",
                activeTab === tab.key ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                <span className={cn("text-xs", activeTab === tab.key ? "text-foreground" : "text-muted-foreground")}>
                  {tab.count}
                </span>
                {tab.isNew && (
                  <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground uppercase">
                    New
                  </span>
                )}
              </span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Search bar + Filters */}
        <motion.div variants={item} className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === "invited" ? "invited" : activeTab === "blocked" ? "blocked" : "members"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>

          {/* Filter dropdowns - only for member tabs */}
          {!isInvitedTab && !isBlockedTab && (
            <div className="flex items-center gap-2 flex-wrap">
              {([
                { key: "region", label: "Region", options: filterOptions.region },
                { key: "discipline", label: "Discipline", options: filterOptions.discipline },
                { key: "country", label: "Country", options: filterOptions.country },
                { key: "team", label: "Football Team", options: filterOptions.team },
                { key: "title", label: "Title", options: filterOptions.title },
                { key: "format", label: "Format", options: filterOptions.format },
                { key: "role", label: "Role", options: filterOptions.role },
                { key: "emailMarketing", label: "Email Marketing", options: filterOptions.emailMarketing },
              ] as const).map((filter) => (
                <DropdownMenu key={filter.key}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                        filters[filter.key]
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {filters[filter.key] || `+ ${filter.label}`}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="z-50 bg-popover border border-border shadow-lg max-h-64 overflow-y-auto">
                    {filters[filter.key] && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setFilters((prev) => ({ ...prev, [filter.key]: "" }))}
                          className="text-destructive focus:text-destructive"
                        >
                          <X className="h-3.5 w-3.5 mr-2" /> Clear {filter.label}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {filter.options.map((opt) => (
                      <DropdownMenuItem
                        key={opt}
                        onClick={() => setFilters((prev) => ({ ...prev, [filter.key]: opt }))}
                        className={cn(filters[filter.key] === opt && "bg-primary/10 text-primary font-medium")}
                      >
                        {opt}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <X className="h-3 w-3" /> Clear all ({activeFilterCount})
                </button>
              )}
            </div>
          )}

          {/* Invited filters */}
          {isInvitedTab && (
            <div className="flex items-center gap-2 flex-wrap">
              {([
                { key: "name", label: "Name", options: invitedFilterOptions.name },
                { key: "email", label: "Email", options: invitedFilterOptions.email },
                { key: "tag", label: "Tag", options: invitedFilterOptions.tag },
                { key: "invitationStatus", label: "Invitation status", options: invitedFilterOptions.invitationStatus },
                { key: "invitedAt", label: "Invited at", options: invitedFilterOptions.invitedAt },
                { key: "segment", label: "Segment", options: invitedFilterOptions.segment },
              ] as const).map((filter) => (
                <DropdownMenu key={filter.key}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                        invitedFilters[filter.key]
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {invitedFilters[filter.key] || `+ ${filter.label}`}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="z-50 bg-popover border border-border shadow-lg max-h-64 overflow-y-auto">
                    {invitedFilters[filter.key] && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setInvitedFilters((prev) => ({ ...prev, [filter.key]: "" }))}
                          className="text-destructive focus:text-destructive"
                        >
                          <X className="h-3.5 w-3.5 mr-2" /> Clear {filter.label}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {filter.options.map((opt) => (
                      <DropdownMenuItem
                        key={opt}
                        onClick={() => setInvitedFilters((prev) => ({ ...prev, [filter.key]: opt }))}
                        className={cn(invitedFilters[filter.key] === opt && "bg-primary/10 text-primary font-medium")}
                      >
                        {opt}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
              {Object.values(invitedFilters).filter(Boolean).length > 0 && (
                <button
                  onClick={() => setInvitedFilters({ name: "", email: "", tag: "", invitationStatus: "", invitedAt: "", segment: "" })}
                  className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <X className="h-3 w-3" /> Clear all ({Object.values(invitedFilters).filter(Boolean).length})
                </button>
              )}
            </div>
          )}

          {/* Blocked filters */}
          {isBlockedTab && (
            <div className="flex items-center gap-2 flex-wrap">
              {([
                { key: "name", label: "Name", options: blockedFilterOptions.name },
                { key: "email", label: "Email", options: blockedFilterOptions.email },
                { key: "reason", label: "Reason", options: blockedFilterOptions.reason },
              ] as const).map((filter) => (
                <DropdownMenu key={filter.key}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                        blockedFilters[filter.key]
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {blockedFilters[filter.key] || `+ ${filter.label}`}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="z-50 bg-popover border border-border shadow-lg max-h-64 overflow-y-auto">
                    {blockedFilters[filter.key] && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setBlockedFilters((prev) => ({ ...prev, [filter.key]: "" }))}
                          className="text-destructive focus:text-destructive"
                        >
                          <X className="h-3.5 w-3.5 mr-2" /> Clear {filter.label}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {filter.options.map((opt) => (
                      <DropdownMenuItem
                        key={opt}
                        onClick={() => setBlockedFilters((prev) => ({ ...prev, [filter.key]: opt }))}
                        className={cn(blockedFilters[filter.key] === opt && "bg-primary/10 text-primary font-medium")}
                      >
                        {opt}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
              {Object.values(blockedFilters).filter(Boolean).length > 0 && (
                <button
                  onClick={() => setBlockedFilters({ name: "", email: "", reason: "" })}
                  className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <X className="h-3 w-3" /> Clear all ({Object.values(blockedFilters).filter(Boolean).length})
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* Invited Tab Content */}
        {isInvitedTab ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Info banner */}
            {showInviteBanner && (
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Your pending invites are displayed here</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    This tab shows you a list of members you've invited who have yet to sign up to your community.{" "}
                    <button className="text-primary hover:underline">Learn more</button>
                  </p>
                </div>
                <button
                  onClick={() => setShowInviteBanner(false)}
                  className="text-muted-foreground hover:text-foreground shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Invited count + More */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">{filteredInvited.length} invited</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
                    More <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="z-50 bg-popover border border-border shadow-lg">
                  <DropdownMenuItem onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" /> Export invited
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Invited table */}
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email Marketing
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Invitation Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date Added ↓
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Invited At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredInvited.map((inv, i) => (
                    <tr key={i} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-foreground">{inv.name}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {inv.subscribed ? "Subscribed" : "Unsubscribed"}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{inv.email}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{inv.invitationStatus}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{inv.role}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{inv.dateAdded}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{inv.invitedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : isBlockedTab ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">{filteredBlocked.length} blocked</span>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Blocked At
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredBlocked.map((b, i) => (
                    <tr key={i} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium text-foreground">{b.name}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{b.email}</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-[10px] font-semibold text-destructive">
                          {b.reason}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{b.blockedAt}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => {
                            setBlocked((prev) => prev.filter((_, idx) => idx !== i));
                            toast({ title: "Unblocked", description: `${b.name} has been unblocked.` });
                          }}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Action bar */}
            <motion.div variants={item} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{filteredMembers.length} people</span>
                <button
                  onClick={() => toast({ title: "Segment saved", description: "Current view saved as a segment." })}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Save segment
                </button>

                {/* Bulk Actions dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      Bulk actions <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="z-50 bg-popover border border-border shadow-lg">
                    <DropdownMenuItem onClick={() => handleBulkRoleChange("Admin")}>
                      <Shield className="h-4 w-4 mr-2" /> Set as Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkRoleChange("Moderator")}>
                      <Shield className="h-4 w-4 mr-2" /> Set as Moderator
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkRoleChange("Member")}>
                      <User className="h-4 w-4 mr-2" /> Set as Member
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleBulkDelete} className="text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Remove selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* More dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      More <ChevronDown className="h-3 w-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="z-50 bg-popover border border-border shadow-lg">
                    <DropdownMenuItem
                      onClick={() =>
                        toast({ title: "Message sent", description: "Bulk message sent to all selected members." })
                      }
                    >
                      <MessageCircle className="h-4 w-4 mr-2" /> Send message
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        toast({ title: "Tags applied", description: "Tags have been applied to selected members." })
                      }
                    >
                      <Tag className="h-4 w-4 mr-2" /> Apply tags
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        toast({ title: "Suspended", description: "Selected members have been suspended." })
                      }
                      className="text-destructive focus:text-destructive"
                    >
                      <Ban className="h-4 w-4 mr-2" /> Suspend
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button
                  onClick={() => setAddMemberOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Invite member
                </button>
              </div>
            </motion.div>

            {selectedMembers.length > 0 && (
              <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-xs text-primary font-medium">
                {selectedMembers.length} member(s) selected
                <button onClick={() => setSelectedMembers([])} className="ml-auto hover:text-primary/70">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Members - List / Grid View */}
            <AnimatePresence mode="wait">
              {isAdmin ? (
                <motion.div
                  key="list"
                  variants={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-4 py-2.5 text-left">
                          <input
                            type="checkbox"
                            checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                            onChange={toggleSelectAll}
                            className="rounded border-border"
                          />
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">NAME</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">TITLE</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">FOOTBALL TEAM</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                          EMAIL MARKETING
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">EMAIL</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">COUNTRY</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">MPU Points</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">ROLE</th>
                        <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">JOINED</th>
                        <th className="px-4 py-2.5"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredMembers.map((m, i) => (
                        <tr
                          key={i}
                          className={cn(
                            "hover:bg-muted/20 transition-colors",
                            selectedMembers.includes(i) && "bg-primary/5",
                          )}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(i)}
                              onChange={() => toggleSelect(i)}
                              className="rounded border-border"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm font-medium text-foreground">{m.name}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{m.title || "—"}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              {getTeamLogo(m.team) && (
                                <img src={getTeamLogo(m.team)} alt={m.team} className="h-4 w-4 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getTeamLogoFallback(m.team); }} />
                              )}
                              <span className="text-sm text-muted-foreground">{m.team}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setMembers((prev) =>
                                  prev.map((member, idx) =>
                                    idx === i ? { ...member, subscribed: !member.subscribed } : member,
                                  ),
                                );
                                toast({
                                  title: m.subscribed ? "Unsubscribed" : "Subscribed",
                                  description: `${m.name} has been ${m.subscribed ? "unsubscribed from" : "subscribed to"} email marketing.`,
                                });
                              }}
                              className={cn(
                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer",
                                m.subscribed
                                  ? "bg-success/20 text-success hover:bg-success/30"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80",
                              )}
                            >
                              {m.subscribed ? "Subscribed" : "Unsubscribed"}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{m.email}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{m.country}</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold",
                                mpuColor(m.mpu),
                              )}
                            >
                              {m.mpu}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{m.role}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{m.joined}</td>
                          <td className="px-4 py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="text-muted-foreground hover:text-foreground">
                                  <MoreHorizontal className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="z-50 bg-popover border border-border shadow-lg"
                              >
                                <DropdownMenuItem
                                  onClick={() => navigate(`/member/${nameToSlug(m.name)}`)}
                                >
                                  <User className="h-4 w-4 mr-2" /> View profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => navigate("/chat")}
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" /> Send message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setMembers((prev) => prev.filter((_, idx) => idx !== i));
                                    toast({ title: "Removed", description: `${m.name} has been removed.` });
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredMembers.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      className="group relative rounded-xl border border-border bg-card p-5 flex flex-col items-center text-center hover:shadow-md hover:border-primary/20 transition-all duration-300"
                    >
                      {/* Three dot menu on card */}
                      <div className="absolute top-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="z-50 bg-popover border border-border shadow-lg">
                            <DropdownMenuItem
                              onClick={() => navigate(`/member/${nameToSlug(m.name)}`)}
                            >
                              <User className="h-4 w-4 mr-2" /> View profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => navigate("/chat")}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" /> Send message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setMembers((prev) => prev.filter((_, idx) => idx !== i));
                                toast({ title: "Removed", description: `${m.name} has been removed.` });
                              }}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-16 w-16 mb-3 ring-2 ring-border">
                        <AvatarImage src={m.avatar} alt={m.name} />
                        <AvatarFallback
                          className={cn(
                            "text-lg font-semibold text-primary-foreground",
                            avatarColors[i % avatarColors.length],
                          )}
                        >
                          {getInitials(m.name)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Name & Role */}
                      <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {m.role} · {m.position || m.country}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        {getTeamLogo(m.team) && (
                          <img src={getTeamLogo(m.team)} alt={m.team} className="h-4 w-4 object-contain" onError={(e) => { (e.currentTarget as HTMLImageElement).src = getTeamLogoFallback(m.team); }} />
                        )}
                        <p className="text-xs text-primary font-medium">{m.team}</p>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {m.country}
                      </div>

                      {/* Follow counts */}
                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <div>
                          <span className="font-semibold text-foreground">{m.followers}</span>
                          <span className="text-muted-foreground ml-1">Followers</span>
                        </div>
                        <div className="w-px h-3 bg-border" />
                        <div>
                          <span className="font-semibold text-foreground">{m.following}</span>
                          <span className="text-muted-foreground ml-1">Following</span>
                        </div>
                      </div>

                      {/* Follow + Message buttons */}
                      <div className="mt-4 w-full flex items-center gap-2">
                        <button
                          onClick={() => {
                            setFollowedMembers((prev) => {
                              const next = new Set(prev);
                              if (next.has(m.name)) {
                                next.delete(m.name);
                                toast({ title: "Unfollowed", description: `You unfollowed ${m.name}.` });
                              } else {
                                next.add(m.name);
                                toast({ title: "Followed", description: `You are now following ${m.name}.` });
                              }
                              return next;
                            });
                          }}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors",
                            followedMembers.has(m.name)
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border border-border text-foreground hover:bg-muted",
                          )}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          {followedMembers.has(m.name) ? "Unfollow" : "Follow"}
                        </button>
                        <button
                          onClick={() => navigate("/chat")}
                          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Message
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite new member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input
                placeholder="Full name"
                value={newMember.name}
                onChange={(e) => setNewMember((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={newMember.email}
                onChange={(e) => setNewMember((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            {!isInvitedTab && (
              <>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    placeholder="Country"
                    value={newMember.country}
                    onChange={(e) => setNewMember((p) => ({ ...p, country: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={newMember.role} onValueChange={(v) => setNewMember((p) => ({ ...p, role: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-popover border border-border">
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
