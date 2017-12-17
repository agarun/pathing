import { Graph } from './graph';

class DepthFirstSearch {
  constructor(graph, source, target, draw) {
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.draw = draw;

    this.stack = [];

    // limited spanning tree object used solely for path information
    this.meta = {};

    // 1: performing search, 0: waiting to search
    this.searching = 0;
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const draw = this.draw;
    const stack = this.stack;
    const meta = this.meta;

    stack.push(source);

    const timer = setInterval(() => {
      if (stack.length) {
        const currentNode = stack.pop();

        // draw the current node being visited and
        // the passage that was used to get there
        if (Object.keys(meta).length) {
          this.draw.drawPath([[meta[currentNode][0][0], currentNode]], 'visit');
        }

        // grab each neighbor node of the current cell and stringify as a `neighborKey`
        // graph[currentNode] stores the neighbors in the adjacency lists,
        // represented by [[northEdge, node], [eastEdge, node] ...]
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          // graph[currentNode][i][1] => stores the edge to the neighbor node
          // (and this edge stores references to `nodeFrom` and `nodeTo`)
          // graph[currentNode][i][0] => stores the neighbor node
          const neighbor = neighbors[i][1];
          const neighborEdge = neighbors[i][0];
          const neighborKey = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the path
          // since `meta` information is used for drawing path & solution,
          // store the current neighboring edge and the curretNode at the
          // currentNode's stringified key.
          if (neighborKey === target) {
            this.draw.drawNode(neighborKey);
            meta[neighborKey] = [[neighborEdge, currentNode]];
            clearInterval(timer);
            return Graph.reconstructPath.bind(this)(source, target, meta, draw);
          }

          if (!neighbor.visited) {
            stack.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[neighborKey] = [[neighborEdge, currentNode]];
          }
        }
      } else {
        // else if target is not in the graph - MSTs connect all vertices.
        clearInterval(timer);
        return console.log('no solution in this direction');
      }
    }, 10);
    // allow choosing a new search type while a search is already running:
    // return access to setInterval ID to permit clearInterval
    return timer;
  }
}

export default DepthFirstSearch;
