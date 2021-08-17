import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

import { ROWS, COLS, SPEED } from "./config";

import { World } from "./components/molecules/World";
 
import { useGame } from "./hooks/game";

import "./index.scss";

const App: React.FC = (): ReactElement  => {
  const { grid, generation } = useGame({ 
    rows: ROWS, 
    cols: COLS, 
    speed: SPEED 
  });

  return (
    <>
      <h1>The Game of Life</h1>
      <World 
        data={grid} 
        rows={ROWS} 
        cols={COLS} 
      />
      <h2>Tick's: {generation}</h2>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

