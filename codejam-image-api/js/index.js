import setValueInRange from './size-slider';
import storage from './localStorage';
import drawingArea from './canvas';

const slider = document.querySelector('.drawing-area__slider');
const canvas = document.querySelector('.drawing-area__canvas');
const ctx = canvas.getContext('2d');
const previousColor = document.querySelector('.prev-color');
const colorPicker = document.querySelector('.colors__color-picker');

// Event listeners
slider.onchange = () => setValueInRange();

window.onload = () => {
  colorPicker.value = drawingArea.currColor;
  previousColor.style.backgroundColor = drawingArea.prevColor;
  // tools[2].classList.add(activeTool);
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
