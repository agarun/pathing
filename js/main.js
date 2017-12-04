import BreadthFirstSearch from './bfs.js';
import DepthFirstSearch from './dfs.js';
import MazeGenerator from './generator.js';
import Draw from './draw.js';
import * as CNS from './constants.js';

const canvas = document.getElementById('canvas');
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;

const ctx = canvas.getContext('2d');
const draw = new Draw(canvas, canvas.getContext('2d'));

document.addEventListener('DOMContentLoaded', () => {
  generateMaze(); // begin drawing maze on page load
}, false);
document.getElementById('bfs').addEventListener('click', doSearch, false);
document.getElementById('dfs').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generateMaze, false);
document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);

// TODO might be able to simplify because i'm passing event target so i dont need
// to check current class. also repeat this for #search btn overlay.
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
let minSpanTree;
let intervalId;

let searchAlgorithm = { searching: 0 };
let start;
let end;
let mazeSearching;

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
    minSpanTree = maze.tree;
    return timerId;
  };
  intervalId = doPrims();

  // reset all search states and flush start and end points (user can repeat searches)
  searchAlgorithm.searching = 0;
  [start, end] = [null, null];
  mazeSearching = 0;
}

// when `randomize` is not called, use top-left & bottom-right corners as start & end points
function defaultStartAndEnd() {
  start = '0, 0';
  end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
  draw.drawEnds([start, end]);
}

function randomizeStartAndEnd() {
  // prohibit changing start and end coordinates while a search is in progress
  console.log(searchAlgorithm.searching);
  if (searchAlgorithm.searching) {
    return console.log('wait for a search to terminate before choosing new endpoints');
  }

  // picks random start & end nodes, with arbitrary bias for each choice via `slice(..)`
  const randomNodes = function randomNodes() {
    const nodes = Object.keys(minSpanTree);
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
  if (minSpanTree.progress === CNS.PROGRESS) {
    [start, end] = randomNodes();
    ctx.putImageData(graph.image, 0, 0);
    draw.drawEnds([start, end]);
  }
}

function cancelSearch() {
  // kill running search
  clearInterval(intervalId);
  // reset all `visited` states
  Object.keys(minSpanTree).forEach((position) => {
    if (minSpanTree[position].length !== undefined) {
      minSpanTree[position].forEach(i => i[1].visited = false);
    }
  });
}

function doSearch() {
  const id = this.id;

  if (graph.image) { // maze has finished generating
    ctx.putImageData(graph.image, 0, 0);

    if (start === null || end === null) {
      defaultStartAndEnd();
    } else {
      draw.drawEnds([start, end]); // redraw so it overlaps on the canvas
    }

    // TODO dont run 1st time?
    // TODO clarify the roles of mazeSearching and searching. is mazeSearching necessary?
    if (mazeSearching || searchAlgorithm.searching) cancelSearch();

    // TODO: programatically trigger different search algorithms
    if (id === 'bfs') {
      searchAlgorithm = new BreadthFirstSearch(
        canvas,
        minSpanTree,
        start,
        end,
      );
      intervalId = searchAlgorithm.search();
    } else if (id === 'dfs') {
      searchAlgorithm = new DepthFirstSearch(
        canvas,
        minSpanTree,
        start,
        end,
      );
      intervalId = searchAlgorithm.search();
    }
  } else {
    console.log("can't search before building a maze");
  }
  mazeSearching = 1; // the algorithm's setInterval began looping
}
