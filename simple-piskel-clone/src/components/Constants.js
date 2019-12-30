const canvas = document.querySelector(".drawing-area__canvas");
canvas.width = 512;
canvas.height = 512;

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

const TRANSPARENT_COLOR = 'rgba(0, 0, 0, 0)';

export {
  canvas,
  toolsEl,
  penEl,
  strokeEl,
  paintBucketEl,
  paintAllBucketEl,
  colorPickerEl,
  eraserEl,
  toolsName,
  keyShortcuts,
  TRANSPARENT_COLOR
};
