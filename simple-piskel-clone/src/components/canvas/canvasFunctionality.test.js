import drawingArea from './canvasFunctionality';

test("after setSize(32), size to be equal 32", () => {
  drawingArea.setSize(32);
  expect(drawingArea.size).toBe(32);
});

test("after setPixelSize(2), pixelSize to be equal 2", () => {
  drawingArea.setPixelSize(2);
  expect(drawingArea.pixelSize).toBe(2);
});

test("after setActiveTool('pen'), activeTool to be equal 'pen'", () => {
  drawingArea.setActiveTool("pen");
  expect(drawingArea.activeTool).toBe("pen");
});

// TODO: test primary color, secondary color, clearCanvas, renderCanvas
