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
    this.ctx.fillStyle = customColor || __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* PRIMSCOLORS */][colorStep];
    this.ctx.fillRect(node.x, node.y, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */], __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CELLSIZE */]);
  }

  drawPath(nodes, style, force) {
    this.ctx.fillStyle = style === 'visit' ? __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* VISITCOLOR */] : __WEBPACK_IMPORTED_MODULE_0__constants__["j" /* SOLUTIONCOLOR */];
    nodes.forEach((node) => {
      const edgeId = `${node[0].nodeFrom.x} ${node[0].nodeFrom.y} ${node[0].nodeTo.x} ${node[0].nodeTo.y}`;
      if (!this.drawn[edgeId] || force) this.drawEdge(node[0]);
      this.drawn[edgeId] = true;

      let x;
      let y;
      style === 'visit' ? ({x, y} = node[1]) : ([x, y] = node[1].split(', '));
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
const VISITCOLOR = 'rgba(249, 63, 44, 0.8)'; // NOTE: might want to remove opacity
const SOLUTIONCOLOR = '#ffe600'; // webpage background color #120b3c
const STARTCOLOR = '#4d9803';
const ENDCOLOR = '#870741';




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bfs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dfs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__draw__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(1);






const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const draw = new __WEBPACK_IMPORTED_MODULE_3__draw__["a" /* default */](canvas, canvas.getContext('2d'));
canvas.width = __WEBPACK_IMPORTED_MODULE_4__constants__["m" /* WIDTH */];
canvas.height = __WEBPACK_IMPORTED_MODULE_4__constants__["e" /* HEIGHT */];

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
    const maze = new __WEBPACK_IMPORTED_MODULE_2__generator__["a" /* default */](canvas);
    const grid = maze.grid();
    const timerId = maze.build(); // pass callbacks here
    graph = maze;
    mst = maze.tree;
    return timerId;
  };
  intervalId = doPrims();

  // TODO: when generation is complete,
  // TODO: vibrate or flash the buttons 'bfs' and 'dfs'

  // reset prim's and search algo's states, and flush start & end points
  if (algorithm !== undefined) algorithm.searching = 0;
  searched = 0;
  generating = 0;
  [start, end] = [undefined, undefined];
}

function defaultStartAndEnd() {
  start = '0, 0';
  end = `${__WEBPACK_IMPORTED_MODULE_4__constants__["m" /* WIDTH */] - __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* BLOCKWIDTH */]}, ${__WEBPACK_IMPORTED_MODULE_4__constants__["e" /* HEIGHT */] - __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* BLOCKWIDTH */]}`;
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
      // TODO: add condition to ensure the numbers aren't close together
      // not quite random: slicing helps us avoid traveling straight into dead-ends
      choiceOne = pick(nodes.slice(0, 50));
      choiceTwo = pick(nodes.slice(1250));
    }
    return [choiceOne, choiceTwo];
  };

  if (mst.progress === __WEBPACK_IMPORTED_MODULE_4__constants__["i" /* PROGRESS */]) {
    [start, end] = randomNodes();
    ctx.putImageData(graph.image, 0, 0);
    draw.drawEnds([start, end]);
  }
}

let algorithm;
function doSearch() {
  const id = this.id;

  // prohibit running search while another search is in progress
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
      algorithm = new __WEBPACK_IMPORTED_MODULE_0__bfs__["a" /* default */](
        canvas,
        mst,
        start,
        end,
      );
      intervalId = algorithm.search();
    } else if (id === 'dfs') {
      algorithm = new __WEBPACK_IMPORTED_MODULE_1__dfs__["a" /* default */](
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


/***/ }),
/* 3 */
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
    this.meta = {}; // limited spanning tree object used solely for path information
    this.searching = 0;
  }

  search() {
    this.searching = 1; // start search
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const queue = this.queue;
    const meta = this.meta;

    queue.push(source);

    const timer = setInterval(() => {
      if (queue.length) {
        const currentNode = queue.shift(); // node position representation
        this.draw.drawPath(graph[currentNode], 'visit');

        // redraw start & end on first walk to overlap path for visibility
        if (!Object.keys(meta).length) this.draw.drawEnds([source, target]);

        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the edge to the graph[currentNode][i][1] node
        // i.e. the neighbors in the adj. list are represented by [[edge, node], ..]
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;
          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            this.draw.drawPath(graph[currentNode], 'visit');
            meta[key] = [[graph[currentNode][i][0], currentNode]];
            clearInterval(timer);
            return this.path();
          }

          if (!neighbor.visited && graph[`${neighbor.x}, ${neighbor.y}`]) {
            this.queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // if the script makes it here, there was no solution from the chosen direction
        // practically, this should be impossible, since MSTs connect _all_ vertices!
        clearInterval(timer);
        return console.log('No solution in this direction');
      }
    }, 10);
    // access to setInterval ID to permit clearInterval if requesting generate() during search
    return timer;
  }

  path() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], false, true);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
    // redraw start & end on solution backtrace to overlap path for visibility
    this.draw.drawEnds([this.source, this.target]);
    // end search state
    this.searching = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BreadthFirstSearch);


/***/ }),
/* 4 */
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
    this.meta = {}; // limited spanning tree object used solely for path information
    this.searching = 0;
  }

  search() {
    this.searching = 1; // start search
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const stack = this.stack;
    const meta = this.meta;

    stack.push(source);

    const timer = setInterval(() => {
      if (stack.length) {
        const currentNode = stack.pop(); // node position representation
        this.draw.drawPath(graph[currentNode], 'visit');

        // redraw start & end on first walk to overlap path for visibility
        if (!Object.keys(meta).length) this.draw.drawEnds([source, target]);

        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the edge to the graph[currentNode][i][1] node
        // i.e. the neighbors in the adj. list are represented by [[edge, node], ..]
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;
          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            this.draw.drawPath(graph[currentNode], 'visit');
            meta[key] = [[graph[currentNode][i][0], currentNode]];
            clearInterval(timer);
            return this.path();
          }

          if (!neighbor.visited && graph[`${neighbor.x}, ${neighbor.y}`]) {
            this.stack.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // if the script makes it here, there was no solution from the chosen direction
        // practically, this should be impossible, since MSTs connect _all_ vertices!
        clearInterval(timer);
        return console.log('No solution in this direction');
      }
    }, 10);
    // access to setInterval ID to permit clearInterval if requesting generate() during search
    return timer;
  }

  path() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], false, true);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
    // redraw start & end on solution backtrace to overlap path for visibility
    this.draw.drawEnds([this.source, this.target]);
    // end search state
    this.searching = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DepthFirstSearch);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graph__ = __webpack_require__(6);
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
        // the `if` statements keep us within range. we generate weighted edges.
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
  // for a weighted undirected graph" (Wikipedia). This is its randomized implementation.
  // It can be applied as a maze generation algorithm by building a maze "frontier"
  prims() {
    // the maze is built along the edge with the lowest weight
    // that choice must not connect with a previously visited node
    // (1) observe the frontier to the current cell
    // (2) compare the edge weights & set the minimum cell
    // FIXME: rare silent/harmless error: Cannot set property 'discovered' of null
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

    // the computer will walk to `nodeTo` in some direction. add nodeTo as a new
    // neighbor of nodeFrom. note nodeFrom can have multiple neighbors in a maze
    const currentPos = `${newEdge.nodeFrom.x}, ${newEdge.nodeFrom.y}`;
    const nextPos = `${newEdge.nodeTo.x}, ${newEdge.nodeTo.y}`;

    // each grid node stores a neighbor in the format [edge, node] where the edge
    // is the passage to the next node. since this is an undirected graph, the
    // currentPos has a neighbor nextPos, and the nextPos has a neighbor currentPos.
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
    // we'll start building from the node at top-left corner.
    // our minimum spanning tree's root is this top-left node:
    const firstNode = this.graph.collection[0][0];+
    this.draw.drawNode(firstNode, null, __WEBPACK_IMPORTED_MODULE_2__constants__["h" /* PRIMSCOLORS */][0.00]);
    // this.tree[`${firstNode.x}, ${firstNode.y}`] = [[new Edge(firstNode, firstNode, 1), firstNode]];

    this.graph.collection[0][0].discovered = true;

    // if we're in the top-left corner, we are walled in by 1 southern cell &
    // 1 eastern cell. we can visit either of them, depending on the rand weight
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
/* 6 */
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
    this.x = x * __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BLOCKWIDTH */]; // TODO: export cellSize
    this.y = y * __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BLOCKWIDTH */];
    this.neighbors = []; // node's neighboring edges
    this.visited = false;
    this.discovered = false; // not fully visited yet b/c not part of MST TODO: color
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