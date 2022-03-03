import React from "react";
import Nodes from "./components/visualizer/Nodes/Nodes";

const App = () => {
  const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  const FINISH_NODE_ROW = 10;
  const FINISH_NODE_COL = 35;

  return (
    <div>
      <Nodes />
    </div>
  );
};

export default App;
