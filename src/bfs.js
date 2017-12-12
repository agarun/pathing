import Draw from './draw';

class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
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
    const queue = this.queue;
    const meta = this.meta;

    queue.push(source);

    const timer = setInterval(() => {
      if (queue.length) {
        const currentNode = queue.shift();

        if (Object.keys(meta).length) {
          this.draw.drawPath(graph[currentNode], 'visit');
        }

        // grab each neighbor node of the current cell and stringify as a `key`
        // graph[currentNode] stores the neighbors in the adjacency lists,
        // represented by [[northEdge, node], [eastEdge, node] ...]
        // graph[currentNode][i][0] => stores the edge to the neighbor node
        // (and this edge stores references to `nodeFrom` and `nodeTo`)
        // graph[currentNode][i][0] => stores the neighbor node
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the solution path
          if (key === target) {
            meta[key] = [[graph[currentNode][i][0], currentNode]];
            clearInterval(timer);
            return this.path();
          }

          if (!neighbor.visited) {
            queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        clearInterval(timer);
        return console.log('no solution in this direction');
      }
    }, 7);
    // allow choosing a new search while another search is running:
    // return access to setInterval ID to permit clearInterval on that ID
    return timer;
  }

  path() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], 'solution', true);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
    // redraw start & end on the solution backtrace to overlap the path for visibility
    this.draw.drawEnds([this.source, this.target]);
    this.searching = 0;
  }
}

export default BreadthFirstSearch;
