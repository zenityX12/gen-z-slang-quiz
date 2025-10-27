import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateScore, generateMeaningQuestions, generatePronunciationQuestions } from '@/lib/quiz-utils';
import { QuizQuestion, SlangWord } from '@/types/slang';
import { ArrowLeft, Check, X, BookOpen, Headphones, RotateCcw, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';

export default function Quiz() {
  const [, params] = useRoute('/quiz/:type');
  const [, setLocation] = useLocation();
  const quizType = params?.type as 'meaning' | 'pronunciation';

  const [slangWords, setSlangWords] = useState<SlangWord[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<number, string>>(new Map());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/slang-data.json');
        const data: SlangWord[] = await response.json();
        setSlangWords(data);

        const quizQuestions =
          quizType === 'meaning'
            ? generateMeaningQuestions(data, 10)
            : generatePronunciationQuestions(data, 10);

        setQuestions(quizQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error loading slang data:', error);
        setLoading(false);
      }
    }

    loadData();
  }, [quizType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">กำลังโหลดคำถาม...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>ไม่พบข้อมูล</CardTitle>
            <CardDescription>ไม่สามารถโหลดคำถามได้</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation('/')} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              กลับหน้าหลัก
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = new Map(userAnswers);
      newAnswers.set(currentQuestion.id, selectedAnswer);
      setUserAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers.get(questions[currentQuestionIndex - 1].id) || null);
    }
  };

  if (showResult) {
    const result = calculateScore(questions, userAnswers);
    const percentage = result.score;
    const getScoreMessage = (score: number) => {
      if (score >= 90) return { text: 'ยอดเยี่ยม!', color: 'text-green-600' };
      if (score >= 70) return { text: 'ดีมาก!', color: 'text-blue-600' };
      if (score >= 50) return { text: 'ดี', color: 'text-yellow-600' };
      return { text: 'ลองใหม่อีกครั้ง', color: 'text-orange-600' };
    };
    const scoreMessage = getScoreMessage(percentage);

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card sticky top-0 z-10">
          <div className="container py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                {quizType === 'meaning' ? (
                  <BookOpen className="w-5 h-5" />
                ) : (
                  <Headphones className="w-5 h-5" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold">ผลการทดสอบ</h1>
                <p className="text-xs text-muted-foreground">
                  {quizType === 'meaning' ? 'ทดสอบความหมาย' : 'ทดสอบการออกเสียง'}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container py-6 md:py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Score Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className={`text-5xl md:text-6xl font-bold ${scoreMessage.color}`}>
                    {percentage}%
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-semibold">{scoreMessage.text}</p>
                    <p className="text-muted-foreground">
                      ตอบถูก {result.correctAnswers.length} จาก {questions.length} ข้อ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answers Review */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">รายละเอียดคำตอบ</h2>
              <div className="space-y-3">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers.get(question.id);
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <Card
                      key={question.id}
                      className={`${
                        isCorrect
                          ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30'
                          : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/30'
                      }`}
                    >
                      <CardContent className="pt-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {isCorrect ? (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900">
                                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900">
                                <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="font-semibold text-foreground break-words">
                              {index + 1}. {question.word}
                            </div>
                            <div className="text-sm space-y-1">
                              <div className="flex flex-wrap items-start gap-1">
                                <span className="text-muted-foreground flex-shrink-0">คำตอบของคุณ:</span>
                                <span
                                  className={`${
                                    isCorrect
                                      ? 'text-green-600 dark:text-green-400'
                                      : 'text-red-600 dark:text-red-400'
                                  } break-words`}
                                >
                                  {userAnswer || 'ไม่ได้ตอบ'}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="flex flex-wrap items-start gap-1">
                                  <span className="text-muted-foreground flex-shrink-0">คำตอบที่ถูกต้อง:</span>
                                  <span className="text-green-600 dark:text-green-400 font-medium break-words">
                                    {question.correctAnswer}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setLocation('/')}
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                กลับหน้าหลัก
              </Button>
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setUserAnswers(new Map());
                  setSelectedAnswer(null);
                  setShowResult(false);
                  const newQuestions =
                    quizType === 'meaning'
                      ? generateMeaningQuestions(slangWords, 10)
                      : generatePronunciationQuestions(slangWords, 10);
                  setQuestions(newQuestions);
                }}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                ทำแบบทดสอบอีกครั้ง
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                {quizType === 'meaning' ? (
                  <BookOpen className="w-5 h-5" />
                ) : (
                  <Headphones className="w-5 h-5" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                  {quizType === 'meaning' ? 'ทดสอบความหมาย' : 'ทดสอบการออกเสียง'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  คำถามที่ {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>ความคืบหน้า</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl md:text-3xl text-center font-semibold">
                {currentQuestion.word}
              </CardTitle>
              <CardDescription className="text-center text-base">
                {quizType === 'meaning'
                  ? 'คำนี้มีความหมายว่าอะไร?'
                  : 'คำนี้ออกเสียงว่าอย่างไร?'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Options */}
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  return (
                    <Button
                      key={index}
                      variant={isSelected ? 'default' : 'outline'}
                      className="h-auto py-4 px-4 text-left justify-start text-base font-normal hover:border-primary/50"
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <span className="mr-3 font-semibold flex-shrink-0">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="break-words">{option}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ย้อนกลับ
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="flex-1"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'ดูผลคะแนน' : 'ถัดไป'}
                  {currentQuestionIndex < questions.length - 1 && (
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

