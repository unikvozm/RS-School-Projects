import '../css/style.scss';

import {
  getTemplate,
  updateTimeEl,
  updateCoordsEl,
  displayMapEl,
  updateSearchEl,
} from './dom';
import { styleTemp } from './_helpers';
import { Weather, getWeatherInfo } from './weather';
import storage from './localStorage';
import {
  getLocationDataFromCoords,
  getLocationDataFromInput,
} from './location';
import time from './time';
import { layout } from './constants';

const weather = new Weather(storage);

window.onload = () => {
  // creating DOM elements
  getTemplate(time, layout[weather.language]);

  // update DOM according to current position coords
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const long = pos.coords.longitude;
      const lat = pos.coords.latitude;

      storage.setLatitude(lat);
      storage.setLongitude(long);

      // update weather info, coordinates and map according to current position
      getWeatherInfo(lat, long, weather.language, weather.unit);
      getLocationDataFromCoords(long, lat, weather.language);
      updateCoordsEl(layout[weather.language], lat, long);
      displayMapEl(long, lat, layout[weather.language]);
      updateTimeEl(time);
    });
  }

  // update current unit and language (according to local storage)
  if (weather.unit === 'F') {
    document.querySelectorAll('.units__unit').forEach((unitEl) => {
      styleTemp(unitEl);
    });
  }
  document.querySelector('.lang').value = weather.language;

  // update time every second
  setInterval(() => {
    time.updateTime();
    updateTimeEl(time);
  }, 1000);

  // unit change handler
  document.querySelector('.units').addEventListener('click', () => {
    document.querySelectorAll('.units__unit').forEach((unitEl) => {
      styleTemp(unitEl);
    });

    weather.changeUnit();

    getWeatherInfo(
      storage.getLatitude(),
      storage.getLongitude(),
      weather.language,
      weather.unit,
    );
  });

  // language change handler
  document.querySelector('.lang').addEventListener('change', (event) => {
    weather.language = event.target.value;
    storage.setLang(event.target.value);
    time.updateLang(event.target.value);
    updateTimeEl(time);

    getWeatherInfo(
      storage.getLatitude(),
      storage.getLongitude(),
      weather.language,
      weather.unit,
    );

    getLocationDataFromCoords(
      storage.getLongitude(),
      storage.getLatitude(),
      weather.language,
    );

    updateCoordsEl(
      layout[weather.language],
      storage.getLatitude(),
      storage.getLongitude(),
    );

    displayMapEl(
      storage.getLongitude(),
      storage.getLatitude(),
      weather.language,
    );

    updateSearchEl(layout[weather.language]);
  });

  // search handler
  document.querySelector('.search').addEventListener('submit', (e) => {
    const input = document.querySelector('#geocoder').value.trim();
    if (input.length === 0 || Number(input) < 0) {
      /* eslint-disable no-alert */
      alert('Invalid input');
    } else {
      // get location, update weather, update map
      getLocationDataFromInput(input, weather.language, weather.unit);
      time.updateTimeZone(storage.getTimeZone());
      e.preventDefault();
    }
  });

  // document.addEventListener('keyup', (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     const input = document.querySelector('#geocoder').value.trim();
  //     if (input.length === 0 || Number(input) < 0) {
  //       /* eslint-disable no-alert */
  //       alert('Invalid input');
  //     } else {
  //       // get location, update weather, update map
  //       getLocationDataFromInput(input, weather.language, weather.unit);
  //       time.updateTimeZone(storage.getTimeZone());
  //       updateTimeEl(time);
  //     }
  //   }
  // });
};
