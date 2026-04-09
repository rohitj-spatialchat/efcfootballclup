import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ViewModeProvider } from "./contexts/ViewModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import DashboardLayout from "./components/DashboardLayout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Community from "./pages/Community";
import Knowledge from "./pages/Knowledge";
import Networking from "./pages/Networking";
import Leaderboard from "./pages/Leaderboard";
import AISearch from "./pages/AISearch";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import Welcome from "./pages/Welcome";
import Recommendations from "./pages/Recommendations";
import IntroduceYourself from "./pages/IntroduceYourself";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Engagement from "./pages/Engagement";
import Chat from "./pages/Chat";
import Announcements from "./pages/Announcements";
import Group from "./pages/Group";
import Redemption from "./pages/Redemption";
import MyProfile from "./pages/MyProfile";
import MemberProfile from "./pages/MemberProfile";
import ExploreGroups from "./pages/ExploreGroups";
import CalendarPage from "./pages/Calendar";
import EventDetail from "./pages/EventDetail";
import HelpChatWidget from "./components/HelpChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ViewModeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth pages - no layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/introduce" element={<IntroduceYourself />} />

          {/* Dashboard pages - with layout */}
          <Route path="/*" element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events" element={<Events />} />
                <Route path="/community" element={<Community />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/networking" element={<Networking />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/ai-search" element={<AISearch />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/engagement" element={<Engagement />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/groups/:slug" element={<Group />} />
                <Route path="/explore-groups" element={<ExploreGroups />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/calendar/:eventId" element={<EventDetail />} />
                <Route path="/redemption" element={<Redemption />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/member/:slug" element={<MemberProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          } />
        </Routes>
      </BrowserRouter>
      <HelpChatWidget />
    </TooltipProvider>
    </ViewModeProvider>
  </QueryClientProvider>
);

export default App;
