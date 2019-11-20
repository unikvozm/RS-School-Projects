import storage from './localStorage';

const canvas = document.querySelector('.drawing-area__canvas');
const previousColor = document.querySelector('.prev-color');
const colorPicker = document.querySelector('.colors__color-picker');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');

const drawingArea = {
  prevColor: storage.getPrevColor(),
  currColor: storage.getCurColor(),
  size: storage.getSize(),
  activeTool: storage.getActiveTool(),

  setSize: (size) => {
    drawingArea.size = size;
    storage.setSize(drawingArea.size);
  },

  clearCanvas: () => {
    storage.setImage('');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },

  setCurrentColor: (color) => {
    drawingArea.prevColor = drawingArea.currColor;
    drawingArea.currColor = color;
    storage.setPrevColor(drawingArea.prevColor);
    storage.setCurColor(drawingArea.currColor);
    colorPicker.value = drawingArea.currColor;
    previousColor.style.backgroundColor = drawingArea.prevColor;
  },

  setActiveTool: (tool) => {
    drawingArea.activeTool = tool;
    storage.setActiveTool(tool);
  },

  renderCanvas: () => {
    const canv = document.createElement('canvas');
    canv.width = drawingArea.size;
    canv.height = drawingArea.size;
    canv.style.imageRendering = 'pixelated';

    const canvCtx = canv.getContext('2d');
    canvCtx.imageSmoothingEnabled = false;
    let canvSrc = canvas.toDataURL();

    const tempImg = new Image();
    tempImg.src = canvSrc;
    tempImg.addEventListener('load', () => {
      canvCtx.drawImage(tempImg, 0, 0, drawingArea.size, drawingArea.size);
      canvSrc = canv.toDataURL();

      const img = new Image();
      img.src = canvSrc;
      img.addEventListener('load', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
    });
  },
};

export default drawingArea;
