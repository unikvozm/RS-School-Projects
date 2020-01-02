function isColorSame(position, arr, color) {
  /* console.log(position);
  console.log("r", arr[position], color.r, arr[position] === color.r);
  console.log("g", arr[position + 1], color.g, arr[position + 1] === color.g);
  console.log("b", arr[position + 2], color.b, arr[position + 2] === color.b);
  console.log("a", arr[position + 3], color.a, arr[position + 3] === color.a);
 */
/*   console.log(
    arr[position] === color.r &&
      arr[position + 1] === color.g &&
      arr[position + 2] === color.b &&
      arr[position + 3] === color.a
  ); */
  return (
    arr[position] === color.r &&
    arr[position + 1] === color.g &&
    arr[position + 2] === color.b &&
    arr[position + 3] === color.a
  );
}

export default isColorSame;
