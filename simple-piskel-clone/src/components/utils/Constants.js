import storage from "./localStorage/localStorage";

// canvas
const canvas = document.querySelector(".drawing-area__canvas");

const canvasSize = 512;

// slider
const sizeEl = document.querySelector(".drawing-area__slider-value");
const slider = document.querySelector(".drawing-area__slider");

// keyboard shortcuts
const keyboardWindow = document.querySelector(".shortcuts__window");
const keyboardBtn = document.querySelector(".shortcuts__btn");

const keyShortcuts = storage.getKeyShortcuts();

// Tools:
const toolsEl = document.querySelectorAll(".tools__tool");
const penEl = document.querySelector("#pen");
const strokeEl = document.querySelector("#stroke");
const paintBucketEl = document.querySelector("#paint-bucket");
const paintAllBucketEl = document.querySelector("#paint-all-bucket");
const colorPickerEl = document.querySelector("#color-picker");
const eraserEl = document.querySelector("#eraser");

const toolsName = {
  pen: "pen",
  stroke: "stroke",
  paintBucket: "paint-bucket",
  paintAllBucket: "paint-all-bucket",
  colorPicker: "color-picker",
  eraser: "eraser"
};

// pixel size
const pixelSizeEl = document.querySelector(".size");
const pixelSizeEls = document.querySelectorAll(".size__box");

// colors
const primaryColorEl = document.querySelector("#primary-color");
const secondaryColorEl = document.querySelector("#secondary-color");
const colorsSwapEl = document.querySelector('.colors__color-swap');

export {
  canvas,
  canvasSize,
  sizeEl,
  slider,
  keyboardWindow,
  keyboardBtn,
  keyShortcuts,
  toolsEl,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName,
  pixelSizeEl,
  pixelSizeEls,
  primaryColorEl,
  secondaryColorEl,
  colorsSwapEl
};
