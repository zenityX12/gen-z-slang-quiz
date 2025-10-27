export interface SlangWord {
  id: number;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  id: number;
  word: string;
  correctAnswer: string;
  options: string[];
  type: 'meaning' | 'usage';
}

export interface QuizResult {
  score: number;
  total: number;
  correctAnswers: number[];
  wrongAnswers: number[];
}

