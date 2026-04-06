export interface ChatMessage {
  id: string;
  author: string;
  time: string;
  text: string;
  date?: string;
  verified?: boolean;
  replies?: number;
  reactions?: Record<string, string[]>; // emoji -> list of user names
}

export interface ContactProfile {
  role: string;
  email: string;
  location: string;
  memberSince: string;
  tags: string[];
  bio: string;
}

export const profilesData: Record<string, ContactProfile> = {
  "Clarity Coach": {
    role: "AI Coach Agent",
    email: "coach@claritycommunity.com",
    location: "Cloud ☁️",
    memberSince: "Jan 2024",
    tags: ["Agent", "AI", "Coach"],
    bio: "Your personal AI-powered coaching assistant. I help you stay accountable, set goals, and reflect on progress.",
  },
  "Carlos Ramirez": {
    role: "Life Coach",
    email: "carlos@lifecoachpro.com",
    location: "Miami, FL",
    memberSince: "March 2021",
    tags: ["Pro", "Mentor", "Speaker"],
    bio: "Passionate about helping people find clarity and purpose. Specializing in career transitions and personal branding.",
  },
  "Robert, Edwin +2": {
    role: "Group Chat",
    email: "—",
    location: "Various",
    memberSince: "Sep 2023",
    tags: ["Group", "Mastermind"],
    bio: "A mastermind group focused on scaling coaching businesses and sharing weekly wins.",
  },
  "Robert Fox": {
    role: "Business Coach",
    email: "robertfox@thebusinesscoach.com",
    location: "New York, NY",
    memberSince: "July 2020",
    tags: ["Editor", "Pro", "Creator"],
    bio: "I'm Robert Fox, a dedicated Business coach focused on empowering individuals. Passionate about helping others navigate their paths to success.",
  },
  "Dianne Russell": {
    role: "Wellness Coach",
    email: "dianne@wellnesswithin.co",
    location: "Austin, TX",
    memberSince: "Nov 2021",
    tags: ["Wellness", "Creator", "Top Contributor"],
    bio: "Holistic wellness coach helping high-performers balance ambition with well-being. Yoga lover and plant mom 🌿",
  },
  "Mei Wong": {
    role: "Executive Coach",
    email: "mei@meiwongcoaching.com",
    location: "San Francisco, CA",
    memberSince: "Feb 2022",
    tags: ["Executive", "Pro", "Leadership"],
    bio: "Former tech exec turned leadership coach. I help founders and C-suite leaders unlock their next level.",
  },
  "Kwame Adebayo": {
    role: "Mindset Coach",
    email: "kwame@mindsetshift.io",
    location: "London, UK",
    memberSince: "Aug 2021",
    tags: ["Mindset", "Speaker", "Author"],
    bio: "Author of 'Shift Your Story'. I coach ambitious professionals on overcoming limiting beliefs and building confidence.",
  },
  "Ravi Patel": {
    role: "Sales Coach",
    email: "ravi@closewithconfidence.com",
    location: "Chicago, IL",
    memberSince: "Jan 2023",
    tags: ["Sales", "Pro", "Mentor"],
    bio: "Helping coaches and consultants master the art of ethical selling. 10+ years in B2B sales.",
  },
  "Esther Howard": {
    role: "Career Coach",
    email: "esther@nextchaptercareers.com",
    location: "Seattle, WA",
    memberSince: "May 2022",
    tags: ["Career", "HR", "Creator"],
    bio: "I partner with mid-career professionals to navigate career pivots with clarity and confidence.",
  },
};

let _id = 0;
const mid = () => `msg-${++_id}`;

export const initialMessages: Record<string, ChatMessage[]> = {
  "Clarity Coach": [
    { id: mid(), author: "Clarity Coach", time: "9:40 AM", text: "Good morning! 🌅 Ready for your weekly reflection?", date: "TODAY" },
    { id: mid(), author: "Demo User", time: "9:42 AM", text: "Yes! Let's do it." },
    { id: mid(), author: "Clarity Coach", time: "9:43 AM", text: "Great! What was your biggest win this week?", reactions: { "🔥": ["Demo User"] } },
    { id: mid(), author: "Demo User", time: "9:45 AM", text: "I finally launched my new coaching program!" },
    { id: mid(), author: "Clarity Coach", time: "9:45 AM", text: "That's amazing! 🎉 Launching is one of the hardest steps. How did it feel?" },
  ],
  "Carlos Ramirez": [
    { id: mid(), author: "Carlos Ramirez", time: "9:50 AM", text: "Hey! Have you tried the new community spaces feature?", date: "YESTERDAY" },
    { id: mid(), author: "Demo User", time: "10:02 AM", text: "Not yet — what's it like?" },
    { id: mid(), author: "Carlos Ramirez", time: "10:05 AM", text: "It's like having mini-communities within our community. Perfect for niche topics.", verified: true },
    { id: mid(), author: "Carlos Ramirez", time: "10:10 AM", text: "I'm creating a space where clients can connect and share progress. You should join!", reactions: { "👍": ["Demo User", "Mei Wong"] } },
    { id: mid(), author: "Demo User", time: "10:18 AM", text: "That sounds great — count me in!" },
  ],
  "Robert, Edwin +2": [
    { id: mid(), author: "Robert Fox", time: "10:00 AM", text: "Hey team, how's everyone feeling about this week's mastermind topic?", date: "MONDAY, OCTOBER 20TH" },
    { id: mid(), author: "Edwin Clark", time: "10:12 AM", text: "I think pricing strategies is perfect. I've been struggling with that lately." },
    { id: mid(), author: "Sarah Kim", time: "10:15 AM", text: "Same here! I keep undercharging and it's not sustainable 😅" },
    { id: mid(), author: "Demo User", time: "10:22 AM", text: "I raised my prices last month — happy to share what I learned.", reactions: { "🙌": ["Robert Fox", "Edwin Clark", "Sarah Kim"] } },
    { id: mid(), author: "Robert Fox", time: "10:30 AM", text: "Love that! Let's deep-dive on Thursday's call. How you're feeling about this week?" },
  ],
  "Robert Fox": [
    { id: mid(), author: "Ravi Patel", time: "1:55 PM", text: "What's one small habit that's helped you grow your coaching business lately?", date: "MONDAY, OCTOBER 20TH" },
    { id: mid(), author: "Kristin Wilson", time: "2:03 PM", text: "Posting every day — even when it's not perfect. Consistency > perfection.", verified: true, replies: 2 },
    { id: mid(), author: "Robert Fox", time: "2:25 PM", text: "100%! Showing up daily has been a game-changer for me too." },
    { id: mid(), author: "Kwame Adebayo", time: "2:42 PM", text: "Same here. I started sharing wins weekly — builds trust and shows momentum 🚀", reactions: { "🙌": ["Demo User"] } },
    { id: mid(), author: "Carlos Ramirez", time: "7:01 AM", text: "Morning CEO time. Just 30 mins a day to plan, reflect, and set intentions. Huge shift.", date: "TODAY" },
    { id: mid(), author: "Mei Wong", time: "7:06 AM", text: "Mine's celebrating every tiny win. Keeps the energy high!", verified: true },
  ],
  "Dianne Russell": [
    { id: mid(), author: "Dianne Russell", time: "10:30 AM", text: "I just crossed a new income milestone this month! 💰", date: "SUNDAY, OCTOBER 19TH" },
    { id: mid(), author: "Demo User", time: "10:35 AM", text: "Congratulations Dianne! What was the key change?" },
    { id: mid(), author: "Dianne Russell", time: "10:40 AM", text: "I started offering group coaching alongside 1:1. It's been a game-changer for leveraging my time.", reactions: { "🎉": ["Demo User", "Carlos Ramirez"], "💡": ["Ravi Patel"] } },
    { id: mid(), author: "Dianne Russell", time: "11:00 AM", text: "Also, I redesigned my onboarding flow — clients now feel supported from day one." },
    { id: mid(), author: "Demo User", time: "11:08 AM", text: "Would love to learn more about your onboarding process!" },
  ],
  "Mei Wong": [
    { id: mid(), author: "Mei Wong", time: "12:00 PM", text: "Just finished a leadership workshop for a Fortune 500 company! 🏢", date: "TODAY" },
    { id: mid(), author: "Demo User", time: "12:10 PM", text: "That's incredible! How did it go?" },
    { id: mid(), author: "Mei Wong", time: "12:15 PM", text: "Really well! The team was engaged and we had some breakthrough moments.", verified: true },
    { id: mid(), author: "Mei Wong", time: "12:30 PM", text: "I used a new framework for emotional intelligence mapping. Want me to share it?", reactions: { "🔥": ["Demo User"], "📚": ["Kwame Adebayo"] } },
    { id: mid(), author: "Demo User", time: "12:45 PM", text: "Wanted to share something exciting — yes please share the framework!" },
  ],
  "Kwame Adebayo": [
    { id: mid(), author: "Kwame Adebayo", time: "11:00 AM", text: "Working on a new chapter for my book about overcoming imposter syndrome.", date: "SATURDAY, OCTOBER 18TH" },
    { id: mid(), author: "Demo User", time: "11:20 AM", text: "That's such an important topic. Many coaches struggle with it." },
    { id: mid(), author: "Kwame Adebayo", time: "11:25 AM", text: "Exactly! Even successful coaches feel it. The key is reframing it as a sign of growth.", reactions: { "💯": ["Demo User"] } },
    { id: mid(), author: "Kwame Adebayo", time: "1:00 PM", text: "I was thinking about our niche clarity session — can we move it to Thursday?", date: "TODAY" },
    { id: mid(), author: "Demo User", time: "1:03 PM", text: "Thursday works perfectly for me!" },
  ],
  "Ravi Patel": [
    { id: mid(), author: "Ravi Patel", time: "12:30 PM", text: "Just closed a $5K coaching package using the framework we discussed! 🎯", date: "FRIDAY, OCTOBER 17TH" },
    { id: mid(), author: "Demo User", time: "12:45 PM", text: "That's awesome Ravi! The consultative selling approach?" },
    { id: mid(), author: "Ravi Patel", time: "12:50 PM", text: "Yes! Asking the right discovery questions made all the difference.", verified: true, reactions: { "🚀": ["Demo User", "Carlos Ramirez"] } },
    { id: mid(), author: "Ravi Patel", time: "1:10 PM", text: "I made a new client offer today! Testing a 90-day intensive format.", date: "TODAY" },
    { id: mid(), author: "Demo User", time: "1:18 PM", text: "Love the intensive format — what's included?" },
  ],
  "Esther Howard": [
    { id: mid(), author: "Esther Howard", time: "9:00 AM", text: "Had an incredible career pivot session with a client yesterday!", date: "WEDNESDAY, OCTOBER 15TH" },
    { id: mid(), author: "Demo User", time: "9:15 AM", text: "Love hearing that! What industry are they pivoting to?" },
    { id: mid(), author: "Esther Howard", time: "9:20 AM", text: "From corporate finance to coaching, actually! Full circle moment 😄", reactions: { "❤️": ["Demo User"] } },
    { id: mid(), author: "Esther Howard", time: "9:30 AM", text: "Hope you're doing well. Any plans for the upcoming community retreat?" },
    { id: mid(), author: "Demo User", time: "9:45 AM", text: "Definitely planning to attend! It'll be great to connect in person." },
  ],
};

export const EMOJI_OPTIONS = ["👍", "❤️", "🔥", "🎉", "🙌", "😂", "💯", "🚀", "💡", "👀"];
