import "../css/style.scss";

import {
  getTemplate,
  updateTimeEl,
  updateCoordsEl,
  displayMapEl,
  updateNextDaysEls,
  updateSearchEl
} from "./dom";
import { styleTemp } from "./temperature";
import { Weather, getWeatherInfo } from "./weather";
import storage from "./localStorage";
import {
  getLocationDataFromCoords,
  getLocationDataFromInput
} from "./location";
import { Time } from "./time";
import { layout } from "./constants";

const weather = new Weather(storage);
const time = new Time(new Date(), layout[weather.language]);

window.onload = () => {
  // creating DOM elements
  getTemplate(weather.language, time);

  // update DOM according to current position coords
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const long = pos.coords.longitude;
      const lat = pos.coords.latitude;

      storage.setLatitude(lat);
      storage.setLongitude(long);

      // update weather info, coordinates and map according to current position
      getWeatherInfo(lat, long, weather.language, weather.unit);
      getLocationDataFromCoords(long, lat, weather.language);
      updateCoordsEl(layout[weather.language], lat, long);
      displayMapEl(long, lat, weather.language);
    });
  }

  // update current unit and language (according to local storage)
  if (weather.unit === "F") {
    document.querySelectorAll(".units__unit").forEach(unitEl => {
      styleTemp(unitEl);
    });
  }
  document.querySelector(".lang").value = weather.language;

  // update time every second
  const timeChange = setInterval(() => {
    time.updateTime();
    updateTimeEl(time);
  }, 1000);

  // unit change handler
  document.querySelector(".units").addEventListener("click", () => {
    document.querySelectorAll(".units__unit").forEach(unitEl => {
      styleTemp(unitEl);
    });

    weather.changeUnit();

    getWeatherInfo(
      storage.getLatitude(),
      storage.getLongitude(),
      weather.language,
      weather.unit
    );
  });

  // language change handler
  document.querySelector(".lang").addEventListener("change", function() {
    weather.language = this.value;
    storage.setLang(this.value);

    time.updateLayout(layout[weather.language]);
    updateTimeEl(time);

    getWeatherInfo(
      storage.getLatitude(),
      storage.getLongitude(),
      weather.language,
      weather.unit
    );

    getLocationDataFromCoords(
      storage.getLongitude(),
      storage.getLatitude(),
      weather.language
    );

    updateCoordsEl(
      layout[weather.language],
      storage.getLatitude(),
      storage.getLongitude()
    );

    displayMapEl(
      storage.getLongitude(),
      storage.getLatitude(),
      weather.language
    );

    updateNextDaysEls(time);

    updateSearchEl(weather.language);
  });

  // search handler
  document.querySelector(".search__btn").addEventListener("click", () => {
    const input = document.querySelector("#geocoder").value.trim();
    if (input.length === 0 || Number(input) < 0) {
      alert("Invalid input");
    } else {
      // get location, update weather, update map
      getLocationDataFromInput(input, weather.language, weather.unit);
    }
  });

  document.addEventListener("keyup", event => {
    if (event.key === "Enter") {
      const input = document.querySelector("#geocoder").value.trim();
      if (input.length === 0 || Number(input) < 0) {
        alert("Invalid input");
      } else {
        // get location, update weather, update map
        getLocationDataFromInput(input, weather.language, weather.unit);
      }
    }
  });
};
