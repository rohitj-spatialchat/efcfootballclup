import { useState } from "react";
import { cn } from "@/lib/utils";
import { ContactProfile, profilesData } from "@/lib/chatData";

interface ChatProfilePanelProps {
  activeContact: string;
}

const dummyPosts = [
  { title: "How I doubled my client base in 3 months", likes: 24, comments: 8 },
  { title: "The power of morning routines", likes: 18, comments: 5 },
  { title: "Why I stopped offering free consultations", likes: 31, comments: 12 },
];

const dummyComments = [
  { text: "This is so helpful, thank you for sharing!", time: "2 days ago" },
  { text: "I've been doing something similar — great results!", time: "4 days ago" },
  { text: "Would love to hear more about this approach.", time: "1 week ago" },
];

const dummySpaces = ["Coaching Mastery", "Business Growth", "Mindset & Motivation"];

export default function ChatProfilePanel({ activeContact }: ChatProfilePanelProps) {
  const [profileTab, setProfileTab] = useState("About");
  const profile = profilesData[activeContact] || profilesData["Robert Fox"];
  const tabs = ["About", "Posts", "Comments", "Spaces"];

  return (
    <div className="w-72 border-l border-border bg-card p-5 overflow-y-auto shrink-0">
      <h3 className="text-sm font-semibold text-foreground mb-4">Profile</h3>
      <div className="text-center mb-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary mx-auto mb-2">
          {activeContact.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <p className="text-sm font-semibold text-foreground">{activeContact}</p>
        <p className="text-xs text-muted-foreground">{profile.role}</p>
      </div>
      <div className="flex items-center justify-center gap-3 mb-4">
        {tabs.map((t) => (
          <button key={t} onClick={() => setProfileTab(t)} className={cn("text-xs pb-0.5 transition-colors", profileTab === t ? "text-foreground font-medium border-b border-foreground" : "text-muted-foreground hover:text-foreground")}>
            {t}
          </button>
        ))}
      </div>

      {profileTab === "About" && (
        <div className="space-y-3 text-xs">
          <p className="text-muted-foreground">✉ {profile.email}</p>
          <p className="text-muted-foreground">📍 {profile.location}</p>
          <p className="text-muted-foreground">📅 Member since {profile.memberSince}</p>
          <div>
            <p className="font-medium text-foreground mb-1">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.tags.map((t) => (
                <span key={t} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Bio</p>
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
          </div>
        </div>
      )}

      {profileTab === "Posts" && (
        <div className="space-y-3">
          {dummyPosts.map((p, i) => (
            <div key={i} className="p-2.5 rounded-lg border border-border">
              <p className="text-xs font-medium text-foreground">{p.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1">❤️ {p.likes} · 💬 {p.comments}</p>
            </div>
          ))}
        </div>
      )}

      {profileTab === "Comments" && (
        <div className="space-y-3">
          {dummyComments.map((c, i) => (
            <div key={i} className="p-2.5 rounded-lg border border-border">
              <p className="text-xs text-foreground">{c.text}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{c.time}</p>
            </div>
          ))}
        </div>
      )}

      {profileTab === "Spaces" && (
        <div className="space-y-2">
          {dummySpaces.map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-border">
              <div className="h-7 w-7 rounded bg-primary/10 flex items-center justify-center text-xs text-primary font-semibold">{s[0]}</div>
              <span className="text-xs font-medium text-foreground">{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
