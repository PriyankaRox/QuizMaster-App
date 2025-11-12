import { Trophy, Award, Medal, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { QuestionResult } from "../lib/quizLogic";
import {
  QUIZ_QUESTIONS,
  MOCK_LEADERBOARD,
} from "../lib/quizData";
import { MultiplierBadge } from "./MultiplierBadge";
import { motion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";
import React from "react";

interface ScoreScreenProps {
  results: QuestionResult[];
  totalScore: number;
  onRestart: () => void;
}

export function ScoreScreen({
  results,
  totalScore,
  onRestart,
}: ScoreScreenProps) {
  const correctCount = results.filter(
    (r) => r.isCorrect,
  ).length;
  const userRank =
    MOCK_LEADERBOARD.findIndex(
      (entry) => entry.score < totalScore,
    ) + 1;
  const finalRank =
    userRank === 0 ? MOCK_LEADERBOARD.length + 1 : userRank;

  const getRankIcon = (rank: number) => {
    if (rank === 1)
      return <Trophy className="w-5 h-5 text-amber-500" />;
    if (rank === 2)
      return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3)
      return <Medal className="w-5 h-5 text-amber-700" />;
    return <Award className="w-5 h-5 text-purple-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col p-6 overflow-auto">
      <div className="max-w-md w-full mx-auto space-y-6 py-6">
        {/* Score Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full">
            <Trophy className="w-16 h-16 text-purple-500" />
          </div>
          <div>
            <p className="text-purple-100">Your Score</p>
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-5xl"
            >
              {totalScore}
            </motion.h1>
            <p className="text-purple-100 mt-2">
              {correctCount} out of {results.length} correct
            </p>
          </div>
        </motion.div>

        {/* Question Breakdown */}
        <Card className="p-6 bg-white/95 backdrop-blur">
          <h3 className="mb-4">Question Breakdown</h3>
          <div className="space-y-3">
            {results.map((result, index) => {
              const question = QUIZ_QUESTIONS[index];
              return (
                <motion.div
                  key={result.questionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 ${
                    result.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">
                        Q{index + 1}: {question.question}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <MultiplierBadge
                      multiplier={question.multiplier}
                      size="sm"
                    />
                    <span className="text-sm min-w-[3rem] text-right">
                      {result.pointsEarned} pts
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-6 bg-white/95 backdrop-blur">
          <h3 className="mb-4">Leaderboard</h3>
          <div className="space-y-2">
            {/* User's position (if in top spots) */}
            {finalRank <= MOCK_LEADERBOARD.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg border-2 border-purple-300"
              >
                <div className="w-8 text-center">
                  {getRankIcon(finalRank)}
                </div>
                <div className="flex-1">
                  <p>You</p>
                </div>
                <p>{totalScore} pts</p>
              </motion.div>
            )}

            {MOCK_LEADERBOARD.map((entry, index) => {
              const adjustedRank =
                entry.rank >= finalRank
                  ? entry.rank + 1
                  : entry.rank;
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-8 text-center">
                    {getRankIcon(adjustedRank)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{entry.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.score} pts
                  </p>
                </motion.div>
              );
            })}

            {/* User's position (if not in top spots) */}
            {finalRank > MOCK_LEADERBOARD.length && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg border-2 border-purple-300 mt-4"
              >
                <div className="w-8 text-center">
                  <span className="text-sm">#{finalRank}</span>
                </div>
                <div className="flex-1">
                  <p>You</p>
                </div>
                <p>{totalScore} pts</p>
              </motion.div>
            )}
          </div>
        </Card>

        {/* Restart Button */}
        <Button
          onClick={onRestart}
          className="w-full bg-white text-purple-600 hover:bg-purple-50 h-14"
          size="lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );
}