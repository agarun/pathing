import BreadthFirstSearch from './bfs.js';
import DepthFirstSearch from './dfs.js';
import MazeGenerator from './generator.js';
import Draw from './draw.js';
import * as CNS from './constants.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const draw = new Draw(canvas, canvas.getContext('2d'));
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;

document.addEventListener('DOMContentLoaded', () => {
    generate(); // on page load
}, false);
document.getElementById('bfs').addEventListener('click', doSearch, false);
document.getElementById('dfs').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generate, false);
document.getElementById('randomize').addEventListener('click', randomize, false);

let searching;
let generating;

let graph;
let mst;
let intervalId;

function generate() {
  // flush the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // if this isn't the first time running generate(), flush the last attempt
  if (intervalId !== undefined) clearInterval(intervalId);

  // run randomized prim's to generate a maze
  const doPrims = function doPrims() {
    const maze = new MazeGenerator(canvas);
    const grid = maze.grid();
    const timerId = maze.build(); // pass callbacks here
    graph = maze;
    mst = maze.tree;
    return timerId;
  };
  intervalId = doPrims();

  // TODO: when generation is complete,
  // TODO: vibrate or flash the buttons 'bfs' and 'dfs'

  searching = 0;
  generating = 0;
}

let start;
let end;

function defaultStartAndEnd() {
  start = '0, 0';
  end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
  draw.drawEnds([start, end]);
}

function randomize() {
  const randomNodes = function randomNodes() {
    const nodes = Object.keys(mst);
    const pick = n => n[Math.floor(Math.random() * n.length)];
    let choiceOne;
    let choiceTwo;
    while (choiceOne === choiceTwo || choiceOne === 'progress' || choiceTwo === 'progress') {
      // TODO: add condition to ensure the numbers aren't close together
      // not quite random: slicing helps us avoid traveling straight into dead-ends
      choiceOne = pick(nodes.slice(0, 50));
      choiceTwo = pick(nodes.slice(1250));
    }
    return [choiceOne, choiceTwo];
  };

  if (mst.progress === CNS.PROGRESS) {
    [start, end] = randomNodes();
    ctx.putImageData(graph.image, 0, 0);
    draw.drawEnds([start, end]);
  }
}

function doSearch() {
  const id = this.id;

  if (graph.image !== undefined) {
    ctx.putImageData(graph.image, 0, 0);

    if (start === undefined || end === undefined) {
      defaultStartAndEnd();
    } else {
      draw.drawEnds([start, end]); // redraw
    }

    if (searching === 1) { // search was done before, reset all 'visited' states
      Object.keys(mst).forEach((position) => {
        if (mst[position].length !== undefined) mst[position].forEach(i => i[1].visited = false);
      });
    }

    // TODO: programatically trigger different search algorithms
    if (id === 'bfs') {
      const searchGraph = new BreadthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      searchGraph.search();
    } else if (id === 'dfs') {
      const searchGraph = new DepthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      searchGraph.search();
    }
  } else {
    console.log("Can't search before building a maze");
  }
  console.log(mst);
  searching = 1;
}
