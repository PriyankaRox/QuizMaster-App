// Quiz data structure and sample questions

export type Multiplier = 0.5 | 1 | 2 | 3;

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  multiplier: Multiplier;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    multiplier: 1,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    multiplier: 2,
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    multiplier: 0.5,
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
    multiplier: 3,
  },
  {
    id: 5,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    multiplier: 2,
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Chen", score: 18 },
  { rank: 2, name: "Alex Kumar", score: 16 },
  { rank: 3, name: "Jordan Blake", score: 14 },
  { rank: 4, name: "Taylor Swift", score: 12 },
  { rank: 5, name: "Morgan Lee", score: 10 },
];

export const BASE_POINTS = 2;
export const TIMER_DURATION = 20; // seconds
