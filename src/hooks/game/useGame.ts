import { useState, useLayoutEffect, useCallback } from "react";
import cloneDeep from "lodash/cloneDeep";

import { useInterval } from "../common";
import { 
  GameConfig,
  UNDERPOPULATION,
  OVERCROWDING,
  REPRODUCTION 
} from "../../config";

import {
  Matrix,
  createEmptyMatrix,
  setMatrixWithRandomValue 
} from "../../utils";

type Game = {
  grid: Matrix;
  generation: number;
  initLife(grid: Matrix): void;
  createGeneration(): void;
};

export const useGame = ({ rows, cols, speed }: GameConfig): Game => {
  const [isGridInited, setIsGridInited] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [grid, setGrid] = useState<Matrix>(createEmptyMatrix(rows, cols));
  
  const initLife = useCallback((grid: Matrix): void => {
    setGrid(setMatrixWithRandomValue(grid, true));
    setIsGridInited(true);
  }, []);

  const createGeneration = (): void => {
		const gridCopy = cloneDeep(grid);

		for (let i = 0; i < rows; i++) {
		  for (let j = 0; j < cols; j++) {
		    let count = 0;
		    if (i > 0 && grid[i - 1][j]) count++;
		    if (i > 0 && j > 0 && grid[i - 1][j - 1]) count++;
		    if (i > 0 && j < cols - 1 && grid[i - 1][j + 1]) count++;
		    if (j < cols - 1 && grid[i][j + 1]) count++;
		    if (j > 0 && grid[i][j - 1]) count++;
		    if (i < rows - 1 && grid[i + 1][j]) count++;
		    if (i < rows - 1 && j > 0 && grid[i + 1][j - 1]) count++;
		    if (i < rows - 1 && j < cols - 1 && grid[i + 1][j + 1]) count++;

        // Set alive and dead
		    if (grid[i][j] && (count < UNDERPOPULATION || count > OVERCROWDING))
          gridCopy[i][j] = false;
        
		    if (!grid[i][j] && count === REPRODUCTION) 
          gridCopy[i][j] = true;
		  }
		}

    setGeneration(generation + 1); 
    setGrid(gridCopy);
  };

  useLayoutEffect(() => {
    if (!isGridInited) {
      initLife(cloneDeep(grid));
    }
  }, [isGridInited, grid, initLife]);

  useInterval(() => {
    createGeneration();
  }, speed);

  return {
    grid,
    generation,
    initLife,
    createGeneration
  };
};