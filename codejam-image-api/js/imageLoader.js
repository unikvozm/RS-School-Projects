import drawingArea from './canvas';

const locationInput = document.querySelector('.drawing-area__buttons--location');
const canvas = document.querySelector('.drawing-area__canvas');
canvas.width = 512;
canvas.height = 512;
canvas.size = 512;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

async function imageLoad() {
  const town = locationInput.value;
  drawingArea.clearCanvas();
  const ACCESSKEY = 'd2bd80527522e12c2331b079c8a8aff0d0cad5290f6189a7fa4f128a0ec2030f';
  const URL = `http://api.unsplash.com/photos/random?query=town,${town}&client_id=${ACCESSKEY}`;

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data.urls.regular);

  function setImageSize() {
    let { width } = img;
    let { height } = img;
    let positionX = 0;
    let positionY = 0;

    if (width > height) {
      height = Math.floor((height * canvas.size) / width);
      width = canvas.size;
      positionY = Math.floor((canvas.size - height) / 2);
    } else if (height > width) {
      width = Math.floor((width * canvas.size) / height);
      height = canvas.size;
      positionX = Math.floor((canvas.size - width) / 2);
    } else {
      width = canvas.size;
      height = canvas.size;
    }
    ctx.drawImage(img, positionX, positionY, width, height);
  }

  img.addEventListener('load', setImageSize);
}

export default imageLoad;
