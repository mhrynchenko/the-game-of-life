import React, { ReactElement, memo } from "react";

type CellProps = {
  status: boolean; 
};

const Cell: React.FC<CellProps> = ({ status }): ReactElement => {
  return (
    <div className={`box ${status ? "alive" : "dead"}`} />
  );
};

export const MemoCell = memo(Cell);