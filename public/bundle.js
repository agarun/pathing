/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);


class Draw {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.drawn = {};
  }

  drawEdge(edge, colorStep, customColor) {
    this.ctx.fillStyle = customColor || __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* PRIMSCOLORS */][colorStep];
    this.ctx.fillRect(
      ((edge.nodeFrom.x + edge.nodeTo.x) / 2), // edge is in btwn nodeFrom & nodeTo
      ((edge.nodeFrom.y + edge.nodeTo.y) / 2),
      __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */],
    );
  }

  drawNode(node, colorStep, customColor) {
    const [x, y] = Draw.destructurePosition(node);
    this.ctx.fillStyle = customColor || __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* PRIMSCOLORS */][colorStep];
    this.ctx.fillRect(x, y, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */]);
  }

  drawPath(nodes, style, force) {
    this.ctx.fillStyle = style === 'visit' ? __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* VISITCOLOR */] : __WEBPACK_IMPORTED_MODULE_0__constants__["j" /* SOLUTIONCOLOR */];

    nodes.forEach((node) => {
      const edgeId = `${node[0].nodeFrom.x} ${node[0].nodeFrom.y} ${node[0].nodeTo.x} ${node[0].nodeTo.y}`;
      if (!this.drawn[edgeId] || force) {
        this.drawEdge(node[0]);
        this.drawn[edgeId] = true;
      }
      const [x, y] = Draw.destructurePosition(node[1]);
      const nodeId = `${x} | ${y}`;
      if (!this.drawn[nodeId] || force) {
        this.ctx.fillRect(x, y, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */]);
        this.drawn[nodeId] = true;
      }
    });
  }

  // TODO: DRY
  drawEnds(nodes) {
    const startAndEnd = nodes.map(node => node.split(', '));
    this.ctx.strokeStyle = __WEBPACK_IMPORTED_MODULE_0__constants__["j" /* SOLUTIONCOLOR */];
    this.ctx.lineWidth = 4;
    this.ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* STARTCOLOR */];
    this.ctx.fillRect(startAndEnd[0][0], startAndEnd[0][1], (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5));
    this.ctx.strokeRect(startAndEnd[0][0] - (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] / 4), startAndEnd[0][1] - (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] / 4), (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5));
    this.ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* ENDCOLOR */];
    this.ctx.fillRect(startAndEnd[1][0], startAndEnd[1][1], (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5));
    this.ctx.strokeRect(startAndEnd[1][0] - (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] / 4), startAndEnd[1][1] - (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] / 4), (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */] * 1.5));
    this.ctx.stroke();
  }

  static destructurePosition(nodePosition) {
    if (typeof nodePosition === 'string' || nodePosition instanceof String) {
      return nodePosition.split(', ');
    }
    return [nodePosition.x, nodePosition.y];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Draw);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CELLSIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BLOCKWIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return NUMROWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NUMCOLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return PROGRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PRIMSCOLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return VISITCOLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SOLUTIONCOLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return STARTCOLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ENDCOLOR; });
const WIDTH = 1008;
const HEIGHT = 624;

const CELLSIZE = 8;
const BLOCKWIDTH = CELLSIZE * 2;

// each node will have a corresponding cell in the graph's collection array
const NUMROWS = HEIGHT / BLOCKWIDTH;
const NUMCOLS = WIDTH / BLOCKWIDTH;

// to observe a cell's surroundings, we store information about each of their neighbors
const DIRECTIONS = {
  NORTH: 0, //   0
  SOUTH: 2, // 3 * 1
  EAST: 1, //    2
  WEST: 3,
};

// setInterval() terminates when each node of NUMROWS & NUMCOLS is traversed
const PROGRESS = ((WIDTH * HEIGHT) / (BLOCKWIDTH ** 2)) - 1;

// TODO: const PATHCOLORS will draw the path to the target node with color progression
const PRIMSCOLORS = {
  0.00: "#f5fff9", 0.05: '#e4feef', 0.10: '#dbf7e7',
  0.15: '#c9fade', 0.20: '#bcf7d6', 0.25: '#b2f6d0',
  0.30: '#a9fcce', 0.35: '#98f5c1', 0.40: '#8effbf',
  0.45: '#82fcb8', 0.50: '#7ffcb7', 0.55: '#66fca7',
  0.60: '#55fb9d', 0.65: '#49ff98', 0.70: '#39f68b',
  0.75: '#38fc8d', 0.80: '#30fb88', 0.85: '#27fb83',
  0.90: '#1cfc7d', 0.95: '#1cfc7d', 1.00: '#1cfc7d',
};
const VISITCOLOR = 'rgba(249, 63, 44, 0.92)'; // NOTE: might want to remove opacity
const SOLUTIONCOLOR = '#ffe600';
const STARTCOLOR = '#4d9803';
const ENDCOLOR = '#870741';




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bfs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dfs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dijkstra__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__generator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__draw__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(1);








const searchTypes = {
  bfs: __WEBPACK_IMPORTED_MODULE_1__bfs__["a" /* default */],
  dfs: __WEBPACK_IMPORTED_MODULE_2__dfs__["a" /* default */],
  dijkstra: __WEBPACK_IMPORTED_MODULE_3__dijkstra__["a" /* default */],
  // astar: AStar,
};

document.getElementById('search-nav').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generateMaze, false);
document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);

const canvas = document.getElementById('canvas');
canvas.width = __WEBPACK_IMPORTED_MODULE_6__constants__["m" /* WIDTH */];
canvas.height = __WEBPACK_IMPORTED_MODULE_6__constants__["e" /* HEIGHT */];
const ctx = canvas.getContext('2d');
const draw = new __WEBPACK_IMPORTED_MODULE_5__draw__["a" /* default */](canvas, canvas.getContext('2d'));

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
    const maze = new __WEBPACK_IMPORTED_MODULE_4__generator__["a" /* default */](canvas);
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
  end = `${__WEBPACK_IMPORTED_MODULE_6__constants__["m" /* WIDTH */] - __WEBPACK_IMPORTED_MODULE_6__constants__["a" /* BLOCKWIDTH */]}, ${__WEBPACK_IMPORTED_MODULE_6__constants__["e" /* HEIGHT */] - __WEBPACK_IMPORTED_MODULE_6__constants__["a" /* BLOCKWIDTH */]}`;
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
  if (minSpanTree.progress === __WEBPACK_IMPORTED_MODULE_6__constants__["i" /* PROGRESS */]) {
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draw__ = __webpack_require__(0);


class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new __WEBPACK_IMPORTED_MODULE_0__draw__["a" /* default */](canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.queue = [];

    // limited spanning tree object used solely for path information
    this.meta = {};

    // 1: performing search, 0: waiting to search
    this.searching = 0;
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const queue = this.queue;
    const meta = this.meta;

    queue.push(source);

    const timer = setInterval(() => {
      if (queue.length) {
        const currentNode = queue.shift();

        if (Object.keys(meta).length) {
          this.draw.drawPath(graph[currentNode], 'visit');
        }

        // grab each neighbor node of the current cell and stringify as a `key`
        // graph[currentNode] stores the neighbors in the adjacency lists,
        // represented by [[northEdge, node], [eastEdge, node] ...]
        // graph[currentNode][i][0] => stores the edge to the neighbor node
        // (and this edge stores references to `nodeFrom` and `nodeTo`)
        // graph[currentNode][i][0] => stores the neighbor node
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the solution path
          if (key === target) {
            meta[key] = [[graph[currentNode][i][0], currentNode]];
            clearInterval(timer);
            return this.path();
          }

          if (!neighbor.visited) {
            queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        clearInterval(timer);
        return console.log('no solution in this direction');
      }
    }, 5);
    // allow choosing a new search while another search is running:
    // return access to setInterval ID to permit clearInterval on that ID
    return timer;
  }

  path() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], 'solution', true);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
    // redraw start & end on the solution backtrace to overlap the path for visibility
    this.draw.drawEnds([this.source, this.target]);
    this.searching = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BreadthFirstSearch);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draw__ = __webpack_require__(0);


class DepthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new __WEBPACK_IMPORTED_MODULE_0__draw__["a" /* default */](canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.stack = [];

    // limited spanning tree object used solely for path information
    this.meta = {};

    // 1: performing search, 0: waiting to search
    this.searching = 0;
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const stack = this.stack;
    const meta = this.meta;

    stack.push(source);

    const timer = setInterval(() => {
      if (stack.length) {
        const currentNode = stack.pop();

        // draw the current node being visited and the passage that was used to get there
        if (Object.keys(meta).length) {
          this.draw.drawPath([[meta[currentNode][0][0], currentNode]], 'visit');
        }

        // grab each neighbor node of the current cell and stringify as a `key`
        // graph[currentNode] stores the neighbors in the adjacency lists,
        // represented by [[northEdge, node], [eastEdge, node] ...]
        // graph[currentNode][i][0] => stores the edge to the neighbor node
        // (and this edge stores references to `nodeFrom` and `nodeTo`)
        // graph[currentNode][i][0] => stores the neighbor node
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            this.draw.drawNode(key);
            meta[key] = [[graph[currentNode][i][0], currentNode]];
            clearInterval(timer);
            return this.path();
          }

          if (!neighbor.visited) {
            stack.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        clearInterval(timer);
        return console.log('no solution in this direction');
      }
    }, 10);
    // allow choosing new search type while a search is running: return access to
    // setInterval ID to permit clearInterval if calling generateMaze() during a search
    return timer;
  }

  path() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], 'solution', true);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
    // redraw start & end on the solution backtrace to overlap the path for visibility
    this.draw.drawEnds([this.source, this.target]);
    this.searching = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DepthFirstSearch);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draw__ = __webpack_require__(0);


// Uniform-cost search (UCS) - a variant of Dijkstra's algorithm that terminates
// as soon as the target node is discovered. It does not lazily fill the
// priority queue with infinite-cost nodes and it does not explore/store
// all nodes for reuse. In the more typical Dijkstra's algorithm, we
// expect to also implement a `decrease-key` operation for the priority queue.

// Getting a UCS from Dijkstra's algorithm is useful here to conserve
// space in the `PriorityQueue` on initialization.

// in a Priority Queue, elements (nodes) with high priority (lower cost)
// are served before elements with lower priority (higher cost).
// this code uses a binary heap-based priority queue package 'js-priority-queue'.
// Google also includes a heap-based PQ implementation in the Closure Library
// (https://github.com/google/closure-library/tree/master/closure/goog/structs)
const PriorityQueue = __webpack_require__(7);

class Dijkstra {
  constructor(canvas, graph, source, target) {
    this.draw = new __WEBPACK_IMPORTED_MODULE_0__draw__["a" /* default */](canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;

    // 1: performing search, 0: waiting to search
    this.searching = 0;

    // the `previous` object stores a reference to one parent node for each node
    // only keep the parent node that contributes to the cheapest cost (shortest distance)
    this.previous = {};
    this.distances = {};

    // use a priority queue in which vertices are sorted by their increasing cost
    this.priorityQueue = new PriorityQueue({
      comparator: (edgeOne, edgeTwo) => edgeOne.weight - edgeTwo.weight,
    });
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const priorityQueue = this.priorityQueue;
    const distances = this.distances;

    // helper method
    // for each vertex v in graph, dist[v] is infinity and prev[v] is null
    // graph.forEach((nodeData) => {
    //   const node = nodeData[0].nodeFrom;
    //   distances[node] = Infinity;
    //   priorityQueue.queue(node);
    // });

    // explain these 2
    distances[source] = 0;
    prev[source] = null;
    priorityQueue.queue(source);
    const timer = setInterval(() => {
      if (priorityQueue.length) {
        const currentNode = priorityQueue.dequeue();

        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          // graph[currentNode][i][0] => stores the edge to the neighbor node
          // (and this edge stores references to `nodeFrom` and `nodeTo`)
          // graph[currentNode][i][0] => stores the neighbor node
          const neighborEdge = neighbors[i][0];
          const neighbor = neighbors[i][1];

          // console.log(neighbors[i]);
          // console.log(neighbor);
          // console.log(neighborEdge);
          const key = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            console.log('solution discovered');
          }

          // a visited node will never be checked again
          // TODO: might want to do this when setting currentNode
          // if (neighbor.visited) return;

          // consider every neighbor and calculate potential distances:
          // for each, store the distance to the currentNode
          // + the edge weight to the current neighbor
          // Euclidean distance?
          const distanceToNeighborNode = distances[currentNode] + neighborEdge.weight;
          if (distances[neighbor] < distanceToNeighborNode) {
            distances[neighbor] = distanceToNeighborNode;
          }
        }

        // the visited state is stored on the node itself for simplicity
        // in all my implementations.
        // set visited state!
      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        clearInterval(timer);
        return console.log('no solution in this direction');
      }
    }, 10);
    // allow choosing new search type while a search is running: return access to
    // setInterval ID to permit clearInterval if calling generateMaze() during a search
    return timer;
  }

  shortestPath() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], 'solution', true);
      predecessor = this.previous[predecessor];
    }
    // redraw start & end on the solution backtrace to overlap the path for visibility
    this.draw.drawEnds([this.source, this.target]);
    this.searching = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dijkstra);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PriorityQueue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AbstractPriorityQueue, ArrayStrategy, BHeapStrategy, BinaryHeapStrategy, PriorityQueue,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

AbstractPriorityQueue = _dereq_('./PriorityQueue/AbstractPriorityQueue');

ArrayStrategy = _dereq_('./PriorityQueue/ArrayStrategy');

BinaryHeapStrategy = _dereq_('./PriorityQueue/BinaryHeapStrategy');

BHeapStrategy = _dereq_('./PriorityQueue/BHeapStrategy');

PriorityQueue = (function(superClass) {
  extend(PriorityQueue, superClass);

  function PriorityQueue(options) {
    options || (options = {});
    options.strategy || (options.strategy = BinaryHeapStrategy);
    options.comparator || (options.comparator = function(a, b) {
      return (a || 0) - (b || 0);
    });
    PriorityQueue.__super__.constructor.call(this, options);
  }

  return PriorityQueue;

})(AbstractPriorityQueue);

PriorityQueue.ArrayStrategy = ArrayStrategy;

PriorityQueue.BinaryHeapStrategy = BinaryHeapStrategy;

PriorityQueue.BHeapStrategy = BHeapStrategy;

module.exports = PriorityQueue;


},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3,"./PriorityQueue/BHeapStrategy":4,"./PriorityQueue/BinaryHeapStrategy":5}],2:[function(_dereq_,module,exports){
var AbstractPriorityQueue;

module.exports = AbstractPriorityQueue = (function() {
  function AbstractPriorityQueue(options) {
    var ref;
    if ((options != null ? options.strategy : void 0) == null) {
      throw 'Must pass options.strategy, a strategy';
    }
    if ((options != null ? options.comparator : void 0) == null) {
      throw 'Must pass options.comparator, a comparator';
    }
    this.priv = new options.strategy(options);
    this.length = (options != null ? (ref = options.initialValues) != null ? ref.length : void 0 : void 0) || 0;
  }

  AbstractPriorityQueue.prototype.queue = function(value) {
    this.length++;
    this.priv.queue(value);
    return void 0;
  };

  AbstractPriorityQueue.prototype.dequeue = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    this.length--;
    return this.priv.dequeue();
  };

  AbstractPriorityQueue.prototype.peek = function(value) {
    if (!this.length) {
      throw 'Empty queue';
    }
    return this.priv.peek();
  };

  AbstractPriorityQueue.prototype.clear = function() {
    this.length = 0;
    return this.priv.clear();
  };

  return AbstractPriorityQueue;

})();


},{}],3:[function(_dereq_,module,exports){
var ArrayStrategy, binarySearchForIndexReversed;

binarySearchForIndexReversed = function(array, value, comparator) {
  var high, low, mid;
  low = 0;
  high = array.length;
  while (low < high) {
    mid = (low + high) >>> 1;
    if (comparator(array[mid], value) >= 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

module.exports = ArrayStrategy = (function() {
  function ArrayStrategy(options) {
    var ref;
    this.options = options;
    this.comparator = this.options.comparator;
    this.data = ((ref = this.options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this.data.sort(this.comparator).reverse();
  }

  ArrayStrategy.prototype.queue = function(value) {
    var pos;
    pos = binarySearchForIndexReversed(this.data, value, this.comparator);
    this.data.splice(pos, 0, value);
    return void 0;
  };

  ArrayStrategy.prototype.dequeue = function() {
    return this.data.pop();
  };

  ArrayStrategy.prototype.peek = function() {
    return this.data[this.data.length - 1];
  };

  ArrayStrategy.prototype.clear = function() {
    this.data.length = 0;
    return void 0;
  };

  return ArrayStrategy;

})();


},{}],4:[function(_dereq_,module,exports){
var BHeapStrategy;

module.exports = BHeapStrategy = (function() {
  function BHeapStrategy(options) {
    var arr, i, j, k, len, ref, ref1, shift, value;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.pageSize = (options != null ? options.pageSize : void 0) || 512;
    this.length = 0;
    shift = 0;
    while ((1 << shift) < this.pageSize) {
      shift += 1;
    }
    if (1 << shift !== this.pageSize) {
      throw 'pageSize must be a power of two';
    }
    this._shift = shift;
    this._emptyMemoryPageTemplate = arr = [];
    for (i = j = 0, ref = this.pageSize; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      arr.push(null);
    }
    this._memory = [];
    this._mask = this.pageSize - 1;
    if (options.initialValues) {
      ref1 = options.initialValues;
      for (k = 0, len = ref1.length; k < len; k++) {
        value = ref1[k];
        this.queue(value);
      }
    }
  }

  BHeapStrategy.prototype.queue = function(value) {
    this.length += 1;
    this._write(this.length, value);
    this._bubbleUp(this.length, value);
    return void 0;
  };

  BHeapStrategy.prototype.dequeue = function() {
    var ret, val;
    ret = this._read(1);
    val = this._read(this.length);
    this.length -= 1;
    if (this.length > 0) {
      this._write(1, val);
      this._bubbleDown(1, val);
    }
    return ret;
  };

  BHeapStrategy.prototype.peek = function() {
    return this._read(1);
  };

  BHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this._memory.length = 0;
    return void 0;
  };

  BHeapStrategy.prototype._write = function(index, value) {
    var page;
    page = index >> this._shift;
    while (page >= this._memory.length) {
      this._memory.push(this._emptyMemoryPageTemplate.slice(0));
    }
    return this._memory[page][index & this._mask] = value;
  };

  BHeapStrategy.prototype._read = function(index) {
    return this._memory[index >> this._shift][index & this._mask];
  };

  BHeapStrategy.prototype._bubbleUp = function(index, value) {
    var compare, indexInPage, parentIndex, parentValue;
    compare = this.comparator;
    while (index > 1) {
      indexInPage = index & this._mask;
      if (index < this.pageSize || indexInPage > 3) {
        parentIndex = (index & ~this._mask) | (indexInPage >> 1);
      } else if (indexInPage < 2) {
        parentIndex = (index - this.pageSize) >> this._shift;
        parentIndex += parentIndex & ~(this._mask >> 1);
        parentIndex |= this.pageSize >> 1;
      } else {
        parentIndex = index - 2;
      }
      parentValue = this._read(parentIndex);
      if (compare(parentValue, value) < 0) {
        break;
      }
      this._write(parentIndex, value);
      this._write(index, parentValue);
      index = parentIndex;
    }
    return void 0;
  };

  BHeapStrategy.prototype._bubbleDown = function(index, value) {
    var childIndex1, childIndex2, childValue1, childValue2, compare;
    compare = this.comparator;
    while (index < this.length) {
      if (index > this._mask && !(index & (this._mask - 1))) {
        childIndex1 = childIndex2 = index + 2;
      } else if (index & (this.pageSize >> 1)) {
        childIndex1 = (index & ~this._mask) >> 1;
        childIndex1 |= index & (this._mask >> 1);
        childIndex1 = (childIndex1 + 1) << this._shift;
        childIndex2 = childIndex1 + 1;
      } else {
        childIndex1 = index + (index & this._mask);
        childIndex2 = childIndex1 + 1;
      }
      if (childIndex1 !== childIndex2 && childIndex2 <= this.length) {
        childValue1 = this._read(childIndex1);
        childValue2 = this._read(childIndex2);
        if (compare(childValue1, value) < 0 && compare(childValue1, childValue2) <= 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else if (compare(childValue2, value) < 0) {
          this._write(childIndex2, value);
          this._write(index, childValue2);
          index = childIndex2;
        } else {
          break;
        }
      } else if (childIndex1 <= this.length) {
        childValue1 = this._read(childIndex1);
        if (compare(childValue1, value) < 0) {
          this._write(childIndex1, value);
          this._write(index, childValue1);
          index = childIndex1;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return void 0;
  };

  return BHeapStrategy;

})();


},{}],5:[function(_dereq_,module,exports){
var BinaryHeapStrategy;

module.exports = BinaryHeapStrategy = (function() {
  function BinaryHeapStrategy(options) {
    var ref;
    this.comparator = (options != null ? options.comparator : void 0) || function(a, b) {
      return a - b;
    };
    this.length = 0;
    this.data = ((ref = options.initialValues) != null ? ref.slice(0) : void 0) || [];
    this._heapify();
  }

  BinaryHeapStrategy.prototype._heapify = function() {
    var i, j, ref;
    if (this.data.length > 0) {
      for (i = j = 1, ref = this.data.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
        this._bubbleUp(i);
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype.queue = function(value) {
    this.data.push(value);
    this._bubbleUp(this.data.length - 1);
    return void 0;
  };

  BinaryHeapStrategy.prototype.dequeue = function() {
    var last, ret;
    ret = this.data[0];
    last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._bubbleDown(0);
    }
    return ret;
  };

  BinaryHeapStrategy.prototype.peek = function() {
    return this.data[0];
  };

  BinaryHeapStrategy.prototype.clear = function() {
    this.length = 0;
    this.data.length = 0;
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleUp = function(pos) {
    var parent, x;
    while (pos > 0) {
      parent = (pos - 1) >>> 1;
      if (this.comparator(this.data[pos], this.data[parent]) < 0) {
        x = this.data[parent];
        this.data[parent] = this.data[pos];
        this.data[pos] = x;
        pos = parent;
      } else {
        break;
      }
    }
    return void 0;
  };

  BinaryHeapStrategy.prototype._bubbleDown = function(pos) {
    var last, left, minIndex, right, x;
    last = this.data.length - 1;
    while (true) {
      left = (pos << 1) + 1;
      right = left + 1;
      minIndex = pos;
      if (left <= last && this.comparator(this.data[left], this.data[minIndex]) < 0) {
        minIndex = left;
      }
      if (right <= last && this.comparator(this.data[right], this.data[minIndex]) < 0) {
        minIndex = right;
      }
      if (minIndex !== pos) {
        x = this.data[minIndex];
        this.data[minIndex] = this.data[pos];
        this.data[pos] = x;
        pos = minIndex;
      } else {
        break;
      }
    }
    return void 0;
  };

  return BinaryHeapStrategy;

})();


},{}]},{},[1])(1)
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graph__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draw__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);




class MazeGenerator {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw = new __WEBPACK_IMPORTED_MODULE_1__draw__["a" /* default */](canvas, this.ctx);

    // undirected graph to which we will add random edge weights
    this.graph = new __WEBPACK_IMPORTED_MODULE_0__graph__["b" /* Graph */]();

    // the frontier represents the cells that surround or 'wall in' the maze path
    // i.e. the cells that aren't 'part' of the maze but are neighbors of current cell
    this.frontier = [];

    // minimum spanning tree (MST) -> all the edges of our edge-weighted, undirected
    // graph that connects all the vertices with the minimum possible total edge weight
    // this is a subset of this.graph.collection represented by an adjacency list
    // in an object, where the key is the node identifier & the value is an array of neighbors
    this.tree = {};
  }

  grid() {
    // initialize & build the maze grid points
    // the grid points are coded in a `..-Node-Edge-Node-Edge-..` pattern
    // in each direction. the MST will be a subgraph of this pattern
    const graph = this.graph;
    for (let r = 0; r < __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* NUMROWS */]; r += 1) {
      graph.collection[r] = [];
      for (let c = 0; c < __WEBPACK_IMPORTED_MODULE_2__constants__["f" /* NUMCOLS */]; c += 1) {
        graph.collection[r][c] = new __WEBPACK_IMPORTED_MODULE_0__graph__["c" /* Node */](c, r);
      }
    }

    // the undirected graph's node edges are linked in each direction
    for (let r = 0; r < __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* NUMROWS */]; r += 1) {
      for (let c = 0; c < __WEBPACK_IMPORTED_MODULE_2__constants__["f" /* NUMCOLS */]; c += 1) {
        // in randomized prim's, edges ('passages') have random weights
        // the `if` statements keep generation within range, then assign weighted edges
        if (r !== __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* NUMROWS */] - 1) {
          graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].SOUTH] =
            new __WEBPACK_IMPORTED_MODULE_0__graph__["a" /* Edge */](graph.collection[r][c], graph.collection[r + 1][c]);
          // undirected linkage (edge between N + S has 1 random weight):
          graph.collection[r + 1][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].NORTH] =
            new __WEBPACK_IMPORTED_MODULE_0__graph__["a" /* Edge */](graph.collection[r + 1][c], graph.collection[r][c],
              graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].SOUTH].weight);
        }
        if (c !== __WEBPACK_IMPORTED_MODULE_2__constants__["f" /* NUMCOLS */] - 1) {
          graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].EAST] =
            new __WEBPACK_IMPORTED_MODULE_0__graph__["a" /* Edge */](graph.collection[r][c], graph.collection[r][c + 1]);
          // undirected linkage (edge between E + W has 1 random weight):
          graph.collection[r][c + 1].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].WEST] =
            new __WEBPACK_IMPORTED_MODULE_0__graph__["a" /* Edge */](graph.collection[r][c + 1], graph.collection[r][c],
              graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].EAST].weight);
        }
      }
    }
  }

  // "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree
  // for a weighted undirected graph" (Wikipedia). this is its randomized implementation
  // it can be applied as a maze generation algorithm by building a maze "frontier"
  prims() {
    // the maze is built along the edge with the lowest weight
    // that choice must not connect with a previously visited node
    // (1) observe the frontier to the current cell
    // (2) compare the edge weights & set the minimum cell
    // FIXME: non-fatal rare complaint: 'Cannot set property 'discovered' of null'
    let newEdge = new __WEBPACK_IMPORTED_MODULE_0__graph__["a" /* Edge */](null, null, 1); // dummy edge, outside maximum weight
    for (let i = 0; i < this.frontier.length; i += 1) {
      if (this.frontier[i].nodeFrom.discovered && this.frontier[i].nodeTo.discovered) {
        this.frontier.splice(i, 1);
      } else if (this.frontier[i].weight < newEdge.weight && !this.frontier[i].nodeTo.discovered) {
        newEdge = this.frontier[i];
      }
    }
    newEdge.nodeTo.discovered = true;

    // re-build the frontier at the new node for each of 4 directions
    Object.values(__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */]).forEach((direction) => {
      // there should be a cell at the direction && it should be undiscovered
      if (
        (newEdge.nodeTo.neighbors[direction] !== undefined)
        && (!newEdge.nodeTo.neighbors[direction].nodeTo.discovered)
      ) {
        this.frontier.push(newEdge.nodeTo.neighbors[direction]);
      }
    });

    // `nodeFrom` is related to `nodeTo` by an edge
    const currentPos = `${newEdge.nodeFrom.x}, ${newEdge.nodeFrom.y}`;
    const nextPos = `${newEdge.nodeTo.x}, ${newEdge.nodeTo.y}`;

    // each grid node stores a neighbor in the format [edge, node] where the edge
    // is the passage to the next node. since this is an undirected graph, the
    // currentPos has a neighbor nextPos, and the nextPos has a neighbor currentPos
    // if this was a directed graph, omit one of the ternaries - observe that
    // dead-ends will be very common when using random extremes, since the
    // search algorithm isn't allowed to look in an 'opposite' direction
    this.tree[currentPos] === undefined
      ? this.tree[currentPos] = [[newEdge, newEdge.nodeTo]]
      : this.tree[currentPos].push([newEdge, newEdge.nodeTo]);
    this.tree[nextPos] === undefined
      ? this.tree[nextPos] = [[newEdge, newEdge.nodeFrom]]
      : this.tree[nextPos].push([newEdge, newEdge.nodeFrom]);

    // color in the node since it was (1) visited and (2) added, and
    // color the edge from the previous node to nodeTo, based on # of nodes.
    // a gradient of 20 colors determines the fill color for the extent of progress
    let colorStep = (Object.keys(this.tree).length / __WEBPACK_IMPORTED_MODULE_2__constants__["i" /* PROGRESS */]);
    colorStep = ((Math.ceil(colorStep * 20)) / 20).toFixed(2); // round to nearest .05
    this.draw.drawEdge(newEdge, colorStep);
    this.draw.drawNode(newEdge.nodeTo, colorStep);
  }

  build() {
    // start building minimum spanning tree from the top-left node (canvas coord 0,0)
    const firstNode = this.graph.collection[0][0];
    this.graph.collection[0][0].discovered = true;
    this.draw.drawNode(firstNode, null, __WEBPACK_IMPORTED_MODULE_2__constants__["h" /* PRIMSCOLORS */][0.00]);
    this.image = 0;

    // the top-left corner is 'walled' in by 1 southern cell & 1 eastern cell
    // visit either based on random weight: randomized prim's chooses lowest edge weight
    this.frontier.push(
      this.graph.collection[0][0].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].SOUTH],
      this.graph.collection[0][0].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DIRECTIONS */].EAST],
    );

    // repeat the prims algorithm until the graph is complete
    // uses an arbitrary time interval (ms) at which to build the maze
    this.tree.progress = 0;
    const time = 0;
    const timer = setInterval(() => {
      this.prims();
      this.tree.progress += 1;
      if (this.tree.progress === __WEBPACK_IMPORTED_MODULE_2__constants__["i" /* PROGRESS */]) { // every node in graph.collection is discovered
        clearInterval(timer);
        this.image = this.ctx.getImageData(0, 0, __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* WIDTH */], __WEBPACK_IMPORTED_MODULE_2__constants__["e" /* HEIGHT */]);
        this.buttonColorFill();
      }
    }, time);
    return timer; // access to setInterval ID to permit clearInterval in other scopes
  }

  buttonColorFill() {
    ['bfs', 'dfs', 'dijkstra', 'astar'].forEach((id) => {
      document.getElementById(id).classList.remove('disabled');
      document.getElementById(id).classList.add('search-btn');
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MazeGenerator);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Graph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Edge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);


class Graph {
  constructor() {
    this.collection = []; // collection of nodes
  }
}

class Node {
  constructor(x, y) {
    this.x = x * __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BLOCKWIDTH */];
    this.y = y * __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BLOCKWIDTH */];
    this.neighbors = []; // node's neighboring edges
    this.visited = false;
    this.discovered = false; // true when added to MST
  }
}

class Edge {
  constructor(nodeFrom, nodeTo, weight = Math.random()) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
    this.weight = weight; // edges initialized with a random weight
  }
}




/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDk0NTk4ZWVlZTdiYzg2YmQ2ZGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGZzLmpzIiwid2VicGFjazovLy8uL3NyYy9kaWprc3RyYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMtcHJpb3JpdHktcXVldWUvcHJpb3JpdHktcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFtQixHQUFHLG1CQUFtQixHQUFHLGlCQUFpQixHQUFHLGlCQUFpQjtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLEVBQUUsS0FBSyxFQUFFO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDJIQUEyQixJQUFJLDRIQUE0QjtBQUN0RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7OztBQ2pKQSx5Qzs7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBLHlCQUF5QixXQUFXLElBQUksV0FBVzs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLFdBQVcsSUFBSSxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDbkZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQSx5QkFBeUIsV0FBVyxJQUFJLFdBQVc7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLFdBQVcsSUFBSSxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDckZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFdBQVcsSUFBSSxXQUFXOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O1lDekhBLHlCQUFhLFNBQTJELG1CQUFtQixnREFBZ0QsYUFBYSxLQUFLLE1BQU0sZ0NBQWdDLFNBQVMscUNBQXFDLFNBQVMsbUNBQW1DLE9BQU8sS0FBSyxPQUFPLHVCQUF1QixhQUFhLDBCQUEwQiwwQkFBMEIsZ0JBQWdCLFVBQVUsVUFBVSwwQ0FBMEMsOEJBQXdCLG9CQUFvQiw4Q0FBOEMsa0NBQWtDLFlBQVksWUFBWSxtQ0FBbUMsaUJBQWlCLGdCQUFnQixzQkFBc0Isb0JBQW9CLDBDQUEwQyxZQUFZLFdBQVcsWUFBWSxTQUFTLEdBQUc7QUFDanpCO0FBQ0Esb0NBQW9DLDBCQUEwQix5REFBeUQsRUFBRSxrQkFBa0IsMEJBQTBCLEVBQUUsbUNBQW1DLDhCQUE4QixvQ0FBb0MsY0FBYyxFQUFFO0FBQzVSLGNBQWM7O0FBRWQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBOztBQUVBOztBQUVBOzs7QUFHQSxDQUFDLEVBQUUscUpBQXFKO0FBQ3hKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7QUFHRCxDQUFDLEdBQUc7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7QUFHRCxDQUFDLEdBQUc7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLDhCQUE4QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7OztBQUdELENBQUMsR0FBRztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyw4QkFBOEI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7OztBQUdELENBQUMsR0FBRyxFQUFFLEdBQUc7QUFDVCxDQUFDLEU7Ozs7Ozs7Ozs7QUNsWTJCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUVBQWlCO0FBQ3BDO0FBQ0EscUJBQXFCLGlFQUFpQjtBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsaUVBQWlCO0FBQ3BDLHFCQUFxQixpRUFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBGQUEwQztBQUMxQyxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDBCQUEwQixtQkFBbUIsSUFBSSxtQkFBbUI7QUFDcEUsdUJBQXVCLGlCQUFpQixJQUFJLGlCQUFpQjs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0dBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUMxSkE7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0OTQ1OThlZWVlN2JjODZiZDZkZCIsImltcG9ydCAqIGFzIENOUyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5jbGFzcyBEcmF3IHtcclxuICBjb25zdHJ1Y3RvcihjYW52YXMsIGN0eCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgIHRoaXMuZHJhd24gPSB7fTtcclxuICB9XHJcblxyXG4gIGRyYXdFZGdlKGVkZ2UsIGNvbG9yU3RlcCwgY3VzdG9tQ29sb3IpIHtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGN1c3RvbUNvbG9yIHx8IENOUy5QUklNU0NPTE9SU1tjb2xvclN0ZXBdO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3QoXHJcbiAgICAgICgoZWRnZS5ub2RlRnJvbS54ICsgZWRnZS5ub2RlVG8ueCkgLyAyKSwgLy8gZWRnZSBpcyBpbiBidHduIG5vZGVGcm9tICYgbm9kZVRvXHJcbiAgICAgICgoZWRnZS5ub2RlRnJvbS55ICsgZWRnZS5ub2RlVG8ueSkgLyAyKSxcclxuICAgICAgQ05TLkNFTExTSVpFLCBDTlMuQ0VMTFNJWkUsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZHJhd05vZGUobm9kZSwgY29sb3JTdGVwLCBjdXN0b21Db2xvcikge1xyXG4gICAgY29uc3QgW3gsIHldID0gRHJhdy5kZXN0cnVjdHVyZVBvc2l0aW9uKG5vZGUpO1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY3VzdG9tQ29sb3IgfHwgQ05TLlBSSU1TQ09MT1JTW2NvbG9yU3RlcF07XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh4LCB5LCBDTlMuQ0VMTFNJWkUsIENOUy5DRUxMU0laRSk7XHJcbiAgfVxyXG5cclxuICBkcmF3UGF0aChub2Rlcywgc3R5bGUsIGZvcmNlKSB7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBzdHlsZSA9PT0gJ3Zpc2l0JyA/IENOUy5WSVNJVENPTE9SIDogQ05TLlNPTFVUSU9OQ09MT1I7XHJcblxyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICBjb25zdCBlZGdlSWQgPSBgJHtub2RlWzBdLm5vZGVGcm9tLnh9ICR7bm9kZVswXS5ub2RlRnJvbS55fSAke25vZGVbMF0ubm9kZVRvLnh9ICR7bm9kZVswXS5ub2RlVG8ueX1gO1xyXG4gICAgICBpZiAoIXRoaXMuZHJhd25bZWRnZUlkXSB8fCBmb3JjZSkge1xyXG4gICAgICAgIHRoaXMuZHJhd0VkZ2Uobm9kZVswXSk7XHJcbiAgICAgICAgdGhpcy5kcmF3bltlZGdlSWRdID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBbeCwgeV0gPSBEcmF3LmRlc3RydWN0dXJlUG9zaXRpb24obm9kZVsxXSk7XHJcbiAgICAgIGNvbnN0IG5vZGVJZCA9IGAke3h9IHwgJHt5fWA7XHJcbiAgICAgIGlmICghdGhpcy5kcmF3bltub2RlSWRdIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgQ05TLkNFTExTSVpFLCBDTlMuQ0VMTFNJWkUpO1xyXG4gICAgICAgIHRoaXMuZHJhd25bbm9kZUlkXSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogRFJZXHJcbiAgZHJhd0VuZHMobm9kZXMpIHtcclxuICAgIGNvbnN0IHN0YXJ0QW5kRW5kID0gbm9kZXMubWFwKG5vZGUgPT4gbm9kZS5zcGxpdCgnLCAnKSk7XHJcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IENOUy5TT0xVVElPTkNPTE9SO1xyXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gNDtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IENOUy5TVEFSVENPTE9SO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3Qoc3RhcnRBbmRFbmRbMF1bMF0sIHN0YXJ0QW5kRW5kWzBdWzFdLCAoQ05TLkNFTExTSVpFICogMS41KSwgKENOUy5DRUxMU0laRSAqIDEuNSkpO1xyXG4gICAgdGhpcy5jdHguc3Ryb2tlUmVjdChzdGFydEFuZEVuZFswXVswXSAtIChDTlMuQ0VMTFNJWkUgLyA0KSwgc3RhcnRBbmRFbmRbMF1bMV0gLSAoQ05TLkNFTExTSVpFIC8gNCksIChDTlMuQ0VMTFNJWkUgKiAxLjUpLCAoQ05TLkNFTExTSVpFICogMS41KSk7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBDTlMuRU5EQ09MT1I7XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdChzdGFydEFuZEVuZFsxXVswXSwgc3RhcnRBbmRFbmRbMV1bMV0sIChDTlMuQ0VMTFNJWkUgKiAxLjUpLCAoQ05TLkNFTExTSVpFICogMS41KSk7XHJcbiAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHN0YXJ0QW5kRW5kWzFdWzBdIC0gKENOUy5DRUxMU0laRSAvIDQpLCBzdGFydEFuZEVuZFsxXVsxXSAtIChDTlMuQ0VMTFNJWkUgLyA0KSwgKENOUy5DRUxMU0laRSAqIDEuNSksIChDTlMuQ0VMTFNJWkUgKiAxLjUpKTtcclxuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRlc3RydWN0dXJlUG9zaXRpb24obm9kZVBvc2l0aW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIG5vZGVQb3NpdGlvbiA9PT0gJ3N0cmluZycgfHwgbm9kZVBvc2l0aW9uIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBub2RlUG9zaXRpb24uc3BsaXQoJywgJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW25vZGVQb3NpdGlvbi54LCBub2RlUG9zaXRpb24ueV07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmF3O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kcmF3LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFdJRFRIID0gMTAwODtcclxuY29uc3QgSEVJR0hUID0gNjI0O1xyXG5cclxuY29uc3QgQ0VMTFNJWkUgPSA4O1xyXG5jb25zdCBCTE9DS1dJRFRIID0gQ0VMTFNJWkUgKiAyO1xyXG5cclxuLy8gZWFjaCBub2RlIHdpbGwgaGF2ZSBhIGNvcnJlc3BvbmRpbmcgY2VsbCBpbiB0aGUgZ3JhcGgncyBjb2xsZWN0aW9uIGFycmF5XHJcbmNvbnN0IE5VTVJPV1MgPSBIRUlHSFQgLyBCTE9DS1dJRFRIO1xyXG5jb25zdCBOVU1DT0xTID0gV0lEVEggLyBCTE9DS1dJRFRIO1xyXG5cclxuLy8gdG8gb2JzZXJ2ZSBhIGNlbGwncyBzdXJyb3VuZGluZ3MsIHdlIHN0b3JlIGluZm9ybWF0aW9uIGFib3V0IGVhY2ggb2YgdGhlaXIgbmVpZ2hib3JzXHJcbmNvbnN0IERJUkVDVElPTlMgPSB7XHJcbiAgTk9SVEg6IDAsIC8vICAgMFxyXG4gIFNPVVRIOiAyLCAvLyAzICogMVxyXG4gIEVBU1Q6IDEsIC8vICAgIDJcclxuICBXRVNUOiAzLFxyXG59O1xyXG5cclxuLy8gc2V0SW50ZXJ2YWwoKSB0ZXJtaW5hdGVzIHdoZW4gZWFjaCBub2RlIG9mIE5VTVJPV1MgJiBOVU1DT0xTIGlzIHRyYXZlcnNlZFxyXG5jb25zdCBQUk9HUkVTUyA9ICgoV0lEVEggKiBIRUlHSFQpIC8gKEJMT0NLV0lEVEggKiogMikpIC0gMTtcclxuXHJcbi8vIFRPRE86IGNvbnN0IFBBVEhDT0xPUlMgd2lsbCBkcmF3IHRoZSBwYXRoIHRvIHRoZSB0YXJnZXQgbm9kZSB3aXRoIGNvbG9yIHByb2dyZXNzaW9uXHJcbmNvbnN0IFBSSU1TQ09MT1JTID0ge1xyXG4gIDAuMDA6IFwiI2Y1ZmZmOVwiLCAwLjA1OiAnI2U0ZmVlZicsIDAuMTA6ICcjZGJmN2U3JyxcclxuICAwLjE1OiAnI2M5ZmFkZScsIDAuMjA6ICcjYmNmN2Q2JywgMC4yNTogJyNiMmY2ZDAnLFxyXG4gIDAuMzA6ICcjYTlmY2NlJywgMC4zNTogJyM5OGY1YzEnLCAwLjQwOiAnIzhlZmZiZicsXHJcbiAgMC40NTogJyM4MmZjYjgnLCAwLjUwOiAnIzdmZmNiNycsIDAuNTU6ICcjNjZmY2E3JyxcclxuICAwLjYwOiAnIzU1ZmI5ZCcsIDAuNjU6ICcjNDlmZjk4JywgMC43MDogJyMzOWY2OGInLFxyXG4gIDAuNzU6ICcjMzhmYzhkJywgMC44MDogJyMzMGZiODgnLCAwLjg1OiAnIzI3ZmI4MycsXHJcbiAgMC45MDogJyMxY2ZjN2QnLCAwLjk1OiAnIzFjZmM3ZCcsIDEuMDA6ICcjMWNmYzdkJyxcclxufTtcclxuY29uc3QgVklTSVRDT0xPUiA9ICdyZ2JhKDI0OSwgNjMsIDQ0LCAwLjkyKSc7IC8vIE5PVEU6IG1pZ2h0IHdhbnQgdG8gcmVtb3ZlIG9wYWNpdHlcclxuY29uc3QgU09MVVRJT05DT0xPUiA9ICcjZmZlNjAwJztcclxuY29uc3QgU1RBUlRDT0xPUiA9ICcjNGQ5ODAzJztcclxuY29uc3QgRU5EQ09MT1IgPSAnIzg3MDc0MSc7XHJcblxyXG5leHBvcnQge1xyXG4gIFdJRFRILFxyXG4gIEhFSUdIVCxcclxuICBDRUxMU0laRSxcclxuICBCTE9DS1dJRFRILFxyXG4gIE5VTVJPV1MsXHJcbiAgTlVNQ09MUyxcclxuICBESVJFQ1RJT05TLFxyXG4gIFBST0dSRVNTLFxyXG4gIFBSSU1TQ09MT1JTLFxyXG4gIFZJU0lUQ09MT1IsXHJcbiAgU09MVVRJT05DT0xPUixcclxuICBTVEFSVENPTE9SLFxyXG4gIEVORENPTE9SLFxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb25zdGFudHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL3Njc3MvbWFpbi5zY3NzJztcclxuaW1wb3J0IEJyZWFkdGhGaXJzdFNlYXJjaCBmcm9tICcuL2Jmcyc7XHJcbmltcG9ydCBEZXB0aEZpcnN0U2VhcmNoIGZyb20gJy4vZGZzJztcclxuaW1wb3J0IERpamtzdHJhIGZyb20gJy4vZGlqa3N0cmEnO1xyXG5pbXBvcnQgTWF6ZUdlbmVyYXRvciBmcm9tICcuL2dlbmVyYXRvcic7XHJcbmltcG9ydCBEcmF3IGZyb20gJy4vZHJhdyc7XHJcbmltcG9ydCAqIGFzIENOUyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5jb25zdCBzZWFyY2hUeXBlcyA9IHtcclxuICBiZnM6IEJyZWFkdGhGaXJzdFNlYXJjaCxcclxuICBkZnM6IERlcHRoRmlyc3RTZWFyY2gsXHJcbiAgZGlqa3N0cmE6IERpamtzdHJhLFxyXG4gIC8vIGFzdGFyOiBBU3RhcixcclxufTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtbmF2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkb1NlYXJjaCwgZmFsc2UpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VuZXJhdGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdlbmVyYXRlTWF6ZSwgZmFsc2UpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFuZG9taXplJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByYW5kb21pemVTdGFydEFuZEVuZCwgZmFsc2UpO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG5jYW52YXMud2lkdGggPSBDTlMuV0lEVEg7XHJcbmNhbnZhcy5oZWlnaHQgPSBDTlMuSEVJR0hUO1xyXG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuY29uc3QgZHJhdyA9IG5ldyBEcmF3KGNhbnZhcywgY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xyXG5cclxuLy8gYmVnaW4gZHJhd2luZyBtYXplIG9uIHBhZ2UgbG9hZFxyXG4vLyBGSVhNRTogd2h5IGNhbGxiYWNrP1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4gZ2VuZXJhdGVNYXplKCksIGZhbHNlKTtcclxuXHJcbi8vIFRPRE86IG1pZ2h0IGJlIGFibGUgdG8gc2ltcGxpZnkgYmVjYXVzZSBpJ20gcGFzc2luZyBldmVudCB0YXJnZXQgc28gaSBkb250IG5lZWRcclxuLy8gdG8gY2hlY2sgY3VycmVudCBjbGFzcy4gYWxzbyByZXBlYXQgdGhpcyBmb3IgI3NlYXJjaCBidG4gb3ZlcmxheS5cclxuY29uc3QgdG9nZ2xlQWN0aXZlID0gKGV2ZW50KSA9PiB7XHJcbiAgY29uc3QganVtcEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgaWYgKGp1bXBFbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKSA9PT0gJ2p1bXAnKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanVtcCcpLmZvckVhY2goKGFuY2hvcikgPT4ge1xyXG4gICAgICBhbmNob3IuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmNvbnN0IGNsYXNzTmFtZUp1bXAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqdW1wJyk7XHJcbkFycmF5LmZyb20oY2xhc3NOYW1lSnVtcCwgYyA9PiBjLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQWN0aXZlLCBmYWxzZSkpO1xyXG5cclxubGV0IGdyYXBoO1xyXG5sZXQgbWluU3BhblRyZWU7XHJcbmxldCBpbnRlcnZhbElkO1xyXG5cclxubGV0IHNlYXJjaEFsZ29yaXRobSA9IHsgc2VhcmNoaW5nOiAwIH07XHJcbmxldCBzdGFydDtcclxubGV0IGVuZDtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTWF6ZSgpIHtcclxuICAvLyBmbHVzaCB0aGUgY2FudmFzXHJcbiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAvLyBpZiB0aGlzIGlzbid0IHRoZSBmaXJzdCB0aW1lIHJ1bm5pbmcgZ2VuZXJhdGVNYXplKCksIGNhbmNlbCB0aGUgbGFzdCBhdHRlbXB0XHJcbiAgaWYgKGludGVydmFsSWQgIT09IHVuZGVmaW5lZCkgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuXHJcbiAgLy8gcnVuIHJhbmRvbWl6ZWQgcHJpbSdzIGFsZ29yaXRobSB0byBnZW5lcmF0ZSBhIG1hemVcclxuICBjb25zdCBkb1ByaW1zID0gZnVuY3Rpb24gZG9QcmltcygpIHtcclxuICAgIGNvbnN0IG1hemUgPSBuZXcgTWF6ZUdlbmVyYXRvcihjYW52YXMpO1xyXG4gICAgY29uc3QgZ3JpZCA9IG1hemUuZ3JpZCgpO1xyXG4gICAgY29uc3QgdGltZXJJZCA9IG1hemUuYnVpbGQoKTtcclxuICAgIGdyYXBoID0gbWF6ZTtcclxuICAgIG1pblNwYW5UcmVlID0gbWF6ZS50cmVlO1xyXG4gICAgcmV0dXJuIHRpbWVySWQ7XHJcbiAgfTtcclxuICBpbnRlcnZhbElkID0gZG9QcmltcygpO1xyXG5cclxuICAvLyByZXNldCBhbGwgc2VhcmNoIHN0YXRlcyBhbmQgZmx1c2ggc3RhcnQgYW5kIGVuZCBwb2ludHMgKHVzZXIgY2FuIHJlcGVhdCBzZWFyY2hlcylcclxuICBzZWFyY2hBbGdvcml0aG0uc2VhcmNoaW5nID0gMDtcclxuICBbc3RhcnQsIGVuZF0gPSBbbnVsbCwgbnVsbF07XHJcbn1cclxuXHJcbi8vIHdoZW4gYHJhbmRvbWl6ZWAgaXMgbm90IGNhbGxlZCwgdXNlIHRvcC1sZWZ0ICYgYm90dG9tLXJpZ2h0IGNvcm5lcnMgYXMgc3RhcnQgJiBlbmQgcG9pbnRzXHJcbmZ1bmN0aW9uIGRlZmF1bHRTdGFydEFuZEVuZCgpIHtcclxuICBzdGFydCA9ICcwLCAwJztcclxuICBlbmQgPSBgJHtDTlMuV0lEVEggLSBDTlMuQkxPQ0tXSURUSH0sICR7Q05TLkhFSUdIVCAtIENOUy5CTE9DS1dJRFRIfWA7XHJcbiAgZHJhdy5kcmF3RW5kcyhbc3RhcnQsIGVuZF0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByYW5kb21pemVTdGFydEFuZEVuZCgpIHtcclxuICAvLyBwcm9oaWJpdCBjaGFuZ2luZyBzdGFydCBhbmQgZW5kIGNvb3JkaW5hdGVzIHdoaWxlIGEgc2VhcmNoIGlzIGluIHByb2dyZXNzXHJcbiAgaWYgKHNlYXJjaEFsZ29yaXRobS5zZWFyY2hpbmcpIHtcclxuICAgIHJldHVybiBjb25zb2xlLmxvZygnd2FpdCBmb3IgYSBzZWFyY2ggdG8gdGVybWluYXRlIGJlZm9yZSBjaG9vc2luZyBuZXcgZW5kcG9pbnRzJyk7XHJcbiAgfVxyXG5cclxuICAvLyBwaWNrcyByYW5kb20gc3RhcnQgJiBlbmQgbm9kZXMsIHdpdGggYXJiaXRyYXJ5IGJpYXMgZm9yIGVhY2ggY2hvaWNlIHZpYSBgc2xpY2UoLi4pYFxyXG4gIGNvbnN0IHJhbmRvbU5vZGVzID0gZnVuY3Rpb24gcmFuZG9tTm9kZXMoKSB7XHJcbiAgICBjb25zdCBub2RlcyA9IE9iamVjdC5rZXlzKG1pblNwYW5UcmVlKTtcclxuICAgIGNvbnN0IHBpY2sgPSBuID0+IG5bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbi5sZW5ndGgpXTtcclxuXHJcbiAgICBsZXQgY2hvaWNlT25lO1xyXG4gICAgbGV0IGNob2ljZVR3bztcclxuICAgIHdoaWxlIChjaG9pY2VPbmUgPT09IGNob2ljZVR3byB8fCBjaG9pY2VPbmUgPT09ICdwcm9ncmVzcycgfHwgY2hvaWNlVHdvID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgIGNob2ljZU9uZSA9IHBpY2sobm9kZXMuc2xpY2UoMCwgNTApKTtcclxuICAgICAgY2hvaWNlVHdvID0gcGljayhub2Rlcy5zbGljZSgxMjUwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2Nob2ljZU9uZSwgY2hvaWNlVHdvXTtcclxuICB9O1xyXG5cclxuICAvLyBvbmx5IGRyYXcgaWYgdGhlIG1pbmltdW0gc3Bhbm5pbmcgdHJlZSBpcyBjb21wbGV0ZVxyXG4gIGlmIChtaW5TcGFuVHJlZS5wcm9ncmVzcyA9PT0gQ05TLlBST0dSRVNTKSB7XHJcbiAgICBbc3RhcnQsIGVuZF0gPSByYW5kb21Ob2RlcygpO1xyXG4gICAgY3R4LnB1dEltYWdlRGF0YShncmFwaC5pbWFnZSwgMCwgMCk7XHJcbiAgICBkcmF3LmRyYXdFbmRzKFtzdGFydCwgZW5kXSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhIHNlYXJjaCdzIHJ1bm5pbmcgc3RhdGUgaXMgc3RvcmVkIGluIGFuIGludGVydmFsSWQ6IGNsZWFyIGFueSBhdmFpbGFibGUgSURcclxuLy8gYSBub2RlJ3MgYHZpc2l0ZWRgIHN0YXRlIGlzIHN0b3JlZCBvbiB0aGUgbm9kZSBpdHNlbGY6IGZvcmNlIGl0IHRvIGZhbHNlXHJcbmZ1bmN0aW9uIHJlc2V0U2VhcmNoKCkge1xyXG4gIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgT2JqZWN0LmtleXMobWluU3BhblRyZWUpLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XHJcbiAgICBpZiAobWluU3BhblRyZWVbcG9zaXRpb25dLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG1pblNwYW5UcmVlW3Bvc2l0aW9uXS5mb3JFYWNoKG4gPT4gblsxXS52aXNpdGVkID0gZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb1NlYXJjaChldmVudCkge1xyXG4gIGNvbnN0IGlkID0gZXZlbnQudGFyZ2V0LmlkO1xyXG4gIGlmIChpZCA9PT0gJ3NlYXJjaC1uYXYnKSByZXR1cm47XHJcblxyXG4gIC8vIHRoZSBncmFwaCdzIGNvbXBsZXRlIGltYWdlIGV4aXN0cyB3aGVuIHRoZSBtYXplIGhhcyBmdWxseSBnZW5lcmF0ZWRcclxuICBpZiAoZ3JhcGguaW1hZ2UpIHtcclxuICAgIHJlc2V0U2VhcmNoKCk7XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGdyYXBoLmltYWdlLCAwLCAwKTtcclxuXHJcbiAgICAvLyBUT0RPOiBoZWxwZXIgZnVuY3Rpb24/XHJcbiAgICBpZiAoc3RhcnQgPT09IG51bGwgfHwgZW5kID09PSBudWxsKSB7XHJcbiAgICAgIGRlZmF1bHRTdGFydEFuZEVuZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZHJhdy5kcmF3RW5kcyhbc3RhcnQsIGVuZF0pOyAvLyByZWRyYXcgc3RhcnQgJiBlbmQgc28gdGhleSBvdmVybGFwIG9uIHRoZSBjYW52YXNcclxuICAgIH1cclxuXHJcbiAgICBzZWFyY2hBbGdvcml0aG0gPSBuZXcgc2VhcmNoVHlwZXNbaWRdKFxyXG4gICAgICBjYW52YXMsXHJcbiAgICAgIG1pblNwYW5UcmVlLFxyXG4gICAgICBzdGFydCxcclxuICAgICAgZW5kLFxyXG4gICAgKTtcclxuICAgIGludGVydmFsSWQgPSBzZWFyY2hBbGdvcml0aG0uc2VhcmNoKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwiY2FuJ3Qgc2VhcmNoIGJlZm9yZSBidWlsZGluZyBhIG1hemVcIik7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3NzL21haW4uc2Nzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRHJhdyBmcm9tICcuL2RyYXcnO1xyXG5cclxuY2xhc3MgQnJlYWR0aEZpcnN0U2VhcmNoIHtcclxuICBjb25zdHJ1Y3RvcihjYW52YXMsIGdyYXBoLCBzb3VyY2UsIHRhcmdldCkge1xyXG4gICAgdGhpcy5kcmF3ID0gbmV3IERyYXcoY2FudmFzLCBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSk7XHJcbiAgICB0aGlzLmdyYXBoID0gZ3JhcGg7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG5cclxuICAgIC8vIGxpbWl0ZWQgc3Bhbm5pbmcgdHJlZSBvYmplY3QgdXNlZCBzb2xlbHkgZm9yIHBhdGggaW5mb3JtYXRpb25cclxuICAgIHRoaXMubWV0YSA9IHt9O1xyXG5cclxuICAgIC8vIDE6IHBlcmZvcm1pbmcgc2VhcmNoLCAwOiB3YWl0aW5nIHRvIHNlYXJjaFxyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAwO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAxO1xyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoO1xyXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldDtcclxuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5xdWV1ZTtcclxuICAgIGNvbnN0IG1ldGEgPSB0aGlzLm1ldGE7XHJcblxyXG4gICAgcXVldWUucHVzaChzb3VyY2UpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudE5vZGUgPSBxdWV1ZS5zaGlmdCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobWV0YSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLmRyYXcuZHJhd1BhdGgoZ3JhcGhbY3VycmVudE5vZGVdLCAndmlzaXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdyYWIgZWFjaCBuZWlnaGJvciBub2RlIG9mIHRoZSBjdXJyZW50IGNlbGwgYW5kIHN0cmluZ2lmeSBhcyBhIGBrZXlgXHJcbiAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdIHN0b3JlcyB0aGUgbmVpZ2hib3JzIGluIHRoZSBhZGphY2VuY3kgbGlzdHMsXHJcbiAgICAgICAgLy8gcmVwcmVzZW50ZWQgYnkgW1tub3J0aEVkZ2UsIG5vZGVdLCBbZWFzdEVkZ2UsIG5vZGVdIC4uLl1cclxuICAgICAgICAvLyBncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0gPT4gc3RvcmVzIHRoZSBlZGdlIHRvIHRoZSBuZWlnaGJvciBub2RlXHJcbiAgICAgICAgLy8gKGFuZCB0aGlzIGVkZ2Ugc3RvcmVzIHJlZmVyZW5jZXMgdG8gYG5vZGVGcm9tYCBhbmQgYG5vZGVUb2ApXHJcbiAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdW2ldWzBdID0+IHN0b3JlcyB0aGUgbmVpZ2hib3Igbm9kZVxyXG4gICAgICAgIGNvbnN0IG5laWdoYm9ycyA9IGdyYXBoW2N1cnJlbnROb2RlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV1bMV07XHJcbiAgICAgICAgICBjb25zdCBrZXkgPSBgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWA7XHJcblxyXG4gICAgICAgICAgLy8gaWYgb25lIG9mIHRoZSBuZWlnaGJvcnMgaXMgdGhlIHRhcmdldCwgYnJlYWsgJiBkcmF3IHRoZSBzb2x1dGlvbiBwYXRoXHJcbiAgICAgICAgICBpZiAoa2V5ID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCFuZWlnaGJvci52aXNpdGVkKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goYCR7bmVpZ2hib3IueH0sICR7bmVpZ2hib3IueX1gKTtcclxuICAgICAgICAgICAgbmVpZ2hib3IudmlzaXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG1ldGFba2V5XSA9IFtbZ3JhcGhbY3VycmVudE5vZGVdW2ldWzBdLCBjdXJyZW50Tm9kZV1dO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBlbHNlIGlmIHRhcmdldCBpcyBub3QgaW4gdGhlIGdyYXBoIDwtIE1TVHMgY29ubmVjdCBhbGwgdmVydGljZXMuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdubyBzb2x1dGlvbiBpbiB0aGlzIGRpcmVjdGlvbicpO1xyXG4gICAgICB9XHJcbiAgICB9LCA1KTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIGEgbmV3IHNlYXJjaCB3aGlsZSBhbm90aGVyIHNlYXJjaCBpcyBydW5uaW5nOlxyXG4gICAgLy8gcmV0dXJuIGFjY2VzcyB0byBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBvbiB0aGF0IElEXHJcbiAgICByZXR1cm4gdGltZXI7XHJcbiAgfVxyXG5cclxuICBwYXRoKCkge1xyXG4gICAgbGV0IHByZWRlY2Vzc29yID0gdGhpcy50YXJnZXQ7XHJcbiAgICB3aGlsZSAocHJlZGVjZXNzb3IgIT09IHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHRoaXMuZHJhdy5kcmF3UGF0aCh0aGlzLm1ldGFbcHJlZGVjZXNzb3JdLCAnc29sdXRpb24nLCB0cnVlKTtcclxuICAgICAgY29uc3QgcHJldmlvdXNOb2RlID0gdGhpcy5tZXRhW3ByZWRlY2Vzc29yXVswXTtcclxuICAgICAgcHJlZGVjZXNzb3IgPSBwcmV2aW91c05vZGVbMV07XHJcbiAgICB9XHJcbiAgICAvLyByZWRyYXcgc3RhcnQgJiBlbmQgb24gdGhlIHNvbHV0aW9uIGJhY2t0cmFjZSB0byBvdmVybGFwIHRoZSBwYXRoIGZvciB2aXNpYmlsaXR5XHJcbiAgICB0aGlzLmRyYXcuZHJhd0VuZHMoW3RoaXMuc291cmNlLCB0aGlzLnRhcmdldF0pO1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAwO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWR0aEZpcnN0U2VhcmNoO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iZnMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERyYXcgZnJvbSAnLi9kcmF3JztcclxuXHJcbmNsYXNzIERlcHRoRmlyc3RTZWFyY2gge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JhcGgsIHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICB0aGlzLmRyYXcgPSBuZXcgRHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnN0YWNrID0gW107XHJcblxyXG4gICAgLy8gbGltaXRlZCBzcGFubmluZyB0cmVlIG9iamVjdCB1c2VkIHNvbGVseSBmb3IgcGF0aCBpbmZvcm1hdGlvblxyXG4gICAgdGhpcy5tZXRhID0ge307XHJcblxyXG4gICAgLy8gMTogcGVyZm9ybWluZyBzZWFyY2gsIDA6IHdhaXRpbmcgdG8gc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDA7XHJcbiAgfVxyXG5cclxuICBzZWFyY2goKSB7XHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDE7XHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGg7XHJcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xyXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzLnN0YWNrO1xyXG4gICAgY29uc3QgbWV0YSA9IHRoaXMubWV0YTtcclxuXHJcbiAgICBzdGFjay5wdXNoKHNvdXJjZSk7XHJcblxyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50Tm9kZSA9IHN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgICAvLyBkcmF3IHRoZSBjdXJyZW50IG5vZGUgYmVpbmcgdmlzaXRlZCBhbmQgdGhlIHBhc3NhZ2UgdGhhdCB3YXMgdXNlZCB0byBnZXQgdGhlcmVcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobWV0YSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLmRyYXcuZHJhd1BhdGgoW1ttZXRhW2N1cnJlbnROb2RlXVswXVswXSwgY3VycmVudE5vZGVdXSwgJ3Zpc2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBncmFiIGVhY2ggbmVpZ2hib3Igbm9kZSBvZiB0aGUgY3VycmVudCBjZWxsIGFuZCBzdHJpbmdpZnkgYXMgYSBga2V5YFxyXG4gICAgICAgIC8vIGdyYXBoW2N1cnJlbnROb2RlXSBzdG9yZXMgdGhlIG5laWdoYm9ycyBpbiB0aGUgYWRqYWNlbmN5IGxpc3RzLFxyXG4gICAgICAgIC8vIHJlcHJlc2VudGVkIGJ5IFtbbm9ydGhFZGdlLCBub2RlXSwgW2Vhc3RFZGdlLCBub2RlXSAuLi5dXHJcbiAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdW2ldWzBdID0+IHN0b3JlcyB0aGUgZWRnZSB0byB0aGUgbmVpZ2hib3Igbm9kZVxyXG4gICAgICAgIC8vIChhbmQgdGhpcyBlZGdlIHN0b3JlcyByZWZlcmVuY2VzIHRvIGBub2RlRnJvbWAgYW5kIGBub2RlVG9gKVxyXG4gICAgICAgIC8vIGdyYXBoW2N1cnJlbnROb2RlXVtpXVswXSA9PiBzdG9yZXMgdGhlIG5laWdoYm9yIG5vZGVcclxuICAgICAgICBjb25zdCBuZWlnaGJvcnMgPSBncmFwaFtjdXJyZW50Tm9kZV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG5laWdoYm9yID0gbmVpZ2hib3JzW2ldWzFdO1xyXG4gICAgICAgICAgY29uc3Qga2V5ID0gYCR7bmVpZ2hib3IueH0sICR7bmVpZ2hib3IueX1gO1xyXG5cclxuICAgICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbmVpZ2hib3JzIGlzIHRoZSB0YXJnZXQsIGJyZWFrICYgZHJhdyB0aGUgcGF0aFxyXG4gICAgICAgICAgaWYgKGtleSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhdy5kcmF3Tm9kZShrZXkpO1xyXG4gICAgICAgICAgICBtZXRhW2tleV0gPSBbW2dyYXBoW2N1cnJlbnROb2RlXVtpXVswXSwgY3VycmVudE5vZGVdXTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGgoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIW5laWdoYm9yLnZpc2l0ZWQpIHtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWApO1xyXG4gICAgICAgICAgICBuZWlnaGJvci52aXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGVsc2UgaWYgdGFyZ2V0IGlzIG5vdCBpbiB0aGUgZ3JhcGggPC0gTVNUcyBjb25uZWN0IGFsbCB2ZXJ0aWNlcy5cclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ25vIHNvbHV0aW9uIGluIHRoaXMgZGlyZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIG5ldyBzZWFyY2ggdHlwZSB3aGlsZSBhIHNlYXJjaCBpcyBydW5uaW5nOiByZXR1cm4gYWNjZXNzIHRvXHJcbiAgICAvLyBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBpZiBjYWxsaW5nIGdlbmVyYXRlTWF6ZSgpIGR1cmluZyBhIHNlYXJjaFxyXG4gICAgcmV0dXJuIHRpbWVyO1xyXG4gIH1cclxuXHJcbiAgcGF0aCgpIHtcclxuICAgIGxldCBwcmVkZWNlc3NvciA9IHRoaXMudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHByZWRlY2Vzc29yICE9PSB0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRyYXcuZHJhd1BhdGgodGhpcy5tZXRhW3ByZWRlY2Vzc29yXSwgJ3NvbHV0aW9uJywgdHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzTm9kZSA9IHRoaXMubWV0YVtwcmVkZWNlc3Nvcl1bMF07XHJcbiAgICAgIHByZWRlY2Vzc29yID0gcHJldmlvdXNOb2RlWzFdO1xyXG4gICAgfVxyXG4gICAgLy8gcmVkcmF3IHN0YXJ0ICYgZW5kIG9uIHRoZSBzb2x1dGlvbiBiYWNrdHJhY2UgdG8gb3ZlcmxhcCB0aGUgcGF0aCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgdGhpcy5kcmF3LmRyYXdFbmRzKFt0aGlzLnNvdXJjZSwgdGhpcy50YXJnZXRdKTtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gMDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlcHRoRmlyc3RTZWFyY2g7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Rmcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRHJhdyBmcm9tICcuL2RyYXcnO1xyXG5cclxuLy8gVW5pZm9ybS1jb3N0IHNlYXJjaCAoVUNTKSAtIGEgdmFyaWFudCBvZiBEaWprc3RyYSdzIGFsZ29yaXRobSB0aGF0IHRlcm1pbmF0ZXNcclxuLy8gYXMgc29vbiBhcyB0aGUgdGFyZ2V0IG5vZGUgaXMgZGlzY292ZXJlZC4gSXQgZG9lcyBub3QgbGF6aWx5IGZpbGwgdGhlXHJcbi8vIHByaW9yaXR5IHF1ZXVlIHdpdGggaW5maW5pdGUtY29zdCBub2RlcyBhbmQgaXQgZG9lcyBub3QgZXhwbG9yZS9zdG9yZVxyXG4vLyBhbGwgbm9kZXMgZm9yIHJldXNlLiBJbiB0aGUgbW9yZSB0eXBpY2FsIERpamtzdHJhJ3MgYWxnb3JpdGhtLCB3ZVxyXG4vLyBleHBlY3QgdG8gYWxzbyBpbXBsZW1lbnQgYSBgZGVjcmVhc2Uta2V5YCBvcGVyYXRpb24gZm9yIHRoZSBwcmlvcml0eSBxdWV1ZS5cclxuXHJcbi8vIEdldHRpbmcgYSBVQ1MgZnJvbSBEaWprc3RyYSdzIGFsZ29yaXRobSBpcyB1c2VmdWwgaGVyZSB0byBjb25zZXJ2ZVxyXG4vLyBzcGFjZSBpbiB0aGUgYFByaW9yaXR5UXVldWVgIG9uIGluaXRpYWxpemF0aW9uLlxyXG5cclxuLy8gaW4gYSBQcmlvcml0eSBRdWV1ZSwgZWxlbWVudHMgKG5vZGVzKSB3aXRoIGhpZ2ggcHJpb3JpdHkgKGxvd2VyIGNvc3QpXHJcbi8vIGFyZSBzZXJ2ZWQgYmVmb3JlIGVsZW1lbnRzIHdpdGggbG93ZXIgcHJpb3JpdHkgKGhpZ2hlciBjb3N0KS5cclxuLy8gdGhpcyBjb2RlIHVzZXMgYSBiaW5hcnkgaGVhcC1iYXNlZCBwcmlvcml0eSBxdWV1ZSBwYWNrYWdlICdqcy1wcmlvcml0eS1xdWV1ZScuXHJcbi8vIEdvb2dsZSBhbHNvIGluY2x1ZGVzIGEgaGVhcC1iYXNlZCBQUSBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgQ2xvc3VyZSBMaWJyYXJ5XHJcbi8vIChodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtbGlicmFyeS90cmVlL21hc3Rlci9jbG9zdXJlL2dvb2cvc3RydWN0cylcclxuY29uc3QgUHJpb3JpdHlRdWV1ZSA9IHJlcXVpcmUoJ2pzLXByaW9yaXR5LXF1ZXVlJyk7XHJcblxyXG5jbGFzcyBEaWprc3RyYSB7XHJcbiAgY29uc3RydWN0b3IoY2FudmFzLCBncmFwaCwgc291cmNlLCB0YXJnZXQpIHtcclxuICAgIHRoaXMuZHJhdyA9IG5ldyBEcmF3KGNhbnZhcywgY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xyXG4gICAgdGhpcy5ncmFwaCA9IGdyYXBoO1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHJcbiAgICAvLyAxOiBwZXJmb3JtaW5nIHNlYXJjaCwgMDogd2FpdGluZyB0byBzZWFyY2hcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gMDtcclxuXHJcbiAgICAvLyB0aGUgYHByZXZpb3VzYCBvYmplY3Qgc3RvcmVzIGEgcmVmZXJlbmNlIHRvIG9uZSBwYXJlbnQgbm9kZSBmb3IgZWFjaCBub2RlXHJcbiAgICAvLyBvbmx5IGtlZXAgdGhlIHBhcmVudCBub2RlIHRoYXQgY29udHJpYnV0ZXMgdG8gdGhlIGNoZWFwZXN0IGNvc3QgKHNob3J0ZXN0IGRpc3RhbmNlKVxyXG4gICAgdGhpcy5wcmV2aW91cyA9IHt9O1xyXG4gICAgdGhpcy5kaXN0YW5jZXMgPSB7fTtcclxuXHJcbiAgICAvLyB1c2UgYSBwcmlvcml0eSBxdWV1ZSBpbiB3aGljaCB2ZXJ0aWNlcyBhcmUgc29ydGVkIGJ5IHRoZWlyIGluY3JlYXNpbmcgY29zdFxyXG4gICAgdGhpcy5wcmlvcml0eVF1ZXVlID0gbmV3IFByaW9yaXR5UXVldWUoe1xyXG4gICAgICBjb21wYXJhdG9yOiAoZWRnZU9uZSwgZWRnZVR3bykgPT4gZWRnZU9uZS53ZWlnaHQgLSBlZGdlVHdvLndlaWdodCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAxO1xyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoO1xyXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldDtcclxuICAgIGNvbnN0IHByaW9yaXR5UXVldWUgPSB0aGlzLnByaW9yaXR5UXVldWU7XHJcbiAgICBjb25zdCBkaXN0YW5jZXMgPSB0aGlzLmRpc3RhbmNlcztcclxuXHJcbiAgICAvLyBoZWxwZXIgbWV0aG9kXHJcbiAgICAvLyBmb3IgZWFjaCB2ZXJ0ZXggdiBpbiBncmFwaCwgZGlzdFt2XSBpcyBpbmZpbml0eSBhbmQgcHJldlt2XSBpcyBudWxsXHJcbiAgICAvLyBncmFwaC5mb3JFYWNoKChub2RlRGF0YSkgPT4ge1xyXG4gICAgLy8gICBjb25zdCBub2RlID0gbm9kZURhdGFbMF0ubm9kZUZyb207XHJcbiAgICAvLyAgIGRpc3RhbmNlc1tub2RlXSA9IEluZmluaXR5O1xyXG4gICAgLy8gICBwcmlvcml0eVF1ZXVlLnF1ZXVlKG5vZGUpO1xyXG4gICAgLy8gfSk7XHJcblxyXG4gICAgLy8gZXhwbGFpbiB0aGVzZSAyXHJcbiAgICBkaXN0YW5jZXNbc291cmNlXSA9IDA7XHJcbiAgICBwcmV2W3NvdXJjZV0gPSBudWxsO1xyXG4gICAgcHJpb3JpdHlRdWV1ZS5xdWV1ZShzb3VyY2UpO1xyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChwcmlvcml0eVF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnROb2RlID0gcHJpb3JpdHlRdWV1ZS5kZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5laWdoYm9ycyA9IGdyYXBoW2N1cnJlbnROb2RlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdW2ldWzBdID0+IHN0b3JlcyB0aGUgZWRnZSB0byB0aGUgbmVpZ2hib3Igbm9kZVxyXG4gICAgICAgICAgLy8gKGFuZCB0aGlzIGVkZ2Ugc3RvcmVzIHJlZmVyZW5jZXMgdG8gYG5vZGVGcm9tYCBhbmQgYG5vZGVUb2ApXHJcbiAgICAgICAgICAvLyBncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0gPT4gc3RvcmVzIHRoZSBuZWlnaGJvciBub2RlXHJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvckVkZ2UgPSBuZWlnaGJvcnNbaV1bMF07XHJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXVsxXTtcclxuXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobmVpZ2hib3IpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobmVpZ2hib3JFZGdlKTtcclxuICAgICAgICAgIGNvbnN0IGtleSA9IGAke25laWdoYm9yLnh9LCAke25laWdoYm9yLnl9YDtcclxuXHJcbiAgICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG5laWdoYm9ycyBpcyB0aGUgdGFyZ2V0LCBicmVhayAmIGRyYXcgdGhlIHBhdGhcclxuICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc29sdXRpb24gZGlzY292ZXJlZCcpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGEgdmlzaXRlZCBub2RlIHdpbGwgbmV2ZXIgYmUgY2hlY2tlZCBhZ2FpblxyXG4gICAgICAgICAgLy8gVE9ETzogbWlnaHQgd2FudCB0byBkbyB0aGlzIHdoZW4gc2V0dGluZyBjdXJyZW50Tm9kZVxyXG4gICAgICAgICAgLy8gaWYgKG5laWdoYm9yLnZpc2l0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAvLyBjb25zaWRlciBldmVyeSBuZWlnaGJvciBhbmQgY2FsY3VsYXRlIHBvdGVudGlhbCBkaXN0YW5jZXM6XHJcbiAgICAgICAgICAvLyBmb3IgZWFjaCwgc3RvcmUgdGhlIGRpc3RhbmNlIHRvIHRoZSBjdXJyZW50Tm9kZVxyXG4gICAgICAgICAgLy8gKyB0aGUgZWRnZSB3ZWlnaHQgdG8gdGhlIGN1cnJlbnQgbmVpZ2hib3JcclxuICAgICAgICAgIC8vIEV1Y2xpZGVhbiBkaXN0YW5jZT9cclxuICAgICAgICAgIGNvbnN0IGRpc3RhbmNlVG9OZWlnaGJvck5vZGUgPSBkaXN0YW5jZXNbY3VycmVudE5vZGVdICsgbmVpZ2hib3JFZGdlLndlaWdodDtcclxuICAgICAgICAgIGlmIChkaXN0YW5jZXNbbmVpZ2hib3JdIDwgZGlzdGFuY2VUb05laWdoYm9yTm9kZSkge1xyXG4gICAgICAgICAgICBkaXN0YW5jZXNbbmVpZ2hib3JdID0gZGlzdGFuY2VUb05laWdoYm9yTm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoZSB2aXNpdGVkIHN0YXRlIGlzIHN0b3JlZCBvbiB0aGUgbm9kZSBpdHNlbGYgZm9yIHNpbXBsaWNpdHlcclxuICAgICAgICAvLyBpbiBhbGwgbXkgaW1wbGVtZW50YXRpb25zLlxyXG4gICAgICAgIC8vIHNldCB2aXNpdGVkIHN0YXRlIVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGVsc2UgaWYgdGFyZ2V0IGlzIG5vdCBpbiB0aGUgZ3JhcGggPC0gTVNUcyBjb25uZWN0IGFsbCB2ZXJ0aWNlcy5cclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ25vIHNvbHV0aW9uIGluIHRoaXMgZGlyZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIG5ldyBzZWFyY2ggdHlwZSB3aGlsZSBhIHNlYXJjaCBpcyBydW5uaW5nOiByZXR1cm4gYWNjZXNzIHRvXHJcbiAgICAvLyBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBpZiBjYWxsaW5nIGdlbmVyYXRlTWF6ZSgpIGR1cmluZyBhIHNlYXJjaFxyXG4gICAgcmV0dXJuIHRpbWVyO1xyXG4gIH1cclxuXHJcbiAgc2hvcnRlc3RQYXRoKCkge1xyXG4gICAgbGV0IHByZWRlY2Vzc29yID0gdGhpcy50YXJnZXQ7XHJcbiAgICB3aGlsZSAocHJlZGVjZXNzb3IgIT09IHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHRoaXMuZHJhdy5kcmF3UGF0aCh0aGlzLm1ldGFbcHJlZGVjZXNzb3JdLCAnc29sdXRpb24nLCB0cnVlKTtcclxuICAgICAgcHJlZGVjZXNzb3IgPSB0aGlzLnByZXZpb3VzW3ByZWRlY2Vzc29yXTtcclxuICAgIH1cclxuICAgIC8vIHJlZHJhdyBzdGFydCAmIGVuZCBvbiB0aGUgc29sdXRpb24gYmFja3RyYWNlIHRvIG92ZXJsYXAgdGhlIHBhdGggZm9yIHZpc2liaWxpdHlcclxuICAgIHRoaXMuZHJhdy5kcmF3RW5kcyhbdGhpcy5zb3VyY2UsIHRoaXMudGFyZ2V0XSk7XHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEaWprc3RyYTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZGlqa3N0cmEuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuUHJpb3JpdHlRdWV1ZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBBYnN0cmFjdFByaW9yaXR5UXVldWUsIEFycmF5U3RyYXRlZ3ksIEJIZWFwU3RyYXRlZ3ksIEJpbmFyeUhlYXBTdHJhdGVneSwgUHJpb3JpdHlRdWV1ZSxcbiAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbkFic3RyYWN0UHJpb3JpdHlRdWV1ZSA9IF9kZXJlcV8oJy4vUHJpb3JpdHlRdWV1ZS9BYnN0cmFjdFByaW9yaXR5UXVldWUnKTtcblxuQXJyYXlTdHJhdGVneSA9IF9kZXJlcV8oJy4vUHJpb3JpdHlRdWV1ZS9BcnJheVN0cmF0ZWd5Jyk7XG5cbkJpbmFyeUhlYXBTdHJhdGVneSA9IF9kZXJlcV8oJy4vUHJpb3JpdHlRdWV1ZS9CaW5hcnlIZWFwU3RyYXRlZ3knKTtcblxuQkhlYXBTdHJhdGVneSA9IF9kZXJlcV8oJy4vUHJpb3JpdHlRdWV1ZS9CSGVhcFN0cmF0ZWd5Jyk7XG5cblByaW9yaXR5UXVldWUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICBleHRlbmQoUHJpb3JpdHlRdWV1ZSwgc3VwZXJDbGFzcyk7XG5cbiAgZnVuY3Rpb24gUHJpb3JpdHlRdWV1ZShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICBvcHRpb25zLnN0cmF0ZWd5IHx8IChvcHRpb25zLnN0cmF0ZWd5ID0gQmluYXJ5SGVhcFN0cmF0ZWd5KTtcbiAgICBvcHRpb25zLmNvbXBhcmF0b3IgfHwgKG9wdGlvbnMuY29tcGFyYXRvciA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiAoYSB8fCAwKSAtIChiIHx8IDApO1xuICAgIH0pO1xuICAgIFByaW9yaXR5UXVldWUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gUHJpb3JpdHlRdWV1ZTtcblxufSkoQWJzdHJhY3RQcmlvcml0eVF1ZXVlKTtcblxuUHJpb3JpdHlRdWV1ZS5BcnJheVN0cmF0ZWd5ID0gQXJyYXlTdHJhdGVneTtcblxuUHJpb3JpdHlRdWV1ZS5CaW5hcnlIZWFwU3RyYXRlZ3kgPSBCaW5hcnlIZWFwU3RyYXRlZ3k7XG5cblByaW9yaXR5UXVldWUuQkhlYXBTdHJhdGVneSA9IEJIZWFwU3RyYXRlZ3k7XG5cbm1vZHVsZS5leHBvcnRzID0gUHJpb3JpdHlRdWV1ZTtcblxuXG59LHtcIi4vUHJpb3JpdHlRdWV1ZS9BYnN0cmFjdFByaW9yaXR5UXVldWVcIjoyLFwiLi9Qcmlvcml0eVF1ZXVlL0FycmF5U3RyYXRlZ3lcIjozLFwiLi9Qcmlvcml0eVF1ZXVlL0JIZWFwU3RyYXRlZ3lcIjo0LFwiLi9Qcmlvcml0eVF1ZXVlL0JpbmFyeUhlYXBTdHJhdGVneVwiOjV9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBBYnN0cmFjdFByaW9yaXR5UXVldWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RQcmlvcml0eVF1ZXVlID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBBYnN0cmFjdFByaW9yaXR5UXVldWUob3B0aW9ucykge1xuICAgIHZhciByZWY7XG4gICAgaWYgKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLnN0cmF0ZWd5IDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyAnTXVzdCBwYXNzIG9wdGlvbnMuc3RyYXRlZ3ksIGEgc3RyYXRlZ3knO1xuICAgIH1cbiAgICBpZiAoKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuY29tcGFyYXRvciA6IHZvaWQgMCkgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ011c3QgcGFzcyBvcHRpb25zLmNvbXBhcmF0b3IsIGEgY29tcGFyYXRvcic7XG4gICAgfVxuICAgIHRoaXMucHJpdiA9IG5ldyBvcHRpb25zLnN0cmF0ZWd5KG9wdGlvbnMpO1xuICAgIHRoaXMubGVuZ3RoID0gKG9wdGlvbnMgIT0gbnVsbCA/IChyZWYgPSBvcHRpb25zLmluaXRpYWxWYWx1ZXMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogdm9pZCAwIDogdm9pZCAwKSB8fCAwO1xuICB9XG5cbiAgQWJzdHJhY3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5xdWV1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5sZW5ndGgrKztcbiAgICB0aGlzLnByaXYucXVldWUodmFsdWUpO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQWJzdHJhY3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoIXRoaXMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyAnRW1wdHkgcXVldWUnO1xuICAgIH1cbiAgICB0aGlzLmxlbmd0aC0tO1xuICAgIHJldHVybiB0aGlzLnByaXYuZGVxdWV1ZSgpO1xuICB9O1xuXG4gIEFic3RyYWN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgJ0VtcHR5IHF1ZXVlJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJpdi5wZWVrKCk7XG4gIH07XG5cbiAgQWJzdHJhY3RQcmlvcml0eVF1ZXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gdGhpcy5wcml2LmNsZWFyKCk7XG4gIH07XG5cbiAgcmV0dXJuIEFic3RyYWN0UHJpb3JpdHlRdWV1ZTtcblxufSkoKTtcblxuXG59LHt9XSwzOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBBcnJheVN0cmF0ZWd5LCBiaW5hcnlTZWFyY2hGb3JJbmRleFJldmVyc2VkO1xuXG5iaW5hcnlTZWFyY2hGb3JJbmRleFJldmVyc2VkID0gZnVuY3Rpb24oYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBoaWdoLCBsb3csIG1pZDtcbiAgbG93ID0gMDtcbiAgaGlnaCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICBtaWQgPSAobG93ICsgaGlnaCkgPj4+IDE7XG4gICAgaWYgKGNvbXBhcmF0b3IoYXJyYXlbbWlkXSwgdmFsdWUpID49IDApIHtcbiAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBsb3c7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5U3RyYXRlZ3kgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEFycmF5U3RyYXRlZ3kob3B0aW9ucykge1xuICAgIHZhciByZWY7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmNvbXBhcmF0b3IgPSB0aGlzLm9wdGlvbnMuY29tcGFyYXRvcjtcbiAgICB0aGlzLmRhdGEgPSAoKHJlZiA9IHRoaXMub3B0aW9ucy5pbml0aWFsVmFsdWVzKSAhPSBudWxsID8gcmVmLnNsaWNlKDApIDogdm9pZCAwKSB8fCBbXTtcbiAgICB0aGlzLmRhdGEuc29ydCh0aGlzLmNvbXBhcmF0b3IpLnJldmVyc2UoKTtcbiAgfVxuXG4gIEFycmF5U3RyYXRlZ3kucHJvdG90eXBlLnF1ZXVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcG9zO1xuICAgIHBvcyA9IGJpbmFyeVNlYXJjaEZvckluZGV4UmV2ZXJzZWQodGhpcy5kYXRhLCB2YWx1ZSwgdGhpcy5jb21wYXJhdG9yKTtcbiAgICB0aGlzLmRhdGEuc3BsaWNlKHBvcywgMCwgdmFsdWUpO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQXJyYXlTdHJhdGVneS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEucG9wKCk7XG4gIH07XG5cbiAgQXJyYXlTdHJhdGVneS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbdGhpcy5kYXRhLmxlbmd0aCAtIDFdO1xuICB9O1xuXG4gIEFycmF5U3RyYXRlZ3kucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kYXRhLmxlbmd0aCA9IDA7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICByZXR1cm4gQXJyYXlTdHJhdGVneTtcblxufSkoKTtcblxuXG59LHt9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbnZhciBCSGVhcFN0cmF0ZWd5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJIZWFwU3RyYXRlZ3kgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEJIZWFwU3RyYXRlZ3kob3B0aW9ucykge1xuICAgIHZhciBhcnIsIGksIGosIGssIGxlbiwgcmVmLCByZWYxLCBzaGlmdCwgdmFsdWU7XG4gICAgdGhpcy5jb21wYXJhdG9yID0gKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuY29tcGFyYXRvciA6IHZvaWQgMCkgfHwgZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH07XG4gICAgdGhpcy5wYWdlU2l6ZSA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLnBhZ2VTaXplIDogdm9pZCAwKSB8fCA1MTI7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIHNoaWZ0ID0gMDtcbiAgICB3aGlsZSAoKDEgPDwgc2hpZnQpIDwgdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgc2hpZnQgKz0gMTtcbiAgICB9XG4gICAgaWYgKDEgPDwgc2hpZnQgIT09IHRoaXMucGFnZVNpemUpIHtcbiAgICAgIHRocm93ICdwYWdlU2l6ZSBtdXN0IGJlIGEgcG93ZXIgb2YgdHdvJztcbiAgICB9XG4gICAgdGhpcy5fc2hpZnQgPSBzaGlmdDtcbiAgICB0aGlzLl9lbXB0eU1lbW9yeVBhZ2VUZW1wbGF0ZSA9IGFyciA9IFtdO1xuICAgIGZvciAoaSA9IGogPSAwLCByZWYgPSB0aGlzLnBhZ2VTaXplOyAwIDw9IHJlZiA/IGogPCByZWYgOiBqID4gcmVmOyBpID0gMCA8PSByZWYgPyArK2ogOiAtLWopIHtcbiAgICAgIGFyci5wdXNoKG51bGwpO1xuICAgIH1cbiAgICB0aGlzLl9tZW1vcnkgPSBbXTtcbiAgICB0aGlzLl9tYXNrID0gdGhpcy5wYWdlU2l6ZSAtIDE7XG4gICAgaWYgKG9wdGlvbnMuaW5pdGlhbFZhbHVlcykge1xuICAgICAgcmVmMSA9IG9wdGlvbnMuaW5pdGlhbFZhbHVlcztcbiAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZjEubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgdmFsdWUgPSByZWYxW2tdO1xuICAgICAgICB0aGlzLnF1ZXVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5xdWV1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5sZW5ndGggKz0gMTtcbiAgICB0aGlzLl93cml0ZSh0aGlzLmxlbmd0aCwgdmFsdWUpO1xuICAgIHRoaXMuX2J1YmJsZVVwKHRoaXMubGVuZ3RoLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJldCwgdmFsO1xuICAgIHJldCA9IHRoaXMuX3JlYWQoMSk7XG4gICAgdmFsID0gdGhpcy5fcmVhZCh0aGlzLmxlbmd0aCk7XG4gICAgdGhpcy5sZW5ndGggLT0gMTtcbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl93cml0ZSgxLCB2YWwpO1xuICAgICAgdGhpcy5fYnViYmxlRG93bigxLCB2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIEJIZWFwU3RyYXRlZ3kucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZCgxKTtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9tZW1vcnkubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIEJIZWFwU3RyYXRlZ3kucHJvdG90eXBlLl93cml0ZSA9IGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgIHZhciBwYWdlO1xuICAgIHBhZ2UgPSBpbmRleCA+PiB0aGlzLl9zaGlmdDtcbiAgICB3aGlsZSAocGFnZSA+PSB0aGlzLl9tZW1vcnkubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9tZW1vcnkucHVzaCh0aGlzLl9lbXB0eU1lbW9yeVBhZ2VUZW1wbGF0ZS5zbGljZSgwKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tZW1vcnlbcGFnZV1baW5kZXggJiB0aGlzLl9tYXNrXSA9IHZhbHVlO1xuICB9O1xuXG4gIEJIZWFwU3RyYXRlZ3kucHJvdG90eXBlLl9yZWFkID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5W2luZGV4ID4+IHRoaXMuX3NoaWZ0XVtpbmRleCAmIHRoaXMuX21hc2tdO1xuICB9O1xuXG4gIEJIZWFwU3RyYXRlZ3kucHJvdG90eXBlLl9idWJibGVVcCA9IGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgIHZhciBjb21wYXJlLCBpbmRleEluUGFnZSwgcGFyZW50SW5kZXgsIHBhcmVudFZhbHVlO1xuICAgIGNvbXBhcmUgPSB0aGlzLmNvbXBhcmF0b3I7XG4gICAgd2hpbGUgKGluZGV4ID4gMSkge1xuICAgICAgaW5kZXhJblBhZ2UgPSBpbmRleCAmIHRoaXMuX21hc2s7XG4gICAgICBpZiAoaW5kZXggPCB0aGlzLnBhZ2VTaXplIHx8IGluZGV4SW5QYWdlID4gMykge1xuICAgICAgICBwYXJlbnRJbmRleCA9IChpbmRleCAmIH50aGlzLl9tYXNrKSB8IChpbmRleEluUGFnZSA+PiAxKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXhJblBhZ2UgPCAyKSB7XG4gICAgICAgIHBhcmVudEluZGV4ID0gKGluZGV4IC0gdGhpcy5wYWdlU2l6ZSkgPj4gdGhpcy5fc2hpZnQ7XG4gICAgICAgIHBhcmVudEluZGV4ICs9IHBhcmVudEluZGV4ICYgfih0aGlzLl9tYXNrID4+IDEpO1xuICAgICAgICBwYXJlbnRJbmRleCB8PSB0aGlzLnBhZ2VTaXplID4+IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnRJbmRleCA9IGluZGV4IC0gMjtcbiAgICAgIH1cbiAgICAgIHBhcmVudFZhbHVlID0gdGhpcy5fcmVhZChwYXJlbnRJbmRleCk7XG4gICAgICBpZiAoY29tcGFyZShwYXJlbnRWYWx1ZSwgdmFsdWUpIDwgMCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMuX3dyaXRlKHBhcmVudEluZGV4LCB2YWx1ZSk7XG4gICAgICB0aGlzLl93cml0ZShpbmRleCwgcGFyZW50VmFsdWUpO1xuICAgICAgaW5kZXggPSBwYXJlbnRJbmRleDtcbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5fYnViYmxlRG93biA9IGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgIHZhciBjaGlsZEluZGV4MSwgY2hpbGRJbmRleDIsIGNoaWxkVmFsdWUxLCBjaGlsZFZhbHVlMiwgY29tcGFyZTtcbiAgICBjb21wYXJlID0gdGhpcy5jb21wYXJhdG9yO1xuICAgIHdoaWxlIChpbmRleCA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICBpZiAoaW5kZXggPiB0aGlzLl9tYXNrICYmICEoaW5kZXggJiAodGhpcy5fbWFzayAtIDEpKSkge1xuICAgICAgICBjaGlsZEluZGV4MSA9IGNoaWxkSW5kZXgyID0gaW5kZXggKyAyO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCAmICh0aGlzLnBhZ2VTaXplID4+IDEpKSB7XG4gICAgICAgIGNoaWxkSW5kZXgxID0gKGluZGV4ICYgfnRoaXMuX21hc2spID4+IDE7XG4gICAgICAgIGNoaWxkSW5kZXgxIHw9IGluZGV4ICYgKHRoaXMuX21hc2sgPj4gMSk7XG4gICAgICAgIGNoaWxkSW5kZXgxID0gKGNoaWxkSW5kZXgxICsgMSkgPDwgdGhpcy5fc2hpZnQ7XG4gICAgICAgIGNoaWxkSW5kZXgyID0gY2hpbGRJbmRleDEgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRJbmRleDEgPSBpbmRleCArIChpbmRleCAmIHRoaXMuX21hc2spO1xuICAgICAgICBjaGlsZEluZGV4MiA9IGNoaWxkSW5kZXgxICsgMTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGlsZEluZGV4MSAhPT0gY2hpbGRJbmRleDIgJiYgY2hpbGRJbmRleDIgPD0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgY2hpbGRWYWx1ZTEgPSB0aGlzLl9yZWFkKGNoaWxkSW5kZXgxKTtcbiAgICAgICAgY2hpbGRWYWx1ZTIgPSB0aGlzLl9yZWFkKGNoaWxkSW5kZXgyKTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY2hpbGRWYWx1ZTEsIHZhbHVlKSA8IDAgJiYgY29tcGFyZShjaGlsZFZhbHVlMSwgY2hpbGRWYWx1ZTIpIDw9IDApIHtcbiAgICAgICAgICB0aGlzLl93cml0ZShjaGlsZEluZGV4MSwgdmFsdWUpO1xuICAgICAgICAgIHRoaXMuX3dyaXRlKGluZGV4LCBjaGlsZFZhbHVlMSk7XG4gICAgICAgICAgaW5kZXggPSBjaGlsZEluZGV4MTtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wYXJlKGNoaWxkVmFsdWUyLCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgICAgdGhpcy5fd3JpdGUoY2hpbGRJbmRleDIsIHZhbHVlKTtcbiAgICAgICAgICB0aGlzLl93cml0ZShpbmRleCwgY2hpbGRWYWx1ZTIpO1xuICAgICAgICAgIGluZGV4ID0gY2hpbGRJbmRleDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2hpbGRJbmRleDEgPD0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgY2hpbGRWYWx1ZTEgPSB0aGlzLl9yZWFkKGNoaWxkSW5kZXgxKTtcbiAgICAgICAgaWYgKGNvbXBhcmUoY2hpbGRWYWx1ZTEsIHZhbHVlKSA8IDApIHtcbiAgICAgICAgICB0aGlzLl93cml0ZShjaGlsZEluZGV4MSwgdmFsdWUpO1xuICAgICAgICAgIHRoaXMuX3dyaXRlKGluZGV4LCBjaGlsZFZhbHVlMSk7XG4gICAgICAgICAgaW5kZXggPSBjaGlsZEluZGV4MTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgcmV0dXJuIEJIZWFwU3RyYXRlZ3k7XG5cbn0pKCk7XG5cblxufSx7fV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQmluYXJ5SGVhcFN0cmF0ZWd5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpbmFyeUhlYXBTdHJhdGVneSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQmluYXJ5SGVhcFN0cmF0ZWd5KG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmO1xuICAgIHRoaXMuY29tcGFyYXRvciA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmNvbXBhcmF0b3IgOiB2b2lkIDApIHx8IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhIC0gYjtcbiAgICB9O1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRhdGEgPSAoKHJlZiA9IG9wdGlvbnMuaW5pdGlhbFZhbHVlcykgIT0gbnVsbCA/IHJlZi5zbGljZSgwKSA6IHZvaWQgMCkgfHwgW107XG4gICAgdGhpcy5faGVhcGlmeSgpO1xuICB9XG5cbiAgQmluYXJ5SGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5faGVhcGlmeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBqLCByZWY7XG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGkgPSBqID0gMSwgcmVmID0gdGhpcy5kYXRhLmxlbmd0aDsgMSA8PSByZWYgPyBqIDwgcmVmIDogaiA+IHJlZjsgaSA9IDEgPD0gcmVmID8gKytqIDogLS1qKSB7XG4gICAgICAgIHRoaXMuX2J1YmJsZVVwKGkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIEJpbmFyeUhlYXBTdHJhdGVneS5wcm90b3R5cGUucXVldWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHRoaXMuZGF0YS5wdXNoKHZhbHVlKTtcbiAgICB0aGlzLl9idWJibGVVcCh0aGlzLmRhdGEubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBCaW5hcnlIZWFwU3RyYXRlZ3kucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGFzdCwgcmV0O1xuICAgIHJldCA9IHRoaXMuZGF0YVswXTtcbiAgICBsYXN0ID0gdGhpcy5kYXRhLnBvcCgpO1xuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5kYXRhWzBdID0gbGFzdDtcbiAgICAgIHRoaXMuX2J1YmJsZURvd24oMCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgQmluYXJ5SGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVswXTtcbiAgfTtcblxuICBCaW5hcnlIZWFwU3RyYXRlZ3kucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIHRoaXMuZGF0YS5sZW5ndGggPSAwO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQmluYXJ5SGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5fYnViYmxlVXAgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgcGFyZW50LCB4O1xuICAgIHdoaWxlIChwb3MgPiAwKSB7XG4gICAgICBwYXJlbnQgPSAocG9zIC0gMSkgPj4+IDE7XG4gICAgICBpZiAodGhpcy5jb21wYXJhdG9yKHRoaXMuZGF0YVtwb3NdLCB0aGlzLmRhdGFbcGFyZW50XSkgPCAwKSB7XG4gICAgICAgIHggPSB0aGlzLmRhdGFbcGFyZW50XTtcbiAgICAgICAgdGhpcy5kYXRhW3BhcmVudF0gPSB0aGlzLmRhdGFbcG9zXTtcbiAgICAgICAgdGhpcy5kYXRhW3Bvc10gPSB4O1xuICAgICAgICBwb3MgPSBwYXJlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBCaW5hcnlIZWFwU3RyYXRlZ3kucHJvdG90eXBlLl9idWJibGVEb3duID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgdmFyIGxhc3QsIGxlZnQsIG1pbkluZGV4LCByaWdodCwgeDtcbiAgICBsYXN0ID0gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGxlZnQgPSAocG9zIDw8IDEpICsgMTtcbiAgICAgIHJpZ2h0ID0gbGVmdCArIDE7XG4gICAgICBtaW5JbmRleCA9IHBvcztcbiAgICAgIGlmIChsZWZ0IDw9IGxhc3QgJiYgdGhpcy5jb21wYXJhdG9yKHRoaXMuZGF0YVtsZWZ0XSwgdGhpcy5kYXRhW21pbkluZGV4XSkgPCAwKSB7XG4gICAgICAgIG1pbkluZGV4ID0gbGVmdDtcbiAgICAgIH1cbiAgICAgIGlmIChyaWdodCA8PSBsYXN0ICYmIHRoaXMuY29tcGFyYXRvcih0aGlzLmRhdGFbcmlnaHRdLCB0aGlzLmRhdGFbbWluSW5kZXhdKSA8IDApIHtcbiAgICAgICAgbWluSW5kZXggPSByaWdodDtcbiAgICAgIH1cbiAgICAgIGlmIChtaW5JbmRleCAhPT0gcG9zKSB7XG4gICAgICAgIHggPSB0aGlzLmRhdGFbbWluSW5kZXhdO1xuICAgICAgICB0aGlzLmRhdGFbbWluSW5kZXhdID0gdGhpcy5kYXRhW3Bvc107XG4gICAgICAgIHRoaXMuZGF0YVtwb3NdID0geDtcbiAgICAgICAgcG9zID0gbWluSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICByZXR1cm4gQmluYXJ5SGVhcFN0cmF0ZWd5O1xuXG59KSgpO1xuXG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9qcy1wcmlvcml0eS1xdWV1ZS9wcmlvcml0eS1xdWV1ZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBHcmFwaCwgTm9kZSwgRWRnZSB9IGZyb20gJy4vZ3JhcGgnO1xyXG5pbXBvcnQgRHJhdyBmcm9tICcuL2RyYXcnO1xyXG5pbXBvcnQgKiBhcyBDTlMgZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuY2xhc3MgTWF6ZUdlbmVyYXRvciB7XHJcbiAgY29uc3RydWN0b3IoY2FudmFzKSB7XHJcbiAgICB0aGlzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdGhpcy5kcmF3ID0gbmV3IERyYXcoY2FudmFzLCB0aGlzLmN0eCk7XHJcblxyXG4gICAgLy8gdW5kaXJlY3RlZCBncmFwaCB0byB3aGljaCB3ZSB3aWxsIGFkZCByYW5kb20gZWRnZSB3ZWlnaHRzXHJcbiAgICB0aGlzLmdyYXBoID0gbmV3IEdyYXBoKCk7XHJcblxyXG4gICAgLy8gdGhlIGZyb250aWVyIHJlcHJlc2VudHMgdGhlIGNlbGxzIHRoYXQgc3Vycm91bmQgb3IgJ3dhbGwgaW4nIHRoZSBtYXplIHBhdGhcclxuICAgIC8vIGkuZS4gdGhlIGNlbGxzIHRoYXQgYXJlbid0ICdwYXJ0JyBvZiB0aGUgbWF6ZSBidXQgYXJlIG5laWdoYm9ycyBvZiBjdXJyZW50IGNlbGxcclxuICAgIHRoaXMuZnJvbnRpZXIgPSBbXTtcclxuXHJcbiAgICAvLyBtaW5pbXVtIHNwYW5uaW5nIHRyZWUgKE1TVCkgLT4gYWxsIHRoZSBlZGdlcyBvZiBvdXIgZWRnZS13ZWlnaHRlZCwgdW5kaXJlY3RlZFxyXG4gICAgLy8gZ3JhcGggdGhhdCBjb25uZWN0cyBhbGwgdGhlIHZlcnRpY2VzIHdpdGggdGhlIG1pbmltdW0gcG9zc2libGUgdG90YWwgZWRnZSB3ZWlnaHRcclxuICAgIC8vIHRoaXMgaXMgYSBzdWJzZXQgb2YgdGhpcy5ncmFwaC5jb2xsZWN0aW9uIHJlcHJlc2VudGVkIGJ5IGFuIGFkamFjZW5jeSBsaXN0XHJcbiAgICAvLyBpbiBhbiBvYmplY3QsIHdoZXJlIHRoZSBrZXkgaXMgdGhlIG5vZGUgaWRlbnRpZmllciAmIHRoZSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBuZWlnaGJvcnNcclxuICAgIHRoaXMudHJlZSA9IHt9O1xyXG4gIH1cclxuXHJcbiAgZ3JpZCgpIHtcclxuICAgIC8vIGluaXRpYWxpemUgJiBidWlsZCB0aGUgbWF6ZSBncmlkIHBvaW50c1xyXG4gICAgLy8gdGhlIGdyaWQgcG9pbnRzIGFyZSBjb2RlZCBpbiBhIGAuLi1Ob2RlLUVkZ2UtTm9kZS1FZGdlLS4uYCBwYXR0ZXJuXHJcbiAgICAvLyBpbiBlYWNoIGRpcmVjdGlvbi4gdGhlIE1TVCB3aWxsIGJlIGEgc3ViZ3JhcGggb2YgdGhpcyBwYXR0ZXJuXHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGg7XHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IENOUy5OVU1ST1dTOyByICs9IDEpIHtcclxuICAgICAgZ3JhcGguY29sbGVjdGlvbltyXSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IENOUy5OVU1DT0xTOyBjICs9IDEpIHtcclxuICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3JdW2NdID0gbmV3IE5vZGUoYywgcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGUgdW5kaXJlY3RlZCBncmFwaCdzIG5vZGUgZWRnZXMgYXJlIGxpbmtlZCBpbiBlYWNoIGRpcmVjdGlvblxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBDTlMuTlVNUk9XUzsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgQ05TLk5VTUNPTFM7IGMgKz0gMSkge1xyXG4gICAgICAgIC8vIGluIHJhbmRvbWl6ZWQgcHJpbSdzLCBlZGdlcyAoJ3Bhc3NhZ2VzJykgaGF2ZSByYW5kb20gd2VpZ2h0c1xyXG4gICAgICAgIC8vIHRoZSBgaWZgIHN0YXRlbWVudHMga2VlcCBnZW5lcmF0aW9uIHdpdGhpbiByYW5nZSwgdGhlbiBhc3NpZ24gd2VpZ2h0ZWQgZWRnZXNcclxuICAgICAgICBpZiAociAhPT0gQ05TLk5VTVJPV1MgLSAxKSB7XHJcbiAgICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3JdW2NdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5TT1VUSF0gPVxyXG4gICAgICAgICAgICBuZXcgRWRnZShncmFwaC5jb2xsZWN0aW9uW3JdW2NdLCBncmFwaC5jb2xsZWN0aW9uW3IgKyAxXVtjXSk7XHJcbiAgICAgICAgICAvLyB1bmRpcmVjdGVkIGxpbmthZ2UgKGVkZ2UgYmV0d2VlbiBOICsgUyBoYXMgMSByYW5kb20gd2VpZ2h0KTpcclxuICAgICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bciArIDFdW2NdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5OT1JUSF0gPVxyXG4gICAgICAgICAgICBuZXcgRWRnZShncmFwaC5jb2xsZWN0aW9uW3IgKyAxXVtjXSwgZ3JhcGguY29sbGVjdGlvbltyXVtjXSxcclxuICAgICAgICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3JdW2NdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5TT1VUSF0ud2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGMgIT09IENOUy5OVU1DT0xTIC0gMSkge1xyXG4gICAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyXVtjXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuRUFTVF0gPVxyXG4gICAgICAgICAgICBuZXcgRWRnZShncmFwaC5jb2xsZWN0aW9uW3JdW2NdLCBncmFwaC5jb2xsZWN0aW9uW3JdW2MgKyAxXSk7XHJcbiAgICAgICAgICAvLyB1bmRpcmVjdGVkIGxpbmthZ2UgKGVkZ2UgYmV0d2VlbiBFICsgVyBoYXMgMSByYW5kb20gd2VpZ2h0KTpcclxuICAgICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl1bYyArIDFdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5XRVNUXSA9XHJcbiAgICAgICAgICAgIG5ldyBFZGdlKGdyYXBoLmNvbGxlY3Rpb25bcl1bYyArIDFdLCBncmFwaC5jb2xsZWN0aW9uW3JdW2NdLFxyXG4gICAgICAgICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLkVBU1RdLndlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBcIlByaW0ncyBhbGdvcml0aG0gaXMgYSBncmVlZHkgYWxnb3JpdGhtIHRoYXQgZmluZHMgYSBtaW5pbXVtIHNwYW5uaW5nIHRyZWVcclxuICAvLyBmb3IgYSB3ZWlnaHRlZCB1bmRpcmVjdGVkIGdyYXBoXCIgKFdpa2lwZWRpYSkuIHRoaXMgaXMgaXRzIHJhbmRvbWl6ZWQgaW1wbGVtZW50YXRpb25cclxuICAvLyBpdCBjYW4gYmUgYXBwbGllZCBhcyBhIG1hemUgZ2VuZXJhdGlvbiBhbGdvcml0aG0gYnkgYnVpbGRpbmcgYSBtYXplIFwiZnJvbnRpZXJcIlxyXG4gIHByaW1zKCkge1xyXG4gICAgLy8gdGhlIG1hemUgaXMgYnVpbHQgYWxvbmcgdGhlIGVkZ2Ugd2l0aCB0aGUgbG93ZXN0IHdlaWdodFxyXG4gICAgLy8gdGhhdCBjaG9pY2UgbXVzdCBub3QgY29ubmVjdCB3aXRoIGEgcHJldmlvdXNseSB2aXNpdGVkIG5vZGVcclxuICAgIC8vICgxKSBvYnNlcnZlIHRoZSBmcm9udGllciB0byB0aGUgY3VycmVudCBjZWxsXHJcbiAgICAvLyAoMikgY29tcGFyZSB0aGUgZWRnZSB3ZWlnaHRzICYgc2V0IHRoZSBtaW5pbXVtIGNlbGxcclxuICAgIC8vIEZJWE1FOiBub24tZmF0YWwgcmFyZSBjb21wbGFpbnQ6ICdDYW5ub3Qgc2V0IHByb3BlcnR5ICdkaXNjb3ZlcmVkJyBvZiBudWxsJ1xyXG4gICAgbGV0IG5ld0VkZ2UgPSBuZXcgRWRnZShudWxsLCBudWxsLCAxKTsgLy8gZHVtbXkgZWRnZSwgb3V0c2lkZSBtYXhpbXVtIHdlaWdodFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZyb250aWVyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGlmICh0aGlzLmZyb250aWVyW2ldLm5vZGVGcm9tLmRpc2NvdmVyZWQgJiYgdGhpcy5mcm9udGllcltpXS5ub2RlVG8uZGlzY292ZXJlZCkge1xyXG4gICAgICAgIHRoaXMuZnJvbnRpZXIuc3BsaWNlKGksIDEpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZnJvbnRpZXJbaV0ud2VpZ2h0IDwgbmV3RWRnZS53ZWlnaHQgJiYgIXRoaXMuZnJvbnRpZXJbaV0ubm9kZVRvLmRpc2NvdmVyZWQpIHtcclxuICAgICAgICBuZXdFZGdlID0gdGhpcy5mcm9udGllcltpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV3RWRnZS5ub2RlVG8uZGlzY292ZXJlZCA9IHRydWU7XHJcblxyXG4gICAgLy8gcmUtYnVpbGQgdGhlIGZyb250aWVyIGF0IHRoZSBuZXcgbm9kZSBmb3IgZWFjaCBvZiA0IGRpcmVjdGlvbnNcclxuICAgIE9iamVjdC52YWx1ZXMoQ05TLkRJUkVDVElPTlMpLmZvckVhY2goKGRpcmVjdGlvbikgPT4ge1xyXG4gICAgICAvLyB0aGVyZSBzaG91bGQgYmUgYSBjZWxsIGF0IHRoZSBkaXJlY3Rpb24gJiYgaXQgc2hvdWxkIGJlIHVuZGlzY292ZXJlZFxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKG5ld0VkZ2Uubm9kZVRvLm5laWdoYm9yc1tkaXJlY3Rpb25dICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgJiYgKCFuZXdFZGdlLm5vZGVUby5uZWlnaGJvcnNbZGlyZWN0aW9uXS5ub2RlVG8uZGlzY292ZXJlZClcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5mcm9udGllci5wdXNoKG5ld0VkZ2Uubm9kZVRvLm5laWdoYm9yc1tkaXJlY3Rpb25dKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYG5vZGVGcm9tYCBpcyByZWxhdGVkIHRvIGBub2RlVG9gIGJ5IGFuIGVkZ2VcclxuICAgIGNvbnN0IGN1cnJlbnRQb3MgPSBgJHtuZXdFZGdlLm5vZGVGcm9tLnh9LCAke25ld0VkZ2Uubm9kZUZyb20ueX1gO1xyXG4gICAgY29uc3QgbmV4dFBvcyA9IGAke25ld0VkZ2Uubm9kZVRvLnh9LCAke25ld0VkZ2Uubm9kZVRvLnl9YDtcclxuXHJcbiAgICAvLyBlYWNoIGdyaWQgbm9kZSBzdG9yZXMgYSBuZWlnaGJvciBpbiB0aGUgZm9ybWF0IFtlZGdlLCBub2RlXSB3aGVyZSB0aGUgZWRnZVxyXG4gICAgLy8gaXMgdGhlIHBhc3NhZ2UgdG8gdGhlIG5leHQgbm9kZS4gc2luY2UgdGhpcyBpcyBhbiB1bmRpcmVjdGVkIGdyYXBoLCB0aGVcclxuICAgIC8vIGN1cnJlbnRQb3MgaGFzIGEgbmVpZ2hib3IgbmV4dFBvcywgYW5kIHRoZSBuZXh0UG9zIGhhcyBhIG5laWdoYm9yIGN1cnJlbnRQb3NcclxuICAgIC8vIGlmIHRoaXMgd2FzIGEgZGlyZWN0ZWQgZ3JhcGgsIG9taXQgb25lIG9mIHRoZSB0ZXJuYXJpZXMgLSBvYnNlcnZlIHRoYXRcclxuICAgIC8vIGRlYWQtZW5kcyB3aWxsIGJlIHZlcnkgY29tbW9uIHdoZW4gdXNpbmcgcmFuZG9tIGV4dHJlbWVzLCBzaW5jZSB0aGVcclxuICAgIC8vIHNlYXJjaCBhbGdvcml0aG0gaXNuJ3QgYWxsb3dlZCB0byBsb29rIGluIGFuICdvcHBvc2l0ZScgZGlyZWN0aW9uXHJcbiAgICB0aGlzLnRyZWVbY3VycmVudFBvc10gPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHRoaXMudHJlZVtjdXJyZW50UG9zXSA9IFtbbmV3RWRnZSwgbmV3RWRnZS5ub2RlVG9dXVxyXG4gICAgICA6IHRoaXMudHJlZVtjdXJyZW50UG9zXS5wdXNoKFtuZXdFZGdlLCBuZXdFZGdlLm5vZGVUb10pO1xyXG4gICAgdGhpcy50cmVlW25leHRQb3NdID09PSB1bmRlZmluZWRcclxuICAgICAgPyB0aGlzLnRyZWVbbmV4dFBvc10gPSBbW25ld0VkZ2UsIG5ld0VkZ2Uubm9kZUZyb21dXVxyXG4gICAgICA6IHRoaXMudHJlZVtuZXh0UG9zXS5wdXNoKFtuZXdFZGdlLCBuZXdFZGdlLm5vZGVGcm9tXSk7XHJcblxyXG4gICAgLy8gY29sb3IgaW4gdGhlIG5vZGUgc2luY2UgaXQgd2FzICgxKSB2aXNpdGVkIGFuZCAoMikgYWRkZWQsIGFuZFxyXG4gICAgLy8gY29sb3IgdGhlIGVkZ2UgZnJvbSB0aGUgcHJldmlvdXMgbm9kZSB0byBub2RlVG8sIGJhc2VkIG9uICMgb2Ygbm9kZXMuXHJcbiAgICAvLyBhIGdyYWRpZW50IG9mIDIwIGNvbG9ycyBkZXRlcm1pbmVzIHRoZSBmaWxsIGNvbG9yIGZvciB0aGUgZXh0ZW50IG9mIHByb2dyZXNzXHJcbiAgICBsZXQgY29sb3JTdGVwID0gKE9iamVjdC5rZXlzKHRoaXMudHJlZSkubGVuZ3RoIC8gQ05TLlBST0dSRVNTKTtcclxuICAgIGNvbG9yU3RlcCA9ICgoTWF0aC5jZWlsKGNvbG9yU3RlcCAqIDIwKSkgLyAyMCkudG9GaXhlZCgyKTsgLy8gcm91bmQgdG8gbmVhcmVzdCAuMDVcclxuICAgIHRoaXMuZHJhdy5kcmF3RWRnZShuZXdFZGdlLCBjb2xvclN0ZXApO1xyXG4gICAgdGhpcy5kcmF3LmRyYXdOb2RlKG5ld0VkZ2Uubm9kZVRvLCBjb2xvclN0ZXApO1xyXG4gIH1cclxuXHJcbiAgYnVpbGQoKSB7XHJcbiAgICAvLyBzdGFydCBidWlsZGluZyBtaW5pbXVtIHNwYW5uaW5nIHRyZWUgZnJvbSB0aGUgdG9wLWxlZnQgbm9kZSAoY2FudmFzIGNvb3JkIDAsMClcclxuICAgIGNvbnN0IGZpcnN0Tm9kZSA9IHRoaXMuZ3JhcGguY29sbGVjdGlvblswXVswXTtcclxuICAgIHRoaXMuZ3JhcGguY29sbGVjdGlvblswXVswXS5kaXNjb3ZlcmVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJhdy5kcmF3Tm9kZShmaXJzdE5vZGUsIG51bGwsIENOUy5QUklNU0NPTE9SU1swLjAwXSk7XHJcbiAgICB0aGlzLmltYWdlID0gMDtcclxuXHJcbiAgICAvLyB0aGUgdG9wLWxlZnQgY29ybmVyIGlzICd3YWxsZWQnIGluIGJ5IDEgc291dGhlcm4gY2VsbCAmIDEgZWFzdGVybiBjZWxsXHJcbiAgICAvLyB2aXNpdCBlaXRoZXIgYmFzZWQgb24gcmFuZG9tIHdlaWdodDogcmFuZG9taXplZCBwcmltJ3MgY2hvb3NlcyBsb3dlc3QgZWRnZSB3ZWlnaHRcclxuICAgIHRoaXMuZnJvbnRpZXIucHVzaChcclxuICAgICAgdGhpcy5ncmFwaC5jb2xsZWN0aW9uWzBdWzBdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5TT1VUSF0sXHJcbiAgICAgIHRoaXMuZ3JhcGguY29sbGVjdGlvblswXVswXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuRUFTVF0sXHJcbiAgICApO1xyXG5cclxuICAgIC8vIHJlcGVhdCB0aGUgcHJpbXMgYWxnb3JpdGhtIHVudGlsIHRoZSBncmFwaCBpcyBjb21wbGV0ZVxyXG4gICAgLy8gdXNlcyBhbiBhcmJpdHJhcnkgdGltZSBpbnRlcnZhbCAobXMpIGF0IHdoaWNoIHRvIGJ1aWxkIHRoZSBtYXplXHJcbiAgICB0aGlzLnRyZWUucHJvZ3Jlc3MgPSAwO1xyXG4gICAgY29uc3QgdGltZSA9IDA7XHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy5wcmltcygpO1xyXG4gICAgICB0aGlzLnRyZWUucHJvZ3Jlc3MgKz0gMTtcclxuICAgICAgaWYgKHRoaXMudHJlZS5wcm9ncmVzcyA9PT0gQ05TLlBST0dSRVNTKSB7IC8vIGV2ZXJ5IG5vZGUgaW4gZ3JhcGguY29sbGVjdGlvbiBpcyBkaXNjb3ZlcmVkXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgdGhpcy5pbWFnZSA9IHRoaXMuY3R4LmdldEltYWdlRGF0YSgwLCAwLCBDTlMuV0lEVEgsIENOUy5IRUlHSFQpO1xyXG4gICAgICAgIHRoaXMuYnV0dG9uQ29sb3JGaWxsKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRpbWUpO1xyXG4gICAgcmV0dXJuIHRpbWVyOyAvLyBhY2Nlc3MgdG8gc2V0SW50ZXJ2YWwgSUQgdG8gcGVybWl0IGNsZWFySW50ZXJ2YWwgaW4gb3RoZXIgc2NvcGVzXHJcbiAgfVxyXG5cclxuICBidXR0b25Db2xvckZpbGwoKSB7XHJcbiAgICBbJ2JmcycsICdkZnMnLCAnZGlqa3N0cmEnLCAnYXN0YXInXS5mb3JFYWNoKChpZCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC5hZGQoJ3NlYXJjaC1idG4nKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWF6ZUdlbmVyYXRvcjtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ2VuZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIENOUyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5jbGFzcyBHcmFwaCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNvbGxlY3Rpb24gPSBbXTsgLy8gY29sbGVjdGlvbiBvZiBub2Rlc1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geCAqIENOUy5CTE9DS1dJRFRIO1xyXG4gICAgdGhpcy55ID0geSAqIENOUy5CTE9DS1dJRFRIO1xyXG4gICAgdGhpcy5uZWlnaGJvcnMgPSBbXTsgLy8gbm9kZSdzIG5laWdoYm9yaW5nIGVkZ2VzXHJcbiAgICB0aGlzLnZpc2l0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzY292ZXJlZCA9IGZhbHNlOyAvLyB0cnVlIHdoZW4gYWRkZWQgdG8gTVNUXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBFZGdlIHtcclxuICBjb25zdHJ1Y3Rvcihub2RlRnJvbSwgbm9kZVRvLCB3ZWlnaHQgPSBNYXRoLnJhbmRvbSgpKSB7XHJcbiAgICB0aGlzLm5vZGVGcm9tID0gbm9kZUZyb207XHJcbiAgICB0aGlzLm5vZGVUbyA9IG5vZGVUbztcclxuICAgIHRoaXMud2VpZ2h0ID0gd2VpZ2h0OyAvLyBlZGdlcyBpbml0aWFsaXplZCB3aXRoIGEgcmFuZG9tIHdlaWdodFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgR3JhcGgsIE5vZGUsIEVkZ2UgfTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ3JhcGguanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==