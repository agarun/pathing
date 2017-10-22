import * as CNS from './constants.js';

class Graph {
  constructor() {
    this.collection = []; // collection of nodes
  }
}

class Node {
  constructor(x, y) {
    this.x = x * CNS.BLOCKWIDTH; // TODO: export cellSize
    this.y = y * CNS.BLOCKWIDTH;
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

export { Graph, Node, Edge };
