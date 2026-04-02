import { useState } from "react";
import { Megaphone, Pin, Calendar, MessageSquare, Heart, Share2, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const initialAnnouncements = [
  {
    id: 1,
    pinned: true,
    category: "Official",
    title: "2026 Summer Training Camp — Registration Now Open",
    content:
      "We're excited to announce the annual Summer Training Camp from July 14–28 at the EFC Performance Centre. All registered members can apply through the Events tab. Spots are limited — first come, first served.",
    author: "EFC Admin",
    initials: "EA",
    date: "Feb 26, 2026",
    likes: 48,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    pinned: true,
    category: "Update",
    title: "New Gamification Levels Added — Check Your Progress!",
    content:
      "Levels 5 and 6 are now live! Earn XP through likes, comments, reposts, and event attendance. Reach \"Legend\" or \"Hall of Fame\" status and unlock exclusive badges. Visit the Leaderboard to see where you stand.",
    author: "Community Team",
    initials: "CT",
    date: "Feb 25, 2026",
    likes: 36,
    comments: 8,
    liked: false,
  },
  {
    id: 3,
    pinned: false,
    category: "Event",
    title: "UEFA Pro License Workshop — March 10",
    content:
      "Join our expert panel for an exclusive workshop on coaching methodologies and player development frameworks. Open to all members with Level 2+ standing. Register in the Events section.",
    author: "James Wilson",
    initials: "JW",
    date: "Feb 24, 2026",
    likes: 22,
    comments: 5,
    liked: false,
  },
  {
    id: 4,
    pinned: false,
    category: "Community",
    title: "Welcome Our Newest Members!",
    content:
      "A big welcome to the 34 new members who joined this week from across 12 different countries. Don't forget to introduce yourself in the community and connect with fellow professionals.",
    author: "Sarah Mitchell",
    initials: "SM",
    date: "Feb 23, 2026",
    likes: 55,
    comments: 19,
    liked: false,
  },
  {
    id: 5,
    pinned: false,
    category: "Knowledge",
    title: "New Research Paper: Injury Prevention in Youth Academies",
    content:
      "Dr. Amanda Kim has published a comprehensive study on injury prevention protocols for youth academies. Access the full paper in the Knowledge Hub under Sports Science.",
    author: "Amanda Kim",
    initials: "AK",
    date: "Feb 22, 2026",
    likes: 31,
    comments: 7,
    liked: false,
  },
  {
    id: 6,
    pinned: false,
    category: "Maintenance",
    title: "Scheduled Platform Maintenance — Feb 28",
    content:
      "We'll be performing scheduled maintenance on Saturday, Feb 28 from 02:00–04:00 UTC. The platform may be briefly unavailable during this window. Thank you for your patience.",
    author: "EFC Admin",
    initials: "EA",
    date: "Feb 21, 2026",
    likes: 8,
    comments: 2,
    liked: false,
  },
];

const categoryColors: Record<string, string> = {
  Official: "bg-primary text-primary-foreground",
  Update: "bg-accent text-accent-foreground",
  Event: "bg-info text-info-foreground",
  Community: "bg-success text-success-foreground",
  Knowledge: "bg-warning text-warning-foreground",
  Maintenance: "bg-muted text-muted-foreground",
};

export default function Announcements() {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof initialAnnouncements[0] | null>(null);

  const handleLike = (id: number) => {
    setAnnouncements(prev => prev.map(a =>
      a.id === id ? { ...a, liked: !a.liked, likes: a.liked ? a.likes - 1 : a.likes + 1 } : a
    ));
  };

  const handleComment = (id: number) => {
    const a = announcements.find(x => x.id === id);
    if (a) setSelectedAnnouncement(a);
  };

  const handleShare = (id: number) => {
    const a = announcements.find(x => x.id === id);
    if (navigator.clipboard && a) {
      navigator.clipboard.writeText(`Check out "${a.title}" on EFC Community`);
      toast({ title: "Link copied!", description: "Announcement link copied to clipboard." });
    }
  };

  const renderActions = (a: typeof initialAnnouncements[0]) => (
    <div className="flex items-center gap-3 text-muted-foreground">
      <button
        onClick={(e) => { e.stopPropagation(); handleLike(a.id); }}
        className={`flex items-center gap-1 text-xs transition-colors ${a.liked ? "text-primary font-medium" : "hover:text-primary"}`}
      >
        <Heart className={`h-3.5 w-3.5 ${a.liked ? "fill-primary text-primary" : ""}`} /> {a.likes}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); handleComment(a.id); }}
        className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
      >
        <MessageSquare className="h-3.5 w-3.5" /> {a.comments}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); handleShare(a.id); }}
        className="hover:text-primary transition-colors"
      >
        <Share2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Megaphone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
            <p className="text-sm text-muted-foreground">Stay up to date with the latest from EFC</p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {announcements.length} updates
        </Badge>
      </div>

      {/* Pinned */}
      {announcements.filter((a) => a.pinned).length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            <Pin className="h-3.5 w-3.5" />
            Pinned
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {announcements
              .filter((a) => a.pinned)
              .map((a) => (
                <Card
                  key={a.id}
                  className="border-primary/20 bg-gradient-to-br from-accent/40 to-card transition-shadow hover:shadow-card-hover cursor-pointer"
                  onClick={() => setSelectedAnnouncement(a)}
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[a.category] || "bg-muted text-muted-foreground"}`}
                          >
                            {a.category}
                          </span>
                          <Pin className="h-3 w-3 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground leading-snug">{a.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.content}</p>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                            {a.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-foreground">{a.author}</span>
                        <span className="text-xs text-muted-foreground">· {a.date}</span>
                      </div>
                      {renderActions(a)}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Recent */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent</h2>
        <div className="space-y-3">
          {announcements
            .filter((a) => !a.pinned)
            .map((a) => (
              <Card key={a.id} className="transition-shadow hover:shadow-card-hover cursor-pointer" onClick={() => setSelectedAnnouncement(a)}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-9 w-9 mt-0.5">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
                        {a.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[a.category] || "bg-muted text-muted-foreground"}`}
                        >
                          {a.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {a.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{a.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.content}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-muted-foreground">{a.author}</span>
                        {renderActions(a)}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 mt-1" onClick={(e) => { e.stopPropagation(); setSelectedAnnouncement(a); }}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => !open && setSelectedAnnouncement(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[selectedAnnouncement.category]}`}>
                    {selectedAnnouncement.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{selectedAnnouncement.date}</span>
                </div>
                <DialogTitle>{selectedAnnouncement.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">{selectedAnnouncement.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{selectedAnnouncement.author}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedAnnouncement.content}</p>
                <Separator />
                <div className="flex items-center justify-between">
                  {renderActions(selectedAnnouncement)}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
