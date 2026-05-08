import { createContext, useContext, useState, ReactNode } from "react";

export interface DummyUser {
  id: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  club: string;
  position: string;
  country: string;
  bio?: string;
  interests?: string[];
}

const defaultUsers: DummyUser[] = [
  {
    id: "u1",
    username: "max",
    firstName: "Maximilian",
    lastName: "Lankheit",
    email: "max@efcfootball.com",
    password: "max123",
    phone: "+49 170 1234567",
    role: "Head of Performance",
    club: "Bayern Munich",
    position: "Performance Director",
    country: "Germany",
    bio: "Head of Performance at Bayern Munich with 12+ years leading elite football performance programs. Specializing in data-driven training periodization, load management, and integrated multi-disciplinary support. Passionate about bridging sports science research and on-field application to maximize player availability and peak match-day readiness.\n\nOver the past decade, I have built and led high-performance departments across Bundesliga and international football, implementing cutting-edge GPS tracking, force-plate diagnostics, and wellness monitoring systems. My philosophy centers on collaborative leadership — uniting physiotherapists, nutritionists, sport psychologists, and coaching staff under a shared performance framework. I believe that sustainable success in elite football depends on marrying innovation with player-centered care, and I'm committed to mentoring the next generation of performance practitioners.",
    interests: ["Sport & Exercise Science", "Leadership", "Fitness & Exercise Physiology"],
  },
  {
    id: "u2",
    username: "chiara",
    firstName: "Chiara",
    lastName: "Delsaut",
    email: "chiara@efcfootball.com",
    password: "chiara123",
    phone: "+33 6 1234 5678",
    role: "Sports Nutritionist",
    club: "AC Milan",
    position: "Nutritionist",
    country: "Italy",
    bio: "Sports Nutritionist at AC Milan focused on optimizing player performance through evidence-based nutrition strategies. Experienced in match-day fueling protocols, body composition management, and individualized dietary planning for elite athletes.\n\nWith a background in clinical dietetics and sports science, I design periodized nutrition plans that align with training loads and competition schedules. My work spans hydration optimization, supplement protocols, and gut-health management for traveling squads. I collaborate closely with the medical and performance teams to ensure every player receives tailored nutritional support, from youth academy prospects to senior internationals. I'm passionate about educating athletes on the 'why' behind their nutrition, empowering them to make better choices on and off the pitch.",
    interests: ["Nutrition", "Recovery and Regeneration", "Sport & Exercise Science"],
  },
  {
    id: "u3",
    username: "jeroen",
    firstName: "Jeroen",
    lastName: "Peters",
    email: "jeroen@efcfootball.com",
    password: "jeroen123",
    phone: "+31 6 12345678",
    role: "Lead Physiotherapist",
    club: "AFC Ajax",
    position: "Physiotherapist",
    country: "Netherlands",
    bio: "Lead Physiotherapist at AFC Ajax with expertise in injury prevention, rehabilitation, and return-to-play protocols. Combining manual therapy with cutting-edge technology to keep players performing at their peak.\n\nMy approach integrates hands-on treatment with data-driven decision-making — using isokinetic testing, force platforms, and movement screening to build individualized injury-risk profiles. Over 10 years in professional football, I have managed complex musculoskeletal injuries from acute care through competitive return, working in close partnership with surgeons, strength coaches, and sport scientists. I am deeply committed to the Ajax philosophy of developing young talent, and I take pride in creating a physiotherapy culture that prioritizes long-term athlete health alongside short-term competitive demands.",
    interests: ["Sports Medicine & Physiotherapy", "Recovery and Regeneration", "Education"],
  },
  {
    id: "u4",
    username: "emma",
    firstName: "Emma",
    lastName: "Deakin",
    email: "emma@efcfootball.com",
    password: "emma123",
    phone: "+44 7700 900123",
    role: "Sport Psychologist",
    club: "Liverpool FC",
    position: "Psychologist",
    country: "United Kingdom",
    bio: "Sport Psychologist at Liverpool FC helping elite athletes develop mental resilience, focus, and performance under pressure. Specializing in cognitive behavioral techniques, mindfulness, and team dynamics in high-performance environments.\n\nI work one-on-one with players navigating the psychological demands of elite competition — from managing performance anxiety and building confidence after injury, to developing leadership skills in senior players. My toolkit includes acceptance and commitment therapy, visualization, and biofeedback training. Beyond individual sessions, I design team-wide mental performance programs, facilitate squad cohesion workshops, and support coaching staff in creating psychologically safe training environments. I'm a firm believer that mental fitness is as trainable as physical fitness, and my mission is to normalize mental health conversations in professional football.",
    interests: ["Sport Psychology", "Communication", "Leadership"],
  },
  {
    id: "u5",
    username: "pauline",
    firstName: "Pauline",
    lastName: "Clavel",
    email: "pauline@efcfootball.com",
    password: "pauline123",
    phone: "+33 6 9876 5432",
    role: "Rehabilitation Specialist",
    club: "FC Porto",
    position: "Rehab Specialist",
    country: "France",
    bio: "Rehabilitation Specialist at FC Porto dedicated to accelerating player recovery through innovative rehab protocols. Expert in post-surgical rehabilitation, progressive loading strategies, and collaborative return-to-play pathways.\n\nMy career has been shaped by a passion for bridging the gap between the treatment room and the training pitch. I specialize in ACL, hamstring, and ankle reconstruction rehabilitation, utilizing anti-gravity treadmills, blood-flow restriction training, and neuromuscular re-education to safely accelerate timelines without compromising tissue integrity. I work hand-in-hand with surgeons, physiotherapists, and performance staff to create seamless transition plans, ensuring players return not just fit, but confident and resilient. Mentoring junior rehab practitioners and contributing to return-to-play research are central to my professional identity.",
    interests: ["Sports Medicine & Physiotherapy", "Recovery and Regeneration", "Strength & Power"],
  },
  {
    id: "u6",
    username: "kasper",
    firstName: "Kasper",
    lastName: "Thornton",
    email: "kasper@efcfootball.com",
    password: "kasper123",
    phone: "+45 20 123456",
    role: "Strength & Conditioning Coach",
    club: "Chelsea FC",
    position: "S&C Coach",
    country: "Denmark",
    bio: "Strength & Conditioning Coach at Chelsea FC with a passion for developing athletic power, speed, and endurance in elite footballers. Experienced in periodized training, injury risk reduction, and performance testing.\n\nI design and deliver strength, speed, and conditioning programs tailored to the physical demands of Premier League football. My methodology blends traditional weight training with plyometrics, velocity-based training, and sport-specific movement patterns. I use GPS and accelerometer data to monitor training loads and adjust programs in real time, ensuring players peak for match days while minimizing overuse injuries. Collaboration with the medical department is central to my practice — together we build robust, resilient athletes who can sustain the intensity of a 50+ game season.",
    interests: ["Strength & Power", "Fitness & Exercise Physiology", "Coaching"],
  },
  {
    id: "u7",
    username: "teena",
    firstName: "Teena",
    lastName: "Murray",
    email: "teena@efcfootball.com",
    password: "teena123",
    phone: "+353 87 1234567",
    role: "Exercise Physiologist",
    club: "Arsenal FC",
    position: "Exercise Physiologist",
    country: "Ireland",
    bio: "Exercise Physiologist at Arsenal FC specializing in cardiorespiratory fitness assessment, metabolic profiling, and heat/altitude acclimatization for professional footballers. Driven by translating lab data into practical training recommendations.\n\nIn my role I oversee VO2max testing, lactate threshold assessments, and body composition analysis to create individualized fitness benchmarks for every player in the squad. I design pre-season conditioning programs, manage environmental preparation for international competitions, and collaborate with the nutrition team on fueling strategies that align with metabolic demands. My research background in exercise immunology also informs our illness-prevention protocols during congested fixture periods. I'm passionate about making complex physiological data accessible and actionable for coaches and players alike.",
    interests: ["Fitness & Exercise Physiology", "Sport & Exercise Science", "Education"],
  },
  {
    id: "u8",
    username: "tim",
    firstName: "Tim",
    lastName: "Zuleger",
    email: "tim@efcfootball.com",
    password: "tim123",
    phone: "+49 151 9876543",
    role: "Performance Analyst",
    club: "Manchester City",
    position: "Performance Analyst",
    country: "Germany",
    bio: "Performance Analyst at Manchester City leveraging GPS tracking, video analysis, and advanced metrics to optimize team and individual performance. Building next-generation dashboards for coaching staff decision-making.\n\nI combine Catapult/STATSports GPS data with tactical video coding to provide coaches with actionable insights before, during, and after matches. My work covers physical output analysis, pressing intensity metrics, positional heat maps, and opponent profiling. I develop custom visualization tools and automated reporting pipelines that integrate seamlessly into the coaching workflow. Beyond the technical side, I pride myself on translating complex data into clear narratives that influence tactical decisions — because the best analysis is the kind that coaches and players can immediately understand and act upon.",
    interests: ["Sport & Exercise Science", "Career Development", "Management"],
  },
  {
    id: "u9",
    username: "michael",
    firstName: "Michael",
    lastName: "S",
    email: "michael@efcfootball.com",
    password: "michael123",
    phone: "+44 7911 123456",
    role: "Sr. Head of Commercial",
    club: "Juventus",
    position: "Commercial Director",
    country: "United Kingdom",
    bio: "Sr. Head of Commercial at Juventus overseeing sponsorship strategy, brand partnerships, and revenue growth. 15+ years in sports business development with a focus on building long-term commercial value for football organizations.\n\nThroughout my career I have negotiated and managed multi-million euro sponsorship agreements with global brands across sportswear, automotive, financial services, and technology sectors. My approach combines market analytics with relationship-driven sales to create partnerships that deliver measurable ROI for both the club and its sponsors. I also lead our hospitality and matchday experience programs, continuously innovating to elevate fan engagement and premium revenue streams. I'm passionate about the intersection of sport and business, and I actively mentor young professionals looking to build careers in football's commercial landscape.",
    interests: ["Leadership", "Management", "Networking"],
  },
  {
    id: "u10",
    username: "michel",
    firstName: "Michel",
    lastName: "S",
    email: "michel@efcfootball.com",
    password: "michel123",
    phone: "+32 470 123456",
    role: "Business Development Manager",
    club: "SL Benfica",
    position: "Business Development",
    country: "Belgium",
    bio: "Business Development Manager at SL Benfica driving strategic growth initiatives, new market expansion, and partnership development. Passionate about connecting the football industry with innovative business opportunities.\n\nI identify and develop commercial opportunities that extend Benfica's global footprint — from international pre-season tours and licensing deals to digital content partnerships and fan engagement platforms. My background in management consulting gives me a structured approach to market analysis, competitive positioning, and stakeholder management. I work cross-functionally with marketing, legal, and football operations to ensure every new initiative aligns with the club's long-term strategic vision. Networking across the European football ecosystem is at the heart of what I do, and I thrive on building relationships that create mutual value.",
    interests: ["Networking", "Career Development", "Management"],
  },
  {
    id: "u11",
    username: "demo",
    firstName: "Demo",
    lastName: "User",
    email: "demo@efcfootball.com",
    password: "demo123",
    phone: "+1 555 0100",
    role: "Community Leader",
    club: "Inter Milan",
    position: "Community Manager",
    country: "United States",
    bio: "Community Leader at EFC MPU, driving engagement and collaboration across 500+ football professionals worldwide. Dedicated to fostering meaningful connections, organizing impactful events, and shaping the future of football industry networking.\n\nAs the Community Manager, I design and facilitate programs that bring together performance scientists, medical staff, coaches, and business leaders to share knowledge and best practices. From curating webinar series and in-person summits to managing our digital platform and mentorship programs, my goal is to create an inclusive space where every member feels valued and empowered to grow. I also gather community feedback to continuously improve our offerings and ensure we're addressing the real challenges facing football professionals today. Building bridges across disciplines and cultures is what drives me every day.",
    interests: ["Networking", "Leadership", "Communication"],
  },
];

function normalizeUser(user: DummyUser): DummyUser {
  const matchedDefaultUser = defaultUsers.find(
    (defaultUser) => defaultUser.id === user.id || defaultUser.email === user.email,
  );

  return {
    ...user,
    username:
      user.username?.trim().toLowerCase() ||
      matchedDefaultUser?.username ||
      user.email.split("@")[0].trim().toLowerCase() ||
      user.firstName.trim().toLowerCase(),
  };
}

// Names of test/junk accounts that should always be purged from storage.
const REMOVED_USER_NAMES = ["deepankar singh", "hjwbd bwdj"];
function isRemovedUser(u: DummyUser): boolean {
  const full = `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim().toLowerCase();
  return REMOVED_USER_NAMES.includes(full);
}

function loadUsers(): DummyUser[] {
  try {
    const saved = localStorage.getItem("efc_all_users");
    if (saved) {
      const savedUsers: DummyUser[] = JSON.parse(saved);
      const filtered = savedUsers.filter((u) => !isRemovedUser(u));
      // Merge saved users with defaults to pick up any new fields (like bio, interests)
      const merged = filtered.map((user) => {
        const defaultMatch = defaultUsers.find((d) => d.id === user.id || d.email === user.email);
        if (defaultMatch) {
          return normalizeUser({
            ...defaultMatch,
            ...user,
            bio: user.bio && user.bio.length > 50 ? user.bio : defaultMatch.bio,
            interests: user.interests?.length ? user.interests : defaultMatch.interests,
          });
        }
        return normalizeUser(user);
      });
      // Persist the cleanup so the junk users don't reappear next load.
      if (filtered.length !== savedUsers.length) {
        localStorage.setItem("efc_all_users", JSON.stringify(merged));
      }
      return merged;
    }
  } catch {}
  return defaultUsers.map(normalizeUser);
}

function saveUsers(users: DummyUser[]) {
  localStorage.setItem("efc_all_users", JSON.stringify(users.map(normalizeUser)));
}

interface AuthContextType {
  user: DummyUser | null;
  users: DummyUser[];
  login: (username: string, password: string) => boolean;
  signup: (firstName: string, lastName: string, email: string, phone: string, password: string) => DummyUser;
  updateProfile: (updates: Partial<DummyUser>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<DummyUser[]>(loadUsers);
  const [user, setUser] = useState<DummyUser | null>(() => {
    const saved = localStorage.getItem("efc_user");
    if (saved) {
      try {
        return normalizeUser(JSON.parse(saved));
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (username: string, password: string): boolean => {
    const normalizedUsername = username.trim().toLowerCase();
    const found = allUsers.find(
      (u) =>
        (u.email.toLowerCase() === normalizedUsername ||
          u.username?.toLowerCase() === normalizedUsername ||
          u.firstName.toLowerCase() === normalizedUsername ||
          u.firstName.toLowerCase().startsWith(normalizedUsername) ||
          `${u.firstName} ${u.lastName}`.toLowerCase() === normalizedUsername) &&
        u.password === password,
    );
    if (found) {
      const normalizedUser = normalizeUser(found);
      setUser(normalizedUser);
      localStorage.setItem("efc_user", JSON.stringify(normalizedUser));
      return true;
    }
    return false;
  };

  const signup = (firstName: string, lastName: string, email: string, phone: string, password: string): DummyUser => {
    const newUser: DummyUser = normalizeUser({
      id: `u${Date.now()}`,
      firstName,
      lastName,
      email,
      password,
      phone,
      role: "Member",
      club: "",
      position: "",
      country: "",
    });
    const updated = [...allUsers, newUser];
    setAllUsers(updated);
    saveUsers(updated);
    setUser(newUser);
    localStorage.setItem("efc_user", JSON.stringify(newUser));
    return newUser;
  };

  const updateProfile = (updates: Partial<DummyUser>) => {
    if (!user) return;
    const updatedUser = normalizeUser({ ...user, ...updates });
    setUser(updatedUser);
    localStorage.setItem("efc_user", JSON.stringify(updatedUser));
    const updatedAll = allUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    setAllUsers(updatedAll);
    saveUsers(updatedAll);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("efc_user");
  };

  return (
    <AuthContext.Provider value={{ user, users: allUsers, login, signup, updateProfile, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export { defaultUsers as dummyUsers };
