import { updateLocationEl, updateCoordsEl, displayMapEl } from "./dom";
import storage from "./localStorage";
import { getWeatherInfo } from './weather';
import { layout } from './constants';


const GEOCODER_TOKEN = "cdb1e310abc5419f88c96b50bb013ea1";

function getLocationDataFromCoords(long, lat, language) {
  const api_url = "https://api.opencagedata.com/geocode/v1/json";

  const request_url =
    api_url +
    "?" +
    "key=" +
    GEOCODER_TOKEN +
    "&q=" +
    encodeURIComponent(lat + "," + long) +
    "&language=" +
    language;
  +"&pretty=1";

  const request = new XMLHttpRequest();
  request.open("GET", request_url, true);

  request.onload = function() {
    if (request.status == 200) {
      // Success!
      const data = JSON.parse(request.responseText);

      const country = data.results[0].components.country;
      const city = data.results[0].components.city;

      updateLocationEl(city, country);
    } else if (request.status <= 500) {
      // We reached our target server, but it returned an error
      console.log("unable to geocode! Response code: " + request.status);
      const data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send(); // make the request
}

function getLocationDataFromInput(input, language, unit) {
  input = input.replace(" ", "%20");
  const api_url = "https://api.opencagedata.com/geocode/v1/json";

  const request_url =
    api_url +
    "?q=" +
    input +
    "&key=" +
    GEOCODER_TOKEN +
    "&language=" +
    language +
    "&pretty=1";

  const request = new XMLHttpRequest();
  request.open("GET", request_url, true);

  request.onload = function() {
    if (request.status == 200) {
      // Success!
      const data = JSON.parse(request.responseText);

      const country = data.results[0].components.country;
      const city =
        data.results[0].components.city ||
        data.results[0].components.town ||
        data.results[0].components.village ||
        data.results[0].components.county ||
        data.results[0].components.state;

      const lat = data.results[0].geometry.lat;
      const long = data.results[0].geometry.lng;

      updateLocationEl(city, country);
      storage.setLatitude(lat);
      storage.setLongitude(long);
      getWeatherInfo(lat, long, language, unit);
      updateCoordsEl(layout[language], lat, long);
      displayMapEl(long, lat, language);
    } else if (request.status <= 500) {
      // We reached our target server, but it returned an error
      console.log("unable to geocode! Response code: " + request.status);
      const data = JSON.parse(request.responseText);
      alert(data.status.message);
    } else {
      alert("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    alert("unable to connect to server");
  };

  request.send(); // make the request
}

export { getLocationDataFromCoords, getLocationDataFromInput };
