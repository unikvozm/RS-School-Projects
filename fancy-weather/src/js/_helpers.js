import { layout } from './constants';

// finds celcius degrees from fahrenheit degrees
function fromCtoF(celcius) {
  return Math.round((celcius * 9) / 5 + 32);
}

// normalize coordinates from grads to grads and minutes
function normCoords(coord) {
  return `${Math.floor(coord)}°${Math.floor(
    (coord - Math.floor(coord)) * 60,
  )}'`;
}

// translate from english to belarussian
function fromENtoBY(string) {
  if (string.length > 9) {
    const str = string.split(' ');
    str[0] = layout.be.dayShort[layout.en.dayShort.indexOf(str[0])];
    str[1] = layout.be.month[layout.en.month.indexOf(str[1])];
    return str.join(' ');
  }
  return layout.be.day[layout.en.day.indexOf(string)];
}

// toggle units
function styleTemp(el) {
  el.classList.toggle('selected');
}

export {
  fromCtoF, normCoords, fromENtoBY, styleTemp,
};
