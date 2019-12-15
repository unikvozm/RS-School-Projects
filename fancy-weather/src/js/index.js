import "../css/style.scss";
import { getTemplate, updateTimeEl } from "./dom";
import { styleTemp } from "./temperature";
import { Weather } from "./weather";
import storage from "./localStorage";
import { getLocation } from "./location";
import { Time } from "./time";
import { layout } from "./constants";

const weather = new Weather(storage);
const time = new Time(new Date(), layout[weather.language]);

//TODO:
const location = {
  town: "Moscow",
  country: "Russia"
};

window.onload = () => {
  getTemplate(location, time);
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

  //console.log(getLocation());
  document.querySelector(".units").addEventListener("click", () => {
    document.querySelectorAll(".units__unit").forEach(unitEl => {
      styleTemp(unitEl);
    });
    weather.changeUnit();
  });

  document.querySelector(".lang").addEventListener("change", function() {
    weather.language = this.value;
    storage.setLang(this.value);
    time.updateLayout(layout[weather.language]);
    updateTimeEl(time);
  });
};
