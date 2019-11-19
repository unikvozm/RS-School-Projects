const value = document.querySelector('.drawing-area__slider-value');
const slider = document.querySelector('.drawing-area__slider');

function setValueInRange() {
  const size = slider.value;
  const newPoint = (slider.value - slider.getAttribute('min'))
    / (slider.getAttribute('max') - slider.getAttribute('min'));
  let offset;
  switch (size) {
    case '128':
      offset = 7;
      break;
    case '256':
      offset = -7;
      break;
    case '384':
      offset = -21;
      break;
    case '512':
      offset = -35;
      break;
    default:
      break;
  }
  value.innerHTML = size;
  value.style.left = `${512 * newPoint + offset}px`;
}

export default setValueInRange;
