// Quiz scoring and logic utilities

import { Multiplier, BASE_POINTS } from "./quizData";

export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  multiplier: Multiplier;
  pointsEarned: number;
  selectedAnswer: number | null;
}

export function calculatePoints(isCorrect: boolean, multiplier: Multiplier): number {
  if (!isCorrect) return 0;
  return BASE_POINTS * multiplier;
}

export function getMultiplierLabel(multiplier: Multiplier): string {
  if (multiplier === 0.5) return "½×";
  return `${multiplier}×`;
}

export function getMultiplierColor(multiplier: Multiplier): string {
  switch (multiplier) {
    case 0.5:
      return "bg-slate-500";
    case 1:
      return "bg-blue-500";
    case 2:
      return "bg-purple-500";
    case 3:
      return "bg-amber-500";
    default:
      return "bg-gray-500";
  }
}

export function calculateTotalScore(results: QuestionResult[]): number {
  return results.reduce((total, result) => total + result.pointsEarned, 0);
}

export function getUserRank(userScore: number, leaderboardScores: number[]): number {
  const allScores = [...leaderboardScores, userScore].sort((a, b) => b - a);
  return allScores.indexOf(userScore) + 1;
}
