import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Award, 
  Play, 
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  chapter: string;
  description: string;
  duration: number;
  popularity: number;
  rating: number;
  lastAccessed: string;
  completed: boolean;
}

const lessonsData: Lesson[] = [
  {
    id: "1",
    title: "Introduction to Sets",
    subject: "Mathematics",
    grade: 7,
    chapter: "Chapter 1: Sets",
    description: "Learn the basics of set theory, including types of sets and set operations.",
    duration: 45,
    popularity: 85,
    rating: 4.5,
    lastAccessed: "2024-08-15",
    completed: true,
  },
  {
    id: "2",
    title: "Algebraic Expressions",
    subject: "Mathematics",
    grade: 8,
    chapter: "Chapter 2: Algebra",
    description: "Understand algebraic expressions, including simplification and evaluation.",
    duration: 60,
    popularity: 78,
    rating: 4.2,
    lastAccessed: "2024-08-10",
    completed: false,
  },
  {
    id: "3",
    title: "Introduction to Physics",
    subject: "Physics",
    grade: 9,
    chapter: "Chapter 1: Mechanics",
    description: "Explore the fundamental concepts of mechanics, including motion and forces.",
    duration: 50,
    popularity: 92,
    rating: 4.8,
    lastAccessed: "2024-08-20",
    completed: true,
  },
  {
    id: "4",
    title: "Chemical Reactions",
    subject: "Chemistry",
    grade: 10,
    chapter: "Chapter 3: Chemistry",
    description: "Learn about chemical reactions, including balancing equations and types of reactions.",
    duration: 55,
    popularity: 80,
    rating: 4.0,
    lastAccessed: "2024-08-05",
    completed: false,
  },
  {
    id: "5",
    title: "The World of Biology",
    subject: "Biology",
    grade: 7,
    chapter: "Chapter 1: Biology",
    description: "Discover the basics of biology, including cell structure and function.",
    duration: 40,
    popularity: 88,
    rating: 4.6,
    lastAccessed: "2024-08-12",
    completed: true,
  },
  {
    id: "6",
    title: "Geometry Fundamentals",
    subject: "Mathematics",
    grade: 9,
    chapter: "Chapter 3: Geometry",
    description: "Explore the fundamental concepts of geometry, including shapes and angles.",
    duration: 65,
    popularity: 75,
    rating: 4.1,
    lastAccessed: "2024-08-08",
    completed: false,
  },
  {
    id: "7",
    title: "Thermodynamics",
    subject: "Physics",
    grade: 11,
    chapter: "Chapter 2: Thermodynamics",
    description: "Understand the principles of thermodynamics, including heat and energy transfer.",
    duration: 48,
    popularity: 90,
    rating: 4.7,
    lastAccessed: "2024-08-18",
    completed: true,
  },
  {
    id: "8",
    title: "Organic Chemistry",
    subject: "Chemistry",
    grade: 12,
    chapter: "Chapter 4: Chemistry",
    description: "Learn about organic chemistry, including hydrocarbons and functional groups.",
    duration: 52,
    popularity: 82,
    rating: 4.3,
    lastAccessed: "2024-08-02",
    completed: false,
  },
  {
    id: "9",
    title: "Ecology and Environment",
    subject: "Biology",
    grade: 8,
    chapter: "Chapter 2: Biology",
    description: "Explore the basics of ecology and the environment, including ecosystems and biodiversity.",
    duration: 38,
    popularity: 86,
    rating: 4.4,
    lastAccessed: "2024-08-14",
    completed: true,
  },
  {
    id: "10",
    title: "Calculus Basics",
    subject: "Mathematics",
    grade: 12,
    chapter: "Chapter 4: Calculus",
    description: "Discover the basics of calculus, including limits and derivatives.",
    duration: 70,
    popularity: 72,
    rating: 3.9,
    lastAccessed: "2024-08-06",
    completed: false,
  },
];

export default function Lessons() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filteredLessons = lessonsData.filter((lesson) => {
    const searchMatch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const gradeMatch = selectedGrade === "all" || lesson.grade.toString() === selectedGrade;
    const subjectMatch = selectedSubject === "all" || lesson.subject === selectedSubject;

    return searchMatch && gradeMatch && subjectMatch;
  });

  const gradeOptions = ["all", "7", "8", "9", "10", "11", "12"];
  const subjectOptions = ["all", "Mathematics", "Physics", "Chemistry", "Biology"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        user={user}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={() => logout()}
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold animate-slide-up">
              Explore Our Lessons
            </h1>
            <p className="text-xl text-primary-foreground/90 animate-slide-up">
              Unlock your potential with our comprehensive lesson library.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Lessons</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-muted-foreground">
                Search
              </label>
              <div className="relative">
                <Input
                  type="text"
                  id="searchTerm"
                  placeholder="Search by title or description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-muted-foreground">
                Grade
              </label>
              <select
                id="grade"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade === "all" ? "All Grades" : `Grade ${grade}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground">
                Subject
              </label>
              <select
                id="subject"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">No lessons found matching your criteria.</p>
            </div>
          ) : (
            filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    <Badge variant="outline">Grade {lesson.grade}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">{lesson.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>{lesson.popularity}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="secondary" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Start Lesson
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
