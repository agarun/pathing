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

    this.queue.push(source);

    // TODO: reduce redundancy
    const timer = setInterval(() => {
      if (this.queue.length) {
        const currentNode = this.queue.shift(); // node position representation

        if (currentNode === target) {
          // FIXME: doesnt draw very last edge if it's horizontal,
          // because the interval is cleared before drawVisit() completes its work
          // FIXME: sometimes it fills the entire array and in that case does the return
          // also likely a problem with timing
          this.draw.drawVisit(graph[currentNode]);
          clearInterval(timer);
          return this.path();
        }

        this.draw.drawVisit(graph[currentNode]);

        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the passage to the graph[currentNode][1] node
        let neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          const key = `${neighbor.x}, ${neighbor.y}`;
          if (!neighbor.visited && graph[`${neighbor.x}, ${neighbor.y}`]) {
            this.queue.push(`${neighbor.x}, ${neighbor.y}`);
            graph[currentNode][i][1].visited = true;
            this.meta[key] = [[graph[currentNode][i][0], currentNode]]; // also put nodefrom and node to so u can calc edge
          }
        }
      }
    }, 10);

    // popup
    return "This graph didn't have a path from start to finish!";
  }

  path() {
    console.log(this.meta);
    let predecessor = this.target;

    while (predecessor !== this.source) {
      console.log(this.meta[predecessor]);
      this.draw.drawPath(this.meta[predecessor]);
      const previousNode = this.meta[predecessor][0];
      predecessor = previousNode[1];
      console.log(predecessor);
    }
  }
}

export default BreadthFirstSearch;
