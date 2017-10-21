class Graph {
  constructor() {
    this.collection = []; // collection of nodes
  }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = []; // node's neighboring edges
    this.discovered = false; // not fully visited yet b/c not part of MST TODO: color
  }
}

class Edge {
  constructor(nodeFrom, nodeTo) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
    this.weight = Math.random(); // edges initialized with a random weight
  }
}

export { Graph, Node, Edge };
