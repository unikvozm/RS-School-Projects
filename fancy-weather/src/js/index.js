import "../css/style.scss";

import { getTemplate, updateTimeEl, updateCoords, displayMap } from "./dom";
import { styleTemp } from "./temperature";
import { Weather, getWeatherInfo } from "./weather";
import storage from "./localStorage";
import { location, getLocationData } from "./location";
import { Time } from "./time";
import { layout } from "./constants";

const weather = new Weather(storage);
const time = new Time(new Date(), layout[weather.language]);

window.onload = () => {
  //getUserData();
  getTemplate();

  if (weather.unit === "F") {
    document.querySelectorAll(".units__unit").forEach(unitEl => {
      styleTemp(unitEl);
    });
  }
  document.querySelector(".lang").value = weather.language;

  setInterval(() => {
    time.updateTime();
    updateTimeEl(time);
  }, 1000);

  let lat = 0;
  let long = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;
      displayMap(long, lat, weather.language);
      updateCoords(layout[weather.language], lat, long)
      getWeatherInfo(lat, long, weather.language, weather.unit);
      getLocationData(long, lat, weather.language);
    });
  }

  document.querySelector(".units").addEventListener("click", () => {
    document.querySelectorAll(".units__unit").forEach(unitEl => {
      styleTemp(unitEl);
    });
    weather.changeUnit();
  });

  document.querySelector(".lang").addEventListener("change", function() {
    weather.language = this.value.toLowerCase();
    storage.setLang(this.value.toLowerCase());
    time.updateLayout(layout[weather.language]);
    updateTimeEl(time);
    setCurCoords(layout[weather.language]);
  });
};
