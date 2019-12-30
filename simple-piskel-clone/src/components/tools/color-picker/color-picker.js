import { canvas } from "../../Constants";
import drawingArea from "../../../js/canvas";

const ctx = canvas.getContext("2d");

const rgbToHex = rgb => {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) hex = `0${hex}`;
  return hex;
};

const fullColorHex = (r, g, b) => {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return `#${red}${green}${blue}`;
};

function findColor(event) {
  const cell = event.target.getBoundingClientRect();

  const xCell = event.clientX - cell.left;
  const yCell = event.clientY - cell.top;

  const colorData = ctx.getImageData(xCell, yCell, 1, 1);
  return fullColorHex(colorData.data[0], colorData.data[1], colorData.data[2]);
}

function colorPickerHandler(event) {
  const color = findColor(event);
  console.log(color);
  drawingArea.setCurrentColor(color);
}

export { colorPickerHandler, findColor };
