import { motion } from "framer-motion";
import { Crown, TrendingUp, Zap, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodiumUser {
  rank: number;
  name: string;
  mpu: number;
  level: number;
  badge: string;
  team: string;
  streak: number;
}

const podiumConfig = [
  {
    rank: 2,
    order: "order-1",
    height: "h-24",
    avatarSize: "h-16 w-16",
    medal: "🥈",
    gradientFrom: "from-[hsl(210,14%,93%)]",
    gradientTo: "to-[hsl(210,20%,98%)]",
    ringColor: "ring-[hsl(215,12%,70%)]",
    barGradient: "from-[hsl(215,12%,80%)] to-[hsl(215,12%,70%)]",
    labelBg: "bg-[hsl(210,14%,90%)]",
  },
  {
    rank: 1,
    order: "order-2",
    height: "h-32",
    avatarSize: "h-20 w-20",
    medal: "👑",
    gradientFrom: "from-[hsl(38,92%,70%)]",
    gradientTo: "to-[hsl(42,92%,56%)]",
    ringColor: "ring-warning",
    barGradient: "from-warning to-[hsl(42,80%,44%)]",
    labelBg: "bg-warning/20",
  },
  {
    rank: 3,
    order: "order-3",
    height: "h-20",
    avatarSize: "h-14 w-14",
    medal: "🥉",
    gradientFrom: "from-[hsl(25,60%,75%)]",
    gradientTo: "to-[hsl(25,50%,60%)]",
    ringColor: "ring-[hsl(25,50%,55%)]",
    barGradient: "from-[hsl(25,50%,70%)] to-[hsl(25,50%,55%)]",
    labelBg: "bg-[hsl(25,50%,90%)]",
  },
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("");

export default function TopPodium({ users }: { users: PodiumUser[] }) {
  const top3 = users.slice(0, 3);
  if (top3.length < 3) return null;

  const ordered = [top3[1], top3[0], top3[2]];

  return (
    <div className="relative rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/20 p-6 pb-2 shadow-elevated overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-warning/8 rounded-full blur-[80px]" />
        <div className="absolute -bottom-10 -left-10 w-60 h-40 bg-primary/6 rounded-full blur-[60px]" />
        <div className="absolute -bottom-10 -right-10 w-60 h-40 bg-info/6 rounded-full blur-[60px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-warning/10 rounded-full px-4 py-1.5 mb-2">
          <Crown className="h-4 w-4 text-warning" />
          <span className="text-xs font-semibold text-warning">TOP PERFORMERS</span>
          <Crown className="h-4 w-4 text-warning" />
        </div>
      </motion.div>

      {/* Podium */}
      <div className="relative flex items-end justify-center gap-3 sm:gap-5">
        {ordered.map((user, i) => {
          const config = podiumConfig[i];
          const isFirst = config.rank === 1;

          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: isFirst ? 0.1 : i === 0 ? 0.3 : 0.4,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn("flex flex-col items-center", config.order, isFirst ? "w-[140px] sm:w-[160px]" : "w-[120px] sm:w-[140px]")}
            >
              {/* User card floating above podium */}
              <motion.div
                whileHover={{ y: -6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative flex flex-col items-center mb-0 cursor-pointer group"
              >
                {/* Crown for #1 */}
                {isFirst && (
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    className="mb-1"
                  >
                    <Crown className="h-8 w-8 text-warning fill-warning/30 drop-shadow-sm" />
                  </motion.div>
                )}

                {/* Avatar with ring */}
                <div className="relative">
                  <div
                    className={cn(
                      "rounded-full flex items-center justify-center font-bold ring-3 bg-card text-primary shadow-md transition-shadow group-hover:shadow-lg",
                      config.avatarSize,
                      config.ringColor,
                      isFirst && "text-lg ring-4",
                    )}
                  >
                    {getInitials(user.name)}
                  </div>
                  {/* Streak badge */}
                  <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 rounded-full bg-destructive text-destructive-foreground px-1.5 py-0.5 text-[9px] font-bold shadow-sm">
                    <Flame className="h-2.5 w-2.5" />
                    {user.streak}
                  </div>
                </div>

                {/* Medal */}
                <span className="text-xl mt-1.5">{config.medal}</span>

                {/* Name */}
                <p className={cn("font-semibold text-foreground mt-0.5 text-center leading-tight", isFirst ? "text-sm" : "text-xs")}>
                  {user.name}
                </p>

                {/* Team */}
                <p className="text-[10px] text-muted-foreground">{user.team}</p>

                {/* MPU chip */}
                <div className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 mt-1.5 text-[11px] font-bold",
                  config.labelBg, "text-foreground"
                )}>
                  <TrendingUp className="h-3 w-3" />
                  {user.mpu.toLocaleString()} MPU
                </div>

                {/* Level */}
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="h-2.5 w-2.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {user.badge} Lv.{user.level}
                  </span>
                </div>
              </motion.div>

              {/* Podium bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ delay: isFirst ? 0.3 : i === 0 ? 0.5 : 0.6, duration: 0.5 }}
                className={cn(
                  "w-full rounded-t-xl bg-gradient-to-t border-x border-t border-border/40 mt-2 flex flex-col items-center justify-start pt-2",
                  config.height,
                  config.barGradient,
                  isFirst && "shadow-md",
                )}
              >
                <span className={cn(
                  "text-2xl font-black",
                  isFirst ? "text-warning/80" : "text-foreground/20"
                )}>
                  #{config.rank}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
