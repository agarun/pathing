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
  generateMaze(); // begin drawing maze on page load
}, false);
document.getElementById('bfs').addEventListener('click', doSearch, false);
document.getElementById('dfs').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generateMaze, false);
document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);

const toggleActive = (event) => {
  const jumpElement = event.target;
  if (jumpElement.getAttribute('class') === 'jump') {
    document.querySelectorAll('.jump').forEach((anchor) => {
      anchor.classList.toggle('active');
    });
  }
};
const classNameJump = document.getElementsByClassName('jump');
Array.from(classNameJump, c => c.addEventListener('click', toggleActive, false));

let graph;
let mst;
let intervalId;

let searchAlgorithm = { searching: 0 };
let start;
let end;
let searched;

function generateMaze() {
  // flush the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // if this isn't the first time running generateMaze(), cancel the last attempt
  if (intervalId !== undefined) clearInterval(intervalId);

  // run randomized prim's algorithm to generate a maze
  const doPrims = function doPrims() {
    const maze = new MazeGenerator(canvas);
    const grid = maze.grid();
    const timerId = maze.build();
    graph = maze;
    mst = maze.tree;
    return timerId;
  };
  intervalId = doPrims();

  // reset all search states and flush start and end points (user can repeat searches)
  searchAlgorithm.searching = 0;
  [start, end] = [null, null];
  searched = 0;
}

// when `randomize` is not called, use top-left & bottom-right corners as start & end points
function defaultStartAndEnd() {
  start = '0, 0';
  end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
  draw.drawEnds([start, end]);
}

function randomizeStartAndEnd() {
  // prohibit changing start and end coordinates while a search is in progress
  if (searchAlgorithm.searching) {
    return console.log('Another search is currently running, wait for that one to finish');
  }

  // picks random start & end nodes, with arbitrary bias for each choice via `slice(..)`
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

  // only draw if the minimum spanning tree is complete
  if (mst.progress === CNS.PROGRESS) {
    [start, end] = randomNodes();
    ctx.putImageData(graph.image, 0, 0);
    draw.drawEnds([start, end]);
  }
}

function doSearch() {
  const id = this.id;

  // prohibit running search while another is in progress (when searchAlgorithm.searching is 1)
  // program runs a search and freezes the button until search is complete. to undo this feature,
  // append searchAlgorithm.searching to `if (searched === 1)` to reset `visited` necessarily
  if (searchAlgorithm.searching) {
    return console.log('Another search is currently running, wait for that one to finish');
  }

  if (graph.image) { // maze has finished generating
    ctx.putImageData(graph.image, 0, 0);

    if (start === null || end === null) {
      defaultStartAndEnd();
    } else {
      draw.drawEnds([start, end]); // redraw so it overlaps on the canvas
    }

    // if a search was done before, reset all 'visited' states
    if (searched === 1) {
      Object.keys(mst).forEach((position) => {
        if (mst[position].length !== undefined) mst[position].forEach(i => i[1].visited = false);
      });
    }

    // TODO: programatically trigger different search algorithms
    if (id === 'bfs') {
      searchAlgorithm = new BreadthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      intervalId = searchAlgorithm.search();
    } else if (id === 'dfs') {
      searchAlgorithm = new DepthFirstSearch(
        canvas,
        mst,
        start,
        end,
      );
      intervalId = searchAlgorithm.search();
    }
  } else {
    console.log("Can't search before building a maze");
  }
  searched = 1; // the algorithm's setInterval began looping
}
