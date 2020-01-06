import drawingArea from "../../canvas/canvasFunctionality";
import findColor from '../../utils/findColor/findColor';
import fullColorHex from '../../utils/rgbToHex/rgbToHex';

function colorPickerHandler(event) {
  const color = findColor(event);
  drawingArea.setCurrentColor(fullColorHex(color.r, color.g, color.b));
}

export default colorPickerHandler;
