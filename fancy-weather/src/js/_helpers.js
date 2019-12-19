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

// find current season
function getSeason(month) {
  if (month === 12 || month <= 2) return 'winter';
  if (month <= 5) return 'spring';
  if (month <= 8) return 'summer';
  return 'autumn';
}

// find current part of the day
function getdayTime(hour) {
  if (hour < 5) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}
export {
  fromCtoF, normCoords, fromENtoBY, styleTemp, getSeason, getdayTime,
};
