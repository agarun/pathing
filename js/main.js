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
    generate();
}, false);
document.getElementById('bfs').addEventListener('click', doSearch, false);
document.getElementById('dfs').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generate, false);
document.getElementById('randomize').addEventListener('click', randomize, false);

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
}

let start;
let end;

function defaultStartAndEnd() {
  start = '0, 0';
  end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
  draw.drawSpecial([start, end]);
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

  // TODO: don't do this if maze search is already running
  [start, end] = randomNodes(); // TODO: catch exceptions here
  ctx.putImageData(graph.image, 0, 0)
  draw.drawSpecial([start, end]);
  console.log(start, end);
}

function doSearch() {
  const id = this.id;

  // if a solution is already present, reload the canvas
  if (graph.image !== undefined) ctx.putImageData(graph.image, 0, 0);

  if (mst.progress === CNS.PROGRESS) {
    if (start === undefined || end === undefined) {
      defaultStartAndEnd();
    }

    if (id === 'bfs') {
      // clone MST so we don't mutate the original
      const graph = new BreadthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      graph.search();
    } else if (id === 'dfs') {
      // clone MST so we don't mutate the original
      const graph = new DepthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      graph.search();
    }
  } else {
    console.log("Can't search before building a maze");
  }
}

// webpack bundlejs + minify + figure out about ./stuff.js imports
// babel better or nah?
// whats' up w imports :/
