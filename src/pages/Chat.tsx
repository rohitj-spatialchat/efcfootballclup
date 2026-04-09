import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { initialMessages, ChatMessage } from "@/lib/chatData";
import { useAuth } from "@/contexts/AuthContext";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessageArea from "@/components/chat/ChatMessageArea";
import ChatProfilePanel from "@/components/chat/ChatProfilePanel";

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

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

let _nextId = 1000;

export default function ChatPage() {
  const { user } = useAuth();
  const currentUserName = user ? `${user.firstName} ${user.lastName}` : "Guest";
  const [activeContact, setActiveContact] = useState("Robert Fox");
  const [dmTab, setDmTab] = useState("Inbox");
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const currentMessages = chatMessages[activeContact] || [];

  const handleSend = useCallback((text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${++_nextId}`,
      author: currentUserName,
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      text,
    };
    setChatMessages(prev => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMsg],
    }));

    setTimeout(() => {
      const replies = [
        "That's a great point! Let me think about it.",
        "Absolutely agree with you on that.",
        "Interesting perspective! I'll share some thoughts later.",
        "Thanks for sharing! Really appreciate it.",
        "Love this — let's discuss more soon!",
      ];
      const reply: ChatMessage = {
        id: `msg-${++_nextId}`,
        author: activeContact.split(",")[0].trim(),
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        text: replies[Math.floor(Math.random() * replies.length)],
      };
      setChatMessages(prev => ({
        ...prev,
        [activeContact]: [...(prev[activeContact] || []), reply],
      }));
    }, 1500 + Math.random() * 2000);
  }, [activeContact]);

  const handleReact = useCallback((msgId: string, emoji: string) => {
    setChatMessages(prev => {
      const msgs = prev[activeContact] || [];
      return {
        ...prev,
        [activeContact]: msgs.map(m => {
          if (m.id !== msgId) return m;
          const reactions = { ...(m.reactions || {}) };
          const users = reactions[emoji] ? [...reactions[emoji]] : [];
          if (users.includes(currentUserName)) {
            const filtered = users.filter(u => u !== currentUserName);
            if (filtered.length === 0) delete reactions[emoji];
            else reactions[emoji] = filtered;
          } else {
            reactions[emoji] = [...users, currentUserName];
          }
          return { ...m, reactions };
        }),
      };
    });
  }, [activeContact]);

  const handleDelete = useCallback((msgId: string) => {
    setChatMessages(prev => ({
      ...prev,
      [activeContact]: (prev[activeContact] || []).filter(m => m.id !== msgId),
    }));
    toast({ title: "Message deleted" });
  }, [activeContact, toast]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="-m-6 flex h-[calc(100vh-3.5rem)]">
      <ChatSidebar
        contacts={dmContacts}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        dmTab={dmTab}
        setDmTab={setDmTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ChatMessageArea
        activeContact={activeContact}
        messages={currentMessages}
        onSend={handleSend}
        onReact={handleReact}
        onDelete={handleDelete}
      />
      <ChatProfilePanel activeContact={activeContact} />
    </motion.div>
  );
}
