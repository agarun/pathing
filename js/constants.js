const WIDTH = 1024;
const HEIGHT = 640;

const CELLSIZE = 8;
const BLOCKWIDTH = CELLSIZE * 2;

// each node will have a corresponding cell in the graph's collection array
const NUMROWS = HEIGHT / BLOCKWIDTH;
const NUMCOLS = WIDTH / BLOCKWIDTH;

// setInterval() terminates when each node of NUMROWS & NUMCOLS is traversed
const PROGRESS = ((WIDTH * HEIGHT) / (BLOCKWIDTH ** 2)) - 1;

// TODO: array of colors & choosing darker colors in steps
// const PRIMSCOLOR = '#7af9da';
const PRIMSCOLOR = '#54ff9e';

export {
  WIDTH,
  HEIGHT,
  CELLSIZE,
  BLOCKWIDTH,
  NUMROWS,
  NUMCOLS,
  PROGRESS,
  PRIMSCOLOR,
};
