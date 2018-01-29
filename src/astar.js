import { Graph } from './graph';

const PriorityQueue = require('js-priority-queue');

class AStar {
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
    this.scores = {};

    // use a priority queue in which vertices are sorted by their increasing cost
    // (cumulative edge cost + heuristic distance). A Star is a best-first search,
    // it chooses the most promising node based on this two-parted cost function
    const compareDistances = (node1, node2) => (
      this.scores[node1] - this.scores[node2]
    );
    this.priorityQueue = new PriorityQueue({ comparator: compareDistances });
  }

  // Manhattan distance is an ideal heuristic for a square grid with only 4 directions.
  // a heuristic is admissible if it never overestimates the distance/cost
  // cost of reaching the target node. manhattan distance calculates movement
  // to nodes based on independent moves in one of 4 directions - it's admissible
  // because it can never return a higher cost than the min from the `currentNode`.
  // before returning, scale the heuristic's calculation to accurately represent the
  // lowest distance between adjacent nodes on the maze grid based on edge costs.
  static manhattanDistance(neighbor, target) {
    const [x1, y1] = target.split(', ');
    const [x2, y2] = neighbor.split(', ');

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return (10 ** -1.4) * (dx + dy);
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
    const scores = this.scores;

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

          // In A* search, the shortest path is discovered by finding the minimum
          // sum of two cost functions. The first function is the real cost of
          // the path from the source node to the current node. The second is a
          // heuristic that estimates the cost of the cheapest path from the
          // neighbor node to the target node.
          const distanceToNeighborNode =
            distances[currentNode] + neighborEdge.weight;
          if (!neighbor.visited ||
            distances[neighborKey] === undefined ||
            distanceToNeighborNode < distances[neighborKey]) {
            // typically the queue operation takes place only if the node already exists in the
            // PQ, but it's not absolutely necessary and dupes are uncommon.
            // re-queuing the node will not negatively affect the result or runtime.
            priorityQueue.queue(neighborKey);

            distances[neighborKey] = distanceToNeighborNode;
            const priority = this.constructor.manhattanDistance(neighborKey, target);
            scores[neighborKey] = distances[neighborKey] + priority;

            previous[neighborKey] = [[neighborEdge, currentNode]];
          }

          // if one of the neighbors is the target, break & draw the path
          if (neighborKey === target) {
            clearInterval(timer);
            this.id = 'astar';
            return Graph.reconstructPath.bind(this)(source, target, previous, draw);
          }
        }
      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        return clearInterval(timer);
      }
    }, 10);
    // allow choosing a new search type while a search is already running:
    // return access to setInterval ID to permit clearInterval
    return timer;
  }
}

export default AStar;
