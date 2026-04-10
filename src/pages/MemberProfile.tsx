import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Mail, Calendar, Trophy, Users, MessageCircle, UserPlus, Star, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTeamLogo } from "@/lib/teamLogos";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAuth, dummyUsers, DummyUser } from "@/contexts/AuthContext";
import { getUserAvatarUrl } from "@/lib/userAvatar";

const memberData: Record<string, {
  name: string;
  email: string;
  country: string;
  flag: string;
  role: string;
  position: string;
  team: string;
  mpu: number;
  joined: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  tags: string[];
  experience: { title: string; org: string; period: string }[];
  posts: { title: string; likes: number; comments: number; date: string }[];
  achievements: { label: string; progress: number; icon: string }[];
}> = {
  "kwame-adebayo": {
    name: "Kwame Adebayo",
    email: "adebayo@gmail.com",
    country: "Netherlands",
    flag: "🇳🇱",
    role: "Member",
    position: "Nutritionist",
    team: "AFC Ajax",
    mpu: 920,
    joined: "Apr 12, 2024",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Sports nutritionist with 8+ years of experience in elite football. Passionate about optimizing athlete performance through evidence-based nutrition strategies.",
    followers: 142,
    following: 89,
    tags: ["Nutrition", "Performance", "Recovery", "Diet Planning"],
    experience: [
      { title: "Head Nutritionist", org: "AFC Ajax Academy", period: "2022 - Present" },
      { title: "Sports Dietitian", org: "KNVB", period: "2019 - 2022" },
      { title: "Clinical Nutritionist", org: "Amsterdam Medical Centre", period: "2016 - 2019" },
    ],
    posts: [
      { title: "Pre-match nutrition protocols for elite players", likes: 34, comments: 12, date: "2 days ago" },
      { title: "Hydration strategies during summer training", likes: 28, comments: 8, date: "1 week ago" },
      { title: "Recovery meals: What the science says", likes: 45, comments: 15, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Community Contributor", progress: 85, icon: "⭐" },
      { label: "Knowledge Sharer", progress: 70, icon: "📚" },
      { label: "Networking Pro", progress: 60, icon: "🤝" },
    ],
  },
  "robert-fox": {
    name: "Robert Fox",
    email: "robertfox@gmail.com",
    country: "Italy",
    flag: "🇮🇹",
    role: "Member",
    position: "Physiotherapist",
    team: "AC Milan",
    mpu: 940,
    joined: "Mar 5, 2024",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Senior physiotherapist specializing in football injury prevention and rehabilitation. Working with professional athletes to maximize recovery and performance.",
    followers: 230,
    following: 115,
    tags: ["Physiotherapy", "Rehabilitation", "Injury Prevention", "Sports Medicine"],
    experience: [
      { title: "Senior Physiotherapist", org: "AC Milan", period: "2023 - Present" },
      { title: "Lead Physio", org: "AS Roma", period: "2020 - 2023" },
      { title: "Sports Physiotherapist", org: "Italian FA", period: "2017 - 2020" },
    ],
    posts: [
      { title: "ACL recovery timelines: A modern approach", likes: 56, comments: 22, date: "3 days ago" },
      { title: "Prehab exercises every footballer should do", likes: 41, comments: 14, date: "1 week ago" },
      { title: "Managing hamstring injuries in-season", likes: 38, comments: 11, date: "3 weeks ago" },
    ],
    achievements: [
      { label: "Community Contributor", progress: 92, icon: "⭐" },
      { label: "Top Expert", progress: 80, icon: "🏆" },
      { label: "Mentor", progress: 65, icon: "🎓" },
    ],
  },
  "mei-wong": {
    name: "Mei Wong",
    email: "meiwong@gmail.com",
    country: "Italy",
    flag: "🇮🇹",
    role: "Member",
    position: "Fitness Coach",
    team: "Inter Milan",
    mpu: 800,
    joined: "Jun 22, 2024",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Certified fitness and conditioning coach with a focus on building strength, speed, and agility in professional footballers.",
    followers: 67,
    following: 43,
    tags: ["Fitness", "Conditioning", "Strength", "Agility"],
    experience: [
      { title: "Fitness Coach", org: "Inter Milan Youth", period: "2023 - Present" },
      { title: "Conditioning Specialist", org: "Freelance", period: "2020 - 2023" },
    ],
    posts: [
      { title: "Building explosive power for wingers", likes: 22, comments: 6, date: "5 days ago" },
      { title: "Off-season conditioning programs", likes: 19, comments: 4, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Rising Star", progress: 55, icon: "🌟" },
      { label: "Active Learner", progress: 70, icon: "📖" },
    ],
  },
  "dianne-russell": {
    name: "Dianne Russell",
    email: "drussell@yahoo.com",
    country: "Portugal",
    flag: "🇵🇹",
    role: "Moderator",
    position: "Head Scout",
    team: "SL Benfica",
    mpu: 920,
    joined: "Mar 9, 2023",
    avatar: "https://i.pravatar.cc/150?img=23",
    bio: "Experienced football scout with an eye for emerging talent across European and South American leagues. Data-driven scouting methodology advocate.",
    followers: 312,
    following: 178,
    tags: ["Scouting", "Talent ID", "Data Analysis", "Youth Development"],
    experience: [
      { title: "Head Scout", org: "SL Benfica", period: "2022 - Present" },
      { title: "Regional Scout", org: "Sporting CP", period: "2018 - 2022" },
      { title: "Scout Analyst", org: "Portuguese FA", period: "2015 - 2018" },
    ],
    posts: [
      { title: "Modern scouting: Beyond the eye test", likes: 67, comments: 25, date: "1 day ago" },
      { title: "Top U-18 talents to watch this season", likes: 89, comments: 34, date: "1 week ago" },
      { title: "Using data to identify hidden gems", likes: 54, comments: 18, date: "3 weeks ago" },
    ],
    achievements: [
      { label: "Community Leader", progress: 95, icon: "👑" },
      { label: "Top Contributor", progress: 88, icon: "⭐" },
      { label: "Mentor", progress: 75, icon: "🎓" },
    ],
  },
  "kristin-watson": {
    name: "Kristin Watson",
    email: "kristin@watson.com",
    country: "Portugal",
    flag: "🇵🇹",
    role: "Admin",
    position: "Team Manager",
    team: "FC Porto",
    mpu: 920,
    joined: "Sep 19, 2022",
    avatar: "https://i.pravatar.cc/150?img=32",
    bio: "Team management professional with expertise in operations, logistics, and player welfare. Ensuring everything runs smoothly behind the scenes.",
    followers: 456,
    following: 201,
    tags: ["Management", "Operations", "Logistics", "Leadership"],
    experience: [
      { title: "Team Manager", org: "FC Porto", period: "2021 - Present" },
      { title: "Operations Director", org: "SC Braga", period: "2017 - 2021" },
    ],
    posts: [
      { title: "The unsung hero: Team management in football", likes: 43, comments: 16, date: "4 days ago" },
      { title: "Travel logistics for away European matches", likes: 31, comments: 9, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Community Admin", progress: 100, icon: "🛡️" },
      { label: "Organizer", progress: 90, icon: "📋" },
      { label: "Networking Pro", progress: 82, icon: "🤝" },
    ],
  },
  "carlos-ramirez": {
    name: "Carlos Ramirez",
    email: "ramirez@yahoo.com",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    role: "Member",
    position: "Performance Analyst",
    team: "Arsenal FC",
    mpu: 670,
    joined: "Jul 8, 2024",
    avatar: "https://i.pravatar.cc/150?img=53",
    bio: "Performance analyst leveraging video and data to unlock tactical insights. Focused on set-piece analysis and opposition profiling.",
    followers: 34,
    following: 22,
    tags: ["Performance Analysis", "Tactics", "Video Analysis", "Data"],
    experience: [
      { title: "Junior Analyst", org: "Arsenal FC", period: "2024 - Present" },
      { title: "Intern Analyst", org: "Brentford FC", period: "2023 - 2024" },
    ],
    posts: [
      { title: "Set-piece analysis: Trends in the Premier League", likes: 18, comments: 5, date: "1 week ago" },
    ],
    achievements: [
      { label: "Rising Star", progress: 40, icon: "🌟" },
      { label: "Active Learner", progress: 55, icon: "📖" },
    ],
  },
  "ravi-patel": {
    name: "Ravi Patel",
    email: "ravi@email.com",
    country: "United Kingdom",
    flag: "🇬🇧",
    role: "Moderator",
    position: "Goalkeeper Coach",
    team: "Chelsea FC",
    mpu: 920,
    joined: "Dec 1, 2023",
    avatar: "https://i.pravatar.cc/150?img=59",
    bio: "Specialist goalkeeper coach with UEFA Pro License. Developing the next generation of elite goalkeepers through innovative training methods.",
    followers: 189,
    following: 97,
    tags: ["Goalkeeping", "Coaching", "UEFA Pro", "Youth Development"],
    experience: [
      { title: "GK Coach", org: "Chelsea FC Academy", period: "2023 - Present" },
      { title: "GK Coach", org: "Fulham FC", period: "2019 - 2023" },
      { title: "Assistant GK Coach", org: "QPR", period: "2016 - 2019" },
    ],
    posts: [
      { title: "Modern goalkeeping: Distribution is key", likes: 52, comments: 19, date: "3 days ago" },
      { title: "Training drills for shot-stopping reflexes", likes: 44, comments: 13, date: "1 week ago" },
      { title: "Building mental resilience in young keepers", likes: 37, comments: 10, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Community Moderator", progress: 90, icon: "🛡️" },
      { label: "Top Expert", progress: 85, icon: "🏆" },
      { label: "Mentor", progress: 78, icon: "🎓" },
    ],
  },
  "dr-marco-rossi": {
    name: "Dr. Marco Rossi",
    email: "marco.rossi@efcmpu.com",
    country: "Italy",
    flag: "🇮🇹",
    role: "Admin",
    position: "Medical Director",
    team: "Juventus FC",
    mpu: 2480,
    joined: "Jan 15, 2023",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Board-certified sports medicine physician and Medical Director with 15+ years of experience in elite football. Leading injury prevention research and player welfare initiatives across European clubs.",
    followers: 1240,
    following: 320,
    tags: ["Sports Medicine", "Injury Prevention", "Player Welfare", "Research", "Leadership"],
    experience: [
      { title: "Medical Director", org: "EFC MPU", period: "2023 - Present" },
      { title: "Head of Medical", org: "Juventus FC", period: "2018 - 2023" },
      { title: "Sports Medicine Physician", org: "AS Roma", period: "2013 - 2018" },
    ],
    posts: [
      { title: "Revolutionizing concussion protocols in football", likes: 124, comments: 45, date: "1 day ago" },
      { title: "The future of load management in elite sport", likes: 98, comments: 32, date: "4 days ago" },
      { title: "Annual injury trends report: Key findings", likes: 156, comments: 58, date: "1 week ago" },
    ],
    achievements: [
      { label: "Community Leader", progress: 100, icon: "👑" },
      { label: "Top Expert", progress: 95, icon: "🏆" },
      { label: "Research Pioneer", progress: 88, icon: "🔬" },
    ],
  },
  "sarah-mitchell": {
    name: "Sarah Mitchell",
    email: "sarah.mitchell@efcmpu.com",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    role: "Admin",
    position: "Community Manager",
    team: "Bayern Munich",
    mpu: 2120,
    joined: "Feb 8, 2023",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    bio: "Community engagement specialist driving collaboration across 500+ football professionals. Passionate about building meaningful connections in the sports industry.",
    followers: 890,
    following: 445,
    tags: ["Community Building", "Engagement", "Events", "Content Strategy"],
    experience: [
      { title: "Community Manager", org: "EFC MPU", period: "2023 - Present" },
      { title: "Digital Engagement Lead", org: "Premier League", period: "2020 - 2023" },
      { title: "Social Media Manager", org: "The FA", period: "2017 - 2020" },
    ],
    posts: [
      { title: "Building a thriving football community online", likes: 87, comments: 29, date: "2 days ago" },
      { title: "Event recap: MPU Annual Summit 2025", likes: 112, comments: 41, date: "5 days ago" },
      { title: "Tips for networking at football conferences", likes: 64, comments: 18, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Community Admin", progress: 100, icon: "🛡️" },
      { label: "Top Contributor", progress: 92, icon: "⭐" },
      { label: "Event Organizer", progress: 85, icon: "📋" },
    ],
  },
  "alex-chen": {
    name: "Alex Chen",
    email: "alex.chen@efcmpu.com",
    country: "China",
    flag: "🇨🇳",
    role: "Member",
    position: "Youth Coach",
    team: "Manchester City",
    mpu: 1890,
    joined: "May 20, 2023",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "UEFA A licensed youth development coach specializing in technical development for players aged 12-18. Advocate for holistic player development combining tactical awareness with life skills.",
    followers: 567,
    following: 234,
    tags: ["Youth Development", "Coaching", "Tactical Training", "Player Pathways"],
    experience: [
      { title: "U-16 Head Coach", org: "Manchester City Academy", period: "2023 - Present" },
      { title: "Youth Coach", org: "Shanghai Shenhua", period: "2019 - 2023" },
      { title: "Assistant Coach", org: "Guangzhou FC Academy", period: "2016 - 2019" },
    ],
    posts: [
      { title: "Small-sided games for technical development", likes: 76, comments: 24, date: "3 days ago" },
      { title: "Bridging the gap: Youth to first team", likes: 58, comments: 19, date: "1 week ago" },
      { title: "Decision-making drills for young players", likes: 43, comments: 11, date: "3 weeks ago" },
    ],
    achievements: [
      { label: "Knowledge Sharer", progress: 82, icon: "📚" },
      { label: "Coaching Expert", progress: 75, icon: "🏆" },
      { label: "Mentor", progress: 68, icon: "🎓" },
    ],
  },
  "emma-johansson": {
    name: "Emma Johansson",
    email: "emma.johansson@efcmpu.com",
    country: "Sweden",
    flag: "🇸🇪",
    role: "Member",
    position: "Performance Analyst",
    team: "Real Madrid",
    mpu: 1240,
    joined: "Aug 14, 2023",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "Data-driven performance analyst with expertise in GPS tracking, video analysis, and match intelligence. Translating complex data into actionable coaching insights.",
    followers: 345,
    following: 189,
    tags: ["Performance Analysis", "GPS Tracking", "Video Analysis", "Data Science"],
    experience: [
      { title: "Senior Performance Analyst", org: "Real Madrid", period: "2023 - Present" },
      { title: "Performance Analyst", org: "Malmö FF", period: "2020 - 2023" },
      { title: "Data Analyst", org: "Swedish FA", period: "2018 - 2020" },
    ],
    posts: [
      { title: "GPS load monitoring: Best practices", likes: 62, comments: 21, date: "2 days ago" },
      { title: "Visualizing tactical patterns with data", likes: 48, comments: 15, date: "1 week ago" },
      { title: "Match analysis workflow for coaching staff", likes: 35, comments: 9, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Data Expert", progress: 78, icon: "📊" },
      { label: "Community Contributor", progress: 65, icon: "⭐" },
      { label: "Active Learner", progress: 72, icon: "📖" },
    ],
  },
  "sofia-rodriguez": {
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@efcmpu.com",
    country: "Spain",
    flag: "🇪🇸",
    role: "Member",
    position: "Physiotherapist",
    team: "Atlético Madrid",
    mpu: 980,
    joined: "Oct 3, 2023",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    bio: "Licensed physiotherapist specializing in sports rehabilitation and return-to-play protocols. Focused on evidence-based treatment approaches for elite footballers.",
    followers: 278,
    following: 156,
    tags: ["Physiotherapy", "Rehabilitation", "Return to Play", "Manual Therapy"],
    experience: [
      { title: "First Team Physiotherapist", org: "Atlético Madrid", period: "2023 - Present" },
      { title: "Physiotherapist", org: "Sevilla FC", period: "2020 - 2023" },
      { title: "Sports Physio", org: "Spanish Olympic Committee", period: "2018 - 2020" },
    ],
    posts: [
      { title: "Ankle sprain rehabilitation protocols", likes: 41, comments: 14, date: "4 days ago" },
      { title: "Manual therapy techniques for footballers", likes: 33, comments: 10, date: "1 week ago" },
      { title: "Return to play decision making framework", likes: 52, comments: 17, date: "3 weeks ago" },
    ],
    achievements: [
      { label: "Community Contributor", progress: 70, icon: "⭐" },
      { label: "Knowledge Sharer", progress: 62, icon: "📚" },
      { label: "Rising Star", progress: 55, icon: "🌟" },
    ],
  },
  "james-wilson": {
    name: "James Wilson",
    email: "james.wilson@efcmpu.com",
    country: "Scotland",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    role: "Moderator",
    position: "Goalkeeping Coach",
    team: "Celtic FC",
    mpu: 1560,
    joined: "Apr 1, 2023",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    bio: "UEFA Pro Licensed goalkeeping specialist with 20 years of coaching experience. Developing elite goalkeepers through innovative training methodologies and psychological preparation.",
    followers: 412,
    following: 198,
    tags: ["Goalkeeping", "Coaching", "UEFA Pro", "Psychology"],
    experience: [
      { title: "Head GK Coach", org: "Celtic FC", period: "2022 - Present" },
      { title: "GK Coach", org: "Rangers FC", period: "2017 - 2022" },
      { title: "GK Coach", org: "Scottish FA", period: "2012 - 2017" },
    ],
    posts: [
      { title: "Modern goalkeeper distribution patterns", likes: 67, comments: 23, date: "1 day ago" },
      { title: "Psychological preparation for penalty shootouts", likes: 89, comments: 31, date: "5 days ago" },
      { title: "Cross claiming: When to come and when to stay", likes: 45, comments: 16, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Community Moderator", progress: 88, icon: "🛡️" },
      { label: "Top Expert", progress: 82, icon: "🏆" },
      { label: "Mentor", progress: 75, icon: "🎓" },
    ],
  },
  "aisha-patel": {
    name: "Aisha Patel",
    email: "aisha.patel@efcmpu.com",
    country: "India",
    flag: "🇮🇳",
    role: "Member",
    position: "Nutritionist",
    team: "Tottenham Hotspur",
    mpu: 870,
    joined: "Nov 18, 2023",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    bio: "Registered sports nutritionist focused on optimizing performance through personalized nutrition plans. Expert in match-day fueling and recovery nutrition protocols.",
    followers: 198,
    following: 112,
    tags: ["Sports Nutrition", "Diet Planning", "Recovery", "Supplements"],
    experience: [
      { title: "Sports Nutritionist", org: "Tottenham Hotspur", period: "2023 - Present" },
      { title: "Nutritionist", org: "English Institute of Sport", period: "2020 - 2023" },
      { title: "Clinical Dietitian", org: "NHS", period: "2018 - 2020" },
    ],
    posts: [
      { title: "Match-day nutrition: A practical guide", likes: 38, comments: 12, date: "3 days ago" },
      { title: "Supplements in football: What works?", likes: 54, comments: 20, date: "1 week ago" },
      { title: "Vegan diets for elite athletes", likes: 42, comments: 15, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Knowledge Sharer", progress: 65, icon: "📚" },
      { label: "Community Contributor", progress: 58, icon: "⭐" },
      { label: "Rising Star", progress: 50, icon: "🌟" },
    ],
  },
  "lucas-fernandez": {
    name: "Lucas Fernandez",
    email: "lucas.fernandez@efcmpu.com",
    country: "Argentina",
    flag: "🇦🇷",
    role: "Member",
    position: "First Team Coach",
    team: "River Plate",
    mpu: 1340,
    joined: "Jun 5, 2023",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    bio: "Former professional footballer turned first team coach. Bringing playing experience and modern coaching philosophy to develop winning teams with attractive football.",
    followers: 523,
    following: 267,
    tags: ["Coaching", "Tactics", "Player Development", "Match Preparation"],
    experience: [
      { title: "First Team Assistant Coach", org: "River Plate", period: "2023 - Present" },
      { title: "U-21 Head Coach", org: "Boca Juniors", period: "2019 - 2023" },
      { title: "Professional Player", org: "Various clubs", period: "2005 - 2019" },
    ],
    posts: [
      { title: "Transitioning from player to coach", likes: 72, comments: 28, date: "2 days ago" },
      { title: "High pressing systems in South American football", likes: 58, comments: 19, date: "1 week ago" },
      { title: "Building team cohesion in pre-season", likes: 46, comments: 13, date: "3 weeks ago" },
    ],
    achievements: [
      { label: "Community Contributor", progress: 78, icon: "⭐" },
      { label: "Coaching Expert", progress: 72, icon: "🏆" },
      { label: "Networking Pro", progress: 65, icon: "🤝" },
    ],
  },
  "yuki-tanaka": {
    name: "Yuki Tanaka",
    email: "yuki.tanaka@efcmpu.com",
    country: "Japan",
    flag: "🇯🇵",
    role: "Member",
    position: "Data Scientist",
    team: "Liverpool FC",
    mpu: 1150,
    joined: "Sep 22, 2023",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
    bio: "Sports data scientist leveraging machine learning and advanced analytics to predict player performance, injury risk, and tactical outcomes in professional football.",
    followers: 289,
    following: 145,
    tags: ["Data Science", "Machine Learning", "Analytics", "Predictive Modeling"],
    experience: [
      { title: "Data Scientist", org: "Liverpool FC", period: "2023 - Present" },
      { title: "Sports Analyst", org: "Opta Sports", period: "2020 - 2023" },
      { title: "Research Associate", org: "University of Tokyo", period: "2018 - 2020" },
    ],
    posts: [
      { title: "ML models for injury risk prediction", likes: 82, comments: 27, date: "1 day ago" },
      { title: "Expected goals: Beyond the basics", likes: 65, comments: 22, date: "6 days ago" },
      { title: "Building a scouting recommendation engine", likes: 71, comments: 25, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Data Expert", progress: 85, icon: "📊" },
      { label: "Research Pioneer", progress: 72, icon: "🔬" },
      { label: "Knowledge Sharer", progress: 68, icon: "📚" },
    ],
  },
  "omar-hassan": {
    name: "Omar Hassan",
    email: "omar.hassan@efcmpu.com",
    country: "Egypt",
    flag: "🇪🇬",
    role: "Member",
    position: "Academy Director",
    team: "Al Ahly",
    mpu: 1680,
    joined: "Mar 10, 2023",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face",
    bio: "Academy director with a vision for developing world-class talent from grassroots to professional level. Leading curriculum design and coach education programs.",
    followers: 634,
    following: 312,
    tags: ["Academy Development", "Talent ID", "Coach Education", "Curriculum Design"],
    experience: [
      { title: "Academy Director", org: "Al Ahly SC", period: "2022 - Present" },
      { title: "Head of Youth Development", org: "Zamalek SC", period: "2018 - 2022" },
      { title: "Youth Coach", org: "Egyptian FA", period: "2014 - 2018" },
    ],
    posts: [
      { title: "Building world-class academies in Africa", likes: 94, comments: 35, date: "2 days ago" },
      { title: "Age-appropriate training loads for youth", likes: 67, comments: 22, date: "1 week ago" },
      { title: "Coach education: Raising the standard", likes: 55, comments: 18, date: "3 weeks ago" },
    ],
    achievements: [
      { label: "Community Leader", progress: 88, icon: "👑" },
      { label: "Top Expert", progress: 82, icon: "🏆" },
      { label: "Mentor", progress: 90, icon: "🎓" },
    ],
  },
  "elena-volkov": {
    name: "Elena Volkov",
    email: "elena.volkov@efcmpu.com",
    country: "Russia",
    flag: "🇷🇺",
    role: "Member",
    position: "Sports Psychologist",
    team: "Borussia Dortmund",
    mpu: 1020,
    joined: "Dec 12, 2023",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Certified sports psychologist helping elite athletes optimize mental performance. Specializing in resilience building, pressure management, and team dynamics.",
    followers: 356,
    following: 178,
    tags: ["Sports Psychology", "Mental Performance", "Resilience", "Team Dynamics"],
    experience: [
      { title: "Sports Psychologist", org: "Borussia Dortmund", period: "2023 - Present" },
      { title: "Performance Psychologist", org: "German Olympic Committee", period: "2020 - 2023" },
      { title: "Clinical Psychologist", org: "Private Practice", period: "2017 - 2020" },
    ],
    posts: [
      { title: "Mental resilience training for young players", likes: 73, comments: 26, date: "3 days ago" },
      { title: "Managing pressure in high-stakes matches", likes: 61, comments: 20, date: "1 week ago" },
      { title: "Team cohesion: The psychology behind success", likes: 48, comments: 14, date: "2 weeks ago" },
    ],
    achievements: [
      { label: "Knowledge Sharer", progress: 75, icon: "📚" },
      { label: "Community Contributor", progress: 68, icon: "⭐" },
      { label: "Mentor", progress: 60, icon: "🎓" },
    ],
  },
};

// Helper to generate slug from name
export function nameToSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function MemberProfile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { users } = useAuth();
  const [activeTab, setActiveTab] = useState<"about" | "posts" | "achievements">("about");

  // Try static data first, then fall back to AuthContext users
  const staticMember = slug ? memberData[slug] : null;

  const directoryUsers = useMemo(() => {
    const mergedUsers = new Map<string, DummyUser>();

    dummyUsers.forEach((user) => {
      mergedUsers.set(user.email.toLowerCase(), user);
    });

    users.forEach((user) => {
      const key = user.email.toLowerCase();
      const defaultUser = mergedUsers.get(key);

      mergedUsers.set(
        key,
        defaultUser
          ? {
              ...defaultUser,
              ...user,
              bio: user.bio?.trim() ? user.bio : defaultUser.bio,
              interests: user.interests?.length ? user.interests : defaultUser.interests,
            }
          : user,
      );
    });

    return Array.from(mergedUsers.values());
  }, [users]);

  const authMember = useMemo(() => {
    if (staticMember || !slug) return null;
    return directoryUsers.find((u) => nameToSlug(`${u.firstName} ${u.lastName}`) === slug);
  }, [directoryUsers, staticMember, slug]);

  const member = useMemo(() => {
    if (staticMember) return staticMember;
    if (!authMember) return null;
    const flagMap: Record<string, string> = {
      "Germany": "🇩🇪", "France": "🇫🇷", "Italy": "🇮🇹", "Netherlands": "🇳🇱",
      "United Kingdom": "🇬🇧", "Spain": "🇪🇸", "Portugal": "🇵🇹", "Belgium": "🇧🇪",
      "Denmark": "🇩🇰", "Ireland": "🇮🇪", "United States": "🇺🇸",
    };
    return {
      name: `${authMember.firstName} ${authMember.lastName}`.trim(),
      email: authMember.email,
      country: authMember.country || "Unknown",
      flag: flagMap[authMember.country] || "🏳️",
      role: authMember.role || "Member",
      position: authMember.position || authMember.role || "",
      team: authMember.club || "",
      mpu: 850,
      joined: "2024",
      avatar: getUserAvatarUrl(authMember.firstName, authMember.lastName),
      bio: authMember.bio || "",
      followers: Math.floor(Math.random() * 300) + 50,
      following: Math.floor(Math.random() * 150) + 30,
      tags: authMember.interests || [],
      experience: [] as { title: string; org: string; period: string }[],
      posts: [] as { title: string; likes: number; comments: number; date: string }[],
      achievements: [
        { label: "Community Member", progress: 60, icon: "⭐" },
      ],
    };
  }, [staticMember, authMember]);

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-lg text-muted-foreground">Member not found</p>
        <Button variant="outline" onClick={() => navigate("/community")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Community
        </Button>
      </div>
    );
  }

  const tabs = [
    { key: "about" as const, label: "About" },
    { key: "posts" as const, label: "Posts" },
    { key: "achievements" as const, label: "Achievements" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => navigate("/community")} className="text-muted-foreground hover:text-foreground -ml-2">
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Community
      </Button>

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative rounded-2xl border border-border bg-card overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-12 flex items-end gap-5">
            <Avatar className="h-24 w-24 ring-4 ring-card shadow-lg">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {member.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">{member.name}</h1>
                <Badge variant="secondary" className="text-[10px]">{member.role}</Badge>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{member.position}</span>
                {getTeamLogo(member.team) && (
                  <img src={getTeamLogo(member.team)} alt={member.team} className="h-4 w-4 object-contain" />
                )}
                <span className="text-sm text-muted-foreground">{member.team}</span>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Button size="sm" variant="outline" onClick={() => navigate("/chat")}>
                <MessageCircle className="h-4 w-4 mr-1.5" /> Message
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-1.5" /> Connect
              </Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-5">
            <div className="flex items-center gap-1.5 text-sm">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{member.flag} {member.country}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">{member.email}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Joined {member.joined}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-primary">{member.mpu} MPU</span>
            </div>
          </div>

          {/* Followers / Following */}
          <div className="flex gap-4 mt-3">
            <span className="text-sm"><strong className="text-foreground">{member.followers}</strong> <span className="text-muted-foreground">followers</span></span>
            <span className="text-sm"><strong className="text-foreground">{member.following}</strong> <span className="text-muted-foreground">following</span></span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-all relative",
              activeTab === t.key
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            {activeTab === t.key && (
              <motion.div
                layoutId="member-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {activeTab === "about" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bio */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Bio</h3>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{member.bio}</div>
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-[11px] font-normal">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Experience</h3>
              <div className="space-y-4">
                {member.experience.map((exp, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{exp.title}</p>
                      <p className="text-xs text-muted-foreground">{exp.org}</p>
                      <p className="text-[11px] text-muted-foreground/70">{exp.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="space-y-3">
            {member.posts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{post.title}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>{post.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {member.achievements.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{ach.icon}</span>
                  <span className="text-sm font-medium text-foreground">{ach.label}</span>
                  <span className="ml-auto text-xs font-semibold text-primary">{ach.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ach.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
