
import { Navigation } from "@/components/Navigation";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { ParentDashboard } from "@/components/ParentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Mock user role - in a real app, this would come from the user data
  const userRole = user?.role || 'student';

  const renderDashboard = () => {
    switch (userRole) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  const getDashboardTitle = () => {
    switch (userRole) {
      case 'teacher':
        return 'Teacher Dashboard';
      case 'parent':
        return 'Parent Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      default:
        return 'Student Dashboard';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={() => logout()}
        />
        
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Please sign in to access your personalized learning experience.
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:shadow-medium transition-all duration-300"
          >
            Sign In
          </button>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => logout()}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {getDashboardTitle()}
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome back, {user.name}! Here's your learning overview.
          </p>
        </div>
        
        {renderDashboard()}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
