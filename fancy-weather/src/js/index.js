import "../css/style.scss";
import { getTemplate } from "./dom";
import { styleTemp } from "./temperature";
import { Weather } from "./weather";
import storage from "./localStorage";

const weather = new Weather(storage);

window.onload = getTemplate();

document.querySelector(".units").addEventListener("click", event => {
  document.querySelectorAll(".units__unit").forEach(unitEl => {
    styleTemp(unitEl);
  });
  weather.changeUnit();
});
