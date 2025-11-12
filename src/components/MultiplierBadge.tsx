import { Multiplier } from "../lib/quizData";
import { getMultiplierLabel, getMultiplierColor } from "../lib/quizLogic";
import React from "react";

interface MultiplierBadgeProps {
  multiplier: Multiplier;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

export function MultiplierBadge({ multiplier, size = "md", pulse = false }: MultiplierBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2",
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full ${getMultiplierColor(
        multiplier
      )} text-white ${sizeClasses[size]} ${pulse ? "animate-pulse" : ""}`}
    >
      {getMultiplierLabel(multiplier)}
    </div>
  );
}
