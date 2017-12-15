import Draw from './draw';

const PriorityQueue = require('js-priority-queue');

class AStar {
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
    this.prios = {};

    // use a priority queue in which vertices are sorted by their increasing cost
    const compareDistances = (node1, node2) => {
      return this.prios[node1] - this.prios[node2];
    };
    this.priorityQueue = new PriorityQueue({ comparator: compareDistances });
  }

  // standard heuristic for a square grid. we scale the distance simply (by 1)
  static manhattanDistance(neighbor, target) {
    const [x1, y1] = target.split(', ');
    const [x2, y2] = neighbor.split(', ');

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return (dx + dy); // TODO: scale by 10**-3
  }

  search() {
    this.searching = 1;
    const graph = this.graph;
    const source = this.source;
    const target = this.target;
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
        console.log('this is the pq');
        console.log(priorityQueue);
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
            const priority =
              distanceToNeighborNode + this.constructor.manhattanDistance(neighborKey, target);

            this.prios[neighborKey] = priority;
            previous[neighborKey] = [[neighborEdge, currentNode]];
          }

          // if one of the neighbors is the target, break & draw the path
          if (neighborKey === target) {
            clearInterval(timer);
            return this.shortestPath();
          }
        }
      } else {
        // else if target is not in the graph <- MSTs connect all vertices.
        clearInterval(timer);
      }
    }, 10);
    // allow choosing new search type while a search is running: return access to
    // setInterval ID to permit clearInterval if calling generateMaze() during a search
    return timer;
  }

  shortestPath() {
    let predecessor = this.target;
    while (predecessor !== this.source) {
      this.draw.drawPath(this.previous[predecessor], 'solution', true);
      const previousNode = this.previous[predecessor][0];
      predecessor = previousNode[1];
    }
    // redraw start & end on the solution backtrace to overlap the path for visibility
    this.draw.drawEnds([this.source, this.target]);
    this.searching = 0;
  }
}

export default AStar;
