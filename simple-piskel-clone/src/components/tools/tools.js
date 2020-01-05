import "./tools.scss";

import drawingArea from "../canvas/canvas";
import {
  canvas,
  toolsEl,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName
} from "../utils/Constants";
import penHandler from "./pen/penHandler";
import {
  paintAllBucketHandler,
  paintBucketHandler
} from "./paintBucket/paintBucketHandlers";
import colorPickerHandler from "./colorPicker/colorPicker";
import eraserHandler from "./eraser/eraserHandler";
import strokeHandler from "./stroke/strokeHandler";

function removeAllEventListeners() {
  canvas.removeEventListener("mousedown", penHandler);
  canvas.removeEventListener("mousedown", strokeHandler);
  canvas.removeEventListener("click", paintBucketHandler);
  canvas.removeEventListener("click", paintAllBucketHandler);
  canvas.removeEventListener("click", colorPickerHandler);
  canvas.removeEventListener("mousedown", eraserHandler);
}

function removeCursors() {
  canvas.classList.remove("cursor-pen");
  canvas.classList.remove("cursor-stroke");
  canvas.classList.remove("cursor-paint-bucket");
  canvas.classList.remove("cursor-color-picker");
  canvas.classList.remove("cursor-eraser");
}

function setActiveTool(tool) {
  toolsEl.forEach(toolEl => toolEl.classList.remove("active-tool"));
  drawingArea.setActiveTool(tool);
  removeAllEventListeners();
  removeCursors();

  switch (tool) {
    case toolsName.pen:
      canvas.classList.add("cursor-pen");
      penEl.classList.add("active-tool");
      canvas.addEventListener("mousedown", penHandler);
      break;
    case toolsName.stroke:
      canvas.classList.add("cursor-stroke");
      strokeEl.classList.add("active-tool");
      canvas.addEventListener("mousedown", strokeHandler);
      break;
    case toolsName.paintBucket:
      canvas.classList.add("cursor-paint-bucket");
      paintBucketEl.classList.add("active-tool");
      canvas.addEventListener("click", paintBucketHandler);
      break;
    case toolsName.paintAllBucket:
      canvas.classList.add("cursor-paint-bucket");
      paintAllBucketEl.classList.add("active-tool");
      canvas.addEventListener("click", paintAllBucketHandler);
      break;
    case toolsName.colorPicker:
      canvas.classList.add("cursor-color-picker");
      colorPickerEl.classList.add("active-tool");
      canvas.addEventListener("click", colorPickerHandler);
      break;
    case toolsName.eraser:
      canvas.classList.add("cursor-eraser");
      eraserEl.classList.add("active-tool");
      canvas.addEventListener("mousedown", eraserHandler);
      break;
    default:
      break;
  }
}

export default setActiveTool;
