import drawingArea from './canvas';

const canvas = document.querySelector('.drawing-area__canvas');
canvas.width = 512;
canvas.height = 512;

function greyScale() {
  if (!drawingArea.imageLoaded) {
    // eslint-disable-next-line no-alert
    alert('An image should be loaded first');
  } else {
    const ctx = canvas.getContext('2d');
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const imgData = img.data;
    let i = 0;
    while (i < imgData.length) {
      const average = Math.round((imgData[i] + imgData[i + 1] + imgData[i + 2]) / 3);
      imgData[i] = average; // r
      imgData[i + 1] = average; // g
      imgData[i + 2] = average; // b
      i += 4; // excluding a
    }
    ctx.putImageData(img, 0, 0);
  }
}

export default greyScale;
