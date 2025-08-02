import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LectureViewer } from "@/components/LectureViewer";
import { SubjectSelector } from "@/components/SubjectSelector";
import { CurriculumTree } from "@/components/CurriculumTree";
import { LearningPathway } from "@/components/LearningPathway";
import { 
  ArrowLeft,
  Map
} from "lucide-react";

const Lessons = () => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentView, setCurrentView] = useState('subjects'); // 'subjects', 'curriculum', 'pathway', 'lesson'

  const handleLessonSelect = (lesson, unit) => {
    setSelectedLesson({ ...lesson, unit });
    setCurrentView('lesson');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentView('curriculum');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentView('subjects');
  };

  const handleBackToCurriculum = () => {
    setSelectedLesson(null);
    setCurrentView('curriculum');
  };

  const handleViewPathway = () => {
    setCurrentView('pathway');
  };

  if (currentView === 'lesson' && selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          user={user}
          onLogin={() => setIsAuthModalOpen(true)}
          onLogout={() => logout()}
        />
        
        <LectureViewer 
          lecture={selectedLesson}
          onBack={handleBackToCurriculum}
          onComplete={() => console.log('Lesson completed')}
          onOpenAITutor={() => console.log('AI Tutor opened')}
        />
        
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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                {currentView !== 'subjects' && (
                  <Button variant="ghost" onClick={handleBackToSubjects}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Subjects
                  </Button>
                )}
                <h1 className="text-4xl font-bold">
                  {currentView === 'subjects' && 'Ethiopian Curriculum'}
                  {currentView === 'curriculum' && selectedSubject?.name}
                  {currentView === 'pathway' && 'Learning Pathway'}
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                {currentView === 'subjects' && 'Choose your subject to start learning'}
                {currentView === 'curriculum' && `${selectedSubject?.nameAmharic} - Complete curriculum overview`}
                {currentView === 'pathway' && 'Your personalized learning journey'}
              </p>
            </div>
            
            {currentView === 'subjects' && (
              <Button onClick={handleViewPathway} variant="outline">
                <Map className="h-4 w-4 mr-2" />
                View Learning Pathway
              </Button>
            )}
          </div>
        </div>

        {/* Dynamic Content Based on Current View */}
        {currentView === 'subjects' && (
          <SubjectSelector onSubjectSelect={handleSubjectSelect} />
        )}
        
        {currentView === 'curriculum' && selectedSubject && (
          <CurriculumTree 
            subjectId={selectedSubject.id}
            subjectName={selectedSubject.name}
            subjectNameAmharic={selectedSubject.nameAmharic}
            onLessonSelect={handleLessonSelect}
          />
        )}
        
        {currentView === 'pathway' && (
          <LearningPathway 
            studentLevel="intermediate"
            focusArea="mathematics"
            onStepSelect={(step) => console.log('Selected step:', step)}
          />
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Lessons;