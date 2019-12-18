import { normCoords, fromCtoF } from "./_helpers";
import { layout } from "./constants";

function getTemplate(language, time) {
  const template = `
<div class="wrapper">
  <section class="menu">
    <div class="tools">
      <div class="refresh">&#x21bb;</div>
      <select class="lang">
        <option value="en" class="lang__option">EN</option>
        <option value="ru" class="lang__option">RU</option>
        <option value="be" class="lang__option">BE</option>
      </select>
      <div class="units">
        <div class="units__unit selected" id="celcius">°C</div>
        <div class="units__unit" id="fahrenheit">°F</div>
      </div>
    </div>
    <form class="search">
      <input type="text" class="search__inpt" id="geocoder" placeholder="${layout[language].search[0]}">
      <button type="button" class="search__btn">${layout[language].search[1]}</button>
    </form>
  </section>
  <main>
    <section class="current-data">
      <p class="current-data__town"></p>
      <p class="current-data__date">
      ${time.timeNow}
      </p>
      <section class="current-weather">
        <p class="current-weather__container"><span class="current-weather__temp"></span>
        <canvas class="current-weather__icon" id="day0-icon" width="128" height="128"></canvas></p>
        <div class="current-weather__info"></div>
      </section>
      <section class="forecast">
        <div class="forecast__info">
          <p class="forecast__info-day" id="day1">${time.nextDay}</p>
          <p class="forecast__info-temp" id="temp1"></p>
          <canvas class="forecast__info-icon" id="day1-icon" width="64" height="64"></canvas>
        </div>
        <div class="forecast__info">
          <p class="forecast__info-day" id="day2">${time.next2Day}</p>
          <p class="forecast__info-temp" id="temp2"></p>
          <canvas class="forecast__info-icon" id="day2-icon" width="64" height="64"></canvas>
        </div>
        <div class="forecast__info">
          <p class="forecast__info-day" id="day3">${time.next3Day}</p>
          <p class="forecast__info-temp" id="temp3"></p>
          <canvas class="forecast__info-icon" id="day3-icon" width="64" height="64"></canvas>
        </div>
      </section>
    </section>
    <section class="location">
      <div class="location__map" id="map"></div>
      <div class="location__coords">
        <p class="coords__lat"></p>
        <p class="coords__long"></p>
      </div>
    </section>
  </main>
</div>
`;

  document.body.innerHTML = template;
}

function updateTimeEl(time) {
  document.querySelector(
    ".current-data__date"
  ).textContent = time.timeNow;
  document.querySelector("#day1").textContent = time.nextDay;
  document.querySelector("#day2").textContent = time.next2Day;
  document.querySelector("#day3").textContent = time.next3Day;
}

function updateWeatherEl(current, next1, next2, next3, layout, unit) {
  document.querySelector(".current-weather__temp").textContent = `
    ${unit === "C" ? current.temperatureC : fromCtoF(current.temperatureC)}°`;
  document.querySelector(".current-weather__info").innerHTML = `<p>${
    current.summary
  }</p><p>${layout.weather[0]} ${
    unit === "C"
      ? current.apparentTemperatureC
      : fromCtoF(current.apparentTemperatureC)
  }°</p><p>${layout.weather[1]} ${current.wind}</p><p>${layout.weather[2]} ${
    current.humidity
  }</p>`;

  document.querySelector("#temp1").textContent = `${
    unit === "C" ? next1.temperatureC : fromCtoF(next1.temperatureC)
  }°`;

  document.querySelector("#temp2").textContent = `${
    unit === "C" ? next2.temperatureC : fromCtoF(next2.temperatureC)
  }°`;

  document.querySelector("#temp3").textContent = `${
    unit === "C" ? next3.temperatureC : fromCtoF(next3.temperatureC)
  }°`;

  displayIcons(current, next1, next2, next3);
}

function displayIcons(current, next1, next2, next3) {
  const Skycons = require("../../node_modules/skycons")(window);
  let skycons = new Skycons({ color: "white" });
  skycons.add("day0-icon", current.icon);
  skycons.add("day1-icon", next1.icon);
  skycons.add("day2-icon", next2.icon);
  skycons.add("day3-icon", next3.icon);

  skycons.play();
}

function updateCoordsEl(layout, lat, long) {
  document.querySelector(".coords__long").textContent = `${
    layout.coords[1]
  }: ${normCoords(long)}`;
  document.querySelector(".coords__lat").textContent = `${
    layout.coords[0]
  }: ${normCoords(lat)}`;
}

function displayMapEl(long = 0, lat = 0, language) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoidW5pa3Zvem0iLCJhIjoiY2s0OGRweW5sMTE4YTNscGdhNzgyN2F2dCJ9.nlBqKqXBVoruZpwSgl76LA";
  const map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [long, lat], // starting position [lng, lat]
    zoom: 13 // starting zoom
  });
  map.on("load", function() {
    map.setLayoutProperty("country-label", "text-field", [
      "get",
      "name_" + language
    ]);
  });
}

function updateLocationEl(city, country) {
  document.querySelector(
    ".current-data__town"
  ).textContent = `${city}, ${country}`;
}

function updateSearchEl(language) {
  document.querySelector(
    ".search"
  ).innerHTML = `<input type="text" class="search__inpt" placeholder="${layout[language].search[0]}"/>
  <button class="search__btn">${layout[language].search[1]}</button>`;
}

export {
  getTemplate,
  updateTimeEl,
  updateWeatherEl,
  updateCoordsEl,
  displayMapEl,
  updateLocationEl,
  updateSearchEl
};
