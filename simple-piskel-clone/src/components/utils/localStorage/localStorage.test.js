import storage from "./localStorage";

test("after setSize(32), getSize() to be equal 32", () => {
  storage.setSize(32);
  expect(storage.getSize()).toBe("32");
});

test("after setPixelSize(2), getPixelSize() to be equal 2", () => {
  storage.setPixelSize(2);
  expect(storage.getPixelSize()).toBe("2");
});

test("after setActiveTool('pen'), getActiveTool() to be equal 'pen'", () => {
  storage.setActiveTool("pen");
  expect(storage.getActiveTool()).toBe("pen");
});

test("getKeyShortcuts() to be equal to the object", () => {
  const keyShortcuts = {
    pen: 'p',
    stroke: 'l',
    paintBucket: 'b',
    paintAllBucket: 'a',
    colorPicker: 'o',
    eraser: 'e',
  }
  storage.setKeyShortcuts(keyShortcuts);
  expect(storage.getKeyShortcuts()).toEqual(keyShortcuts);
});

// TODO: test primary color, secondary color
