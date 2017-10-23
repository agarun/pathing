import Draw from './draw.js';

class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.queue = [];
    this.meta = {}; // limited spanning tree object used solely for path information
    this.searching = 0;
  }

  search() {
    this.searching = 1; // start search
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const queue = this.queue;
    const meta = this.meta;

    queue.push(source);

    const timer = setInterval(() => {
      if (queue.length) {
        const currentNode = queue.shift(); // node position representation
        this.draw.drawPath(graph[currentNode], 'visit');

        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the edge to the graph[currentNode][i][1] node
        // i.e. the neighbors in the adj. list are represented by [[edge, node], ..]
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;
          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            this.draw.drawPath(graph[currentNode], 'visit');
            meta[key] = [[graph[currentNode][i][0], currentNode]];
            clearInterval(timer);
            return this.path();
          }

          if (!neighbor.visited && graph[`${neighbor.x}, ${neighbor.y}`]) {
            this.queue.push(`${neighbor.x}, ${neighbor.y}`);
            neighbor.visited = true;
            meta[key] = [[graph[currentNode][i][0], currentNode]];
          }
        }
      } else {
        // if the script makes it here, there was no solution from the chosen direction
        // practically, this should be impossible, since MSTs connect _all_ vertices!
        clearInterval(timer);
        return console.log('No solution in this direction');
      }
    }, 10);
  }

  path() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor], false, true);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
    // overlap start/end on canvas over path line. TODO: redraw on animation start as well
    this.draw.drawEnds([this.target, this.source]);
    this.searching = 0; // end search
  }
}

export default BreadthFirstSearch;
