import React from "react";
import Node from "./Node/Node";

import NodesStyles from "./NodesStyles";

const Nodes = () => {
  const classes = NodesStyles();
  const nodes = [];
  for (let row = 0; row < 15; row++) {
    const currRow = [];
    for (let col = 0; col < 50; col++) {
      currRow.push([]);
    }
    nodes.push(currRow);
  }
  return (
    <div className={classes.gridCenter}>
      {nodes.map((row, rowIdx) => {
        return (
          <div>
            {row.map((node, nodeIdx) => (
              <Node />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default Nodes;
