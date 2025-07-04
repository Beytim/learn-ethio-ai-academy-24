import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, CheckCircle, Clock, Award, ArrowLeft, ArrowRight } from "lucide-react";
import { QuizComponent } from "./QuizComponent";

interface LessonContent {
  id: string;
  title: string;
  type: 'video' | 'text' | 'interactive';
  content: string;
  duration: number;
  completed: boolean;
}

interface LessonPageProps {
  subject: string;
  grade: number;
  chapter: string;
  onBack: () => void;
  onOpenAITutor: () => void;
}

export function LessonPage({ subject, grade, chapter, onBack, onOpenAITutor }: LessonPageProps) {
  const [activeTab, setActiveTab] = useState("lesson");
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<boolean[]>([true, false, false, false]);

  const lessonSections: LessonContent[] = [
    {
      id: '1',
      title: 'What is a Set?',
      type: 'text',
      content: `A set is a well-defined collection of distinct objects. These objects are called the elements or members of the set.

Key Properties of Sets:
• Elements are distinct (no repetition)
• Order doesn't matter
• Elements can be anything: numbers, letters, objects, etc.

Examples:
• A = {1, 2, 3, 4, 5} - Set of natural numbers from 1 to 5
• B = {a, e, i, o, u} - Set of vowels
• C = {red, blue, green} - Set of colors

Notation:
• We use curly braces { } to denote sets
• Elements are separated by commas
• We use capital letters to name sets`,
      duration: 15,
      completed: true
    },
    {
      id: '2',
      title: 'Types of Sets',
      type: 'text',
      content: `There are different types of sets based on the number of elements:

1. Empty Set (∅ or {})
   - A set with no elements
   - Example: Set of natural numbers less than 1 = ∅

2. Finite Set
   - A set with a limited number of elements
   - Example: {1, 2, 3, 4, 5}

3. Infinite Set
   - A set with unlimited elements
   - Example: Set of all natural numbers = {1, 2, 3, 4, ...}

4. Universal Set (U)
   - The set that contains all elements under consideration
   - All other sets are subsets of the universal set

5. Singleton Set
   - A set with exactly one element
   - Example: {5}`,
      duration: 20,
      completed: false
    },
    {
      id: '3',
      title: 'Set Operations',
      type: 'interactive',
      content: `Set operations allow us to combine or compare sets:

1. Union (A ∪ B)
   - Contains all elements from both sets
   - Example: If A = {1, 2, 3} and B = {3, 4, 5}
   - Then A ∪ B = {1, 2, 3, 4, 5}

2. Intersection (A ∩ B)
   - Contains elements common to both sets
   - Example: A ∩ B = {3}

3. Difference (A - B)
   - Contains elements in A but not in B
   - Example: A - B = {1, 2}

4. Complement (A')
   - Contains all elements not in A (within universal set)

Interactive Exercise:
Let A = {2, 4, 6, 8} and B = {1, 2, 3, 4}
Try to find:
• A ∪ B = ?
• A ∩ B = ?
• A - B = ?`,
      duration: 25,
      completed: false
    },
    {
      id: '4',
      title: 'Venn Diagrams',
      type: 'interactive',
      content: `Venn diagrams are visual representations of sets and their relationships.

Components:
• Rectangles represent the universal set
• Circles represent individual sets
• Overlapping areas show intersections
• Different regions show different relationships

Common Venn Diagram Types:
1. Single Set - Shows elements in set A and outside A
2. Two Sets - Shows A, B, A∩B, and elements outside both
3. Three Sets - Shows all possible intersections

Uses:
• Visualize set operations
• Solve word problems
• Understand relationships between groups
• Calculate probabilities

Practice: Draw a Venn diagram for:
• Universal set U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
• Set A = {1, 3, 5, 7, 9} (odd numbers)
• Set B = {2, 4, 6, 8, 10} (even numbers)`,
      duration: 30,
      completed: false
    }
  ];

  const handleSectionComplete = (sectionIndex: number) => {
    const newCompleted = [...completedSections];
    newCompleted[sectionIndex] = true;
    setCompletedSections(newCompleted);
    
    if (sectionIndex < lessonSections.length - 1) {
      setCurrentSection(sectionIndex + 1);
    }
  };

  const calculateProgress = () => {
    const completed = completedSections.filter(Boolean).length;
    return (completed / lessonSections.length) * 100;
  };

  const currentLesson = lessonSections[currentSection];
  const totalDuration = lessonSections.reduce((acc, section) => acc + section.duration, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{chapter}</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Badge variant="secondary">Grade {grade}</Badge>
              <Badge variant="outline">{subject}</Badge>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{totalDuration} min</span>
            </div>
          </div>
        </div>
        
        <Button onClick={onOpenAITutor} variant="outline">
          Ask AI Tutor
        </Button>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8 shadow-soft">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Chapter Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(calculateProgress())}% Complete</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
            
            <div className="flex space-x-2">
              {lessonSections.map((section, index) => (
                <Button
                  key={section.id}
                  variant={currentSection === index ? "default" : completedSections[index] ? "secondary" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setCurrentSection(index)}
                >
                  {completedSections[index] && <CheckCircle className="h-3 w-3 mr-1" />}
                  Section {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lesson" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Lesson</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Practice Quiz</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lesson" className="mt-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <div className="bg-gradient-primary p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span>{currentLesson.title}</span>
                    </CardTitle>
                    <Badge variant="outline">
                      {currentLesson.duration} min
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-foreground leading-relaxed">
                      {currentLesson.content}
                    </div>
                  </div>

                  {currentLesson.type === 'interactive' && (
                    <Card className="bg-accent/10 border-accent/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Play className="h-4 w-4 text-accent" />
                          <span className="font-medium text-accent">Interactive Exercise</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This section includes hands-on practice. Work through the examples and try the exercises.
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                      disabled={currentSection === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={() => handleSectionComplete(currentSection)}
                      disabled={completedSections[currentSection]}
                      className="bg-gradient-primary"
                    >
                      {completedSections[currentSection] ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : currentSection === lessonSections.length - 1 ? (
                        "Complete Chapter"
                      ) : (
                        <>
                          Complete & Continue
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="mt-6">
              <QuizComponent
                title="Chapter 1: Sets - Practice Quiz"
                subject={subject}
                topic="Sets"
                onComplete={(score, total) => {
                  console.log(`Quiz completed: ${score}/${total}`);
                }}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chapter Navigation */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Chapter Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lessonSections.map((section, index) => (
                <Button
                  key={section.id}
                  variant={currentSection === index ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setCurrentSection(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      completedSections[index] 
                        ? 'bg-success text-success-foreground' 
                        : currentSection === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {completedSections[index] ? '✓' : index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-muted-foreground">{section.duration} min</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={onOpenAITutor} variant="outline" size="sm" className="w-full">
                Ask AI Tutor
              </Button>
              <Button onClick={() => setActiveTab("quiz")} variant="outline" size="sm" className="w-full">
                Take Practice Quiz
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Download Notes
              </Button>
            </CardContent>
          </Card>

          {/* Learning Stats */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(calculateProgress())}%</div>
                <div className="text-sm text-muted-foreground">Chapter Complete</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sections completed:</span>
                  <span>{completedSections.filter(Boolean).length}/{lessonSections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time invested:</span>
                  <span>{completedSections.filter(Boolean).length * 15} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Next milestone:</span>
                  <span>Chapter quiz</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}