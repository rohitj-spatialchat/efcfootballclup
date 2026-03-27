import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Users, Trophy, KeyRound, Server, ShieldCheck, History,
  AppWindow, UserCheck, Cpu, ShieldAlert,
} from "lucide-react";
import TeamTab from "@/components/settings/TeamTab";
import GamificationTab from "@/components/settings/GamificationTab";
import UserSafetyTab from "@/components/settings/UserSafetyTab";

const tabs = [
  { label: "Team", id: "team", icon: Users },
  { label: "Gamification", id: "gamification", icon: Trophy },
  { label: "User Safety", id: "safety", icon: ShieldAlert },
  { label: "Single sign-on (SSO)", id: "sso", icon: KeyRound },
  { label: "SCIM provisioning", id: "scim", icon: Server },
  { label: "Two-step authentication", id: "2fa", icon: ShieldCheck },
  { label: "Security history", id: "security", icon: History },
  { label: "Installed apps", id: "apps", icon: AppWindow },
  { label: "Access requests", id: "access", icon: UserCheck },
  { label: "MCP access", id: "mcp", icon: Cpu },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

function renderTabContent(activeTab: string) {
  switch (activeTab) {
    case "team":
      return <TeamTab />;
    case "gamification":
      return <GamificationTab />;
    case "safety":
      return <UserSafetyTab />;
    default:
      return (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">This section is coming soon.</p>
        </div>
      );
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex gap-6 min-h-[calc(100vh-120px)]">
      {/* Side Panel */}
      <motion.nav variants={item} className="w-56 shrink-0 space-y-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Settings</h2>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-colors text-left",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </motion.nav>

      {/* Content */}
      <motion.div variants={item} className="flex-1 min-w-0">
        {renderTabContent(activeTab)}
      </motion.div>
    </motion.div>
  );
}
