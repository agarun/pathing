class Graph {
  constructor() {

  }

  node() {
    this.x = x;
    this.y = y;
  }

  edge(nodeFrom, nodeTo) {
    this.nodeFrom = nodeFrom;
    this.nodeTo = nodeTo;
    this.weight = Math.random(); // edges initialized with a random weight
  }
}

export default Graph;
