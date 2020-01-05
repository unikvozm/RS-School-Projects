const canvas = document.querySelector(".drawing-area__canvas");
const canvasSize = 512;

const sizeEl = document.querySelector('.drawing-area__slider-value');
const slider = document.querySelector('.drawing-area__slider');
const keyboardWindow = document.querySelector('.shortcuts__window');
const keyboardBtn = document.querySelector('.shortcuts__btn');

// Tools:
const toolsEl = document.querySelectorAll(".tools__tool");
const penEl = document.querySelector("#pen");
const strokeEl = document.querySelector("#stroke");
const paintBucketEl = document.querySelector("#paint-bucket");
const paintAllBucketEl = document.querySelector("#paint-all-bucket");
const colorPickerEl = document.querySelector("#color-picker");
const eraserEl = document.querySelector("#eraser");

const pixelSizeEl = document.querySelector('.size');
const pixelSizeEls = document.querySelectorAll('.size__box');

const toolsName = {
  pen: 'pen',
  stroke: 'stroke',
  paintBucket: 'paint-bucket',
  paintAllBucket: 'paint-all-bucket',
  colorPicker: 'color-picker',
  eraser: 'eraser'
}

const keyShortcuts = {
  pen: 'p',
  stroke: 'l',
  paintBucket: 'b',
  paintAllBucket: 'a',
  colorPicker: 'o',
  eraser: 'e',
}

export {
  canvas,
  canvasSize,
  sizeEl,
  pixelSizeEl,
  pixelSizeEls,
  slider,
  toolsEl,
  keyboardWindow,
  keyboardBtn,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName,
  keyShortcuts
};
