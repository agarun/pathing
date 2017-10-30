import Draw from './draw.js';

class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.queue = [];
    this.meta = {}; // limited spanning tree object used solely for path information
    this.searching = 0; // 1: performing search, 0: waiting to search
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

        // grab each neighbor node of the current cell, format into key `x, y`
        // graph[currentNode][i][0] is the edge to the graph[currentNode][i][1] node
        // i.e. the neighbors in the adj. list are represented by [[edge, node], ..]
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
            this.queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // practically, executing `else` should be impossible, since MSTs connect *all* vertices
        clearInterval(timer);
        return console.log('No solution in this direction');
      }
    }, 10);
    // allow choosing new search type while a search is running: return access to
    // setInterval ID to permit clearInterval if calling generateMaze() during a search
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
