import { Graph, Node, Edge } from './graph';
import Draw from './draw';
import * as CNS from './constants';

class MazeGenerator {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw = new Draw(canvas, this.ctx);

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
    // the grid points are coded in a `..-Node-Edge-Node-Edge-..` pattern
    // in each direction. the MST will be a subgraph of this pattern
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
        // the `if` statements keep generation within range, then assign weighted edges
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
  // for a weighted undirected graph" (Wikipedia). this is its randomized implementation
  // it can be applied as a maze generation algorithm by building a maze "frontier"
  prims() {
    // the maze is built along the edge with the lowest weight
    // that choice must not connect with a previously visited node
    // (1) observe the frontier to the current cell
    // (2) compare the edge weights & set the minimum cell
    // FIXME: non-fatal rare complaint: 'Cannot set property 'discovered' of null'
    let newEdge = new Edge(null, null, 1); // dummy edge, outside maximum weight
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
    let colorStep = (Object.keys(this.tree).length / CNS.PROGRESS);
    colorStep = ((Math.ceil(colorStep * 20)) / 20).toFixed(2); // round to nearest .05
    this.draw.drawEdge(newEdge, colorStep);
    this.draw.drawNode(newEdge.nodeTo, colorStep);
  }

  build() {
    // start building minimum spanning tree from the top-left node (canvas coord 0,0)
    const firstNode = this.graph.collection[0][0];
    this.graph.collection[0][0].discovered = true;
    this.draw.drawNode(firstNode, null, CNS.PRIMSCOLORS[0.00]);
    this.image = 0;

    // the top-left corner is 'walled' in by 1 southern cell & 1 eastern cell
    // visit either based on random weight: randomized prim's chooses lowest edge weight
    this.frontier.push(
      this.graph.collection[0][0].neighbors[CNS.DIRECTIONS.SOUTH],
      this.graph.collection[0][0].neighbors[CNS.DIRECTIONS.EAST],
    );

    // repeat the prims algorithm until the graph is complete
    // uses an arbitrary time interval (ms) at which to build the maze
    this.tree.progress = 0;
    const time = 0;
    const timer = setInterval(() => {
      this.prims();
      this.tree.progress += 1;
      if (this.tree.progress === CNS.PROGRESS) { // every node in graph.collection is discovered
        clearInterval(timer);
        this.image = this.ctx.getImageData(0, 0, CNS.WIDTH, CNS.HEIGHT);
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

export default MazeGenerator;
