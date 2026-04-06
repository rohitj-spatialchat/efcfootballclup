import { Send, Smile, Paperclip, AtSign, Mic, Image, Video, Hash, Trash2, Bold, Italic, Underline, Strikethrough, Link, List, ListOrdered, Plus, ChevronDown, Clock, Calendar } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage, EMOJI_OPTIONS } from "@/lib/chatData";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface ChatMessageAreaProps {
  activeContact: string;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onReact: (msgId: string, emoji: string) => void;
  onDelete: (msgId: string) => void;
}

// Parse simple markdown-like formatting to HTML
function parseFormatting(text: string): string {
  let result = text;
  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text*
  result = result.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // Underline: __text__
  result = result.replace(/__(.+?)__/g, '<u>$1</u>');
  // Strikethrough: ~~text~~
  result = result.replace(/~~(.+?)~~/g, '<s>$1</s>');
  // Links: [text](url)
  result = result.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="text-primary underline">$1</a>');
  return result;
}

export default function ChatMessageArea({ activeContact, messages, onSend, onReact, onDelete }: ChatMessageAreaProps) {
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const [threadOpen, setThreadOpen] = useState<ChatMessage | null>(null);
  const [threadReply, setThreadReply] = useState("");
  const [showFormatBar, setShowFormatBar] = useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [scheduledMsg, setScheduledMsg] = useState<{ text: string; time: string } | null>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [customTimeOpen, setCustomTimeOpen] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("09:00");
  const editorRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const getEditorText = useCallback((): string => {
    if (!editorRef.current) return "";
    return editorRef.current.innerHTML === "<br>" ? "" : editorRef.current.innerHTML;
  }, []);

  const getPlainText = useCallback((): string => {
    if (!editorRef.current) return "";
    return editorRef.current.innerText.trim();
  }, []);

  const clearEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  }, []);

  const handleSend = useCallback(() => {
    const text = getPlainText();
    if (!text) return;
    // Get the HTML content for rich formatting
    const html = getEditorText();
    // Send as plain text (the formatting markers are in the HTML)
    onSend(convertHtmlToMarkdown(html));
    clearEditor();
  }, [getPlainText, getEditorText, clearEditor, onSend]);

  const handleScheduleSend = useCallback((label: string) => {
    const text = getPlainText();
    if (!text) {
      toast({ title: "No message to schedule", description: "Type a message first." });
      return;
    }
    toast({
      title: "Message scheduled",
      description: `Your message will be sent ${label}.`,
    });
    clearEditor();
  }, [getPlainText, clearEditor, toast]);

  const handleCustomSchedule = useCallback(() => {
    if (!customDate || !customTime) {
      toast({ title: "Please select date and time" });
      return;
    }
    const text = getPlainText();
    if (!text) {
      toast({ title: "No message to schedule", description: "Type a message first." });
      return;
    }
    const dateStr = new Date(`${customDate}T${customTime}`).toLocaleString([], {
      weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    });
    toast({
      title: "Message scheduled",
      description: `Your message will be sent on ${dateStr}.`,
    });
    clearEditor();
    setCustomTimeOpen(false);
    setCustomDate("");
    setCustomTime("09:00");
  }, [customDate, customTime, getPlainText, clearEditor, toast]);

  // Convert HTML back to simple markdown for storage
  function convertHtmlToMarkdown(html: string): string {
    let text = html;
    text = text.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    text = text.replace(/<b>(.*?)<\/b>/g, '**$1**');
    text = text.replace(/<em>(.*?)<\/em>/g, '*$1*');
    text = text.replace(/<i>(.*?)<\/i>/g, '*$1*');
    text = text.replace(/<u>(.*?)<\/u>/g, '__$1__');
    text = text.replace(/<s>(.*?)<\/s>/g, '~~$1~~');
    text = text.replace(/<strike>(.*?)<\/strike>/g, '~~$1~~');
    text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');
    text = text.replace(/<li>(.*?)<\/li>/g, '• $1\n');
    text = text.replace(/<\/?[^>]+(>|$)/g, '');
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    return text.trim();
  }

  const execCommand = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const handleInsertLink = () => {
    if (linkUrl) {
      const text = linkText || linkUrl;
      editorRef.current?.focus();
      document.execCommand('insertHTML', false, `<a href="${linkUrl}" target="_blank" class="text-primary underline">${text}</a>`);
    }
    setLinkDialogOpen(false);
    setLinkText("");
    setLinkUrl("");
  };

  const insertEmoji = (emoji: string) => {
    editorRef.current?.focus();
    document.execCommand('insertText', false, emoji);
    setEmojiPickerOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Keyboard shortcuts
    if (e.metaKey || e.ctrlKey) {
      if (e.key === 'b') { e.preventDefault(); execCommand('bold'); }
      if (e.key === 'i') { e.preventDefault(); execCommand('italic'); }
      if (e.key === 'u') { e.preventDefault(); execCommand('underline'); }
    }
  };

  // Tomorrow at 9 AM
  const getTomorrow9AM = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(9, 0, 0, 0);
    return d.toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  // Next Monday at 9 AM
  const getNextMonday9AM = () => {
    const d = new Date();
    const day = d.getDay();
    const diff = day === 0 ? 1 : 8 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(9, 0, 0, 0);
    return d.toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{activeContact}</h3>
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>

      {/* Messages */}
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
                <p className="text-sm text-foreground mt-0.5" dangerouslySetInnerHTML={{ __html: parseFormatting(msg.text) }} />

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
                  <button onClick={() => onDelete(msg.id)} className="h-7 w-7 flex items-center justify-center rounded hover:bg-destructive/10 transition-colors" title="Delete">
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rich Message Input */}
      <div className="px-5 py-3 border-t border-border">
        <div className="rounded-lg border border-border bg-background">
          {/* Formatting toolbar */}
          {showFormatBar && (
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-border flex-wrap">
              <button onClick={() => execCommand('bold')} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Bold (Ctrl+B)">
                <Bold className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => execCommand('italic')} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Italic (Ctrl+I)">
                <Italic className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => execCommand('underline')} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Underline (Ctrl+U)">
                <Underline className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => execCommand('strikeThrough')} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Strikethrough">
                <Strikethrough className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <button onClick={() => setLinkDialogOpen(true)} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Insert Link">
                <Link className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => execCommand('insertOrderedList')} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Numbered List">
                <ListOrdered className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => execCommand('insertUnorderedList')} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Bulleted List">
                <List className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          )}

          {/* Editable area */}
          <div
            ref={editorRef}
            contentEditable
            onKeyDown={handleKeyDown}
            data-placeholder={`Message ${activeContact}...`}
            className="w-full min-h-[40px] max-h-[120px] overflow-y-auto text-sm text-foreground px-4 py-3 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-border">
            <div className="flex items-center gap-1">
              <button onClick={() => toast({ title: "Attachments", description: "File picker would open here." })} className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors" title="Add attachment">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => setShowFormatBar(prev => !prev)} className={cn("h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors text-xs font-bold", showFormatBar && "bg-muted text-foreground")} title="Formatting">
                <span className="text-muted-foreground font-serif text-sm">Aa</span>
              </button>

              {/* Emoji picker */}
              <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
                <PopoverTrigger asChild>
                  <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Emoji">
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" side="top" align="start">
                  <div className="grid grid-cols-10 gap-1">
                    {["😀","😂","😍","🤔","😢","😡","👍","👎","❤️","🔥","🎉","🙌","💯","🚀","💡","👀","😎","🤩","😇","🥳","✨","💪","🙏","😊","🤗","😏","😬","🤷","👏","💕"].map(e => (
                      <button key={e} onClick={() => insertEmoji(e)} className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted text-base transition-colors">{e}</button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <button onClick={() => toast({ title: "Mentions", description: "Type @ followed by a name to mention someone." })} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Mention">
                <AtSign className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="w-px h-5 bg-border mx-0.5" />
              <button onClick={() => toast({ title: "Video clip", description: "Record a short video clip to share." })} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Video clip">
                <Video className="h-4 w-4 text-muted-foreground" />
              </button>
              <button onClick={() => toast({ title: "Voice message", description: "Hold to record a voice message." })} className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted transition-colors" title="Voice message">
                <Mic className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Send + Send Later */}
            <div className="flex items-center">
              <button onClick={handleSend} className="h-8 px-3 rounded-l-md bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                <Send className="h-4 w-4" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-8 px-1.5 rounded-r-md bg-primary border-l border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Schedule message</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleScheduleSend(`tomorrow at 9:00 AM`)}>
                    <Clock className="h-4 w-4 mr-2" />
                    Tomorrow at 9:00 AM
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleScheduleSend(`next Monday at 9:00 AM`)}>
                    <Clock className="h-4 w-4 mr-2" />
                    Next Monday at 9:00 AM
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCustomTimeOpen(true)} className="text-primary font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    Custom time
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Insert Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Insert Link</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Text</label>
              <input type="text" value={linkText} onChange={e => setLinkText(e.target.value)} placeholder="Link text" className="w-full h-9 mt-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">URL</label>
              <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://" className="w-full h-9 mt-1 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <button onClick={handleInsertLink} className="w-full h-9 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">Insert</button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Schedule Dialog */}
      <Dialog open={customTimeOpen} onOpenChange={setCustomTimeOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Schedule Message</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Date</label>
              <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full h-9 mt-1 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Time</label>
              <input type="time" value={customTime} onChange={e => setCustomTime(e.target.value)} className="w-full h-9 mt-1 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
            </div>
            <button onClick={handleCustomSchedule} className="w-full h-9 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">Schedule</button>
          </div>
        </DialogContent>
      </Dialog>

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
