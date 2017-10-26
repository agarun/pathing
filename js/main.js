import BreadthFirstSearch from './bfs.js';
import DepthFirstSearch from './dfs.js';
import MazeGenerator from './generator.js';
import Draw from './draw.js';
import * as CNS from './constants.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
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

let generating;
let graph;
let mst;
let intervalId;

let start;
let end;
let searched;

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

  // reset prim's and search algo's states, and flush start & end points
  if (algorithm !== undefined) algorithm.searching = 0;
  searched = 0;
  generating = 0;
  [start, end] = [undefined, undefined];
}

function defaultStartAndEnd() {
  start = '0, 0';
  end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
  draw.drawEnds([start, end]);
}

function randomize() {
  // prohibit changing start/end coords while a search is in progress
  if (algorithm !== undefined && algorithm.searching) {
    return console.log('Another search is currently running, wait for that one to finish');
  }

  const randomNodes = function randomNodes() {
    const nodes = Object.keys(mst);
    const pick = n => n[Math.floor(Math.random() * n.length)];
    let choiceOne;
    let choiceTwo;
    while (choiceOne === choiceTwo || choiceOne === 'progress' || choiceTwo === 'progress') {
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

let algorithm;
function doSearch() {
  const id = this.id;

  // prohibit running search while another search is in progress
  // NOTE: this runs 1 search and freezes the button until it's done. to undo this feature,
  // add algorithm.searching condition to `if (searching === 1)` to reset `visited`
  if (algorithm !== undefined && algorithm.searching) {
    return console.log('Another search is currently running, wait for that one to finish');
  }

  if (graph.image !== undefined) { // maze has finished generating
    ctx.putImageData(graph.image, 0, 0);

    if (start === undefined || end === undefined) {
      defaultStartAndEnd();
    } else {
      draw.drawEnds([start, end]); // redraw so it overlaps visually
    }

    if (searched === 1) { // a search was done before, reset all 'visited' states
      Object.keys(mst).forEach((position) => {
        if (mst[position].length !== undefined) mst[position].forEach(i => i[1].visited = false);
      });
    }

    // TODO: programatically trigger different search algorithms
    if (id === 'bfs') {
      algorithm = new BreadthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      intervalId = algorithm.search();
    } else if (id === 'dfs') {
      algorithm = new DepthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      intervalId = algorithm.search();
    }
  } else {
    console.log("Can't search before building a maze");
  }
  searched = 1; // the algorithm's setInterval is in effect
}
