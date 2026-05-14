import { motion } from "framer-motion";
import { getTeamLogo } from "@/lib/teamLogos";
import { Plus, Upload, Search, UserPlus, MoreVertical, Mic, Check, Trash2, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const stats = [
  { value: "6", label: "Total Attendees" },
  { value: "3", label: "Checked In" },
  { value: "3", label: "VIP Attendees" },
  { value: "69%", label: "Avg Engagement" },
];

const filters = ["All", "Checked In", "Registered", "VIP"];

const initialAttendees = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@eurofootball.com", role: "Head of Sports Science", team: "Bayern Munich", event: "EFC MPU Annual Summit 2026", status: "CHECKED IN", engagement: 92, tags: ["VIP", "Speaker"], color: "bg-primary" },
  { initials: "MC", name: "Michael Chen", email: "m.chen@sportsci.io", role: "Performance Analyst", team: "Bayern Munich", event: "Injury Prevention Workshop", status: "REGISTERED", engagement: 78, tags: ["Sponsor"], color: "bg-purple-500" },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@physiolab.com", role: "Lead Physiotherapist", team: "Real Madrid", event: "EFC MPU Annual Summit 2026", status: "CHECKED IN", engagement: 85, tags: ["VIP"], color: "bg-primary" },
  { initials: "DK", name: "David Kim", email: "david.kim@athleteperf.com", role: "S&C Coach", team: "Manchester City", event: "Sports Science Masterclass", status: "REGISTERED", engagement: 65, tags: [], color: "bg-purple-500" },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@nutrition.net", role: "Nutritionist", team: "Juventus", event: "Nutrition & Performance Seminar", status: "CHECKED IN", engagement: 94, tags: ["VIP", "Sponsor"], color: "bg-primary" },
  { initials: "JW", name: "James Wilson", email: "j.wilson@rehabcenter.com", role: "Rehabilitation Specialist", team: "Liverpool FC", event: "EFC MPU Annual Summit 2026", status: "INVITED", engagement: 0, tags: ["Speaker"], color: "bg-muted-foreground" },
];

const statusColors: Record<string, string> = {
  "CHECKED IN": "text-primary",
  "REGISTERED": "text-purple-600",
  "INVITED": "text-muted-foreground",
};

const engagementColor = (val: number) => {
  if (val >= 80) return "bg-primary";
  if (val >= 50) return "bg-amber-500";
  return "bg-muted-foreground";
};

const speakers = [
  { initials: "SJ", name: "Sarah Johnson", role: "Head of Sports Science", team: "Bayern Munich", topic: "Injury Prevention in Elite Football", session: "Main Stage", time: "10:00 AM", color: "bg-primary", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { initials: "MR", name: "Dr. Marco Rossi", role: "Sports Medicine Director", team: "AC Milan", topic: "Advances in ACL Rehabilitation", session: "Workshop Room A", time: "11:30 AM", color: "bg-amber-500", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { initials: "JW", name: "James Wilson", role: "Rehabilitation Specialist", team: "Liverpool FC", topic: "Return to Play Protocols", session: "Main Stage", time: "2:00 PM", color: "bg-muted-foreground", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face" },
  { initials: "LA", name: "Lisa Anderson", role: "Nutritionist", team: "Juventus", topic: "Nutrition for Recovery", session: "Workshop Room B", time: "3:30 PM", color: "bg-purple-500", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
];

const peopleTabs = ["Attendees", "Speakers"];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EventPeople() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Attendees");
  const [attendees, setAttendees] = useState(initialAttendees);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Add Attendee
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newTeam, setNewTeam] = useState("");
  const [newEvent, setNewEvent] = useState("EFC MPU Annual Summit 2026");
  const [newTag, setNewTag] = useState("");

  // Attendee actions menu
  const [actionIdx, setActionIdx] = useState<number | null>(null);

  const handleAddAttendee = () => {
    if (!newName.trim() || !newEmail.trim()) { toast({ title: "Name and email required", variant: "destructive" }); return; }
    const initials = newName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    const colors = ["bg-primary", "bg-purple-500", "bg-amber-500", "bg-emerald-500"];
    setAttendees([...attendees, {
      initials, name: newName, email: newEmail, role: newRole || "Attendee", team: newTeam || "—", event: newEvent, status: "REGISTERED", engagement: 0,
      tags: newTag ? [newTag] : [], color: colors[attendees.length % colors.length],
    }]);
    toast({ title: "Attendee added", description: `${newName} has been added.` });
    setNewName(""); setNewEmail(""); setNewRole(""); setNewTeam(""); setNewTag(""); setAddOpen(false);
  };

  const handleCheckIn = (idx: number) => {
    const updated = [...attendees];
    updated[idx] = { ...updated[idx], status: "CHECKED IN" };
    setAttendees(updated);
    toast({ title: "Checked in", description: `${attendees[idx].name} is now checked in.` });
    setActionIdx(null);
  };

  const handleRemove = (idx: number) => {
    const name = attendees[idx].name;
    setAttendees(attendees.filter((_, i) => i !== idx));
    toast({ title: "Attendee removed", description: `${name} has been removed.` });
    setActionIdx(null);
  };

  const handleSendEmail = (idx: number) => {
    toast({ title: "Email sent", description: `Reminder sent to ${attendees[idx].email}` });
    setActionIdx(null);
  };

  const filteredAttendees = attendees.filter(a => {
    const matchesSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.email.toLowerCase().includes(searchQuery.toLowerCase()) || a.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" ||
      (activeFilter === "Checked In" && a.status === "CHECKED IN") ||
      (activeFilter === "Registered" && a.status === "REGISTERED") ||
      (activeFilter === "VIP" && a.tags.includes("VIP"));
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Tabs */}
      <motion.div variants={item} className="flex items-center gap-1 border-b border-border">
        {peopleTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px", activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {tab}
          </button>
        ))}
      </motion.div>

      {activeTab === "Attendees" && (<>
        {/* Actions */}
        <motion.div variants={item} className="flex items-center gap-3">
          <button onClick={() => setAddOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Attendee
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: String(attendees.length), label: "Total Attendees" },
            { value: String(attendees.filter(a => a.status === "CHECKED IN").length), label: "Checked In" },
            { value: String(attendees.filter(a => a.tags.includes("VIP")).length), label: "VIP Attendees" },
            { value: attendees.length ? Math.round(attendees.reduce((s, a) => s + a.engagement, 0) / attendees.length) + "%" : "0%", label: "Avg Engagement" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-5 text-center">
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Search & Filters */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search by name, email, or role..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
          </div>
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} className={cn("rounded-full px-4 py-1.5 text-xs font-medium transition-colors", activeFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Attendee</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Football Team</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Engagement</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAttendees.map((a) => {
                const realIdx = attendees.indexOf(a);
                return (
                  <tr key={a.name + a.email} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{a.initials}</div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{a.name}</p>
                          <p className="text-xs text-muted-foreground">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{a.role}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{a.team}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{a.event}</td>
                    <td className="px-5 py-4">
                      <span className={cn("text-xs font-bold uppercase", statusColors[a.status] || "text-muted-foreground")}>{a.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className={`h-full rounded-full ${engagementColor(a.engagement)}`} style={{ width: `${a.engagement}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{a.engagement}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        {a.tags.length > 0 ? a.tags.map((tag) => (
                          <span key={tag} className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold uppercase", tag === "VIP" ? "bg-primary/10 text-primary" : tag === "Speaker" ? "bg-amber-500/10 text-amber-600" : "bg-purple-500/10 text-purple-600")}>{tag}</span>
                        )) : <span className="text-muted-foreground">—</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </>)}

      {activeTab === "Speakers" && (
        <>
          <motion.div variants={item} className="flex items-center gap-3">
            <button onClick={() => toast({ title: "Add Speaker", description: "Speaker invitation form coming soon!" })} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Add Speaker
            </button>
          </motion.div>
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {speakers.map((s) => (
              <div key={s.name} className="rounded-lg border border-border bg-card p-5 flex gap-4 hover:shadow-md transition-shadow">
                <img src={s.image} alt={s.name} className="h-16 w-16 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.name}</p>
                      <p className="text-xs text-primary font-medium flex items-center gap-1.5">
                        {getTeamLogo(s.team) && <img src={getTeamLogo(s.team)} alt={s.team} className="h-4 w-4 object-contain" />}
                        {s.team}
                      </p>
                      <p className="text-xs text-muted-foreground">{s.role}</p>
                    </div>
                    <button onClick={() => toast({ title: s.name, description: `Contact: ${s.name} — ${s.role} at ${s.team}` })} className="text-muted-foreground hover:text-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Mic className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <p className="text-xs text-foreground font-medium truncate">{s.topic}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-[10px] bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-medium">{s.session}</span>
                    <span className="text-[10px] text-muted-foreground">{s.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}

      {/* Add Attendee Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Attendee</DialogTitle>
            <DialogDescription>Add a new attendee to an event.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Full Name *</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="John Doe" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email *</label>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="john@example.com" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Role</label>
                <input type="text" value={newRole} onChange={e => setNewRole(e.target.value)} placeholder="e.g. Performance Analyst" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Team</label>
                <input type="text" value={newTeam} onChange={e => setNewTeam(e.target.value)} placeholder="e.g. FC Barcelona" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Event</label>
                <select value={newEvent} onChange={e => setNewEvent(e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option>EFC MPU Annual Summit 2026</option>
                  <option>Sports Science Masterclass</option>
                  <option>Injury Prevention Workshop</option>
                  <option>Nutrition & Performance Seminar</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Tag</label>
                <select value={newTag} onChange={e => setNewTag(e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option value="">None</option>
                  <option>VIP</option>
                  <option>Sponsor</option>
                  <option>Speaker</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setAddOpen(false)} className="flex-1 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleAddAttendee} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5">
                <Plus className="h-4 w-4" /> Add Attendee
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
