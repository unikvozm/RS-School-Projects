import { C, F } from "./constants";
const CBtn = document.querySelector("#celcius");
const FBtn = document.querySelector("#fahreinheit");

function styleTemp(el) {
  el.classList.toggle("selected");
}

function setActiveUnit(lastUnit) {
  if (lastUnit === C) CBtn.classList.add("selected");
  else FBtn.classList.add("selected");
}

export { styleTemp, setActiveUnit };
