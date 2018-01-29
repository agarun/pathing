import { Graph } from './graph';

class BreadthFirstSearch {
  constructor(graph, source, target, draw) {
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.draw = draw;

    this.queue = [];

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
    const queue = this.queue;
    const meta = this.meta;

    queue.push(source);

    const timer = setInterval(() => {
      if (queue.length) {
        const currentNode = queue.shift();

        if (Object.keys(meta).length) {
          this.draw.drawPath(graph[currentNode], 'visit');
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

          // if one of the neighbors is the target, break & draw the solution path
          if (neighborKey === target) {
            meta[neighborKey] = [[neighborEdge, currentNode]];
            clearInterval(timer);
            this.id = 'bfs';
            return Graph.reconstructPath.bind(this)(source, target, meta, draw);
          }

          if (!neighbor.visited) {
            queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[neighborKey] = [[neighborEdge, currentNode]];
          }
        }
      } else {
        // else if target is not in the graph - MSTs connect all vertices.
        return clearInterval(timer);
      }
    }, 7);
    // allow choosing a new search type while a search is already running:
    // return access to setInterval ID to permit clearInterval
    return timer;
  }
}

export default BreadthFirstSearch;
