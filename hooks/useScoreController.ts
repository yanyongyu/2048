import * as React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSizeContext } from "./useSizeContext";

const BESTSCOREKEY = "bestScore";

type ScoreContextProps = {
  score: number;
  setScore: (score: number) => void;
  best: number;
  setBest: (best: number) => Promise<void>;
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
  const { size } = useSizeContext();
  const [score, setScore] = React.useState<number>(0);
  const [best, _setBest] = React.useState<number>(0);
  const [over, setOver] = React.useState<boolean>(false);
  const reset = () => {
    if (score > best) {
      setBest(score);
    }
    setScore(0);
    setOver(false);
  };

  const setBest = React.useCallback(
    async (best: number) => {
      await AsyncStorage.setItem(
        `${BESTSCOREKEY}${size}`,
        JSON.stringify(best)
      );
      _setBest(best);
    },
    [size, _setBest]
  );
  const readBest = React.useCallback(async () => {
    const score = await AsyncStorage.getItem(`${BESTSCOREKEY}${size}`);
    console.log(size, score);
    if (score != null) {
      _setBest(JSON.parse(score));
    } else {
      _setBest(0);
    }
  }, [size, _setBest]);

  React.useEffect(() => {
    if (score > best) {
      setBest(score);
    }
  }, [score, setBest]);
  React.useEffect(() => {
    readBest();
  }, [readBest]);
  return { score, setScore, best, setBest, over, setOver, reset };
}

export function useScoreControllerContext(): ScoreContextProps {
  const value = React.useContext(ScoreContext);
  if (value == null) {
    throw new Error("use score controller outside of score context");
  }
  return value;
}
