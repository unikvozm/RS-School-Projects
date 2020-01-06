import isColorSame from "./isColorSame";

test("color in position 0 of [255, 255, 255, 255] and {r:255, g:255, b:255, a:255} should be the same", () => {
  const arr = [255, 255, 255, 255];
  const position = 0;
  const color = {r:255, g:255, b:255, a:255};
  expect(isColorSame(position, arr, color)).toBeTruthy();
});
