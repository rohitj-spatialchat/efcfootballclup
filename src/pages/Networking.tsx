import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Shuffle, Video, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const onlineUsers = [
  { name: "Dr. Marco Rossi", team: "AC Milan", country: "Italy", score: 9.4, role: "Sports Medicine", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
  { name: "Sarah Mitchell", team: "Manchester City", country: "England", score: 9.2, role: "Physiotherapist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { name: "Alex Chen", team: "Bayern Munich", country: "Germany", score: 8.5, role: "Performance Analyst", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { name: "Emma Johansson", team: "Chelsea FC", country: "Sweden", score: 8.0, role: "Sports Scientist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { name: "Carlos Mendez", team: "Real Madrid", country: "Spain", score: 7.8, role: "S&C Coach", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
  { name: "Amara Diallo", team: "Juventus", country: "Senegal", score: 9.1, role: "Team Doctor", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { name: "Liam O'Connor", team: "Liverpool FC", country: "Ireland", score: 7.2, role: "Nutritionist", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face" },
];

const scoreColor = (score: number) => {
  if (score >= 9) return "bg-success text-success-foreground";
  if (score >= 7) return "bg-warning text-warning-foreground";
  return "bg-muted text-muted-foreground";
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function NetworkingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = onlineUsers[currentIndex];

  const handleShuffle = useCallback(() => {
    let next: number;
    do {
      next = Math.floor(Math.random() * onlineUsers.length);
    } while (next === currentIndex && onlineUsers.length > 1);
    setCurrentIndex(next);
  }, [currentIndex]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Speed Networking</h1>
        <p className="text-sm text-muted-foreground mt-1">Connect with community members for quick, meaningful conversations</p>
      </motion.div>

      {/* Quick Match Card */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card p-8 shadow-card text-center max-w-lg mx-auto">
        <motion.div key={currentIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <img src={currentUser.image} alt={currentUser.name} className="h-20 w-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary/20" />
          <h2 className="text-lg font-semibold text-foreground">{currentUser.name}</h2>
          <p className="text-sm text-primary font-medium">{currentUser.team}</p>
          <p className="text-sm text-muted-foreground mb-6">{currentUser.role}</p>
        </motion.div>
        <div className="flex items-center justify-center gap-3">
          <button onClick={handleShuffle} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Shuffle className="h-4 w-4" /> Shuffle & Match
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
           <Video className="h-4 w-4" /> Connect
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <MessageSquare className="h-4 w-4" /> Message
          </button>
        </div>
      </motion.div>

      {/* Online Now - Table */}
      <motion.div variants={item} className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Online Now
          </h2>
          <span className="text-xs text-muted-foreground">{onlineUsers.length} members</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-border bg-muted/30">
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Team</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Country</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {onlineUsers.map((u) => (
              <tr key={u.name} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={u.image} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-foreground">{u.team}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{u.country}</td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold", scoreColor(u.score))}>
                    {u.score}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{u.role}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
                      <Video className="h-3 w-3" /> Connect
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                      <MessageSquare className="h-3 w-3" /> Message
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
