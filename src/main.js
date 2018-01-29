import './scss/main.scss';
import MazeGenerator from './generator';
import BreadthFirstSearch from './bfs';
import DepthFirstSearch from './dfs';
import Dijkstra from './dijkstra';
import AStar from './astar';
import DOMHelper from './dom';
import Draw from './draw';
import CNS from './constants';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-nav').addEventListener('click', doSearch, false);
  document.getElementById('generate').addEventListener('click', generateMaze, false);
  document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);
  DOMHelper.addMazeToggler();
  generateMaze(); // begin drawing maze on page load
}, false);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const draw = new Draw(canvas, canvas.getContext('2d'));
const searchTypes = {
  bfs: BreadthFirstSearch,
  dfs: DepthFirstSearch,
  dijkstra: Dijkstra,
  astar: AStar,
};

canvas.width = CNS.WIDTH;
canvas.height = CNS.HEIGHT;

let graph;
let minSpanTree;
let intervalId;

let searchAlgorithm = { searching: 0 };
let start;
let end;

function generateMaze() {
  // flush the canvas
  ctx.fillStyle = CNS.BGCOLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // if this isn't the first time running generateMaze(), cancel the last attempt
  clearInterval(intervalId);

  // run randomized prim's algorithm to generate a maze
  const doPrims = function doPrims() {
    const maze = new MazeGenerator(canvas);
    maze.grid(); // FIXME: setupGrid();
    const timerId = maze.build();
    graph = maze;
    minSpanTree = maze.tree;
    return timerId;
  };
  intervalId = doPrims();

  // TODO: possibly use resetSearchSettings() and resetSearchState()
  // reset all search states and flush start and end points (user can repeat searches)
  searchAlgorithm.searching = 0;
  [start, end] = [null, null];
}

// when `randomize` is not called, use top-left & bottom-right corners as start & end points
function defaultStartAndEnd() {
  start = '0, 0';
  end = `${CNS.WIDTH - CNS.BLOCKWIDTH}, ${CNS.HEIGHT - CNS.BLOCKWIDTH}`;
}

function randomizeStartAndEnd() {
  // prohibit changing start and end coordinates while a search is in progress
  if (searchAlgorithm.searching) return;

  // pick random start & end nodes with arbitrary bias by slicing
  const randomNodes = function randomNodes() {
    const nodes = Object.keys(minSpanTree);
    const pick = n => n[Math.floor(Math.random() * n.length)];

    let choiceOne, choiceTwo;
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

function drawStartAndEnd() {
  if (!start || !end) defaultStartAndEnd();
  draw.drawEnds([start, end]);
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

  // graph image exists when the maze has fully generated
  if (graph.image) {
    ctx.putImageData(graph.image, 0, 0);
    draw.resetState();
    drawStartAndEnd();
    resetSearch();

    searchAlgorithm = new searchTypes[id](
      minSpanTree,
      start,
      end,
      draw,
    );
    intervalId = searchAlgorithm.search();
  }
}
