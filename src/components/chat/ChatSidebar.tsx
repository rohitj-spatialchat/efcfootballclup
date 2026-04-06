import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  name: string;
  time: string;
  preview: string;
  agent?: boolean;
  unread?: boolean;
  active?: boolean;
}

interface ChatSidebarProps {
  contacts: Contact[];
  activeContact: string;
  setActiveContact: (name: string) => void;
  dmTab: string;
  setDmTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function ChatSidebar({ contacts, activeContact, setActiveContact, dmTab, setDmTab, searchQuery, setSearchQuery }: ChatSidebarProps) {
  const filtered = searchQuery
    ? contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : contacts;

  const displayContacts = dmTab === "Unread" ? filtered.filter(c => c.unread) : dmTab === "Agents" ? filtered.filter(c => c.agent) : filtered;

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col shrink-0">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Direct messages</h2>
      </div>
      <div className="flex items-center gap-4 px-4 pt-3 pb-2">
        {["Inbox", "Unread", "Agents"].map((tab) => (
          <button key={tab} onClick={() => setDmTab(tab)} className={cn("text-sm pb-1", dmTab === tab ? "text-foreground font-medium border-b-2 border-foreground" : "text-muted-foreground")}>
            {tab === "Agents" ? "✨ Agents" : tab}
          </button>
        ))}
      </div>
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search for a name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {displayContacts.map((c) => (
          <button key={c.name} onClick={() => setActiveContact(c.name)} className={cn("flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors", activeContact === c.name && "bg-muted/50")}>
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
        {displayContacts.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No conversations found</p>}
      </div>
    </div>
  );
}
