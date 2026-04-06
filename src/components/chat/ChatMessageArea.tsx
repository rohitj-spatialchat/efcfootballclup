import { Send, Smile, Paperclip, AtSign, Mic, Image, Video, Hash, Trash2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage, EMOJI_OPTIONS } from "@/lib/chatData";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ChatMessageAreaProps {
  activeContact: string;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onReact: (msgId: string, emoji: string) => void;
  onDelete: (msgId: string) => void;
}

export default function ChatMessageArea({ activeContact, messages, onSend, onReact, onDelete }: ChatMessageAreaProps) {
  const [messageInput, setMessageInput] = useState("");
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const [threadOpen, setThreadOpen] = useState<ChatMessage | null>(null);
  const [threadReply, setThreadReply] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    onSend(messageInput);
    setMessageInput("");
  };

  const handleMediaClick = (type: string) => {
    toast({ title: `${type}`, description: `${type} upload would open here in production.` });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{activeContact}</h3>
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} onMouseEnter={() => setHoveredMsg(msg.id)} onMouseLeave={() => setHoveredMsg(null)}>
            {msg.date && (
              <div className="flex items-center justify-center my-4">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{msg.date}</span>
              </div>
            )}
            <div className="flex items-start gap-3 group relative">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                {msg.author === "Demo User" ? "DU" : msg.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{msg.author}</span>
                  {msg.verified && <span className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[8px] text-primary-foreground">✓</span>}
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-foreground mt-0.5">{msg.text}</p>

                {/* Reactions display */}
                {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {Object.entries(msg.reactions).map(([emoji, users]) => (
                      <button
                        key={emoji}
                        onClick={() => onReact(msg.id, emoji)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-colors",
                          users.includes("Demo User") ? "border-primary/50 bg-primary/10" : "border-border hover:border-primary/30"
                        )}
                        title={users.join(", ")}
                      >
                        {emoji} {users.length}
                      </button>
                    ))}
                  </div>
                )}

                {msg.replies && (
                  <button onClick={() => setThreadOpen(msg)} className="mt-1 text-xs text-primary hover:underline">{msg.replies} replies · view thread</button>
                )}
              </div>

              {/* Hover actions */}
              {hoveredMsg === msg.id && (
                <div className="absolute right-0 top-0 flex items-center gap-0.5 bg-card border border-border rounded-md shadow-sm p-0.5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="React">
                        <Smile className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2" side="top">
                      <div className="flex gap-1">
                        {EMOJI_OPTIONS.map((e) => (
                          <button key={e} onClick={() => onReact(msg.id, e)} className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted text-base transition-colors">{e}</button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <button onClick={() => { onDelete(msg.id); }} className="h-7 w-7 flex items-center justify-center rounded hover:bg-destructive/10 transition-colors" title="Delete">
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="px-5 py-3 border-t border-border">
        <div className="rounded-lg border border-border bg-background px-4 py-3">
          <input type="text" placeholder={`Message ${activeContact}...`} value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="w-full text-sm placeholder:text-muted-foreground focus:outline-none bg-transparent" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Smile onClick={() => handleMediaClick("Emoji")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
              <Video onClick={() => handleMediaClick("Video")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
              <Image onClick={() => handleMediaClick("Image")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
              <Hash onClick={() => handleMediaClick("Channel")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
              <AtSign onClick={() => handleMediaClick("Mention")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
              <Paperclip onClick={() => handleMediaClick("Attachment")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
              <Mic onClick={() => handleMediaClick("Voice message")} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
            </div>
            <button onClick={handleSend} disabled={!messageInput.trim()} className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Thread Dialog */}
      <Dialog open={!!threadOpen} onOpenChange={() => setThreadOpen(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Thread</DialogTitle></DialogHeader>
          {threadOpen && (
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                  {threadOpen.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{threadOpen.author} <span className="font-normal text-xs text-muted-foreground">{threadOpen.time}</span></p>
                  <p className="text-sm text-foreground">{threadOpen.text}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{threadOpen.replies} replies</p>
              <div className="flex gap-2">
                <input type="text" value={threadReply} onChange={(e) => setThreadReply(e.target.value)} placeholder="Reply in thread..." className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                <button onClick={() => { if (threadReply.trim()) { setThreadReply(""); toast({ title: "Reply sent" }); }}} className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90">Reply</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
