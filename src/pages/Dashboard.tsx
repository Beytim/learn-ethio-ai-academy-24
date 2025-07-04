
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { StudentDashboard } from "@/components/StudentDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if not logged in
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleStartLesson = (subject: string, grade: number) => {
    // For now, redirect to lessons page - can be enhanced later
    navigate('/lessons');
  };

  const handleOpenAITutor = () => {
    // Placeholder for AI tutor functionality
    console.log('AI Tutor opened');
  };

  if (!user) {
    return null; // Will redirect to home
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => {}}
        onLogout={() => navigate('/')}
      />
      
      <StudentDashboard 
        onStartLesson={handleStartLesson}
        onOpenAITutor={handleOpenAITutor}
      />
    </div>
  );
};

export default Dashboard;
