import "../css/style.scss";
import { getTemplate } from "./dom";
import { styleTemp, setActiveUnit } from "./temperature";
import { Weather } from "./weather";
import storage from "./localStorage";

const weather = new Weather(storage);

window.onload = () => {
  getTemplate();
  storage.setUnit("C");
  weather.unit = "C";
  document.querySelector(".units").addEventListener("click", () => {
    document.querySelectorAll(".units__unit").forEach(unitEl => {
      styleTemp(unitEl);
    });
    weather.changeUnit();
  });
  document.querySelector('.lang').addEventListener('change', function () {
    weather.language = this.value;
    storage.setLang(this.value);
  });
};
