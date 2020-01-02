import { canvas } from '../Constants';

const ctx = canvas.getContext("2d");

function findColor(event) {
  const cell = event.target.getBoundingClientRect();

  const xCell = event.clientX - cell.left;
  const yCell = event.clientY - cell.top;

  const colorData = ctx.getImageData(xCell, yCell, 1, 1);
  return {
    r: colorData.data[0],
    g: colorData.data[1],
    b: colorData.data[2],
    a: colorData.data[3]
  };
}

export default findColor;