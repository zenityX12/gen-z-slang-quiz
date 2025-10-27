import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateScore, generateMeaningQuestions, generatePronunciationQuestions } from '@/lib/quiz-utils';
import { QuizQuestion, SlangWord } from '@/types/slang';
import { ArrowLeft, Check, X } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลดคำถาม...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>ไม่พบข้อมูล</CardTitle>
            <CardDescription>ไม่สามารถโหลดคำถามได้</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation('/')}>กลับหน้าหลัก</Button>
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container py-8 md:py-16">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">ผลการทดสอบ</CardTitle>
                <CardDescription>
                  {quizType === 'meaning' ? 'ทดสอบความหมาย' : 'ทดสอบการออกเสียง'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {result.score}%
                  </div>
                  <div className="text-xl text-muted-foreground">
                    ตอบถูก {result.correctAnswers.length} / {questions.length} ข้อ
                  </div>
                </div>

                {/* Answers Review */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">รายละเอียดคำตอบ</h3>
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers.get(question.id);
                    const isCorrect = userAnswer === question.correctAnswer;

                    return (
                      <div
                        key={question.id}
                        className={`p-4 rounded-lg border-2 ${
                          isCorrect
                            ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                            : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {isCorrect ? (
                              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="font-semibold">
                              {index + 1}. {question.word}
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">คำตอบของคุณ: </span>
                              <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                {userAnswer || 'ไม่ได้ตอบ'}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div className="text-sm">
                                <span className="text-muted-foreground">คำตอบที่ถูกต้อง: </span>
                                <span className="text-green-600 dark:text-green-400 font-medium">
                                  {question.correctAnswer}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => setLocation('/')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    กลับหน้าหลัก
                  </Button>
                  <Button
                    className="flex-1"
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
                  >
                    ทำแบบทดสอบอีกครั้ง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setLocation('/')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับหน้าหลัก
            </Button>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  คำถามที่ {currentQuestionIndex + 1} / {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">
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
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? 'default' : 'outline'}
                    className="h-auto py-4 text-left justify-start text-base"
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1"
                >
                  ย้อนกลับ
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className="flex-1"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'ดูผลคะแนน' : 'ถัดไป'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

