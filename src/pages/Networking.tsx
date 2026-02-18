import { motion } from "framer-motion";
import { Zap, Users, Shuffle, Video } from "lucide-react";

const onlineUsers = [
  { name: "Dr. Marco Rossi", role: "Head of Sports Medicine • AC Milan", avatar: "MR", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { name: "Sarah Mitchell", role: "Lead Physiotherapist • Manchester City", avatar: "SM", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { name: "Alex Chen", role: "Performance Analyst • Bayern Munich", avatar: "AC", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Emma Johansson", role: "Sports Scientist • Chelsea FC", avatar: "EJ", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { name: "Carlos Mendez", role: "Strength & Conditioning • Real Madrid", avatar: "CM", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Amara Diallo", role: "Team Doctor • Juventus", avatar: "AD", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { name: "Liam O'Connor", role: "Nutrition Specialist • Liverpool FC", avatar: "LO", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function NetworkingPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Speed Networking</h1>
        <p className="text-sm text-muted-foreground mt-1">Connect with community members for quick, meaningful conversations</p>
      </motion.div>

      {/* Quick Match Card */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card p-8 shadow-card text-center max-w-lg mx-auto">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Ready to Network?</h2>
        <p className="text-sm text-muted-foreground mb-6">Get matched with a random community member for a quick conversation</p>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Shuffle className="h-4 w-4" /> Shuffle & Match
        </button>
      </motion.div>

      {/* Online Now */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Online Now
          </h2>
          <span className="text-xs text-muted-foreground">{onlineUsers.length} members</span>
        </div>
        <div className="px-5 pb-4 space-y-2">
          {onlineUsers.map((u) => (
            <div key={u.name} className="flex items-center justify-between rounded-md p-2.5 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={u.image}
                    alt={u.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.role}</p>
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
                <Video className="h-3 w-3" /> Connect
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
