import CNS from './constants';
import DOMHelper from './dom';

class Graph {
  constructor() {
    this.collection = [];
  }

  static reconstructPath(source, target, pathData, draw) {
    let predecessor = target;
    while (predecessor !== source) {
      draw.drawPath(pathData[predecessor], 'solution', true);
      const [[leadingEdge, previousNode]] = pathData[predecessor];
      predecessor = previousNode;
    }

    this.searching = 0; // solution path is complete: reset state!
    draw.drawEnds([source, target]); // redraw endpoints over path
    DOMHelper.addPreviousSearch(this); // close over completed canvas
  }
}

class Node {
  constructor(x, y) {
    this.x = x * CNS.BLOCKWIDTH;
    this.y = y * CNS.BLOCKWIDTH;
    this.neighbors = []; // up to four neighboring edges
    this.visited = false;
    this.discovered = false; // true if present in Prim's min spanning tree
  }
}

class Edge {
  constructor(nodeFrom, nodeTo, weight = Math.random()) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
    this.weight = weight; // 0 <= random weight < 1
  }
}

export { Graph, Node, Edge };
