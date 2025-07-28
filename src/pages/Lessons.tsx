import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { LectureViewer } from "@/components/LectureViewer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
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
  Target,
  ChevronRight,
  ArrowLeft,
  Layers,
  FileText,
  Video,
  BookOpenCheck,
  GraduationCap,
  Brain
} from "lucide-react";

interface Lecture {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  duration: number;
  completed: boolean;
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  lectures: Lecture[];
  totalDuration: number;
  progress: number;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  grade: number;
  units: Unit[];
  color: string;
  icon: string;
  progress: number;
  totalUnits: number;
  ethiopianCurriculumCode: string;
}

// Ethiopian textbook-aligned subjects data
const ethiopianSubjects: Subject[] = [
  {
    id: "math-9",
    name: "Mathematics",
    description: "Grade 9 Mathematics following Ethiopian curriculum",
    grade: 9,
    ethiopianCurriculumCode: "MATH-G9-ET",
    color: "bg-blue-500",
    icon: "📊",
    progress: 65,
    totalUnits: 8,
    units: [
      {
        id: "unit-1",
        title: "Real Numbers",
        description: "Understanding the real number system, rational and irrational numbers",
        totalLessons: 5,
        completedLessons: 3,
        estimatedTime: "2 weeks",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to Real Numbers",
            description: "Learn about different types of numbers and their properties",
            totalDuration: 45,
            progress: 100,
            lectures: [
              {
                id: "lecture-1-1-1",
                title: "What are Real Numbers?",
                type: "video",
                duration: 15,
                completed: true,
                description: "Introduction to real number system and classification"
              },
              {
                id: "lecture-1-1-2",
                title: "Types of Real Numbers",
                type: "reading",
                duration: 20,
                completed: true,
                description: "Understanding rational vs irrational numbers with examples"
              },
              {
                id: "lecture-1-1-3",
                title: "Practice Exercises",
                type: "exercise",
                duration: 10,
                completed: true,
                description: "Classify different numbers and identify their types"
              }
            ]
          },
          {
            id: "lesson-1-2",
            title: "Operations with Real Numbers",
            description: "Addition, subtraction, multiplication and division of real numbers",
            totalDuration: 60,
            progress: 60,
            lectures: [
              {
                id: "lecture-1-2-1",
                title: "Addition and Subtraction",
                type: "video",
                duration: 20,
                completed: true,
                description: "Basic operations with real numbers and their properties"
              },
              {
                id: "lecture-1-2-2",
                title: "Multiplication and Division",
                type: "video",
                duration: 25,
                completed: false,
                description: "Advanced operations with real numbers and order of operations"
              },
              {
                id: "lecture-1-2-3",
                title: "Properties of Operations",
                type: "reading",
                duration: 15,
                completed: false,
                description: "Commutative, associative, and distributive properties"
              }
            ]
          },
          {
            id: "lesson-1-3",
            title: "Number Line and Inequalities",
            description: "Representing real numbers on a number line and understanding inequalities",
            totalDuration: 50,
            progress: 0,
            lectures: [
              {
                id: "lecture-1-3-1",
                title: "The Number Line",
                type: "video",
                duration: 18,
                completed: false,
                description: "Visual representation of real numbers"
              },
              {
                id: "lecture-1-3-2",
                title: "Comparing Real Numbers",
                type: "exercise",
                duration: 22,
                completed: false,
                description: "Using inequality symbols and ordering numbers"
              },
              {
                id: "lecture-1-3-3",
                title: "Absolute Value",
                type: "video",
                duration: 10,
                completed: false,
                description: "Understanding absolute value and its properties"
              }
            ]
          }
        ]
      },
      {
        id: "unit-2",
        title: "Algebraic Expressions",
        description: "Working with variables, expressions, and basic equations",
        totalLessons: 6,
        completedLessons: 1,
        estimatedTime: "3 weeks",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Variables and Expressions",
            description: "Understanding algebraic expressions and variables",
            totalDuration: 50,
            progress: 80,
            lectures: [
              {
                id: "lecture-2-1-1",
                title: "What are Variables?",
                type: "video",
                duration: 15,
                completed: true,
                description: "Introduction to algebraic variables and their uses"
              },
              {
                id: "lecture-2-1-2",
                title: "Writing Expressions",
                type: "exercise",
                duration: 20,
                completed: true,
                description: "Practice writing algebraic expressions from word problems"
              },
              {
                id: "lecture-2-1-3",
                title: "Evaluating Expressions",
                type: "video",
                duration: 15,
                completed: false,
                description: "Substituting values and evaluating algebraic expressions"
              }
            ]
          },
          {
            id: "lesson-2-2",
            title: "Simplifying Expressions",
            description: "Learning to combine like terms and simplify algebraic expressions",
            totalDuration: 55,
            progress: 0,
            lectures: [
              {
                id: "lecture-2-2-1",
                title: "Like Terms",
                type: "video",
                duration: 20,
                completed: false,
                description: "Identifying and combining like terms"
              },
              {
                id: "lecture-2-2-2",
                title: "Distributive Property",
                type: "reading",
                duration: 15,
                completed: false,
                description: "Using distributive property to simplify expressions"
              },
              {
                id: "lecture-2-2-3",
                title: "Practice Problems",
                type: "exercise",
                duration: 20,
                completed: false,
                description: "Simplify complex algebraic expressions"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "physics-10",
    name: "Physics",
    description: "Grade 10 Physics following Ethiopian curriculum",
    grade: 10,
    ethiopianCurriculumCode: "PHYS-G10-ET",
    color: "bg-green-500",
    icon: "⚡",
    progress: 45,
    totalUnits: 6,
    units: [
      {
        id: "unit-p1",
        title: "Motion in One Dimension",
        description: "Understanding linear motion, velocity, and acceleration",
        totalLessons: 4,
        completedLessons: 2,
        estimatedTime: "2 weeks",
        lessons: [
          {
            id: "lesson-p1-1",
            title: "Position and Displacement",
            description: "Learn about position, distance, and displacement",
            totalDuration: 40,
            progress: 100,
            lectures: [
              {
                id: "lecture-p1-1-1",
                title: "What is Motion?",
                type: "video",
                duration: 15,
                completed: true,
                description: "Introduction to motion in physics and frame of reference"
              },
              {
                id: "lecture-p1-1-2",
                title: "Position vs Displacement",
                type: "reading",
                duration: 15,
                completed: true,
                description: "Understanding the difference between distance and displacement"
              },
              {
                id: "lecture-p1-1-3",
                title: "Practice Problems",
                type: "exercise",
                duration: 10,
                completed: true,
                description: "Solve displacement and position problems"
              }
            ]
          },
          {
            id: "lesson-p1-2",
            title: "Velocity and Speed",
            description: "Understanding the concepts of velocity and speed",
            totalDuration: 45,
            progress: 70,
            lectures: [
              {
                id: "lecture-p1-2-1",
                title: "Average vs Instantaneous Velocity",
                type: "video",
                duration: 20,
                completed: true,
                description: "Different types of velocity and their calculations"
              },
              {
                id: "lecture-p1-2-2",
                title: "Velocity-Time Graphs",
                type: "reading",
                duration: 15,
                completed: true,
                description: "Interpreting and drawing velocity-time graphs"
              },
              {
                id: "lecture-p1-2-3",
                title: "Problem Solving",
                type: "exercise",
                duration: 10,
                completed: false,
                description: "Calculate velocity in various scenarios"
              }
            ]
          }
        ]
      },
      {
        id: "unit-p2",
        title: "Forces and Newton's Laws",
        description: "Understanding forces and the fundamental laws of motion",
        totalLessons: 5,
        completedLessons: 0,
        estimatedTime: "3 weeks",
        lessons: [
          {
            id: "lesson-p2-1",
            title: "Introduction to Forces",
            description: "What are forces and how do they affect motion",
            totalDuration: 50,
            progress: 0,
            lectures: [
              {
                id: "lecture-p2-1-1",
                title: "Types of Forces",
                type: "video",
                duration: 20,
                completed: false,
                description: "Contact and non-contact forces in physics"
              },
              {
                id: "lecture-p2-1-2",
                title: "Force Diagrams",
                type: "reading",
                duration: 15,
                completed: false,
                description: "Drawing and interpreting free body diagrams"
              },
              {
                id: "lecture-p2-1-3",
                title: "Net Force",
                type: "exercise",
                duration: 15,
                completed: false,
                description: "Calculating net force from multiple forces"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "chemistry-11",
    name: "Chemistry", 
    description: "Grade 11 Chemistry following Ethiopian curriculum",
    grade: 11,
    ethiopianCurriculumCode: "CHEM-G11-ET",
    color: "bg-purple-500",
    icon: "🧪",
    progress: 30,
    totalUnits: 7,
    units: [
      {
        id: "unit-c1",
        title: "Atomic Structure",
        description: "Understanding atoms, electrons, and periodic trends",
        totalLessons: 5,
        completedLessons: 1,
        estimatedTime: "3 weeks",
        lessons: [
          {
            id: "lesson-c1-1", 
            title: "The Atom",
            description: "Basic structure of atoms and subatomic particles",
            totalDuration: 55,
            progress: 70,
            lectures: [
              {
                id: "lecture-c1-1-1",
                title: "Subatomic Particles",
                type: "video",
                duration: 20,
                completed: true,
                description: "Protons, neutrons, and electrons and their properties"
              },
              {
                id: "lecture-c1-1-2",
                title: "Atomic Models",
                type: "reading",
                duration: 25,
                completed: true,
                description: "Evolution of atomic models from Dalton to quantum"
              },
              {
                id: "lecture-c1-1-3",
                title: "Electron Configuration",
                type: "exercise",
                duration: 10,
                completed: false,
                description: "Practice writing electron configurations"
              }
            ]
          },
          {
            id: "lesson-c1-2",
            title: "Periodic Table",
            description: "Understanding periodic trends and element properties",
            totalDuration: 60,
            progress: 0,
            lectures: [
              {
                id: "lecture-c1-2-1",
                title: "Periodic Law",
                type: "video",
                duration: 25,
                completed: false,
                description: "Mendeleev's periodic law and modern periodic table"
              },
              {
                id: "lecture-c1-2-2",
                title: "Periodic Trends",
                type: "reading",
                duration: 20,
                completed: false,
                description: "Atomic radius, ionization energy, and electronegativity trends"
              },
              {
                id: "lecture-c1-2-3",
                title: "Element Properties Quiz",
                type: "quiz",
                duration: 15,
                completed: false,
                description: "Test your knowledge of periodic trends"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "biology-12",
    name: "Biology",
    description: "Grade 12 Biology following Ethiopian curriculum", 
    grade: 12,
    ethiopianCurriculumCode: "BIO-G12-ET",
    color: "bg-emerald-500",
    icon: "🧬",
    progress: 20,
    totalUnits: 5,
    units: [
      {
        id: "unit-b1",
        title: "Cell Biology",
        description: "Understanding cell structure, function, and processes",
        totalLessons: 6,
        completedLessons: 1,
        estimatedTime: "4 weeks",
        lessons: [
          {
            id: "lesson-b1-1",
            title: "Cell Structure",
            description: "Basic cell components and their functions",
            totalDuration: 50,
            progress: 50,
            lectures: [
              {
                id: "lecture-b1-1-1",
                title: "Cell Membrane",
                type: "video",
                duration: 18,
                completed: true,
                description: "Structure and function of cell membrane and transport"
              },
              {
                id: "lecture-b1-1-2",
                title: "Organelles",
                type: "reading",
                duration: 22,
                completed: false,
                description: "Different organelles and their specific roles in the cell"
              },
              {
                id: "lecture-b1-1-3",
                title: "Cell Types Quiz",
                type: "quiz",
                duration: 10,
                completed: false,
                description: "Test your knowledge of prokaryotic vs eukaryotic cells"
              }
            ]
          },
          {
            id: "lesson-b1-2",
            title: "Cellular Respiration",
            description: "How cells generate energy through respiration",
            totalDuration: 65,
            progress: 0,
            lectures: [
              {
                id: "lecture-b1-2-1",
                title: "Glycolysis",
                type: "video",
                duration: 25,
                completed: false,
                description: "First stage of cellular respiration in the cytoplasm"
              },
              {
                id: "lecture-b1-2-2",
                title: "Krebs Cycle",
                type: "video",
                duration: 20,
                completed: false,
                description: "Second stage of respiration in mitochondria"
              },
              {
                id: "lecture-b1-2-3",
                title: "Electron Transport Chain",
                type: "reading",
                duration: 20,
                completed: false,
                description: "Final stage producing most ATP molecules"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "english-9",
    name: "English",
    description: "Grade 9 English Language following Ethiopian curriculum",
    grade: 9,
    ethiopianCurriculumCode: "ENG-G9-ET",
    color: "bg-indigo-500",
    icon: "📚",
    progress: 55,
    totalUnits: 6,
    units: [
      {
        id: "unit-e1",
        title: "Reading Comprehension",
        description: "Developing reading skills and comprehension strategies",
        totalLessons: 4,
        completedLessons: 2,
        estimatedTime: "2 weeks",
        lessons: [
          {
            id: "lesson-e1-1",
            title: "Reading Strategies",
            description: "Effective strategies for understanding texts",
            totalDuration: 45,
            progress: 100,
            lectures: [
              {
                id: "lecture-e1-1-1",
                title: "Skimming and Scanning",
                type: "video",
                duration: 15,
                completed: true,
                description: "Quick reading techniques for finding information"
              },
              {
                id: "lecture-e1-1-2",
                title: "Context Clues",
                type: "reading",
                duration: 20,
                completed: true,
                description: "Using surrounding text to understand word meanings"
              },
              {
                id: "lecture-e1-1-3",
                title: "Practice Reading",
                type: "exercise",
                duration: 10,
                completed: true,
                description: "Apply reading strategies to sample texts"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "amharic-10",
    name: "Amharic",
    description: "Grade 10 Amharic Language following Ethiopian curriculum",
    grade: 10,
    ethiopianCurriculumCode: "AMH-G10-ET",
    color: "bg-yellow-500",
    icon: "🇪🇹",
    progress: 40,
    totalUnits: 5,
    units: [
      {
        id: "unit-a1",
        title: "ሰዋስው (Grammar)",
        description: "Understanding Amharic grammar rules and sentence structure",
        totalLessons: 5,
        completedLessons: 2,
        estimatedTime: "3 weeks",
        lessons: [
          {
            id: "lesson-a1-1",
            title: "ቃላት አገባብ (Word Formation)",
            description: "Learning how words are formed in Amharic",
            totalDuration: 40,
            progress: 75,
            lectures: [
              {
                id: "lecture-a1-1-1",
                title: "ሥር ቃላት (Root Words)",
                type: "video",
                duration: 15,
                completed: true,
                description: "Understanding root words in Amharic"
              },
              {
                id: "lecture-a1-1-2",
                title: "ቅጥያዎች (Suffixes)",
                type: "reading",
                duration: 15,
                completed: true,
                description: "Common suffixes and their meanings"
              },
              {
                id: "lecture-a1-1-3",
                title: "ልምምድ (Practice)",
                type: "exercise",
                duration: 10,
                completed: false,
                description: "Practice forming words with suffixes"
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function Lessons() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [currentView, setCurrentView] = useState<'subjects' | 'units' | 'lessons' | 'lectures' | 'lecture-viewer'>('subjects');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const gradeOptions = ["all", "9", "10", "11", "12"];
  
  const filteredSubjects = ethiopianSubjects.filter((subject) => {
    const searchMatch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const gradeMatch = selectedGrade === "all" || subject.grade.toString() === selectedGrade;
    return searchMatch && gradeMatch;
  });

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView('units');
  };

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentView('lessons');
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('lectures');
  };

  const handleLectureClick = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    setCurrentView('lecture-viewer');
  };

  const handleLectureComplete = () => {
    if (selectedLecture) {
      // Update lecture completion status
      toast({
        title: "Lecture Completed! 🎉",
        description: `You've completed "${selectedLecture.title}". Keep up the great work!`,
      });
      setCurrentView('lectures');
      setSelectedLecture(null);
    }
  };

  const handleOpenAITutor = () => {
    toast({
      title: "AI Tutor Coming Soon! 🧠",
      description: "The AI tutor feature will help you with personalized learning assistance.",
    });
  };

  const handleBack = () => {
    if (currentView === 'lecture-viewer') {
      setCurrentView('lectures');
      setSelectedLecture(null);
    } else if (currentView === 'lectures') {
      setCurrentView('lessons');
      setSelectedLesson(null);
    } else if (currentView === 'lessons') {
      setCurrentView('units');
      setSelectedUnit(null);
    } else if (currentView === 'units') {
      setCurrentView('subjects');
      setSelectedSubject(null);
    }
  };

  const getBreadcrumbs = () => {
    const crumbs = ['Subjects'];
    if (selectedSubject) crumbs.push(selectedSubject.name);
    if (selectedUnit) crumbs.push(selectedUnit.title);
    if (selectedLesson) crumbs.push(selectedLesson.title);
    return crumbs;
  };

  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'reading': return <FileText className="h-4 w-4" />;
      case 'exercise': return <BookOpenCheck className="h-4 w-4" />;
      case 'quiz': return <Target className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

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

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {getBreadcrumbs().map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              <span className={index === getBreadcrumbs().length - 1 ? "font-medium text-foreground" : ""}>
                {crumb}
              </span>
            </div>
          ))}
        </div>
        
        {currentView !== 'subjects' && (
          <Button variant="ghost" onClick={handleBack} className="mt-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
      </div>

      {/* Filters */}
      {currentView === 'subjects' && (
        <div className="container mx-auto px-4 pb-8">
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter Ethiopian Curriculum</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="searchTerm" className="block text-sm font-medium text-muted-foreground">
                  Search Subjects
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    id="searchTerm"
                    placeholder="Search subjects..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-muted-foreground">
                  Grade Level
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
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        
        {/* Subjects View */}
        {currentView === 'subjects' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No subjects found matching your criteria.</p>
              </div>
            ) : (
              filteredSubjects.map((subject) => (
                <Card 
                  key={subject.id} 
                  className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <CardTitle className="text-xl">{subject.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">Grade {subject.grade}</Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{subject.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Layers className="h-4 w-4" />
                        <span>{subject.totalUnits} Units</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{subject.ethiopianCurriculumCode}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Units View */}
        {currentView === 'units' && selectedSubject && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">{selectedSubject.name}</h2>
              <p className="text-muted-foreground">{selectedSubject.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {selectedSubject.units.map((unit) => (
                <Card 
                  key={unit.id}
                  className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => handleUnitClick(unit)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{unit.title}</CardTitle>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{unit.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Lessons Completed</span>
                        <span>{unit.completedLessons}/{unit.totalLessons}</span>
                      </div>
                      <Progress value={(unit.completedLessons / unit.totalLessons) * 100} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{unit.totalLessons} Lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{unit.estimatedTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lessons View */}
        {currentView === 'lessons' && selectedUnit && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">{selectedUnit.title}</h2>
              <p className="text-muted-foreground">{selectedUnit.description}</p>
            </div>
            
            <div className="grid gap-4">
              {selectedUnit.lessons.map((lesson) => (
                <Card 
                  key={lesson.id}
                  className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => handleLessonClick(lesson)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{lesson.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>{lesson.lectures.length} Lectures</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.totalDuration} min</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lectures View */}
        {currentView === 'lectures' && selectedLesson && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">{selectedLesson.title}</h2>
              <p className="text-muted-foreground">{selectedLesson.description}</p>
            </div>
            
            <div className="grid gap-4">
              {selectedLesson.lectures.map((lecture, index) => (
                <Card 
                  key={lecture.id}
                  className="group hover:shadow-medium hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => handleLectureClick(lecture)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{lecture.title}</CardTitle>
                          <Badge variant={lecture.type === 'video' ? 'default' : lecture.type === 'reading' ? 'secondary' : 'outline'}>
                            {lecture.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {lecture.completed && <CheckCircle className="h-5 w-5 text-success" />}
                        {getLectureIcon(lecture.type)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{lecture.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{lecture.duration} min</span>
                      </div>
                      <Button 
                        variant={lecture.completed ? "outline" : "default"} 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLectureClick(lecture);
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {lecture.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lecture Viewer */}
        {currentView === 'lecture-viewer' && selectedLecture && (
          <LectureViewer
            lecture={selectedLecture}
            onBack={handleBack}
            onComplete={handleLectureComplete}
            onOpenAITutor={handleOpenAITutor}
          />
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
