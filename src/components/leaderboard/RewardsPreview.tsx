import { motion } from "framer-motion";
import { Lock, Gift, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const rewards = [
  {
    id: 1,
    title: "VIP Matchday Experience",
    cost: 1500,
    image: "🏟️",
    gradient: "from-primary/20 to-accent",
  },
  {
    id: 2,
    title: "Signed Jersey",
    cost: 800,
    image: "👕",
    gradient: "from-info/20 to-primary/10",
  },
  {
    id: 3,
    title: "Meet & Greet",
    cost: 2000,
    image: "🤝",
    gradient: "from-warning/20 to-accent",
  },
  {
    id: 4,
    title: "Exclusive Fan Kit",
    cost: 500,
    image: "🎁",
    gradient: "from-success/20 to-primary/10",
  },
];

const currentUserMpu = 190;

export default function RewardsPreview() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">Unlock with Your MPU Points</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-primary hover:text-primary/80 gap-1"
          onClick={() => navigate("/redemption")}
        >
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {rewards.map((reward, i) => {
          const available = currentUserMpu >= reward.cost;
          const deficit = reward.cost - currentUserMpu;

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.03 }}
              className="group cursor-pointer"
              onClick={() => navigate("/redemption")}
            >
              <div
                className={cn(
                  "relative rounded-xl border overflow-hidden transition-all duration-300",
                  available
                    ? "border-primary/30 hover:border-primary/50 hover:shadow-md"
                    : "border-border opacity-75 hover:opacity-90",
                )}
              >
                {/* Background */}
                <div className={cn("bg-gradient-to-br h-20 flex items-center justify-center", reward.gradient)}>
                  <span className={cn("text-3xl transition-transform group-hover:scale-110", !available && "blur-[1px]")}>
                    {reward.image}
                  </span>
                  {!available && (
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{reward.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{reward.cost.toLocaleString()} MPU</p>
                  {available ? (
                    <span className="inline-block text-[10px] font-medium text-success mt-1">✓ Available</span>
                  ) : (
                    <span className="inline-block text-[10px] text-muted-foreground mt-1">
                      Need {deficit.toLocaleString()} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
