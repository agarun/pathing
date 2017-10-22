const WIDTH = 1024;
const HEIGHT = 640;

const CELLSIZE = 8;
const BLOCKWIDTH = CELLSIZE * 2;

// each node will have a corresponding cell in the graph's collection array
const NUMROWS = HEIGHT / BLOCKWIDTH;
const NUMCOLS = WIDTH / BLOCKWIDTH;

// to observe a cell's surroundings, we store information about each of their neighbors
const DIRECTIONS = {
  NORTH: 0, //   0
  SOUTH: 2, // 3 * 1
  EAST: 1, //    2
  WEST: 3,
};

// setInterval() terminates when each node of NUMROWS & NUMCOLS is traversed
const PROGRESS = ((WIDTH * HEIGHT) / (BLOCKWIDTH ** 2)) - 1;

const PRIMSCOLORS = {
  0.00: "#ffffff", 0.05: '#ffffff', 0.10: '#f5fff9',
  0.15: '#f5fff9', 0.20: '#f0fff6', 0.25: '#eafbf1',
  0.30: '#e2fced', 0.35: '#d2fae3', 0.40: '#c7fcde',
  0.45: '#aff6cd', 0.50: '#a0f4c4', 0.55: '#93f5bd',
  0.60: '#7cf4b0', 0.65: '#67f6a5', 0.70: '#54ff9e',
  0.75: '#49f694', 0.80: '#ffffff', 0.85: '#ffffff',
  0.90: '#ffffff', 0.95: '#ffffff', 1.00: '#ffffff',
};
const VISITCOLOR = 'rgba(249, 63, 44, 0.8)';
const SOLUTIONCOLOR = '#120b3c'; // webpage background

export {
  WIDTH,
  HEIGHT,
  CELLSIZE,
  BLOCKWIDTH,
  NUMROWS,
  NUMCOLS,
  DIRECTIONS,
  PROGRESS,
  PRIMSCOLORS,
  VISITCOLOR,
  SOLUTIONCOLOR,
};
