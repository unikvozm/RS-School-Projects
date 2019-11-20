import setValueInRange from './size-slider';
import storage from './localStorage';
import drawingArea from './canvas';
import {
  drawWithPencil, colorCanvas, pickColor, getIndexForActive, setActiveTool,
} from './tools';

const slider = document.querySelector('.drawing-area__slider');
const canvas = document.querySelector('.drawing-area__canvas');
const ctx = canvas.getContext('2d');
const previousColor = document.querySelector('.prev-color');
const colorPicker = document.querySelector('.colors__color-picker');
const colors = document.querySelectorAll('.colors__color');
const tools = document.querySelectorAll('.tools__tool');

// Event listeners
slider.onchange = () => setValueInRange();

window.onload = () => {
  colorPicker.value = drawingArea.currColor;
  previousColor.style.backgroundColor = drawingArea.prevColor;
  slider.value = drawingArea.size;
  setValueInRange();
  tools[getIndexForActive(drawingArea.activeTool)].classList.add('active-tool');
  const img = new Image();
  img.src = storage.getImage();
  if (img.src !== null) {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
};

window.onbeforeunload = () => {
  storage.setImage(canvas.toDataURL());
};

colorPicker.onchange = () => {
  drawingArea.setCurrentColor(colorPicker.value);
};

colors.forEach((color, index) => {
  color.addEventListener('click', () => {
    switch (index) {
      case 1:
        drawingArea.setCurrentColor(drawingArea.prevColor);
        break;
      case 2:
        drawingArea.setCurrentColor('#f74141');
        break;
      case 3:
        drawingArea.setCurrentColor('#00BCD4');
        break;
      default:
        break;
    }
  });
});

// Listeners for an active tool
tools.forEach((tool, ind) => {
  tool.addEventListener('click', setActiveTool(ind), false);
  tool.classList.add('active-tool');
});

// event listeners to Pencil Tool
canvas.addEventListener(
  'mousemove',
  (event) => {
    if (drawingArea.activeTool === 'pencil') drawWithPencil(event, 'mousemove');
  },
  false,
);
canvas.addEventListener(
  'mousedown',
  (event) => {
    if (drawingArea.activeTool === 'pencil') drawWithPencil(event, 'mousedown');
  },
  false,
);
canvas.addEventListener(
  'mouseup',
  (event) => {
    if (drawingArea.activeTool === 'pencil') drawWithPencil(event, 'mouseup');
  },
  false,
);
canvas.addEventListener(
  'mouseout',
  (event) => {
    if (drawingArea.activeTool === 'pencil') drawWithPencil(event, 'mouseout');
  },
  false,
);

// event listeners to Paint Bucket and Color Picker Tools
canvas.addEventListener(
  'click',
  (event) => {
    if (drawingArea.activeTool === 'paint-bucket') colorCanvas();
    else if (drawingArea.activeTool === 'color-picker') pickColor(event);
  },
  false,
);
