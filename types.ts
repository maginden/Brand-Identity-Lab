export enum View {
  HOME = 'HOME',
  TOV = 'TOV',
  NLP = 'NLP',
  COLOR = 'COLOR',
  LAB = 'LAB',
  SIM = 'SIM',
  TEACHER = 'TEACHER'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AILoadingState {
  isLoading: boolean;
  error: string | null;
  data: string | null;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  explanation: string;
}

export interface UserProgress {
  tovScore: number;
  nlpScore: number;
  colorScore: number;
  completedModules: string[];
}