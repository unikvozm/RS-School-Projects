import "./colors.scss";
import { primaryColorEl, secondaryColorEl } from "../utils/Constants";
import drawingArea from "../canvas/canvasFunctionality";

function colorsInit() {
  primaryColorEl.value = drawingArea.primaryColor;
  secondaryColorEl.value = drawingArea.secondaryColor;
}

function primaryColorHandler() {
  drawingArea.setPrimaryColor(primaryColorEl.value);
}

function secondaryColorHandler() {
  drawingArea.setSecondaryColor(secondaryColorEl.value);
}

export { colorsInit, primaryColorHandler, secondaryColorHandler };
