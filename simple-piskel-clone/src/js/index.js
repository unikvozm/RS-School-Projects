import "../css/style.scss";
import setValueInRange from "../components/resizing/sizeSlider";
import storage from "../components/utils/localStorage/localStorage";
import drawingArea from "../components/canvas/canvas";
import setActiveTool from "../components/tools/tools";
import {
  pixelSizeHandler,
  setActivePixelSize
} from "../components/pixelSizeHandler/pixelSize";
import {
  keyboardInit,
  keyboardOpen
} from "../screens/keyShortcuts/keyChangeHandler";
import {
  colorsInit,
  primaryColorHandler,
  secondaryColorHandler,
  colorsSwap
} from "../components/colors/colors";
import frames from '../components/frames/frames';
import {auth, loginHandler} from '../components/auth/auth';
import {
  canvas,
  slider,
  keyboardBtn,
  keyShortcuts,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName,
  pixelSizeEl,
  primaryColorEl,
  secondaryColorEl,
  colorsSwapEl,
  framesAddNew,
  loginBtn
} from "../components/utils/Constants";

// Disabling context menu
window.oncontextmenu = e => {
  e.preventDefault();
};

// Event listeners
slider.onchange = () => setValueInRange();

pixelSizeEl.addEventListener("click", pixelSizeHandler);

colorsSwapEl.addEventListener("click", colorsSwap);

keyboardBtn.addEventListener("click", keyboardOpen);

framesAddNew.addEventListener('click', frames.addNewFrame);

loginBtn.addEventListener('click', loginHandler);

window.onload = () => {
  auth();
  colorsInit();
  slider.value = drawingArea.size;
  drawingArea.renderCanvas();
  setValueInRange();
  setActivePixelSize();
  keyboardInit();
  setActiveTool(drawingArea.activeTool);
};

window.onbeforeunload = () => {
  storage.setImage(canvas.toDataURL());
};

primaryColorEl.onchange = primaryColorHandler;
secondaryColorEl.onchange = secondaryColorHandler;

// Listeners for an active tool
penEl.addEventListener("click", () => setActiveTool(toolsName.pen));
strokeEl.addEventListener("click", () => setActiveTool(toolsName.stroke));
paintBucketEl.addEventListener("click", () =>
  setActiveTool(toolsName.paintBucket)
);
paintAllBucketEl.addEventListener("click", () =>
  setActiveTool(toolsName.paintAllBucket)
);
colorPickerEl.addEventListener("click", () =>
  setActiveTool(toolsName.colorPicker)
);
eraserEl.addEventListener("click", () => setActiveTool(toolsName.eraser));

// Listeners for Keyboard Shortcuts
document.addEventListener("keyup", event => {
  switch (event.key) {
    case keyShortcuts.pen:
      setActiveTool(toolsName.pen);
      break;
    case keyShortcuts.stroke:
      setActiveTool(toolsName.stroke);
      break;
    case keyShortcuts.paintBucket:
      setActiveTool(toolsName.paintBucket);
      break;
    case keyShortcuts.paintAllBucket:
      setActiveTool(toolsName.paintAllBucket);
      break;
    case keyShortcuts.colorPicker:
      setActiveTool(toolsName.colorPicker);
      break;
    case keyShortcuts.eraser:
      setActiveTool(toolsName.eraser);
      break;
    default:
      break;
  }
});
