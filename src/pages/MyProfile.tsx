import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import profileAvatarDefault from "@/assets/profile-avatar.jpg";
import profileCoverDefault from "@/assets/profile-cover.jpg";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Flame, MapPin, Briefcase, Calendar, Link as LinkIcon, Mail,
  Edit3, Camera, Trophy, Star, Heart, MessageCircle, Users,
  Award, TrendingUp, BookOpen, Globe, Shield, Bell, Eye,
  Check, X, ExternalLink, Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } } };

const badges = [
  { label: "Early Adopter", icon: Star, color: "text-amber-500" },
  { label: "Top Contributor", icon: Trophy, color: "text-primary" },
  { label: "Community Leader", icon: Shield, color: "text-emerald-500" },
  { label: "Knowledge Sharer", icon: BookOpen, color: "text-violet-500" },
];

const stats = [
  { label: "Posts", value: 47, icon: MessageCircle },
  { label: "Connections", value: 238, icon: Users },
  { label: "Events Attended", value: 12, icon: Calendar },
  { label: "Contributions", value: 89, icon: TrendingUp },
];

const activities = [
  { id: 1, type: "post", text: "Shared a new article on sports analytics methodologies", time: "2 hours ago", likes: 14, comments: 3 },
  { id: 2, type: "event", text: "Attended 'Advanced Performance Analysis Workshop'", time: "1 day ago", likes: 8, comments: 1 },
  { id: 3, type: "comment", text: "Commented on 'The future of football analytics'", time: "2 days ago", likes: 5, comments: 0 },
  { id: 4, type: "achievement", text: "Earned the 'Knowledge Sharer' badge", time: "3 days ago", likes: 22, comments: 7 },
  { id: 5, type: "post", text: "Published research on player tracking data in elite football", time: "5 days ago", likes: 31, comments: 11 },
];

const interests = ["Football Analytics", "Performance Science", "Data Visualization", "Sports Medicine", "Biomechanics", "Nutrition", "Coaching", "Sport Psychology"];

type TabId = "activity" | "about" | "achievements" | "settings";

export default function MyProfile() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("activity");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Demo",
    username: "@demostudent16553",
    bio: "Passionate about sports science and performance analytics. Currently exploring the intersection of data science and athletic performance. Always looking to connect with like-minded professionals.",
    location: "London, UK",
    role: "Performance Analyst",
    organization: "EFC Football Club",
    website: "https://demo-portfolio.com",
    email: "demo@efcfootball.com",
    joinDate: "January 2025",
  });
  const [editForm, setEditForm] = useState(profile);
  const [notifications, setNotifications] = useState({ email: true, push: true, mentions: true, events: false });

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast({ title: "Profile updated", description: "Your changes have been saved." });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://efcfootballclup.lovable.app/profile/demostudent16553");
    toast({ title: "Link copied!", description: "Profile link copied to clipboard." });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-6">
      {/* Cover + Avatar */}
      <motion.div variants={item} className="relative">
        <div className="h-44 rounded-2xl bg-gradient-to-r from-primary via-blue-400 to-cyan-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <button className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors">
            <Camera className="h-4 w-4 text-foreground" />
          </button>
        </div>
        <div className="absolute -bottom-14 left-6 flex items-end gap-4">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
              <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">DE</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 right-1 bg-primary rounded-full p-1.5 shadow-md hover:bg-primary/90 transition-colors">
              <Camera className="h-3.5 w-3.5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={item} className="pt-10 px-1">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
              <Badge variant="secondary" className="gap-1 text-orange-500 bg-orange-50 border-orange-200">
                <Flame className="h-3.5 w-3.5" /> 800
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">{profile.username}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{profile.role}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{profile.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Joined {profile.joinDate}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1.5">
              <Copy className="h-3.5 w-3.5" /> Share
            </Button>
            <Button size="sm" onClick={() => { setEditForm(profile); setIsEditing(true); }} className="gap-1.5">
              <Edit3 className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          </div>
        </div>
        <p className="text-sm text-foreground/80 mt-3 max-w-2xl leading-relaxed">{profile.bio}</p>
        <div className="flex items-center gap-4 mt-3 text-sm">
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
              <LinkIcon className="h-3.5 w-3.5" />{profile.website.replace("https://", "")}
            </a>
          )}
          <span className="flex items-center gap-1 text-muted-foreground"><Mail className="h-3.5 w-3.5" />{profile.email}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center hover:shadow-md transition-shadow group cursor-default">
              <Icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Badges */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Award className="h-4 w-4 text-primary" />Badges & Achievements</h3>
        <div className="flex gap-3 flex-wrap">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-sm hover:bg-muted/60 transition-colors cursor-default">
                <Icon className={cn("h-4 w-4", b.color)} />
                <span className="text-foreground font-medium">{b.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
            {(["activity", "about", "achievements", "settings"] as TabId[]).map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className={cn(
                  "rounded-none border-b-2 border-transparent px-4 py-3 text-sm capitalize data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                )}
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === "activity" && <ActivityTab />}
          {activeTab === "about" && <AboutTab interests={interests} profile={profile} />}
          {activeTab === "achievements" && <AchievementsTab />}
          {activeTab === "settings" && <SettingsTab notifications={notifications} setNotifications={setNotifications} />}
        </motion.div>
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Edit Profile</h2>
                <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Bio</label>
                  <Textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Role</label>
                    <Input value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Location</label>
                    <Input value={editForm.location} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Organization</label>
                  <Input value={editForm.organization} onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Website</label>
                  <Input value={editForm.website} onChange={(e) => setEditForm({ ...editForm, website: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <Input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave} className="gap-1.5"><Check className="h-4 w-4" />Save Changes</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ActivityTab() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-3">
      {activities.map((a) => (
        <div key={a.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-foreground">{a.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
            </div>
            <Badge variant="outline" className="text-xs capitalize shrink-0 ml-2">{a.type}</Badge>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => setLiked(p => ({ ...p, [a.id]: !p[a.id] }))}
              className={cn("flex items-center gap-1 text-xs transition-colors", liked[a.id] ? "text-red-500" : "text-muted-foreground hover:text-red-500")}
            >
              <Heart className={cn("h-3.5 w-3.5", liked[a.id] && "fill-current")} />
              {a.likes + (liked[a.id] ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />{a.comments}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AboutTab({ interests, profile }: { interests: string[]; profile: { organization: string } }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Globe className="h-4 w-4 text-primary" />Interests</h3>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <Badge key={i} variant="secondary" className="rounded-full px-3 py-1">{i}</Badge>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />Experience</h3>
        <div className="space-y-4">
          {[
            { title: "Performance Analyst", org: profile.organization, period: "2024 – Present", desc: "Leading data-driven performance analysis for the first team." },
            { title: "Junior Analyst", org: "Sport Science Lab", period: "2022 – 2024", desc: "Conducted research on player biomechanics and injury prevention." },
          ].map((exp) => (
            <div key={exp.title} className="flex gap-3">
              <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{exp.title}</p>
                <p className="text-xs text-muted-foreground">{exp.org} · {exp.period}</p>
                <p className="text-xs text-foreground/70 mt-0.5">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementsTab() {
  const achievements = [
    { title: "First Post", desc: "Published your first community post", progress: 100, icon: MessageCircle },
    { title: "Networking Pro", desc: "Connect with 200+ members", progress: 100, icon: Users },
    { title: "Event Enthusiast", desc: "Attend 15 events", progress: 80, icon: Calendar },
    { title: "Top Contributor", desc: "Reach 100 contributions", progress: 89, icon: TrendingUp },
    { title: "Mentor", desc: "Help 10 new members get started", progress: 60, icon: Heart },
    { title: "Knowledge Base", desc: "Share 50 articles or resources", progress: 44, icon: BookOpen },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {achievements.map((a) => {
        const Icon = a.icon;
        const complete = a.progress === 100;
        return (
          <div key={a.title} className={cn("rounded-xl border bg-card p-4 transition-shadow hover:shadow-sm", complete ? "border-primary/30" : "border-border")}>
            <div className="flex items-start gap-3">
              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", complete ? "bg-primary/10" : "bg-muted")}>
                <Icon className={cn("h-5 w-5", complete ? "text-primary" : "text-muted-foreground")} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                  {complete && <Check className="h-4 w-4 text-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
                <div className="mt-2">
                  <Progress value={a.progress} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground mt-1">{a.progress}%</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SettingsTab({ notifications, setNotifications }: { notifications: Record<string, boolean>; setNotifications: React.Dispatch<React.SetStateAction<Record<string, boolean>>> }) {
  const { toast } = useToast();
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email notifications", desc: "Receive updates via email" },
            { key: "push", label: "Push notifications", desc: "Browser push notifications" },
            { key: "mentions", label: "Mention alerts", desc: "When someone mentions you" },
            { key: "events", label: "Event reminders", desc: "Upcoming event notifications" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch
                checked={notifications[n.key]}
                onCheckedChange={(v) => {
                  setNotifications((p) => ({ ...p, [n.key]: v }));
                  toast({ title: `${n.label} ${v ? "enabled" : "disabled"}` });
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><Eye className="h-4 w-4 text-primary" />Privacy</h3>
        <div className="space-y-4">
          {[
            { key: "profilePublic", label: "Public profile", desc: "Allow anyone to view your profile", default: true },
            { key: "showActivity", label: "Show activity", desc: "Display your recent activity publicly", default: true },
            { key: "showEmail", label: "Show email", desc: "Make your email visible to members", default: false },
          ].map((p) => (
            <div key={p.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <Switch defaultChecked={p.default} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
