import { canvas, canvasSize } from './Constants';
import drawingArea from '../canvas/canvas';

const ctx = canvas.getContext("2d");

function findColor(event) {
  const xCell = Math.floor(event.offsetX / (canvasSize / drawingArea.size));
  const yCell = Math.floor(event.offsetY / (canvasSize / drawingArea.size));

  const colorData = ctx.getImageData(xCell, yCell, 1, 1);
  return {
    r: colorData.data[0],
    g: colorData.data[1],
    b: colorData.data[2],
    a: colorData.data[3]
  };
}

export default findColor;