import Draw from './draw.js';

class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.queue = [];
    this.meta = {}; // limited spanning tree object used solely for path information
  }

  search() {
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const queue = this.queue;
    const meta = this.meta;

    queue.push(source);

    // TODO: reduce redundancy
    const timer = setInterval(() => {
      if (queue.length) {
        const currentNode = queue.shift(); // node position representation
        this.draw.drawVisit(graph[currentNode]);

        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the passage to the graph[currentNode][1] node
        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            this.draw.drawVisit(graph[currentNode]); // is this necessary? how about edge?
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
      }
    }, 10);

    // popup
    return "This graph didn't have a path from start to finish!";
  }

  // ALT: add to array find center points and build a line from it
  path() {
    let predecessor = this.target;

    while (predecessor !== this.source) {
      this.draw.drawPath(this.meta[predecessor]);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
    }
  }
}

export default BreadthFirstSearch;
