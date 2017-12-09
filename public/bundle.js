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








const canvas = document.getElementById('canvas');
canvas.width = __WEBPACK_IMPORTED_MODULE_6__constants__["m" /* WIDTH */];
canvas.height = __WEBPACK_IMPORTED_MODULE_6__constants__["e" /* HEIGHT */];

const ctx = canvas.getContext('2d');
const draw = new __WEBPACK_IMPORTED_MODULE_5__draw__["a" /* default */](canvas, canvas.getContext('2d'));

document.addEventListener('DOMContentLoaded', () => {
  generateMaze(); // begin drawing maze on page load
}, false);
document.getElementById('bfs').addEventListener('click', doSearch, false);
document.getElementById('dfs').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generateMaze, false);
document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);

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
      minSpanTree[position].forEach(i => i[1].visited = false);
    }
  });
}

function doSearch() {
  const id = this.id;

  // the graph's complete image exists when the maze has fully generated
  if (graph.image) {
    resetSearch();
    ctx.putImageData(graph.image, 0, 0);

    if (start === null || end === null) {
      defaultStartAndEnd();
    } else {
      draw.drawEnds([start, end]); // redraw start & end so they overlap on the canvas
    }

    // TODO: programatically trigger different search algorithms
    if (id === 'bfs') {
      // FIXME: DEBUG REMOVE
      defaultStartAndEnd();
      const x = new __WEBPACK_IMPORTED_MODULE_3__dijkstra__["a" /* default */](canvas, minSpanTree, start, end);
      x.search();
      // FIXME: DEBUG REMOVE
      // searchAlgorithm = new BreadthFirstSearch(
      //   canvas,
      //   minSpanTree,
      //   start,
      //   end,
      // );
      // intervalId = searchAlgorithm.search();
    } else if (id === 'dfs') {
      searchAlgorithm = new __WEBPACK_IMPORTED_MODULE_2__dfs__["a" /* default */](
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
            queue.push(`${neighbor.x}, ${neighbor.y}`); // FIXME ?? i changed this.queue to queue
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

/* unused harmony default export */ var _unused_webpack_default_export = (BreadthFirstSearch);


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
            stack.push(`${neighbor.x}, ${neighbor.y}`); // FIXME ?? i changed this.stack to stack
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


// in a Priority Queue, elements (nodes) with high priority (lower cost)
// are served before elements with lower priority (higher cost).
// this code uses a binary heap-based priority queue package 'js-priority-queue'.
// Google also includes a heap-based PQ implementation in the Closure Library
// https://github.com/google/closure-library/tree/master/closure/goog/structs)
const PriorityQueue = __webpack_require__(7);

// import PriorityQueue from './priorityqueue'
// const x = require('./priorityqueue.js');
// console.log(x);
// import * from './priorityqueue';


// FIXME: use some other way to require? ES6 import?
// FIXME: this only includes a small part of the library right? not the entire thing?
// FIXME: where do I have to require this library now? package.json?
// require('google-closure-library');
// const PriorityQueue = goog.require('goog.structs.PriorityQueue');
// import PriorityQueue from 'google-closure-library/closure/goog/structs/priorityqueue';

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
      comparator: (edgeOne, edgeTwo) => edgeOne.weight - edgeTwo.weight
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
    // priority queue here as well

    distances[source] = 0;
    priorityQueue.queue(source);
    const timer = setInterval(() => {
      if (priorityQueue.length) {
        // if (distances[currentNode] === undefined) distances[currentNode] = Infinity;
        const currentNode = priorityQueue.dequeue();

        // FIXME
        // we need a way to visit the vertex with the smallest known distance/cost.

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
          if (neighbor.visited) continue;

          // consider every neighbor and calculate potential distances:
          // for each, store the distance to the currentNode
          // + the edge weight to the current neighbor
          // Euclidean distance?
          const distanceToNeighborNode = distances[currentNode] + neighborEdge.weight;
          if (distances[neighbor] < distanceToNeighborNode) {
            distances[neighbor] = distanceToNeighborNode;
          }
        }

        // graph[currentNode][]  -----> SET VISITED. idk how to do this LUL

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

  reconstructShortestPath() {
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
        this.flashButtons();
      }
    }, time);
    return timer; // access to setInterval ID to permit clearInterval in other scopes
  }

  flashButtons() {
    document.getElementById('bfs').classList.add('flash');
    document.getElementById('dfs').classList.add('flash');
    setTimeout(() => {
      document.getElementById('bfs').classList.remove('flash');
      document.getElementById('dfs').classList.remove('flash');
    }, 7000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTk4OTg2M2U2Yjg2YzU5MDViZmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RyYXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGZzLmpzIiwid2VicGFjazovLy8uL3NyYy9kaWprc3RyYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanMtcHJpb3JpdHktcXVldWUvcHJpb3JpdHktcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLG1CQUFtQixHQUFHLG1CQUFtQixH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QUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUM7OztBQUdELENBQUMsR0FBRztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsOEJBQThCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7O0FBR0QsQ0FBQyxHQUFHO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDhCQUE4QjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7O0FBR0QsQ0FBQyxHQUFHLEVBQUUsR0FBRztBQUNULENBQUMsRTs7Ozs7Ozs7OztBQ2xZMkI7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpRUFBaUI7QUFDcEM7QUFDQSxxQkFBcUIsaUVBQWlCO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixpRUFBaUI7QUFDcEMscUJBQXFCLGlFQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEZBQTBDO0FBQzFDLG1CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsMEJBQTBCLG1CQUFtQixJQUFJLG1CQUFtQjtBQUNwRSx1QkFBdUIsaUJBQWlCLElBQUksaUJBQWlCOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnR0FBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1SkE7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxOTg5ODYzZTZiODZjNTkwNWJmZCIsImltcG9ydCAqIGFzIENOUyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5jbGFzcyBEcmF3IHtcclxuICBjb25zdHJ1Y3RvcihjYW52YXMsIGN0eCkge1xyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgIHRoaXMuZHJhd24gPSB7fTtcclxuICB9XHJcblxyXG4gIGRyYXdFZGdlKGVkZ2UsIGNvbG9yU3RlcCwgY3VzdG9tQ29sb3IpIHtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGN1c3RvbUNvbG9yIHx8IENOUy5QUklNU0NPTE9SU1tjb2xvclN0ZXBdO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3QoXHJcbiAgICAgICgoZWRnZS5ub2RlRnJvbS54ICsgZWRnZS5ub2RlVG8ueCkgLyAyKSwgLy8gZWRnZSBpcyBpbiBidHduIG5vZGVGcm9tICYgbm9kZVRvXHJcbiAgICAgICgoZWRnZS5ub2RlRnJvbS55ICsgZWRnZS5ub2RlVG8ueSkgLyAyKSxcclxuICAgICAgQ05TLkNFTExTSVpFLCBDTlMuQ0VMTFNJWkUsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZHJhd05vZGUobm9kZSwgY29sb3JTdGVwLCBjdXN0b21Db2xvcikge1xyXG4gICAgY29uc3QgW3gsIHldID0gRHJhdy5kZXN0cnVjdHVyZVBvc2l0aW9uKG5vZGUpO1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY3VzdG9tQ29sb3IgfHwgQ05TLlBSSU1TQ09MT1JTW2NvbG9yU3RlcF07XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh4LCB5LCBDTlMuQ0VMTFNJWkUsIENOUy5DRUxMU0laRSk7XHJcbiAgfVxyXG5cclxuICBkcmF3UGF0aChub2Rlcywgc3R5bGUsIGZvcmNlKSB7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBzdHlsZSA9PT0gJ3Zpc2l0JyA/IENOUy5WSVNJVENPTE9SIDogQ05TLlNPTFVUSU9OQ09MT1I7XHJcblxyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICBjb25zdCBlZGdlSWQgPSBgJHtub2RlWzBdLm5vZGVGcm9tLnh9ICR7bm9kZVswXS5ub2RlRnJvbS55fSAke25vZGVbMF0ubm9kZVRvLnh9ICR7bm9kZVswXS5ub2RlVG8ueX1gO1xyXG4gICAgICBpZiAoIXRoaXMuZHJhd25bZWRnZUlkXSB8fCBmb3JjZSkge1xyXG4gICAgICAgIHRoaXMuZHJhd0VkZ2Uobm9kZVswXSk7XHJcbiAgICAgICAgdGhpcy5kcmF3bltlZGdlSWRdID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBbeCwgeV0gPSBEcmF3LmRlc3RydWN0dXJlUG9zaXRpb24obm9kZVsxXSk7XHJcbiAgICAgIGNvbnN0IG5vZGVJZCA9IGAke3h9IHwgJHt5fWA7XHJcbiAgICAgIGlmICghdGhpcy5kcmF3bltub2RlSWRdIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgQ05TLkNFTExTSVpFLCBDTlMuQ0VMTFNJWkUpO1xyXG4gICAgICAgIHRoaXMuZHJhd25bbm9kZUlkXSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogRFJZXHJcbiAgZHJhd0VuZHMobm9kZXMpIHtcclxuICAgIGNvbnN0IHN0YXJ0QW5kRW5kID0gbm9kZXMubWFwKG5vZGUgPT4gbm9kZS5zcGxpdCgnLCAnKSk7XHJcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IENOUy5TT0xVVElPTkNPTE9SO1xyXG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gNDtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IENOUy5TVEFSVENPTE9SO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3Qoc3RhcnRBbmRFbmRbMF1bMF0sIHN0YXJ0QW5kRW5kWzBdWzFdLCAoQ05TLkNFTExTSVpFICogMS41KSwgKENOUy5DRUxMU0laRSAqIDEuNSkpO1xyXG4gICAgdGhpcy5jdHguc3Ryb2tlUmVjdChzdGFydEFuZEVuZFswXVswXSAtIChDTlMuQ0VMTFNJWkUgLyA0KSwgc3RhcnRBbmRFbmRbMF1bMV0gLSAoQ05TLkNFTExTSVpFIC8gNCksIChDTlMuQ0VMTFNJWkUgKiAxLjUpLCAoQ05TLkNFTExTSVpFICogMS41KSk7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBDTlMuRU5EQ09MT1I7XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdChzdGFydEFuZEVuZFsxXVswXSwgc3RhcnRBbmRFbmRbMV1bMV0sIChDTlMuQ0VMTFNJWkUgKiAxLjUpLCAoQ05TLkNFTExTSVpFICogMS41KSk7XHJcbiAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHN0YXJ0QW5kRW5kWzFdWzBdIC0gKENOUy5DRUxMU0laRSAvIDQpLCBzdGFydEFuZEVuZFsxXVsxXSAtIChDTlMuQ0VMTFNJWkUgLyA0KSwgKENOUy5DRUxMU0laRSAqIDEuNSksIChDTlMuQ0VMTFNJWkUgKiAxLjUpKTtcclxuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGRlc3RydWN0dXJlUG9zaXRpb24obm9kZVBvc2l0aW9uKSB7XHJcbiAgICBpZiAodHlwZW9mIG5vZGVQb3NpdGlvbiA9PT0gJ3N0cmluZycgfHwgbm9kZVBvc2l0aW9uIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcbiAgICAgIHJldHVybiBub2RlUG9zaXRpb24uc3BsaXQoJywgJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW25vZGVQb3NpdGlvbi54LCBub2RlUG9zaXRpb24ueV07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmF3O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kcmF3LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImNvbnN0IFdJRFRIID0gMTAwODtcclxuY29uc3QgSEVJR0hUID0gNjI0O1xyXG5cclxuY29uc3QgQ0VMTFNJWkUgPSA4O1xyXG5jb25zdCBCTE9DS1dJRFRIID0gQ0VMTFNJWkUgKiAyO1xyXG5cclxuLy8gZWFjaCBub2RlIHdpbGwgaGF2ZSBhIGNvcnJlc3BvbmRpbmcgY2VsbCBpbiB0aGUgZ3JhcGgncyBjb2xsZWN0aW9uIGFycmF5XHJcbmNvbnN0IE5VTVJPV1MgPSBIRUlHSFQgLyBCTE9DS1dJRFRIO1xyXG5jb25zdCBOVU1DT0xTID0gV0lEVEggLyBCTE9DS1dJRFRIO1xyXG5cclxuLy8gdG8gb2JzZXJ2ZSBhIGNlbGwncyBzdXJyb3VuZGluZ3MsIHdlIHN0b3JlIGluZm9ybWF0aW9uIGFib3V0IGVhY2ggb2YgdGhlaXIgbmVpZ2hib3JzXHJcbmNvbnN0IERJUkVDVElPTlMgPSB7XHJcbiAgTk9SVEg6IDAsIC8vICAgMFxyXG4gIFNPVVRIOiAyLCAvLyAzICogMVxyXG4gIEVBU1Q6IDEsIC8vICAgIDJcclxuICBXRVNUOiAzLFxyXG59O1xyXG5cclxuLy8gc2V0SW50ZXJ2YWwoKSB0ZXJtaW5hdGVzIHdoZW4gZWFjaCBub2RlIG9mIE5VTVJPV1MgJiBOVU1DT0xTIGlzIHRyYXZlcnNlZFxyXG5jb25zdCBQUk9HUkVTUyA9ICgoV0lEVEggKiBIRUlHSFQpIC8gKEJMT0NLV0lEVEggKiogMikpIC0gMTtcclxuXHJcbi8vIFRPRE86IGNvbnN0IFBBVEhDT0xPUlMgd2lsbCBkcmF3IHRoZSBwYXRoIHRvIHRoZSB0YXJnZXQgbm9kZSB3aXRoIGNvbG9yIHByb2dyZXNzaW9uXHJcbmNvbnN0IFBSSU1TQ09MT1JTID0ge1xyXG4gIDAuMDA6IFwiI2Y1ZmZmOVwiLCAwLjA1OiAnI2U0ZmVlZicsIDAuMTA6ICcjZGJmN2U3JyxcclxuICAwLjE1OiAnI2M5ZmFkZScsIDAuMjA6ICcjYmNmN2Q2JywgMC4yNTogJyNiMmY2ZDAnLFxyXG4gIDAuMzA6ICcjYTlmY2NlJywgMC4zNTogJyM5OGY1YzEnLCAwLjQwOiAnIzhlZmZiZicsXHJcbiAgMC40NTogJyM4MmZjYjgnLCAwLjUwOiAnIzdmZmNiNycsIDAuNTU6ICcjNjZmY2E3JyxcclxuICAwLjYwOiAnIzU1ZmI5ZCcsIDAuNjU6ICcjNDlmZjk4JywgMC43MDogJyMzOWY2OGInLFxyXG4gIDAuNzU6ICcjMzhmYzhkJywgMC44MDogJyMzMGZiODgnLCAwLjg1OiAnIzI3ZmI4MycsXHJcbiAgMC45MDogJyMxY2ZjN2QnLCAwLjk1OiAnIzFjZmM3ZCcsIDEuMDA6ICcjMWNmYzdkJyxcclxufTtcclxuY29uc3QgVklTSVRDT0xPUiA9ICdyZ2JhKDI0OSwgNjMsIDQ0LCAwLjkyKSc7IC8vIE5PVEU6IG1pZ2h0IHdhbnQgdG8gcmVtb3ZlIG9wYWNpdHlcclxuY29uc3QgU09MVVRJT05DT0xPUiA9ICcjZmZlNjAwJztcclxuY29uc3QgU1RBUlRDT0xPUiA9ICcjNGQ5ODAzJztcclxuY29uc3QgRU5EQ09MT1IgPSAnIzg3MDc0MSc7XHJcblxyXG5leHBvcnQge1xyXG4gIFdJRFRILFxyXG4gIEhFSUdIVCxcclxuICBDRUxMU0laRSxcclxuICBCTE9DS1dJRFRILFxyXG4gIE5VTVJPV1MsXHJcbiAgTlVNQ09MUyxcclxuICBESVJFQ1RJT05TLFxyXG4gIFBST0dSRVNTLFxyXG4gIFBSSU1TQ09MT1JTLFxyXG4gIFZJU0lUQ09MT1IsXHJcbiAgU09MVVRJT05DT0xPUixcclxuICBTVEFSVENPTE9SLFxyXG4gIEVORENPTE9SLFxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb25zdGFudHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL3Njc3MvbWFpbi5zY3NzJztcclxuaW1wb3J0IEJyZWFkdGhGaXJzdFNlYXJjaCBmcm9tICcuL2Jmcyc7XHJcbmltcG9ydCBEZXB0aEZpcnN0U2VhcmNoIGZyb20gJy4vZGZzJztcclxuaW1wb3J0IERpamtzdHJhIGZyb20gJy4vZGlqa3N0cmEnO1xyXG5pbXBvcnQgTWF6ZUdlbmVyYXRvciBmcm9tICcuL2dlbmVyYXRvcic7XHJcbmltcG9ydCBEcmF3IGZyb20gJy4vZHJhdyc7XHJcbmltcG9ydCAqIGFzIENOUyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XHJcbmNhbnZhcy53aWR0aCA9IENOUy5XSURUSDtcclxuY2FudmFzLmhlaWdodCA9IENOUy5IRUlHSFQ7XHJcblxyXG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuY29uc3QgZHJhdyA9IG5ldyBEcmF3KGNhbnZhcywgY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBnZW5lcmF0ZU1hemUoKTsgLy8gYmVnaW4gZHJhd2luZyBtYXplIG9uIHBhZ2UgbG9hZFxyXG59LCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvU2VhcmNoLCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvU2VhcmNoLCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW5lcmF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVNYXplLCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb21pemUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJhbmRvbWl6ZVN0YXJ0QW5kRW5kLCBmYWxzZSk7XHJcblxyXG4vLyBUT0RPOiBtaWdodCBiZSBhYmxlIHRvIHNpbXBsaWZ5IGJlY2F1c2UgaSdtIHBhc3NpbmcgZXZlbnQgdGFyZ2V0IHNvIGkgZG9udCBuZWVkXHJcbi8vIHRvIGNoZWNrIGN1cnJlbnQgY2xhc3MuIGFsc28gcmVwZWF0IHRoaXMgZm9yICNzZWFyY2ggYnRuIG92ZXJsYXkuXHJcbmNvbnN0IHRvZ2dsZUFjdGl2ZSA9IChldmVudCkgPT4ge1xyXG4gIGNvbnN0IGp1bXBFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xyXG4gIGlmIChqdW1wRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgPT09ICdqdW1wJykge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmp1bXAnKS5mb3JFYWNoKChhbmNob3IpID0+IHtcclxuICAgICAgYW5jaG9yLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5jb25zdCBjbGFzc05hbWVKdW1wID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanVtcCcpO1xyXG5BcnJheS5mcm9tKGNsYXNzTmFtZUp1bXAsIGMgPT4gYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUFjdGl2ZSwgZmFsc2UpKTtcclxuXHJcbmxldCBncmFwaDtcclxubGV0IG1pblNwYW5UcmVlO1xyXG5sZXQgaW50ZXJ2YWxJZDtcclxuXHJcbmxldCBzZWFyY2hBbGdvcml0aG0gPSB7IHNlYXJjaGluZzogMCB9O1xyXG5sZXQgc3RhcnQ7XHJcbmxldCBlbmQ7XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZU1hemUoKSB7XHJcbiAgLy8gZmx1c2ggdGhlIGNhbnZhc1xyXG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgLy8gaWYgdGhpcyBpc24ndCB0aGUgZmlyc3QgdGltZSBydW5uaW5nIGdlbmVyYXRlTWF6ZSgpLCBjYW5jZWwgdGhlIGxhc3QgYXR0ZW1wdFxyXG4gIGlmIChpbnRlcnZhbElkICE9PSB1bmRlZmluZWQpIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcblxyXG4gIC8vIHJ1biByYW5kb21pemVkIHByaW0ncyBhbGdvcml0aG0gdG8gZ2VuZXJhdGUgYSBtYXplXHJcbiAgY29uc3QgZG9QcmltcyA9IGZ1bmN0aW9uIGRvUHJpbXMoKSB7XHJcbiAgICBjb25zdCBtYXplID0gbmV3IE1hemVHZW5lcmF0b3IoY2FudmFzKTtcclxuICAgIGNvbnN0IGdyaWQgPSBtYXplLmdyaWQoKTtcclxuICAgIGNvbnN0IHRpbWVySWQgPSBtYXplLmJ1aWxkKCk7XHJcbiAgICBncmFwaCA9IG1hemU7XHJcbiAgICBtaW5TcGFuVHJlZSA9IG1hemUudHJlZTtcclxuICAgIHJldHVybiB0aW1lcklkO1xyXG4gIH07XHJcbiAgaW50ZXJ2YWxJZCA9IGRvUHJpbXMoKTtcclxuXHJcbiAgLy8gcmVzZXQgYWxsIHNlYXJjaCBzdGF0ZXMgYW5kIGZsdXNoIHN0YXJ0IGFuZCBlbmQgcG9pbnRzICh1c2VyIGNhbiByZXBlYXQgc2VhcmNoZXMpXHJcbiAgc2VhcmNoQWxnb3JpdGhtLnNlYXJjaGluZyA9IDA7XHJcbiAgW3N0YXJ0LCBlbmRdID0gW251bGwsIG51bGxdO1xyXG59XHJcblxyXG4vLyB3aGVuIGByYW5kb21pemVgIGlzIG5vdCBjYWxsZWQsIHVzZSB0b3AtbGVmdCAmIGJvdHRvbS1yaWdodCBjb3JuZXJzIGFzIHN0YXJ0ICYgZW5kIHBvaW50c1xyXG5mdW5jdGlvbiBkZWZhdWx0U3RhcnRBbmRFbmQoKSB7XHJcbiAgc3RhcnQgPSAnMCwgMCc7XHJcbiAgZW5kID0gYCR7Q05TLldJRFRIIC0gQ05TLkJMT0NLV0lEVEh9LCAke0NOUy5IRUlHSFQgLSBDTlMuQkxPQ0tXSURUSH1gO1xyXG4gIGRyYXcuZHJhd0VuZHMoW3N0YXJ0LCBlbmRdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9taXplU3RhcnRBbmRFbmQoKSB7XHJcbiAgLy8gcHJvaGliaXQgY2hhbmdpbmcgc3RhcnQgYW5kIGVuZCBjb29yZGluYXRlcyB3aGlsZSBhIHNlYXJjaCBpcyBpbiBwcm9ncmVzc1xyXG4gIGlmIChzZWFyY2hBbGdvcml0aG0uc2VhcmNoaW5nKSB7XHJcbiAgICByZXR1cm4gY29uc29sZS5sb2coJ3dhaXQgZm9yIGEgc2VhcmNoIHRvIHRlcm1pbmF0ZSBiZWZvcmUgY2hvb3NpbmcgbmV3IGVuZHBvaW50cycpO1xyXG4gIH1cclxuXHJcbiAgLy8gcGlja3MgcmFuZG9tIHN0YXJ0ICYgZW5kIG5vZGVzLCB3aXRoIGFyYml0cmFyeSBiaWFzIGZvciBlYWNoIGNob2ljZSB2aWEgYHNsaWNlKC4uKWBcclxuICBjb25zdCByYW5kb21Ob2RlcyA9IGZ1bmN0aW9uIHJhbmRvbU5vZGVzKCkge1xyXG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyhtaW5TcGFuVHJlZSk7XHJcbiAgICBjb25zdCBwaWNrID0gbiA9PiBuW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG4ubGVuZ3RoKV07XHJcblxyXG4gICAgbGV0IGNob2ljZU9uZTtcclxuICAgIGxldCBjaG9pY2VUd287XHJcbiAgICB3aGlsZSAoY2hvaWNlT25lID09PSBjaG9pY2VUd28gfHwgY2hvaWNlT25lID09PSAncHJvZ3Jlc3MnIHx8IGNob2ljZVR3byA9PT0gJ3Byb2dyZXNzJykge1xyXG4gICAgICBjaG9pY2VPbmUgPSBwaWNrKG5vZGVzLnNsaWNlKDAsIDUwKSk7XHJcbiAgICAgIGNob2ljZVR3byA9IHBpY2sobm9kZXMuc2xpY2UoMTI1MCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtjaG9pY2VPbmUsIGNob2ljZVR3b107XHJcbiAgfTtcclxuXHJcbiAgLy8gb25seSBkcmF3IGlmIHRoZSBtaW5pbXVtIHNwYW5uaW5nIHRyZWUgaXMgY29tcGxldGVcclxuICBpZiAobWluU3BhblRyZWUucHJvZ3Jlc3MgPT09IENOUy5QUk9HUkVTUykge1xyXG4gICAgW3N0YXJ0LCBlbmRdID0gcmFuZG9tTm9kZXMoKTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZ3JhcGguaW1hZ2UsIDAsIDApO1xyXG4gICAgZHJhdy5kcmF3RW5kcyhbc3RhcnQsIGVuZF0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYSBzZWFyY2gncyBydW5uaW5nIHN0YXRlIGlzIHN0b3JlZCBpbiBhbiBpbnRlcnZhbElkOiBjbGVhciBhbnkgYXZhaWxhYmxlIElEXHJcbi8vIGEgbm9kZSdzIGB2aXNpdGVkYCBzdGF0ZSBpcyBzdG9yZWQgb24gdGhlIG5vZGUgaXRzZWxmOiBmb3JjZSBpdCB0byBmYWxzZVxyXG5mdW5jdGlvbiByZXNldFNlYXJjaCgpIHtcclxuICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gIE9iamVjdC5rZXlzKG1pblNwYW5UcmVlKS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xyXG4gICAgaWYgKG1pblNwYW5UcmVlW3Bvc2l0aW9uXS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBtaW5TcGFuVHJlZVtwb3NpdGlvbl0uZm9yRWFjaChpID0+IGlbMV0udmlzaXRlZCA9IGZhbHNlKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9TZWFyY2goKSB7XHJcbiAgY29uc3QgaWQgPSB0aGlzLmlkO1xyXG5cclxuICAvLyB0aGUgZ3JhcGgncyBjb21wbGV0ZSBpbWFnZSBleGlzdHMgd2hlbiB0aGUgbWF6ZSBoYXMgZnVsbHkgZ2VuZXJhdGVkXHJcbiAgaWYgKGdyYXBoLmltYWdlKSB7XHJcbiAgICByZXNldFNlYXJjaCgpO1xyXG4gICAgY3R4LnB1dEltYWdlRGF0YShncmFwaC5pbWFnZSwgMCwgMCk7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09PSBudWxsIHx8IGVuZCA9PT0gbnVsbCkge1xyXG4gICAgICBkZWZhdWx0U3RhcnRBbmRFbmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRyYXcuZHJhd0VuZHMoW3N0YXJ0LCBlbmRdKTsgLy8gcmVkcmF3IHN0YXJ0ICYgZW5kIHNvIHRoZXkgb3ZlcmxhcCBvbiB0aGUgY2FudmFzXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogcHJvZ3JhbWF0aWNhbGx5IHRyaWdnZXIgZGlmZmVyZW50IHNlYXJjaCBhbGdvcml0aG1zXHJcbiAgICBpZiAoaWQgPT09ICdiZnMnKSB7XHJcbiAgICAgIC8vIEZJWE1FOiBERUJVRyBSRU1PVkVcclxuICAgICAgZGVmYXVsdFN0YXJ0QW5kRW5kKCk7XHJcbiAgICAgIGNvbnN0IHggPSBuZXcgRGlqa3N0cmEoY2FudmFzLCBtaW5TcGFuVHJlZSwgc3RhcnQsIGVuZCk7XHJcbiAgICAgIHguc2VhcmNoKCk7XHJcbiAgICAgIC8vIEZJWE1FOiBERUJVRyBSRU1PVkVcclxuICAgICAgLy8gc2VhcmNoQWxnb3JpdGhtID0gbmV3IEJyZWFkdGhGaXJzdFNlYXJjaChcclxuICAgICAgLy8gICBjYW52YXMsXHJcbiAgICAgIC8vICAgbWluU3BhblRyZWUsXHJcbiAgICAgIC8vICAgc3RhcnQsXHJcbiAgICAgIC8vICAgZW5kLFxyXG4gICAgICAvLyApO1xyXG4gICAgICAvLyBpbnRlcnZhbElkID0gc2VhcmNoQWxnb3JpdGhtLnNlYXJjaCgpO1xyXG4gICAgfSBlbHNlIGlmIChpZCA9PT0gJ2RmcycpIHtcclxuICAgICAgc2VhcmNoQWxnb3JpdGhtID0gbmV3IERlcHRoRmlyc3RTZWFyY2goXHJcbiAgICAgICAgY2FudmFzLFxyXG4gICAgICAgIG1pblNwYW5UcmVlLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGVuZCxcclxuICAgICAgKTtcclxuICAgICAgaW50ZXJ2YWxJZCA9IHNlYXJjaEFsZ29yaXRobS5zZWFyY2goKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coXCJjYW4ndCBzZWFyY2ggYmVmb3JlIGJ1aWxkaW5nIGEgbWF6ZVwiKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Njc3MvbWFpbi5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBEcmF3IGZyb20gJy4vZHJhdyc7XHJcblxyXG5jbGFzcyBCcmVhZHRoRmlyc3RTZWFyY2gge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JhcGgsIHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICB0aGlzLmRyYXcgPSBuZXcgRHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnF1ZXVlID0gW107XHJcblxyXG4gICAgLy8gbGltaXRlZCBzcGFubmluZyB0cmVlIG9iamVjdCB1c2VkIHNvbGVseSBmb3IgcGF0aCBpbmZvcm1hdGlvblxyXG4gICAgdGhpcy5tZXRhID0ge307XHJcblxyXG4gICAgLy8gMTogcGVyZm9ybWluZyBzZWFyY2gsIDA6IHdhaXRpbmcgdG8gc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDA7XHJcbiAgfVxyXG5cclxuICBzZWFyY2goKSB7XHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDE7XHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGg7XHJcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xyXG4gICAgY29uc3QgcXVldWUgPSB0aGlzLnF1ZXVlO1xyXG4gICAgY29uc3QgbWV0YSA9IHRoaXMubWV0YTtcclxuXHJcbiAgICBxdWV1ZS5wdXNoKHNvdXJjZSk7XHJcblxyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50Tm9kZSA9IHF1ZXVlLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhtZXRhKS5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuZHJhdy5kcmF3UGF0aChncmFwaFtjdXJyZW50Tm9kZV0sICd2aXNpdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ3JhYiBlYWNoIG5laWdoYm9yIG5vZGUgb2YgdGhlIGN1cnJlbnQgY2VsbCBhbmQgc3RyaW5naWZ5IGFzIGEgYGtleWBcclxuICAgICAgICAvLyBncmFwaFtjdXJyZW50Tm9kZV0gc3RvcmVzIHRoZSBuZWlnaGJvcnMgaW4gdGhlIGFkamFjZW5jeSBsaXN0cyxcclxuICAgICAgICAvLyByZXByZXNlbnRlZCBieSBbW25vcnRoRWRnZSwgbm9kZV0sIFtlYXN0RWRnZSwgbm9kZV0gLi4uXVxyXG4gICAgICAgIC8vIGdyYXBoW2N1cnJlbnROb2RlXVtpXVswXSA9PiBzdG9yZXMgdGhlIGVkZ2UgdG8gdGhlIG5laWdoYm9yIG5vZGVcclxuICAgICAgICAvLyAoYW5kIHRoaXMgZWRnZSBzdG9yZXMgcmVmZXJlbmNlcyB0byBgbm9kZUZyb21gIGFuZCBgbm9kZVRvYClcclxuICAgICAgICAvLyBncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0gPT4gc3RvcmVzIHRoZSBuZWlnaGJvciBub2RlXHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3JzID0gZ3JhcGhbY3VycmVudE5vZGVdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXVsxXTtcclxuICAgICAgICAgIGNvbnN0IGtleSA9IGAke25laWdoYm9yLnh9LCAke25laWdoYm9yLnl9YDtcclxuXHJcbiAgICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG5laWdoYm9ycyBpcyB0aGUgdGFyZ2V0LCBicmVhayAmIGRyYXcgdGhlIHNvbHV0aW9uIHBhdGhcclxuICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBtZXRhW2tleV0gPSBbW2dyYXBoW2N1cnJlbnROb2RlXVtpXVswXSwgY3VycmVudE5vZGVdXTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGgoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIW5laWdoYm9yLnZpc2l0ZWQpIHtcclxuICAgICAgICAgICAgcXVldWUucHVzaChgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWApOyAvLyBGSVhNRSA/PyBpIGNoYW5nZWQgdGhpcy5xdWV1ZSB0byBxdWV1ZVxyXG4gICAgICAgICAgICBuZWlnaGJvci52aXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGVsc2UgaWYgdGFyZ2V0IGlzIG5vdCBpbiB0aGUgZ3JhcGggPC0gTVNUcyBjb25uZWN0IGFsbCB2ZXJ0aWNlcy5cclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ25vIHNvbHV0aW9uIGluIHRoaXMgZGlyZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIGEgbmV3IHNlYXJjaCB3aGlsZSBhbm90aGVyIHNlYXJjaCBpcyBydW5uaW5nOlxyXG4gICAgLy8gcmV0dXJuIGFjY2VzcyB0byBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBvbiB0aGF0IElEXHJcbiAgICByZXR1cm4gdGltZXI7XHJcbiAgfVxyXG5cclxuICBwYXRoKCkge1xyXG4gICAgbGV0IHByZWRlY2Vzc29yID0gdGhpcy50YXJnZXQ7XHJcbiAgICB3aGlsZSAocHJlZGVjZXNzb3IgIT09IHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHRoaXMuZHJhdy5kcmF3UGF0aCh0aGlzLm1ldGFbcHJlZGVjZXNzb3JdLCAnc29sdXRpb24nLCB0cnVlKTtcclxuICAgICAgY29uc3QgcHJldmlvdXNOb2RlID0gdGhpcy5tZXRhW3ByZWRlY2Vzc29yXVswXTtcclxuICAgICAgcHJlZGVjZXNzb3IgPSBwcmV2aW91c05vZGVbMV07XHJcbiAgICB9XHJcbiAgICAvLyByZWRyYXcgc3RhcnQgJiBlbmQgb24gdGhlIHNvbHV0aW9uIGJhY2t0cmFjZSB0byBvdmVybGFwIHRoZSBwYXRoIGZvciB2aXNpYmlsaXR5XHJcbiAgICB0aGlzLmRyYXcuZHJhd0VuZHMoW3RoaXMuc291cmNlLCB0aGlzLnRhcmdldF0pO1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAwO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnJlYWR0aEZpcnN0U2VhcmNoO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iZnMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERyYXcgZnJvbSAnLi9kcmF3JztcclxuXHJcbmNsYXNzIERlcHRoRmlyc3RTZWFyY2gge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JhcGgsIHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICB0aGlzLmRyYXcgPSBuZXcgRHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnN0YWNrID0gW107XHJcblxyXG4gICAgLy8gbGltaXRlZCBzcGFubmluZyB0cmVlIG9iamVjdCB1c2VkIHNvbGVseSBmb3IgcGF0aCBpbmZvcm1hdGlvblxyXG4gICAgdGhpcy5tZXRhID0ge307XHJcblxyXG4gICAgLy8gMTogcGVyZm9ybWluZyBzZWFyY2gsIDA6IHdhaXRpbmcgdG8gc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDA7XHJcbiAgfVxyXG5cclxuICBzZWFyY2goKSB7XHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDE7XHJcbiAgICBjb25zdCBncmFwaCA9IHRoaXMuZ3JhcGg7XHJcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xyXG4gICAgY29uc3Qgc3RhY2sgPSB0aGlzLnN0YWNrO1xyXG4gICAgY29uc3QgbWV0YSA9IHRoaXMubWV0YTtcclxuXHJcbiAgICBzdGFjay5wdXNoKHNvdXJjZSk7XHJcblxyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50Tm9kZSA9IHN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgICAvLyBkcmF3IHRoZSBjdXJyZW50IG5vZGUgYmVpbmcgdmlzaXRlZCBhbmQgdGhlIHBhc3NhZ2UgdGhhdCB3YXMgdXNlZCB0byBnZXQgdGhlcmVcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobWV0YSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLmRyYXcuZHJhd1BhdGgoW1ttZXRhW2N1cnJlbnROb2RlXVswXVswXSwgY3VycmVudE5vZGVdXSwgJ3Zpc2l0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBncmFiIGVhY2ggbmVpZ2hib3Igbm9kZSBvZiB0aGUgY3VycmVudCBjZWxsIGFuZCBzdHJpbmdpZnkgYXMgYSBga2V5YFxyXG4gICAgICAgIC8vIGdyYXBoW2N1cnJlbnROb2RlXSBzdG9yZXMgdGhlIG5laWdoYm9ycyBpbiB0aGUgYWRqYWNlbmN5IGxpc3RzLFxyXG4gICAgICAgIC8vIHJlcHJlc2VudGVkIGJ5IFtbbm9ydGhFZGdlLCBub2RlXSwgW2Vhc3RFZGdlLCBub2RlXSAuLi5dXHJcbiAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdW2ldWzBdID0+IHN0b3JlcyB0aGUgZWRnZSB0byB0aGUgbmVpZ2hib3Igbm9kZVxyXG4gICAgICAgIC8vIChhbmQgdGhpcyBlZGdlIHN0b3JlcyByZWZlcmVuY2VzIHRvIGBub2RlRnJvbWAgYW5kIGBub2RlVG9gKVxyXG4gICAgICAgIC8vIGdyYXBoW2N1cnJlbnROb2RlXVtpXVswXSA9PiBzdG9yZXMgdGhlIG5laWdoYm9yIG5vZGVcclxuICAgICAgICBjb25zdCBuZWlnaGJvcnMgPSBncmFwaFtjdXJyZW50Tm9kZV07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgIGNvbnN0IG5laWdoYm9yID0gbmVpZ2hib3JzW2ldWzFdO1xyXG4gICAgICAgICAgY29uc3Qga2V5ID0gYCR7bmVpZ2hib3IueH0sICR7bmVpZ2hib3IueX1gO1xyXG5cclxuICAgICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbmVpZ2hib3JzIGlzIHRoZSB0YXJnZXQsIGJyZWFrICYgZHJhdyB0aGUgcGF0aFxyXG4gICAgICAgICAgaWYgKGtleSA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhdy5kcmF3Tm9kZShrZXkpO1xyXG4gICAgICAgICAgICBtZXRhW2tleV0gPSBbW2dyYXBoW2N1cnJlbnROb2RlXVtpXVswXSwgY3VycmVudE5vZGVdXTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGgoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIW5laWdoYm9yLnZpc2l0ZWQpIHtcclxuICAgICAgICAgICAgc3RhY2sucHVzaChgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWApOyAvLyBGSVhNRSA/PyBpIGNoYW5nZWQgdGhpcy5zdGFjayB0byBzdGFja1xyXG4gICAgICAgICAgICBuZWlnaGJvci52aXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGVsc2UgaWYgdGFyZ2V0IGlzIG5vdCBpbiB0aGUgZ3JhcGggPC0gTVNUcyBjb25uZWN0IGFsbCB2ZXJ0aWNlcy5cclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ25vIHNvbHV0aW9uIGluIHRoaXMgZGlyZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIG5ldyBzZWFyY2ggdHlwZSB3aGlsZSBhIHNlYXJjaCBpcyBydW5uaW5nOiByZXR1cm4gYWNjZXNzIHRvXHJcbiAgICAvLyBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBpZiBjYWxsaW5nIGdlbmVyYXRlTWF6ZSgpIGR1cmluZyBhIHNlYXJjaFxyXG4gICAgcmV0dXJuIHRpbWVyO1xyXG4gIH1cclxuXHJcbiAgcGF0aCgpIHtcclxuICAgIGxldCBwcmVkZWNlc3NvciA9IHRoaXMudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHByZWRlY2Vzc29yICE9PSB0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRyYXcuZHJhd1BhdGgodGhpcy5tZXRhW3ByZWRlY2Vzc29yXSwgJ3NvbHV0aW9uJywgdHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzTm9kZSA9IHRoaXMubWV0YVtwcmVkZWNlc3Nvcl1bMF07XHJcbiAgICAgIHByZWRlY2Vzc29yID0gcHJldmlvdXNOb2RlWzFdO1xyXG4gICAgfVxyXG4gICAgLy8gcmVkcmF3IHN0YXJ0ICYgZW5kIG9uIHRoZSBzb2x1dGlvbiBiYWNrdHJhY2UgdG8gb3ZlcmxhcCB0aGUgcGF0aCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgdGhpcy5kcmF3LmRyYXdFbmRzKFt0aGlzLnNvdXJjZSwgdGhpcy50YXJnZXRdKTtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gMDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlcHRoRmlyc3RTZWFyY2g7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Rmcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRHJhdyBmcm9tICcuL2RyYXcnO1xyXG5cclxuLy8gaW4gYSBQcmlvcml0eSBRdWV1ZSwgZWxlbWVudHMgKG5vZGVzKSB3aXRoIGhpZ2ggcHJpb3JpdHkgKGxvd2VyIGNvc3QpXHJcbi8vIGFyZSBzZXJ2ZWQgYmVmb3JlIGVsZW1lbnRzIHdpdGggbG93ZXIgcHJpb3JpdHkgKGhpZ2hlciBjb3N0KS5cclxuLy8gdGhpcyBjb2RlIHVzZXMgYSBiaW5hcnkgaGVhcC1iYXNlZCBwcmlvcml0eSBxdWV1ZSBwYWNrYWdlICdqcy1wcmlvcml0eS1xdWV1ZScuXHJcbi8vIEdvb2dsZSBhbHNvIGluY2x1ZGVzIGEgaGVhcC1iYXNlZCBQUSBpbXBsZW1lbnRhdGlvbiBpbiB0aGUgQ2xvc3VyZSBMaWJyYXJ5XHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1saWJyYXJ5L3RyZWUvbWFzdGVyL2Nsb3N1cmUvZ29vZy9zdHJ1Y3RzKVxyXG5jb25zdCBQcmlvcml0eVF1ZXVlID0gcmVxdWlyZSgnanMtcHJpb3JpdHktcXVldWUnKTtcclxuXHJcbi8vIGltcG9ydCBQcmlvcml0eVF1ZXVlIGZyb20gJy4vcHJpb3JpdHlxdWV1ZSdcclxuLy8gY29uc3QgeCA9IHJlcXVpcmUoJy4vcHJpb3JpdHlxdWV1ZS5qcycpO1xyXG4vLyBjb25zb2xlLmxvZyh4KTtcclxuLy8gaW1wb3J0ICogZnJvbSAnLi9wcmlvcml0eXF1ZXVlJztcclxuXHJcblxyXG4vLyBGSVhNRTogdXNlIHNvbWUgb3RoZXIgd2F5IHRvIHJlcXVpcmU/IEVTNiBpbXBvcnQ/XHJcbi8vIEZJWE1FOiB0aGlzIG9ubHkgaW5jbHVkZXMgYSBzbWFsbCBwYXJ0IG9mIHRoZSBsaWJyYXJ5IHJpZ2h0PyBub3QgdGhlIGVudGlyZSB0aGluZz9cclxuLy8gRklYTUU6IHdoZXJlIGRvIEkgaGF2ZSB0byByZXF1aXJlIHRoaXMgbGlicmFyeSBub3c/IHBhY2thZ2UuanNvbj9cclxuLy8gcmVxdWlyZSgnZ29vZ2xlLWNsb3N1cmUtbGlicmFyeScpO1xyXG4vLyBjb25zdCBQcmlvcml0eVF1ZXVlID0gZ29vZy5yZXF1aXJlKCdnb29nLnN0cnVjdHMuUHJpb3JpdHlRdWV1ZScpO1xyXG4vLyBpbXBvcnQgUHJpb3JpdHlRdWV1ZSBmcm9tICdnb29nbGUtY2xvc3VyZS1saWJyYXJ5L2Nsb3N1cmUvZ29vZy9zdHJ1Y3RzL3ByaW9yaXR5cXVldWUnO1xyXG5cclxuY2xhc3MgRGlqa3N0cmEge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JhcGgsIHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICB0aGlzLmRyYXcgPSBuZXcgRHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblxyXG4gICAgLy8gMTogcGVyZm9ybWluZyBzZWFyY2gsIDA6IHdhaXRpbmcgdG8gc2VhcmNoXHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDA7XHJcblxyXG4gICAgLy8gdGhlIGBwcmV2aW91c2Agb2JqZWN0IHN0b3JlcyBhIHJlZmVyZW5jZSB0byBvbmUgcGFyZW50IG5vZGUgZm9yIGVhY2ggbm9kZVxyXG4gICAgLy8gb25seSBrZWVwIHRoZSBwYXJlbnQgbm9kZSB0aGF0IGNvbnRyaWJ1dGVzIHRvIHRoZSBjaGVhcGVzdCBjb3N0IChzaG9ydGVzdCBkaXN0YW5jZSlcclxuICAgIHRoaXMucHJldmlvdXMgPSB7fTtcclxuICAgIHRoaXMuZGlzdGFuY2VzID0ge307XHJcblxyXG4gICAgLy8gdXNlIGEgcHJpb3JpdHkgcXVldWUgaW4gd2hpY2ggdmVydGljZXMgYXJlIHNvcnRlZCBieSB0aGVpciBpbmNyZWFzaW5nIGNvc3RcclxuICAgIHRoaXMucHJpb3JpdHlRdWV1ZSA9IG5ldyBQcmlvcml0eVF1ZXVlKHtcclxuICAgICAgY29tcGFyYXRvcjogKGVkZ2VPbmUsIGVkZ2VUd28pID0+IGVkZ2VPbmUud2VpZ2h0IC0gZWRnZVR3by53ZWlnaHRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAxO1xyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoO1xyXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldDtcclxuICAgIGNvbnN0IHByaW9yaXR5UXVldWUgPSB0aGlzLnByaW9yaXR5UXVldWU7XHJcbiAgICBjb25zdCBkaXN0YW5jZXMgPSB0aGlzLmRpc3RhbmNlcztcclxuXHJcbiAgICAvLyBoZWxwZXIgbWV0aG9kXHJcbiAgICAvLyBmb3IgZWFjaCB2ZXJ0ZXggdiBpbiBncmFwaCwgZGlzdFt2XSBpcyBpbmZpbml0eSBhbmQgcHJldlt2XSBpcyBudWxsXHJcbiAgICAvLyBwcmlvcml0eSBxdWV1ZSBoZXJlIGFzIHdlbGxcclxuXHJcbiAgICBkaXN0YW5jZXNbc291cmNlXSA9IDA7XHJcbiAgICBwcmlvcml0eVF1ZXVlLnF1ZXVlKHNvdXJjZSk7XHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKHByaW9yaXR5UXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gaWYgKGRpc3RhbmNlc1tjdXJyZW50Tm9kZV0gPT09IHVuZGVmaW5lZCkgZGlzdGFuY2VzW2N1cnJlbnROb2RlXSA9IEluZmluaXR5O1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnROb2RlID0gcHJpb3JpdHlRdWV1ZS5kZXF1ZXVlKCk7XHJcblxyXG4gICAgICAgIC8vIEZJWE1FXHJcbiAgICAgICAgLy8gd2UgbmVlZCBhIHdheSB0byB2aXNpdCB0aGUgdmVydGV4IHdpdGggdGhlIHNtYWxsZXN0IGtub3duIGRpc3RhbmNlL2Nvc3QuXHJcblxyXG4gICAgICAgIGNvbnN0IG5laWdoYm9ycyA9IGdyYXBoW2N1cnJlbnROb2RlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdW2ldWzBdID0+IHN0b3JlcyB0aGUgZWRnZSB0byB0aGUgbmVpZ2hib3Igbm9kZVxyXG4gICAgICAgICAgLy8gKGFuZCB0aGlzIGVkZ2Ugc3RvcmVzIHJlZmVyZW5jZXMgdG8gYG5vZGVGcm9tYCBhbmQgYG5vZGVUb2ApXHJcbiAgICAgICAgICAvLyBncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0gPT4gc3RvcmVzIHRoZSBuZWlnaGJvciBub2RlXHJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvckVkZ2UgPSBuZWlnaGJvcnNbaV1bMF07XHJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXVsxXTtcclxuXHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZWlnaGJvcnNbaV0pO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobmVpZ2hib3IpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobmVpZ2hib3JFZGdlKTtcclxuICAgICAgICAgIGNvbnN0IGtleSA9IGAke25laWdoYm9yLnh9LCAke25laWdoYm9yLnl9YDtcclxuXHJcbiAgICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG5laWdoYm9ycyBpcyB0aGUgdGFyZ2V0LCBicmVhayAmIGRyYXcgdGhlIHBhdGhcclxuICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc29sdXRpb24gZGlzY292ZXJlZCcpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGEgdmlzaXRlZCBub2RlIHdpbGwgbmV2ZXIgYmUgY2hlY2tlZCBhZ2FpblxyXG4gICAgICAgICAgLy8gVE9ETzogbWlnaHQgd2FudCB0byBkbyB0aGlzIHdoZW4gc2V0dGluZyBjdXJyZW50Tm9kZVxyXG4gICAgICAgICAgaWYgKG5laWdoYm9yLnZpc2l0ZWQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgIC8vIGNvbnNpZGVyIGV2ZXJ5IG5laWdoYm9yIGFuZCBjYWxjdWxhdGUgcG90ZW50aWFsIGRpc3RhbmNlczpcclxuICAgICAgICAgIC8vIGZvciBlYWNoLCBzdG9yZSB0aGUgZGlzdGFuY2UgdG8gdGhlIGN1cnJlbnROb2RlXHJcbiAgICAgICAgICAvLyArIHRoZSBlZGdlIHdlaWdodCB0byB0aGUgY3VycmVudCBuZWlnaGJvclxyXG4gICAgICAgICAgLy8gRXVjbGlkZWFuIGRpc3RhbmNlP1xyXG4gICAgICAgICAgY29uc3QgZGlzdGFuY2VUb05laWdoYm9yTm9kZSA9IGRpc3RhbmNlc1tjdXJyZW50Tm9kZV0gKyBuZWlnaGJvckVkZ2Uud2VpZ2h0O1xyXG4gICAgICAgICAgaWYgKGRpc3RhbmNlc1tuZWlnaGJvcl0gPCBkaXN0YW5jZVRvTmVpZ2hib3JOb2RlKSB7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlc1tuZWlnaGJvcl0gPSBkaXN0YW5jZVRvTmVpZ2hib3JOb2RlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ3JhcGhbY3VycmVudE5vZGVdW10gIC0tLS0tPiBTRVQgVklTSVRFRC4gaWRrIGhvdyB0byBkbyB0aGlzIExVTFxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBlbHNlIGlmIHRhcmdldCBpcyBub3QgaW4gdGhlIGdyYXBoIDwtIE1TVHMgY29ubmVjdCBhbGwgdmVydGljZXMuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKCdubyBzb2x1dGlvbiBpbiB0aGlzIGRpcmVjdGlvbicpO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgICAvLyBhbGxvdyBjaG9vc2luZyBuZXcgc2VhcmNoIHR5cGUgd2hpbGUgYSBzZWFyY2ggaXMgcnVubmluZzogcmV0dXJuIGFjY2VzcyB0b1xyXG4gICAgLy8gc2V0SW50ZXJ2YWwgSUQgdG8gcGVybWl0IGNsZWFySW50ZXJ2YWwgaWYgY2FsbGluZyBnZW5lcmF0ZU1hemUoKSBkdXJpbmcgYSBzZWFyY2hcclxuICAgIHJldHVybiB0aW1lcjtcclxuICB9XHJcblxyXG4gIHJlY29uc3RydWN0U2hvcnRlc3RQYXRoKCkge1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlqa3N0cmE7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RpamtzdHJhLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLlByaW9yaXR5UXVldWUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQWJzdHJhY3RQcmlvcml0eVF1ZXVlLCBBcnJheVN0cmF0ZWd5LCBCSGVhcFN0cmF0ZWd5LCBCaW5hcnlIZWFwU3RyYXRlZ3ksIFByaW9yaXR5UXVldWUsXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5BYnN0cmFjdFByaW9yaXR5UXVldWUgPSBfZGVyZXFfKCcuL1ByaW9yaXR5UXVldWUvQWJzdHJhY3RQcmlvcml0eVF1ZXVlJyk7XG5cbkFycmF5U3RyYXRlZ3kgPSBfZGVyZXFfKCcuL1ByaW9yaXR5UXVldWUvQXJyYXlTdHJhdGVneScpO1xuXG5CaW5hcnlIZWFwU3RyYXRlZ3kgPSBfZGVyZXFfKCcuL1ByaW9yaXR5UXVldWUvQmluYXJ5SGVhcFN0cmF0ZWd5Jyk7XG5cbkJIZWFwU3RyYXRlZ3kgPSBfZGVyZXFfKCcuL1ByaW9yaXR5UXVldWUvQkhlYXBTdHJhdGVneScpO1xuXG5Qcmlvcml0eVF1ZXVlID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgZXh0ZW5kKFByaW9yaXR5UXVldWUsIHN1cGVyQ2xhc3MpO1xuXG4gIGZ1bmN0aW9uIFByaW9yaXR5UXVldWUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgb3B0aW9ucy5zdHJhdGVneSB8fCAob3B0aW9ucy5zdHJhdGVneSA9IEJpbmFyeUhlYXBTdHJhdGVneSk7XG4gICAgb3B0aW9ucy5jb21wYXJhdG9yIHx8IChvcHRpb25zLmNvbXBhcmF0b3IgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gKGEgfHwgMCkgLSAoYiB8fCAwKTtcbiAgICB9KTtcbiAgICBQcmlvcml0eVF1ZXVlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgcmV0dXJuIFByaW9yaXR5UXVldWU7XG5cbn0pKEFic3RyYWN0UHJpb3JpdHlRdWV1ZSk7XG5cblByaW9yaXR5UXVldWUuQXJyYXlTdHJhdGVneSA9IEFycmF5U3RyYXRlZ3k7XG5cblByaW9yaXR5UXVldWUuQmluYXJ5SGVhcFN0cmF0ZWd5ID0gQmluYXJ5SGVhcFN0cmF0ZWd5O1xuXG5Qcmlvcml0eVF1ZXVlLkJIZWFwU3RyYXRlZ3kgPSBCSGVhcFN0cmF0ZWd5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByaW9yaXR5UXVldWU7XG5cblxufSx7XCIuL1ByaW9yaXR5UXVldWUvQWJzdHJhY3RQcmlvcml0eVF1ZXVlXCI6MixcIi4vUHJpb3JpdHlRdWV1ZS9BcnJheVN0cmF0ZWd5XCI6MyxcIi4vUHJpb3JpdHlRdWV1ZS9CSGVhcFN0cmF0ZWd5XCI6NCxcIi4vUHJpb3JpdHlRdWV1ZS9CaW5hcnlIZWFwU3RyYXRlZ3lcIjo1fV0sMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQWJzdHJhY3RQcmlvcml0eVF1ZXVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0UHJpb3JpdHlRdWV1ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gQWJzdHJhY3RQcmlvcml0eVF1ZXVlKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmO1xuICAgIGlmICgob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5zdHJhdGVneSA6IHZvaWQgMCkgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgJ011c3QgcGFzcyBvcHRpb25zLnN0cmF0ZWd5LCBhIHN0cmF0ZWd5JztcbiAgICB9XG4gICAgaWYgKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmNvbXBhcmF0b3IgOiB2b2lkIDApID09IG51bGwpIHtcbiAgICAgIHRocm93ICdNdXN0IHBhc3Mgb3B0aW9ucy5jb21wYXJhdG9yLCBhIGNvbXBhcmF0b3InO1xuICAgIH1cbiAgICB0aGlzLnByaXYgPSBuZXcgb3B0aW9ucy5zdHJhdGVneShvcHRpb25zKTtcbiAgICB0aGlzLmxlbmd0aCA9IChvcHRpb25zICE9IG51bGwgPyAocmVmID0gb3B0aW9ucy5pbml0aWFsVmFsdWVzKSAhPSBudWxsID8gcmVmLmxlbmd0aCA6IHZvaWQgMCA6IHZvaWQgMCkgfHwgMDtcbiAgfVxuXG4gIEFic3RyYWN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUucXVldWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHRoaXMubGVuZ3RoKys7XG4gICAgdGhpcy5wcml2LnF1ZXVlKHZhbHVlKTtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIEFic3RyYWN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgJ0VtcHR5IHF1ZXVlJztcbiAgICB9XG4gICAgdGhpcy5sZW5ndGgtLTtcbiAgICByZXR1cm4gdGhpcy5wcml2LmRlcXVldWUoKTtcbiAgfTtcblxuICBBYnN0cmFjdFByaW9yaXR5UXVldWUucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRocm93ICdFbXB0eSBxdWV1ZSc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByaXYucGVlaygpO1xuICB9O1xuXG4gIEFic3RyYWN0UHJpb3JpdHlRdWV1ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgcmV0dXJuIHRoaXMucHJpdi5jbGVhcigpO1xuICB9O1xuXG4gIHJldHVybiBBYnN0cmFjdFByaW9yaXR5UXVldWU7XG5cbn0pKCk7XG5cblxufSx7fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQXJyYXlTdHJhdGVneSwgYmluYXJ5U2VhcmNoRm9ySW5kZXhSZXZlcnNlZDtcblxuYmluYXJ5U2VhcmNoRm9ySW5kZXhSZXZlcnNlZCA9IGZ1bmN0aW9uKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaGlnaCwgbG93LCBtaWQ7XG4gIGxvdyA9IDA7XG4gIGhpZ2ggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgbWlkID0gKGxvdyArIGhpZ2gpID4+PiAxO1xuICAgIGlmIChjb21wYXJhdG9yKGFycmF5W21pZF0sIHZhbHVlKSA+PSAwKSB7XG4gICAgICBsb3cgPSBtaWQgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWdoID0gbWlkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbG93O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheVN0cmF0ZWd5ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBBcnJheVN0cmF0ZWd5KG9wdGlvbnMpIHtcbiAgICB2YXIgcmVmO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5jb21wYXJhdG9yID0gdGhpcy5vcHRpb25zLmNvbXBhcmF0b3I7XG4gICAgdGhpcy5kYXRhID0gKChyZWYgPSB0aGlzLm9wdGlvbnMuaW5pdGlhbFZhbHVlcykgIT0gbnVsbCA/IHJlZi5zbGljZSgwKSA6IHZvaWQgMCkgfHwgW107XG4gICAgdGhpcy5kYXRhLnNvcnQodGhpcy5jb21wYXJhdG9yKS5yZXZlcnNlKCk7XG4gIH1cblxuICBBcnJheVN0cmF0ZWd5LnByb3RvdHlwZS5xdWV1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHBvcztcbiAgICBwb3MgPSBiaW5hcnlTZWFyY2hGb3JJbmRleFJldmVyc2VkKHRoaXMuZGF0YSwgdmFsdWUsIHRoaXMuY29tcGFyYXRvcik7XG4gICAgdGhpcy5kYXRhLnNwbGljZShwb3MsIDAsIHZhbHVlKTtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIEFycmF5U3RyYXRlZ3kucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLnBvcCgpO1xuICB9O1xuXG4gIEFycmF5U3RyYXRlZ3kucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGggLSAxXTtcbiAgfTtcblxuICBBcnJheVN0cmF0ZWd5LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZGF0YS5sZW5ndGggPSAwO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgcmV0dXJuIEFycmF5U3RyYXRlZ3k7XG5cbn0pKCk7XG5cblxufSx7fV0sNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG52YXIgQkhlYXBTdHJhdGVneTtcblxubW9kdWxlLmV4cG9ydHMgPSBCSGVhcFN0cmF0ZWd5ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBCSGVhcFN0cmF0ZWd5KG9wdGlvbnMpIHtcbiAgICB2YXIgYXJyLCBpLCBqLCBrLCBsZW4sIHJlZiwgcmVmMSwgc2hpZnQsIHZhbHVlO1xuICAgIHRoaXMuY29tcGFyYXRvciA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmNvbXBhcmF0b3IgOiB2b2lkIDApIHx8IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhIC0gYjtcbiAgICB9O1xuICAgIHRoaXMucGFnZVNpemUgPSAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5wYWdlU2l6ZSA6IHZvaWQgMCkgfHwgNTEyO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICBzaGlmdCA9IDA7XG4gICAgd2hpbGUgKCgxIDw8IHNoaWZ0KSA8IHRoaXMucGFnZVNpemUpIHtcbiAgICAgIHNoaWZ0ICs9IDE7XG4gICAgfVxuICAgIGlmICgxIDw8IHNoaWZ0ICE9PSB0aGlzLnBhZ2VTaXplKSB7XG4gICAgICB0aHJvdyAncGFnZVNpemUgbXVzdCBiZSBhIHBvd2VyIG9mIHR3byc7XG4gICAgfVxuICAgIHRoaXMuX3NoaWZ0ID0gc2hpZnQ7XG4gICAgdGhpcy5fZW1wdHlNZW1vcnlQYWdlVGVtcGxhdGUgPSBhcnIgPSBbXTtcbiAgICBmb3IgKGkgPSBqID0gMCwgcmVmID0gdGhpcy5wYWdlU2l6ZTsgMCA8PSByZWYgPyBqIDwgcmVmIDogaiA+IHJlZjsgaSA9IDAgPD0gcmVmID8gKytqIDogLS1qKSB7XG4gICAgICBhcnIucHVzaChudWxsKTtcbiAgICB9XG4gICAgdGhpcy5fbWVtb3J5ID0gW107XG4gICAgdGhpcy5fbWFzayA9IHRoaXMucGFnZVNpemUgLSAxO1xuICAgIGlmIChvcHRpb25zLmluaXRpYWxWYWx1ZXMpIHtcbiAgICAgIHJlZjEgPSBvcHRpb25zLmluaXRpYWxWYWx1ZXM7XG4gICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICAgIHZhbHVlID0gcmVmMVtrXTtcbiAgICAgICAgdGhpcy5xdWV1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQkhlYXBTdHJhdGVneS5wcm90b3R5cGUucXVldWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHRoaXMubGVuZ3RoICs9IDE7XG4gICAgdGhpcy5fd3JpdGUodGhpcy5sZW5ndGgsIHZhbHVlKTtcbiAgICB0aGlzLl9idWJibGVVcCh0aGlzLmxlbmd0aCwgdmFsdWUpO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQkhlYXBTdHJhdGVneS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXQsIHZhbDtcbiAgICByZXQgPSB0aGlzLl9yZWFkKDEpO1xuICAgIHZhbCA9IHRoaXMuX3JlYWQodGhpcy5sZW5ndGgpO1xuICAgIHRoaXMubGVuZ3RoIC09IDE7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fd3JpdGUoMSwgdmFsKTtcbiAgICAgIHRoaXMuX2J1YmJsZURvd24oMSwgdmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWQoMSk7XG4gIH07XG5cbiAgQkhlYXBTdHJhdGVneS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fbWVtb3J5Lmxlbmd0aCA9IDA7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5fd3JpdGUgPSBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICB2YXIgcGFnZTtcbiAgICBwYWdlID0gaW5kZXggPj4gdGhpcy5fc2hpZnQ7XG4gICAgd2hpbGUgKHBhZ2UgPj0gdGhpcy5fbWVtb3J5Lmxlbmd0aCkge1xuICAgICAgdGhpcy5fbWVtb3J5LnB1c2godGhpcy5fZW1wdHlNZW1vcnlQYWdlVGVtcGxhdGUuc2xpY2UoMCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWVtb3J5W3BhZ2VdW2luZGV4ICYgdGhpcy5fbWFza10gPSB2YWx1ZTtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5fcmVhZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuX21lbW9yeVtpbmRleCA+PiB0aGlzLl9zaGlmdF1baW5kZXggJiB0aGlzLl9tYXNrXTtcbiAgfTtcblxuICBCSGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5fYnViYmxlVXAgPSBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICB2YXIgY29tcGFyZSwgaW5kZXhJblBhZ2UsIHBhcmVudEluZGV4LCBwYXJlbnRWYWx1ZTtcbiAgICBjb21wYXJlID0gdGhpcy5jb21wYXJhdG9yO1xuICAgIHdoaWxlIChpbmRleCA+IDEpIHtcbiAgICAgIGluZGV4SW5QYWdlID0gaW5kZXggJiB0aGlzLl9tYXNrO1xuICAgICAgaWYgKGluZGV4IDwgdGhpcy5wYWdlU2l6ZSB8fCBpbmRleEluUGFnZSA+IDMpIHtcbiAgICAgICAgcGFyZW50SW5kZXggPSAoaW5kZXggJiB+dGhpcy5fbWFzaykgfCAoaW5kZXhJblBhZ2UgPj4gMSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4SW5QYWdlIDwgMikge1xuICAgICAgICBwYXJlbnRJbmRleCA9IChpbmRleCAtIHRoaXMucGFnZVNpemUpID4+IHRoaXMuX3NoaWZ0O1xuICAgICAgICBwYXJlbnRJbmRleCArPSBwYXJlbnRJbmRleCAmIH4odGhpcy5fbWFzayA+PiAxKTtcbiAgICAgICAgcGFyZW50SW5kZXggfD0gdGhpcy5wYWdlU2l6ZSA+PiAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyZW50SW5kZXggPSBpbmRleCAtIDI7XG4gICAgICB9XG4gICAgICBwYXJlbnRWYWx1ZSA9IHRoaXMuX3JlYWQocGFyZW50SW5kZXgpO1xuICAgICAgaWYgKGNvbXBhcmUocGFyZW50VmFsdWUsIHZhbHVlKSA8IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLl93cml0ZShwYXJlbnRJbmRleCwgdmFsdWUpO1xuICAgICAgdGhpcy5fd3JpdGUoaW5kZXgsIHBhcmVudFZhbHVlKTtcbiAgICAgIGluZGV4ID0gcGFyZW50SW5kZXg7XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQkhlYXBTdHJhdGVneS5wcm90b3R5cGUuX2J1YmJsZURvd24gPSBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICB2YXIgY2hpbGRJbmRleDEsIGNoaWxkSW5kZXgyLCBjaGlsZFZhbHVlMSwgY2hpbGRWYWx1ZTIsIGNvbXBhcmU7XG4gICAgY29tcGFyZSA9IHRoaXMuY29tcGFyYXRvcjtcbiAgICB3aGlsZSAoaW5kZXggPCB0aGlzLmxlbmd0aCkge1xuICAgICAgaWYgKGluZGV4ID4gdGhpcy5fbWFzayAmJiAhKGluZGV4ICYgKHRoaXMuX21hc2sgLSAxKSkpIHtcbiAgICAgICAgY2hpbGRJbmRleDEgPSBjaGlsZEluZGV4MiA9IGluZGV4ICsgMjtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggJiAodGhpcy5wYWdlU2l6ZSA+PiAxKSkge1xuICAgICAgICBjaGlsZEluZGV4MSA9IChpbmRleCAmIH50aGlzLl9tYXNrKSA+PiAxO1xuICAgICAgICBjaGlsZEluZGV4MSB8PSBpbmRleCAmICh0aGlzLl9tYXNrID4+IDEpO1xuICAgICAgICBjaGlsZEluZGV4MSA9IChjaGlsZEluZGV4MSArIDEpIDw8IHRoaXMuX3NoaWZ0O1xuICAgICAgICBjaGlsZEluZGV4MiA9IGNoaWxkSW5kZXgxICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkSW5kZXgxID0gaW5kZXggKyAoaW5kZXggJiB0aGlzLl9tYXNrKTtcbiAgICAgICAgY2hpbGRJbmRleDIgPSBjaGlsZEluZGV4MSArIDE7XG4gICAgICB9XG4gICAgICBpZiAoY2hpbGRJbmRleDEgIT09IGNoaWxkSW5kZXgyICYmIGNoaWxkSW5kZXgyIDw9IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIGNoaWxkVmFsdWUxID0gdGhpcy5fcmVhZChjaGlsZEluZGV4MSk7XG4gICAgICAgIGNoaWxkVmFsdWUyID0gdGhpcy5fcmVhZChjaGlsZEluZGV4Mik7XG4gICAgICAgIGlmIChjb21wYXJlKGNoaWxkVmFsdWUxLCB2YWx1ZSkgPCAwICYmIGNvbXBhcmUoY2hpbGRWYWx1ZTEsIGNoaWxkVmFsdWUyKSA8PSAwKSB7XG4gICAgICAgICAgdGhpcy5fd3JpdGUoY2hpbGRJbmRleDEsIHZhbHVlKTtcbiAgICAgICAgICB0aGlzLl93cml0ZShpbmRleCwgY2hpbGRWYWx1ZTEpO1xuICAgICAgICAgIGluZGV4ID0gY2hpbGRJbmRleDE7XG4gICAgICAgIH0gZWxzZSBpZiAoY29tcGFyZShjaGlsZFZhbHVlMiwgdmFsdWUpIDwgMCkge1xuICAgICAgICAgIHRoaXMuX3dyaXRlKGNoaWxkSW5kZXgyLCB2YWx1ZSk7XG4gICAgICAgICAgdGhpcy5fd3JpdGUoaW5kZXgsIGNoaWxkVmFsdWUyKTtcbiAgICAgICAgICBpbmRleCA9IGNoaWxkSW5kZXgyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNoaWxkSW5kZXgxIDw9IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIGNoaWxkVmFsdWUxID0gdGhpcy5fcmVhZChjaGlsZEluZGV4MSk7XG4gICAgICAgIGlmIChjb21wYXJlKGNoaWxkVmFsdWUxLCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgICAgdGhpcy5fd3JpdGUoY2hpbGRJbmRleDEsIHZhbHVlKTtcbiAgICAgICAgICB0aGlzLl93cml0ZShpbmRleCwgY2hpbGRWYWx1ZTEpO1xuICAgICAgICAgIGluZGV4ID0gY2hpbGRJbmRleDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIHJldHVybiBCSGVhcFN0cmF0ZWd5O1xuXG59KSgpO1xuXG5cbn0se31dLDU6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xudmFyIEJpbmFyeUhlYXBTdHJhdGVneTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5hcnlIZWFwU3RyYXRlZ3kgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEJpbmFyeUhlYXBTdHJhdGVneShvcHRpb25zKSB7XG4gICAgdmFyIHJlZjtcbiAgICB0aGlzLmNvbXBhcmF0b3IgPSAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5jb21wYXJhdG9yIDogdm9pZCAwKSB8fCBmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYSAtIGI7XG4gICAgfTtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5kYXRhID0gKChyZWYgPSBvcHRpb25zLmluaXRpYWxWYWx1ZXMpICE9IG51bGwgPyByZWYuc2xpY2UoMCkgOiB2b2lkIDApIHx8IFtdO1xuICAgIHRoaXMuX2hlYXBpZnkoKTtcbiAgfVxuXG4gIEJpbmFyeUhlYXBTdHJhdGVneS5wcm90b3R5cGUuX2hlYXBpZnkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaSwgaiwgcmVmO1xuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChpID0gaiA9IDEsIHJlZiA9IHRoaXMuZGF0YS5sZW5ndGg7IDEgPD0gcmVmID8gaiA8IHJlZiA6IGogPiByZWY7IGkgPSAxIDw9IHJlZiA/ICsraiA6IC0taikge1xuICAgICAgICB0aGlzLl9idWJibGVVcChpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBCaW5hcnlIZWFwU3RyYXRlZ3kucHJvdG90eXBlLnF1ZXVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB0aGlzLmRhdGEucHVzaCh2YWx1ZSk7XG4gICAgdGhpcy5fYnViYmxlVXAodGhpcy5kYXRhLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQmluYXJ5SGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhc3QsIHJldDtcbiAgICByZXQgPSB0aGlzLmRhdGFbMF07XG4gICAgbGFzdCA9IHRoaXMuZGF0YS5wb3AoKTtcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZGF0YVswXSA9IGxhc3Q7XG4gICAgICB0aGlzLl9idWJibGVEb3duKDApO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIEJpbmFyeUhlYXBTdHJhdGVneS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFbMF07XG4gIH07XG5cbiAgQmluYXJ5SGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmRhdGEubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9O1xuXG4gIEJpbmFyeUhlYXBTdHJhdGVneS5wcm90b3R5cGUuX2J1YmJsZVVwID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgdmFyIHBhcmVudCwgeDtcbiAgICB3aGlsZSAocG9zID4gMCkge1xuICAgICAgcGFyZW50ID0gKHBvcyAtIDEpID4+PiAxO1xuICAgICAgaWYgKHRoaXMuY29tcGFyYXRvcih0aGlzLmRhdGFbcG9zXSwgdGhpcy5kYXRhW3BhcmVudF0pIDwgMCkge1xuICAgICAgICB4ID0gdGhpcy5kYXRhW3BhcmVudF07XG4gICAgICAgIHRoaXMuZGF0YVtwYXJlbnRdID0gdGhpcy5kYXRhW3Bvc107XG4gICAgICAgIHRoaXMuZGF0YVtwb3NdID0geDtcbiAgICAgICAgcG9zID0gcGFyZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQmluYXJ5SGVhcFN0cmF0ZWd5LnByb3RvdHlwZS5fYnViYmxlRG93biA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciBsYXN0LCBsZWZ0LCBtaW5JbmRleCwgcmlnaHQsIHg7XG4gICAgbGFzdCA9IHRoaXMuZGF0YS5sZW5ndGggLSAxO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBsZWZ0ID0gKHBvcyA8PCAxKSArIDE7XG4gICAgICByaWdodCA9IGxlZnQgKyAxO1xuICAgICAgbWluSW5kZXggPSBwb3M7XG4gICAgICBpZiAobGVmdCA8PSBsYXN0ICYmIHRoaXMuY29tcGFyYXRvcih0aGlzLmRhdGFbbGVmdF0sIHRoaXMuZGF0YVttaW5JbmRleF0pIDwgMCkge1xuICAgICAgICBtaW5JbmRleCA9IGxlZnQ7XG4gICAgICB9XG4gICAgICBpZiAocmlnaHQgPD0gbGFzdCAmJiB0aGlzLmNvbXBhcmF0b3IodGhpcy5kYXRhW3JpZ2h0XSwgdGhpcy5kYXRhW21pbkluZGV4XSkgPCAwKSB7XG4gICAgICAgIG1pbkluZGV4ID0gcmlnaHQ7XG4gICAgICB9XG4gICAgICBpZiAobWluSW5kZXggIT09IHBvcykge1xuICAgICAgICB4ID0gdGhpcy5kYXRhW21pbkluZGV4XTtcbiAgICAgICAgdGhpcy5kYXRhW21pbkluZGV4XSA9IHRoaXMuZGF0YVtwb3NdO1xuICAgICAgICB0aGlzLmRhdGFbcG9zXSA9IHg7XG4gICAgICAgIHBvcyA9IG1pbkluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgcmV0dXJuIEJpbmFyeUhlYXBTdHJhdGVneTtcblxufSkoKTtcblxuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanMtcHJpb3JpdHktcXVldWUvcHJpb3JpdHktcXVldWUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgR3JhcGgsIE5vZGUsIEVkZ2UgfSBmcm9tICcuL2dyYXBoJztcclxuaW1wb3J0IERyYXcgZnJvbSAnLi9kcmF3JztcclxuaW1wb3J0ICogYXMgQ05TIGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbmNsYXNzIE1hemVHZW5lcmF0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcykge1xyXG4gICAgdGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHRoaXMuZHJhdyA9IG5ldyBEcmF3KGNhbnZhcywgdGhpcy5jdHgpO1xyXG5cclxuICAgIC8vIHVuZGlyZWN0ZWQgZ3JhcGggdG8gd2hpY2ggd2Ugd2lsbCBhZGQgcmFuZG9tIGVkZ2Ugd2VpZ2h0c1xyXG4gICAgdGhpcy5ncmFwaCA9IG5ldyBHcmFwaCgpO1xyXG5cclxuICAgIC8vIHRoZSBmcm9udGllciByZXByZXNlbnRzIHRoZSBjZWxscyB0aGF0IHN1cnJvdW5kIG9yICd3YWxsIGluJyB0aGUgbWF6ZSBwYXRoXHJcbiAgICAvLyBpLmUuIHRoZSBjZWxscyB0aGF0IGFyZW4ndCAncGFydCcgb2YgdGhlIG1hemUgYnV0IGFyZSBuZWlnaGJvcnMgb2YgY3VycmVudCBjZWxsXHJcbiAgICB0aGlzLmZyb250aWVyID0gW107XHJcblxyXG4gICAgLy8gbWluaW11bSBzcGFubmluZyB0cmVlIChNU1QpIC0+IGFsbCB0aGUgZWRnZXMgb2Ygb3VyIGVkZ2Utd2VpZ2h0ZWQsIHVuZGlyZWN0ZWRcclxuICAgIC8vIGdyYXBoIHRoYXQgY29ubmVjdHMgYWxsIHRoZSB2ZXJ0aWNlcyB3aXRoIHRoZSBtaW5pbXVtIHBvc3NpYmxlIHRvdGFsIGVkZ2Ugd2VpZ2h0XHJcbiAgICAvLyB0aGlzIGlzIGEgc3Vic2V0IG9mIHRoaXMuZ3JhcGguY29sbGVjdGlvbiByZXByZXNlbnRlZCBieSBhbiBhZGphY2VuY3kgbGlzdFxyXG4gICAgLy8gaW4gYW4gb2JqZWN0LCB3aGVyZSB0aGUga2V5IGlzIHRoZSBub2RlIGlkZW50aWZpZXIgJiB0aGUgdmFsdWUgaXMgYW4gYXJyYXkgb2YgbmVpZ2hib3JzXHJcbiAgICB0aGlzLnRyZWUgPSB7fTtcclxuICB9XHJcblxyXG4gIGdyaWQoKSB7XHJcbiAgICAvLyBpbml0aWFsaXplICYgYnVpbGQgdGhlIG1hemUgZ3JpZCBwb2ludHNcclxuICAgIC8vIHRoZSBncmlkIHBvaW50cyBhcmUgY29kZWQgaW4gYSBgLi4tTm9kZS1FZGdlLU5vZGUtRWRnZS0uLmAgcGF0dGVyblxyXG4gICAgLy8gaW4gZWFjaCBkaXJlY3Rpb24uIHRoZSBNU1Qgd2lsbCBiZSBhIHN1YmdyYXBoIG9mIHRoaXMgcGF0dGVyblxyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoO1xyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBDTlMuTlVNUk9XUzsgciArPSAxKSB7XHJcbiAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl0gPSBbXTtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBDTlMuTlVNQ09MUzsgYyArPSAxKSB7XHJcbiAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyXVtjXSA9IG5ldyBOb2RlKGMsIHIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhlIHVuZGlyZWN0ZWQgZ3JhcGgncyBub2RlIGVkZ2VzIGFyZSBsaW5rZWQgaW4gZWFjaCBkaXJlY3Rpb25cclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgQ05TLk5VTVJPV1M7IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IENOUy5OVU1DT0xTOyBjICs9IDEpIHtcclxuICAgICAgICAvLyBpbiByYW5kb21pemVkIHByaW0ncywgZWRnZXMgKCdwYXNzYWdlcycpIGhhdmUgcmFuZG9tIHdlaWdodHNcclxuICAgICAgICAvLyB0aGUgYGlmYCBzdGF0ZW1lbnRzIGtlZXAgZ2VuZXJhdGlvbiB3aXRoaW4gcmFuZ2UsIHRoZW4gYXNzaWduIHdlaWdodGVkIGVkZ2VzXHJcbiAgICAgICAgaWYgKHIgIT09IENOUy5OVU1ST1dTIC0gMSkge1xyXG4gICAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyXVtjXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuU09VVEhdID1cclxuICAgICAgICAgICAgbmV3IEVkZ2UoZ3JhcGguY29sbGVjdGlvbltyXVtjXSwgZ3JhcGguY29sbGVjdGlvbltyICsgMV1bY10pO1xyXG4gICAgICAgICAgLy8gdW5kaXJlY3RlZCBsaW5rYWdlIChlZGdlIGJldHdlZW4gTiArIFMgaGFzIDEgcmFuZG9tIHdlaWdodCk6XHJcbiAgICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3IgKyAxXVtjXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuTk9SVEhdID1cclxuICAgICAgICAgICAgbmV3IEVkZ2UoZ3JhcGguY29sbGVjdGlvbltyICsgMV1bY10sIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10sXHJcbiAgICAgICAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyXVtjXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuU09VVEhdLndlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjICE9PSBDTlMuTlVNQ09MUyAtIDEpIHtcclxuICAgICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLkVBU1RdID1cclxuICAgICAgICAgICAgbmV3IEVkZ2UoZ3JhcGguY29sbGVjdGlvbltyXVtjXSwgZ3JhcGguY29sbGVjdGlvbltyXVtjICsgMV0pO1xyXG4gICAgICAgICAgLy8gdW5kaXJlY3RlZCBsaW5rYWdlIChlZGdlIGJldHdlZW4gRSArIFcgaGFzIDEgcmFuZG9tIHdlaWdodCk6XHJcbiAgICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3JdW2MgKyAxXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuV0VTVF0gPVxyXG4gICAgICAgICAgICBuZXcgRWRnZShncmFwaC5jb2xsZWN0aW9uW3JdW2MgKyAxXSwgZ3JhcGguY29sbGVjdGlvbltyXVtjXSxcclxuICAgICAgICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3JdW2NdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5FQVNUXS53ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gXCJQcmltJ3MgYWxnb3JpdGhtIGlzIGEgZ3JlZWR5IGFsZ29yaXRobSB0aGF0IGZpbmRzIGEgbWluaW11bSBzcGFubmluZyB0cmVlXHJcbiAgLy8gZm9yIGEgd2VpZ2h0ZWQgdW5kaXJlY3RlZCBncmFwaFwiIChXaWtpcGVkaWEpLiB0aGlzIGlzIGl0cyByYW5kb21pemVkIGltcGxlbWVudGF0aW9uXHJcbiAgLy8gaXQgY2FuIGJlIGFwcGxpZWQgYXMgYSBtYXplIGdlbmVyYXRpb24gYWxnb3JpdGhtIGJ5IGJ1aWxkaW5nIGEgbWF6ZSBcImZyb250aWVyXCJcclxuICBwcmltcygpIHtcclxuICAgIC8vIHRoZSBtYXplIGlzIGJ1aWx0IGFsb25nIHRoZSBlZGdlIHdpdGggdGhlIGxvd2VzdCB3ZWlnaHRcclxuICAgIC8vIHRoYXQgY2hvaWNlIG11c3Qgbm90IGNvbm5lY3Qgd2l0aCBhIHByZXZpb3VzbHkgdmlzaXRlZCBub2RlXHJcbiAgICAvLyAoMSkgb2JzZXJ2ZSB0aGUgZnJvbnRpZXIgdG8gdGhlIGN1cnJlbnQgY2VsbFxyXG4gICAgLy8gKDIpIGNvbXBhcmUgdGhlIGVkZ2Ugd2VpZ2h0cyAmIHNldCB0aGUgbWluaW11bSBjZWxsXHJcbiAgICAvLyBGSVhNRTogbm9uLWZhdGFsIHJhcmUgY29tcGxhaW50OiAnQ2Fubm90IHNldCBwcm9wZXJ0eSAnZGlzY292ZXJlZCcgb2YgbnVsbCdcclxuICAgIGxldCBuZXdFZGdlID0gbmV3IEVkZ2UobnVsbCwgbnVsbCwgMSk7IC8vIGR1bW15IGVkZ2UsIG91dHNpZGUgbWF4aW11bSB3ZWlnaHRcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mcm9udGllci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBpZiAodGhpcy5mcm9udGllcltpXS5ub2RlRnJvbS5kaXNjb3ZlcmVkICYmIHRoaXMuZnJvbnRpZXJbaV0ubm9kZVRvLmRpc2NvdmVyZWQpIHtcclxuICAgICAgICB0aGlzLmZyb250aWVyLnNwbGljZShpLCAxKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmZyb250aWVyW2ldLndlaWdodCA8IG5ld0VkZ2Uud2VpZ2h0ICYmICF0aGlzLmZyb250aWVyW2ldLm5vZGVUby5kaXNjb3ZlcmVkKSB7XHJcbiAgICAgICAgbmV3RWRnZSA9IHRoaXMuZnJvbnRpZXJbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5ld0VkZ2Uubm9kZVRvLmRpc2NvdmVyZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIHJlLWJ1aWxkIHRoZSBmcm9udGllciBhdCB0aGUgbmV3IG5vZGUgZm9yIGVhY2ggb2YgNCBkaXJlY3Rpb25zXHJcbiAgICBPYmplY3QudmFsdWVzKENOUy5ESVJFQ1RJT05TKS5mb3JFYWNoKChkaXJlY3Rpb24pID0+IHtcclxuICAgICAgLy8gdGhlcmUgc2hvdWxkIGJlIGEgY2VsbCBhdCB0aGUgZGlyZWN0aW9uICYmIGl0IHNob3VsZCBiZSB1bmRpc2NvdmVyZWRcclxuICAgICAgaWYgKFxyXG4gICAgICAgIChuZXdFZGdlLm5vZGVUby5uZWlnaGJvcnNbZGlyZWN0aW9uXSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICYmICghbmV3RWRnZS5ub2RlVG8ubmVpZ2hib3JzW2RpcmVjdGlvbl0ubm9kZVRvLmRpc2NvdmVyZWQpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuZnJvbnRpZXIucHVzaChuZXdFZGdlLm5vZGVUby5uZWlnaGJvcnNbZGlyZWN0aW9uXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGBub2RlRnJvbWAgaXMgcmVsYXRlZCB0byBgbm9kZVRvYCBieSBhbiBlZGdlXHJcbiAgICBjb25zdCBjdXJyZW50UG9zID0gYCR7bmV3RWRnZS5ub2RlRnJvbS54fSwgJHtuZXdFZGdlLm5vZGVGcm9tLnl9YDtcclxuICAgIGNvbnN0IG5leHRQb3MgPSBgJHtuZXdFZGdlLm5vZGVUby54fSwgJHtuZXdFZGdlLm5vZGVUby55fWA7XHJcblxyXG4gICAgLy8gZWFjaCBncmlkIG5vZGUgc3RvcmVzIGEgbmVpZ2hib3IgaW4gdGhlIGZvcm1hdCBbZWRnZSwgbm9kZV0gd2hlcmUgdGhlIGVkZ2VcclxuICAgIC8vIGlzIHRoZSBwYXNzYWdlIHRvIHRoZSBuZXh0IG5vZGUuIHNpbmNlIHRoaXMgaXMgYW4gdW5kaXJlY3RlZCBncmFwaCwgdGhlXHJcbiAgICAvLyBjdXJyZW50UG9zIGhhcyBhIG5laWdoYm9yIG5leHRQb3MsIGFuZCB0aGUgbmV4dFBvcyBoYXMgYSBuZWlnaGJvciBjdXJyZW50UG9zXHJcbiAgICAvLyBpZiB0aGlzIHdhcyBhIGRpcmVjdGVkIGdyYXBoLCBvbWl0IG9uZSBvZiB0aGUgdGVybmFyaWVzIC0gb2JzZXJ2ZSB0aGF0XHJcbiAgICAvLyBkZWFkLWVuZHMgd2lsbCBiZSB2ZXJ5IGNvbW1vbiB3aGVuIHVzaW5nIHJhbmRvbSBleHRyZW1lcywgc2luY2UgdGhlXHJcbiAgICAvLyBzZWFyY2ggYWxnb3JpdGhtIGlzbid0IGFsbG93ZWQgdG8gbG9vayBpbiBhbiAnb3Bwb3NpdGUnIGRpcmVjdGlvblxyXG4gICAgdGhpcy50cmVlW2N1cnJlbnRQb3NdID09PSB1bmRlZmluZWRcclxuICAgICAgPyB0aGlzLnRyZWVbY3VycmVudFBvc10gPSBbW25ld0VkZ2UsIG5ld0VkZ2Uubm9kZVRvXV1cclxuICAgICAgOiB0aGlzLnRyZWVbY3VycmVudFBvc10ucHVzaChbbmV3RWRnZSwgbmV3RWRnZS5ub2RlVG9dKTtcclxuICAgIHRoaXMudHJlZVtuZXh0UG9zXSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gdGhpcy50cmVlW25leHRQb3NdID0gW1tuZXdFZGdlLCBuZXdFZGdlLm5vZGVGcm9tXV1cclxuICAgICAgOiB0aGlzLnRyZWVbbmV4dFBvc10ucHVzaChbbmV3RWRnZSwgbmV3RWRnZS5ub2RlRnJvbV0pO1xyXG5cclxuICAgIC8vIGNvbG9yIGluIHRoZSBub2RlIHNpbmNlIGl0IHdhcyAoMSkgdmlzaXRlZCBhbmQgKDIpIGFkZGVkLCBhbmRcclxuICAgIC8vIGNvbG9yIHRoZSBlZGdlIGZyb20gdGhlIHByZXZpb3VzIG5vZGUgdG8gbm9kZVRvLCBiYXNlZCBvbiAjIG9mIG5vZGVzLlxyXG4gICAgLy8gYSBncmFkaWVudCBvZiAyMCBjb2xvcnMgZGV0ZXJtaW5lcyB0aGUgZmlsbCBjb2xvciBmb3IgdGhlIGV4dGVudCBvZiBwcm9ncmVzc1xyXG4gICAgbGV0IGNvbG9yU3RlcCA9IChPYmplY3Qua2V5cyh0aGlzLnRyZWUpLmxlbmd0aCAvIENOUy5QUk9HUkVTUyk7XHJcbiAgICBjb2xvclN0ZXAgPSAoKE1hdGguY2VpbChjb2xvclN0ZXAgKiAyMCkpIC8gMjApLnRvRml4ZWQoMik7IC8vIHJvdW5kIHRvIG5lYXJlc3QgLjA1XHJcbiAgICB0aGlzLmRyYXcuZHJhd0VkZ2UobmV3RWRnZSwgY29sb3JTdGVwKTtcclxuICAgIHRoaXMuZHJhdy5kcmF3Tm9kZShuZXdFZGdlLm5vZGVUbywgY29sb3JTdGVwKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkKCkge1xyXG4gICAgLy8gc3RhcnQgYnVpbGRpbmcgbWluaW11bSBzcGFubmluZyB0cmVlIGZyb20gdGhlIHRvcC1sZWZ0IG5vZGUgKGNhbnZhcyBjb29yZCAwLDApXHJcbiAgICBjb25zdCBmaXJzdE5vZGUgPSB0aGlzLmdyYXBoLmNvbGxlY3Rpb25bMF1bMF07XHJcbiAgICB0aGlzLmdyYXBoLmNvbGxlY3Rpb25bMF1bMF0uZGlzY292ZXJlZCA9IHRydWU7XHJcbiAgICB0aGlzLmRyYXcuZHJhd05vZGUoZmlyc3ROb2RlLCBudWxsLCBDTlMuUFJJTVNDT0xPUlNbMC4wMF0pO1xyXG4gICAgdGhpcy5pbWFnZSA9IDA7XHJcblxyXG4gICAgLy8gdGhlIHRvcC1sZWZ0IGNvcm5lciBpcyAnd2FsbGVkJyBpbiBieSAxIHNvdXRoZXJuIGNlbGwgJiAxIGVhc3Rlcm4gY2VsbFxyXG4gICAgLy8gdmlzaXQgZWl0aGVyIGJhc2VkIG9uIHJhbmRvbSB3ZWlnaHQ6IHJhbmRvbWl6ZWQgcHJpbSdzIGNob29zZXMgbG93ZXN0IGVkZ2Ugd2VpZ2h0XHJcbiAgICB0aGlzLmZyb250aWVyLnB1c2goXHJcbiAgICAgIHRoaXMuZ3JhcGguY29sbGVjdGlvblswXVswXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuU09VVEhdLFxyXG4gICAgICB0aGlzLmdyYXBoLmNvbGxlY3Rpb25bMF1bMF0ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLkVBU1RdLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyByZXBlYXQgdGhlIHByaW1zIGFsZ29yaXRobSB1bnRpbCB0aGUgZ3JhcGggaXMgY29tcGxldGVcclxuICAgIC8vIHVzZXMgYW4gYXJiaXRyYXJ5IHRpbWUgaW50ZXJ2YWwgKG1zKSBhdCB3aGljaCB0byBidWlsZCB0aGUgbWF6ZVxyXG4gICAgdGhpcy50cmVlLnByb2dyZXNzID0gMDtcclxuICAgIGNvbnN0IHRpbWUgPSAwO1xyXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucHJpbXMoKTtcclxuICAgICAgdGhpcy50cmVlLnByb2dyZXNzICs9IDE7XHJcbiAgICAgIGlmICh0aGlzLnRyZWUucHJvZ3Jlc3MgPT09IENOUy5QUk9HUkVTUykgeyAvLyBldmVyeSBub2RlIGluIGdyYXBoLmNvbGxlY3Rpb24gaXMgZGlzY292ZXJlZFxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmN0eC5nZXRJbWFnZURhdGEoMCwgMCwgQ05TLldJRFRILCBDTlMuSEVJR0hUKTtcclxuICAgICAgICB0aGlzLmZsYXNoQnV0dG9ucygpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aW1lKTtcclxuICAgIHJldHVybiB0aW1lcjsgLy8gYWNjZXNzIHRvIHNldEludGVydmFsIElEIHRvIHBlcm1pdCBjbGVhckludGVydmFsIGluIG90aGVyIHNjb3Blc1xyXG4gIH1cclxuXHJcbiAgZmxhc2hCdXR0b25zKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JmcycpLmNsYXNzTGlzdC5hZGQoJ2ZsYXNoJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGZzJykuY2xhc3NMaXN0LmFkZCgnZmxhc2gnKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmZzJykuY2xhc3NMaXN0LnJlbW92ZSgnZmxhc2gnKTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RmcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsYXNoJyk7XHJcbiAgICB9LCA3MDAwKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hemVHZW5lcmF0b3I7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dlbmVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBDTlMgZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuY2xhc3MgR3JhcGgge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jb2xsZWN0aW9uID0gW107IC8vIGNvbGxlY3Rpb24gb2Ygbm9kZXNcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggKiBDTlMuQkxPQ0tXSURUSDtcclxuICAgIHRoaXMueSA9IHkgKiBDTlMuQkxPQ0tXSURUSDtcclxuICAgIHRoaXMubmVpZ2hib3JzID0gW107IC8vIG5vZGUncyBuZWlnaGJvcmluZyBlZGdlc1xyXG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2NvdmVyZWQgPSBmYWxzZTsgLy8gdHJ1ZSB3aGVuIGFkZGVkIHRvIE1TVFxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRWRnZSB7XHJcbiAgY29uc3RydWN0b3Iobm9kZUZyb20sIG5vZGVUbywgd2VpZ2h0ID0gTWF0aC5yYW5kb20oKSkge1xyXG4gICAgdGhpcy5ub2RlRnJvbSA9IG5vZGVGcm9tO1xyXG4gICAgdGhpcy5ub2RlVG8gPSBub2RlVG87XHJcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDsgLy8gZWRnZXMgaW5pdGlhbGl6ZWQgd2l0aCBhIHJhbmRvbSB3ZWlnaHRcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEdyYXBoLCBOb2RlLCBFZGdlIH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dyYXBoLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=