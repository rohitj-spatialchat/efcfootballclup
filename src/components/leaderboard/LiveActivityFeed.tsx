import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

const initialActivities = [
  { id: 1, user: "Rahul S.", action: "earned +50 MPU", icon: "🔥", time: "2 min ago", type: "streak" },
  { id: 2, user: "Sneha P.", action: "reached Gold tier", icon: "🥇", time: "5 min ago", type: "levelup" },
  { id: 3, user: "Ankit R.", action: "redeemed VIP Match Ticket", icon: "🎟️", time: "8 min ago", type: "redemption" },
  { id: 4, user: "Casey N.", action: "hit a 45-day streak", icon: "🔥", time: "12 min ago", type: "streak" },
  { id: 5, user: "Jamie L.", action: "reached Diamond tier", icon: "💎", time: "15 min ago", type: "levelup" },
  { id: 6, user: "Priya S.", action: "earned +38 MPU", icon: "🔥", time: "18 min ago", type: "streak" },
  { id: 7, user: "Diego M.", action: "redeemed Signed Jersey", icon: "🎟️", time: "22 min ago", type: "redemption" },
  { id: 8, user: "Yuki T.", action: "reached Platinum tier", icon: "🏆", time: "25 min ago", type: "levelup" },
  { id: 9, user: "Oliver S.", action: "earned +72 MPU", icon: "🔥", time: "30 min ago", type: "streak" },
  { id: 10, user: "Fatima A.", action: "hit a 28-day streak", icon: "🔥", time: "35 min ago", type: "streak" },
];

const newActivities = [
  { user: "Liam O.", action: "earned +55 MPU", icon: "🔥", type: "streak" },
  { user: "Morgan D.", action: "redeemed Fan Kit", icon: "🎟️", type: "redemption" },
  { user: "Taylor K.", action: "reached Silver tier", icon: "🥈", type: "levelup" },
  { user: "Noah W.", action: "hit a 9-day streak", icon: "🔥", type: "streak" },
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState(initialActivities);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const newAct = newActivities[idx % newActivities.length];
      const activity = {
        ...newAct,
        id: Date.now(),
        time: "Just now",
      };
      setActivities((prev) => [activity, ...prev.slice(0, 9)]);
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
      idx++;
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="h-4 w-4 text-primary" />
            <span
              className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success transition-transform ${
                pulse ? "scale-125" : "scale-100"
              }`}
            />
          </div>
          <h3 className="font-semibold text-foreground text-sm">Live Activity</h3>
        </div>
        <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">Live</span>
      </div>

      {/* Feed */}
      <div className="overflow-y-auto max-h-[320px] divide-y divide-border/50">
        <AnimatePresence initial={false}>
          {activities.map((act) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors"
            >
              {/* Icon */}
              <span className="text-base flex-shrink-0">{act.icon}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground">
                  <span className="font-semibold">{act.user}</span>{" "}
                  <span className="text-muted-foreground">{act.action}</span>
                </p>
              </div>

              {/* Time */}
              <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">{act.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
