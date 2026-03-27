import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, Star, Gift, Clock, ChevronLeft, ChevronRight, 
  Sparkles, Crown, Zap, Timer, Check, X, TrendingUp,
  Award, Shield, Flame, PartyPopper
} from "lucide-react";
import { cn } from "@/lib/utils";

import vipMatchday from "@/assets/rewards/vip-matchday.jpg";
import meetGreet from "@/assets/rewards/meet-greet.jpg";
import signedJersey from "@/assets/rewards/signed-jersey.jpg";
import trainingGround from "@/assets/rewards/training-ground.jpg";
import limitedKit from "@/assets/rewards/limited-kit.jpg";
import awayTravel from "@/assets/rewards/away-travel.jpg";
import lockerRoom from "@/assets/rewards/locker-room.jpg";
import ultimateBundle from "@/assets/rewards/ultimate-bundle.jpg";

const USER_POINTS = 100000;
const NEXT_TIER_POINTS = 150000;

type RewardCategory = "all" | "experiences" | "merchandise" | "exclusives" | "limited";

interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
  image: string;
  availability: string;
  availabilityCount?: number;
  category: RewardCategory;
  countdown?: string;
  featured?: boolean;
}

const rewards: Reward[] = [
  {
    id: 1, title: "VIP Matchday + Tunnel Walk", description: "Walk through the players' tunnel and experience matchday like a VIP with premium hospitality.",
    cost: 150000, image: vipMatchday, availability: "Limited", availabilityCount: 5, category: "experiences", countdown: "2d 14h", featured: true,
  },
  {
    id: 2, title: "Meet & Greet with Legends", description: "An exclusive face-to-face session with club legends and first-team players.",
    cost: 200000, image: meetGreet, availability: "Only 3 left", availabilityCount: 3, category: "experiences", featured: true,
  },
  {
    id: 3, title: "Player-Worn Signed Jersey", description: "Authentic match-used jersey, hand-signed by the player. Certificate of authenticity included.",
    cost: 350000, image: signedJersey, availability: "Rare", availabilityCount: 2, category: "merchandise", countdown: "5d 8h", featured: true,
  },
  {
    id: 4, title: "Training Ground VIP Access", description: "Spend a day at the training facility. Watch sessions, meet staff, and tour the grounds.",
    cost: 100000, image: trainingGround, availability: "Available", category: "experiences",
  },
  {
    id: 5, title: "Members-Only Limited Kit", description: "Exclusive limited-edition kit available only through MPU redemption. Not sold anywhere.",
    cost: 80000, image: limitedKit, availability: "Limited", availabilityCount: 12, category: "merchandise", featured: true,
  },
  {
    id: 6, title: "Away Match Travel Package", description: "Travel with fellow fans to an away fixture. Includes transport, ticket, and hospitality.",
    cost: 250000, image: awayTravel, availability: "Only 5 left", availabilityCount: 5, category: "exclusives",
  },
  {
    id: 7, title: "Locker Room Access", description: "Go behind the scenes into the inner sanctum. See where matchday preparation happens.",
    cost: 120000, image: lockerRoom, availability: "Limited", availabilityCount: 8, category: "exclusives", countdown: "1d 6h",
  },
  {
    id: 8, title: "Ultimate Fan Bundle", description: "The complete package: VIP ticket, signed merch, meet & greet, and premium hospitality.",
    cost: 500000, image: ultimateBundle, availability: "Only 1 left", availabilityCount: 1, category: "limited", countdown: "12h 30m", featured: true,
  },
];

const categories: { key: RewardCategory; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "All Rewards", icon: <Gift className="h-4 w-4" /> },
  { key: "experiences", label: "Experiences", icon: <Star className="h-4 w-4" /> },
  { key: "merchandise", label: "Merchandise", icon: <Trophy className="h-4 w-4" /> },
  { key: "exclusives", label: "Exclusives", icon: <Crown className="h-4 w-4" /> },
  { key: "limited", label: "Limited Drops", icon: <Flame className="h-4 w-4" /> },
];

const tiers = [
  { name: "Silver", min: 0, color: "bg-secondary text-secondary-foreground" },
  { name: "Gold", min: 50000, color: "bg-warning text-warning-foreground" },
  { name: "Elite", min: 150000, color: "bg-primary text-primary-foreground" },
];

const leaderboard = [
  { name: "Marcus R.", points: 187500, tier: "Elite" },
  { name: "Sarah K.", points: 162300, tier: "Elite" },
  { name: "James O.", points: 145100, tier: "Gold" },
  { name: "Priya M.", points: 98900, tier: "Gold" },
  { name: "You", points: USER_POINTS, tier: "Gold" },
];

const history = [
  { date: "Mar 15, 2026", reward: "Members-Only Limited Kit", cost: 80000 },
  { date: "Feb 28, 2026", reward: "Training Ground VIP Access", cost: 100000 },
  { date: "Jan 10, 2026", reward: "Away Match Travel Package", cost: 250000 },
];

function formatPoints(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);
}

export default function Redemption() {
  const [activeCategory, setActiveCategory] = useState<RewardCategory>("all");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredRewards = rewards.filter(r => r.featured);
  const filteredRewards = activeCategory === "all" ? rewards : rewards.filter(r => r.category === activeCategory);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleRedeem = () => {
    setRedeemed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const currentTier = tiers.reduce((acc, t) => USER_POINTS >= t.min ? t : acc, tiers[0]);
  const nextTier = tiers.find(t => t.min > USER_POINTS);
  const tierProgress = nextTier ? ((USER_POINTS - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const scrollCarousel = (dir: number) => {
    const next = Math.max(0, Math.min(carouselIndex + dir, featuredRewards.length - 1));
    setCarouselIndex(next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: 0, opacity: 1, scale: 1 }}
                animate={{
                  y: [0, Math.random() * 600 + 200],
                  x: [(Math.random() - 0.5) * 400, (Math.random() - 0.5) * 600],
                  opacity: [1, 0],
                  rotate: Math.random() * 720,
                  scale: [1, 0.5],
                }}
                transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
                className="absolute top-1/4"
                style={{
                  width: 8 + Math.random() * 8,
                  height: 8 + Math.random() * 8,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  background: ["hsl(var(--primary))", "hsl(var(--warning))", "hsl(var(--info))", "hsl(var(--destructive))", "hsl(var(--success))"][Math.floor(Math.random() * 5)],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Balance Header */}
      <div className="sticky top-0 z-30 mb-6 border-b border-border bg-card/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Trophy className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-warning flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-warning-foreground" />
              </div>
            </motion.div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Your Balance</p>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl font-black tracking-tight"
              >
                <span className="text-primary">
                  {USER_POINTS.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-muted-foreground ml-2">MPU</span>
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Tier Progress */}
            <div className="flex-1 sm:w-56">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
                  <Shield className="h-3 w-3" /> {currentTier.name}
                </span>
                {nextTier && (
                  <span className="text-xs text-muted-foreground">
                    {formatPoints(nextTier.min - USER_POINTS)} to {nextTier.name}
                  </span>
                )}
              </div>
              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tierProgress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg transition-shadow whitespace-nowrap"
            >
              <Zap className="h-4 w-4 inline mr-1.5 -mt-0.5" />
              Earn More
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-8 space-y-10">
        {/* Featured Carousel */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" /> Featured Rewards
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(-1)}
                disabled={carouselIndex === 0}
                className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                disabled={carouselIndex >= featuredRewards.length - 1}
                className="h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={carouselRef}>
            <motion.div
              className="flex gap-5"
              animate={{ x: `-${carouselIndex * (100 / 3 + 1.5)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {featuredRewards.map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="min-w-[calc(33.333%-14px)] shrink-0 group cursor-pointer"
                  onClick={() => { setSelectedReward(reward); setRedeemed(false); }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all shadow-card hover:shadow-elevated">
                    <div className="relative h-48 overflow-hidden">
                      <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width={640} height={512} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {reward.availability && (
                          <span className="px-2.5 py-1 rounded-full bg-destructive/90 text-[11px] font-bold uppercase tracking-wide text-destructive-foreground backdrop-blur-sm">
                            {reward.availability}
                          </span>
                        )}
                        {reward.countdown && (
                          <span className="px-2.5 py-1 rounded-full bg-card/80 text-[11px] font-medium text-info backdrop-blur-sm flex items-center gap-1">
                            <Timer className="h-3 w-3" /> {reward.countdown}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-base mb-1.5 group-hover:text-primary transition-colors">{reward.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-primary">
                          {formatPoints(reward.cost)} MPU
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={USER_POINTS < reward.cost}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                            USER_POINTS >= reward.cost
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-secondary text-muted-foreground border border-border cursor-not-allowed"
                          )}
                          onClick={(e) => { e.stopPropagation(); setSelectedReward(reward); setRedeemed(false); }}
                        >
                          {USER_POINTS >= reward.cost ? "Redeem Now" : "Locked"}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Category Tabs */}
        <section>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all",
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredRewards.map((reward) => (
                <motion.div
                  key={reward.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group cursor-pointer"
                  onClick={() => { setSelectedReward(reward); setRedeemed(false); }}
                >
                  <div className="rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/30 shadow-card hover:shadow-elevated transition-all h-full flex flex-col">
                    <div className="relative h-40 overflow-hidden">
                      <img src={reward.image} alt={reward.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={640} height={512} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase backdrop-blur-sm",
                          reward.availabilityCount && reward.availabilityCount <= 3
                            ? "bg-destructive/90 text-destructive-foreground"
                            : "bg-card/70 text-primary"
                        )}>
                          {reward.availability}
                        </span>
                        {reward.countdown && (
                          <span className="px-2 py-0.5 rounded-full bg-card/70 text-[10px] font-medium text-info flex items-center gap-1 backdrop-blur-sm">
                            <Timer className="h-2.5 w-2.5" /> {reward.countdown}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{reward.title}</h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3 flex-1">{reward.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-primary">
                          {formatPoints(reward.cost)}
                        </span>
                        {USER_POINTS >= reward.cost ? (
                          <span className="text-[10px] font-semibold text-success flex items-center gap-1">
                            <Check className="h-3 w-3" /> Redeemable
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">
                            Need {formatPoints(reward.cost - USER_POINTS)} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom Sections: Leaderboard + History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gamification / Leaderboard */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Top Fans This Month
            </h3>
            
            {/* Tiers */}
            <div className="flex gap-3 mb-5">
              {tiers.map(t => (
                <div
                  key={t.name}
                  className={cn(
                    "flex-1 rounded-xl p-3 text-center border transition-all",
                    currentTier.name === t.name
                      ? "border-primary/50 bg-accent"
                      : "border-border bg-secondary/50"
                  )}
                >
                  <div className={cn("inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-1", t.color)}>
                    {t.name}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{formatPoints(t.min)}+ MPU</p>
                </div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="space-y-2">
              {leaderboard.map((user, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors",
                    user.name === "You"
                      ? "bg-accent border border-primary/30"
                      : "bg-secondary/40 hover:bg-secondary/60"
                  )}
                >
                  <span className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center text-xs font-black",
                    i === 0 ? "bg-warning text-warning-foreground" :
                    i === 1 ? "bg-secondary text-secondary-foreground" :
                    i === 2 ? "bg-warning/60 text-warning-foreground" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {i + 1}
                  </span>
                  <span className={cn("flex-1 text-sm font-medium", user.name === "You" && "text-primary")}>
                    {user.name}
                  </span>
                  <span className="text-xs font-bold text-primary">{user.points.toLocaleString()}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
                    user.tier === "Elite" ? "bg-primary/20 text-primary" : "bg-warning/20 text-warning"
                  )}>
                    {user.tier}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Redemption History */}
          <section className="rounded-2xl border border-border bg-card p-6">
             <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
413:               <Clock className="h-5 w-5 text-primary" /> Reward History
414:             </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-info to-accent" />
              
              <div className="space-y-6">
                {history.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-4 pl-1"
                  >
                    <div className="h-7 w-7 rounded-full bg-card border-2 border-primary flex items-center justify-center shrink-0 z-10">
                      <Gift className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1 rounded-xl bg-secondary/40 border border-border p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{item.reward}</span>
                        <span className="text-xs font-bold text-primary">-{formatPoints(item.cost)}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {history.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <Gift className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No redemptions yet</p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Redemption Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedReward(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-md rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {!redeemed ? (
                <>
                  <div className="relative h-48">
                    <img src={selectedReward.image} alt={selectedReward.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                    <button
                      onClick={() => setSelectedReward(null)}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-black mb-2">{selectedReward.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{selectedReward.description}</p>

                    <div className="rounded-xl bg-secondary/40 border border-border p-4 mb-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Reward Cost</span>
                        <span className="font-bold text-primary">{selectedReward.cost.toLocaleString()} MPU</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Your Balance</span>
                        <span className="font-bold">{USER_POINTS.toLocaleString()} MPU</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between text-sm">
                        <span className="text-muted-foreground">After Redemption</span>
                        <span className={cn("font-bold", USER_POINTS >= selectedReward.cost ? "text-success" : "text-destructive")}>
                          {USER_POINTS >= selectedReward.cost
                            ? `${(USER_POINTS - selectedReward.cost).toLocaleString()} MPU`
                            : `Insufficient (need ${(selectedReward.cost - USER_POINTS).toLocaleString()} more)`
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedReward(null)}
                        className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-secondary/60 transition-colors"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRedeem}
                        disabled={USER_POINTS < selectedReward.cost}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                          USER_POINTS >= selectedReward.cost
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                      >
                        Confirm Redemption
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
              <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <PartyPopper className="h-12 w-12 text-primary-foreground" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-black mb-1"
                  >
                    🎉 Congratulations!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-base font-semibold text-foreground mb-1"
                  >
                    You've successfully redeemed
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-lg font-black text-primary mb-4"
                  >
                    {selectedReward.title}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 }}
                    className="rounded-xl bg-secondary/50 border border-border p-4 mb-6 space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Points Deducted</span>
                      <span className="font-bold text-destructive">-{selectedReward.cost.toLocaleString()} MPU</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining Balance</span>
                      <span className="font-bold text-success">{(USER_POINTS - selectedReward.cost).toLocaleString()} MPU</span>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs text-muted-foreground mb-6"
                  >
                    🏟️ You'll receive a confirmation email with all the details shortly.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedReward(null)}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg transition-all"
                  >
                    Awesome! 🎊
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
