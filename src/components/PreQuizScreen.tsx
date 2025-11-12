import { Trophy, Clock, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MultiplierBadge } from "./MultiplierBadge";
import React from "react";

interface PreQuizScreenProps {
  onStart: () => void;
}

export function PreQuizScreen({ onStart }: PreQuizScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <Trophy className="w-12 h-12 text-purple-500" />
          </div>
          <h1 className="text-white">QuizMaster Challenge</h1>
          <p className="text-purple-100">Tonight's Live Quiz</p>
        </div>

        {/* Info Card */}
        <Card className="p-6 bg-white/95 backdrop-blur space-y-6">
          <div className="space-y-2">
            <h2 className="text-center">How to Play</h2>
            <p className="text-muted-foreground text-center text-sm">
              Answer 5 multiple-choice questions and earn points based on the multiplier!
            </p>
          </div>

          {/* Rules */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong>20 seconds</strong> per question
                </p>
                <p className="text-xs text-muted-foreground">Answer before time runs out!</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong>Score Multipliers</strong>
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <MultiplierBadge multiplier={0.5} size="sm" />
                  <MultiplierBadge multiplier={1} size="sm" />
                  <MultiplierBadge multiplier={2} size="sm" />
                  <MultiplierBadge multiplier={3} size="sm" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Base: 2 pts × multiplier
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <strong>Compete</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Climb the leaderboard and become QuizMaster!
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <Button
          onClick={onStart}
          className="w-full bg-white text-purple-600 hover:bg-purple-50 h-14"
          size="lg"
        >
          Start Quiz
        </Button>

        <p className="text-center text-white/80 text-xs">5 Questions · ~2 minutes</p>
      </div>
    </div>
  );
}
