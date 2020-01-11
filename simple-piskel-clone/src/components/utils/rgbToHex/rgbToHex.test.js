import fullColorHex from './rgbToHex';

test('rgb(255, 0, 0) to be equal to #ff0000', () => {
  expect(fullColorHex(255, 0, 0)).toBe('#ff0000');
});

test('rgb(255, 0, 0) to not be undefined', () => {
  expect(fullColorHex(255, 0, 0)).not.toBeUndefined();
});
