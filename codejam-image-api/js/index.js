import setValueInRange from './size-slider';
import storage from './localStorage';

const slider = document.querySelector('.drawing-area__slider');
const canvas = document.querySelector('.drawing-area__canvas');
canvas.width = 512;
canvas.height = 512;
const ctx = canvas.getContext('2d');

// Event listeners
slider.onchange = () => setValueInRange();

window.onload = () => {
  // colorPicker.value = drawingField.currColor;
  // previousColor.style.backgroundColor = drawingField.prevColor;
  // tools[2].classList.add(activeTool);
  const img = new Image();
  img.src = storage.getImage();
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
};

window.onbeforeunload = () => {
  storage.setImage(canvas.toDataURL());
};
