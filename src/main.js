import './scss/main.scss';
import BreadthFirstSearch from './bfs';
import DepthFirstSearch from './dfs';
import Dijkstra from './dijkstra';
import MazeGenerator from './generator';
import Draw from './draw';
import * as CNS from './constants';

const searchTypes = {
  bfs: BreadthFirstSearch,
  dfs: DepthFirstSearch,
  dijkstra: Dijkstra,
  // astar: AStar,
};

document.getElementById('search-nav').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generateMaze, false);
document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);

const canvas = document.getElementById('canvas');
canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;
const ctx = canvas.getContext('2d');
const draw = new Draw(canvas, canvas.getContext('2d'));

// begin drawing maze on page load
// FIXME: why callback?
document.addEventListener('DOMContentLoaded', () => generateMaze(), false);

// TODO: might be able to simplify because i'm passing event target so i dont need
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

// a search's running state is stored in an intervalId: clear any available ID
// a node's `visited` state is stored on the node itself: force it to false
function resetSearch() {
  clearInterval(intervalId);
  Object.keys(minSpanTree).forEach((position) => {
    if (minSpanTree[position].length !== undefined) {
      minSpanTree[position].forEach(n => n[1].visited = false);
    }
  });
}

function doSearch(event) {
  const id = event.target.id;
  if (id === 'search-nav') return;

  // the graph's complete image exists when the maze has fully generated
  if (graph.image) {
    resetSearch();
    ctx.putImageData(graph.image, 0, 0);

    // TODO: helper function?
    if (start === null || end === null) {
      defaultStartAndEnd();
    } else {
      draw.drawEnds([start, end]); // redraw start & end so they overlap on the canvas
    }

    searchAlgorithm = new searchTypes[id](
      canvas,
      minSpanTree,
      start,
      end,
    );
    intervalId = searchAlgorithm.search();
  } else {
    console.log("can't search before building a maze");
  }
}
