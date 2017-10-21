import { Graph, Node, Edge } from './graph.js'

class MazeGenerator {
  constructor(canvas, cellSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.cellSize = cellSize;

    // undirected graph
    this.graph = new Graph();

    // the frontier represents the cells that surround or 'wall in' the maze path
    // i.e. the cells that aren't 'part' of the maze but are neighbors of current cell
    this.frontier = [];

    // to observe a cell's surroundings, we store information about each of their neighbors
    this.directions = {
      NORTH: 0, //   0
      SOUTH: 2, // 3 * 1
      EAST: 1, //    2
      WEST: 3,
    };

    // minimum spanning tree (MST) -> all the edges of our edge-weighted, undirected
    // graph that connects all the vertices with the minimum possible total edge weight
    this.tree = [];
  }

  grid() {
    // each node will have a corresponding cell in the graph's collection array
    const x = this.canvas.height / this.cellSize; // 'cols'
    const y = this.canvas.width / this.cellSize; // 'rows'

    // initialize & build the maze grid points
    const graph = this.graph;
    for (let i = 0; i < y; i += 1) {
      graph.collection[i] = [];
      for (let j = 0; j < x; j += 1) {
        graph.collection[i][j] = new Node(j, i);
      }
    }

    // initialize each node's edges in each available direction
    for (let i = 0; i < y; i += 1) {
      for (let j = 0; j < x; j += 1) {
        // in randomized prim's, edges ('passages') have random weights
        // the `if` statements keep us within range. we generate weighted edges.
        if (i !== y - 1) {
          graph.collection[i][j].neighbors[this.directions.NORTH] =
            new Edge(graph.collection[i + 1][j], graph.collection[i][j]);
          graph.collection[i][j].neighbors[this.directions.SOUTH] =
            new Edge(graph.collection[i][j], graph.collection[i + 1][j]);
        }
        if (j !== x - 1) {
          graph.collection[i][j].neighbors[this.directions.EAST] =
            new Edge(graph.collection[i][j], graph.collection[i][j + 1]);
          graph.collection[i][j].neighbors[this.directions.WEST] =
            new Edge(graph.collection[i][j + 1], graph.collection[i][j]);
        }
      }
    }

    return this.graph.collection;
  }

  // "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree
  // for a weighted undirected graph" (Wikipedia). This is its randomized implementation.
  // It can be applied as a maze generation algorithm by building a maze "frontier"
  prims() {
    const lastNode = this.tree[this.tree.length - 1]

    // the maze is built along the edge with the lowest weight
    // that choice must not intersect a previously visited node
    // (1) observe the frontier to the current cell
    // (2) compare the edge weights & set the minimum cell
    for (let i = 0; i < this.frontier.length; i += 1) {
      // making sure it hasn't been visited before
    }

    // re-build the frontier at the new node for each of 4 directions
    for (let j = 0; j < 4; j += 1) {
      // doing some stuff, making sure it's a valid node
    }

    // add the edge to a minimal spanning tree
    this.tree.push(newEdge, newEdge.nodeTo);
    
    // add the other node of this edge to the set
    // pick & add edges until the set includes every node in the graph
    // color in the node since it was (1) visited and (2) parsed
  }

  build() {
    // we'll start building from the node at top-left corner.
    // our minimum spanning tree's root is this top-left node:
    this.tree = this.graph.collection[0][0];

    // if we're in the top-left corner, we are walled in by 1 southern cell &
    // 1 eastern cell. we can visit either:
    this.frontier.push(this.graph.collection[0][0].neighbors[this.directions.SOUTH],
                       this.graph.collection[0][0].neighbors[this.directions.EAST]);

    // TODO: implement customization options
    // repeat the prims algorithm until the graph is complete
    // uses an arbitrary time interval (ms) at which to build the maze
    while (somecondition) {
      const time = 50;
      setInterval(() => this.prim(), time);
    }
  }

  draw(node) {
    this.ctx.fillStyle = 'white'; // TODO: temp color
    this.ctx.fillRect(node.x, node.y, this.cellSize, this.cellSize);
  }
}

export default MazeGenerator;
