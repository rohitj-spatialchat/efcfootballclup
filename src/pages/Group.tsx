import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users, MessageSquare, Calendar, Info, ThumbsUp, Share2, Send, MoreHorizontal,
  Pin, ImagePlus, X, BookmarkPlus, Flag, EyeOff, Dumbbell, FlaskConical, Apple,
  Brain, Stethoscope, Zap, HeartPulse, UserPlus, Settings, Search, ChevronDown,
  Plus, BarChart3, Trash2, PenTool, Video, FileText, Paperclip, Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const groupsData: Record<string, {
  label: string;
  icon: React.ElementType;
  description: string;
  memberCount: number;
  postCount: number;
  color: string;
  members: { name: string; avatar: string; role: string; online: boolean }[];
  posts: { id: number; author: string; avatar: string; time: string; title: string; body: string; image: string | null; likes: number; comments: number; pinned: boolean }[];
  events: { title: string; date: string; attendees: number }[];
  rules: string[];
  chatMessages: { id: number; author: string; avatar: string; message: string; time: string }[];
}> = {
  "sport-exercise": {
    label: "Sport & Exercise",
    icon: Dumbbell,
    description: "A dedicated space for professionals to discuss sport and exercise science, training methodologies, and physical performance optimization in football.",
    memberCount: 342,
    postCount: 1289,
    color: "bg-emerald-500/10 text-emerald-600",
    members: [
      { name: "Dr. Marco Rossi", avatar: "MR", role: "Admin", online: true },
      { name: "Sarah Mitchell", avatar: "SM", role: "Moderator", online: true },
      { name: "James Parker", avatar: "JP", role: "Member", online: false },
      { name: "Lena Schmidt", avatar: "LS", role: "Member", online: true },
      { name: "Carlos Garcia", avatar: "CG", role: "Member", online: false },
      { name: "Aisha Okafor", avatar: "AO", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Marco Rossi", avatar: "MR", time: "2h ago", title: "Periodization strategies for in-season training", body: "How are clubs managing training load during congested fixture periods? We've found that undulating periodization with RPE-guided adjustments has significantly reduced our soft tissue injury rates.\n\nKey principles we follow:\n1. Monitor acute:chronic workload ratio weekly\n2. Adjust session RPE targets based on match schedule\n3. Implement mandatory recovery protocols post-match", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop", likes: 34, comments: 12, pinned: true },
      { id: 2, author: "Sarah Mitchell", avatar: "SM", time: "5h ago", title: "New VO2max testing protocols for pre-season", body: "We've been experimenting with field-based VO2max estimation using GPS data instead of traditional lab tests. Early results show strong correlation (r=0.89) with lab values while being far more practical for squad-wide testing.", image: null, likes: 28, comments: 8, pinned: false },
      { id: 3, author: "Lena Schmidt", avatar: "LS", time: "1d ago", title: "Sprint mechanics workshop recap", body: "Just wrapped up an incredible 2-day workshop on sprint mechanics with Dr. Matt Brughelli. Key takeaways on hip extension patterns and their relationship with hamstring injury risk.", image: "https://images.unsplash.com/photo-1461896836934-bd45ba7d8f73?w=800&h=400&fit=crop", likes: 56, comments: 19, pinned: false },
      { id: 4, author: "Carlos Garcia", avatar: "CG", time: "1d ago", title: "Agility vs. change of direction — are we confusing the terms?", body: "There's a big distinction between planned COD speed and reactive agility. Most drills labelled 'agility' are actually closed COD drills. Here's how we've restructured our sessions to include genuine perceptual-cognitive demands.", image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&h=400&fit=crop", likes: 42, comments: 15, pinned: false },
      { id: 5, author: "James Parker", avatar: "JP", time: "2d ago", title: "Warm-up protocol comparison: FIFA 11+ vs. custom protocols", body: "We ran a 16-week comparison between FIFA 11+ and our bespoke warm-up routine across our U21 and senior squads. Injury incidence was 23% lower with our custom protocol, but adherence was harder to maintain.", image: null, likes: 37, comments: 11, pinned: false },
      { id: 6, author: "Aisha Okafor", avatar: "AO", time: "2d ago", title: "GPS load monitoring: which metrics matter most?", body: "Total distance, high-speed running, sprint distance, accelerations/decelerations — we track them all but which ones actually predict injury or performance? Sharing our 3-season analysis of GPS metrics vs. injury occurrence.", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=400&fit=crop", likes: 61, comments: 27, pinned: false },
      { id: 7, author: "Dr. Marco Rossi", avatar: "MR", time: "3d ago", title: "Return-to-play criteria after hamstring injuries", body: "Our updated RTP decision tree now includes isokinetic strength testing, eccentric strength at long muscle lengths, and a sport-specific agility assessment. Has anyone else integrated psychological readiness measures into their RTP process?", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=400&fit=crop", likes: 48, comments: 20, pinned: false },
      { id: 8, author: "Sarah Mitchell", avatar: "SM", time: "4d ago", title: "📊 Poll: Best recovery method post-match?", body: "A. Cold water immersion\nB. Active recovery session next day\nC. Compression garments + sleep optimization\nD. Contrast water therapy", image: null, likes: 73, comments: 45, pinned: false },
      { id: 9, author: "Lena Schmidt", avatar: "LS", time: "5d ago", title: "📊 Poll: How do you monitor training load?", body: "A. Session RPE only\nB. GPS + heart rate combined\nC. Wellness questionnaires + RPE\nD. Full integrated system (GPS + HR + RPE + wellness)", image: null, likes: 55, comments: 32, pinned: false },
    ],
    events: [
      { title: "Sport Science Roundtable Q1", date: "Mar 15, 2026", attendees: 45 },
      { title: "Pre-Season Testing Workshop", date: "Apr 2, 2026", attendees: 32 },
      { title: "Guest Speaker: Dr. Tim Gabbett", date: "Apr 18, 2026", attendees: 120 },
    ],
    rules: [
      "Share evidence-based content with proper references",
      "Respect confidentiality — no club-specific data without permission",
      "Be constructive in discussions and debates",
      "No promotional or commercial content without admin approval",
    ],
    chatMessages: [
      { id: 1, author: "Dr. Marco Rossi", avatar: "MR", message: "Has anyone tried the new GPS vest from Catapult? We're evaluating it for next season.", time: "10:32 AM" },
      { id: 2, author: "Sarah Mitchell", avatar: "SM", message: "Yes! We've been using it for 3 weeks. The data quality is excellent, especially for accelerations.", time: "10:35 AM" },
      { id: 3, author: "Lena Schmidt", avatar: "LS", message: "Agreed. The battery life is a huge improvement over the previous model.", time: "10:38 AM" },
      { id: 4, author: "James Parker", avatar: "JP", message: "How does it compare to STATSports? We're currently using Apex Pro.", time: "10:41 AM" },
      { id: 5, author: "Dr. Marco Rossi", avatar: "MR", message: "Both are solid. Catapult has better raw data export, STATSports has a more intuitive dashboard.", time: "10:45 AM" },
      { id: 6, author: "Carlos Garcia", avatar: "CG", message: "Quick question — anyone running concurrent HR monitoring with the vests? Any interference issues?", time: "10:52 AM" },
      { id: 7, author: "Aisha Okafor", avatar: "AO", message: "We pair it with Polar H10 straps, no issues at all. Clean signal throughout.", time: "10:55 AM" },
      { id: 8, author: "Sarah Mitchell", avatar: "SM", message: "Same here. The integration with our internal dashboard is seamless now 🙌", time: "11:02 AM" },
      { id: 9, author: "Lena Schmidt", avatar: "LS", message: "Speaking of dashboards — Marco, are you presenting the new load monitoring tool at the roundtable?", time: "11:08 AM" },
      { id: 10, author: "Dr. Marco Rossi", avatar: "MR", message: "Yes! I'll share the beta version next week. It auto-flags players exceeding their ACWR threshold.", time: "11:12 AM" },
    ],
  },
  "science": {
    label: "Science",
    icon: FlaskConical,
    description: "Explore the latest research in sports science, biomechanics, and performance analytics. Share papers, discuss findings, and bridge the gap between research and practice.",
    memberCount: 278,
    postCount: 945,
    color: "bg-blue-500/10 text-blue-600",
    members: [
      { name: "Alex Chen", avatar: "AC", role: "Admin", online: true },
      { name: "Prof. Nina Volkov", avatar: "NV", role: "Moderator", online: false },
      { name: "Tom Bradley", avatar: "TB", role: "Member", online: true },
      { name: "Yuki Tanaka", avatar: "YT", role: "Member", online: false },
    ],
    posts: [
      { id: 1, author: "Alex Chen", avatar: "AC", time: "3h ago", title: "Meta-analysis on eccentric training and injury reduction", body: "Just published: our systematic review of 47 RCTs on eccentric training protocols. Results show a 51% reduction in muscle strain injuries when combining Nordic hamstring exercises with hip-focused eccentrics.", image: null, likes: 67, comments: 24, pinned: true },
      { id: 2, author: "Prof. Nina Volkov", avatar: "NV", time: "1d ago", title: "Biomechanical analysis of change-of-direction movements", body: "Sharing preliminary data from our motion capture study on COD mechanics in elite footballers. Significant differences found between ACL-injured and non-injured cohorts in knee valgus angles during 45° cuts.", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=400&fit=crop", likes: 45, comments: 15, pinned: false },
      { id: 3, author: "Tom Bradley", avatar: "TB", time: "1d ago", title: "Machine learning models for injury prediction", body: "We've trained a gradient-boosted model using 3 seasons of GPS, wellness, and training data. AUC of 0.82 for predicting non-contact muscle injuries within a 7-day window. Feature importance shows sleep quality and acute:chronic ratio as top predictors.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop", likes: 89, comments: 34, pinned: false },
      { id: 4, author: "Yuki Tanaka", avatar: "YT", time: "2d ago", title: "Lactate threshold testing in football: still relevant?", body: "With modern GPS and metabolic modelling, is traditional lactate testing still necessary? Our comparison suggests field-based estimates are sufficient for most practical applications, but lab testing remains the gold standard for research.", image: null, likes: 33, comments: 18, pinned: false },
      { id: 5, author: "Alex Chen", avatar: "AC", time: "3d ago", title: "New paper: Tendon adaptation to load in adolescent athletes", body: "Exciting findings from our longitudinal study — tendon stiffness in U16 players increases significantly with structured heavy-slow resistance training. Implications for injury prevention and long-term athletic development.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop", likes: 52, comments: 21, pinned: false },
      { id: 6, author: "Prof. Nina Volkov", avatar: "NV", time: "3d ago", title: "Neuromuscular fatigue markers during congested schedules", body: "Our EMG data shows significant decrements in muscle activation patterns after 3 matches in 7 days. Quadriceps pre-activation timing is particularly affected, which may explain increased injury risk.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop", likes: 44, comments: 16, pinned: false },
      { id: 7, author: "Tom Bradley", avatar: "TB", time: "4d ago", title: "📊 Poll: Most impactful sports science technology?", body: "A. GPS/GNSS tracking systems\nB. Force plates and jump testing\nC. Blood biomarker analysis\nD. Wearable muscle oxygen sensors", image: null, likes: 61, comments: 38, pinned: false },
      { id: 8, author: "Yuki Tanaka", avatar: "YT", time: "5d ago", title: "Heart rate recovery as a fitness indicator in footballers", body: "We measured HRR at 60s post-maximal effort across the season. Players with faster HRR showed 18% fewer minutes missed due to injury. Simple, cheap, and highly informative metric that every club should track.", image: null, likes: 39, comments: 14, pinned: false },
      { id: 9, author: "Alex Chen", avatar: "AC", time: "6d ago", title: "📊 Poll: How should we bridge the research-practice gap?", body: "A. Embed researchers in club environments\nB. Publish more practitioner-focused summaries\nC. Joint conferences with coaches and scientists\nD. Open-access data sharing between clubs", image: null, likes: 47, comments: 29, pinned: false },
    ],
    events: [
      { title: "Research Methodology Workshop", date: "Mar 20, 2026", attendees: 28 },
      { title: "Journal Club: BJSM Latest", date: "Apr 5, 2026", attendees: 35 },
    ],
    rules: [
      "Always cite sources when sharing research findings",
      "Distinguish clearly between established evidence and preliminary data",
      "Be respectful of differing methodological approaches",
    ],
    chatMessages: [
      { id: 1, author: "Alex Chen", avatar: "AC", message: "Just finished reviewing the latest BJSM paper on hamstring rehab protocols. Really interesting findings.", time: "9:15 AM" },
      { id: 2, author: "Prof. Nina Volkov", avatar: "NV", message: "Which one? The Askling et al. follow-up?", time: "9:18 AM" },
      { id: 3, author: "Alex Chen", avatar: "AC", message: "Yes! They found the L-protocol had 28% faster RTP times compared to conventional approaches.", time: "9:22 AM" },
      { id: 4, author: "Tom Bradley", avatar: "TB", message: "We've been using a modified version of that. Can confirm the results are promising.", time: "9:30 AM" },
      { id: 5, author: "Yuki Tanaka", avatar: "YT", message: "Has anyone validated these protocols with female athletes specifically? Sample sizes are always small.", time: "9:35 AM" },
      { id: 6, author: "Prof. Nina Volkov", avatar: "NV", message: "Great point Yuki. We're running a study with 60 female footballers currently. Data expected by Q3.", time: "9:40 AM" },
      { id: 7, author: "Tom Bradley", avatar: "TB", message: "That's exciting! Would love to collaborate on the analysis if you need ML support.", time: "9:45 AM" },
      { id: 8, author: "Alex Chen", avatar: "AC", message: "Let's set up a call this week to discuss the methodology. I'll send calendar invites.", time: "9:50 AM" },
    ],
  },
  "nutrition": {
    label: "Nutrition",
    icon: Apple,
    description: "Everything related to sports nutrition, supplementation, and dietary strategies for optimal athlete performance and recovery.",
    memberCount: 195,
    postCount: 632,
    color: "bg-orange-500/10 text-orange-600",
    members: [
      { name: "Emma Johansson", avatar: "EJ", role: "Admin", online: true },
      { name: "Dr. Kwame Adebayo", avatar: "KA", role: "Member", online: false },
      { name: "Sophie Laurent", avatar: "SL", role: "Moderator", online: true },
      { name: "Raj Patel", avatar: "RP", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Emma Johansson", avatar: "EJ", time: "4h ago", title: "Match-day nutrition protocols: what's changed?", body: "The traditional carb-loading approach is evolving. Here's our updated match-day nutrition timeline that's improved perceived energy levels in 80% of our squad members.", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop", likes: 41, comments: 16, pinned: true },
      { id: 2, author: "Dr. Kwame Adebayo", avatar: "KA", time: "8h ago", title: "Protein timing around training sessions", body: "New evidence suggests the 'anabolic window' is wider than previously thought. However, distributing 0.3-0.5g/kg protein across 4-5 meals still appears optimal for muscle protein synthesis in athletes.", image: null, likes: 35, comments: 12, pinned: false },
      { id: 3, author: "Sophie Laurent", avatar: "SL", time: "1d ago", title: "Hydration strategies for hot climate matches", body: "Playing in 35°C+ temperatures requires specific hydration planning. Our protocol: pre-cooling with ice slurries, individualized sweat rate calculations, and sodium-loaded drinks during half-time.", image: "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=800&h=400&fit=crop", likes: 52, comments: 22, pinned: false },
      { id: 4, author: "Raj Patel", avatar: "RP", time: "1d ago", title: "Gut health and its impact on performance", body: "Emerging research links gut microbiome diversity to reduced inflammation and better recovery. We've introduced probiotic and prebiotic-rich foods into our squad's meal plans with promising early results.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop", likes: 29, comments: 9, pinned: false },
      { id: 5, author: "Emma Johansson", avatar: "EJ", time: "2d ago", title: "Caffeine supplementation: dosing and timing guide", body: "3-6mg/kg body weight, 30-60 minutes pre-match. But individual genetic variation (CYP1A2 gene) means some players are slow metabolizers. We now genotype all players to personalize caffeine protocols.", image: null, likes: 63, comments: 28, pinned: false },
      { id: 6, author: "Dr. Kwame Adebayo", avatar: "KA", time: "3d ago", title: "Iron deficiency in female footballers", body: "Screening data from 120 elite female players shows 38% had suboptimal ferritin levels. Regular monitoring and food-first supplementation strategies are essential. Sharing our screening protocol.", image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop", likes: 47, comments: 19, pinned: false },
      { id: 7, author: "Sophie Laurent", avatar: "SL", time: "3d ago", title: "📊 Poll: Biggest nutrition challenge with players?", body: "A. Getting players to eat enough on match days\nB. Managing body composition goals\nC. Supplement education and compliance\nD. Cultural dietary requirements", image: null, likes: 54, comments: 31, pinned: false },
      { id: 8, author: "Raj Patel", avatar: "RP", time: "4d ago", title: "Anti-inflammatory foods for recovery", body: "Tart cherry juice, omega-3 fatty acids, turmeric — which actually work? Our systematic review of nutritional anti-inflammatory interventions in athletes. Spoiler: the evidence is mixed but promising for tart cherry.", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=400&fit=crop", likes: 38, comments: 14, pinned: false },
      { id: 9, author: "Emma Johansson", avatar: "EJ", time: "5d ago", title: "📊 Poll: Best post-match recovery meal?", body: "A. Protein shake + banana\nB. Full balanced meal within 1 hour\nC. Chocolate milk (yes, really)\nD. Individualized meal prep for each player", image: null, likes: 72, comments: 43, pinned: false },
    ],
    events: [
      { title: "Nutrition Masterclass", date: "Mar 25, 2026", attendees: 52 },
    ],
    rules: [
      "No unsubstantiated supplement claims",
      "Respect individual dietary choices and cultural considerations",
      "Evidence-based recommendations only",
    ],
    chatMessages: [
      { id: 1, author: "Emma Johansson", avatar: "EJ", message: "Reminder: match-day meal prep for Saturday needs to be finalized by Thursday.", time: "8:00 AM" },
      { id: 2, author: "Raj Patel", avatar: "RP", message: "I've updated the menu. Added a new rice bowl option for players who prefer lighter meals.", time: "8:15 AM" },
      { id: 3, author: "Sophie Laurent", avatar: "SL", message: "Perfect. Can we also add a gluten-free pasta option? Two new players have celiac.", time: "8:22 AM" },
      { id: 4, author: "Dr. Kwame Adebayo", avatar: "KA", message: "Don't forget the hydration station setup. Forecast shows 30°C for Saturday.", time: "8:30 AM" },
      { id: 5, author: "Emma Johansson", avatar: "EJ", message: "Already on it! Sodium-loaded drinks ready. Individual bottles labeled by player.", time: "8:35 AM" },
      { id: 6, author: "Raj Patel", avatar: "RP", message: "Also, the new tart cherry juice supplier confirmed delivery for Friday morning 🍒", time: "8:42 AM" },
      { id: 7, author: "Sophie Laurent", avatar: "SL", message: "Excellent! The players have been loving it for recovery. Great addition.", time: "8:50 AM" },
    ],
  },
  "sport-psychology": {
    label: "Sport Psychology",
    icon: Brain,
    description: "Mental performance, resilience, team dynamics, and psychological well-being in professional football.",
    memberCount: 156,
    postCount: 478,
    color: "bg-purple-500/10 text-purple-600",
    members: [
      { name: "Dr. Ravi Patel", avatar: "RP", role: "Admin", online: true },
      { name: "Mei Wong", avatar: "MW", role: "Member", online: true },
      { name: "David Osei", avatar: "DO", role: "Moderator", online: false },
      { name: "Laura Bianchi", avatar: "LB", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Ravi Patel", avatar: "RP", time: "6h ago", title: "Building psychological resilience after long-term injury", body: "Our 12-week psychological intervention program for ACL-reconstructed players has shown remarkable improvements in return-to-sport confidence scores. Key components include visualization, graduated exposure, and peer mentoring.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop", likes: 72, comments: 31, pinned: true },
      { id: 2, author: "Mei Wong", avatar: "MW", time: "10h ago", title: "Mindfulness training in elite football", body: "We introduced a 6-week mindfulness-based stress reduction (MBSR) program to our first team. Players reported 40% reduction in pre-match anxiety and improved focus during high-pressure moments.", image: null, likes: 58, comments: 24, pinned: false },
      { id: 3, author: "David Osei", avatar: "DO", time: "1d ago", title: "Team cohesion building exercises that actually work", body: "Forget trust falls. Here are 5 evidence-based team-building activities we use that have measurably improved communication and collective efficacy scores across two seasons.", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop", likes: 65, comments: 28, pinned: false },
      { id: 4, author: "Laura Bianchi", avatar: "LB", time: "2d ago", title: "Managing performance anxiety in young players", body: "Transitioning from academy to first team is psychologically demanding. Our stepped intervention includes cognitive restructuring, breathing techniques, and performance routines. Sharing our case studies.", image: null, likes: 44, comments: 17, pinned: false },
      { id: 5, author: "Dr. Ravi Patel", avatar: "RP", time: "2d ago", title: "The psychology of penalty-taking", body: "Gaze behavior, pre-performance routines, and choking under pressure. We've analyzed 500+ penalties from top leagues and identified 3 key psychological factors that predict success.", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop", likes: 91, comments: 42, pinned: false },
      { id: 6, author: "Mei Wong", avatar: "MW", time: "3d ago", title: "Sleep quality interventions for travelling squads", body: "Jet lag, hotel environments, pre-match nerves — all disrupt sleep. Our portable sleep hygiene kit and personalized sleep scheduling has improved total sleep time by an average of 47 minutes on away trips.", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=400&fit=crop", likes: 37, comments: 13, pinned: false },
      { id: 7, author: "David Osei", avatar: "DO", time: "4d ago", title: "📊 Poll: Most underrated mental skill in football?", body: "A. Emotional regulation\nB. Decision-making under fatigue\nC. Communication and leadership\nD. Self-talk and internal motivation", image: null, likes: 68, comments: 39, pinned: false },
      { id: 8, author: "Laura Bianchi", avatar: "LB", time: "5d ago", title: "Burnout prevention in academy players", body: "Early specialization and year-round competition are driving burnout in U16-U18 players. Our multi-dimensional monitoring system tracks motivation, enjoyment, and stress to flag at-risk players before it's too late.", image: null, likes: 43, comments: 18, pinned: false },
      { id: 9, author: "Dr. Ravi Patel", avatar: "RP", time: "6d ago", title: "📊 Poll: How do you assess mental readiness pre-match?", body: "A. Subjective wellness questionnaires\nB. One-on-one conversations with players\nC. Psychometric tools (POMS, CSAI-2)\nD. We don't formally assess it", image: null, likes: 55, comments: 33, pinned: false },
    ],
    events: [
      { title: "Mental Performance Workshop", date: "Mar 18, 2026", attendees: 38 },
      { title: "Resilience & Recovery Seminar", date: "Apr 12, 2026", attendees: 55 },
    ],
    rules: ["Maintain confidentiality about specific athlete cases", "Be sensitive when discussing mental health topics"],
    chatMessages: [
      { id: 1, author: "Dr. Ravi Patel", avatar: "RP", message: "Quick update — the mindfulness app pilot has been extended to the U21s as well.", time: "11:00 AM" },
      { id: 2, author: "Mei Wong", avatar: "MW", message: "That's great news! The senior players gave really positive feedback.", time: "11:05 AM" },
      { id: 3, author: "David Osei", avatar: "DO", message: "Any chance we can get aggregate data for the workshop next month?", time: "11:12 AM" },
      { id: 4, author: "Laura Bianchi", avatar: "LB", message: "I can prepare anonymized summaries. Will share by end of week.", time: "11:18 AM" },
      { id: 5, author: "Dr. Ravi Patel", avatar: "RP", message: "Perfect. Also, the penalty-taking psychology session is confirmed for Friday 🎯", time: "11:25 AM" },
      { id: 6, author: "Mei Wong", avatar: "MW", message: "Looking forward to it! I've prepared some visualization exercises for the players.", time: "11:30 AM" },
    ],
  },
  "medical-physiotherapy": {
    label: "Medical & Physiotherapy",
    icon: Stethoscope,
    description: "Clinical discussions on injury diagnosis, rehabilitation protocols, and medical best practices in professional football.",
    memberCount: 289,
    postCount: 1102,
    color: "bg-red-500/10 text-red-600",
    members: [
      { name: "Dr. Anna Weber", avatar: "AW", role: "Admin", online: true },
      { name: "Paulo Mendes", avatar: "PM", role: "Moderator", online: false },
      { name: "Dr. Fatima Al-Hassan", avatar: "FA", role: "Member", online: true },
      { name: "Chris O'Brien", avatar: "CO", role: "Member", online: false },
    ],
    posts: [
      { id: 1, author: "Dr. Anna Weber", avatar: "AW", time: "1h ago", title: "Updated ACL rehabilitation timeline", body: "Based on our latest outcomes data (n=47 athletes), we're recommending extending the minimum RTP criteria to include 9 months + psychological readiness assessment.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop", likes: 89, comments: 42, pinned: true },
      { id: 2, author: "Paulo Mendes", avatar: "PM", time: "6h ago", title: "Platelet-rich plasma (PRP) therapy: current evidence", body: "PRP for muscle injuries remains controversial. Our review of 23 studies shows modest benefits for chronic tendinopathies but limited evidence for acute muscle strains. Cost-benefit analysis included.", image: null, likes: 54, comments: 23, pinned: false },
      { id: 3, author: "Dr. Fatima Al-Hassan", avatar: "FA", time: "1d ago", title: "Ankle sprain rehabilitation: beyond the RICE protocol", body: "The shift from RICE to PEACE & LOVE framework has transformed our approach. Early controlled loading, education, and optimism are now central to our ankle rehab programs.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop", likes: 62, comments: 27, pinned: false },
      { id: 4, author: "Chris O'Brien", avatar: "CO", time: "1d ago", title: "Concussion management: the latest consensus", body: "The 6th International Consensus on Concussion in Sport has updated guidelines. Key changes include longer minimum rest periods and new cognitive testing protocols. Summary of changes and practical implications.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop", likes: 76, comments: 35, pinned: false },
      { id: 5, author: "Dr. Anna Weber", avatar: "AW", time: "2d ago", title: "Groin pain in footballers: differential diagnosis guide", body: "Adductor-related, iliopsoas-related, inguinal-related, or pubic-related? Our clinical decision-making flowchart for athletic groin pain based on the Doha agreement classification.", image: null, likes: 83, comments: 38, pinned: false },
      { id: 6, author: "Paulo Mendes", avatar: "PM", time: "3d ago", title: "Cryotherapy chambers: are they worth the investment?", body: "We've collected data over 2 seasons comparing whole-body cryotherapy with cold water immersion. Results suggest no significant difference in recovery markers, but players subjectively prefer cryo. Worth the £50k+ price tag?", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop", likes: 45, comments: 29, pinned: false },
      { id: 7, author: "Dr. Fatima Al-Hassan", avatar: "FA", time: "4d ago", title: "📊 Poll: Most common injury you treat?", body: "A. Hamstring strains\nB. Ankle sprains\nC. Knee ligament injuries\nD. Groin/adductor problems", image: null, likes: 58, comments: 41, pinned: false },
      { id: 8, author: "Chris O'Brien", avatar: "CO", time: "4d ago", title: "Pitch-side emergency protocols: lessons learned", body: "After handling 3 cardiac emergencies in grassroots football over the past year, I'm sharing our updated pitch-side emergency action plan. AED placement, team roles, and communication protocols.", image: null, likes: 94, comments: 47, pinned: false },
      { id: 9, author: "Dr. Anna Weber", avatar: "AW", time: "5d ago", title: "📊 Poll: What's your preferred imaging for muscle injuries?", body: "A. MRI within 48 hours\nB. Ultrasound (immediate, bedside)\nC. Clinical assessment only initially\nD. MRI + ultrasound combined", image: null, likes: 51, comments: 26, pinned: false },
    ],
    events: [
      { title: "Rehabilitation Case Study Series", date: "Mar 12, 2026", attendees: 64 },
      { title: "Pitch-Side Emergency Training", date: "Apr 8, 2026", attendees: 48 },
    ],
    rules: ["No specific medical advice for individual cases", "Respect patient confidentiality at all times"],
    chatMessages: [
      { id: 1, author: "Dr. Anna Weber", avatar: "AW", message: "Heads up — new UEFA medical regulations drop next month. I'll circulate a summary.", time: "7:30 AM" },
      { id: 2, author: "Paulo Mendes", avatar: "PM", message: "Thanks Anna. Any changes to concussion protocols?", time: "7:35 AM" },
      { id: 3, author: "Dr. Fatima Al-Hassan", avatar: "FA", message: "Yes, the minimum stand-down period is now extended to 11 days.", time: "7:40 AM" },
      { id: 4, author: "Chris O'Brien", avatar: "CO", message: "About time. Player safety should always come first.", time: "7:45 AM" },
      { id: 5, author: "Dr. Anna Weber", avatar: "AW", message: "Agreed. Also, new requirements for pitch-side defibrillator checks before every match.", time: "7:50 AM" },
      { id: 6, author: "Paulo Mendes", avatar: "PM", message: "We're already compliant on that. Good to see it becoming mandatory.", time: "7:55 AM" },
    ],
  },
  "strength-power": {
    label: "Strength & Power",
    icon: Zap,
    description: "Strength training methodologies, power development, and resistance training programming for footballers.",
    memberCount: 221,
    postCount: 756,
    color: "bg-amber-500/10 text-amber-600",
    members: [
      { name: "Jake Morrison", avatar: "JM", role: "Admin", online: true },
      { name: "Viktor Petrov", avatar: "VP", role: "Member", online: false },
      { name: "Tanya Brooks", avatar: "TB", role: "Moderator", online: true },
      { name: "Hiroshi Sato", avatar: "HS", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Jake Morrison", avatar: "JM", time: "8h ago", title: "Velocity-based training: practical implementation", body: "We've transitioned from percentage-based programming to VBT for all our main lifts. Here's our autoregulation framework using mean concentric velocity zones.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop", likes: 53, comments: 22, pinned: true },
      { id: 2, author: "Viktor Petrov", avatar: "VP", time: "12h ago", title: "Trap bar deadlift vs. back squat for footballers", body: "After 3 years of data, we've made the trap bar our primary lower body exercise. Lower spinal load, easier to teach, and equivalent force production. Here's our progression framework.", image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=400&fit=crop", likes: 67, comments: 31, pinned: false },
      { id: 3, author: "Tanya Brooks", avatar: "TB", time: "1d ago", title: "Plyometric programming for injury-reduced players", body: "How do you reintroduce plyometric loading post-injury? Our graduated plyometric return protocol uses force plate monitoring to ensure safe progression from bilateral to unilateral to sport-specific movements.", image: null, likes: 44, comments: 18, pinned: false },
      { id: 4, author: "Hiroshi Sato", avatar: "HS", time: "1d ago", title: "Isometric training for tendon health", body: "Heavy isometric holds at specific joint angles have transformed our approach to tendon management. 4x45s holds at 70-80% MVC, progressing to heavy isotonic loading. Patellar and Achilles tendon protocols shared.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop", likes: 39, comments: 15, pinned: false },
      { id: 5, author: "Jake Morrison", avatar: "JM", time: "2d ago", title: "In-season strength maintenance: minimum effective dose", body: "How little strength training can you do and still maintain qualities? Our data suggests 2 sessions/week with 2-3 exercises at 80%+ 1RM is sufficient to maintain peak force and RFD during the season.", image: null, likes: 71, comments: 33, pinned: false },
      { id: 6, author: "Viktor Petrov", avatar: "VP", time: "3d ago", title: "Olympic lifting alternatives for time-poor squads", body: "Not every club has the time or coaching expertise for full Olympic lifts. Jump squats, hex bar jumps, and kettlebell swings can develop similar power qualities with less technical demand.", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=400&fit=crop", likes: 48, comments: 20, pinned: false },
      { id: 7, author: "Tanya Brooks", avatar: "TB", time: "3d ago", title: "📊 Poll: Best exercise for football-specific power?", body: "A. Trap bar jump\nB. Back squat\nC. Single-leg Romanian deadlift\nD. Weighted sled push/pull", image: null, likes: 62, comments: 37, pinned: false },
      { id: 8, author: "Hiroshi Sato", avatar: "HS", time: "4d ago", title: "Upper body training for contact resilience", body: "Upper body strength is often neglected in football. Our push/pull balance program has reduced shoulder injuries by 34% and improved aerial duel success rate. Protocol and data included.", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=400&fit=crop", likes: 41, comments: 16, pinned: false },
      { id: 9, author: "Jake Morrison", avatar: "JM", time: "5d ago", title: "📊 Poll: How do you test maximal strength?", body: "A. 1RM testing\nB. Predicted 1RM from submaximal loads\nC. Isometric mid-thigh pull\nD. We don't test maximal strength", image: null, likes: 49, comments: 28, pinned: false },
    ],
    events: [
      { title: "S&C Coaches Roundtable", date: "Mar 22, 2026", attendees: 42 },
      { title: "VBT Practical Workshop", date: "Apr 15, 2026", attendees: 30 },
    ],
    rules: ["Safety first — always discuss proper form and progressions", "Share programming rationale, not just exercises"],
    chatMessages: [
      { id: 1, author: "Jake Morrison", avatar: "JM", message: "VBT encoder just arrived! Setting it up for tomorrow's session.", time: "2:00 PM" },
      { id: 2, author: "Viktor Petrov", avatar: "VP", message: "Which model did you go with? We're deciding between GymAware and Push Band.", time: "2:05 PM" },
      { id: 3, author: "Jake Morrison", avatar: "JM", message: "GymAware FLEX. More expensive but the accuracy is unmatched.", time: "2:10 PM" },
      { id: 4, author: "Tanya Brooks", avatar: "TB", message: "We use the same. The cloud dashboard makes team monitoring super easy.", time: "2:15 PM" },
      { id: 5, author: "Hiroshi Sato", avatar: "HS", message: "Can it track isometric holds too? That'd be useful for our tendon work.", time: "2:20 PM" },
      { id: 6, author: "Jake Morrison", avatar: "JM", message: "Yes! RFD and peak force during isometrics. Really clean data output.", time: "2:25 PM" },
      { id: 7, author: "Viktor Petrov", avatar: "VP", message: "Sold. Ordering one today 💪", time: "2:30 PM" },
    ],
  },
  "fitness-exercise-physiology": {
    label: "Fitness & Exercise Physiology",
    icon: HeartPulse,
    description: "Cardiovascular fitness, endurance training, and exercise physiology research applied to football performance.",
    memberCount: 187,
    postCount: 543,
    color: "bg-pink-500/10 text-pink-600",
    members: [
      { name: "Dr. Lisa Park", avatar: "LP", role: "Admin", online: true },
      { name: "Oscar Nilsson", avatar: "ON", role: "Member", online: true },
      { name: "Priya Sharma", avatar: "PS", role: "Moderator", online: false },
      { name: "Ethan Wright", avatar: "EW", role: "Member", online: true },
    ],
    posts: [
      { id: 1, author: "Dr. Lisa Park", avatar: "LP", time: "12h ago", title: "Heart rate variability as a readiness indicator", body: "3-season longitudinal data on HRV monitoring in our first team. Strong predictive value for illness susceptibility when combined with subjective wellness scores.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop", likes: 38, comments: 14, pinned: true },
      { id: 2, author: "Oscar Nilsson", avatar: "ON", time: "1d ago", title: "Small-sided games as fitness training", body: "3v3, 4v4, or 5v5 — which format best develops aerobic fitness? Our heart rate and running data across 200+ SSG sessions shows 3v3 and 4v4 elicit the highest cardiovascular demands while maintaining tactical relevance.", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop", likes: 55, comments: 23, pinned: false },
      { id: 3, author: "Priya Sharma", avatar: "PS", time: "1d ago", title: "Altitude training camps: evidence and logistics", body: "Planning a pre-season altitude camp? Here's our complete guide covering optimal altitude (1800-2500m), minimum duration (14 days), and expected physiological adaptations. Plus logistics and cost breakdown.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop", likes: 42, comments: 19, pinned: false },
      { id: 4, author: "Ethan Wright", avatar: "EW", time: "2d ago", title: "Repeated sprint ability: training methods comparison", body: "We compared 3 RSA training methods over 8 weeks: traditional intervals, repeated sprints with short recovery, and sport-specific game-based drills. All improved RSA, but game-based training also improved decision-making under fatigue.", image: null, likes: 46, comments: 20, pinned: false },
      { id: 5, author: "Dr. Lisa Park", avatar: "LP", time: "2d ago", title: "Metabolic profiling of different playing positions", body: "Central midfielders cover the most total distance, but wingers and full-backs perform the most high-intensity sprints. Our positional metabolic profiles can help individualize conditioning programs.", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=400&fit=crop", likes: 63, comments: 27, pinned: false },
      { id: 6, author: "Oscar Nilsson", avatar: "ON", time: "3d ago", title: "Heat acclimation protocols for tournament preparation", body: "With tournaments in Qatar, Saudi Arabia, and Australia, heat preparation is essential. Our 10-14 day heat acclimation protocol using controlled hyperthermia has proven effective across 3 tournament cycles.", image: null, likes: 37, comments: 15, pinned: false },
      { id: 7, author: "Priya Sharma", avatar: "PS", time: "4d ago", title: "📊 Poll: Best method to develop aerobic fitness in-season?", body: "A. High-intensity interval training (HIIT)\nB. Small-sided games\nC. Tempo runs at lactate threshold\nD. A mix depending on the training week", image: null, likes: 58, comments: 34, pinned: false },
      { id: 8, author: "Ethan Wright", avatar: "EW", time: "5d ago", title: "Blood flow restriction training for injured players", body: "BFR training at 20-30% 1RM can maintain muscle mass during immobilization. We've integrated BFR into our early-stage rehab programs with excellent hypertrophy outcomes and no adverse events.", image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&h=400&fit=crop", likes: 41, comments: 17, pinned: false },
      { id: 9, author: "Dr. Lisa Park", avatar: "LP", time: "6d ago", title: "📊 Poll: Which fitness test do you rely on most?", body: "A. Yo-Yo Intermittent Recovery Test\nB. 30-15 Intermittent Fitness Test\nC. MAS (Maximal Aerobic Speed) test\nD. GPS-derived match fitness data", image: null, likes: 52, comments: 30, pinned: false },
    ],
    events: [
      { title: "Endurance Training Symposium", date: "Apr 10, 2026", attendees: 40 },
      { title: "Heat Preparation Workshop", date: "May 5, 2026", attendees: 35 },
    ],
    rules: ["Use standardized terminology when discussing physiological concepts"],
    chatMessages: [
      { id: 1, author: "Dr. Lisa Park", avatar: "LP", message: "HRV data from this week's training looks solid. Recovery scores all green.", time: "6:00 PM" },
      { id: 2, author: "Oscar Nilsson", avatar: "ON", message: "Great to hear! The SSG session yesterday was intense though. Expected some amber flags.", time: "6:05 PM" },
      { id: 3, author: "Priya Sharma", avatar: "PS", message: "Two players showed slightly elevated resting HR this morning. Monitoring closely.", time: "6:10 PM" },
      { id: 4, author: "Ethan Wright", avatar: "EW", message: "Could be the heat. It was 32°C during training today.", time: "6:15 PM" },
      { id: 5, author: "Dr. Lisa Park", avatar: "LP", message: "Good point. Adjusting tomorrow's session intensity. Adding extra hydration breaks.", time: "6:20 PM" },
      { id: 6, author: "Oscar Nilsson", avatar: "ON", message: "Should we move the Yo-Yo test to next week when it's cooler?", time: "6:25 PM" },
      { id: 7, author: "Dr. Lisa Park", avatar: "LP", message: "Yes, let's postpone. No point testing in extreme heat — it won't reflect true fitness.", time: "6:30 PM" },
    ],
  },
};

const slugify = (label: string) =>
  label.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const itemAnim = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Group() {
  const { slug } = useParams();
  const { toast } = useToast();
  const group = slug ? groupsData[slug] : null;
  const [activeTab, setActiveTab] = useState<"discussions" | "chat" | "members" | "events" | "about">("discussions");
  const [joined, setJoined] = useState(true);
  const [posts, setPosts] = useState(group?.posts || []);
  const [chatMessages, setChatMessages] = useState(group?.chatMessages || []);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync posts when slug/group changes
  useEffect(() => {
    setPosts(group?.posts || []);
    setChatMessages(group?.chatMessages || []);
    setChatInput("");
    setActiveTab("discussions");
    setSearchQuery("");
    setSortBy("recent");
  }, [slug]);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [postMode, setPostMode] = useState<"post" | "poll">("post");

  // Poll state for groups
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("1 day");

  // Media state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoName, setSelectedVideoName] = useState<string | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedPdfName, setSelectedPdfName] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({ title: "Video too large", description: "Max 50MB allowed.", variant: "destructive" });
        return;
      }
      setSelectedVideoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handlePdfSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPdfName(file.name);
      setSelectedPdf(URL.createObjectURL(file));
    }
  };
  const handleGifSearch = () => {
    const sampleGif = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";
    setSelectedGif(sampleGif);
    toast({ title: "GIF added!" });
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) setPollOptions([...pollOptions, ""]);
  };
  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) setPollOptions(pollOptions.filter((_, i) => i !== index));
  };
  const updatePollOption = (index: number, value: string) => {
    setPollOptions(pollOptions.map((o, i) => (i === index ? value : o)));
  };

  if (!group) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Group not found</h2>
        <p className="text-sm text-muted-foreground mb-4">The group you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const Icon = group.icon;

  const handleCreatePost = () => {
    if (postMode === "poll") {
      if (!pollQuestion.trim()) {
        toast({ title: "Poll question is required", variant: "destructive" });
        return;
      }
      const validOptions = pollOptions.filter(o => o.trim());
      if (validOptions.length < 2) {
        toast({ title: "At least 2 options are required", variant: "destructive" });
        return;
      }
      const newPost = {
        id: Date.now(),
        author: "Demo User",
        avatar: "DE",
        time: "Just now",
        title: pollQuestion,
        body: validOptions.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`).join("\n"),
        image: null,
        likes: 0,
        comments: 0,
        pinned: false,
      };
      setPosts([newPost, ...posts]);
      setPollQuestion("");
      setPollOptions(["", ""]);
      setPostMode("post");
      setCreatePostOpen(false);
      toast({ title: "Poll published!", description: `Your poll is now live in ${group.label}.` });
      return;
    }
    if (!newPostBody.trim()) {
      toast({ title: "Post cannot be empty", variant: "destructive" });
      return;
    }
    const newPost = {
      id: Date.now(),
      author: "Demo User",
      avatar: "DE",
      time: "Just now",
      title: newPostTitle || newPostBody.slice(0, 60),
      body: newPostBody,
      image: null,
      likes: 0,
      comments: 0,
      pinned: false,
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostBody("");
    setPostMode("post");
    setCreatePostOpen(false);
    toast({ title: "Post published!", description: `Your post is now live in ${group.label}.` });
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleJoin = () => {
    setJoined(!joined);
    toast({ title: joined ? `Left ${group.label}` : `Joined ${group.label}!` });
  };

  const filteredMembers = group.members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "popular") return b.likes - a.likes;
    return 0; // already in recent order
  });

  const pinnedPosts = sortedPosts.filter(p => p.pinned);
  const regularPosts = sortedPosts.filter(p => !p.pinned);

  const tabs = [
    { key: "discussions" as const, label: "Discussions", icon: MessageSquare, count: posts.length },
    { key: "chat" as const, label: "Group Chat", icon: MessageSquare, count: chatMessages.length },
    { key: "members" as const, label: "Members", icon: Users, count: group.memberCount },
    { key: "events" as const, label: "Events", icon: Calendar, count: group.events.length },
    { key: "about" as const, label: "About", icon: Info },
  ];

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      id: Date.now(),
      author: "Demo User",
      avatar: "DU",
      message: chatInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl mx-auto space-y-5">
      {/* Group Header */}
      <motion.div variants={itemAnim} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 800 112" fill="none">
              <path d="M0 56 Q200 0 400 56 T800 56" stroke="currentColor" strokeWidth="1" className="text-primary" />
              <path d="M0 80 Q200 30 400 80 T800 80" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </svg>
          </div>
        </div>
        <div className="px-6 pb-5 -mt-8">
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-4">
              <div className={cn("h-16 w-16 rounded-xl flex items-center justify-center border-4 border-card shadow-md", group.color)}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-bold text-foreground">{group.label}</h1>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {group.memberCount} members</span>
                  <span>•</span>
                  <span>{group.postCount} posts</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={joined ? "outline" : "default"}
                size="sm"
                onClick={handleJoin}
                className="rounded-full"
              >
                {joined ? "Joined ✓" : <><UserPlus className="h-3.5 w-3.5 mr-1" /> Join Group</>}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(`EFC Community — ${group.label}`); toast({ title: "Link copied!" }); }}>
                    <Share2 className="h-4 w-4 mr-2" /> Share group
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Notifications muted" })}>
                    <Settings className="h-4 w-4 mr-2" /> Mute notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => toast({ title: "Group reported" })} className="text-destructive focus:text-destructive">
                    <Flag className="h-4 w-4 mr-2" /> Report group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border px-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count !== undefined && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-1">{tab.count}</Badge>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === "discussions" && (
        <div className="space-y-4">
          {/* Sort + Create Post Button */}
          <motion.div variants={itemAnim} className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  {sortBy === "recent" ? "Recent" : "Popular"} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSortBy("recent")} className={sortBy === "recent" ? "bg-accent" : ""}>Most Recent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("popular")} className={sortBy === "popular" ? "bg-accent" : ""}>Most Popular</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => { setPostMode("post"); setCreatePostOpen(true); }} className="rounded-full">
              <Plus className="h-4 w-4 mr-1" /> Create Post
            </Button>
          </motion.div>

          {/* Pinned posts */}
          {pinnedPosts.map(post => (
            <motion.div key={post.id} variants={itemAnim} className="rounded-lg border border-primary/20 bg-card shadow-card overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 pt-3 text-xs text-primary font-medium">
                <Pin className="h-3 w-3" /> Pinned
              </div>
              <PostCard post={post} onLike={handleLike} toast={toast} />
            </motion.div>
          ))}

          {/* Regular posts */}
          {regularPosts.map(post => (
            <motion.div key={post.id} variants={itemAnim} className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
              <PostCard post={post} onLike={handleLike} toast={toast} />
            </motion.div>
          ))}

          {posts.length === 0 && (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No discussions yet. Be the first to post!</p>
              <Button size="sm" className="mt-3" onClick={() => setCreatePostOpen(true)}>Start a Discussion</Button>
            </div>
          )}
        </div>
      )}

      {activeTab === "chat" && (
        <motion.div variants={itemAnim} className="rounded-lg border border-border bg-card shadow-card flex flex-col" style={{ height: "500px" }}>
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              {group.label} — Group Chat
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{chatMessages.length} messages</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => {
              const isMe = msg.author === "Demo User";
              return (
                <div key={msg.id} className={cn("flex gap-3", isMe && "flex-row-reverse")}>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-semibold shrink-0">
                    {msg.avatar}
                  </div>
                  <div className={cn("max-w-[75%]", isMe && "text-right")}>
                    <div className="flex items-center gap-2 mb-0.5" style={isMe ? { justifyContent: "flex-end" } : {}}>
                      <span className="text-xs font-semibold text-foreground">{msg.author}</span>
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    </div>
                    <div className={cn(
                      "rounded-xl px-3 py-2 text-sm leading-relaxed inline-block",
                      isMe
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    )}>
                      {msg.message}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-border flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSendChat()}
              className="flex-1 h-9 rounded-full border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <Button size="icon" className="h-9 w-9 rounded-full shrink-0" onClick={handleSendChat}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {activeTab === "members" && (
        <motion.div variants={itemAnim} className="rounded-lg border border-border bg-card shadow-card">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <Button size="sm" variant="outline" onClick={() => toast({ title: "Invite link copied!" })}>
              <UserPlus className="h-3.5 w-3.5 mr-1" /> Invite
            </Button>
          </div>
          <div className="divide-y divide-border">
            {filteredMembers.map(member => (
              <div key={member.name} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                      {member.avatar}
                    </div>
                    {member.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.role === "Admin" ? "default" : member.role === "Moderator" ? "secondary" : "outline"} className="text-[10px] px-1.5 py-0">
                        {member.role}
                      </Badge>
                      {member.online && <span className="text-[10px] text-emerald-500">Online</span>}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toast({ title: `Viewing ${member.name}'s profile` })}>View Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({ title: `Message sent to ${member.name}` })}>Send Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === "events" && (
        <div className="space-y-4">
          {group.events.length > 0 ? group.events.map((event, i) => (
            <motion.div key={i} variants={itemAnim} className="rounded-lg border border-border bg-card p-4 shadow-card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{event.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.date} • {event.attendees} attending</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => toast({ title: "RSVP confirmed!", description: `You're attending "${event.title}"` })}>
                RSVP
              </Button>
            </motion.div>
          )) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No upcoming events for this group.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "about" && (
        <motion.div variants={itemAnim} className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-2">About this group</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{group.description}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-3">Group Rules</h3>
            <ol className="space-y-2">
              {group.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                  {rule}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-2">Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div><p className="text-2xl font-bold text-foreground">{group.memberCount}</p><p className="text-xs text-muted-foreground">Members</p></div>
              <div><p className="text-2xl font-bold text-foreground">{group.postCount}</p><p className="text-xs text-muted-foreground">Posts</p></div>
              <div><p className="text-2xl font-bold text-foreground">{group.events.length}</p><p className="text-xs text-muted-foreground">Events</p></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Create Post Dialog */}
      <Dialog open={createPostOpen} onOpenChange={(open) => { setCreatePostOpen(open); if (!open) { setPostMode("post"); setSelectedImage(null); setSelectedVideo(null); setSelectedVideoName(null); setSelectedPdf(null); setSelectedPdfName(null); setSelectedGif(null); } }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              Create in {group.label}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {postMode === "post" ? (
              <>
                <input
                  type="text"
                  placeholder="Discussion title"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newPostBody}
                  onChange={e => setNewPostBody(e.target.value)}
                  className="min-h-[120px] resize-none"
                />

                {/* Media Previews */}
                {selectedImage && (
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img src={selectedImage} alt="Selected" className="w-full max-h-48 object-cover" />
                    <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 h-6 w-6 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground/90 transition-colors">
                      <X className="h-3 w-3 text-background" />
                    </button>
                  </div>
                )}
                {selectedVideo && (
                  <div className="relative rounded-lg overflow-hidden border border-border bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      <span className="text-sm text-foreground truncate flex-1">{selectedVideoName}</span>
                      <button onClick={() => { setSelectedVideo(null); setSelectedVideoName(null); }} className="h-6 w-6 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground/90 transition-colors">
                        <X className="h-3 w-3 text-background" />
                      </button>
                    </div>
                  </div>
                )}
                {selectedPdf && (
                  <div className="relative rounded-lg overflow-hidden border border-border bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-destructive" />
                      <span className="text-sm text-foreground truncate flex-1">{selectedPdfName}</span>
                      <button onClick={() => { setSelectedPdf(null); setSelectedPdfName(null); }} className="h-6 w-6 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground/90 transition-colors">
                        <X className="h-3 w-3 text-background" />
                      </button>
                    </div>
                  </div>
                )}
                {selectedGif && (
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img src={selectedGif} alt="GIF" className="w-full max-h-48 object-cover" />
                    <button onClick={() => setSelectedGif(null)} className="absolute top-2 right-2 h-6 w-6 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground/90 transition-colors">
                      <X className="h-3 w-3 text-background" />
                    </button>
                  </div>
                )}

                {/* Media Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-1">
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                    <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
                    <input ref={pdfInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handlePdfSelect} />
                    <button onClick={() => fileInputRef.current?.click()} className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Add Image">
                      <ImagePlus className="h-[18px] w-[18px]" />
                    </button>
                    <button onClick={() => videoInputRef.current?.click()} className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Add Video">
                      <Video className="h-[18px] w-[18px]" />
                    </button>
                    <button onClick={() => pdfInputRef.current?.click()} className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Attach File">
                      <Paperclip className="h-[18px] w-[18px]" />
                    </button>
                    <button onClick={() => setPostMode("poll")} className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Create Poll">
                      <BarChart3 className="h-[18px] w-[18px]" />
                    </button>
                    <button onClick={handleGifSearch} className="h-9 rounded-lg flex items-center justify-center px-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border text-xs font-bold" title="Add GIF">
                      Gif
                    </button>
                    <button className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Add Emoji">
                      <Smile className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                  <Button onClick={handleCreatePost}>
                    <Send className="h-4 w-4 mr-1" /> Post
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Textarea
                  placeholder="Ask your question..."
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  className="min-h-[80px] resize-none text-base font-medium"
                />
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" /> Poll Options
                  </p>
                  {pollOptions.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full border-2 border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <input
                        type="text"
                        placeholder={`Option ${i + 1}`}
                        value={opt}
                        onChange={e => updatePollOption(i, e.target.value)}
                        className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                      />
                      {pollOptions.length > 2 && (
                        <button onClick={() => removePollOption(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {pollOptions.length < 6 && (
                    <button onClick={addPollOption} className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors mt-1">
                      <Plus className="h-3.5 w-3.5" /> Add option
                    </button>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Poll Duration</p>
                  <select value={pollDuration} onChange={e => setPollDuration(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                    <option>1 day</option>
                    <option>3 days</option>
                    <option>1 week</option>
                    <option>2 weeks</option>
                  </select>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <button onClick={() => setPostMode("post")} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <PenTool className="h-3.5 w-3.5" /> Back to Post
                  </button>
                  <Button onClick={handleCreatePost}>
                    <Send className="h-4 w-4 mr-1" /> Post Poll
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

/* Reusable Post Card */
function PostCard({ post, onLike, toast }: {
  post: { id: number; author: string; avatar: string; time: string; title: string; body: string; image: string | null; likes: number; comments: number };
  onLike: (id: number) => void;
  toast: (opts: { title: string; description?: string }) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">{post.avatar}</div>
          <div>
            <p className="text-sm font-semibold text-foreground">{post.author}</p>
            <p className="text-xs text-muted-foreground">{post.time}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast({ title: "Post saved!" })}><BookmarkPlus className="h-4 w-4 mr-2" /> Save</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(post.title); toast({ title: "Link copied!" }); }}><Share2 className="h-4 w-4 mr-2" /> Copy link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast({ title: "Post reported" })} className="text-destructive focus:text-destructive"><Flag className="h-4 w-4 mr-2" /> Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-4 pb-3">
        <h3 className="text-sm font-semibold text-foreground mb-2">{post.title}</h3>
        <p className={cn("text-sm text-muted-foreground leading-relaxed whitespace-pre-line", !expanded && "line-clamp-4")}>{post.body}</p>
        {post.body.length > 200 && (
          <button onClick={() => setExpanded(!expanded)} className="text-xs font-bold text-foreground mt-1 hover:text-primary transition-colors">
            {expanded ? "SHOW LESS" : "READ MORE..."}
          </button>
        )}
      </div>
      {post.image && (
        <div className="px-4 pb-3">
          <img src={post.image} alt="" className="w-full rounded-lg object-cover max-h-72" />
        </div>
      )}
      <div className="px-4 pb-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>
      <div className="flex items-center border-t border-border divide-x divide-border">
        <button onClick={() => onLike(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <ThumbsUp className="h-4 w-4" /> Like
        </button>
        <button onClick={() => toast({ title: "Comment section coming soon!" })} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <MessageSquare className="h-4 w-4" /> Comment
        </button>
        <button onClick={() => { navigator.clipboard.writeText(post.title); toast({ title: "Link copied!" }); }} className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Share2 className="h-4 w-4" /> Share
        </button>
      </div>
    </>
  );
}
