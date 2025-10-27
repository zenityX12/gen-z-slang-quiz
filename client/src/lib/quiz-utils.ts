import { SlangWord, QuizQuestion } from '@/types/slang';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateMeaningQuestions(
  slangWords: SlangWord[],
  count: number = 10
): QuizQuestion[] {
  const shuffled = shuffleArray(slangWords);
  const selected = shuffled.slice(0, count);

  return selected.map((word) => {
    const wrongOptions = slangWords
      .filter((w) => w.id !== word.id)
      .map((w) => w.meaning);
    
    const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);
    const options = shuffleArray([word.meaning, ...shuffledWrong]);

    return {
      id: word.id,
      word: word.word,
      correctAnswer: word.meaning,
      options,
      type: 'meaning' as const,
    };
  });
}

export function generateUsageQuestions(
  slangWords: SlangWord[],
  count: number = 10
): QuizQuestion[] {
  const shuffled = shuffleArray(slangWords);
  const selected = shuffled.slice(0, count);

  return selected.map((word) => {
    // สร้างตัวเลือกที่ทุกตัวมีคำศัพท์นั้น ๆ อยู่
    // โดย 1 ตัวเลือกใช้ถูก (correctUsage) และ 3 ตัวเลือกใช้ผิด (wrongUsages)
    const shuffledWrongUsages = shuffleArray(word.wrongUsages).slice(0, 3);
    const options = shuffleArray([word.correctUsage, ...shuffledWrongUsages]);

    return {
      id: word.id,
      word: word.word,
      correctAnswer: word.correctUsage,
      options,
      type: 'usage' as const,
    };
  });
}

export function calculateScore(
  questions: QuizQuestion[],
  userAnswers: Map<number, string>
): {
  score: number;
  correctAnswers: number[];
  wrongAnswers: number[];
} {
  let correctCount = 0;
  const correctAnswers: number[] = [];
  const wrongAnswers: number[] = [];

  questions.forEach((question) => {
    const userAnswer = userAnswers.get(question.id);
    if (userAnswer === question.correctAnswer) {
      correctCount++;
      correctAnswers.push(question.id);
    } else {
      wrongAnswers.push(question.id);
    }
  });

  const score = Math.round((correctCount / questions.length) * 100);

  return {
    score,
    correctAnswers,
    wrongAnswers,
  };
}

