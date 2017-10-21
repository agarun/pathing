"use strict";

import Graph from './graph.js'

class MazeGenerator {
  constructor(canvas, cellSize) {
    this.canvas = canvas;
    this.cellSize = cellSize;

    this.graph = new Graph();

    // the frontier represents the cells that surround or 'wall in' the maze path
    // i.e. the cells that aren't 'part' of the maze but are neighbors of current cell
    this.frontier = [];
  }

  grid() {
    // each node will have a corresponding cell in the graph's collection array
    const x = this.canvas.height / this.cellSize; // 'cols'
    const y = this.canvas.width / this.cellSize; // 'rows'
    console.log(x, y);
    const directions = {
      NORTH: 0, //   0
      SOUTH: 2, // 3 * 1
      EAST: 1,  //   2
      WEST: 3
    };

    const graph = this.graph;
    for (let i = 0; i < y; i += 1) {
      graph.collection[i] = [];
      for (let j = 0; j < x; j += 1) {
        graph.collection[i][j] = graph.node(j, i);
        }
      }
    }
    for (let i = 0; i < y; i += 1) {
      for (let j = 0; j < x; j += 1) {
        // in randomized prim's, edges ('passages') have random weights
        // the `if` statements keep us within range. we generate weighted edges.
        if (i !== y - 1) {
          graph.collection[i][j].neighbors[directions.NORTH] =
            graph.edge(graph.collection[i + 1][j], graph.collection[i][j]);
          graph.collection[i][j].neighbors[directions.SOUTH] =
            graph.edge(graph.collection[i][j], graph.collection[i + 1][j]);
        }
        if (j !== x - 1) {
          graph.collection[i][j].neighbors[directions.EAST] =
            graph.edge(graph.collection[i][j], graph.collection[i][j + 1]);
          graph.collection[i][j].neighbors[directions.WEST] =
            graph.edge(graph.collection[i][j + 1], array[i][j]);
      }
    }

    return this.graph.collection;
  }

  // "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree
  // for a weighted undirected graph" (Wikipedia). This is its randomized implementation.
  // It can be applied as a maze generation algorithm by building a maze "frontier"
  prims() {
    // choose a random node from the graph to 'open' up a path at & observe the frontier

    // add the random node to a set

    // pick an edge that connects a node in the set with another node not in the set

    // add the edge to a minimal spanning tree

    // add the other node of this edge to the set

    // pick & add edges until the set includes every node in the graph

    // color the node since it was (1) visited and (2) parsed
  }

  build() {
    // TODO: while (!built)
    // TODO: implement customization options
    // repeat the prims algorithm until the graph is complete
    // uses an arbitrary time interval (ms) at which to build the maze
    setInterval(() => prim(), 50);
  }

  draw() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
  }
}

export default MazeGenerator;
