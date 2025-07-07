
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Lessons from "./pages/Lessons";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Practice from "./pages/Practice";
import PracticeTests from "./pages/PracticeTests";
import VideoLessons from "./pages/VideoLessons";
import StudyPlanner from "./pages/StudyPlanner";
import SocialLearning from "./pages/SocialLearning";
import OfflineMode from "./pages/OfflineMode";
import Analytics from "./pages/Analytics";
import Certificates from "./pages/Certificates";
import ContentManagement from "./pages/ContentManagement";
import MobileApp from "./pages/MobileApp";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice-tests" element={<PracticeTests />} />
            <Route path="/video-lessons" element={<VideoLessons />} />
            <Route path="/study-planner" element={<StudyPlanner />} />
            <Route path="/social-learning" element={<SocialLearning />} />
            <Route path="/offline-mode" element={<OfflineMode />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/content-management" element={<ContentManagement />} />
            <Route path="/mobile-app" element={<MobileApp />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
