import { createContext, useContext, useState, ReactNode } from "react";

export interface DummyUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  club: string;
  position: string;
  country: string;
}

const dummyUsers: DummyUser[] = [
  {
    id: "u1",
    firstName: "Maximilian",
    lastName: "Lankheit",
    email: "max@efcfootball.com",
    password: "max123",
    phone: "+49 170 1234567",
    role: "Head of Performance",
    club: "Bayern Munich",
    position: "Performance Director",
    country: "Germany",
  },
  {
    id: "u2",
    firstName: "Chiara",
    lastName: "Delsaut",
    email: "chiara@efcfootball.com",
    password: "chiara123",
    phone: "+33 6 1234 5678",
    role: "Sports Nutritionist",
    club: "AC Milan",
    position: "Nutritionist",
    country: "Italy",
  },
  {
    id: "u3",
    firstName: "Jeroen",
    lastName: "Peters",
    email: "jeroen@efcfootball.com",
    password: "jeroen123",
    phone: "+31 6 12345678",
    role: "Lead Physiotherapist",
    club: "AFC Ajax",
    position: "Physiotherapist",
    country: "Netherlands",
  },
  {
    id: "u4",
    firstName: "Emma",
    lastName: "Deakin",
    email: "emma@efcfootball.com",
    password: "emma123",
    phone: "+44 7700 900123",
    role: "Sport Psychologist",
    club: "Liverpool FC",
    position: "Psychologist",
    country: "United Kingdom",
  },
  {
    id: "u5",
    firstName: "Pauline",
    lastName: "Clavel",
    email: "pauline@efcfootball.com",
    password: "pauline123",
    phone: "+33 6 9876 5432",
    role: "Rehabilitation Specialist",
    club: "FC Porto",
    position: "Rehab Specialist",
    country: "France",
  },
  {
    id: "u6",
    firstName: "Kasper",
    lastName: "Thornton",
    email: "kasper@efcfootball.com",
    password: "kasper123",
    phone: "+45 20 123456",
    role: "Strength & Conditioning Coach",
    club: "Chelsea FC",
    position: "S&C Coach",
    country: "Denmark",
  },
  {
    id: "u7",
    firstName: "Teena",
    lastName: "Murray",
    email: "teena@efcfootball.com",
    password: "teena123",
    phone: "+353 87 1234567",
    role: "Exercise Physiologist",
    club: "Arsenal FC",
    position: "Exercise Physiologist",
    country: "Ireland",
  },
  {
    id: "u8",
    firstName: "Tim",
    lastName: "Zuleger",
    email: "tim@efcfootball.com",
    password: "tim123",
    phone: "+49 151 9876543",
    role: "Performance Analyst",
    club: "Manchester City",
    position: "Performance Analyst",
    country: "Germany",
  },
  {
    id: "u9",
    firstName: "Michael",
    lastName: "S",
    email: "michael@efcfootball.com",
    password: "michael123",
    phone: "+44 7911 123456",
    role: "Sr. Head of Commercial",
    club: "Juventus",
    position: "Commercial Director",
    country: "United Kingdom",
  },
  {
    id: "u10",
    firstName: "Michel",
    lastName: "S",
    email: "michel@efcfootball.com",
    password: "michel123",
    phone: "+32 470 123456",
    role: "Business Development Manager",
    club: "SL Benfica",
    position: "Business Development",
    country: "Belgium",
  },
  {
    id: "u11",
    firstName: "Demo",
    lastName: "User",
    email: "demo@efcfootball.com",
    password: "demo123",
    phone: "+1 555 0100",
    role: "Community Leader",
    club: "Inter Milan",
    position: "Community Manager",
    country: "United States",
  },
];

interface AuthContextType {
  user: DummyUser | null;
  users: DummyUser[];
  login: (username: string, password: string) => boolean;
  signup: (firstName: string, lastName: string, email: string, phone: string) => DummyUser;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DummyUser | null>(() => {
    const saved = localStorage.getItem("efc_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (username: string, password: string): boolean => {
    const found = dummyUsers.find(
      (u) =>
        (u.email === username ||
          u.firstName.toLowerCase() === username.toLowerCase() ||
          `${u.firstName} ${u.lastName}`.toLowerCase() === username.toLowerCase()) &&
        u.password === password,
    );
    if (found) {
      setUser(found);
      localStorage.setItem("efc_user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const signup = (firstName: string, lastName: string, email: string, phone: string): DummyUser => {
    const newUser: DummyUser = {
      id: `u${Date.now()}`,
      firstName,
      lastName,
      email,
      password: "welcome123",
      phone,
      role: "Member",
      club: "",
      position: "",
      country: "",
    };
    setUser(newUser);
    localStorage.setItem("efc_user", JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("efc_user");
  };

  return (
    <AuthContext.Provider value={{ user, users: dummyUsers, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export { dummyUsers };
