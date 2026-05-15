import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Users, Trophy, UserPlus, Mail, CreditCard, Hash, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import Community from "./Community";
import Leaderboard from "./Leaderboard";
import InviteSection from "@/components/community-members/InviteSection";
import BulkMailSection from "@/components/community-members/BulkMailSection";
import SubscriptionsSection from "@/components/community-members/SubscriptionsSection";
import TopicsSection from "@/components/community-members/TopicsSection";
import PushNotificationSection from "@/components/community-members/PushNotificationSection";

const sections = [
  { id: "members", label: "Members", icon: Users },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "invite", label: "Invite", icon: UserPlus },
  { id: "bulkmail", label: "Send Bulk Mail", icon: Mail },
  { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { id: "topics", label: "Community Topics", icon: Hash },
  { id: "push", label: "Custom Push Notification", icon: Bell },
];

export default function CommunityMembers() {
  const [active, setActive] = useState("members");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (active) {
      case "members": return <Community />;
      case "leaderboard": return <Leaderboard />;
      case "invite": return <InviteSection />;
      case "bulkmail": return <BulkMailSection />;
      case "subscriptions": return <SubscriptionsSection />;
      case "topics": return <TopicsSection />;
      case "push": return <PushNotificationSection />;
      default: return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-6 min-h-[calc(100vh-120px)]">
      <aside className="w-60 shrink-0 space-y-1">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 px-3"
        >
          <ChevronLeft className="h-4 w-4" /> Go Back to Community
        </button>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">Manage Members</h2>
        {sections.map((s) => {
          const Icon = s.icon;
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm transition-colors text-left",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {s.label}
            </button>
          );
        })}
      </aside>

      <div className="flex-1 min-w-0">
        {renderContent()}
      </div>
    </motion.div>
  );
}
