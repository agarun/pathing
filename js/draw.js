import * as CNS from './constants.js';

class Draw {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  drawEdge(edge, colorStep) {
    this.ctx.fillStyle = CNS.PRIMSCOLORS[colorStep];
    this.ctx.fillRect(
      ((edge.nodeFrom.x + edge.nodeTo.x) / 2), // edge is in btwn nodeFrom & nodeTo
      ((edge.nodeFrom.y + edge.nodeTo.y) / 2),
      CNS.CELLSIZE, CNS.CELLSIZE,
    );
  }

  drawNode(node, colorStep) {
    this.ctx.fillStyle = colorStep === undefined ? '#fff' : CNS.PRIMSCOLORS[colorStep];
    this.ctx.fillRect(node.x, node.y, CNS.CELLSIZE, CNS.CELLSIZE);
  }

  drawPath(nodes, style) {
    this.ctx.fillStyle = style === 'visit' ? CNS.VISITCOLOR : CNS.SOLUTIONCOLOR;
    nodes.forEach((node) => {
      let x;
      let y;
      style === 'visit' ? ({x, y} = node[1]) : ([x, y] = node[1].split(', '));
      this.ctx.fillRect(x, y, CNS.CELLSIZE, CNS.CELLSIZE);
      this.ctx.fillRect(
        ((node[0].nodeFrom.x + node[0].nodeTo.x) / 2), // edge is in btwn nodeFrom & nodeTo
        ((node[0].nodeFrom.y + node[0].nodeTo.y) / 2),
        CNS.CELLSIZE, CNS.CELLSIZE,
      );
    });
  }
}

export default Draw;
