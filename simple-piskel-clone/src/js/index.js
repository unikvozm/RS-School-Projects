import '../css/style.scss';
import setValueInRange from './size-slider';
import storage from './localStorage';
import drawingArea from './canvas';
import { getIndexForActive, setActiveTool } from './tools';
import imageLoad from './imageLoader';
import greyScale from './black&white';

const slider = document.querySelector('.drawing-area__slider');
const canvas = document.querySelector('.drawing-area__canvas');
const previousColor = document.querySelector('.prev-color');
const colorPicker = document.querySelector('.colors__color-picker');
const colors = document.querySelectorAll('.colors__color');
const tools = document.querySelectorAll('.tools__tool');
const loadBtn = document.querySelector('.drawing-area__buttons--load');
const locationInput = document.querySelector(
  '.drawing-area__buttons--location',
);
const bwBtn = document.querySelector('.drawing-area__buttons--b-w');

const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

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
  drawingArea.renderCanvas();
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

// Listeners for an active tool: 0 - paint-bucket, 1 - color-picker, 2 - pencil
tools[0].addEventListener('click', () => setActiveTool(0));
tools[1].addEventListener('click', () => setActiveTool(1));
tools[2].addEventListener('click', () => setActiveTool(2));

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyB':
      setActiveTool(0);
      break;
    case 'KeyP':
      setActiveTool(2);
      break;
    case 'KeyC':
      setActiveTool(1);
      break;
    default:
      break;
  }
});

// Listener for image loading
loadBtn.addEventListener('click', () => {
  // eslint-disable-next-line no-alert
  if (!locationInput.value) alert('Type the city first');
  else imageLoad();
});

// Listener for greyscale
bwBtn.addEventListener('click', greyScale);
