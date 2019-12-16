// finds celcius degrees from fahrenheit degrees
function fromFtoC(fahr) {
  return Math.round(((fahr - 32) * 5) / 9);
}

// nornalize coordinates from grads to grads and minutes
function normCoords(coord) {
  return `${Math.floor(coord)}°${Math.floor(
    (coord - Math.floor(coord)) * 60
  )}'`;
}

// normalise time from seconds to days (number)
function fromSecToDay(sec) {
  const date = new Date(sec * 1000);
  return date.getDay();
}

// normalise time from seconds to date (number)
function fromSecToDate(sec) {
  const date = new Date(sec * 1000);
  return date.getDate();
}

// normalise time from seconds to month (number)
function fromSecToMonth(sec) {
  const date = new Date(sec * 1000);
  return date.getMonth();
}

// normalise time from seconds to seconds (number)
function fromSecToSec(sec) {
  const date = new Date(sec * 1000);
  return date.getSeconds();
}

export { fromFtoC, normCoords, fromSecToDay };
