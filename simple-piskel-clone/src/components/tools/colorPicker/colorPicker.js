import drawingArea from "../../canvas/canvasFunctionality";
import findColor from "../../utils/findColor/findColor";
import fullColorHex from "../../utils/rgbToHex/rgbToHex";

function colorPickerHandler(event) {
  const color = findColor(event);
  console.log(event.which, event.button);
  if (event.which === 1) {
    drawingArea.setPrimaryColor(fullColorHex(color.r, color.g, color.b));
  } else {
    drawingArea.setSecondaryColor(fullColorHex(color.r, color.g, color.b));
  }
}

export default colorPickerHandler;
