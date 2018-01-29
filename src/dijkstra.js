import { Graph } from './graph';

// Uniform-cost search (UCS), one common variant of Dijkstra's algorithm that
// 'inserts' nodes and terminates as soon as the target node is discovered.
// Dijkstra's algorithm can also be implemented with a `decrease-key` operation for
// the priority queue. In the `decrease-key` version, the priority queue is initialized
// with infinite-cost nodes and there is *no* early exit when the target is discovered.

// Dijkstra's algorithm only uses one cost function: the real min cost to
// reach a node from the source node. It's considered a special case of A* search,
// since it has no heuristic function.

// The uniform-cost search initializes the PQ with only the source node and inserts
// new nodes as they are discovered. This is useful when searching for a target node.
// Getting a UCS from Dijkstra's algorithm conserves space in the Priority Queue.

// In a Priority Queue, elements (nodes) with high priority (lower cost)
// are served before elements with lower priority (higher cost).
// this implementation uses a binary heap-based priority queue module 'js-priority-queue':
// (https://github.com/adamhooper/js-priority-queue)
// Google also includes a heap-based PQ implementation in the Closure Library:
// (https://github.com/google/closure-library/tree/master/closure/goog/structs)
const PriorityQueue = require('js-priority-queue');

class Dijkstra {
  constructor(graph, source, target, draw) {
    this.graph = graph;
    this.source = source;
    this.target = target;
    this.draw = draw;

    // 1: performing search, 0: waiting to search
    this.searching = 0;

    // the `previous` object stores a reference to one parent node for each node
    // only keep the parent node that contributes to the cheapest cost (shortest distance)
    this.previous = {};
    this.distances = {};

    // use a priority queue in which vertices are sorted by their increasing cost (edge weights)
    const compareDistances = (node1, node2) => (
      this.distances[node1] - this.distances[node2]
    );
    this.priorityQueue = new PriorityQueue({ comparator: compareDistances });
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
    const draw = this.draw;
    const priorityQueue = this.priorityQueue;
    const distances = this.distances;
    const previous = this.previous;

    // initialize the PQ with the stringified source node and insert new nodes when
    // they are visited. if the next node is in the Q, decrease its
    distances[source] = 0;
    previous[source] = null;
    priorityQueue.queue(source);

    const timer = setInterval(() => {
      if (priorityQueue.length) {
        // remove the item w/ the min. cost based on random edge weights after Prim's
        const currentNode = priorityQueue.dequeue();

        // in the minimum spanning tree:
        // graph[currentNode]
        //   * `x, y`: [[Edge, Node], [Edge, Node] ...]
        //      * currentNode (stringified)
        //             * Edge.nodeFrom (node traveled from to get to currentNode)
        //             * Edge.nodeTo (currentNode instance)
        //                   * Node (neighbor node instance)
        //                      * the `visited` state is stored on the node itself
        const edgeToCurrentNode = graph[currentNode][0][0];
        this.draw.drawPath([[edgeToCurrentNode, currentNode]], 'visit');
        if (!previous.length) edgeToCurrentNode.nodeFrom.visited = true;
        edgeToCurrentNode.nodeTo.visited = true;

        const neighbors = graph[currentNode];
        for (let i = 0; i < neighbors.length; i += 1) {
          // graph[currentNode][i][1] => stores the edge to the neighbor node
          // (and this edge stores references to `nodeFrom` and `nodeTo`)
          // graph[currentNode][i][0] => stores the neighbor node
          const neighbor = neighbors[i][1];
          const neighborEdge = neighbors[i][0];
          const neighborKey = `${neighbor.x}, ${neighbor.y}`;

          // consider every neighbor and calculate cost:
          // distance to the currentNode + the edge weight to the current neighbor
          const distanceToNeighborNode = distances[currentNode] + neighborEdge.weight;
          if (!neighbor.visited ||
            distances[neighborKey] === undefined ||
            distanceToNeighborNode < distances[neighborKey]) {
            // typically the queue operation takes place only if the node already exists in the
            // PQ, but it's not absolutely necessary and dupes are uncommon.
            // re-queuing the node will not negatively affect the result or runtime.
            priorityQueue.queue(neighborKey);

            distances[neighborKey] = distanceToNeighborNode;
            previous[neighborKey] = [[neighborEdge, currentNode]];
          }

          // if one of the neighbors is the target, break & draw the path
          if (neighborKey === target) {
            clearInterval(timer);
            this.id = 'dijkstra';
            return Graph.reconstructPath.bind(this)(source, target, previous, draw);
          }
        }
      } else {
        // else if target is not in the graph - MSTs connect all vertices.
        return clearInterval(timer);
      }
    }, 10);
    // allow choosing a new search type while a search is already running:
    // return access to setInterval ID to permit clearInterval
    return timer;
  }
}

export default Dijkstra;
