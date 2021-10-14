import * as React from "react";

import { SIZES } from "../types";

type Position = { x: number; y: number };

type Tile = {
  position: Position;
  value: number;
  previousPosition?: Position;
  mergedFrom?: [Tile, Tile];
};

type GridContextProps = {
  cells: Array<Array<Tile | null>>;
};

export const GridContext = React.createContext<GridContextProps | undefined>(
  undefined
);

export function useGridController(
  size: typeof SIZES[number]
): GridContextProps {
  const [cells, setCells] = React.useState<Array<Array<Tile | null>>>(
    Array(size)
      .fill(0)
      .map((x) => Array(size).fill(null))
  );
  return {
    cells,
  };
}
