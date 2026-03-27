import { motion } from "framer-motion";
import { Crown, TrendingUp } from "lucide-react";
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
    height: "h-28",
    cardSize: "pt-8 pb-5 px-4",
    avatarSize: "h-14 w-14 text-base",
    theme: "from-slate-200/80 to-slate-100/60",
    ringColor: "ring-slate-300",
    glowColor: "shadow-slate-300/30",
    label: "🥈",
    accentBg: "bg-slate-200/50",
  },
  {
    rank: 1,
    order: "order-2",
    height: "h-36",
    cardSize: "pt-10 pb-6 px-5",
    avatarSize: "h-18 w-18 text-lg",
    theme: "from-amber-200/80 to-yellow-100/60",
    ringColor: "ring-amber-400",
    glowColor: "shadow-amber-300/40",
    label: "👑",
    accentBg: "bg-amber-100/60",
  },
  {
    rank: 3,
    order: "order-3",
    height: "h-24",
    cardSize: "pt-7 pb-4 px-4",
    avatarSize: "h-12 w-12 text-sm",
    theme: "from-orange-200/70 to-amber-100/50",
    ringColor: "ring-orange-300",
    glowColor: "shadow-orange-300/25",
    label: "🥉",
    accentBg: "bg-orange-100/50",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function TopPodium({ users }: { users: PodiumUser[] }) {
  const top3 = users.slice(0, 3);
  if (top3.length < 3) return null;

  const ordered = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd

  return (
    <div className="relative rounded-xl border border-border bg-card p-6 shadow-card overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-40 h-20 bg-warning/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex items-end justify-center gap-4 sm:gap-6 mt-4">
        {ordered.map((user, i) => {
          const config = podiumConfig[i];
          const isFirst = config.rank === 1;

          return (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isFirst ? 0.1 : i === 0 ? 0.25 : 0.35, duration: 0.5, ease: "easeOut" }}
              className={cn("flex flex-col items-center", config.order)}
            >
              {/* Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={cn(
                  "relative rounded-xl bg-gradient-to-b border border-border/50 text-center",
                  config.cardSize,
                  config.theme,
                  "hover:shadow-lg transition-shadow duration-300",
                  config.glowColor,
                  isFirst && "shadow-md",
                )}
              >
                {/* Crown for #1 */}
                {isFirst && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <Crown className="h-7 w-7 text-warning fill-warning/30" />
                  </motion.div>
                )}

                {/* Avatar */}
                <div
                  className={cn(
                    "mx-auto rounded-full flex items-center justify-center font-bold ring-2 bg-card text-primary",
                    config.avatarSize,
                    config.ringColor,
                    isFirst ? "h-16 w-16" : config.rank === 2 ? "h-14 w-14" : "h-12 w-12",
                  )}
                >
                  {getInitials(user.name)}
                </div>

                {/* Badge */}
                <p className="text-lg mt-2">{config.label}</p>

                {/* Name */}
                <p className={cn("font-semibold text-foreground mt-1", isFirst ? "text-sm" : "text-xs")}>
                  {user.name}
                </p>

                {/* Team */}
                <p className="text-[10px] text-muted-foreground">{user.team}</p>

                {/* MPU */}
                <div
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 mt-2 text-xs font-semibold",
                    config.accentBg,
                    "text-foreground",
                  )}
                >
                  <TrendingUp className="h-3 w-3" />
                  {user.mpu.toLocaleString()} MPU
                </div>

                {/* Level */}
                <p className="text-[10px] text-muted-foreground mt-1">
                  {user.badge} Lv.{user.level}
                </p>
              </motion.div>

              {/* Podium base */}
              <div
                className={cn(
                  "w-full rounded-b-lg bg-gradient-to-t from-muted/80 to-muted/30 border-x border-b border-border/40 mt-0",
                  config.height,
                  isFirst ? "min-w-[120px]" : "min-w-[100px]",
                )}
              >
                <div className="flex items-center justify-center h-8 mt-1">
                  <span className={cn("text-lg font-bold text-muted-foreground/60")}>#{config.rank}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
