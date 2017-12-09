import * as CNS from './constants';

class Graph {
  constructor() {
    this.collection = []; // collection of nodes
  }
}

class Node {
  constructor(x, y) {
    this.x = x * CNS.BLOCKWIDTH;
    this.y = y * CNS.BLOCKWIDTH;
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

export { Graph, Node, Edge };
