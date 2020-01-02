import { canvas } from "../../Constants";
import drawingArea from "../../../js/canvas";
import findColor from "../../utils/findColor";
import fromHexToRGBA from "../../utils/fromHexToRgba";
import fullColorHex from "../../utils/rgbToHex";
import isColorSame from "../../utils/isColorSame";

const ctx = canvas.getContext("2d");

function paintAllBucketHandler() {
  ctx.fillStyle = drawingArea.currColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paintBucketHandler(event) {
  const colorToFill = fromHexToRGBA(drawingArea.currColor);
  const colorToReplace = findColor(event);
  const startX = event.offsetX;
  const startY = event.offsetY;
  const pixelStack = [[startX, startY]];
  const colorLayer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  // console.log("before:", colorLayer);
  // console.log('replace', colorToReplace);
  // console.log('fill', colorToFill);
  if (
    fullColorHex(colorToReplace[0], colorToReplace[1], colorToReplace[2]) ===
    drawingArea.currColor
  ) {
    return;
  }
  while (pixelStack.length) {
    let goLeft = false;
    let goRight = false;
    const newPos = pixelStack.pop();
    const x = newPos[0];
    let y = newPos[1];
    let pixelPos = (y * canvas.width + x) * 4;
    while (y >= 0 && isColorSame(pixelPos, colorLayer, colorToReplace)) {
      pixelPos -= canvas.width * 4;
      y -= 1;
    }
    pixelPos += canvas.width * 4;
    y += 1;
    // console.log('y', y);
    // console.log('true/false',isColorSame(pixelPos, colorLayer, colorToReplace));
    // console.log('y', y, 'height', canvas.height - 1, isColorSame(pixelPos, colorLayer, colorToReplace))
    while (y < canvas.height - 1 && isColorSame(pixelPos, colorLayer, colorToReplace)) {
      y += 1;
      // console.log(colorLayer[pixelPos][0], colorLayer[pixelPos][1], colorLayer[pixelPos][2], colorLayer[pixelPos][3]);
      // console.log( colorToFill.r,  colorToFill.g,  colorToFill.b,  colorToFill.a);
      colorLayer[pixelPos] = colorToFill.r;
      colorLayer[pixelPos + 1] = colorToFill.g;
      colorLayer[pixelPos + 2] = colorToFill.b;
      colorLayer[pixelPos + 3] = colorToFill.a;
      // console.log(colorLayer[pixelPos], colorLayer[pixelPos + 1], colorLayer[pixelPos + 2], colorLayer[pixelPos + 3]);

      if (x > 0) {
        if (isColorSame(pixelPos - 4, colorLayer, colorToReplace)) {
          if (!goLeft) {
            pixelStack.push([x - 1, y]);
            goLeft = true;
          }
        } else if (goLeft) {
          goLeft = false;
        }
      }
      if (x < canvas.width - 1) {
        if (isColorSame(pixelPos + 4, colorLayer, colorToReplace)) {
          if (!goRight) {
            pixelStack.push([x + 1, y]);
            goRight = true;
          }
        } else if (goRight) {
          goRight = false;
        }
      }
      pixelPos += canvas.height * 4;
    }
  }
  // console.log("after:", colorLayer);
  const imageData = new ImageData(colorLayer, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
}

export { paintAllBucketHandler, paintBucketHandler };
