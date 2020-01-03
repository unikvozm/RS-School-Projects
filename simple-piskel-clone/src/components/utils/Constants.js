const canvas = document.querySelector(".drawing-area__canvas");
const canvasSize = 512;
// canvas.width = 512;
// canvas.height = 512;

const sizeEl = document.querySelector('.drawing-area__slider-value');
const slider = document.querySelector('.drawing-area__slider');

// Tools:
const toolsEl = document.querySelectorAll(".tools__tool");
const penEl = document.querySelector("#pen");
const strokeEl = document.querySelector("#stroke");
const paintBucketEl = document.querySelector("#paint-bucket");
const paintAllBucketEl = document.querySelector("#paint-all-bucket");
const colorPickerEl = document.querySelector("#color-picker");
const eraserEl = document.querySelector("#eraser");

const toolsName = {
  pen: 'pen',
  stroke: 'stroke',
  paintBucket: 'paint-bucket',
  paintAllBucket: 'paint-all-bucket',
  colorPicker: 'color-picker',
  eraser: 'eraser'
}

const keyShortcuts = {
  pen: 'keyP',
  stroke: 'keyL',
  paintBucket: 'keyB',
  paintAllBucket: 'keyA',
  colorPicker: 'keyO',
  eraser: 'keyE',
}

export {
  canvas,
  canvasSize,
  sizeEl,
  slider,
  toolsEl,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName,
  keyShortcuts
};
