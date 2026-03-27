import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Settings, ChevronDown, MoreHorizontal, Globe, Users, Link2, Tag, User, BarChart3, Mail, Shield, Download, Trash2, UserPlus, Ban, RefreshCw, X, MessageCircle, LayoutGrid, List, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const communitySidebar = [
  { label: "Audience", icon: Users },
  { label: "Manage audience", icon: Users, active: true },
  { label: "Segments", icon: BarChart3 },
  { label: "Invite links", icon: Link2 },
  { label: "Tags", icon: Tag },
  { label: "Profile fields", icon: User },
  { label: "Bulk logs", icon: BarChart3 },
];

const initialMembers = [
  { name: "Kwame Adebayo", email: "adebayo@gmail.com", team: "AFC Ajax", country: "Netherlands", score: 9.2, role: "Member", joined: "Apr 12, 2024", flag: "🇳🇱", followers: 142, following: 89 },
  { name: "Robert Fox", email: "robertfox@gmail.com", team: "AC Milan", country: "Italy", score: 9.4, role: "Member", joined: "Mar 5, 2024", flag: "🇮🇹", followers: 230, following: 115 },
  { name: "Mei Wong", email: "meiwong@gmail.com", team: "Juventus FC", country: "Italy", score: 8.0, role: "Member", joined: "Jun 22, 2024", flag: "🇮🇹", followers: 67, following: 43 },
  { name: "Dianne Russell", email: "drussell@yahoo.com", team: "S.C. Braga", country: "Portugal", score: 9.2, role: "Moderator", joined: "Mar 9, 2023", flag: "🇵🇹", followers: 312, following: 178 },
  { name: "Kristin Watson", email: "kristin@watson.com", team: "FC Porto", country: "Portugal", score: 9.2, role: "Admin", joined: "Sep 19, 2022", flag: "🇵🇹", followers: 456, following: 201 },
  { name: "Carlos Ramirez", email: "ramirez@yahoo.com", team: "Chelsea F.C.", country: "England", score: 6.7, role: "Member", joined: "Jul 8, 2024", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", followers: 34, following: 22 },
  { name: "Ravi Patel", email: "ravi@email.com", team: "Manchester City", country: "United Kingdom", score: 9.2, role: "Moderator", joined: "Dec 1, 2023", flag: "🇬🇧", followers: 189, following: 97 },
];

const avatarColors = [
  "bg-primary/80", "bg-accent/80", "bg-destructive/40", "bg-secondary", "bg-muted-foreground/30", "bg-primary/50", "bg-accent/50",
];

const scoreColor = (score: number) => {
  if (score >= 9) return "bg-success text-success-foreground";
  if (score >= 7) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function CommunityPage() {
  const { toast } = useToast();
  const [members, setMembers] = useState(initialMembers);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [newMember, setNewMember] = useState({ name: "", email: "", team: "", country: "", role: "Member" });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({ title: "Missing fields", description: "Name and email are required.", variant: "destructive" });
      return;
    }
    const member = {
      ...newMember,
      score: parseFloat((Math.random() * 4 + 6).toFixed(1)),
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      flag: "🏳️",
      followers: Math.floor(Math.random() * 200),
      following: Math.floor(Math.random() * 100),
    };
    setMembers((prev) => [member, ...prev]);
    setNewMember({ name: "", email: "", team: "", country: "", role: "Member" });
    setAddMemberOpen(false);
    toast({ title: "Member added", description: `${member.name} has been added to the community.` });
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Team", "Country", "Score", "Role", "Joined"].join(","),
      ...members.map((m) => [m.name, m.email, m.team, m.country, m.score, m.role, m.joined].join(",")),
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
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((_, i) => i));
    }
  };

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex gap-0 -m-6">
      {/* Community Sidebar */}
      <div className="hidden md:flex w-48 shrink-0 flex-col border-r border-border bg-card p-3 space-y-0.5 min-h-[calc(100vh-3.5rem)]">
        {communitySidebar.map((sideItem) => (
          <button
            key={sideItem.label}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm w-full text-left transition-colors",
              sideItem.active ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
            )}
          >
            <sideItem.icon className="h-4 w-4" />
            {sideItem.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-5">
        <motion.div variants={item} className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Manage audience</h1>
          <div className="flex items-center gap-3">
            {/* View toggle */}
            <div className="flex items-center rounded-lg border border-border bg-muted/30 p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                  viewMode === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="h-3.5 w-3.5" />
                List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                  viewMode === "grid" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Cards
              </button>
            </div>

            {/* More (header) dropdown */}
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
                <DropdownMenuItem onClick={() => { setMembers(initialMembers); toast({ title: "Reset", description: "Member list restored to defaults." }); }}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset list
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => setAddMemberOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Add
            </button>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div variants={item} className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="text-foreground font-medium">All {members.length}</span>
          <span>Contacts {members.length - 1}</span>
          <span>Members {members.filter((m) => m.role === "Member").length}</span>
          <span>Admins {members.filter((m) => m.role === "Admin").length}</span>
          <span>Moderators {members.filter((m) => m.role === "Moderator").length}</span>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item} className="flex items-center gap-2 flex-wrap">
          {["+ Name", "+ Email marketing", "+ Member", "+ Source", "+ Data added"].map((f) => (
            <button key={f} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
              {f}
            </button>
          ))}
          <button className="text-xs text-muted-foreground hover:text-foreground">+ Add filter</button>
        </motion.div>

        {/* Action bar */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">{members.length} people</span>
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
                <DropdownMenuItem onClick={() => toast({ title: "Message sent", description: "Bulk message sent to all selected members." })}>
                  <MessageCircle className="h-4 w-4 mr-2" /> Send message
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Tags applied", description: "Tags have been applied to selected members." })}>
                  <Tag className="h-4 w-4 mr-2" /> Apply tags
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Suspended", description: "Selected members have been suspended." })} className="text-destructive focus:text-destructive">
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
              <Plus className="h-3.5 w-3.5" /> Add member
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

        {/* Members - List View */}
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
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
                        checked={selectedMembers.length === members.length && members.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-border"
                      />
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">NAME</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">TEAM</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">COUNTRY</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">SCORE</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">ROLE</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">JOINED</th>
                    <th className="px-4 py-2.5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {members.map((m, i) => (
                    <tr key={i} className={cn("hover:bg-muted/20 transition-colors", selectedMembers.includes(i) && "bg-primary/5")}>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(i)}
                          onChange={() => toggleSelect(i)}
                          className="rounded border-border"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-foreground flex items-center gap-1.5">
                          {m.flag} {m.team}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{m.country}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold", scoreColor(m.score))}>
                          {m.score}
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
                          <DropdownMenuContent align="end" className="z-50 bg-popover border border-border shadow-lg">
                            <DropdownMenuItem onClick={() => toast({ title: "Profile", description: `Viewing ${m.name}'s profile.` })}>
                              <User className="h-4 w-4 mr-2" /> View profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast({ title: "Message", description: `Message sent to ${m.name}.` })}>
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
              {members.map((m, i) => (
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
                        <DropdownMenuItem onClick={() => toast({ title: "Profile", description: `Viewing ${m.name}'s profile.` })}>
                          <User className="h-4 w-4 mr-2" /> View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast({ title: "Message", description: `Message sent to ${m.name}.` })}>
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
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarFallback className={cn("text-lg font-semibold text-primary-foreground", avatarColors[i % avatarColors.length])}>
                      {getInitials(m.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name & Role */}
                  <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.role} · {m.team}</p>

                  {/* Location */}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
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

                  {/* Message button */}
                  <button
                    onClick={() => toast({ title: "Message", description: `Message sent to ${m.name}.` })}
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Message
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add new member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input placeholder="Full name" value={newMember.name} onChange={(e) => setNewMember((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" placeholder="email@example.com" value={newMember.email} onChange={(e) => setNewMember((p) => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Team</Label>
              <Input placeholder="Club name" value={newMember.team} onChange={(e) => setNewMember((p) => ({ ...p, team: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input placeholder="Country" value={newMember.country} onChange={(e) => setNewMember((p) => ({ ...p, country: e.target.value }))} />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMember}>Add member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}