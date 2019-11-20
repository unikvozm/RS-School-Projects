import drawingArea from './canvas';
import storage from './localStorage';

const canvas = document.querySelector('.drawing-area__canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const tools = document.querySelectorAll('.tools__tool');

// Pencil tool

let isDrawing = false;

function drawing(event) {
  if (isDrawing) {
    const cellSize = Math.round(canvas.width / drawingArea.size);
    const cell = event.target.getBoundingClientRect();

    const xCell = Math.floor((event.clientX - cell.left) / cellSize);
    const yCell = Math.floor((event.clientY - cell.top) / cellSize);

    ctx.fillStyle = drawingArea.currColor;
    ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
  }
}

function drawWithPencil(event, how) {
  canvas.style.cursor = 'url(../assets/pencil.svg), auto';
  switch (how) {
    case 'mousemove':
      drawing(event);
      break;
    case 'mousedown':
      isDrawing = true;
      drawing(event);
      break;
    case 'mouseup':
    case 'mouseout':
      isDrawing = false;
      storage.setImage();
      break;
    default:
      break;
  }
}

// Paint bucket tool
function colorCanvas() {
  if (drawingArea.activeTool === 'paint-bucket') {
    canvas.style.cursor = 'url(../assets/paint-bucket.svg), auto';
    ctx.fillStyle = drawingArea.currColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// Color-picker
const rgbToHex = (rgb) => {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) hex = `0${hex}`;
  return hex;
};

const fullColorHex = (r, g, b) => {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return `#${red}${green}${blue}`;
};

function findColor(event) {
  const cell = event.target.getBoundingClientRect();

  const xCell = event.clientX - cell.left;
  const yCell = event.clientY - cell.top;

  const colorData = ctx.getImageData(xCell, yCell, 1, 1);
  drawingArea.setCurrentColor(
    fullColorHex(colorData.data[0], colorData.data[1], colorData.data[2]),
  );
}

function pickColor(event) {
  canvas.style.cursor = 'url(../assets/color-picker.svg), auto';
  findColor(event);
}

function getIndexForActive(tool) {
  switch (tool) {
    case 'paint-bucket':
      return 0;
    case 'color-picker':
      return 1;
    case 'pencil':
      return 2;
    default:
      break;
  }
  return -1;
}


function setActiveTool(ind) {
  tools.forEach((t) => t.classList.remove('active-tool'));
  switch (ind) {
    case 0:
      drawingArea.setActiveTool('paint-bucket');
      canvas.addEventListener(
        'mousemove',
        () => {
          canvas.style.cursor = 'url(../assets/paint-bucket.svg), auto';
        },
        false,
      );
      break;
    case 1:
      drawingArea.setActiveTool('color-picker');
      canvas.addEventListener(
        'mousemove',
        () => {
          canvas.style.cursor = 'url(../assets/color-picker.svg), auto';
        },
        false,
      );

      break;
    case 2:
      drawingArea.setActiveTool('pencil');
      canvas.addEventListener(
        'mousemove',
        () => {
          canvas.style.cursor = 'url(../assets/pencil.svg), auto';
        },
        false,
      );
      break;
    default:
      break;
  }
}

export {
  drawWithPencil, colorCanvas, pickColor, getIndexForActive, setActiveTool,
};
