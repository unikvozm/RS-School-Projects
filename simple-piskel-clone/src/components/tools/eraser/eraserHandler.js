import { canvas, canvasSize } from '../../utils/Constants';
import drawingArea from '../../../js/canvas';
import storage from '../../utils/localStorage';

const ctx = canvas.getContext("2d");

function eraserHandler(event) {
	const cellSize = drawingArea.pixelSize;
  
	let lastX = event.offsetX;
	let lastY = event.offsetY;
	let xCell = Math.floor(lastX / (canvasSize / drawingArea.size));
	let yCell = Math.floor(lastY / (canvasSize / drawingArea.size));
  
	ctx.clearRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
  
	function clearing(e) {
	  const currX = e.offsetX;
	  const currY = e.offsetY;
  
	  const deltaX = Math.abs(currX - lastX);
	  const deltaY = Math.abs(currY - lastY);
	  let error = deltaX - deltaY;
  
	  const stepX = lastX < currX ? 1 : -1;
	  const stepY = lastY < currY ? 1 : -1;
  
	  while (lastX !== currX || lastY !== currY) {
		if (error * 2 > -deltaY) {
		  error -= deltaY;
		  lastX += stepX;
		} else if (error * 2 < deltaX) {
		  error += deltaX;
		  lastY += stepY;
		}
		xCell = Math.floor(lastX / (canvasSize / drawingArea.size));
		yCell = Math.floor(lastY / (canvasSize / drawingArea.size));
		ctx.clearRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
		storage.setImage(canvas.toDataURL());
	  }
	}
  
	function removeListeners() {
	  canvas.removeEventListener("mousemove", clearing);
	  canvas.removeEventListener("mouseout", removeListeners);
	  canvas.removeEventListener("mouseup", removeListeners);
	}
  
	canvas.addEventListener("mousemove", clearing);
	canvas.addEventListener("mouseout", removeListeners);
	canvas.addEventListener("mouseup", removeListeners);
  }

  export default eraserHandler;