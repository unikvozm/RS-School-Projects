import { updateLocationEl, updateCoordsEl, displayMapEl } from './dom';
import storage from './localStorage';
import { getWeatherInfo, weather } from './weather';
import { layout } from './constants';
import time from './time';
import updateImage from './imageLoader';

const GEOCODER_TOKEN = 'cdb1e310abc5419f88c96b50bb013ea1';

function getLocationDataFromCoords(long, lat, language) {
  const apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

  const requestURL = `${apiUrl}?key=${GEOCODER_TOKEN}&q=${lat}%2C%20${long}&language=${language}&pretty=1`;

  const request = new XMLHttpRequest();
  request.open('GET', requestURL, true);

  request.onload = () => {
    if (request.status === 200) {
      // Success!
      const data = JSON.parse(request.responseText);

      const { country } = data.results[0].components;
      const city = data.results[0].components.city
        || data.results[0].components.town
        || data.results[0].components.village
        || data.results[0].components.county
        || data.results[0].components.state;

      updateLocationEl(city, country);
    } else if (request.status <= 500) {
      // We reached our target server, but it returned an error
      const data = JSON.parse(request.responseText);
      /* eslint-disable no-alert */
      alert(data.status.message);
    } else {
      /* eslint-disable no-alert */
      alert('server error');
    }
  };

  request.onerror = () => {
    // There was a connection error of some sort
    /* eslint-disable no-alert */
    alert('unable to connect to server');
  };

  request.send(); // make the request
}

function getLocationDataFromInput(input, language, unit) {
  const cityToSearch = input.replace(' ', '%20');
  const apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

  const requestURL = `${apiUrl}?q=${cityToSearch}&key=${GEOCODER_TOKEN}&language=${language}&pretty=1`;

  const request = new XMLHttpRequest();
  request.open('GET', requestURL, true);

  request.onload = () => {
    if (request.status === 200) {
      // Success!
      const data = JSON.parse(request.responseText);

      const { country } = data.results[0].components;
      const city = data.results[0].components.city
        || data.results[0].components.town
        || data.results[0].components.village
        || data.results[0].components.county
        || data.results[0].components.state;

      const { lat } = data.results[0].geometry;
      const long = data.results[0].geometry.lng;

      updateLocationEl(city, country);
      storage.setLatitude(lat);
      storage.setLongitude(long);
      getWeatherInfo(lat, long, language, unit);
      updateCoordsEl(layout[language], lat, long);
      displayMapEl(long, lat, language);
      updateImage(time.time, time.timezone, weather.icon);
    } else if (request.status <= 500) {
      // We reached our target server, but it returned an error
      const data = JSON.parse(request.responseText);
      /* eslint-disable no-alert */
      alert(data.status.message);
    } else {
      /* eslint-disable no-alert */
      alert('server error');
    }
  };

  request.onerror = () => {
    // There was a connection error of some sort
    /* eslint-disable no-alert */
    alert('unable to connect to server');
  };

  request.send(); // make the request
}

export { getLocationDataFromCoords, getLocationDataFromInput };
