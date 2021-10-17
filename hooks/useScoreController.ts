import * as React from "react";

type ScoreContextProps = {
  score: number;
  setScore: (score: number) => void;
  best: number;
  setBest: (best: number) => void;
  over: boolean;
  setOver: (over: boolean) => void;
  reset: () => void;
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
  const [over, setOver] = React.useState<boolean>(false);
  const reset = () => {
    if (score > best) {
      setBest(score);
    }
    setScore(0);
    setOver(false);
  };
  return { score, setScore, best, setBest, over, setOver, reset };
}

export function useScoreChange(): ScoreChangeProps {
  const [queue, setQueue] = React.useState<Array<number>>([]);
  return {
    queue,
    popScore: () => {
      queue.shift();
      setQueue([...queue]);
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
