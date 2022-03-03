import React from "react";
import Node from "./Node/Node";

import NodesStyles from "./NodesStyles";

const Nodes = () =>{
    const classes = NodesStyles();
    return (
        <div>
            <Node/>
        </div>
    );
}
export default Nodes;