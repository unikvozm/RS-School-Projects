function fromFtoC(fahr) {
  return Math.round(((fahr - 32) * 5) / 9);
}

function normCoords(coord) {
  return `${Math.floor(coord)}°${Math.floor(
    (coord - Math.floor(coord)) * 60
  )}'`;
}

export { fromFtoC, normCoords };
