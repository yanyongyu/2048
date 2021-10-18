import * as React from "react";

import { useScoreControllerContext } from "./useScoreController";
import { useSizeContext } from "./useSizeContext";

export type Position = { x: number; y: number };
export enum Direction {
  up = "up",
  right = "right",
  down = "down",
  left = "left",
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
  moveTile: (tile: Tile, cell: Position) => void;
  move: (direction: Direction) => void;
  saveState: () => void;
};

export const GridContext = React.createContext<GridContextProps | undefined>(
  undefined
);

export function useGridController(): GridContextProps {
  const { size } = useSizeContext();
  const {
    score,
    setScore,
    over,
    setOver,
    reset: resetScore,
  } = useScoreControllerContext();
  const [cells, setCells] = React.useState<Array<Array<Tile | null>>>(
    Array(size)
      .fill(0)
      .map((x) => Array(size).fill(null))
  );

  // tool functions
  const reset = () => {
    setCells(
      Array(size)
        .fill(0)
        .map((x) => Array(size).fill(null))
    );
    resetScore();
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
  const withinBounds = (cell: Position) => {
    return cell.x >= 0 && cell.x < size && cell.y >= 0 && cell.y < size;
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
  const cellContent = (cell: Position) => {
    if (withinBounds(cell)) {
      return cells[cell.x][cell.y];
    } else {
      return null;
    }
  };
  const cellOccupied = (cell: Position) => {
    return !!cellContent(cell);
  };
  const cellAvailable = (cell: Position) => {
    return !cellOccupied(cell);
  };
  const cellsAvailable = () => {
    return !!availableCells().length;
  };
  const movesAvailable = () => {
    return cellsAvailable() || tileMatchesAvailable();
  };
  const tileMatchesAvailable = () => {
    let cell: Position,
      vector: Position,
      direction: Direction,
      tile: Tile | null,
      other: Tile | null;
    [...Array(size)].forEach((_, x) => {
      [...Array(size)].forEach((_, y) => {
        tile = cellContent({ x, y });
        if (tile) {
          for (let d in Direction) {
            direction = Direction[d as keyof typeof Direction];
            vector = getVector(direction);
            cell = { x: x + vector.x, y: y + vector.y };
            other = cellContent(cell);
            if (other && other.value === tile.value) return true;
          }
        }
      });
    });
    return false;
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
  const positionEqual = (first: Position, second: Position) => {
    return first.x === second.x && first.y === second.y;
  };
  const getVector = (direction: Direction) => {
    const map = {
      up: { x: 0, y: -1 },
      right: { x: 1, y: 0 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
    };
    return map[direction];
  };
  const buildTraversals = (vector: Position) => {
    const traversals: { x: number[]; y: number[] } = { x: [], y: [] };
    [...Array(size)].forEach((_, index) => {
      traversals.x.push(index);
      traversals.y.push(index);
    });
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();
    return traversals;
  };
  const findFarthestPosition = (cell: Position, vector: Position) => {
    let previous;
    do {
      previous = cell;
      cell = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (withinBounds(cell) && cellAvailable(cell));
    return {
      farthest: previous,
      next: cell,
    };
  };
  const saveState = () => {
    setCells([...cells.map((x) => [...x])]);
  };

  const getTiles = () => {
    const tiles: Array<Tile> = [];
    eachCell((x, y, tile) => {
      if (tile) {
        if (tile.mergedFrom) {
          tiles.push(...tile.mergedFrom);
        }
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
  const move = (direction: Direction) => {
    console.log(direction);
    if (over) return;
    prepareTiles();

    let cell: Position,
      merged: Tile,
      tile: Tile | null,
      next: Tile | null,
      positions: { farthest: Position; next: Position };
    let moved = false;
    const vector = getVector(direction);
    const traversals = buildTraversals(vector);

    traversals.x.forEach((x) => {
      traversals.y.forEach((y) => {
        cell = { x, y };
        tile = cellContent(cell);

        if (tile) {
          positions = findFarthestPosition(cell, vector);
          next = cellContent(positions.next);

          if (next && next.value === tile.value && !next.mergedFrom) {
            merged = {
              position: positions.next,
              value: tile.value * 2,
              mergedFrom: [tile, next],
            };

            insertTile(merged);
            removeTile(tile);
            updatePosition(tile, positions.next);

            setScore(score + merged.value);
          } else {
            moveTile(tile, positions.farthest);
          }

          if (!positionEqual(cell, tile.position)) {
            moved = true;
          }
        }
      });
    });

    if (moved) {
      addRandomTile();
      if (!movesAvailable()) {
        setOver(true);
      }
      saveState();
    }
  };

  return {
    cells,
    reset,
    getTiles,
    addRandomTile,
    prepareTiles,
    moveTile,
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
