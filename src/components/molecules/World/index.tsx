import React, { ReactElement } from "react";

import { MemoCell } from "../../atoms/Cell";

import { Matrix } from "../../../utils";

type WolrdProps = {
  rows: number; 
  cols: number; 
  data: Matrix;
};

export const World: React.FC<WolrdProps> = ({ rows, cols, data }): ReactElement => {
  const width = cols * 16;
  const arrRows = [];
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      arrRows.push(<MemoCell key={`${i}-${j}`} status={data[i][j]} />);
    }
  }

  return (
    <div className="grid" style={{ width }}>
      {arrRows}
    </div>
  );
};