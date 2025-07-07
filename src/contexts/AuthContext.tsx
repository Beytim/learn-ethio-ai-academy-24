
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  grade?: number;
  avatar?: string;
  progress?: {
    completedLessons: number;
    totalQuizzes: number;
    avgScore: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher' | 'parent' | 'admin') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'student@demo.com',
    role: 'student',
    grade: 7,
    progress: {
      completedLessons: 12,
      totalQuizzes: 8,
      avgScore: 85
    }
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'teacher@demo.com',
    role: 'teacher'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'parent@demo.com',
    role: 'parent'
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: 'admin'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('beytim_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'teacher' | 'parent' | 'admin') => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email and role
    const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('beytim_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('beytim_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
