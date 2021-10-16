import * as React from "react";

import { useSizeContext } from "./useSizeContext";

export type Position = { x: number; y: number };
export const enum Direction {
  up,
  right,
  down,
  left,
}

export type Tile = {
  position: Position;
  value: number;
  previousPosition?: Position;
  mergedFrom?: [Tile, Tile];
};

type GridContextProps = {
  cells: Array<Array<Tile | null>>;
  reset: () => void;
  getTiles: () => Array<Tile>;
  addRandomTile: () => void;
  prepareTiles: () => void;
  move: (direction: Direction) => void;
  saveState: () => void;
};

export const GridContext = React.createContext<GridContextProps | undefined>(
  undefined
);

export function useGridController(): GridContextProps {
  const { size } = useSizeContext();
  const [cells, setCells] = React.useState<Array<Array<Tile | null>>>(
    Array(size)
      .fill(0)
      .map((x) => Array(size).fill(null))
  );

  const reset = () => {
    setCells(
      Array(size)
        .fill(0)
        .map((x) => Array(size).fill(null))
    );
  };

  const eachCell = (
    callback: (x: number, y: number, tile: Tile | null) => void
  ) => {
    cells.forEach((col, x) => {
      col.forEach((cell, y) => {
        callback(x, y, cells[x][y]);
      });
    });
  };
  const availableCells = () => {
    const cells: Array<Position> = [];
    eachCell((x, y, tile) => {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });
    return cells;
  };
  const randomAvailableCell = () => {
    const cells = availableCells();
    if (!!cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  };
  const insertTile = (tile: Tile) => {
    cells[tile.position.x][tile.position.y] = tile;
  };
  const removeTile = (tile: Tile) => {
    cells[tile.position.x][tile.position.y] = null;
  };
  const updatePosition = (tile: Tile, cell: Position) => {
    tile.position = { ...cell };
  };
  const savePosition = (tile: Tile) => {
    tile.previousPosition = { ...tile.position };
  };
  const positionEqual = (first: Tile, second: Tile) => {
    return (
      first.position.x === second.position.x &&
      first.position.y === second.position.y
    );
  };
  const saveState = () => {
    setCells([...cells.map((x) => [...x])]);
  };

  const getTiles = () => {
    const tiles: Array<Tile> = [];
    eachCell((x, y, tile) => {
      if (tile) {
        tiles.push(tile);
      }
    });
    return tiles;
  };
  const addRandomTile = () => {
    const position = randomAvailableCell();
    if (position !== undefined) {
      const tile: Tile = {
        position,
        value: Math.random() < 0.9 ? 2 : 4,
      };
      insertTile(tile);
    }
  };
  const prepareTiles = () => {
    eachCell((x, y, tile) => {
      if (tile) {
        tile.mergedFrom = undefined;
        savePosition(tile);
      }
    });
  };
  const moveTile = (tile: Tile, cell: Position) => {
    cells[tile.position.x][tile.position.y] = null;
    cells[cell.x][cell.y] = tile;
    updatePosition(tile, cell);
  };
  // TODO
  const move = (direction: Direction) => {};

  return {
    cells,
    reset,
    getTiles,
    addRandomTile,
    prepareTiles,
    move,
    saveState,
  };
}

export function useGridControllerContext(): GridContextProps {
  const value = React.useContext(GridContext);
  if (value == null) {
    throw new Error("use grid controller outside of grid context");
  }
  return value;
}
