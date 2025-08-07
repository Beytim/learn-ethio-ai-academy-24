import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  BookOpen,
  MessageCircle,
  Settings,
  Subtitles
} from "lucide-react";

interface VideoNote {
  timestamp: number;
  note: string;
  id: string;
}

interface VideoQuiz {
  timestamp: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
  transcript?: string;
  notes: VideoNote[];
  quizzes: VideoQuiz[];
  chapters: { title: string; timestamp: number }[];
}

interface InteractiveVideoPlayerProps {
  lesson: VideoLesson;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

export function InteractiveVideoPlayer({ lesson, onProgress, onComplete }: InteractiveVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeQuiz, setActiveQuiz] = useState<VideoQuiz | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onProgress((video.currentTime / video.duration) * 100);
      
      // Check for quiz triggers
      const quiz = lesson.quizzes.find(q => 
        Math.abs(q.timestamp - video.currentTime) < 0.5 && !activeQuiz
      );
      if (quiz) {
        setActiveQuiz(quiz);
        setIsPlaying(false);
        video.pause();
      }
    };

    const handleEnded = () => {
      onComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [lesson.quizzes, activeQuiz, onProgress, onComplete]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = (value[0] / 100) * video.duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const jumpToChapter = (timestamp: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = timestamp;
  };

  const changeSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setUserAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const continueVideo = () => {
    setActiveQuiz(null);
    setUserAnswer(null);
    setShowQuizResult(false);
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = videoRef.current ? (currentTime / videoRef.current.duration) * 100 : 0;

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Video Container */}
      <Card className="overflow-hidden bg-black">
        <div className="relative aspect-video">
          {/* Video Element */}
          <video
            ref={videoRef}
            src={lesson.videoUrl}
            poster={lesson.thumbnailUrl}
            className="w-full h-full object-cover"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          />

          {/* Quiz Overlay */}
          {activeQuiz && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
              <Card className="max-w-md w-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Quick Check</h3>
                  </div>
                  
                  <p className="text-lg">{activeQuiz.question}</p>
                  
                  {!showQuizResult ? (
                    <div className="space-y-2">
                      {activeQuiz.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className={`p-3 rounded-lg ${
                        userAnswer === activeQuiz.correctAnswer 
                          ? 'bg-success/20 text-success' 
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        {userAnswer === activeQuiz.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activeQuiz.explanation}
                      </p>
                      <Button onClick={continueVideo} className="w-full">
                        Continue Video
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="space-y-3">
                {/* Progress Bar */}
                <Slider
                  value={[progress]}
                  onValueChange={handleSeek}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
                
                {/* Controls Row */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => skip(-10)}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => skip(10)}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setVolume(volume > 0 ? 0 : 1)}
                        className="text-white hover:bg-white/20"
                      >
                        {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                      <Slider
                        value={[volume * 100]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        className="w-20"
                      />
                    </div>

                    <span className="text-sm ml-4">
                      {formatTime(currentTime)} / {formatTime(videoRef.current?.duration || 0)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <select
                      value={playbackSpeed}
                      onChange={(e) => changeSpeed(Number(e.target.value))}
                      className="bg-transparent text-white text-sm border border-white/30 rounded px-2 py-1"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-white hover:bg-white/20"
                    >
                      <Subtitles className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Video Info & Tools */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Chapter Navigation */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Chapters
            </h3>
            <div className="space-y-2">
              {lesson.chapters.map((chapter, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => jumpToChapter(chapter.timestamp)}
                  className="w-full justify-start text-left"
                >
                  <span className="text-xs text-muted-foreground mr-2">
                    {formatTime(chapter.timestamp)}
                  </span>
                  {chapter.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Notes</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {lesson.notes.map((note) => (
                <div key={note.id} className="text-sm">
                  <Badge variant="outline" className="text-xs mb-1">
                    {formatTime(note.timestamp)}
                  </Badge>
                  <p className="text-muted-foreground">{note.note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transcript */}
        {showTranscript && lesson.transcript && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Transcript</h3>
              <div className="text-sm text-muted-foreground max-h-40 overflow-y-auto">
                {lesson.transcript}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}