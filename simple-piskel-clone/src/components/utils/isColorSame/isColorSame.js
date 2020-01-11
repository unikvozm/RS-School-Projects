function isColorSame(position, arr, color) {
  return (
    arr[position] === color.r
    && arr[position + 1] === color.g
    && arr[position + 2] === color.b
    && arr[position + 3] === color.a
  );
}

export default isColorSame;
