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

  // TODO: DRY
  drawSpecial(nodes) {
    const startAndEnd = nodes.map(node => node.split(', '));
    this.ctx.strokeStyle = CNS.SOLUTIONCOLOR;
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.fillStyle = CNS.STARTCOLOR;
    this.ctx.arc((+startAndEnd[0][0] + (CNS.CELLSIZE / 2)), (+startAndEnd[0][1] + (CNS.CELLSIZE / 2)), (CNS.CELLSIZE / 1.2), 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.fillStyle = CNS.ENDCOLOR;
    this.ctx.arc((+startAndEnd[1][0] + (CNS.CELLSIZE / 2)), (+startAndEnd[1][1] + (CNS.CELLSIZE / 2)), (CNS.CELLSIZE / 1.2), 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export default Draw;
