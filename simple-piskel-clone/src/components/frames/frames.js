import './frames.scss';

import { framesContainerEl } from '../utils/Constants';
import storage from '../utils/localStorage/localStorage';

const frames = {
  items: 1,
  activeFrame: storage.getActiveFrame(),

  addNewFrame() {
    frames.items += 1;
    const frame = document.createElement('li');
    frame.classList.add('frames__frame');

    frame.innerHTML = `
  <canvas class="frames__frame-canvas"></canvas>
  <button class="frames__frame-num frames__frame--btn">${frames.items}</button>
  <button class="frames__frame-del frames__frame--btn"></button>
  <button class="frames__frame-move frames__frame--btn"></button>
  <button class="frames__frame-double frames__frame--btn"></button>`;

    framesContainerEl.appendChild(frame);
  },

  renderFrames() {
    // TODO:
  },

  updateActiveFrame() {
    const activeCanv = document.querySelector('.active-canvas');
    const canvCtx = activeCanv.getContext('2d');
    canvCtx.imageSmoothingEnabled = false;
    activeCanv.style.width = '96px';
    activeCanv.style.height = '96px';

    const img = new Image();
    img.src = storage.getImage();
    img.addEventListener('load', () => {
      canvCtx.drawImage(img, 0, 0);
    });
  },
};

export default frames;
