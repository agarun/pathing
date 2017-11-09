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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(1);


class Draw {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.drawn = {};
  }

  drawEdge(edge, colorStep, customColor) {
    this.ctx.fillStyle = customColor || __WEBPACK_IMPORTED_MODULE_0__constants_js__["h" /* PRIMSCOLORS */][colorStep];
    this.ctx.fillRect(
      ((edge.nodeFrom.x + edge.nodeTo.x) / 2), // edge is in btwn nodeFrom & nodeTo
      ((edge.nodeFrom.y + edge.nodeTo.y) / 2),
      __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */],
    );
  }

  drawNode(node, colorStep, customColor) {
    const [x, y] = Draw.destructurePosition(node);
    this.ctx.fillStyle = customColor || __WEBPACK_IMPORTED_MODULE_0__constants_js__["h" /* PRIMSCOLORS */][colorStep];
    this.ctx.fillRect(x, y, __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */]);
  }

  drawPath(nodes, style, force) {
    this.ctx.fillStyle = style === 'visit' ? __WEBPACK_IMPORTED_MODULE_0__constants_js__["l" /* VISITCOLOR */] : __WEBPACK_IMPORTED_MODULE_0__constants_js__["j" /* SOLUTIONCOLOR */];

    nodes.forEach((node) => {
      const edgeId = `${node[0].nodeFrom.x} ${node[0].nodeFrom.y} ${node[0].nodeTo.x} ${node[0].nodeTo.y}`;
      if (!this.drawn[edgeId] || force) {
        this.drawEdge(node[0]);
        this.drawn[edgeId] = true;
      }
      const [x, y] = Draw.destructurePosition(node[1]);
      const nodeId = `${x} | ${y}`;
      if (!this.drawn[nodeId] || force) {
        this.ctx.fillRect(x, y, __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */]);
        this.drawn[nodeId] = true;
      }
    });
  }

  // TODO: DRY
  drawEnds(nodes) {
    const startAndEnd = nodes.map(node => node.split(', '));
    this.ctx.strokeStyle = __WEBPACK_IMPORTED_MODULE_0__constants_js__["j" /* SOLUTIONCOLOR */];
    this.ctx.lineWidth = 4;
    this.ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants_js__["k" /* STARTCOLOR */];
    this.ctx.fillRect(startAndEnd[0][0], startAndEnd[0][1], (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5));
    this.ctx.strokeRect(startAndEnd[0][0] - (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] / 4), startAndEnd[0][1] - (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] / 4), (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5));
    this.ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_0__constants_js__["d" /* ENDCOLOR */];
    this.ctx.fillRect(startAndEnd[1][0], startAndEnd[1][1], (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5));
    this.ctx.strokeRect(startAndEnd[1][0] - (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] / 4), startAndEnd[1][1] - (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] / 4), (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5), (__WEBPACK_IMPORTED_MODULE_0__constants_js__["b" /* CELLSIZE */] * 1.5));
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bfs_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dfs_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generator_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__draw_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_js__ = __webpack_require__(1);






const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const draw = new __WEBPACK_IMPORTED_MODULE_3__draw_js__["a" /* default */](canvas, canvas.getContext('2d'));
canvas.width = __WEBPACK_IMPORTED_MODULE_4__constants_js__["m" /* WIDTH */];
canvas.height = __WEBPACK_IMPORTED_MODULE_4__constants_js__["e" /* HEIGHT */];

document.addEventListener('DOMContentLoaded', () => {
  generateMaze(); // begin drawing maze on page load
}, false);
document.getElementById('bfs').addEventListener('click', doSearch, false);
document.getElementById('dfs').addEventListener('click', doSearch, false);
document.getElementById('generate').addEventListener('click', generateMaze, false);
document.getElementById('randomize').addEventListener('click', randomizeStartAndEnd, false);

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
    const maze = new __WEBPACK_IMPORTED_MODULE_2__generator_js__["a" /* default */](canvas);
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
  end = `${__WEBPACK_IMPORTED_MODULE_4__constants_js__["m" /* WIDTH */] - __WEBPACK_IMPORTED_MODULE_4__constants_js__["a" /* BLOCKWIDTH */]}, ${__WEBPACK_IMPORTED_MODULE_4__constants_js__["e" /* HEIGHT */] - __WEBPACK_IMPORTED_MODULE_4__constants_js__["a" /* BLOCKWIDTH */]}`;
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
  if (mst.progress === __WEBPACK_IMPORTED_MODULE_4__constants_js__["i" /* PROGRESS */]) {
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
      searchAlgorithm = new __WEBPACK_IMPORTED_MODULE_0__bfs_js__["a" /* default */](
        canvas,
        mst,
        start,
        end,
      );
      intervalId = searchAlgorithm.search();
    } else if (id === 'dfs') {
      searchAlgorithm = new __WEBPACK_IMPORTED_MODULE_1__dfs_js__["a" /* default */](
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draw_js__ = __webpack_require__(0);


class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new __WEBPACK_IMPORTED_MODULE_0__draw_js__["a" /* default */](canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.queue = [];
    this.meta = {}; // limited spanning tree object used solely for path information
    this.searching = 0; // 1: performing search, 0: waiting to search
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

        // grab each neighbor node of the current cell, format into key `x, y`
        // graph[currentNode][i][0] is the edge to the graph[currentNode][i][1] node
        // i.e. the neighbors in the adj. list are represented by [[edge, node], ..]
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
            this.queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // practically, executing `else` should be impossible, since MSTs connect *all* vertices
        clearInterval(timer);
        return console.log('No solution in this direction');
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

/* harmony default export */ __webpack_exports__["a"] = (BreadthFirstSearch);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draw_js__ = __webpack_require__(0);


class DepthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new __WEBPACK_IMPORTED_MODULE_0__draw_js__["a" /* default */](canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.stack = [];
    this.meta = {}; // limited spanning tree object used solely for path information
    this.searching = 0; // 1: performing search, 0: waiting to search
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
        const currentNode = stack.pop(); // node position representation

        // draw the current node being visited and the passage that was used to get there
        if (Object.keys(meta).length) {
          this.draw.drawPath([[meta[currentNode][0][0], currentNode]], 'visit');
        }

        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the edge to the graph[currentNode][i][1] node
        // i.e. the neighbors in the adj. list are represented by [[edge, node], ..]
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
            this.stack.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // practically, executing `else` should be impossible, since MSTs connect *all* vertices
        clearInterval(timer);
        return console.log('No solution in this direction');
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graph_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draw_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_js__ = __webpack_require__(1);




class MazeGenerator {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw = new __WEBPACK_IMPORTED_MODULE_1__draw_js__["a" /* default */](canvas, this.ctx);

    // undirected graph to which we will add random edge weights
    this.graph = new __WEBPACK_IMPORTED_MODULE_0__graph_js__["b" /* Graph */]();

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
    for (let r = 0; r < __WEBPACK_IMPORTED_MODULE_2__constants_js__["g" /* NUMROWS */]; r += 1) {
      graph.collection[r] = [];
      for (let c = 0; c < __WEBPACK_IMPORTED_MODULE_2__constants_js__["f" /* NUMCOLS */]; c += 1) {
        graph.collection[r][c] = new __WEBPACK_IMPORTED_MODULE_0__graph_js__["c" /* Node */](c, r);
      }
    }

    // the undirected graph's node edges are linked in each direction
    for (let r = 0; r < __WEBPACK_IMPORTED_MODULE_2__constants_js__["g" /* NUMROWS */]; r += 1) {
      for (let c = 0; c < __WEBPACK_IMPORTED_MODULE_2__constants_js__["f" /* NUMCOLS */]; c += 1) {
        // in randomized prim's, edges ('passages') have random weights
        // the `if` statements keep generation within range, then assign weighted edges
        if (r !== __WEBPACK_IMPORTED_MODULE_2__constants_js__["g" /* NUMROWS */] - 1) {
          graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].SOUTH] =
            new __WEBPACK_IMPORTED_MODULE_0__graph_js__["a" /* Edge */](graph.collection[r][c], graph.collection[r + 1][c]);
          // undirected linkage (edge between N + S has 1 random weight):
          graph.collection[r + 1][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].NORTH] =
            new __WEBPACK_IMPORTED_MODULE_0__graph_js__["a" /* Edge */](graph.collection[r + 1][c], graph.collection[r][c],
              graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].SOUTH].weight);
        }
        if (c !== __WEBPACK_IMPORTED_MODULE_2__constants_js__["f" /* NUMCOLS */] - 1) {
          graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].EAST] =
            new __WEBPACK_IMPORTED_MODULE_0__graph_js__["a" /* Edge */](graph.collection[r][c], graph.collection[r][c + 1]);
          // undirected linkage (edge between E + W has 1 random weight):
          graph.collection[r][c + 1].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].WEST] =
            new __WEBPACK_IMPORTED_MODULE_0__graph_js__["a" /* Edge */](graph.collection[r][c + 1], graph.collection[r][c],
              graph.collection[r][c].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].EAST].weight);
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
    let newEdge = new __WEBPACK_IMPORTED_MODULE_0__graph_js__["a" /* Edge */](null, null, 1); // dummy edge, outside maximum weight
    for (let i = 0; i < this.frontier.length; i += 1) {
      if (this.frontier[i].nodeFrom.discovered && this.frontier[i].nodeTo.discovered) {
        this.frontier.splice(i, 1);
      } else if (this.frontier[i].weight < newEdge.weight && !this.frontier[i].nodeTo.discovered) {
        newEdge = this.frontier[i];
      }
    }
    newEdge.nodeTo.discovered = true;

    // re-build the frontier at the new node for each of 4 directions
    Object.values(__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */]).forEach((direction) => {
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
    let colorStep = (Object.keys(this.tree).length / __WEBPACK_IMPORTED_MODULE_2__constants_js__["i" /* PROGRESS */]);
    colorStep = ((Math.ceil(colorStep * 20)) / 20).toFixed(2); // round to nearest .05
    this.draw.drawEdge(newEdge, colorStep);
    this.draw.drawNode(newEdge.nodeTo, colorStep);
  }

  build() {
    // start building minimum spanning tree from the top-left node (canvas coord 0,0)
    const firstNode = this.graph.collection[0][0];
    this.graph.collection[0][0].discovered = true;
    this.draw.drawNode(firstNode, null, __WEBPACK_IMPORTED_MODULE_2__constants_js__["h" /* PRIMSCOLORS */][0.00]);
    this.image = 0;

    // the top-left corner is 'walled' in by 1 southern cell & 1 eastern cell
    // visit either based on random weight: randomized prim's chooses lowest edge weight
    this.frontier.push(
      this.graph.collection[0][0].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].SOUTH],
      this.graph.collection[0][0].neighbors[__WEBPACK_IMPORTED_MODULE_2__constants_js__["c" /* DIRECTIONS */].EAST],
    );

    // repeat the prims algorithm until the graph is complete
    // uses an arbitrary time interval (ms) at which to build the maze
    this.tree.progress = 0;
    const time = 0;
    const timer = setInterval(() => {
      this.prims();
      this.tree.progress += 1;
      if (this.tree.progress === __WEBPACK_IMPORTED_MODULE_2__constants_js__["i" /* PROGRESS */]) { // every node in graph.collection is discovered
        clearInterval(timer);
        this.image = this.ctx.getImageData(0, 0, __WEBPACK_IMPORTED_MODULE_2__constants_js__["m" /* WIDTH */], __WEBPACK_IMPORTED_MODULE_2__constants_js__["e" /* HEIGHT */]);
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Graph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Node; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Edge; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(1);


class Graph {
  constructor() {
    this.collection = []; // collection of nodes
  }
}

class Node {
  constructor(x, y) {
    this.x = x * __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* BLOCKWIDTH */];
    this.y = y * __WEBPACK_IMPORTED_MODULE_0__constants_js__["a" /* BLOCKWIDTH */];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzI5Mjc2MTUxMDI3Y2UyM2ZkMWYiLCJ3ZWJwYWNrOi8vLy4vanMvZHJhdy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9iZnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvZGZzLmpzIiwid2VicGFjazovLy8uL2pzL2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9ncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUcsaUJBQWlCLEdBQUcsaUJBQWlCO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsRUFBRSxLQUFLLEVBQUU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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Q2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDNUpBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRVEiLCJmaWxlIjoiLi4vcHVibGljL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMyOTI3NjE1MTAyN2NlMjNmZDFmIiwiaW1wb3J0ICogYXMgQ05TIGZyb20gJy4vY29uc3RhbnRzLmpzJztcclxuXHJcbmNsYXNzIERyYXcge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgY3R4KSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgdGhpcy5kcmF3biA9IHt9O1xyXG4gIH1cclxuXHJcbiAgZHJhd0VkZ2UoZWRnZSwgY29sb3JTdGVwLCBjdXN0b21Db2xvcikge1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY3VzdG9tQ29sb3IgfHwgQ05TLlBSSU1TQ09MT1JTW2NvbG9yU3RlcF07XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdChcclxuICAgICAgKChlZGdlLm5vZGVGcm9tLnggKyBlZGdlLm5vZGVUby54KSAvIDIpLCAvLyBlZGdlIGlzIGluIGJ0d24gbm9kZUZyb20gJiBub2RlVG9cclxuICAgICAgKChlZGdlLm5vZGVGcm9tLnkgKyBlZGdlLm5vZGVUby55KSAvIDIpLFxyXG4gICAgICBDTlMuQ0VMTFNJWkUsIENOUy5DRUxMU0laRSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBkcmF3Tm9kZShub2RlLCBjb2xvclN0ZXAsIGN1c3RvbUNvbG9yKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBEcmF3LmRlc3RydWN0dXJlUG9zaXRpb24obm9kZSk7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjdXN0b21Db2xvciB8fCBDTlMuUFJJTVNDT0xPUlNbY29sb3JTdGVwXTtcclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHgsIHksIENOUy5DRUxMU0laRSwgQ05TLkNFTExTSVpFKTtcclxuICB9XHJcblxyXG4gIGRyYXdQYXRoKG5vZGVzLCBzdHlsZSwgZm9yY2UpIHtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHN0eWxlID09PSAndmlzaXQnID8gQ05TLlZJU0lUQ09MT1IgOiBDTlMuU09MVVRJT05DT0xPUjtcclxuXHJcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVkZ2VJZCA9IGAke25vZGVbMF0ubm9kZUZyb20ueH0gJHtub2RlWzBdLm5vZGVGcm9tLnl9ICR7bm9kZVswXS5ub2RlVG8ueH0gJHtub2RlWzBdLm5vZGVUby55fWA7XHJcbiAgICAgIGlmICghdGhpcy5kcmF3bltlZGdlSWRdIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgdGhpcy5kcmF3RWRnZShub2RlWzBdKTtcclxuICAgICAgICB0aGlzLmRyYXduW2VkZ2VJZF0gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IFt4LCB5XSA9IERyYXcuZGVzdHJ1Y3R1cmVQb3NpdGlvbihub2RlWzFdKTtcclxuICAgICAgY29uc3Qgbm9kZUlkID0gYCR7eH0gfCAke3l9YDtcclxuICAgICAgaWYgKCF0aGlzLmRyYXduW25vZGVJZF0gfHwgZm9yY2UpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh4LCB5LCBDTlMuQ0VMTFNJWkUsIENOUy5DRUxMU0laRSk7XHJcbiAgICAgICAgdGhpcy5kcmF3bltub2RlSWRdID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBEUllcclxuICBkcmF3RW5kcyhub2Rlcykge1xyXG4gICAgY29uc3Qgc3RhcnRBbmRFbmQgPSBub2Rlcy5tYXAobm9kZSA9PiBub2RlLnNwbGl0KCcsICcpKTtcclxuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gQ05TLlNPTFVUSU9OQ09MT1I7XHJcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSA0O1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gQ05TLlNUQVJUQ09MT1I7XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdChzdGFydEFuZEVuZFswXVswXSwgc3RhcnRBbmRFbmRbMF1bMV0sIChDTlMuQ0VMTFNJWkUgKiAxLjUpLCAoQ05TLkNFTExTSVpFICogMS41KSk7XHJcbiAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHN0YXJ0QW5kRW5kWzBdWzBdIC0gKENOUy5DRUxMU0laRSAvIDQpLCBzdGFydEFuZEVuZFswXVsxXSAtIChDTlMuQ0VMTFNJWkUgLyA0KSwgKENOUy5DRUxMU0laRSAqIDEuNSksIChDTlMuQ0VMTFNJWkUgKiAxLjUpKTtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IENOUy5FTkRDT0xPUjtcclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHN0YXJ0QW5kRW5kWzFdWzBdLCBzdGFydEFuZEVuZFsxXVsxXSwgKENOUy5DRUxMU0laRSAqIDEuNSksIChDTlMuQ0VMTFNJWkUgKiAxLjUpKTtcclxuICAgIHRoaXMuY3R4LnN0cm9rZVJlY3Qoc3RhcnRBbmRFbmRbMV1bMF0gLSAoQ05TLkNFTExTSVpFIC8gNCksIHN0YXJ0QW5kRW5kWzFdWzFdIC0gKENOUy5DRUxMU0laRSAvIDQpLCAoQ05TLkNFTExTSVpFICogMS41KSwgKENOUy5DRUxMU0laRSAqIDEuNSkpO1xyXG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZGVzdHJ1Y3R1cmVQb3NpdGlvbihub2RlUG9zaXRpb24pIHtcclxuICAgIGlmICh0eXBlb2Ygbm9kZVBvc2l0aW9uID09PSAnc3RyaW5nJyB8fCBub2RlUG9zaXRpb24gaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIG5vZGVQb3NpdGlvbi5zcGxpdCgnLCAnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbbm9kZVBvc2l0aW9uLngsIG5vZGVQb3NpdGlvbi55XTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYXc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZHJhdy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjb25zdCBXSURUSCA9IDEwMDg7XHJcbmNvbnN0IEhFSUdIVCA9IDYyNDtcclxuXHJcbmNvbnN0IENFTExTSVpFID0gODtcclxuY29uc3QgQkxPQ0tXSURUSCA9IENFTExTSVpFICogMjtcclxuXHJcbi8vIGVhY2ggbm9kZSB3aWxsIGhhdmUgYSBjb3JyZXNwb25kaW5nIGNlbGwgaW4gdGhlIGdyYXBoJ3MgY29sbGVjdGlvbiBhcnJheVxyXG5jb25zdCBOVU1ST1dTID0gSEVJR0hUIC8gQkxPQ0tXSURUSDtcclxuY29uc3QgTlVNQ09MUyA9IFdJRFRIIC8gQkxPQ0tXSURUSDtcclxuXHJcbi8vIHRvIG9ic2VydmUgYSBjZWxsJ3Mgc3Vycm91bmRpbmdzLCB3ZSBzdG9yZSBpbmZvcm1hdGlvbiBhYm91dCBlYWNoIG9mIHRoZWlyIG5laWdoYm9yc1xyXG5jb25zdCBESVJFQ1RJT05TID0ge1xyXG4gIE5PUlRIOiAwLCAvLyAgIDBcclxuICBTT1VUSDogMiwgLy8gMyAqIDFcclxuICBFQVNUOiAxLCAvLyAgICAyXHJcbiAgV0VTVDogMyxcclxufTtcclxuXHJcbi8vIHNldEludGVydmFsKCkgdGVybWluYXRlcyB3aGVuIGVhY2ggbm9kZSBvZiBOVU1ST1dTICYgTlVNQ09MUyBpcyB0cmF2ZXJzZWRcclxuY29uc3QgUFJPR1JFU1MgPSAoKFdJRFRIICogSEVJR0hUKSAvIChCTE9DS1dJRFRIICoqIDIpKSAtIDE7XHJcblxyXG4vLyBUT0RPOiBjb25zdCBQQVRIQ09MT1JTIHdpbGwgZHJhdyB0aGUgcGF0aCB0byB0aGUgdGFyZ2V0IG5vZGUgd2l0aCBjb2xvciBwcm9ncmVzc2lvblxyXG5jb25zdCBQUklNU0NPTE9SUyA9IHtcclxuICAwLjAwOiBcIiNmNWZmZjlcIiwgMC4wNTogJyNlNGZlZWYnLCAwLjEwOiAnI2RiZjdlNycsXHJcbiAgMC4xNTogJyNjOWZhZGUnLCAwLjIwOiAnI2JjZjdkNicsIDAuMjU6ICcjYjJmNmQwJyxcclxuICAwLjMwOiAnI2E5ZmNjZScsIDAuMzU6ICcjOThmNWMxJywgMC40MDogJyM4ZWZmYmYnLFxyXG4gIDAuNDU6ICcjODJmY2I4JywgMC41MDogJyM3ZmZjYjcnLCAwLjU1OiAnIzY2ZmNhNycsXHJcbiAgMC42MDogJyM1NWZiOWQnLCAwLjY1OiAnIzQ5ZmY5OCcsIDAuNzA6ICcjMzlmNjhiJyxcclxuICAwLjc1OiAnIzM4ZmM4ZCcsIDAuODA6ICcjMzBmYjg4JywgMC44NTogJyMyN2ZiODMnLFxyXG4gIDAuOTA6ICcjMWNmYzdkJywgMC45NTogJyMxY2ZjN2QnLCAxLjAwOiAnIzFjZmM3ZCcsXHJcbn07XHJcbmNvbnN0IFZJU0lUQ09MT1IgPSAncmdiYSgyNDksIDYzLCA0NCwgMC45MiknOyAvLyBOT1RFOiBtaWdodCB3YW50IHRvIHJlbW92ZSBvcGFjaXR5XHJcbmNvbnN0IFNPTFVUSU9OQ09MT1IgPSAnI2ZmZTYwMCc7XHJcbmNvbnN0IFNUQVJUQ09MT1IgPSAnIzRkOTgwMyc7XHJcbmNvbnN0IEVORENPTE9SID0gJyM4NzA3NDEnO1xyXG5cclxuZXhwb3J0IHtcclxuICBXSURUSCxcclxuICBIRUlHSFQsXHJcbiAgQ0VMTFNJWkUsXHJcbiAgQkxPQ0tXSURUSCxcclxuICBOVU1ST1dTLFxyXG4gIE5VTUNPTFMsXHJcbiAgRElSRUNUSU9OUyxcclxuICBQUk9HUkVTUyxcclxuICBQUklNU0NPTE9SUyxcclxuICBWSVNJVENPTE9SLFxyXG4gIFNPTFVUSU9OQ09MT1IsXHJcbiAgU1RBUlRDT0xPUixcclxuICBFTkRDT0xPUixcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb25zdGFudHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEJyZWFkdGhGaXJzdFNlYXJjaCBmcm9tICcuL2Jmcy5qcyc7XHJcbmltcG9ydCBEZXB0aEZpcnN0U2VhcmNoIGZyb20gJy4vZGZzLmpzJztcclxuaW1wb3J0IE1hemVHZW5lcmF0b3IgZnJvbSAnLi9nZW5lcmF0b3IuanMnO1xyXG5pbXBvcnQgRHJhdyBmcm9tICcuL2RyYXcuanMnO1xyXG5pbXBvcnQgKiBhcyBDTlMgZnJvbSAnLi9jb25zdGFudHMuanMnO1xyXG5cclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuY29uc3QgZHJhdyA9IG5ldyBEcmF3KGNhbnZhcywgY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xyXG5jYW52YXMud2lkdGggPSBDTlMuV0lEVEg7XHJcbmNhbnZhcy5oZWlnaHQgPSBDTlMuSEVJR0hUO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBnZW5lcmF0ZU1hemUoKTsgLy8gYmVnaW4gZHJhd2luZyBtYXplIG9uIHBhZ2UgbG9hZFxyXG59LCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvU2VhcmNoLCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZnMnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRvU2VhcmNoLCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZW5lcmF0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2VuZXJhdGVNYXplLCBmYWxzZSk7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb21pemUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJhbmRvbWl6ZVN0YXJ0QW5kRW5kLCBmYWxzZSk7XHJcblxyXG5sZXQgZ3JhcGg7XHJcbmxldCBtc3Q7XHJcbmxldCBpbnRlcnZhbElkO1xyXG5cclxubGV0IHNlYXJjaEFsZ29yaXRobSA9IHsgc2VhcmNoaW5nOiAwIH07XHJcbmxldCBzdGFydDtcclxubGV0IGVuZDtcclxubGV0IHNlYXJjaGVkO1xyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVNYXplKCkge1xyXG4gIC8vIGZsdXNoIHRoZSBjYW52YXNcclxuICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gIC8vIGlmIHRoaXMgaXNuJ3QgdGhlIGZpcnN0IHRpbWUgcnVubmluZyBnZW5lcmF0ZU1hemUoKSwgY2FuY2VsIHRoZSBsYXN0IGF0dGVtcHRcclxuICBpZiAoaW50ZXJ2YWxJZCAhPT0gdW5kZWZpbmVkKSBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG5cclxuICAvLyBydW4gcmFuZG9taXplZCBwcmltJ3MgYWxnb3JpdGhtIHRvIGdlbmVyYXRlIGEgbWF6ZVxyXG4gIGNvbnN0IGRvUHJpbXMgPSBmdW5jdGlvbiBkb1ByaW1zKCkge1xyXG4gICAgY29uc3QgbWF6ZSA9IG5ldyBNYXplR2VuZXJhdG9yKGNhbnZhcyk7XHJcbiAgICBjb25zdCBncmlkID0gbWF6ZS5ncmlkKCk7XHJcbiAgICBjb25zdCB0aW1lcklkID0gbWF6ZS5idWlsZCgpO1xyXG4gICAgZ3JhcGggPSBtYXplO1xyXG4gICAgbXN0ID0gbWF6ZS50cmVlO1xyXG4gICAgcmV0dXJuIHRpbWVySWQ7XHJcbiAgfTtcclxuICBpbnRlcnZhbElkID0gZG9QcmltcygpO1xyXG5cclxuICAvLyByZXNldCBhbGwgc2VhcmNoIHN0YXRlcyBhbmQgZmx1c2ggc3RhcnQgYW5kIGVuZCBwb2ludHMgKHVzZXIgY2FuIHJlcGVhdCBzZWFyY2hlcylcclxuICBzZWFyY2hBbGdvcml0aG0uc2VhcmNoaW5nID0gMDtcclxuICBbc3RhcnQsIGVuZF0gPSBbbnVsbCwgbnVsbF07XHJcbiAgc2VhcmNoZWQgPSAwO1xyXG59XHJcblxyXG4vLyB3aGVuIGByYW5kb21pemVgIGlzIG5vdCBjYWxsZWQsIHVzZSB0b3AtbGVmdCAmIGJvdHRvbS1yaWdodCBjb3JuZXJzIGFzIHN0YXJ0ICYgZW5kIHBvaW50c1xyXG5mdW5jdGlvbiBkZWZhdWx0U3RhcnRBbmRFbmQoKSB7XHJcbiAgc3RhcnQgPSAnMCwgMCc7XHJcbiAgZW5kID0gYCR7Q05TLldJRFRIIC0gQ05TLkJMT0NLV0lEVEh9LCAke0NOUy5IRUlHSFQgLSBDTlMuQkxPQ0tXSURUSH1gO1xyXG4gIGRyYXcuZHJhd0VuZHMoW3N0YXJ0LCBlbmRdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmFuZG9taXplU3RhcnRBbmRFbmQoKSB7XHJcbiAgLy8gcHJvaGliaXQgY2hhbmdpbmcgc3RhcnQgYW5kIGVuZCBjb29yZGluYXRlcyB3aGlsZSBhIHNlYXJjaCBpcyBpbiBwcm9ncmVzc1xyXG4gIGlmIChzZWFyY2hBbGdvcml0aG0uc2VhcmNoaW5nKSB7XHJcbiAgICByZXR1cm4gY29uc29sZS5sb2coJ0Fub3RoZXIgc2VhcmNoIGlzIGN1cnJlbnRseSBydW5uaW5nLCB3YWl0IGZvciB0aGF0IG9uZSB0byBmaW5pc2gnKTtcclxuICB9XHJcblxyXG4gIC8vIHBpY2tzIHJhbmRvbSBzdGFydCAmIGVuZCBub2Rlcywgd2l0aCBhcmJpdHJhcnkgYmlhcyBmb3IgZWFjaCBjaG9pY2UgdmlhIGBzbGljZSguLilgXHJcbiAgY29uc3QgcmFuZG9tTm9kZXMgPSBmdW5jdGlvbiByYW5kb21Ob2RlcygpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXMobXN0KTtcclxuICAgIGNvbnN0IHBpY2sgPSBuID0+IG5bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbi5sZW5ndGgpXTtcclxuXHJcbiAgICBsZXQgY2hvaWNlT25lO1xyXG4gICAgbGV0IGNob2ljZVR3bztcclxuICAgIHdoaWxlIChjaG9pY2VPbmUgPT09IGNob2ljZVR3byB8fCBjaG9pY2VPbmUgPT09ICdwcm9ncmVzcycgfHwgY2hvaWNlVHdvID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgIGNob2ljZU9uZSA9IHBpY2sobm9kZXMuc2xpY2UoMCwgNTApKTtcclxuICAgICAgY2hvaWNlVHdvID0gcGljayhub2Rlcy5zbGljZSgxMjUwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2Nob2ljZU9uZSwgY2hvaWNlVHdvXTtcclxuICB9O1xyXG5cclxuICAvLyBvbmx5IGRyYXcgaWYgdGhlIG1pbmltdW0gc3Bhbm5pbmcgdHJlZSBpcyBjb21wbGV0ZVxyXG4gIGlmIChtc3QucHJvZ3Jlc3MgPT09IENOUy5QUk9HUkVTUykge1xyXG4gICAgW3N0YXJ0LCBlbmRdID0gcmFuZG9tTm9kZXMoKTtcclxuICAgIGN0eC5wdXRJbWFnZURhdGEoZ3JhcGguaW1hZ2UsIDAsIDApO1xyXG4gICAgZHJhdy5kcmF3RW5kcyhbc3RhcnQsIGVuZF0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9TZWFyY2goKSB7XHJcbiAgY29uc3QgaWQgPSB0aGlzLmlkO1xyXG5cclxuICAvLyBwcm9oaWJpdCBydW5uaW5nIHNlYXJjaCB3aGlsZSBhbm90aGVyIGlzIGluIHByb2dyZXNzICh3aGVuIHNlYXJjaEFsZ29yaXRobS5zZWFyY2hpbmcgaXMgMSlcclxuICAvLyBwcm9ncmFtIHJ1bnMgYSBzZWFyY2ggYW5kIGZyZWV6ZXMgdGhlIGJ1dHRvbiB1bnRpbCBzZWFyY2ggaXMgY29tcGxldGUuIHRvIHVuZG8gdGhpcyBmZWF0dXJlLFxyXG4gIC8vIGFwcGVuZCBzZWFyY2hBbGdvcml0aG0uc2VhcmNoaW5nIHRvIGBpZiAoc2VhcmNoZWQgPT09IDEpYCB0byByZXNldCBgdmlzaXRlZGAgbmVjZXNzYXJpbHlcclxuICBpZiAoc2VhcmNoQWxnb3JpdGhtLnNlYXJjaGluZykge1xyXG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKCdBbm90aGVyIHNlYXJjaCBpcyBjdXJyZW50bHkgcnVubmluZywgd2FpdCBmb3IgdGhhdCBvbmUgdG8gZmluaXNoJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoZ3JhcGguaW1hZ2UpIHsgLy8gbWF6ZSBoYXMgZmluaXNoZWQgZ2VuZXJhdGluZ1xyXG4gICAgY3R4LnB1dEltYWdlRGF0YShncmFwaC5pbWFnZSwgMCwgMCk7XHJcblxyXG4gICAgaWYgKHN0YXJ0ID09PSBudWxsIHx8IGVuZCA9PT0gbnVsbCkge1xyXG4gICAgICBkZWZhdWx0U3RhcnRBbmRFbmQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRyYXcuZHJhd0VuZHMoW3N0YXJ0LCBlbmRdKTsgLy8gcmVkcmF3IHNvIGl0IG92ZXJsYXBzIG9uIHRoZSBjYW52YXNcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBhIHNlYXJjaCB3YXMgZG9uZSBiZWZvcmUsIHJlc2V0IGFsbCAndmlzaXRlZCcgc3RhdGVzXHJcbiAgICBpZiAoc2VhcmNoZWQgPT09IDEpIHtcclxuICAgICAgT2JqZWN0LmtleXMobXN0KS5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChtc3RbcG9zaXRpb25dLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSBtc3RbcG9zaXRpb25dLmZvckVhY2goaSA9PiBpWzFdLnZpc2l0ZWQgPSBmYWxzZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IHByb2dyYW1hdGljYWxseSB0cmlnZ2VyIGRpZmZlcmVudCBzZWFyY2ggYWxnb3JpdGhtc1xyXG4gICAgaWYgKGlkID09PSAnYmZzJykge1xyXG4gICAgICBzZWFyY2hBbGdvcml0aG0gPSBuZXcgQnJlYWR0aEZpcnN0U2VhcmNoKFxyXG4gICAgICAgIGNhbnZhcyxcclxuICAgICAgICBtc3QsXHJcbiAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgZW5kLFxyXG4gICAgICApO1xyXG4gICAgICBpbnRlcnZhbElkID0gc2VhcmNoQWxnb3JpdGhtLnNlYXJjaCgpO1xyXG4gICAgfSBlbHNlIGlmIChpZCA9PT0gJ2RmcycpIHtcclxuICAgICAgc2VhcmNoQWxnb3JpdGhtID0gbmV3IERlcHRoRmlyc3RTZWFyY2goXHJcbiAgICAgICAgY2FudmFzLFxyXG4gICAgICAgIG1zdCxcclxuICAgICAgICBzdGFydCxcclxuICAgICAgICBlbmQsXHJcbiAgICAgICk7XHJcbiAgICAgIGludGVydmFsSWQgPSBzZWFyY2hBbGdvcml0aG0uc2VhcmNoKCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ2FuJ3Qgc2VhcmNoIGJlZm9yZSBidWlsZGluZyBhIG1hemVcIik7XHJcbiAgfVxyXG4gIHNlYXJjaGVkID0gMTsgLy8gdGhlIGFsZ29yaXRobSdzIHNldEludGVydmFsIGJlZ2FuIGxvb3BpbmdcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERyYXcgZnJvbSAnLi9kcmF3LmpzJztcclxuXHJcbmNsYXNzIEJyZWFkdGhGaXJzdFNlYXJjaCB7XHJcbiAgY29uc3RydWN0b3IoY2FudmFzLCBncmFwaCwgc291cmNlLCB0YXJnZXQpIHtcclxuICAgIHRoaXMuZHJhdyA9IG5ldyBEcmF3KGNhbnZhcywgY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xyXG4gICAgdGhpcy5ncmFwaCA9IGdyYXBoO1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMucXVldWUgPSBbXTtcclxuICAgIHRoaXMubWV0YSA9IHt9OyAvLyBsaW1pdGVkIHNwYW5uaW5nIHRyZWUgb2JqZWN0IHVzZWQgc29sZWx5IGZvciBwYXRoIGluZm9ybWF0aW9uXHJcbiAgICB0aGlzLnNlYXJjaGluZyA9IDA7IC8vIDE6IHBlcmZvcm1pbmcgc2VhcmNoLCAwOiB3YWl0aW5nIHRvIHNlYXJjaFxyXG4gIH1cclxuXHJcbiAgc2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAxO1xyXG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoO1xyXG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnRhcmdldDtcclxuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5xdWV1ZTtcclxuICAgIGNvbnN0IG1ldGEgPSB0aGlzLm1ldGE7XHJcblxyXG4gICAgcXVldWUucHVzaChzb3VyY2UpO1xyXG5cclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICBpZiAocXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudE5vZGUgPSBxdWV1ZS5zaGlmdCgpO1xyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMobWV0YSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLmRyYXcuZHJhd1BhdGgoZ3JhcGhbY3VycmVudE5vZGVdLCAndmlzaXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdyYWIgZWFjaCBuZWlnaGJvciBub2RlIG9mIHRoZSBjdXJyZW50IGNlbGwsIGZvcm1hdCBpbnRvIGtleSBgeCwgeWBcclxuICAgICAgICAvLyBncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0gaXMgdGhlIGVkZ2UgdG8gdGhlIGdyYXBoW2N1cnJlbnROb2RlXVtpXVsxXSBub2RlXHJcbiAgICAgICAgLy8gaS5lLiB0aGUgbmVpZ2hib3JzIGluIHRoZSBhZGouIGxpc3QgYXJlIHJlcHJlc2VudGVkIGJ5IFtbZWRnZSwgbm9kZV0sIC4uXVxyXG4gICAgICAgIGNvbnN0IG5laWdoYm9ycyA9IGdyYXBoW2N1cnJlbnROb2RlXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgY29uc3QgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV1bMV07XHJcbiAgICAgICAgICBjb25zdCBrZXkgPSBgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWA7XHJcblxyXG4gICAgICAgICAgLy8gaWYgb25lIG9mIHRoZSBuZWlnaGJvcnMgaXMgdGhlIHRhcmdldCwgYnJlYWsgJiBkcmF3IHRoZSBzb2x1dGlvbiBwYXRoXHJcbiAgICAgICAgICBpZiAoa2V5ID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCFuZWlnaGJvci52aXNpdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVldWUucHVzaChgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWApO1xyXG4gICAgICAgICAgICBuZWlnaGJvci52aXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHByYWN0aWNhbGx5LCBleGVjdXRpbmcgYGVsc2VgIHNob3VsZCBiZSBpbXBvc3NpYmxlLCBzaW5jZSBNU1RzIGNvbm5lY3QgKmFsbCogdmVydGljZXNcclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNvbHV0aW9uIGluIHRoaXMgZGlyZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIG5ldyBzZWFyY2ggdHlwZSB3aGlsZSBhIHNlYXJjaCBpcyBydW5uaW5nOiByZXR1cm4gYWNjZXNzIHRvXHJcbiAgICAvLyBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBpZiBjYWxsaW5nIGdlbmVyYXRlTWF6ZSgpIGR1cmluZyBhIHNlYXJjaFxyXG4gICAgcmV0dXJuIHRpbWVyO1xyXG4gIH1cclxuXHJcbiAgcGF0aCgpIHtcclxuICAgIGxldCBwcmVkZWNlc3NvciA9IHRoaXMudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHByZWRlY2Vzc29yICE9PSB0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRyYXcuZHJhd1BhdGgodGhpcy5tZXRhW3ByZWRlY2Vzc29yXSwgJ3NvbHV0aW9uJywgdHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzTm9kZSA9IHRoaXMubWV0YVtwcmVkZWNlc3Nvcl1bMF07XHJcbiAgICAgIHByZWRlY2Vzc29yID0gcHJldmlvdXNOb2RlWzFdO1xyXG4gICAgfVxyXG4gICAgLy8gcmVkcmF3IHN0YXJ0ICYgZW5kIG9uIHRoZSBzb2x1dGlvbiBiYWNrdHJhY2UgdG8gb3ZlcmxhcCB0aGUgcGF0aCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgdGhpcy5kcmF3LmRyYXdFbmRzKFt0aGlzLnNvdXJjZSwgdGhpcy50YXJnZXRdKTtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gMDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJyZWFkdGhGaXJzdFNlYXJjaDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9iZnMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IERyYXcgZnJvbSAnLi9kcmF3LmpzJztcclxuXHJcbmNsYXNzIERlcHRoRmlyc3RTZWFyY2gge1xyXG4gIGNvbnN0cnVjdG9yKGNhbnZhcywgZ3JhcGgsIHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICB0aGlzLmRyYXcgPSBuZXcgRHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcclxuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnN0YWNrID0gW107XHJcbiAgICB0aGlzLm1ldGEgPSB7fTsgLy8gbGltaXRlZCBzcGFubmluZyB0cmVlIG9iamVjdCB1c2VkIHNvbGVseSBmb3IgcGF0aCBpbmZvcm1hdGlvblxyXG4gICAgdGhpcy5zZWFyY2hpbmcgPSAwOyAvLyAxOiBwZXJmb3JtaW5nIHNlYXJjaCwgMDogd2FpdGluZyB0byBzZWFyY2hcclxuICB9XHJcblxyXG4gIHNlYXJjaCgpIHtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gMTtcclxuICAgIGNvbnN0IGdyYXBoID0gdGhpcy5ncmFwaDtcclxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XHJcbiAgICBjb25zdCBzdGFjayA9IHRoaXMuc3RhY2s7XHJcbiAgICBjb25zdCBtZXRhID0gdGhpcy5tZXRhO1xyXG5cclxuICAgIHN0YWNrLnB1c2goc291cmNlKTtcclxuXHJcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgaWYgKHN0YWNrLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnROb2RlID0gc3RhY2sucG9wKCk7IC8vIG5vZGUgcG9zaXRpb24gcmVwcmVzZW50YXRpb25cclxuXHJcbiAgICAgICAgLy8gZHJhdyB0aGUgY3VycmVudCBub2RlIGJlaW5nIHZpc2l0ZWQgYW5kIHRoZSBwYXNzYWdlIHRoYXQgd2FzIHVzZWQgdG8gZ2V0IHRoZXJlXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1ldGEpLmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5kcmF3LmRyYXdQYXRoKFtbbWV0YVtjdXJyZW50Tm9kZV1bMF1bMF0sIGN1cnJlbnROb2RlXV0sICd2aXNpdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZ3JhYiBlYWNoIG5laWdoYm9yIG5vZGUgb2YgdGhlIGN1cnJlbnQgY2VsbFxyXG4gICAgICAgIC8vIGdyYXBoW2N1cnJlbnROb2RlXVtpXVswXSBpcyB0aGUgZWRnZSB0byB0aGUgZ3JhcGhbY3VycmVudE5vZGVdW2ldWzFdIG5vZGVcclxuICAgICAgICAvLyBpLmUuIHRoZSBuZWlnaGJvcnMgaW4gdGhlIGFkai4gbGlzdCBhcmUgcmVwcmVzZW50ZWQgYnkgW1tlZGdlLCBub2RlXSwgLi5dXHJcbiAgICAgICAgY29uc3QgbmVpZ2hib3JzID0gZ3JhcGhbY3VycmVudE5vZGVdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXVsxXTtcclxuICAgICAgICAgIGNvbnN0IGtleSA9IGAke25laWdoYm9yLnh9LCAke25laWdoYm9yLnl9YDtcclxuXHJcbiAgICAgICAgICAvLyBpZiBvbmUgb2YgdGhlIG5laWdoYm9ycyBpcyB0aGUgdGFyZ2V0LCBicmVhayAmIGRyYXcgdGhlIHBhdGhcclxuICAgICAgICAgIGlmIChrZXkgPT09IHRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYXcuZHJhd05vZGUoa2V5KTtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRoKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCFuZWlnaGJvci52aXNpdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChgJHtuZWlnaGJvci54fSwgJHtuZWlnaGJvci55fWApO1xyXG4gICAgICAgICAgICBuZWlnaGJvci52aXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWV0YVtrZXldID0gW1tncmFwaFtjdXJyZW50Tm9kZV1baV1bMF0sIGN1cnJlbnROb2RlXV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIHByYWN0aWNhbGx5LCBleGVjdXRpbmcgYGVsc2VgIHNob3VsZCBiZSBpbXBvc3NpYmxlLCBzaW5jZSBNU1RzIGNvbm5lY3QgKmFsbCogdmVydGljZXNcclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ05vIHNvbHV0aW9uIGluIHRoaXMgZGlyZWN0aW9uJyk7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICAgIC8vIGFsbG93IGNob29zaW5nIG5ldyBzZWFyY2ggdHlwZSB3aGlsZSBhIHNlYXJjaCBpcyBydW5uaW5nOiByZXR1cm4gYWNjZXNzIHRvXHJcbiAgICAvLyBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBpZiBjYWxsaW5nIGdlbmVyYXRlTWF6ZSgpIGR1cmluZyBhIHNlYXJjaFxyXG4gICAgcmV0dXJuIHRpbWVyO1xyXG4gIH1cclxuXHJcbiAgcGF0aCgpIHtcclxuICAgIGxldCBwcmVkZWNlc3NvciA9IHRoaXMudGFyZ2V0O1xyXG4gICAgd2hpbGUgKHByZWRlY2Vzc29yICE9PSB0aGlzLnNvdXJjZSkge1xyXG4gICAgICB0aGlzLmRyYXcuZHJhd1BhdGgodGhpcy5tZXRhW3ByZWRlY2Vzc29yXSwgJ3NvbHV0aW9uJywgdHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHByZXZpb3VzTm9kZSA9IHRoaXMubWV0YVtwcmVkZWNlc3Nvcl1bMF07XHJcbiAgICAgIHByZWRlY2Vzc29yID0gcHJldmlvdXNOb2RlWzFdO1xyXG4gICAgfVxyXG4gICAgLy8gcmVkcmF3IHN0YXJ0ICYgZW5kIG9uIHRoZSBzb2x1dGlvbiBiYWNrdHJhY2UgdG8gb3ZlcmxhcCB0aGUgcGF0aCBmb3IgdmlzaWJpbGl0eVxyXG4gICAgdGhpcy5kcmF3LmRyYXdFbmRzKFt0aGlzLnNvdXJjZSwgdGhpcy50YXJnZXRdKTtcclxuICAgIHRoaXMuc2VhcmNoaW5nID0gMDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERlcHRoRmlyc3RTZWFyY2g7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZGZzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEdyYXBoLCBOb2RlLCBFZGdlIH0gZnJvbSAnLi9ncmFwaC5qcyc7XHJcbmltcG9ydCBEcmF3IGZyb20gJy4vZHJhdy5qcyc7XHJcbmltcG9ydCAqIGFzIENOUyBmcm9tICcuL2NvbnN0YW50cy5qcyc7XHJcblxyXG5jbGFzcyBNYXplR2VuZXJhdG9yIHtcclxuICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcclxuICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB0aGlzLmRyYXcgPSBuZXcgRHJhdyhjYW52YXMsIHRoaXMuY3R4KTtcclxuXHJcbiAgICAvLyB1bmRpcmVjdGVkIGdyYXBoIHRvIHdoaWNoIHdlIHdpbGwgYWRkIHJhbmRvbSBlZGdlIHdlaWdodHNcclxuICAgIHRoaXMuZ3JhcGggPSBuZXcgR3JhcGgoKTtcclxuXHJcbiAgICAvLyB0aGUgZnJvbnRpZXIgcmVwcmVzZW50cyB0aGUgY2VsbHMgdGhhdCBzdXJyb3VuZCBvciAnd2FsbCBpbicgdGhlIG1hemUgcGF0aFxyXG4gICAgLy8gaS5lLiB0aGUgY2VsbHMgdGhhdCBhcmVuJ3QgJ3BhcnQnIG9mIHRoZSBtYXplIGJ1dCBhcmUgbmVpZ2hib3JzIG9mIGN1cnJlbnQgY2VsbFxyXG4gICAgdGhpcy5mcm9udGllciA9IFtdO1xyXG5cclxuICAgIC8vIG1pbmltdW0gc3Bhbm5pbmcgdHJlZSAoTVNUKSAtPiBhbGwgdGhlIGVkZ2VzIG9mIG91ciBlZGdlLXdlaWdodGVkLCB1bmRpcmVjdGVkXHJcbiAgICAvLyBncmFwaCB0aGF0IGNvbm5lY3RzIGFsbCB0aGUgdmVydGljZXMgd2l0aCB0aGUgbWluaW11bSBwb3NzaWJsZSB0b3RhbCBlZGdlIHdlaWdodFxyXG4gICAgLy8gdGhpcyBpcyBhIHN1YnNldCBvZiB0aGlzLmdyYXBoLmNvbGxlY3Rpb24gcmVwcmVzZW50ZWQgYnkgYW4gYWRqYWNlbmN5IGxpc3RcclxuICAgIC8vIGluIGFuIG9iamVjdCwgd2hlcmUgdGhlIGtleSBpcyB0aGUgbm9kZSBpZGVudGlmaWVyICYgdGhlIHZhbHVlIGlzIGFuIGFycmF5IG9mIG5laWdoYm9yc1xyXG4gICAgdGhpcy50cmVlID0ge307XHJcbiAgfVxyXG5cclxuICBncmlkKCkge1xyXG4gICAgLy8gaW5pdGlhbGl6ZSAmIGJ1aWxkIHRoZSBtYXplIGdyaWQgcG9pbnRzXHJcbiAgICAvLyB0aGUgZ3JpZCBwb2ludHMgYXJlIGNvZGVkIGluIGEgYC4uLU5vZGUtRWRnZS1Ob2RlLUVkZ2UtLi5gIHBhdHRlcm5cclxuICAgIC8vIGluIGVhY2ggZGlyZWN0aW9uLiB0aGUgTVNUIHdpbGwgYmUgYSBzdWJncmFwaCBvZiB0aGlzIHBhdHRlcm5cclxuICAgIGNvbnN0IGdyYXBoID0gdGhpcy5ncmFwaDtcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgQ05TLk5VTVJPV1M7IHIgKz0gMSkge1xyXG4gICAgICBncmFwaC5jb2xsZWN0aW9uW3JdID0gW107XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgQ05TLk5VTUNPTFM7IGMgKz0gMSkge1xyXG4gICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10gPSBuZXcgTm9kZShjLCByKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoZSB1bmRpcmVjdGVkIGdyYXBoJ3Mgbm9kZSBlZGdlcyBhcmUgbGlua2VkIGluIGVhY2ggZGlyZWN0aW9uXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IENOUy5OVU1ST1dTOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBDTlMuTlVNQ09MUzsgYyArPSAxKSB7XHJcbiAgICAgICAgLy8gaW4gcmFuZG9taXplZCBwcmltJ3MsIGVkZ2VzICgncGFzc2FnZXMnKSBoYXZlIHJhbmRvbSB3ZWlnaHRzXHJcbiAgICAgICAgLy8gdGhlIGBpZmAgc3RhdGVtZW50cyBrZWVwIGdlbmVyYXRpb24gd2l0aGluIHJhbmdlLCB0aGVuIGFzc2lnbiB3ZWlnaHRlZCBlZGdlc1xyXG4gICAgICAgIGlmIChyICE9PSBDTlMuTlVNUk9XUyAtIDEpIHtcclxuICAgICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLlNPVVRIXSA9XHJcbiAgICAgICAgICAgIG5ldyBFZGdlKGdyYXBoLmNvbGxlY3Rpb25bcl1bY10sIGdyYXBoLmNvbGxlY3Rpb25bciArIDFdW2NdKTtcclxuICAgICAgICAgIC8vIHVuZGlyZWN0ZWQgbGlua2FnZSAoZWRnZSBiZXR3ZWVuIE4gKyBTIGhhcyAxIHJhbmRvbSB3ZWlnaHQpOlxyXG4gICAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyICsgMV1bY10ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLk5PUlRIXSA9XHJcbiAgICAgICAgICAgIG5ldyBFZGdlKGdyYXBoLmNvbGxlY3Rpb25bciArIDFdW2NdLCBncmFwaC5jb2xsZWN0aW9uW3JdW2NdLFxyXG4gICAgICAgICAgICAgIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLlNPVVRIXS53ZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYyAhPT0gQ05TLk5VTUNPTFMgLSAxKSB7XHJcbiAgICAgICAgICBncmFwaC5jb2xsZWN0aW9uW3JdW2NdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5FQVNUXSA9XHJcbiAgICAgICAgICAgIG5ldyBFZGdlKGdyYXBoLmNvbGxlY3Rpb25bcl1bY10sIGdyYXBoLmNvbGxlY3Rpb25bcl1bYyArIDFdKTtcclxuICAgICAgICAgIC8vIHVuZGlyZWN0ZWQgbGlua2FnZSAoZWRnZSBiZXR3ZWVuIEUgKyBXIGhhcyAxIHJhbmRvbSB3ZWlnaHQpOlxyXG4gICAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyXVtjICsgMV0ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLldFU1RdID1cclxuICAgICAgICAgICAgbmV3IEVkZ2UoZ3JhcGguY29sbGVjdGlvbltyXVtjICsgMV0sIGdyYXBoLmNvbGxlY3Rpb25bcl1bY10sXHJcbiAgICAgICAgICAgICAgZ3JhcGguY29sbGVjdGlvbltyXVtjXS5uZWlnaGJvcnNbQ05TLkRJUkVDVElPTlMuRUFTVF0ud2VpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFwiUHJpbSdzIGFsZ29yaXRobSBpcyBhIGdyZWVkeSBhbGdvcml0aG0gdGhhdCBmaW5kcyBhIG1pbmltdW0gc3Bhbm5pbmcgdHJlZVxyXG4gIC8vIGZvciBhIHdlaWdodGVkIHVuZGlyZWN0ZWQgZ3JhcGhcIiAoV2lraXBlZGlhKS4gdGhpcyBpcyBpdHMgcmFuZG9taXplZCBpbXBsZW1lbnRhdGlvblxyXG4gIC8vIGl0IGNhbiBiZSBhcHBsaWVkIGFzIGEgbWF6ZSBnZW5lcmF0aW9uIGFsZ29yaXRobSBieSBidWlsZGluZyBhIG1hemUgXCJmcm9udGllclwiXHJcbiAgcHJpbXMoKSB7XHJcbiAgICAvLyB0aGUgbWF6ZSBpcyBidWlsdCBhbG9uZyB0aGUgZWRnZSB3aXRoIHRoZSBsb3dlc3Qgd2VpZ2h0XHJcbiAgICAvLyB0aGF0IGNob2ljZSBtdXN0IG5vdCBjb25uZWN0IHdpdGggYSBwcmV2aW91c2x5IHZpc2l0ZWQgbm9kZVxyXG4gICAgLy8gKDEpIG9ic2VydmUgdGhlIGZyb250aWVyIHRvIHRoZSBjdXJyZW50IGNlbGxcclxuICAgIC8vICgyKSBjb21wYXJlIHRoZSBlZGdlIHdlaWdodHMgJiBzZXQgdGhlIG1pbmltdW0gY2VsbFxyXG4gICAgLy8gRklYTUU6IG5vbi1mYXRhbCByYXJlIGNvbXBsYWludDogJ0Nhbm5vdCBzZXQgcHJvcGVydHkgJ2Rpc2NvdmVyZWQnIG9mIG51bGwnXHJcbiAgICBsZXQgbmV3RWRnZSA9IG5ldyBFZGdlKG51bGwsIG51bGwsIDEpOyAvLyBkdW1teSBlZGdlLCBvdXRzaWRlIG1heGltdW0gd2VpZ2h0XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZnJvbnRpZXIubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgaWYgKHRoaXMuZnJvbnRpZXJbaV0ubm9kZUZyb20uZGlzY292ZXJlZCAmJiB0aGlzLmZyb250aWVyW2ldLm5vZGVUby5kaXNjb3ZlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5mcm9udGllci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mcm9udGllcltpXS53ZWlnaHQgPCBuZXdFZGdlLndlaWdodCAmJiAhdGhpcy5mcm9udGllcltpXS5ub2RlVG8uZGlzY292ZXJlZCkge1xyXG4gICAgICAgIG5ld0VkZ2UgPSB0aGlzLmZyb250aWVyW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXdFZGdlLm5vZGVUby5kaXNjb3ZlcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAvLyByZS1idWlsZCB0aGUgZnJvbnRpZXIgYXQgdGhlIG5ldyBub2RlIGZvciBlYWNoIG9mIDQgZGlyZWN0aW9uc1xyXG4gICAgT2JqZWN0LnZhbHVlcyhDTlMuRElSRUNUSU9OUykuZm9yRWFjaCgoZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAgIC8vIHRoZXJlIHNob3VsZCBiZSBhIGNlbGwgYXQgdGhlIGRpcmVjdGlvbiAmJiBpdCBzaG91bGQgYmUgdW5kaXNjb3ZlcmVkXHJcbiAgICAgIGlmIChcclxuICAgICAgICAobmV3RWRnZS5ub2RlVG8ubmVpZ2hib3JzW2RpcmVjdGlvbl0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAmJiAoIW5ld0VkZ2Uubm9kZVRvLm5laWdoYm9yc1tkaXJlY3Rpb25dLm5vZGVUby5kaXNjb3ZlcmVkKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmZyb250aWVyLnB1c2gobmV3RWRnZS5ub2RlVG8ubmVpZ2hib3JzW2RpcmVjdGlvbl0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBgbm9kZUZyb21gIGlzIHJlbGF0ZWQgdG8gYG5vZGVUb2AgYnkgYW4gZWRnZVxyXG4gICAgY29uc3QgY3VycmVudFBvcyA9IGAke25ld0VkZ2Uubm9kZUZyb20ueH0sICR7bmV3RWRnZS5ub2RlRnJvbS55fWA7XHJcbiAgICBjb25zdCBuZXh0UG9zID0gYCR7bmV3RWRnZS5ub2RlVG8ueH0sICR7bmV3RWRnZS5ub2RlVG8ueX1gO1xyXG5cclxuICAgIC8vIGVhY2ggZ3JpZCBub2RlIHN0b3JlcyBhIG5laWdoYm9yIGluIHRoZSBmb3JtYXQgW2VkZ2UsIG5vZGVdIHdoZXJlIHRoZSBlZGdlXHJcbiAgICAvLyBpcyB0aGUgcGFzc2FnZSB0byB0aGUgbmV4dCBub2RlLiBzaW5jZSB0aGlzIGlzIGFuIHVuZGlyZWN0ZWQgZ3JhcGgsIHRoZVxyXG4gICAgLy8gY3VycmVudFBvcyBoYXMgYSBuZWlnaGJvciBuZXh0UG9zLCBhbmQgdGhlIG5leHRQb3MgaGFzIGEgbmVpZ2hib3IgY3VycmVudFBvc1xyXG4gICAgLy8gaWYgdGhpcyB3YXMgYSBkaXJlY3RlZCBncmFwaCwgb21pdCBvbmUgb2YgdGhlIHRlcm5hcmllcyAtIG9ic2VydmUgdGhhdFxyXG4gICAgLy8gZGVhZC1lbmRzIHdpbGwgYmUgdmVyeSBjb21tb24gd2hlbiB1c2luZyByYW5kb20gZXh0cmVtZXMsIHNpbmNlIHRoZVxyXG4gICAgLy8gc2VhcmNoIGFsZ29yaXRobSBpc24ndCBhbGxvd2VkIHRvIGxvb2sgaW4gYW4gJ29wcG9zaXRlJyBkaXJlY3Rpb25cclxuICAgIHRoaXMudHJlZVtjdXJyZW50UG9zXSA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gdGhpcy50cmVlW2N1cnJlbnRQb3NdID0gW1tuZXdFZGdlLCBuZXdFZGdlLm5vZGVUb11dXHJcbiAgICAgIDogdGhpcy50cmVlW2N1cnJlbnRQb3NdLnB1c2goW25ld0VkZ2UsIG5ld0VkZ2Uubm9kZVRvXSk7XHJcbiAgICB0aGlzLnRyZWVbbmV4dFBvc10gPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHRoaXMudHJlZVtuZXh0UG9zXSA9IFtbbmV3RWRnZSwgbmV3RWRnZS5ub2RlRnJvbV1dXHJcbiAgICAgIDogdGhpcy50cmVlW25leHRQb3NdLnB1c2goW25ld0VkZ2UsIG5ld0VkZ2Uubm9kZUZyb21dKTtcclxuXHJcbiAgICAvLyBjb2xvciBpbiB0aGUgbm9kZSBzaW5jZSBpdCB3YXMgKDEpIHZpc2l0ZWQgYW5kICgyKSBhZGRlZCwgYW5kXHJcbiAgICAvLyBjb2xvciB0aGUgZWRnZSBmcm9tIHRoZSBwcmV2aW91cyBub2RlIHRvIG5vZGVUbywgYmFzZWQgb24gIyBvZiBub2Rlcy5cclxuICAgIC8vIGEgZ3JhZGllbnQgb2YgMjAgY29sb3JzIGRldGVybWluZXMgdGhlIGZpbGwgY29sb3IgZm9yIHRoZSBleHRlbnQgb2YgcHJvZ3Jlc3NcclxuICAgIGxldCBjb2xvclN0ZXAgPSAoT2JqZWN0LmtleXModGhpcy50cmVlKS5sZW5ndGggLyBDTlMuUFJPR1JFU1MpO1xyXG4gICAgY29sb3JTdGVwID0gKChNYXRoLmNlaWwoY29sb3JTdGVwICogMjApKSAvIDIwKS50b0ZpeGVkKDIpOyAvLyByb3VuZCB0byBuZWFyZXN0IC4wNVxyXG4gICAgdGhpcy5kcmF3LmRyYXdFZGdlKG5ld0VkZ2UsIGNvbG9yU3RlcCk7XHJcbiAgICB0aGlzLmRyYXcuZHJhd05vZGUobmV3RWRnZS5ub2RlVG8sIGNvbG9yU3RlcCk7XHJcbiAgfVxyXG5cclxuICBidWlsZCgpIHtcclxuICAgIC8vIHN0YXJ0IGJ1aWxkaW5nIG1pbmltdW0gc3Bhbm5pbmcgdHJlZSBmcm9tIHRoZSB0b3AtbGVmdCBub2RlIChjYW52YXMgY29vcmQgMCwwKVxyXG4gICAgY29uc3QgZmlyc3ROb2RlID0gdGhpcy5ncmFwaC5jb2xsZWN0aW9uWzBdWzBdO1xyXG4gICAgdGhpcy5ncmFwaC5jb2xsZWN0aW9uWzBdWzBdLmRpc2NvdmVyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5kcmF3LmRyYXdOb2RlKGZpcnN0Tm9kZSwgbnVsbCwgQ05TLlBSSU1TQ09MT1JTWzAuMDBdKTtcclxuICAgIHRoaXMuaW1hZ2UgPSAwO1xyXG5cclxuICAgIC8vIHRoZSB0b3AtbGVmdCBjb3JuZXIgaXMgJ3dhbGxlZCcgaW4gYnkgMSBzb3V0aGVybiBjZWxsICYgMSBlYXN0ZXJuIGNlbGxcclxuICAgIC8vIHZpc2l0IGVpdGhlciBiYXNlZCBvbiByYW5kb20gd2VpZ2h0OiByYW5kb21pemVkIHByaW0ncyBjaG9vc2VzIGxvd2VzdCBlZGdlIHdlaWdodFxyXG4gICAgdGhpcy5mcm9udGllci5wdXNoKFxyXG4gICAgICB0aGlzLmdyYXBoLmNvbGxlY3Rpb25bMF1bMF0ubmVpZ2hib3JzW0NOUy5ESVJFQ1RJT05TLlNPVVRIXSxcclxuICAgICAgdGhpcy5ncmFwaC5jb2xsZWN0aW9uWzBdWzBdLm5laWdoYm9yc1tDTlMuRElSRUNUSU9OUy5FQVNUXSxcclxuICAgICk7XHJcblxyXG4gICAgLy8gcmVwZWF0IHRoZSBwcmltcyBhbGdvcml0aG0gdW50aWwgdGhlIGdyYXBoIGlzIGNvbXBsZXRlXHJcbiAgICAvLyB1c2VzIGFuIGFyYml0cmFyeSB0aW1lIGludGVydmFsIChtcykgYXQgd2hpY2ggdG8gYnVpbGQgdGhlIG1hemVcclxuICAgIHRoaXMudHJlZS5wcm9ncmVzcyA9IDA7XHJcbiAgICBjb25zdCB0aW1lID0gMDtcclxuICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICB0aGlzLnByaW1zKCk7XHJcbiAgICAgIHRoaXMudHJlZS5wcm9ncmVzcyArPSAxO1xyXG4gICAgICBpZiAodGhpcy50cmVlLnByb2dyZXNzID09PSBDTlMuUFJPR1JFU1MpIHsgLy8gZXZlcnkgbm9kZSBpbiBncmFwaC5jb2xsZWN0aW9uIGlzIGRpc2NvdmVyZWRcclxuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICB0aGlzLmltYWdlID0gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIENOUy5XSURUSCwgQ05TLkhFSUdIVCk7XHJcbiAgICAgICAgdGhpcy5mbGFzaEJ1dHRvbnMoKTtcclxuICAgICAgfVxyXG4gICAgfSwgdGltZSk7XHJcbiAgICByZXR1cm4gdGltZXI7IC8vIGFjY2VzcyB0byBzZXRJbnRlcnZhbCBJRCB0byBwZXJtaXQgY2xlYXJJbnRlcnZhbCBpbiBvdGhlciBzY29wZXNcclxuICB9XHJcblxyXG4gIGZsYXNoQnV0dG9ucygpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZnMnKS5jbGFzc0xpc3QuYWRkKCdmbGFzaCcpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RmcycpLmNsYXNzTGlzdC5hZGQoJ2ZsYXNoJyk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JmcycpLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsYXNoJyk7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZnMnKS5jbGFzc0xpc3QucmVtb3ZlKCdmbGFzaCcpO1xyXG4gICAgfSwgNzAwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXplR2VuZXJhdG9yO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2dlbmVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBDTlMgZnJvbSAnLi9jb25zdGFudHMuanMnO1xyXG5cclxuY2xhc3MgR3JhcGgge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jb2xsZWN0aW9uID0gW107IC8vIGNvbGxlY3Rpb24gb2Ygbm9kZXNcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggKiBDTlMuQkxPQ0tXSURUSDtcclxuICAgIHRoaXMueSA9IHkgKiBDTlMuQkxPQ0tXSURUSDtcclxuICAgIHRoaXMubmVpZ2hib3JzID0gW107IC8vIG5vZGUncyBuZWlnaGJvcmluZyBlZGdlc1xyXG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2NvdmVyZWQgPSBmYWxzZTsgLy8gdHJ1ZSB3aGVuIGFkZGVkIHRvIE1TVFxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgRWRnZSB7XHJcbiAgY29uc3RydWN0b3Iobm9kZUZyb20sIG5vZGVUbywgd2VpZ2h0ID0gTWF0aC5yYW5kb20oKSkge1xyXG4gICAgdGhpcy5ub2RlRnJvbSA9IG5vZGVGcm9tO1xyXG4gICAgdGhpcy5ub2RlVG8gPSBub2RlVG87XHJcbiAgICB0aGlzLndlaWdodCA9IHdlaWdodDsgLy8gZWRnZXMgaW5pdGlhbGl6ZWQgd2l0aCBhIHJhbmRvbSB3ZWlnaHRcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEdyYXBoLCBOb2RlLCBFZGdlIH07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZ3JhcGguanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==