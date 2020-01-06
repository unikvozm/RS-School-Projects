import drawingArea from '../canvas/canvasFunctionality';
import { canvas, sizeEl, slider } from '../utils/Constants';
import storage from '../utils/localStorage/localStorage';

function setValueInRange() {
  storage.setImage(canvas.toDataURL());
  const size = slider.value;
  drawingArea.setSize(size);
  canvas.width = size;
  canvas.height = size;
  drawingArea.renderCanvas();
  const newPoint = (slider.value - slider.getAttribute('min'))
    / (slider.getAttribute('max') - slider.getAttribute('min'));
  let offset;
  switch (size) {
    case '32':
      offset = 9;
      break;
    case '64':
      offset = -3;
      break;
    case '96':
      offset = -17;
      break;
    case '128':
      offset = -38;
      break;
    default:
      break;
  }
  sizeEl.innerHTML = size;
  sizeEl.style.left = `${512 * newPoint + offset}px`;
}

export default setValueInRange;
