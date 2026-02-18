import { motion } from "framer-motion";
import { Plus, Download, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Team", active: true },
  { label: "Single sign-on (SSO)" },
  { label: "SCIM provisioning" },
  { label: "Two-step authentication" },
  { label: "Security history" },
  { label: "Installed apps" },
  { label: "Access requests" },
  { label: "MCP access" },
];

const filterTabs = [
  { label: "All members", count: 12, active: true },
  { label: "Active members", count: 8 },
  { label: "Pending invites", count: 0 },
  { label: "Inactive members", count: 4 },
];

const sortOptions = [
  { label: "Roles", active: true },
  { label: "Status" },
  { label: "Name" },
  { label: "Email" },
];

const members = [
  { initials: "TG", name: "Tina Geizen", email: "tina@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 hours ago", color: "bg-violet-200 text-violet-700" },
  { initials: "SV", name: "Shanmukha V", email: "shanmukha.v@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "6 hours ago", color: "bg-yellow-200 text-yellow-700" },
  { initials: "RK", name: "Riddhik Kochhar", subtitle: "You", email: "riddhik.k@spatial.chat", role: "Super Administrator", auth: "Two-step", lastLogin: "4 days ago", color: "bg-violet-200 text-violet-700" },
  { initials: "OD", name: "Oleg Danylenko", subtitle: "Owner", email: "oleg@teemyco.com", role: "Super Administrator", extraRoles: "+ 1 others", auth: "Two-step", lastLogin: "4 days ago", color: "bg-violet-200 text-violet-700" },
  { initials: "AB", name: "Andre Borrelly", email: "ab@spatial.chat", role: "Super Administrator", extraRoles: "+ 1 others", auth: "Two-step", lastLogin: "2 weeks ago", color: "bg-green-200 text-green-700" },
  { initials: "JP", name: "James Park", email: "james.p@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 weeks ago", color: "bg-blue-200 text-blue-700" },
  { initials: "SK", name: "Saurav Kumar", email: "saurav.k@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "3 weeks ago", color: "bg-violet-200 text-violet-700" },
  { initials: "AD", name: "Anastasia Davis", email: "anastasia@spatial.chat", role: "Administrator", auth: "Two-step", lastLogin: "4 weeks ago", color: "bg-violet-200 text-violet-700" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function SettingsPage() {
  const [activeFilter, setActiveFilter] = useState("All members");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      {/* Tabs */}
      <motion.div variants={item} className="flex items-center gap-6 border-b border-border pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={cn(
              "pb-3 text-sm transition-colors whitespace-nowrap",
              tab.active
                ? "text-primary font-medium border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Filter tabs + Actions */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {filterTabs.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                activeFilter === f.label
                  ? "bg-primary/10 text-primary"
                  : "border border-border text-foreground hover:bg-muted"
              )}
            >
              {f.label} <span className="text-muted-foreground">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Plus className="h-3 w-3" /> Export
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-3 w-3" /> Add member
          </button>
        </div>
      </motion.div>

      {/* Sort pills */}
      <motion.div variants={item} className="flex items-center gap-2">
        {sortOptions.map((s) => (
          <button
            key={s.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors",
              s.active
                ? "bg-foreground text-background font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {s.label}
          </button>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left w-8"><input type="checkbox" className="rounded border-border" /></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Roles</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Auth</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Login</th>
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-4"><input type="checkbox" className="rounded border-border" /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold", m.color)}>
                      {m.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      {m.subtitle && <p className="text-xs text-muted-foreground">{m.subtitle}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{m.email}</td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-foreground">{m.role}</span>
                  {m.extraRoles && <span className="text-xs text-muted-foreground ml-1">{m.extraRoles}</span>}
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs font-medium text-success">{m.auth}</span>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{m.lastLogin}</td>
                <td className="px-4 py-4">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
