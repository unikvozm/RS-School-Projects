import { canvas, canvasSize } from "../../utils/Constants";
import drawingArea from "../../canvas/canvas";
import findColor from "../../utils/findColor";
import fromHexToRGBA from "../../utils/fromHexToRgba";
import fullColorHex from "../../utils/rgbToHex";
import isColorSame from "../../utils/isColorSame";
import storage from "../../utils/localStorage";

function paintAllBucketHandler() {
  const ctx = canvas.getContext("2d");
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
  const ctx = canvas.getContext("2d");
  const colorLayer = ctx.getImageData(0, 0, drawingArea.size, drawingArea.size)
    .data;

  if (
    fullColorHex(colorToReplace[0], colorToReplace[1], colorToReplace[2]) ===
    drawingArea.currColor
  ) {
    return;
  }
  while (pixelStack.length) {
    let isLeftBorder = false;
    let isRightBorder = false;
    const newPos = pixelStack.pop();
    const x = newPos[0];
    let y = newPos[1];
    let pixelPos = (y * drawingArea.size + x) * 4;
    while (y >= 0 && isColorSame(pixelPos, colorLayer, colorToReplace)) {
      pixelPos -= drawingArea.size * 4;
      y -= 1;
    }
    pixelPos += drawingArea.size * 4;
    y += 1;

    while (
      y <= drawingArea.size - 1 &&
      isColorSame(pixelPos, colorLayer, colorToReplace)
    ) {
      y += 1;
      colorLayer[pixelPos] = colorToFill.r;
      colorLayer[pixelPos + 1] = colorToFill.g;
      colorLayer[pixelPos + 2] = colorToFill.b;
      colorLayer[pixelPos + 3] = colorToFill.a;

      if (x >= 0) {
        if (isColorSame(pixelPos - 4, colorLayer, colorToReplace)) {
          if (!isLeftBorder) {
            pixelStack.push([x - 1, y]);
            isLeftBorder = true;
          }
        } else if (isLeftBorder) {
          isLeftBorder = false;
        }
      }
      if (x <= drawingArea.size - 1) {
        if (isColorSame(pixelPos + 4, colorLayer, colorToReplace)) {
          if (!isRightBorder) {
            pixelStack.push([x + 1, y]);
            isRightBorder = true;
          }
        } else if (isRightBorder) {
          isRightBorder = false;
        }
      }
      pixelPos += drawingArea.size * 4;
    }
  }
  // console.log("after:", colorLayer);
  const imageData = new ImageData(colorLayer, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
  storage.setImage(canvas.toDataURL());
}

export { paintAllBucketHandler, paintBucketHandler };
