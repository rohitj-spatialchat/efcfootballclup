import { motion } from "framer-motion";
import { Lock, Gift, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const rewards = [
  { id: 1, title: "VIP Matchday Experience", cost: 1500, image: "🏟️", gradient: "from-warning/20 via-warning/5 to-accent" },
  { id: 2, title: "Signed Jersey", cost: 800, image: "👕", gradient: "from-info/20 via-info/5 to-primary/10" },
  { id: 3, title: "Meet & Greet", cost: 2000, image: "🤝", gradient: "from-primary/20 via-primary/5 to-accent" },
  { id: 4, title: "Exclusive Fan Kit", cost: 500, image: "🎁", gradient: "from-success/20 via-success/5 to-primary/10" },
];

const currentUserMpu = 190;

export default function RewardsPreview() {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl border border-border bg-gradient-to-r from-card via-card to-accent/10 shadow-elevated p-5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Gift className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Unlock with Your MPU Points</h3>
            <p className="text-[10px] text-muted-foreground">Earn more MPU to unlock exclusive rewards</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs gap-1 rounded-full border-primary/30 text-primary hover:bg-primary/5"
          onClick={() => navigate("/redemption")}
        >
          View All <ArrowRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3">
        {rewards.map((reward, i) => {
          const available = currentUserMpu >= reward.cost;
          const deficit = reward.cost - currentUserMpu;

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.08 * i, duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="group cursor-pointer"
              onClick={() => navigate("/redemption")}
            >
              <div
                className={cn(
                  "relative rounded-xl border overflow-hidden transition-all duration-300",
                  available
                    ? "border-primary/30 hover:border-primary hover:shadow-md"
                    : "border-border opacity-80 hover:opacity-95 hover:shadow-sm",
                )}
              >
                {/* Background */}
                <div className={cn("bg-gradient-to-br h-24 flex items-center justify-center relative", reward.gradient)}>
                  <span className={cn(
                    "text-4xl transition-all duration-300 group-hover:scale-125",
                    !available && "blur-[2px] opacity-60"
                  )}>
                    {reward.image}
                  </span>
                  {available && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-warning" />
                    </motion.div>
                  )}
                  {!available && (
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-muted/80 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-card">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{reward.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{reward.cost.toLocaleString()} MPU</p>
                  {available ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-success mt-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Available
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] text-destructive/80 font-medium mt-1.5">
                      🔒 Need {deficit.toLocaleString()} more
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
