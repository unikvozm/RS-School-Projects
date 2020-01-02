import drawingArea from "../../../js/canvas";
import findColor from '../../utils/findColor';
import fullColorHex from '../../utils/rgbToHex';

function colorPickerHandler(event) {
  const color = findColor(event);
  drawingArea.setCurrentColor(fullColorHex(color.r, color.g, color.b));
}

export default colorPickerHandler;
