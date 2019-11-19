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
};

export default drawingArea;
