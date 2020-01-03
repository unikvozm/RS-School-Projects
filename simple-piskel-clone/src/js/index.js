import "../css/style.scss";
import setValueInRange from "./size-slider";
import storage from "../components/utils/localStorage";
import drawingArea from "./canvas";
import setActiveTool from "../components/tools/tools";
import {
  canvas,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName,
  keyShortcuts
} from "../components/utils/Constants";

const slider = document.querySelector(".drawing-area__slider");
const previousColor = document.querySelector(".prev-color");
const colorPicker = document.querySelector(".colors__color-picker");
const colors = document.querySelectorAll(".colors__color");

// ctx.imageSmoothingEnabled = false;

// Event listeners
slider.onchange = () => setValueInRange();

window.onload = () => {
  colorPicker.value = drawingArea.currColor;
  previousColor.style.backgroundColor = drawingArea.prevColor;
  slider.value = drawingArea.size;
  setValueInRange();
  const ctx = canvas.getContext("2d");
  console.log(ctx);
  // TODO:
  // tools[getIndexForActive(drawingArea.activeTool)].classList.add("active-tool");
  // canvas.width = drawingArea.size;
  // canvas.height = drawingArea.size;
  // ctx = canvas.getContext("2d");

  // const img = new Image();
  // img.src = storage.getImage();
  // if (img.src !== null) {
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0);
  //   };
  // }
};

window.onbeforeunload = () => {
  storage.setImage(canvas.toDataURL());
};

colorPicker.onchange = () => {
  drawingArea.setCurrentColor(colorPicker.value);
  drawingArea.renderCanvas();
};

colors.forEach((color, index) => {
  color.addEventListener("click", () => {
    switch (index) {
      case 1:
        drawingArea.setCurrentColor(drawingArea.prevColor);
        break;
      case 2:
        drawingArea.setCurrentColor("#f74141");
        break;
      case 3:
        drawingArea.setCurrentColor("#00BCD4");
        break;
      default:
        break;
    }
  });
});

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
  switch (event.code) {
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
