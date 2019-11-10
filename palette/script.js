const options = document.querySelectorAll(".switcher__option");
const squares = document.querySelectorAll(".switcher__option-square");
const canvas = document.querySelector(".canvas");
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext("2d");

const activeSize = 'active-size';
const activeSquare = 'active-square';

class Canvas {
  constructor() {
    if (localStorage.getItem('prevColor') === null) {
			this.prevColor = 'white';
			localStorage.setItem('prevColor', this.prevColor);
		}
    else this.prevColor = localStorage.getItem('prevColor');
    
    if (localStorage.getItem('currColor') === null) {
			this.currColor = 'white';
			localStorage.setItem('currColor', this.currColor);
		}
		else this.currColor = localStorage.getItem('currColor');
    
    if (localStorage.getItem('size') === null) {
			this.size = 4;
			localStorage.setItem('size', this.size);
		}
    else this.size = localStorage.getItem('size');
    
    this.cellWidth = 0;
    this.cellHeight = 0;
  }

  setSize(size) {
    this.size = size;
    this.cellWidth = Math.round(canvas.width / size);
    this.cellHeight = Math.round(canvas.height / size);
  }

  clearCanvas() {
    canvas.style.backgroundColor = "white";
  }
}

const drawingField = new Canvas();

options.forEach((option, ind) => {
  option.addEventListener('click', function() {
    squares.forEach(square => square.classList.remove(activeSquare));
    options.forEach(opt => opt.classList.remove(activeSize));
    option.classList.add(activeSize);
    squares[ind].classList.add(activeSquare);
    switch(ind) {
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
    }
  })
})


/*function activateFirstImage(ctx, cellWidth, cellHeight) {
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
