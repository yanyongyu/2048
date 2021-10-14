import * as React from "react";

type ScoreContextProps = {
  score: number;
  setScore: (score: number) => void;
  best: number;
  setBest: (best: number) => void;
};

export const ScoreContext = React.createContext<ScoreContextProps | undefined>(
  undefined
);

export function useScoreController(): ScoreContextProps {
  const [score, setScore] = React.useState<number>(0);
  const [best, setBest] = React.useState<number>(0);
  return { score, setScore, best, setBest };
}
