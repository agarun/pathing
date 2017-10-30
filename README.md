# Pathing

Interactive visualization of maze generation and graph traversal algorithms in JavaScript (ES6) and HTML5 Canvas. The maze is generated using randomized Prim's algorithm to build a minimum spanning tree based on minimum edge weights. The tree can be searched with depth-first and breadth-first traversal algorithms.

[View the project live](https://agarun.com/pathing/)!

## Mazes

### Graphs

This demonstration considers the entire grid as a weighted, undirected graph for pathfinding. It is undirected in that each node is assigned a collection of all of its neighboring nodes and edges. It is weighted in that each edge has a random float weight between 0 and 1 (exclusive). The maze is drawn as a graph: both nodes and edges are drawn to the canvas.

### Prim's Algorithm

Prim's algorithm is a greedy algorithm. It observes each node's neighbors and compares each edge's weight. Then, it chooses the passage with the *local minimum edge weight* as its next path and walks to the next node. As it does this, it constructs a spanning tree of all the locally optimal nodes and edges it reaches. The result is a subgraph of the original fully connected graph. This *minimum* spanning tree has the lowest possible total edge weight.

In randomized Prim's algorithm, the maze's edges are initialized with random edge weights. The maze is built in the direction of the local minimum edge weight (cheapest edge) at each node if and only if the extension would avoid creating a loop in the maze. In the case that Prim's compares edge weights and predicts a cycle, the next available local minimum edge weight is chosen.

To keep track of the cells (graph nodes) that can potentially be incorporated into the minimum spanning tree, a **frontier** of cells that *wall in* the current position in the tree is maintained. This frontier is repeatedly explored, evaluated, and adjusted until the spanning tree contains all of the nodes.

#### Implementation

The randomized Prim's algorithm is implemented classically.

First, a fully-connected graph is generated. Each node is assigned neighboring edges in each available direction. The `Edge` constructor initializes each edge with a random weight.

In Prim's algorithm, generation arbitrarily starts from the top-left corner (canvas coordinates 0, 0). The algorithm adjusts a frontier of available cells, explores it for the lowest-weighted edge, draws the current node and chosen edge, and finally extends the minimum spanning tree. When the algorithm predicts a cycle, it backtracks to the next available node based on the frontier. This is made possible by keeping the `discovered` state of each node as a property on each `Node` instance. The loop is repeated until the spanning tree contains all of the nodes in the initial graph.

## Traversal

### Breadth-first

Breadth-first search visits every node's incident edges before descending to the next level of nodes ('siblings first').

It is guaranteed to find the shortest path on an undirected graph. Visiting every increasingly distant node from the source eventually generates a unique path to the target with the smallest number of edges.

Breadth-first search is implemented with a queue, which maintains the order for traversal. Dequeueing returns the earliest added node, allowing the search to continue exploring a particular level of the graph (breadth!) before considering nodes at lower levels.

### Depth-first

Depth-first search also considers the neighbors of each node. After walking to a node, the search keeps traveling to the deepest level before backtracking ('children first' - visit the parent node's children first).

It's implemented with a stack (explicit and iterative implementation here, but can also use an implicit stack using recursion).

Depth-first search is not guaranteed to find the shortest-path from the source to the target - it might terminate with a suboptimal solution.

### BFS versus DFS

In the worst case, both search algorithms visit each vertex at most once and cover each edge at least once. While they have the same worst-case time (O(|V| + |E|)) and space complexity (O(|V|)), they have different applications. BFS is guaranteed to find the shortest-path solution, but might be slower to reach the solution when the target node is far from the source node. DFS can potentially be more useful when the target node is far from the source node, but it typically finds suboptimal solutions and might also traverse the entire graph.

### Implementation

Both BFS and DFS have simple iterative implementations. BFS makes use of a queue while DFS makes use of a stack. JavaScript's `setInterval()` is used to repeatedly draw traversal and generation to the canvas. `setInterval()` returns an ID value that can be fed to `clearInterval()` to cancel any building paths.

## Plans

- Visualize the graph during generation and traversal using [Sigma.js](http://sigmajs.org/)
- Implement the A* search algorithm and Dijkstra's algorithm
- Implement a min-heap into randomized Prim's algorithm
- Implement hexagonal maze generation ([see here](https://www.redblobgames.com/grids/hexagons/) - an incredibly useful introduction to hexagonal grids)

# References
* Red Blob Games
  * [Grids and Graphs](http://www.redblobgames.com/pathfinding/grids/graphs.html)
  * [Pathfinding](http://www.redblobgames.com/pathfinding/tower-defense/index.html)
  * [A-star](http://www.redblobgames.com/pathfinding/a-star/introduction.html) and [heuristics](http://www.redblobgames.com/pathfinding/heuristics/differential.html)
* Jamis Buck
  * [Introduction to Maze Generation Algos](http://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap)
  * His full book *[Mazes for Programmers](https://www.amazon.com/Mazes-Programmers-Twisty-Little-Passages/dp/1680500554)* (examples in Ruby)
* Steven Skiena's Lectures:
  * [Depth-first search](https://www3.cs.stonybrook.edu/~algorith/video-lectures/2007/lecture12.pdf)
  * [Breadth-first search](https://www3.cs.stonybrook.edu/~algorith/video-lectures/2007/lecture11.pdf)
  * [Minimum Spanning Trees](https://www3.cs.stonybrook.edu/~skiena/373/newlectures/lecture13.pdf)
* Mike Bostock's work on Prim's Algorithm vs. random traversal
  * https://bl.ocks.org/mbostock/11159599
  * https://bl.ocks.org/mbostock/70a28267db0354261476
* [Daniel Shiffman - The Coding Train](https://github.com/CodingTrain/AStar)
* Algorithms
  * [PathFinding.js](https://github.com/qiao/PathFinding.js)
  * [Maze generation visualizations](http://www.algostructure.com/specials/maze.php)
  * [Minimum Spanning Trees visualizations](https://visualgo.net/en/mst?slide=1)
  * [MST and Prim's visualizations](http://www.algomation.com/algorithm/prim-minimum-spanning-tree)
* Wikipedia
  * [Randomized Prim's](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim.27s_algorithm)
