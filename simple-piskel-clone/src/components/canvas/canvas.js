import './canvas.scss';

import storage from "../utils/localStorage";
import { canvas, canvasSize } from '../utils/Constants';

const previousColorEl = document.querySelector(".prev-color");
const colorPicker = document.querySelector(".colors__color-picker");

const drawingArea = {
  prevColor: storage.getPrevColor(),
  currColor: storage.getCurColor(),
  size: storage.getSize(),
  activeTool: storage.getActiveTool(),
  pixelSize: storage.getPixelSize(),

  setSize: size => {
    drawingArea.size = size;
    storage.setSize(drawingArea.size);
    canvas.width = size;
    canvas.height = size;
  },

  setPixelSize: size => {
    drawingArea.pixelSize = size;
    storage.setPixelSize(drawingArea.pixelSize);
  },

  clearCanvas: () => {
    storage.setImage("");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  setCurrentColor: color => {
    drawingArea.prevColor = drawingArea.currColor;
    drawingArea.currColor = color;
    storage.setPrevColor(drawingArea.prevColor);
    storage.setCurColor(drawingArea.currColor);
    colorPicker.value = drawingArea.currColor;
    previousColorEl.style.backgroundColor = drawingArea.prevColor;
  },

  setActiveTool: tool => {
    drawingArea.activeTool = tool;
    storage.setActiveTool(tool);
  },

  renderCanvas: () => {
    const canvCtx = canvas.getContext("2d");
    canvCtx.imageSmoothingEnabled = false;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
    
    const img = new Image();
    img.src = storage.getImage();
    img.addEventListener("load", () => {
      canvCtx.drawImage(img, 0, 0);
    });
  }
};

export default drawingArea;
