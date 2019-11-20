import drawingArea from './canvas';

const canvas = document.querySelector('.drawing-area__canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const tools = document.querySelectorAll('.tools__tool');

// Pencil tool
function drawingLine(event) {
  canvas.style.cursor = 'url(../assets/pencil.svg), auto';
  const cellSize = Math.round(canvas.width / drawingArea.size);

  let lastX = event.offsetX;
  let lastY = event.offsetY;
  let xCell = Math.floor(lastX / cellSize);
  let yCell = Math.floor(lastY / cellSize);

  ctx.fillStyle = drawingArea.currColor;
  ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);

  function drawing(e) {
    const currX = e.offsetX;
    const currY = e.offsetY;

    const deltaX = Math.abs(currX - lastX);
    const deltaY = Math.abs(currY - lastY);
    let error = deltaX - deltaY;

    const stepX = lastX < currX ? 1 : -1;
    const stepY = lastY < currY ? 1 : -1;

    while (lastX !== currX || lastY !== currY) {
      if (error * 2 > -deltaY) {
        error -= deltaY;
        lastX += stepX;
      } else if (error * 2 < deltaX) {
        error += deltaX;
        lastY += stepY;
      }
      xCell = Math.floor(lastX / cellSize);
      yCell = Math.floor(lastY / cellSize);
      ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
    }
  }

  function removeListeners() {
    canvas.removeEventListener('mousemove', drawing);
    canvas.removeEventListener('mouseout', removeListeners);
    canvas.removeEventListener('mouseup', removeListeners);
  }

  canvas.addEventListener('mousemove', drawing);
  canvas.addEventListener('mouseout', removeListeners);
  canvas.addEventListener('mouseup', removeListeners);
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
  document.style.cursor = 'url(../assets/color-picker.svg), auto';
  findColor(event);
}

// Active Tool selection
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
  tools[ind].classList.add('active-tool');
  switch (ind) {
    case 0:
      drawingArea.setActiveTool('paint-bucket');
      canvas.addEventListener('click', colorCanvas);
      canvas.removeEventListener('click', pickColor);
      canvas.removeEventListener('mousedown', drawingLine);
      break;
    case 1:
      drawingArea.setActiveTool('color-picker');
      canvas.addEventListener('click', pickColor);
      canvas.removeEventListener('click', colorCanvas);
      canvas.removeEventListener('mousedown', drawingLine);
      break;
    case 2:
      drawingArea.setActiveTool('pencil');
      canvas.addEventListener('mousedown', drawingLine);
      canvas.removeEventListener('click', colorCanvas);
      canvas.removeEventListener('click', pickColor);
      break;
    default:
      break;
  }
}

export { getIndexForActive, setActiveTool };
