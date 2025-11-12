import React, { useState, useEffect } from "react";
import { QuizQuestion } from "../lib/quizData";
import { calculatePoints } from "../lib/quizLogic";
import { MultiplierBadge } from "./MultiplierBadge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuestionScreenProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: number | null, isCorrect: boolean, points: number) => void;
  timerDuration: number;
}

export function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timerDuration,
}: QuestionScreenProps) {
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (isAnswered || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setShowFeedback(true);
    setTimeout(() => {
      onAnswer(null, false, 0);
    }, 2000);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowFeedback(true);

    const isCorrect = answerIndex === question.correctAnswer;
    const points = calculatePoints(isCorrect, question.multiplier);

    setTimeout(() => {
      onAnswer(answerIndex, isCorrect, points);
    }, 2000);
  };

  const progress = (timeLeft / timerDuration) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-white">
          Question {questionNumber} of {totalQuestions}
        </div>
        <MultiplierBadge multiplier={question.multiplier} size="md" pulse={!isAnswered} />
      </div>

      {/* Timer */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white text-sm">Time remaining</span>
          <span className={`text-white ${timeLeft <= 5 ? "text-red-300 animate-pulse" : ""}`}>
            {timeLeft}s
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-white/30" />
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-xl"
        >
          <h2 className="text-center">{question.question}</h2>
        </motion.div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;
            const showCorrect = isAnswered && isCorrectAnswer;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  variant={
                    showCorrect
                      ? "default"
                      : showIncorrect
                      ? "destructive"
                      : isSelected
                      ? "default"
                      : "outline"
                  }
                  className={`w-full h-auto py-4 px-6 justify-start text-left relative transition-all ${
                    showCorrect
                      ? "bg-green-500 hover:bg-green-600 border-green-600"
                      : showIncorrect
                      ? "bg-red-500 hover:bg-red-600 border-red-600"
                      : "bg-white hover:bg-purple-50 border-2"
                  } ${!isAnswered && "hover:scale-[1.02]"}`}
                >
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 ml-2" />}
                  {showIncorrect && <XCircle className="w-5 h-5 ml-2" />}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`text-center p-6 rounded-2xl ${
                isCorrect ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <p className="mb-2">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-2xl">
                  {isCorrect
                    ? `+${calculatePoints(true, question.multiplier)} pts (${
                        question.multiplier === 0.5 ? "½" : question.multiplier
                      }×)`
                    : "+0 pts"}
                </p>
              </motion.div>
            </motion.div>
          )}
          {showFeedback && selectedAnswer === null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-6 rounded-2xl bg-orange-500 text-white"
            >
              <p className="mb-2">Time's up!</p>
              <p className="text-2xl">+0 pts</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
