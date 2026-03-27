import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const initialActivities = [
  { id: 1, user: "Rahul S.", action: "earned +50 MPU", icon: "🔥", time: "2 min ago", type: "streak" },
  { id: 2, user: "Sneha P.", action: "reached Gold tier", icon: "🥇", time: "5 min ago", type: "levelup" },
  { id: 3, user: "Ankit R.", action: "redeemed VIP Match Ticket", icon: "🎟️", time: "8 min ago", type: "redemption" },
  { id: 4, user: "Casey N.", action: "hit a 45-day streak", icon: "🔥", time: "12 min ago", type: "streak" },
  { id: 5, user: "Jamie L.", action: "reached Diamond tier", icon: "💎", time: "15 min ago", type: "levelup" },
  { id: 6, user: "Priya S.", action: "earned +38 MPU", icon: "🔥", time: "18 min ago", type: "streak" },
  { id: 7, user: "Diego M.", action: "redeemed Signed Jersey", icon: "🎟️", time: "22 min ago", type: "redemption" },
  { id: 8, user: "Yuki T.", action: "reached Platinum tier", icon: "🏆", time: "25 min ago", type: "levelup" },
];

const newActivities = [
  { user: "Liam O.", action: "earned +55 MPU", icon: "🔥", type: "streak" },
  { user: "Morgan D.", action: "redeemed Fan Kit", icon: "🎟️", type: "redemption" },
  { user: "Taylor K.", action: "reached Silver tier", icon: "🥈", type: "levelup" },
  { user: "Noah W.", action: "hit a 9-day streak", icon: "🔥", type: "streak" },
  { user: "Oliver S.", action: "earned +72 MPU", icon: "🔥", type: "streak" },
  { user: "Fatima A.", action: "hit a 28-day streak", icon: "🔥", type: "streak" },
];

const typeColors: Record<string, string> = {
  streak: "bg-destructive/10 text-destructive",
  levelup: "bg-warning/10 text-warning",
  redemption: "bg-primary/10 text-primary",
};

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState(initialActivities);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const newAct = newActivities[idx % newActivities.length];
      const activity = { ...newAct, id: Date.now(), time: "Just now" };
      setActivities((prev) => [activity, ...prev.slice(0, 7)]);
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
      idx++;
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-gradient-to-r from-card to-accent/30">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="h-4 w-4 text-primary" />
            <motion.span
              animate={{ scale: pulse ? [1, 1.5, 1] : 1, opacity: pulse ? [1, 0.5, 1] : 1 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success"
            />
          </div>
          <h3 className="font-semibold text-foreground text-sm">Live Activity</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-warning" />
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted rounded-full px-2.5 py-0.5">
            LIVE
          </span>
        </div>
      </div>

      {/* Feed */}
      <div className="overflow-y-auto flex-1 max-h-[300px]">
        <AnimatePresence initial={false}>
          {activities.map((act) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -30, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 30, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-3 px-5 py-3 border-b border-border/30 hover:bg-accent/30 transition-colors"
            >
              {/* Icon bubble */}
              <div className={cn("flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-sm", typeColors[act.type] || "bg-muted")}>
                {act.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground leading-snug">
                  <span className="font-semibold">{act.user}</span>{" "}
                  <span className="text-muted-foreground">{act.action}</span>
                </p>
              </div>

              {/* Time */}
              <span className={cn(
                "text-[10px] whitespace-nowrap flex-shrink-0 font-medium rounded-full px-2 py-0.5",
                act.time === "Just now" ? "bg-success/10 text-success" : "text-muted-foreground"
              )}>
                {act.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
