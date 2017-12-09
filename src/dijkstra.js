import Draw from './draw';

// in a Priority Queue, elements (nodes) with high priority (lower cost)
// are served before elements with lower priority (higher cost).
// this code uses a binary heap-based priority queue package 'js-priority-queue'.
// Google also includes a heap-based PQ implementation in the Closure Library
// (https://github.com/google/closure-library/tree/master/closure/goog/structs)
const PriorityQueue = require('js-priority-queue');

class Dijkstra {
  constructor(canvas, graph, source, target) {
    this.draw = new Draw(canvas, canvas.getContext('2d'));
    this.graph = graph;
    this.source = source;
    this.target = target;

    // 1: performing search, 0: waiting to search
    this.searching = 0;

    // the `previous` object stores a reference to one parent node for each node
    // only keep the parent node that contributes to the cheapest cost (shortest distance)
    this.previous = {};
    this.distances = {};

    // use a priority queue in which vertices are sorted by their increasing cost
    this.priorityQueue = new PriorityQueue({
      comparator: (edgeOne, edgeTwo) => edgeOne.weight - edgeTwo.weight,
    });
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const priorityQueue = this.priorityQueue;
    const distances = this.distances;

    // helper method
    // for each vertex v in graph, dist[v] is infinity and prev[v] is null
    // priority queue here as well

    distances[source] = 0;
    priorityQueue.queue(source);
    const timer = setInterval(() => {
      if (priorityQueue.length) {
        // if (distances[currentNode] === undefined) distances[currentNode] = Infinity;
        const currentNode = priorityQueue.dequeue();

        // FIXME
        // we need a way to visit the vertex with the smallest known distance/cost.

        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          // graph[currentNode][i][0] => stores the edge to the neighbor node
          // (and this edge stores references to `nodeFrom` and `nodeTo`)
          // graph[currentNode][i][0] => stores the neighbor node
          const neighborEdge = neighbors[i][0];
          const neighbor = neighbors[i][1];

          // console.log(neighbors[i]);
          // console.log(neighbor);
          // console.log(neighborEdge);
          const key = `${neighbor.x}, ${neighbor.y}`;

          // if one of the neighbors is the target, break & draw the path
          if (key === target) {
            console.log('solution discovered');
          }

          // a visited node will never be checked again
          // TODO: might want to do this when setting currentNode
          if (neighbor.visited) continue;

          // consider every neighbor and calculate potential distances:
          // for each, store the distance to the currentNode
          // + the edge weight to the current neighbor
          // Euclidean distance?
          const distanceToNeighborNode = distances[currentNode] + neighborEdge.weight;
          if (distances[neighbor] < distanceToNeighborNode) {
            distances[neighbor] = distanceToNeighborNode;
          }
        }

        // graph[currentNode][]  -----> SET VISITED. idk how to do this LUL

      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        clearInterval(timer);
        return console.log('no solution in this direction');
      }
    }, 10);
    // allow choosing new search type while a search is running: return access to
    // setInterval ID to permit clearInterval if calling generateMaze() during a search
    return timer;
  }

  reconstructShortestPath() {
  }
}

export default Dijkstra;
