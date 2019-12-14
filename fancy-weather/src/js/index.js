import "../css/style.scss";
import { getTemplate } from "./dom";
import { styleTemp } from "./temperature";
import { Weather } from './weather';

const weather = new Weather('celcius');

window.onload = getTemplate();

document.querySelector(".units").addEventListener("click", event => {
  document.querySelectorAll(".units__unit").forEach(unitEl => {
    styleTemp(unitEl);
  });
  weather.setUnit(event.target.id);
  console.log(weather);
});
