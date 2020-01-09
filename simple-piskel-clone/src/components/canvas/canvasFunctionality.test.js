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

test("after setPrimaryColor('#ff0000'), primaryColor to be equal '#ff0000'", () => {
  drawingArea.setPrimaryColor("#ff0000");
  expect(drawingArea.primaryColor).toBe("#ff0000");
});

test("after setSecondaryColor('#ff0000'), secondaryColorto be equal '#ff0000'", () => {
  drawingArea.setSecondaryColor("#ff0000");
  expect(drawingArea.secondaryColor).toBe("#ff0000");
});

