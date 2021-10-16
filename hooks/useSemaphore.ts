import * as React from "react";

type SemaphoreProps = {
  value: number;
  locked: boolean;
  acquire: () => void;
  release: () => void;
};

export const SemaphoreContext = React.createContext<SemaphoreProps | undefined>(
  undefined
);

export function useSemaphore(): SemaphoreProps {
  const [value, setValue] = React.useState<number>(0);
  const acquire = () => {
    setValue(value + 1);
  };
  const release = () => {
    if (value <= 0) {
      throw new Error("release too many times");
    }
    setValue(value - 1);
  };

  return {
    value,
    locked: value !== 0,
    acquire,
    release,
  };
}

export function useSemaphoreContext(): SemaphoreProps {
  const value = React.useContext(SemaphoreContext);
  if (value == null) {
    throw new Error("use semaphore context outside of semaphore context");
  }
  return value;
}
