
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { StudentDashboard } from "@/components/StudentDashboard";
import { LessonPage } from "@/components/LessonPage";
import { AITutorChat } from "@/components/AITutorChat";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'lesson'>('home');
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [lessonDetails, setLessonDetails] = useState({ subject: 'Mathematics', grade: 7, chapter: 'Chapter 1: Sets' });

  const handleGetStarted = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleStartLesson = (subject: string, grade: number) => {
    setLessonDetails({ 
      subject, 
      grade, 
      chapter: subject === 'Mathematics' ? 'Chapter 1: Sets' : `${subject} Fundamentals` 
    });
    setCurrentView('lesson');
  };

  const renderCurrentView = () => {
    if (user) {
      switch (currentView) {
        case 'dashboard':
          return (
            <StudentDashboard 
              onStartLesson={handleStartLesson}
              onOpenAITutor={() => setIsAITutorOpen(true)}
            />
          );
        case 'lesson':
          return (
            <LessonPage
              subject={lessonDetails.subject}
              grade={lessonDetails.grade}
              chapter={lessonDetails.chapter}
              onBack={() => setCurrentView('dashboard')}
              onOpenAITutor={() => setIsAITutorOpen(true)}
            />
          );
        default:
          return (
            <>
              <HeroSection onGetStarted={handleGetStarted} />
              <FeaturesSection />
            </>
          );
      }
    }
    
    return (
      <>
        <HeroSection onGetStarted={handleGetStarted} />
        <FeaturesSection />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => navigate('/auth')}
        onLogout={() => {
          logout();
          setCurrentView('home');
        }}
      />
      
      {renderCurrentView()}

      <AITutorChat
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        subject={lessonDetails.subject}
        topic="Sets"
      />
    </div>
  );
};

export default Index;
