import { canvas, canvasSize } from '../../utils/Constants';
import drawingArea from '../../canvas/canvasFunctionality';
import findColor from '../../utils/findColor/findColor';
import fromHexToRGBA from '../../utils/fromHexToRgba/fromHexToRgba';
import fullColorHex from '../../utils/rgbToHex/rgbToHex';
import isColorSame from '../../utils/isColorSame/isColorSame';
import storage from '../../utils/localStorage/localStorage';

function paintAllBucketHandler(event) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = event.which === 1 ? drawingArea.primaryColor : drawingArea.secondaryColor;
  ctx.fillRect(0, 0, drawingArea.size, drawingArea.size);
  storage.setImage(canvas.toDataURL());
}

function paintBucketHandler(event) {
  let colorToFill = event.which === 1 ? drawingArea.primaryColor : drawingArea.secondaryColor;
  colorToFill = fromHexToRGBA(colorToFill);
  const colorToReplace = findColor(event);
  const startX = Math.floor(event.offsetX / (canvasSize / drawingArea.size));
  const startY = Math.floor(event.offsetY / (canvasSize / drawingArea.size));
  const pixelStack = [[startX, startY]];
  const ctx = canvas.getContext('2d');
  const colorArr = ctx.getImageData(0, 0, drawingArea.size, drawingArea.size)
    .data;

  // If color to fill = color to replace => do nothing
  if (
    fullColorHex(colorToReplace[0], colorToReplace[1], colorToReplace[2])
    === drawingArea.currColor
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
    while (y >= 0 && isColorSame(pixelPos, colorArr, colorToReplace)) {
      y -= 1;
      pixelPos -= drawingArea.size * 4;
    }
    pixelPos += drawingArea.size * 4;
    y += 1;

    while (
      y <= drawingArea.size - 1
      && isColorSame(pixelPos, colorArr, colorToReplace)
    ) {
      y += 1;
      colorArr[pixelPos] = colorToFill.r;
      colorArr[pixelPos + 1] = colorToFill.g;
      colorArr[pixelPos + 2] = colorToFill.b;
      colorArr[pixelPos + 3] = colorToFill.a;

      if (x > 0) {
        if (isColorSame(pixelPos - 4, colorArr, colorToReplace)) {
          if (!isLeftBorder) {
            pixelStack.push([x - 1, y]);
            isLeftBorder = true;
          }
        } else if (isLeftBorder) {
          isLeftBorder = false;
        }
      }

      if (x < drawingArea.size - 1) {
        if (isColorSame(pixelPos + 4, colorArr, colorToReplace)) {
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

  const imageData = new ImageData(colorArr, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
  storage.setImage(canvas.toDataURL());
}

export { paintAllBucketHandler, paintBucketHandler };
