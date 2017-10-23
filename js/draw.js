import * as CNS from './constants.js';

class Draw {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.drawn = {};
  }

  drawEdge(edge, colorStep, customColor) {
    this.ctx.fillStyle = customColor || CNS.PRIMSCOLORS[colorStep];
    this.ctx.fillRect(
      ((edge.nodeFrom.x + edge.nodeTo.x) / 2), // edge is in btwn nodeFrom & nodeTo
      ((edge.nodeFrom.y + edge.nodeTo.y) / 2),
      CNS.CELLSIZE, CNS.CELLSIZE,
    );
  }

  drawNode(node, colorStep, customColor) {
    this.ctx.fillStyle = customColor || CNS.PRIMSCOLORS[colorStep];
    this.ctx.fillRect(node.x, node.y, CNS.CELLSIZE, CNS.CELLSIZE);
  }

  drawPath(nodes, style, force) {
    this.ctx.fillStyle = style === 'visit' ? CNS.VISITCOLOR : CNS.SOLUTIONCOLOR;
    nodes.forEach((node) => {
      const edgeId = `${node[0].nodeFrom.x} ${node[0].nodeFrom.y} ${node[0].nodeTo.x} ${node[0].nodeTo.y}`;
      if (!this.drawn[edgeId] || force) this.drawEdge(node[0]);
      this.drawn[edgeId] = true;

      let x;
      let y;
      style === 'visit' ? ({x, y} = node[1]) : ([x, y] = node[1].split(', '));
      const nodeId = `${x} | ${y}`;
      if (!this.drawn[nodeId] || force) {
        this.ctx.fillRect(x, y, CNS.CELLSIZE, CNS.CELLSIZE);
        this.drawn[nodeId] = true;
      }
    });
  }

  // TODO: DRY
  drawEnds(nodes) {
    const startAndEnd = nodes.map(node => node.split(', '));
    this.ctx.strokeStyle = CNS.SOLUTIONCOLOR;
    this.ctx.lineWidth = 4;
    this.ctx.fillStyle = CNS.STARTCOLOR;
    this.ctx.fillRect(startAndEnd[0][0], startAndEnd[0][1], (CNS.CELLSIZE * 1.5), (CNS.CELLSIZE * 1.5));
    this.ctx.strokeRect(startAndEnd[0][0] - (CNS.CELLSIZE / 4), startAndEnd[0][1] - (CNS.CELLSIZE / 4), (CNS.CELLSIZE * 1.5), (CNS.CELLSIZE * 1.5));
    this.ctx.fillStyle = CNS.ENDCOLOR;
    this.ctx.fillRect(startAndEnd[1][0], startAndEnd[1][1], (CNS.CELLSIZE * 1.5), (CNS.CELLSIZE * 1.5));
    this.ctx.strokeRect(startAndEnd[1][0] - (CNS.CELLSIZE / 4), startAndEnd[1][1] - (CNS.CELLSIZE / 4), (CNS.CELLSIZE * 1.5), (CNS.CELLSIZE * 1.5));
    this.ctx.stroke();
  }
}

export default Draw;
