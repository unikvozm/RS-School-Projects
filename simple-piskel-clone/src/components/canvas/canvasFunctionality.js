import storage from '../utils/localStorage/localStorage';
import { canvas, canvasSize } from '../utils/Constants';

const drawingArea = {
  primaryColor: storage.getPrimaryColor(),
  secondaryColor: storage.getSecondaryColor(),
  size: storage.getSize(),
  activeTool: storage.getActiveTool(),
  pixelSize: storage.getPixelSize(),

  setSize: (size) => {
    drawingArea.size = size;
    storage.setSize(size);
  },

  setPixelSize: (size) => {
    drawingArea.pixelSize = size;
    storage.setPixelSize(drawingArea.pixelSize);
  },

  clearCanvas: () => {
    storage.setImage('');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  setPrimaryColor: (color) => {
    drawingArea.primaryColor = color;
    storage.setPrimaryColor(color);
  },

  setSecondaryColor: (color) => {
    drawingArea.secondaryColor = color;
    storage.setSecondaryColor(color);
  },

  setActiveTool: (tool) => {
    drawingArea.activeTool = tool;
    storage.setActiveTool(tool);
  },

  renderCanvas: () => {
    const canvCtx = canvas.getContext('2d');
    canvCtx.imageSmoothingEnabled = false;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    const img = new Image();
    img.src = storage.getImage();
    img.addEventListener('load', () => {
      canvCtx.drawImage(img, 0, 0);
    });
  },
};

export default drawingArea;
