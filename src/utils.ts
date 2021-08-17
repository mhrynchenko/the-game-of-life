export type Matrix = boolean[][];

export const createEmptyMatrix = (rows: number, cols: number): Matrix => {
  return new Array(rows).fill(false).map(() => new Array(cols).fill(false));
}

export const setMatrixWithRandomValue = (matrix: Matrix, value: boolean): Matrix => {
  const colsLen = matrix[0].length;
  const rowsLen = matrix.length;

  for (let i = 0; i < rowsLen; i++) {
    for (let j = 0; j < colsLen; j++) {
      if (Math.random() < 0.2) {
        matrix[i][j] = value;
      }
    }
  }
  return matrix;
};