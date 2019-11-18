const slider = document.querySelector('.drawing-area__slider');
const value = document.querySelector('.drawing-area__slider-value');

let size;

slider.onchange = () => {
  size = this.value;
  const newPoint = (this.value - this.getAttribute('min'))
    / (this.getAttribute('max') - this.getAttribute('min'));
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
};
