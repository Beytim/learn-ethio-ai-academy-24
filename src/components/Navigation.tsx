
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, LogOut, Home, Search, Info, MessageCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavigationProps {
  user?: {
    name: string;
    role: 'student' | 'teacher' | 'parent' | 'admin';
    avatar?: string;
  };
  onLogin: () => void;
  onLogout: () => void;
}

export function Navigation({ user, onLogin, onLogout }: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'teacher': return 'secondary';
      case 'parent': return 'outline';
      case 'student': return 'default';
      default: return 'outline';
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-primary p-2 rounded-xl shadow-medium group-hover:shadow-strong transition-all duration-300">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Beytim Academy
              </h1>
              <p className="text-xs text-muted-foreground">Learn. Grow. Excel.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground shadow-medium' 
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/lessons" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/lessons') 
                  ? 'bg-primary text-primary-foreground shadow-medium' 
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Lessons</span>
            </Link>

            <Link 
              to="/about" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-primary text-primary-foreground shadow-medium' 
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>

            <Link 
              to="/contact" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive('/contact') 
                  ? 'bg-primary text-primary-foreground shadow-medium' 
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            
            {user && (
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/dashboard') 
                    ? 'bg-primary text-primary-foreground shadow-medium' 
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:shadow-medium transition-all duration-300">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-card border border-border shadow-strong" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/lessons" className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>My Lessons</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleGetStarted} 
                className="bg-gradient-primary hover:shadow-medium transition-all duration-300 shadow-soft"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
