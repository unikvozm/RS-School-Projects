import "./pixelSize.scss";

import drawingArea from "../canvas/canvas";
import { pixelSizeEls } from "../utils/Constants";

function pixelSizeHandler(event) {
  const pixelSize = event.target.id;
  drawingArea.setPixelSize(pixelSize);
  pixelSizeEls.forEach(el => {
    el.classList.remove("size-selected");
  });
  event.target.classList.add("size-selected");
}

function setActivePixelSize() {
  const {pixelSize} = drawingArea;
  pixelSizeEls.forEach(el => {
    el.classList.remove("size-selected");
  });
  document.getElementById(pixelSize).classList.add("size-selected");
}

export { pixelSizeHandler, setActivePixelSize };
