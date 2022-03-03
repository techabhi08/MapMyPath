import React from "react";
import NodeStyles from "./NodeStyles";

const Node = () => {
  const classes = NodeStyles();
  return <div className={classes.node}></div>;
};

export default Node;
