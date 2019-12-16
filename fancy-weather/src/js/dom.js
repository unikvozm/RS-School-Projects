import { normCoords, fromFtoC } from "./_helpers";

function getTemplate(location, time) {
  const template = `
<div class="wrapper">
  <section class="menu">
    <div class="tools">
      <div class="refresh">&#x21bb;</div>
      <select class="lang">
        <option value="EN" class="lang__option">EN</option>
        <option value="RU" class="lang__option">RU</option>
        <option value="BE" class="lang__option">BE</option>
      </select>
      <div class="units">
        <div class="units__unit selected" id="celcius">°C</div>
        <div class="units__unit" id="fahrenheit">°F</div>
      </div>
    </div>
    <div class="search">
      <input type="text" class="search__inpt" />
      <button class="search__btn">Search</button>
    </div>
  </section>
  <main>
    <section class="current-data">
      <p class="current-data__town">${location.town}, ${location.country}</p>
      <p class="current-data__date">
        ${time.day} ${time.date} ${time.month} ${time.hour}:${time.minutes}
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
    <section class="coords">
      <p class="coords__lat"></p>
      <p class="coords__long"></p>
    </section>
  </main>
</div>
`;
  document.body.innerHTML = template;
}

function updateTimeEl(time) {
  document.querySelector(
    ".current-data__date"
  ).textContent = `${time.day} ${time.date} ${time.month} ${time.hour}:${time.minutes}`;
}

function updateWeatherEl(current, next1, next2, next3, layout, unit) {
  document.querySelector(".current-weather__temp").textContent = `
    ${unit === "F" ? current.temperatureF : fromFtoC(current.temperatureF)}°`;
  document.querySelector(".current-weather__info").innerHTML = `<p>${
    current.summaryText
  }</p><p>${layout.weather[0]} ${
    unit === "F"
      ? current.apparentTemperatureF
      : fromFtoC(current.apparentTemperatureF)
  }°</p><p>${layout.weather[1]} ${current.wind}</p><p>${layout.weather[2]} ${
    current.humidity
  }</p>`;

  document.querySelector("#temp1").textContent = `${
    unit === "F" ? next1.temperatureF : fromFtoC(next1.temperatureF)
  }°`;

  document.querySelector("#temp2").textContent = `${
    unit === "F" ? next2.temperatureF : fromFtoC(next2.temperatureF)
  }°`;

  document.querySelector("#temp3").textContent = `${
    unit === "F" ? next3.temperatureF : fromFtoC(next3.temperatureF)
  }°`;

  const Skycons = require("../../node_modules/skycons")(window);
  let skycons = new Skycons({ color: "white" });
  skycons.add("day0-icon", current.icon);
  skycons.add("day1-icon", next1.icon);
  skycons.add("day2-icon", next2.icon);
  skycons.add("day3-icon", next3.icon);

  skycons.play();
}

function updateCoords(layout, lat, long) {
  document.querySelector(".coords__long").textContent = `${
    layout.coords[1]
  }: ${normCoords(long)}`;
  document.querySelector(".coords__lat").textContent = `${
    layout.coords[0]
  }: ${normCoords(lat)}`;
}

export { getTemplate, updateTimeEl, updateWeatherEl, updateCoords };
