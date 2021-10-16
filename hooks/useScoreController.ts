import * as React from "react";

type ScoreContextProps = {
  score: number;
  setScore: (score: number) => void;
  best: number;
  setBest: (best: number) => void;
};

type ScoreChangeProps = {
  queue: Array<number>;
  popScore: () => void;
};

export const ScoreContext = React.createContext<ScoreContextProps | undefined>(
  undefined
);

export function useScoreController(): ScoreContextProps {
  const [score, setScore] = React.useState<number>(0);
  const [best, setBest] = React.useState<number>(0);
  return { score, setScore, best, setBest };
}

export function useScoreChange(): ScoreChangeProps {
  const [queue, setQueue] = React.useState<Array<number>>([]);
  return {
    queue,
    popScore: () => {
      queue.shift();
      setQueue(queue);
    },
  };
}

export function useScoreControllerContext(): ScoreContextProps {
  const value = React.useContext(ScoreContext);
  if (value == null) {
    throw new Error("use score controller outside of score context");
  }
  return value;
}
