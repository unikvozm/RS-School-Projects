import setValueInRange from './slider';

const slider = document.querySelector('.drawing-area__slider');

slider.onchange = () => setValueInRange();
