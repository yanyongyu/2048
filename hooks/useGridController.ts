import { file } from "@babel/types";
import * as React from "react";

import { SIZES } from "../types";

type Position = { x: number; y: number };
const enum Direction {
  up,
  right,
  down,
  left,
}

type Tile = {
  position: Position;
  value: number;
  previousPosition?: Position;
  mergedFrom?: [Tile, Tile];
};

type GridContextProps = {
  cells: Array<Array<Tile | null>>;
  reset: () => void;
  availableCells: () => Array<Position>;
  randomAvailableCell: () => Position | undefined;
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
    setCells(cells);
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
    availableCells,
    randomAvailableCell,
  };
}