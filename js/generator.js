import { Graph, Node, Edge } from './graph.js';
import Draw from './draw.js';
import * as CNS from './constants.js';

class MazeGenerator {
  constructor(canvas) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));

    // undirected graph to which we will add random edge weights
    this.graph = new Graph();

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
    const graph = this.graph;
    for (let r = 0; r < CNS.NUMROWS; r += 1) {
      graph.collection[r] = [];
      for (let c = 0; c < CNS.NUMCOLS; c += 1) {
        graph.collection[r][c] = new Node(c, r);
      }
    }

    // the undirected graph's node edges are linked in each direction
    for (let r = 0; r < CNS.NUMROWS; r += 1) {
      for (let c = 0; c < CNS.NUMCOLS; c += 1) {
        // in randomized prim's, edges ('passages') have random weights
        // the `if` statements keep us within range. we generate weighted edges.
        if (r !== CNS.NUMROWS - 1) {
          graph.collection[r][c].neighbors[CNS.DIRECTIONS.SOUTH] =
            new Edge(graph.collection[r][c], graph.collection[r + 1][c]);
          // undirected linkage (edge between N + S has 1 random weight):
          graph.collection[r + 1][c].neighbors[CNS.DIRECTIONS.NORTH] =
            new Edge(graph.collection[r + 1][c], graph.collection[r][c],
              graph.collection[r][c].neighbors[CNS.DIRECTIONS.SOUTH].weight);
        }
        if (c !== CNS.NUMCOLS - 1) {
          graph.collection[r][c].neighbors[CNS.DIRECTIONS.EAST] =
            new Edge(graph.collection[r][c], graph.collection[r][c + 1]);
          // undirected linkage (edge between E + W has 1 random weight):
          graph.collection[r][c + 1].neighbors[CNS.DIRECTIONS.WEST] =
            new Edge(graph.collection[r][c + 1], graph.collection[r][c],
              graph.collection[r][c].neighbors[CNS.DIRECTIONS.EAST].weight);
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
    let newEdge = new Edge(null, null, 1); // dummy edge, no weight to compare against
    for (let i = 0; i < this.frontier.length; i += 1) {
      if (this.frontier[i].nodeFrom.discovered && this.frontier[i].nodeTo.discovered) {
        this.frontier.splice(i, 1);
      } else if (this.frontier[i].weight < newEdge.weight && !this.frontier[i].nodeTo.discovered) {
        newEdge = this.frontier[i];
      }
    }
    newEdge.nodeTo.discovered = true;

    // re-build the frontier at the new node for each of 4 directions
    Object.values(CNS.DIRECTIONS).forEach((direction) => {
      // there should be a cell at the direction && it should be undiscovered
      if (
        (newEdge.nodeTo.neighbors[direction] !== undefined)
        && (!newEdge.nodeTo.neighbors[direction].nodeTo.discovered)
      ) {
        this.frontier.push(newEdge.nodeTo.neighbors[direction]);
      }
    });

    // the computer will walk to `nodeTo` in some direction. add nodeTo as a new
    // neighbor of nodeFrom. note nodeFrom can have multiple neighbors in a maze!
    const currentPos = `${newEdge.nodeFrom.x}, ${newEdge.nodeFrom.y}`;

    // each grid node shown by [edge, node] where edge is the passage to the next node
    this.tree[currentPos] === undefined
      ? this.tree[currentPos] = [[newEdge, newEdge.nodeTo]]
      : this.tree[currentPos].push([newEdge, newEdge.nodeTo]);

    // color in the node since it was (1) visited and (2) added, and
    // color the edge from the previous node to nodeTo
    // a gradient of 20 colors determines the fill color
    let colorStep = (Object.keys(this.tree).length / CNS.PROGRESS);
    colorStep = ((Math.ceil(colorStep * 20)) / 20).toFixed(2);
    this.draw.drawEdge(newEdge, colorStep);
    this.draw.drawNode(newEdge.nodeTo, colorStep);
  }

  build() {
    // we'll start building from the node at top-left corner.
    // our minimum spanning tree's root is this top-left node:
    const firstNode = this.graph.collection[0][0];
    this.tree[`${firstNode.x}, ${firstNode.y}`] = [[new Edge(firstNode, firstNode, 1), firstNode]];
    this.draw.drawNode(firstNode); // TODO: don't need to draw since we'll mark start/end? have to change above as well

    this.graph.collection[0][0].discovered = true;

    // if we're in the top-left corner, we are walled in by 1 southern cell &
    // 1 eastern cell. we can visit either of them, depending on the rand weight
    this.frontier.push(
      this.graph.collection[0][0].neighbors[CNS.DIRECTIONS.SOUTH],
      this.graph.collection[0][0].neighbors[CNS.DIRECTIONS.EAST],
    );

    // TODO: implement customization options
    // repeat the prims algorithm until the graph is complete
    // uses an arbitrary time interval (ms) at which to build the maze
    let progress = 0;
    const time = 0;
    const timer = setInterval(() => {
      this.prims();
      progress += 1;
      if (progress === CNS.PROGRESS) { // every node in graph.collection is discovered
        clearInterval(timer);
      }
    }, time);

    console.log(this.tree);
    return this.tree;
  }
}

export default MazeGenerator;
