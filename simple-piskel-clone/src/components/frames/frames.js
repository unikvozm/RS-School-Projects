import './frames.scss';

import { framesContainerEl, canvas } from '../utils/Constants';
import storage from '../utils/localStorage/localStorage';
import drawingArea from '../canvas/canvas';

const frames = {
  items: 1,
  activeFrameNum: storage.getActiveFrameNum(),
  framesArr: storage.getAllFrames(),

  addNewFrame() {
    frames.items += 1;

    frames.activeFrame = frames.items;
    storage.setActiveFrameNum(frames.activeFrame);
    drawingArea.clearCanvas();

    const frame = document.createElement('li');
    frame.classList.add('frames__frame');
    frame.setAttribute('data-item', frames.items);

    frame.innerHTML = `
  <div class="frames__frame-canvas active-canvas" data-item="${
  frames.items
}"></div>
  <button class="frames__frame-num frames__frame--btn" btn-item=${
  frames.items
}>${frames.items}</button>
  <button class="frames__frame-del frames__frame--btn" btn-del=${
  frames.items
} onclick=${() => frames.deleteFrame(frames.items)}></button>
  <button class="frames__frame-move frames__frame--btn"></button>
  <button class="frames__frame-double frames__frame--btn" btn-dbl=${
  frames.items
}></button>`;

    framesContainerEl.appendChild(frame);
    frames.setActiveFrame(frames.items);
  },

  renderFrames() {
    document.querySelector(
      'div[data-item="1"]',
    ).style.backgroundImage = `url(${frames.framesArr[0]})`; // to render the first frame
    for (let i = 2; i <= storage.getFramesTotalNum(); i += 1) {
      frames.addNewFrame();
      document.querySelector(
        `div[data-item="${i}"]`,
      ).style.backgroundImage = `url(${frames.framesArr[i - 1]})`;
    }
  },

  updateActiveFrame() {
    const activeCanv = document.querySelector('.active-canvas');
    activeCanv.style.backgroundImage = `url(${storage.getImage()})`;
    frames.framesArr[frames.activeFrameNum - 1] = storage.getImage();
  },

  setActiveFrame(num) {
    document.querySelector('.active-frame').classList.remove('active-frame');
    document.querySelector('.active-canvas').classList.remove('active-canvas');

    frames.activeFrameNum = num;
    storage.setActiveFrameNum(num);
    document
      .querySelector(`div[data-item="${num}"]`)
      .classList.add('active-canvas');
    document
      .querySelector(`li[data-item="${num}"]`)
      .classList.add('active-frame');

    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    storage.setImage(frames.framesArr[frames.activeFrameNum - 1]);
    drawingArea.renderCanvas();
  },

  // deleteFrame(num) {
  //   const elem = document.querySelector(`li[data-item="${num}"]`);
  //   elem.parentNode.removeChild(elem);
  //   frames.framesArr.slice(0, num).concat(frames.framesArr.slice(num));
  //   console.log(frames.framesArr);
  // },
};

export default frames;
