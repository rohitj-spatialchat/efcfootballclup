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
    bio: "Head of Performance at Bayern Munich with 12+ years leading elite football performance programs. Specializing in data-driven training periodization, load management, and integrated multi-disciplinary support. Passionate about bridging sports science research and on-field application.",
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
    bio: "Sports Nutritionist at AC Milan focused on optimizing player performance through evidence-based nutrition strategies. Experienced in match-day fueling protocols, body composition management, and individualized dietary planning for elite athletes.",
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
    bio: "Lead Physiotherapist at AFC Ajax with expertise in injury prevention, rehabilitation, and return-to-play protocols. Combining manual therapy with cutting-edge technology to keep players performing at their peak.",
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
    bio: "Sport Psychologist at Liverpool FC helping elite athletes develop mental resilience, focus, and performance under pressure. Specializing in cognitive behavioral techniques, mindfulness, and team dynamics in high-performance environments.",
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
    bio: "Rehabilitation Specialist at FC Porto dedicated to accelerating player recovery through innovative rehab protocols. Expert in post-surgical rehabilitation, progressive loading strategies, and collaborative return-to-play pathways.",
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
    bio: "Strength & Conditioning Coach at Chelsea FC with a passion for developing athletic power, speed, and endurance in elite footballers. Experienced in periodized training, injury risk reduction, and performance testing.",
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
    bio: "Exercise Physiologist at Arsenal FC specializing in cardiorespiratory fitness assessment, metabolic profiling, and heat/altitude acclimatization for professional footballers. Driven by translating lab data into practical training recommendations.",
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
    bio: "Performance Analyst at Manchester City leveraging GPS tracking, video analysis, and advanced metrics to optimize team and individual performance. Building next-generation dashboards for coaching staff decision-making.",
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
    bio: "Sr. Head of Commercial at Juventus overseeing sponsorship strategy, brand partnerships, and revenue growth. 15+ years in sports business development with a focus on building long-term commercial value for football organizations.",
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
    bio: "Business Development Manager at SL Benfica driving strategic growth initiatives, new market expansion, and partnership development. Passionate about connecting the football industry with innovative business opportunities.",
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
    bio: "Community Leader at EFC MPU, driving engagement and collaboration across 500+ football professionals worldwide. Dedicated to fostering meaningful connections, organizing impactful events, and shaping the future of football industry networking.",
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

function loadUsers(): DummyUser[] {
  try {
    const saved = localStorage.getItem("efc_all_users");
    if (saved) return JSON.parse(saved).map((user: DummyUser) => normalizeUser(user));
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
