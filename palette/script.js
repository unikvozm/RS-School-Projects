/* eslint-disable no-restricted-globals */
const options = document.querySelectorAll('.switcher__option');
const squares = document.querySelectorAll('.switcher__option-square');
const canvas = document.querySelector('.canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');
const currentColor = document.querySelector('.current-color');
const previousColor = document.querySelector('.prev-color');
const colors = document.querySelectorAll('.colors__color');
const tools = document.querySelectorAll('.tools__tool');
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

    this.cellSize = 0;

    this.image = [];
  }

  setSize(size) {
    this.size = size;
    this.cellSize = Math.round(canvas.width / this.size);
    localStorage.setItem(sizeStr, this.size);
    this.image = new Array(this.size).fill(new Array(this.size));
  }

  clearCanvas() {
    this.image = [];
    localStorage.setItem('image', this.image);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 512, 512);
    selectActiveSize(this.size.toString());
    squares[7].classList.remove(activeSquare);
    options[7].classList.remove(activeSize);
  }

  drawImage(image) {
    image.forEach((row, idxRow) => {
      row.forEach((cell, idxCol) => {
        ctx.fillStyle = cell;
        ctx.fillRect(
          this.cellWidth * idxCol,
          this.cellHeight * idxRow,
          this.cellWidth,
          this.cellHeight,
        );
      });
    });
  }

  setCurrentColor(color) {
    this.prevColor = this.currColor;
    this.currColor = color;
    localStorage.setItem(prevColor, this.prevColor);
    localStorage.setItem(currColor, this.currColor);
    currentColor.style.backgroundColor = this.currColor;
    previousColor.style.backgroundColor = this.prevColor;
  }

  drawWithPencil() {
    ctx.strokeStyle = this.currColor;
    ctx.lineWidth = this.cellWidth;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw() {
      if (!isDrawing) return;
      ctx.beginPath();
      // start from
      ctx.moveTo(lastX, lastY);
      // go to
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      [lastX, lastY] = [event.offsetX, event.offsetY];
    }

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', () => {
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
    });
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
    });
    canvas.addEventListener('mouseout', () => {
      isDrawing = false;
    });
  }

  fill() {
    canvas.addEventListener('click', () => {
      ctx.fillStyle = this.currColor;
    });
    canvas.addEventListener('mousemove', () => {
      canvas.style.cursor = 'url(./assets/paint-bucket.svg), auto';
    });
  }
}

const drawingField = new Canvas();

window.onload = () => {
  currentColor.style.backgroundColor = drawingField.currColor;
  previousColor.style.backgroundColor = drawingField.prevColor;
  tools[2].classList.add(activeTool);
  selectActiveSize(drawingField.size);
};

options.forEach((option, ind) => {
  option.addEventListener('click', () => {
    squares.forEach((square) => square.classList.remove(activeSquare));
    options.forEach((opt) => opt.classList.remove(activeSize));
    option.classList.add(activeSize);
    squares[ind].classList.add(activeSquare);
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

tools.forEach((tool, ind) => {
  tool.addEventListener('click', () => {
    tools.forEach((t) => t.classList.remove(activeTool));
    tool.classList.add(activeTool);
    switch (ind) {
      case 0:
        canvas.addEventListener('mousemove', () => {
          canvas.style.cursor = 'url(./assets/paint-bucket.svg), auto';
        });
        drawingField.fill();
        break;
      case 1:
        canvas.addEventListener('mousemove', () => {
          canvas.style.cursor = 'url(./assets/color-picker.svg), auto';
        });
        document.addEventListener('click', (event) => {
          drawingField.setCurrentColor(event.target.style.backgroundColor);
        });
        break;
      case 2:
        canvas.addEventListener('mousemove', () => {
          canvas.style.cursor = 'url(./assets/pencil.svg), auto';
        });
        drawingField.drawWithPencil();
        break;
      default:
        break;
    }
  });
});


/* function activateFirstImage(ctx, cellWidth, cellHeight) {
  firstPic.forEach((row, idxRow) => {
    row.forEach((cell, idxCol) => {
      ctx.fillStyle = "#" + cell;
      ctx.fillRect(
        cellWidth * idxCol,
        cellHeight * idxRow,
        cellWidth,
        cellHeight
      );
    });
  });
}
*/
