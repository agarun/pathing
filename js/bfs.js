import Draw from './draw.js';

class BreadthFirstSearch {
  constructor(canvas, graph, source, target) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.queue = [];
    this.meta = {}; // TODO: spanning tree which only has information about the path?
  }

  search() {
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const queue = this.queue;
    const meta = this.meta;

    this.queue.push(source);

    const timer = setInterval(() => {
      if (this.queue.length) {
        const currentNode = this.queue.shift(); // node position representation

        if (currentNode === target) {
          // FIXME: doesnt draw very last edge if it's horizontal, b/c processes setInterval 1st?
          this.draw.drawVisit(graph[currentNode]);
          clearInterval(timer);
          return this.path();
        }

        this.draw.drawVisit(graph[currentNode]);

        // TODO: reduce redundancy
        // grab each neighbor node of the current cell
        // graph[currentNode][i][0] is the passage to the graph[currentNode][1] node
        let neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          const neighbor = neighbors[i][1];
          if (!neighbor.visited && graph[`${neighbor.x}, ${neighbor.y}`]) {
            this.queue.push(`${neighbor.x}, ${neighbor.y}`);
            graph[currentNode][i][1].visited = true;
          }
        }
      }
    }, 10);

    // popup
    return "This graph didn't have a path from start to finish!";
  }

  path() {
    console.log("Draw the path.");
    // const path = [];
    // let predecessor = currentNode;
    // while (predecessor !== this.source) {
    //   path.push(predecessor);
    //   predecessor = this.graph.parents[predecessor];
    // }
    //
    // return path.concat(predecessor).reverse();
  }
}

export default BreadthFirstSearch;
