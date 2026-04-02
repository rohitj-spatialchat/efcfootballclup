import { motion } from "framer-motion";
import { Plus, Download, Users, FileText, Check, X, Pencil, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const stats = [
  { value: "846", label: "Total Registrations", change: "+24% this week", positive: true },
  { value: "78%", label: "Avg Conversion Rate", change: "+5% vs last month", positive: true },
  { value: "5", label: "Active Forms", change: "No change", positive: false },
  { value: "7.8", label: "Avg Fields per Form", change: "Optimal", positive: false },
];

const initialForms = [
  { name: "EFC MPU Annual Summit 2026", registered: 312, fields: 10, conversion: 81, status: "ACTIVE", updated: "Updated 2 hours ago" },
  { name: "Sports Science Masterclass", registered: 189, fields: 6, conversion: 72, status: "ACTIVE", updated: "Updated 1 day ago" },
  { name: "Injury Prevention Workshop", registered: 245, fields: 8, conversion: 68, status: "ACTIVE", updated: "Updated 3 hours ago" },
  { name: "Nutrition & Performance Seminar", registered: 156, fields: 7, conversion: 74, status: "ACTIVE", updated: "Updated 5 hours ago" },
  { name: "Speed Networking Session", registered: 0, fields: 5, conversion: 0, status: "DRAFT", updated: "Updated 5 days ago" },
];

const sampleResponses = [
  { name: "Sarah Johnson", email: "sarah.j@eurofootball.com", type: "VIP", submitted: "2 hours ago" },
  { name: "Michael Chen", email: "m.chen@sportsci.io", type: "General", submitted: "5 hours ago" },
  { name: "Emily Rodriguez", email: "emily.r@physiolab.com", type: "Sponsor", submitted: "8 hours ago" },
  { name: "David Kim", email: "david.kim@athleteperf.com", type: "General", submitted: "1 day ago" },
  { name: "Lisa Anderson", email: "l.anderson@nutrition.net", type: "VIP", submitted: "1 day ago" },
];

const recentRegistrations = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah.j@eurofootball.com", event: "EFC MPU Annual Summit 2026", type: "VIP", time: "5 minutes ago", color: "bg-primary" },
  { initials: "MC", name: "Michael Chen", email: "m.chen@sportsci.io", event: "Injury Prevention Workshop", type: "GENERAL", time: "12 minutes ago", color: "bg-purple-500" },
  { initials: "ER", name: "Emily Rodriguez", email: "emily.r@physiolab.com", event: "EFC MPU Annual Summit 2026", type: "SPONSOR", time: "18 minutes ago", color: "bg-primary" },
  { initials: "DK", name: "David Kim", email: "david.kim@athleteperf.com", event: "Sports Science Masterclass", type: "GENERAL", time: "25 minutes ago", color: "bg-purple-500" },
  { initials: "LA", name: "Lisa Anderson", email: "l.anderson@nutrition.net", event: "Nutrition & Performance Seminar", type: "VIP", time: "32 minutes ago", color: "bg-primary" },
];

const typeColors: Record<string, string> = {
  VIP: "text-destructive",
  GENERAL: "text-primary",
  SPONSOR: "text-purple-600",
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EventRegistration() {
  const { toast } = useToast();
  const [forms, setForms] = useState(initialForms);

  // Create Form
  const [createOpen, setCreateOpen] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [newFormFields, setNewFormFields] = useState("5");

  // Edit Form
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editFormName, setEditFormName] = useState("");
  const [editFormFields, setEditFormFields] = useState("");
  const [editFormStatus, setEditFormStatus] = useState("");

  // View Responses
  const [responsesOpen, setResponsesOpen] = useState(false);
  const [responsesForm, setResponsesForm] = useState("");

  const handleCreateForm = () => {
    if (!newFormName.trim()) { toast({ title: "Form name required", variant: "destructive" }); return; }
    setForms([...forms, { name: newFormName, registered: 0, fields: parseInt(newFormFields) || 5, conversion: 0, status: "DRAFT", updated: "Just now" }]);
    toast({ title: "Form created", description: `"${newFormName}" has been created as a draft.` });
    setNewFormName(""); setNewFormFields("5"); setCreateOpen(false);
  };

  const handleEditForm = (idx: number) => {
    const f = forms[idx];
    setEditIdx(idx);
    setEditFormName(f.name);
    setEditFormFields(String(f.fields));
    setEditFormStatus(f.status);
    setEditOpen(true);
  };

  const saveEditForm = () => {
    if (editIdx === null) return;
    const updated = [...forms];
    updated[editIdx] = { ...updated[editIdx], name: editFormName, fields: parseInt(editFormFields) || updated[editIdx].fields, status: editFormStatus, updated: "Just now" };
    setForms(updated);
    setEditOpen(false);
    toast({ title: "Form updated", description: `"${editFormName}" has been saved.` });
  };

  const handleViewResponses = (formName: string) => {
    setResponsesForm(formName);
    setResponsesOpen(true);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center gap-3">
        <button onClick={() => toast({ title: "Exporting data...", description: "Registration data CSV will download shortly." })} className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <Download className="h-4 w-4" /> Export Data
        </button>
        <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Create Form
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5">
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            <p className={`text-xs mt-1 ${s.positive ? "text-primary" : "text-muted-foreground"}`}>{s.change}</p>
          </div>
        ))}
      </motion.div>

      <div className="flex gap-6">
        {/* Registration Forms */}
        <motion.div variants={item} className="flex-1 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Registration Forms</h2>
            <button onClick={() => toast({ title: "All forms", description: "Showing all registration forms." })} className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All</button>
          </div>
          <div className="divide-y divide-border">
            {forms.map((form, idx) => (
              <div key={form.name + idx} className="px-6 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{form.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {form.registered} registered</span>
                      <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> {form.fields} fields</span>
                      <span>{form.conversion}% conversion</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleEditForm(idx)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="h-3.5 w-3.5" /> Edit Form
                    </button>
                    <button onClick={() => handleViewResponses(form.name)} className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">
                      <Eye className="h-3.5 w-3.5" /> View Responses
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase tracking-wide ${form.status === "ACTIVE" ? "text-primary" : "text-muted-foreground"}`}>
                    {form.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{form.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Registrations */}
        <motion.div variants={item} className="hidden xl:block w-80 shrink-0 rounded-lg border border-border bg-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Registrations</h2>
          </div>
          <div className="divide-y divide-border">
            {recentRegistrations.map((r) => (
              <div key={r.name} className="px-5 py-4 flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <span className={`text-[10px] font-bold uppercase ${typeColors[r.type]}`}>{r.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{r.email}</p>
                  <p className="text-xs text-muted-foreground">{r.event}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{r.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Create Form Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Registration Form</DialogTitle>
            <DialogDescription>Set up a new registration form for your event.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Form Name</label>
              <input type="text" value={newFormName} onChange={e => setNewFormName(e.target.value)} placeholder="e.g. Annual Conference Registration" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Number of Fields</label>
              <input type="number" value={newFormFields} onChange={e => setNewFormFields(e.target.value)} min="1" max="20" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setCreateOpen(false)} className="flex-1 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleCreateForm} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Create Form</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Form Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Registration Form</DialogTitle>
            <DialogDescription>Update form details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Form Name</label>
              <input type="text" value={editFormName} onChange={e => setEditFormName(e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Fields</label>
                <input type="number" value={editFormFields} onChange={e => setEditFormFields(e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select value={editFormStatus} onChange={e => setEditFormStatus(e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option>ACTIVE</option><option>DRAFT</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditOpen(false)} className="flex-1 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={saveEditForm} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5">
                <Check className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Responses Dialog */}
      <Dialog open={responsesOpen} onOpenChange={setResponsesOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Responses — {responsesForm}</DialogTitle>
            <DialogDescription>{sampleResponses.length} total responses received.</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase">Name</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sampleResponses.map((r) => (
                  <tr key={r.email} className="hover:bg-muted/20">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{r.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.email}</td>
                    <td className="px-4 py-3"><span className={cn("text-xs font-bold uppercase", r.type === "VIP" ? "text-destructive" : r.type === "Sponsor" ? "text-purple-600" : "text-primary")}>{r.type}</span></td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.submitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end pt-2">
            <button onClick={() => { toast({ title: "Exporting responses", description: `Downloading CSV for "${responsesForm}"...` }); }} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
