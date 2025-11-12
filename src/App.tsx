import React, { useState } from "react";
import { PreQuizScreen } from "./components/PreQuizScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { ScoreScreen } from "./components/ScoreScreen";
import { QUIZ_QUESTIONS, TIMER_DURATION } from "./lib/quizData";
import { QuestionResult, calculateTotalScore } from "./lib/quizLogic";

type GameState = "pre-quiz" | "question" | "score";

export default function App() {
  const [gameState, setGameState] = useState<GameState>("pre-quiz");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);

  const handleStartQuiz = () => {
    setGameState("question");
    setCurrentQuestionIndex(0);
    setResults([]);
  };

  const handleAnswer = (
    selectedAnswer: number | null,
    isCorrect: boolean,
    points: number
  ) => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const newResult: QuestionResult = {
      questionId: currentQuestion.id,
      isCorrect,
      multiplier: currentQuestion.multiplier,
      pointsEarned: points,
      selectedAnswer
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    // Move to next question or show score
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setGameState("score");
      }, 100);
    }
  };

  const handleRestart = () => {
    setGameState("pre-quiz");
    setCurrentQuestionIndex(0);
    setResults([]);
  };

  return (
    <div className="min-h-screen">
      {gameState === "pre-quiz" && <PreQuizScreen onStart={handleStartQuiz} />}

      {gameState === "question" && (
        <React.Fragment key={currentQuestionIndex}>
          <QuestionScreen
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={QUIZ_QUESTIONS.length}
            onAnswer={handleAnswer}
            timerDuration={TIMER_DURATION}
          />
        </React.Fragment>
      )}

      {gameState === "score" && (
        <ScoreScreen
          results={results}
          totalScore={calculateTotalScore(results)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
