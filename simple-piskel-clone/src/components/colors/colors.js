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

function colorsSwap() {
  const tempColor = drawingArea.primaryColor;
  drawingArea.setPrimaryColor(drawingArea.secondaryColor);
  drawingArea.setSecondaryColor(tempColor);
  primaryColorEl.value = drawingArea.primaryColor;
  secondaryColorEl.value = drawingArea.secondaryColor;
}

export { colorsInit, primaryColorHandler, secondaryColorHandler, colorsSwap };
