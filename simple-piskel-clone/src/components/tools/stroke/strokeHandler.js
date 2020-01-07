import { canvas, canvasSize } from "../../utils/Constants";
import drawingArea from "../../canvas/canvasFunctionality";
import storage from "../../utils/localStorage/localStorage";

const ctx = canvas.getContext("2d");

function strokeHandler(event) {
  const cellSize = drawingArea.pixelSize;

  let lastX = event.offsetX;
  let lastY = event.offsetY;
  let xCell = Math.floor(
    lastX / ((canvasSize / drawingArea.size) * drawingArea.pixelSize)
  );
  let yCell = Math.floor(
    lastY / ((canvasSize / drawingArea.size) * drawingArea.pixelSize)
  );

  ctx.fillStyle = drawingArea.currColor;
  ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);

  function drawingLine(e) {
    const currX = e.offsetX;
    const currY = e.offsetY;

    const deltaX = Math.abs(currX - lastX);
    const deltaY = Math.abs(currY - lastY);
    let error = deltaX - deltaY;

    const stepX = lastX < currX ? 1 : -1;
    const stepY = lastY < currY ? 1 : -1;

    while (lastX !== currX || lastY !== currY) {
      if (error * 2 > -deltaY) {
        error -= deltaY;
        lastX += stepX;
      } else if (error * 2 < deltaX) {
        error += deltaX;
        lastY += stepY;
      }
      xCell = Math.floor(
        lastX / ((canvasSize / drawingArea.size) * drawingArea.pixelSize)
      );
      yCell = Math.floor(
        lastY / ((canvasSize / drawingArea.size) * drawingArea.pixelSize)
      );
      ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
    }
    storage.setImage(canvas.toDataURL());
  }

  function removeListeners() {
    canvas.removeEventListener("mouseup", drawingLine);
    canvas.removeEventListener("mouseout", removeListeners);
    canvas.removeEventListener("mouseup", removeListeners);
  }

  canvas.addEventListener("mouseup", drawingLine);
  canvas.addEventListener("mouseout", removeListeners);
  canvas.addEventListener("mouseup", removeListeners);
}

export default strokeHandler;
