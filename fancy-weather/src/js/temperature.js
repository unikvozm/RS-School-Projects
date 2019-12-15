import { C, F } from "./constants";
const CBtn = document.querySelector("#celcius");
const FBtn = document.querySelector("#fahreinheit");

function styleTemp(el) {
  el.classList.toggle("selected");
}


export { styleTemp };
