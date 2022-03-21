import React, { Component } from "react";
import "./PathfindingVisualizer.css";
import * as dijkstra from "./algorithms/dijkstra";
import Node from "./Node/Node";
import Header from "./Header/header";
const rowLen = 29;
const colLen = 59;
const ANIMATION_FAST = 10;
const ANIMATION_AVG = 20;
const ANIMATION_SLOW = 30;
let startRow = 14; 
let startCol = 14;
let endRow = 14;
let endCol = 45;
const DIJKSTRAS = "Dijkstra's";



export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [], 
      mouseIsPressed: false, 
      isButtonDisabled: false, 
      isMouseDisabled: false, 
      moveStart: false, 
      moveFinish: false,  
      finishAnimations: false,  
      algorithm: "",  
      visualizeBtnText: "Visualize", 
      isInstantAnims: false,  
      animationDelay: ANIMATION_FAST, 
    };
    
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.toggleFinish = this.toggleFinish.bind(this);
    this.toggleWall = this.toggleWall.bind(this);
    
    this.dijkstraAnimations = this.dijkstraAnimations.bind(this);
    this.dijkstraNoAnim = this.dijkstraNoAnim.bind(this);

    
   
    
    this.clearBoard = this.clearBoard.bind(this);
    this.clearNodeClasses = this.clearNodeClasses.bind(this);
    this.cycleSpeed = this.cycleSpeed.bind(this);
  }
  
  componentDidMount() {
    
    const grid = createGrid();
    this.setState({ grid });
  }
  
  handleMouseDown(e, row, col, isStart, isFinish) {
    if (this.state.isMouseDisabled) return;
    e.preventDefault();
    
    if (isStart) {
      this.setState({ moveStart: true });
    } else if (isFinish) {
      this.setState({ moveFinish: true });
    } else {
      let newGrid = this.toggleWall(this.state.grid, row, col);
      
      if (this.state.finishAnimations) {
        newGrid = this.visualizeNoAnim(this.state.algorithm, newGrid);
      }
      this.setState({ grid: newGrid });
    }
    this.setState({ mouseIsPressed: true });
  }
  
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    let newGrid = null;
    
    if (this.state.moveStart) {
      newGrid = this.toggleStart(this.state.grid, row, col);
      if (this.state.finishAnimations) {
        newGrid = this.visualizeNoAnim(this.state.algorithm, newGrid);
      }
    } else if (this.state.moveFinish) {
      newGrid = this.toggleFinish(this.state.grid, row, col);
      if (this.state.finishAnimations) {
        newGrid = this.visualizeNoAnim(this.state.algorithm, newGrid);
      }
    } else {
      newGrid = this.toggleWall(this.state.grid, row, col);
      if (this.state.finishAnimations) {
        newGrid = this.visualizeNoAnim(this.state.algorithm, newGrid);
      }
    }
    this.setState({ grid: newGrid });
  }
  
  handleMouseUp() {
    
    this.setState({
      mouseIsPressed: false,
      moveStart: false,
      moveFinish: false,
    });
  }
  
  clearBoard() {
    
    const gridElem = document.getElementsByClassName("grid")[0];
    
    const newGrid = createGrid();
    
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        gridElem.children[i].children[j].classList.remove(
          "node-visited-animate"
        );
        gridElem.children[i].children[j].classList.remove(
          "node-shortest-path-animate"
        );
        gridElem.children[i].children[j].classList.remove("node-wall-animate");
        gridElem.children[i].children[j].classList.remove("node-visited");
        gridElem.children[i].children[j].classList.remove("node-shortest-path");
        gridElem.children[i].children[j].classList.remove("node-wall");
      }
    }
    
    this.setState({
      grid: newGrid,
      finishAnimations: false,
      isInstantAnims: false,
    });
  }
  
  clearNodeClasses() {
    
    const gridElem = document.getElementsByClassName("grid")[0];
    
    const newGrid = this.state.grid.slice();
    
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        gridElem.children[i].children[j].classList.remove(
          "node-visited-animate"
        );
        gridElem.children[i].children[j].classList.remove(
          "node-shortest-path-animate"
        );
        gridElem.children[i].children[j].classList.remove("node-wall-animate");
        gridElem.children[i].children[j].classList.remove("node-visited");
        gridElem.children[i].children[j].classList.remove("node-shortest-path");
        newGrid[i][j].dist = Infinity;
        newGrid[i][j].isVisited = false;
        newGrid[i][j].previousNode = null;
        newGrid[i][j].isInPQ = false;
        newGrid[i][j].isAnimated = false;
        newGrid[i][j].isShortestPath = false;
        newGrid[i][j].fcost = Infinity;
        newGrid[i][j].gcost = Infinity;
        newGrid[i][j].hcost = Infinity;
      }
    }
    this.setState({ grid: newGrid });
  }
  
  clearAnimations(newGrid) {
    const gridElem = document.getElementsByClassName("grid")[0];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        
        newGrid[i][j].dist = Infinity;
        newGrid[i][j].isVisited = false;
        newGrid[i][j].previousNode = null;
        newGrid[i][j].isInPQ = false;
        newGrid[i][j].isShortestPath = false;
        newGrid[i][j].isAnimated = false;
        newGrid[i][j].fcost = Infinity;
        newGrid[i][j].gcost = Infinity;
        newGrid[i][j].hcost = Infinity;
        
        if (!this.state.isInstantAnims) {
          gridElem.children[i].children[j].classList.remove(
            "node-visited-animate"
          );
          gridElem.children[i].children[j].classList.remove(
            "node-shortest-path-animate"
          );
          gridElem.children[i].children[j].classList.remove(
            "node-wall-animate"
          );
        }
      }
    }
  }
  
  dijkstraAnimations() {
    
    this.setState({ isButtonDisabled: true });
    this.setState({ isMouseDisabled: true });
    this.setState({ finishAnimations: true });
    this.setState({ mouseIsPressed: false });
    
    this.clearNodeClasses();
    
    const newGrid = this.state.grid.slice();
    const startNode = newGrid[startRow][startCol];
    const endNode = newGrid[endRow][endCol];
    const animations = true;
    const [visitedOrder, nodesInShortestPathOrder] = dijkstra.dijkstraAlgorithm(
      newGrid,
      animations,
      startNode,
      endNode
    );
    
    const gridElem = document.getElementsByClassName("grid")[0];
    for (let i = 0; i < visitedOrder.length; i++) {
      const { row, col } = visitedOrder[i];
      setTimeout(() => {
        gridElem.children[row].children[col].classList.add(
          "node-visited-animate"
        );
      }, i * this.state.animationDelay);
    }
    
    for (let j = 0; j < nodesInShortestPathOrder.length; j++) {
      const { row, col } = nodesInShortestPathOrder[j];
      setTimeout(() => {
        gridElem.children[row].children[col].classList.add(
          "node-shortest-path-animate"
        );
      }, (visitedOrder.length + j) * this.state.animationDelay);
    }
    
    setTimeout(() => {
      this.setState({ isButtonDisabled: false, isMouseDisabled: false });
    }, (visitedOrder.length + nodesInShortestPathOrder.length + 1) * this.state.animationDelay);
    
    this.setState({ grid: newGrid });
  }
  
  dijkstraNoAnim(newGrid) {
    this.clearAnimations(newGrid);
    const startNode = newGrid[startRow][startCol];
    const endNode = newGrid[endRow][endCol];
    const animations = false;
    
    dijkstra.dijkstraAlgorithm(newGrid, animations, startNode, endNode);
    this.setState({ isInstantAnims: true });
    return newGrid;
  }
  toggleStart(grid, row, col) {
    if (grid[row][col].isFinish || grid[row][col].isWall) return grid;
    const newGrid = grid.slice();
    newGrid[startRow][startCol].isStart = false;
    newGrid[row][col].isStart = !newGrid[row][col].isStart;
    startCol = col;
    startRow = row;
    return newGrid;
  }
  
  toggleFinish = (grid, row, col) => {
    if (grid[row][col].isStart || grid[row][col].isWall) return grid;
    const newGrid = grid.slice();
    newGrid[endRow][endCol].isFinish = false;
    newGrid[row][col].isFinish = !newGrid[row][col].isFinish;
    endCol = col;
    endRow = row;
    return newGrid;
  };
  
  toggleWall = (grid, row, col) => {
    if (grid[row][col].isStart || grid[row][col].isFinish) return grid;
    const newGrid = grid.slice();
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    return newGrid;
  };
  
  visualize(algorithm) {
    switch (algorithm) {
      case DIJKSTRAS:
        this.dijkstraAnimations();
        break;
        default:
        break;
    }
  }
  
  visualizeNoAnim(algorithm, newGrid) {
    switch (algorithm) {
      case DIJKSTRAS:
        return this.dijkstraNoAnim(newGrid);
      default:
        break;
    }
  }
  
  cycleSpeed() {
    if (this.state.animationDelay === ANIMATION_FAST) {
      this.setState({ animationDelay: ANIMATION_AVG });
    } else if (this.state.animationDelay === ANIMATION_AVG) {
      this.setState({ animationDelay: ANIMATION_SLOW });
    } else {
      this.setState({ animationDelay: ANIMATION_FAST });
    }
  }
  
  render() {
    
    const { grid } = this.state;
    
    const speedBtnClass =
      this.state.animationDelay === ANIMATION_FAST
        ? "fast-btn"
        : this.state.animationDelay === ANIMATION_AVG
        ? "average-btn"
        : "slow-btn";
    return (
      <div className="pathfindingCanvas">
        <div className="navBar">
          <p>Map My Path</p>
          <div className="dropdown">
            <p>Algorithms</p>
            <div className="dropdown-content">
              <button
                className="dropdown-btn"
                onClick={() => {
                  this.clearNodeClasses();
                  this.setState({
                    algorithm: DIJKSTRAS,
                    visualizeBtnText: "Visualize " + DIJKSTRAS,
                    finishAnimations: false,
                    isInstantAnims: false,
                  });
                }}
                disabled={this.state.isButtonDisabled}
              >
                Dijkstra's Algorithm
              </button>
              
            </div>
          </div>
          
          <button
            className="visualize-btn"
            onClick={() => {
              if (this.state.algorithm !== "") {
                this.visualize(this.state.algorithm);
              } else {
                this.setState({ visualizeBtnText: "Select an Algorithm" });
              }
            }}
            disabled={this.state.isButtonDisabled}
          >
            {this.state.visualizeBtnText}
          </button>
          <button
            onClick={() => this.clearBoard()}
            disabled={this.state.isButtonDisabled}
          >
            Clear Board
          </button>
          <button
            onClick={() => {
              this.clearNodeClasses();
              this.setState({ finishAnimations: false, isInstantAnims: false });
            }}
            disabled={this.state.isButtonDisabled}
          >
            Reset Animations
          </button>
          <button
            className={speedBtnClass}
            onClick={() => this.cycleSpeed()}
            disabled={this.state.isButtonDisabled}
          >
            Animation Delay: {this.state.animationDelay} ms
          </button>
        </div>
        <Header />
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div className="row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {
                    row,
                    col,
                    isStart,
                    isFinish,
                    isWall,
                    isVisited,
                    isShortestPath,
                    isAnimated,
                    fcost,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isVisited={isVisited}
                      isShortestPath={isShortestPath}
                      isAnimated={isAnimated}
                      fcost={fcost}
                      onMouseDown={(e) =>
                        this.handleMouseDown(e, row, col, isStart, isFinish)
                      }
                      onMouseEnter={() => this.handleMouseEnter(row, col)}
                      onMouseUp={this.handleMouseUp}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < rowLen; row++) {
    const currentRow = [];
    for (let col = 0; col < colLen; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === endRow && col === endCol,
    
    dist: Infinity,
    isVisited: false,
    previousNode: null,
    
    isWall: false,
    isShortestPath: false,
    isAnimated: false,
    
    parent: null,
    rank: 0,
  };
};
