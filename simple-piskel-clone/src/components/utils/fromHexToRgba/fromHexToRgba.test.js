import fromHexToRGBA from './fromHexToRgba';

test('#ff0000 to equal {r:255, g:0, b:0, a:255}', () => {
  expect(fromHexToRGBA('#ff0000')).toEqual({
    r: 255, g: 0, b: 0, a: 255,
  });
});

test('#ff0000 to not be undefined', () => {
  expect(fromHexToRGBA('#ff0000')).not.toBeUndefined();
});
