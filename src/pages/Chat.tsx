import { motion } from "framer-motion";
import { X, Search, Send, Smile, Paperclip, AtSign, Mic, Image, Video, Hash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const dmContacts = [
  { name: "Clarity Coach", time: "9:45", preview: "Just wanted to check in and se...", agent: true },
  { name: "Carlos Ramirez", time: "10:18", preview: "Creating a space where clients...", unread: true },
  { name: "Robert, Edwin +2", time: "10:30", preview: "How you're feeling about this w..." },
  { name: "Robert Fox", time: "10:46", preview: "Can we discuss that project we...", active: true },
  { name: "Dianne Russell", time: "11:08", preview: "I just crossed a new income mil...", unread: true },
  { name: "Mei Wong", time: "12:45", preview: "Wanted to share something exci...", unread: true },
  { name: "Kwame Adebayo", time: "1:03", preview: "I was thinking about our niche cl..." },
  { name: "Ravi Patel", time: "1:18", preview: "I made a new client offer today!..." },
  { name: "Esther Howard", time: "9:45", preview: "Hope you're doing well. Any pla..." },
];

const chatMessages = [
  { author: "Ravi Patel", time: "1:55 PM", text: "What's one small habit that's helped you grow your coaching business lately?", date: "MONDAY, OCTOBER 20TH" },
  { author: "Kristin Wilson", time: "2:03 PM", text: "Posting every day — even when it's not perfect. Consistency > perfection.", verified: true, replies: 2 },
  { author: "Robert Fox", time: "2:25 PM", text: "100%! Showing up daily has been a game-changer for me too." },
  { author: "Kwame Adebayo", time: "2:42 PM", text: "Same here. I started sharing wins weekly — builds trust and shows momentum 🚀", reactions: ["🙌 1"] },
  { author: "Carlos Ramirez", time: "7:01 AM", text: "Morning CEO time. Just 30 mins a day to plan, reflect, and set intentions. Huge shift.", date: "TODAY" },
  { author: "Mei Wong", time: "7:06 AM", text: "Mine's celebrating every tiny win. Keeps the energy high!", verified: true },
];

const profileData = {
  name: "Robert Fox",
  role: "Business Coach",
  email: "robertfox@thebusinesscoach.com",
  location: "New York, NY",
  memberSince: "July 2020",
  tags: ["Editor", "Pro", "Creator"],
  bio: "I'm Robert Fox, a dedicated Business coach where we focus on empowering individuals. My journey has been filled with challenges and triumphs, and I'm passionate about helping others navigate their paths to success.",
  website: "theclaritycommunity.com",
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState("Robert Fox");
  const [dmTab, setDmTab] = useState("Inbox");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="-m-6 flex h-[calc(100vh-3.5rem)]">
      {/* DM Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col shrink-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Direct messages</h2>
          <button className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex items-center gap-4 px-4 pt-3 pb-2">
          {["Inbox", "Unread", "Agents"].map((tab) => (
            <button
              key={tab}
              onClick={() => setDmTab(tab)}
              className={cn("text-sm pb-1", dmTab === tab ? "text-foreground font-medium border-b-2 border-foreground" : "text-muted-foreground")}
            >
              {tab === "Agents" ? "✨ Agents" : tab}
            </button>
          ))}
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search for a name" className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        {dmContacts[0].agent && (
          <div className="px-4 py-1">
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">✨ Agents</span>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {dmContacts.map((c) => (
            <button
              key={c.name}
              onClick={() => setActiveContact(c.name)}
              className={cn("flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors", activeContact === c.name && "bg-muted/50")}
            >
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                {c.agent ? "🤖" : c.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
              </div>
              {c.unread && <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Clarity Community</h3>
            <span className="h-2 w-2 rounded-full bg-success" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {chatMessages.map((msg, i) => (
            <div key={i}>
              {msg.date && (
                <div className="flex items-center justify-center my-4">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{msg.date}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                  {msg.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{msg.author}</span>
                    {msg.verified && <span className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-primary-foreground">✓</span>}
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-foreground mt-0.5">{msg.text}</p>
                  {msg.replies && (
                    <button className="mt-1 text-xs text-primary hover:underline">{msg.replies} replies · view thread</button>
                  )}
                  {msg.reactions && (
                    <div className="flex gap-1 mt-1">
                      {msg.reactions.map((r) => (
                        <span key={r} className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs">{r}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Message input */}
        <div className="px-5 py-3 border-t border-border">
          <div className="rounded-lg border border-border bg-background px-4 py-3">
            <input type="text" placeholder="Message Calvin Parks" className="w-full text-sm placeholder:text-muted-foreground focus:outline-none bg-transparent" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Smile className="h-4 w-4 cursor-pointer hover:text-foreground" />
                <Video className="h-4 w-4 cursor-pointer hover:text-foreground" />
                <Image className="h-4 w-4 cursor-pointer hover:text-foreground" />
                <Hash className="h-4 w-4 cursor-pointer hover:text-foreground" />
                <AtSign className="h-4 w-4 cursor-pointer hover:text-foreground" />
                <Paperclip className="h-4 w-4 cursor-pointer hover:text-foreground" />
                <Mic className="h-4 w-4 cursor-pointer hover:text-foreground" />
              </div>
              <button className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Panel */}
      <div className="w-72 border-l border-border bg-card p-5 overflow-y-auto shrink-0">
        <h3 className="text-sm font-semibold text-foreground mb-4">Profile</h3>
        <div className="text-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary mx-auto mb-2">RF</div>
          <p className="text-sm font-semibold text-foreground">{profileData.name}</p>
          <p className="text-xs text-muted-foreground">{profileData.role}</p>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4 text-xs text-muted-foreground">
          <span>About</span><span>Posts</span><span>Comments</span><span>Spaces</span>
        </div>
        <div className="space-y-3 text-xs">
          <p className="text-muted-foreground">✉ {profileData.email}</p>
          <p className="text-muted-foreground">📍 {profileData.location}</p>
          <p className="text-muted-foreground">📅 Member since {profileData.memberSince}</p>
          <div>
            <p className="font-medium text-foreground mb-1">Tags</p>
            <div className="flex gap-1.5">
              {profileData.tags.map((t) => (
                <span key={t} className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Bio</p>
            <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
