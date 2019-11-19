/* eslint-disable no-restricted-globals */
const options = document.querySelectorAll('.switcher__option');
const squares = document.querySelectorAll('.switcher__option-square');
const canvas = document.querySelector('.canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const previousColor = document.querySelector('.prev-color');
const colors = document.querySelectorAll('.colors__color');
const tools = document.querySelectorAll('.tools__tool');
const colorPicker = document.querySelector('.colors__color-picker');
const activeSize = 'active-size';
const activeSquare = 'active-square';
const activeTool = 'active-tool';
const prevColor = 'prevColor';
const currColor = 'currColor';
const sizeStr = 'size';

const selectActiveSize = (size) => {
  let index;
  switch (size) {
    case '4':
      index = 0;
      break;
    case '16':
      index = 1;
      break;
    case '32':
      index = 2;
      break;
    case '64':
      index = 3;
      break;
    case '128':
      index = 4;
      break;
    case '256':
      index = 5;
      break;
    case '512':
      index = 6;
      break;
    default:
      break;
  }
  options[index].classList.add(activeSize);
  squares[index].classList.add(activeSquare);
};

class Canvas {
  constructor() {
    if (localStorage.getItem(prevColor) === null) {
      this.prevColor = '#c4c4c4';
      localStorage.setItem(prevColor, this.prevColor);
    } else this.prevColor = localStorage.getItem(prevColor);

    if (localStorage.getItem(currColor) === null) {
      this.currColor = '#41f795';
      localStorage.setItem(currColor, this.currColor);
    } else this.currColor = localStorage.getItem(currColor);

    if (localStorage.getItem(sizeStr) === null) {
      this.size = 4;
      localStorage.setItem(sizeStr, this.size);
    } else this.size = localStorage.getItem(sizeStr);

    this.cellSize = Math.round(canvas.width / this.size);
    this.activeTool = 'pencil';
  }

  setSize(size) {
    this.size = size;
    this.cellSize = Math.round(canvas.width / this.size);
    localStorage.setItem(sizeStr, this.size);
  }

  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    selectActiveSize(this.size.toString());
    squares[7].classList.remove(activeSquare);
    options[7].classList.remove(activeSize);
  }

  setCurrentColor(color) {
    this.prevColor = this.currColor;
    this.currColor = color;
    localStorage.setItem(prevColor, this.prevColor);
    localStorage.setItem(currColor, this.currColor);
    colorPicker.value = this.currColor;
    previousColor.style.backgroundColor = this.prevColor;
  }
}

const drawingField = new Canvas();

window.onload = () => {
  colorPicker.value = drawingField.currColor;
  previousColor.style.backgroundColor = drawingField.prevColor;
  tools[2].classList.add(activeTool);
  const img = new Image();
  img.src = localStorage.getItem('canvasImage');
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };

  selectActiveSize(drawingField.size);
};

window.onbeforeunload = () => {
  localStorage.setItem('canvasImage', canvas.toDataURL());
};

options.forEach((option, ind) => {
  option.addEventListener('click', () => {
    squares.forEach((square) => square.classList.remove(activeSquare));
    options.forEach((opt) => opt.classList.remove(activeSize));
    option.classList.add(activeSize);
    squares[ind].classList.add(activeSquare);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (ind) {
      case 0:
        drawingField.setSize(4);
        break;
      case 1:
        drawingField.setSize(16);
        break;
      case 2:
        drawingField.setSize(32);
        break;
      case 3:
        drawingField.setSize(64);
        break;
      case 4:
        drawingField.setSize(128);
        break;
      case 5:
        drawingField.setSize(256);
        break;
      case 6:
        drawingField.setSize(512);
        break;
      case 7:
        drawingField.clearCanvas();
        break;
      default:
        break;
    }
  });
});

colors.forEach((color, index) => {
  color.addEventListener('click', () => {
    switch (index) {
      case 1:
        drawingField.setCurrentColor(drawingField.prevColor);
        break;
      case 2:
        drawingField.setCurrentColor('#f74141');
        break;
      case 3:
        drawingField.setCurrentColor('#00BCD4');
        break;
      default:
        break;
    }
  });
});

colorPicker.onchange = () => {
  drawingField.setCurrentColor(colorPicker.value);
};

tools.forEach((tool, ind) => {
  tool.addEventListener(
    'click',
    () => {
      tools.forEach((t) => t.classList.remove(activeTool));
      tool.classList.add(activeTool);
      switch (ind) {
        case 0:
          drawingField.activeTool = 'paint-bucket';
          canvas.addEventListener(
            'mousemove',
            () => {
              canvas.style.cursor = 'url(./assets/paint-bucket.svg), auto';
            },
            false,
          );
          break;
        case 1:
          canvas.addEventListener(
            'mousemove',
            () => {
              canvas.style.cursor = 'url(./assets/color-picker.svg), auto';
            },
            false,
          );
          drawingField.activeTool = 'color-picker';
          break;
        case 2:
          drawingField.activeTool = 'pencil';
          canvas.addEventListener(
            'mousemove',
            () => {
              canvas.style.cursor = 'url(./assets/pencil.svg), auto';
            },
            false,
          );
          break;
        default:
          break;
      }
    },
    false,
  );
});

// Pencil tool
let isDrawing = false;

function drawWithPencil(event) {
  if (isDrawing) {
    const cell = event.target.getBoundingClientRect();

    const xCell = Math.floor(
      (event.clientX - cell.left) / drawingField.cellSize,
    );
    const yCell = Math.floor(
      (event.clientY - cell.top) / drawingField.cellSize,
    );

    ctx.fillStyle = drawingField.currColor;
    ctx.fillRect(
      xCell * drawingField.cellSize,
      yCell * drawingField.cellSize,
      drawingField.cellSize,
      drawingField.cellSize,
    );
  }
}

canvas.addEventListener(
  'mousemove',
  () => {
    if (drawingField.activeTool === 'pencil') {
      drawWithPencil(event);
      canvas.style.cursor = 'url(./assets/pencil.svg), auto';
    }
  },
  false,
);
canvas.addEventListener(
  'mousedown',
  () => {
    if (drawingField.activeTool === 'pencil') {
      isDrawing = true;
      drawWithPencil(event);
      canvas.style.cursor = 'url(./assets/pencil.svg), auto';
    }
  },
  false,
);
canvas.addEventListener(
  'mouseup',
  () => {
    if (drawingField.activeTool === 'pencil') {
      canvas.style.cursor = 'url(./assets/pencil.svg), auto';
      isDrawing = false;
    }
  },
  false,
);
canvas.addEventListener(
  'mouseout',
  () => {
    if (drawingField.activeTool === 'pencil') {
      canvas.style.cursor = 'url(./assets/pencil.svg), auto';
      isDrawing = false;
    }
  },
  false,
);

// Paint bucket tool
canvas.addEventListener(
  'click',
  () => {
    if (drawingField.activeTool === 'paint-bucket') {
      canvas.style.cursor = 'url(./assets/paint-bucket.svg), auto';
      ctx.fillStyle = drawingField.currColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  },
  false,
);

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
  drawingField.setCurrentColor(
    fullColorHex(colorData.data[0], colorData.data[1], colorData.data[2]),
  );
}

canvas.addEventListener(
  'click',
  (event) => {
    if (drawingField.activeTool === 'color-picker') {
      canvas.style.cursor = 'url(./assets/color-picker.svg), auto';
      findColor(event);
    }
  },
  false,
);
