import "./frames.scss";

import { framesContainerEl } from "../utils/Constants";

const frames = {
  items: 1,
  addNewFrame() {
	frames.items += 1;
    const frame = document.createElement("li");
    frame.classList.add("frames__frame");

    frame.innerHTML = `
	<canvas class="frames__frame-canvas"></canvas>
	<button class="frames__frame-num frames__frame--btn">${frames.items}</button>
	<button class="frames__frame-del frames__frame--btn"></button>
	<button class="frames__frame-move frames__frame--btn"></button>
	<button class="frames__frame-double frames__frame--btn"></button>`;

    framesContainerEl.appendChild(frame);
  }
};

export default frames;
