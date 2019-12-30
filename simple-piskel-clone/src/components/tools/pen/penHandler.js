import { canvas } from '../../Constants';
import drawingArea from '../../../js/canvas';

const ctx = canvas.getContext("2d");

function penHandler(event) {
	const cellSize = Math.round(
	  (canvas.width / drawingArea.size) * drawingArea.pixelSize
	);
  
	let lastX = event.offsetX;
	let lastY = event.offsetY;
	let xCell = Math.floor(lastX / cellSize);
	let yCell = Math.floor(lastY / cellSize);
  
	ctx.fillStyle = drawingArea.currColor;
	ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
  
	function drawing(e) {
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
		xCell = Math.floor(lastX / cellSize);
		yCell = Math.floor(lastY / cellSize);
		ctx.fillRect(xCell * cellSize, yCell * cellSize, cellSize, cellSize);
	  }
	}
  
	function removeListeners() {
	  canvas.removeEventListener("mousemove", drawing);
	  canvas.removeEventListener("mouseout", removeListeners);
	  canvas.removeEventListener("mouseup", removeListeners);
	}
  
	canvas.addEventListener("mousemove", drawing);
	canvas.addEventListener("mouseout", removeListeners);
	canvas.addEventListener("mouseup", removeListeners);
  }

  export default penHandler;