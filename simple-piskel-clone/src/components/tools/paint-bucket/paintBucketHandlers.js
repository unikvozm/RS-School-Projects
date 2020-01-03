import { canvas, canvasSize } from "../../utils/Constants";
import drawingArea from "../../../js/canvas";
import findColor from "../../utils/findColor";
import fromHexToRGBA from "../../utils/fromHexToRgba";
import fullColorHex from "../../utils/rgbToHex";
import isColorSame from "../../utils/isColorSame";
import storage from '../../utils/localStorage';

const ctx = canvas.getContext("2d");

function paintAllBucketHandler() {
  ctx.fillStyle = drawingArea.currColor;
  ctx.fillRect(0, 0, drawingArea.size, drawingArea.size);
  storage.setImage(canvas.toDataURL());
}

function paintBucketHandler(event) {
  const colorToFill = fromHexToRGBA(drawingArea.currColor);
  const colorToReplace = findColor(event);
  const startX = Math.floor(event.offsetX / (canvasSize / drawingArea.size));
  const startY = Math.floor(event.offsetY / (canvasSize / drawingArea.size));
  const pixelStack = [[startX, startY]];
  const colorLayer = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

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

    while (y < canvas.height - 1 && isColorSame(pixelPos, colorLayer, colorToReplace)) {
      y += 1;
      colorLayer[pixelPos] = colorToFill.r;
      colorLayer[pixelPos + 1] = colorToFill.g;
      colorLayer[pixelPos + 2] = colorToFill.b;
      colorLayer[pixelPos + 3] = colorToFill.a;

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
  storage.setImage(canvas.toDataURL());
}

export { paintAllBucketHandler, paintBucketHandler };
