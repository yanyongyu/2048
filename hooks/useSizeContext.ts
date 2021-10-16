import * as React from "react";

import { SIZES } from "../types";

type SizeContextProps = {
  size: typeof SIZES[number];
  setSize: (size: typeof SIZES[number]) => void;
};

export const SizeContext = React.createContext<SizeContextProps | undefined>(
  undefined
);

export function useSize(): SizeContextProps {
  const [size, setSize] = React.useState<typeof SIZES[number]>(4);
  return { size, setSize };
}

export function useSizeContext(): SizeContextProps {
  const value = React.useContext(SizeContext);
  if (value == null) {
    throw new Error("use size outside of size context");
  }
  return value;
}

export function useSizeIndex(): {
  index: number;
  setIndex: (index: number) => void;
} {
  const { size, setSize } = useSizeContext();
  return {
    index: SIZES.indexOf(size),
    setIndex: (index) => {
      setSize(SIZES[index]);
    },
  };
}
