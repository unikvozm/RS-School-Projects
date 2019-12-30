import { canvas } from "../../Constants";
import drawingArea from "../../../js/canvas";

const ctx = canvas.getContext("2d");

function paintAllBucketHandler() {
  ctx.fillStyle = drawingArea.currColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const fromHexToRGBA = hex => {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
    a: 255
  };
};

class CanvasFloodFiller {
  constructor() {
    // Canvas width and height
    this.cWidth = -1;
    this.cHeight = -1;

    // Color to change
    this.rR = 0;
    this.rG = 0;
    this.rB = 0;
    this.rA = 0;

    // Color to fill
    this.nR = 0;
    this.nG = 0;
    this.nB = 0;
    this.nA = 0;

    this.data = null;
  }

  getDot(x, y) {
    const dstart = y * this.cWidth * 4 + x * 4;
    const dr = this.data[dstart];
    const dg = this.data[dstart + 1];
    const db = this.data[dstart + 2];
    const da = this.data[dstart + 3];
    console.log({ r: dr, g: dg, b: db, a: da });
    return { r: dr, g: dg, b: db, a: da };

  };

  isNeededPixel (x, y) {
    const dstart = y * this.cWidth * 4 + x * 4;
    const dr = this.data[dstart];
    const dg = this.data[dstart + 1];
    const db = this.data[dstart + 2];
    const da = this.data[dstart + 3];

    return (
      dr === this.rR && dg === this.rG && db === this.rB && da === this.rA
    );
  };

  findLeftPixel (x, y) {
    // Go to 1px left and color it. Return left border.
    // findLeftPixel doesn't color the current px in order to enabling findRightPixel()
    let lx = x - 1;
    let dCoord = y * this.cWidth * 4 + lx * 4;

    while (
      lx >= 0 &&
      this.data[dCoord] === this.rR &&
      this.data[dCoord + 1] === this.rG &&
      this.data[dCoord + 2] === this.rB &&
      this.data[dCoord + 3] === this.rA
    ) {
      this.data[dCoord] = this.nR;
      this.data[dCoord + 1] = this.nG;
      this.data[dCoord + 2] = this.nB;
      this.data[dCoord + 3] = this.nA;

      lx -= 1;
      dCoord -= 4;
    }

    return lx + 1;
  };

  findRightPixel (x, y) {
    let rx = x;
    let dCoord = y * this.cWidth * 4 + x * 4;

    while (
      rx < this.cWidth &&
      this.data[dCoord] === this.rR &&
      this.data[dCoord + 1] === this.rG &&
      this.data[dCoord + 2] === this.rB &&
      this.data[dCoord + 3] === this.rA
    ) {
      this.data[dCoord] = this.nR;
      this.data[dCoord + 1] = this.nG;
      this.data[dCoord + 2] = this.nB;
      this.data[dCoord + 3] = this.nA;

      rx += 1;
      dCoord += 4;
    }

    return rx - 1;
  };

  effectiveFill (cx, cy) {
    console.log('start filling');
    const lineQueue = [];

    const fx1 = this.findLeftPixel(cx, cy);
    const fx2 = this.findRightPixel(cx, cy);

    lineQueue.push({ x1: fx1, x2: fx2, y: cy });

    while (lineQueue.length > 0) {
      const cLine = lineQueue.shift();
      let nx1 = cLine.x1;
      let nx2 = cLine.x1;
      let currx = nx2;

      // Can we go up?
      if (cLine.y > 0) {
        // Is upper line on the left?
        if (this.isNeededPixel(cLine.x1, cLine.y - 1)) {
          nx1 = this.findLeftPixel(cLine.x1, cLine.y - 1);
          nx2 = this.findRightPixel(cLine.x1, cLine.y - 1);
          lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });
        }

        currx = nx2;

        while (
          cLine.x2 >= nx2 &&
          currx <= cLine.x2 &&
          currx < this.cWidth - 1
        ) {
          currx += 1;

          if (this.isNeededPixel(currx, cLine.y - 1)) {
            nx1 = currx;
            nx2 = this.findRightPixel(currx, cLine.y - 1);
            lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y - 1 });

            currx = nx2;
          }
        }
      }

      nx1 = cLine.x1;
      nx2 = cLine.x1;
      // Can we go lower?
      if (cLine.y < this.cHeight - 1) {
        // Is the lower line on the left?
        if (this.isNeededPixel(cLine.x1, cLine.y + 1)) {
          nx1 = this.findLeftPixel(cLine.x1, cLine.y + 1);
          nx2 = this.findRightPixel(cLine.x1, cLine.y + 1);
          lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
        }

        currx = nx2;

        while (
          cLine.x2 >= nx2 &&
          currx <= cLine.x2 &&
          currx < this.cWidth - 1
        ) {
          currx += 1;

          if (this.isNeededPixel(currx, cLine.y + 1)) {
            nx1 = currx;
            nx2 = this.findRightPixel(currx, cLine.y + 1);
            lineQueue.push({ x1: nx1, x2: nx2, y: cLine.y + 1 });
            currx = nx2;
          }
        }
      }
    }
  };

  floodFill (canvasContext, x, y, color) {
    console.log('start');
    this.cWidth = canvasContext.canvas.width;
    this.cHeight = canvasContext.canvas.height;

    this.nR = color.r;
    this.nG = color.g;
    this.nB = color.b;
    this.nA = color.a;

    console.log('current:',this.nR, this.nG, this.nB, this.nA );
    const idata = canvasContext.getImageData(0, 0, this.cWidth, this.cHeight);
    const pixels = idata.data;
    this.data = pixels;

    const toReplace = this.getDot(x, y);
    this.rR = toReplace.r;
    this.rG = toReplace.g;
    this.rB = toReplace.b;
    this.rA = toReplace.a;
    console.log(toReplace);
    if (
      this.rR === this.nR &&
      this.rG === this.nG &&
      this.rB === this.nB &&
      this.rA === this.nA
    )
      return;

    this.effectiveFill(x, y);

    canvasContext.putImageData(idata, 0, 0);
  };
}

function paintBucketHandler(event) {
  const colorToFill = fromHexToRGBA(drawingArea.currColor);
  const cff = new CanvasFloodFiller();
  cff.floodFill(ctx, event.clientX, event.clientY, colorToFill);
}

export { paintAllBucketHandler, paintBucketHandler };
