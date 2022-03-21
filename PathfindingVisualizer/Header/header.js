// Handles rendering the footer for the page (Contacts)
import React from "react";
import finishFlag from "../media/finish-flag.svg";
import startFlag from "../media/start-flag.svg";
import "./header.css";
function Header() {
  return (
    <div className="header">
    <ul>
      <li>
        <img
          src={startFlag}
          alt="s"
          style={{margin: "12px" }}
        />
        <p> Start Node</p>
      </li>
      <li>
        <img
          src={finishFlag}
          alt="t"
          style={{ margin: "12px" }}
        />
        <p> Finish Node</p>
      </li>
      <li>
        <div className="unvisitedNode"></div>
        <p> Unvisited Node</p>
      </li>
      <li>
        <div className="visitedNode"></div>
        <p> Visited Node</p>
      </li>
      <li>
        <div className="shortestPathNode"></div>
        <p> Shortest-Path Node</p>
      </li>
      <li>
        <div className="wallNode"></div>
        <p> Wall Node</p>
      </li>
    </ul>
  </div>
  );
}

export default Header;