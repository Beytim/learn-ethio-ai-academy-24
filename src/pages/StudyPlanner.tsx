
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SmartStudyPlanner } from "@/components/planning/SmartStudyPlanner";
import { Calendar, Clock, Target, Plus, Edit, Trash2, CheckCircle2, Brain, Zap } from "lucide-react";

const StudyPlanner = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('planner'); // 'planner', 'schedule', 'goals'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddSession, setShowAddSession] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    subject: "",
    duration: "",
    time: "",
    type: "study"
  });

  const [studySessions, setStudySessions] = useState([
    {
      id: 1,
      title: "Algebra Practice",
      subject: "Mathematics",
      date: "2024-01-15",
      time: "14:00",
      duration: 60,
      type: "study",
      completed: false
    },
    {
      id: 2,
      title: "Physics Quiz",
      subject: "Physics", 
      date: "2024-01-15",
      time: "16:00",
      duration: 45,
      type: "test",
      completed: true
    },
    {
      id: 3,
      title: "Chemistry Review",
      subject: "Chemistry",
      date: "2024-01-16",
      time: "10:00",
      duration: 90,
      type: "review",
      completed: false
    }
  ]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Complete Algebra Chapter 3",
      subject: "Mathematics",
      deadline: "2024-01-20",
      progress: 75,
      completed: false
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      deadline: "2024-01-18",
      progress: 100,
      completed: true
    }
  ]);

  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"];
  const sessionTypes = [
    { value: "study", label: "Study Session", color: "bg-blue-500" },
    { value: "review", label: "Review", color: "bg-green-500" },
    { value: "test", label: "Practice Test", color: "bg-red-500" },
    { value: "assignment", label: "Assignment", color: "bg-yellow-500" }
  ];

  const addStudySession = () => {
    if (newSession.title && newSession.subject && newSession.duration && newSession.time) {
      const session = {
        id: Date.now(),
        title: newSession.title,
        subject: newSession.subject,
        date: selectedDate,
        time: newSession.time,
        duration: parseInt(newSession.duration),
        type: newSession.type,
        completed: false
      };
      setStudySessions([...studySessions, session]);
      setNewSession({ title: "", subject: "", duration: "", time: "", type: "study" });
      setShowAddSession(false);
    }
  };

  const toggleSessionComplete = (id: number) => {
    setStudySessions(sessions =>
      sessions.map(session =>
        session.id === id ? { ...session, completed: !session.completed } : session
      )
    );
  };

  const deleteSession = (id: number) => {
    setStudySessions(sessions => sessions.filter(session => session.id !== id));
  };

  const getSessionsForDate = (date: string) => {
    return studySessions.filter(session => session.date === date);
  };

  const getTotalStudyTime = () => {
    return studySessions
      .filter(session => session.completed)
      .reduce((total, session) => total + session.duration, 0);
  };

  const getWeekDates = () => {
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      week.push(date.toISOString().split('T')[0]);
    }
    return week;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => logout()}
      />

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">
            Study <span className="bg-gradient-hero bg-clip-text text-transparent">Planner</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered study planning to optimize your learning schedule and track progress towards your academic goals
          </p>
        </div>

        {/* View Selection */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg">
            {[
              { id: 'planner', label: 'Smart Planner', icon: Brain },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'goals', label: 'Goals & Progress', icon: Target }
            ].map((view) => {
              const Icon = view.icon;
              return (
                <Button
                  key={view.id}
                  variant={activeView === view.id ? "default" : "ghost"}
                  onClick={() => setActiveView(view.id)}
                  className="mx-1"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {view.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content based on active view */}
        {activeView === 'planner' && (
          <SmartStudyPlanner currentUser={user ? { 
            id: user.id, 
            name: user.name, 
            grade: user.grade || 9, 
            subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History']
          } : { 
            id: '1', 
            name: 'Student', 
            grade: 9, 
            subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History']
          }} />
        )}

        {activeView === 'schedule' && (

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar and Sessions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Week View */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>This Week</span>
                    </CardTitle>
                    <Button onClick={() => setShowAddSession(true)} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {getWeekDates().map((date, index) => {
                      const dateObj = new Date(date);
                      const dayName = dateObj.toLocaleDateString('en', { weekday: 'short' });
                      const dayNumber = dateObj.getDate();
                      const sessionsCount = getSessionsForDate(date).length;
                      
                      return (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 rounded-lg text-center transition-colors ${
                            selectedDate === date
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="text-xs text-muted-foreground">{dayName}</div>
                          <div className="font-semibold">{dayNumber}</div>
                          {sessionsCount > 0 && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Sessions for Selected Date */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">
                      Sessions for {new Date(selectedDate).toLocaleDateString('en', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    
                    {getSessionsForDate(selectedDate).length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        No sessions scheduled for this date
                      </p>
                    ) : (
                      getSessionsForDate(selectedDate).map((session) => {
                        const sessionType = sessionTypes.find(type => type.value === session.type);
                        return (
                          <div
                            key={session.id}
                            className={`p-4 rounded-lg border ${
                              session.completed ? 'bg-green-50 border-green-200' : 'bg-card'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => toggleSessionComplete(session.id)}
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    session.completed
                                      ? 'bg-green-500 border-green-500'
                                      : 'border-muted-foreground hover:border-primary'
                                  }`}
                                >
                                  {session.completed && <CheckCircle2 className="h-3 w-3 text-white" />}
                                </button>
                                <div>
                                  <h4 className={`font-medium ${session.completed ? 'line-through' : ''}`}>
                                    {session.title}
                                  </h4>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Badge variant="outline">{session.subject}</Badge>
                                    <span>{session.time}</span>
                                    <span>{session.duration} min</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${sessionType?.color}`} />
                                <Button
                                  onClick={() => deleteSession(session.id)}
                                  size="sm"
                                  variant="ghost"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Add Session Form */}
              {showAddSession && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add Study Session</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Session title"
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={newSession.subject} onValueChange={(value) => setNewSession({...newSession, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={newSession.type} onValueChange={(value) => setNewSession({...newSession, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Session type" />
                        </SelectTrigger>
                        <SelectContent>
                          {sessionTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="time"
                        value={newSession.time}
                        onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Duration (minutes)"
                        value={newSession.duration}
                        onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={addStudySession}>Add Session</Button>
                      <Button onClick={() => setShowAddSession(false)} variant="outline">Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Goals and Stats */}
            <div className="space-y-6">
              {/* Study Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Study Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{getTotalStudyTime()}</div>
                    <div className="text-sm text-muted-foreground">Minutes studied</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed Sessions</span>
                      <span>{studySessions.filter(s => s.completed).length}/{studySessions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>This Week</span>
                      <span>{getWeekDates().reduce((total, date) => total + getSessionsForDate(date).length, 0)} sessions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Learning Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${goal.completed ? 'line-through' : ''}`}>
                            {goal.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{goal.subject}</Badge>
                            <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {goal.completed && <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'goals' && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Learning Goals & Progress Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">
                    Comprehensive goal tracking and progress analytics coming soon
                  </div>
                  <Button onClick={() => setActiveView('schedule')}>
                    View Current Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default StudyPlanner;
