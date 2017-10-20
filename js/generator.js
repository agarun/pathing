import Graph from './graph.js'

class MazeGenerator {
  constructor() {
    this.graph = new Graph();
  }

  grid() {

  }

  // "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree
  // for a weighted undirected graph" (Wikipedia). This is its randomized implementation.
  // It can be applied as a maze generation algorithm by building a maze "frontier"
  prims() {
    // the frontier represents the cells that surround or 'wall in' the path
    let frontier = [];

    // choose a random node from the graph to 'open' up a path at

    // add the random node to a set

    // pick an edge that connects a node in the set with another node not in the set

    // add the edge to a minimal spanning tree

    // add the other node of this edge to the set

    // pick & add edges until the set includes every node in the graph
  }
}

export default MazeGenerator;
