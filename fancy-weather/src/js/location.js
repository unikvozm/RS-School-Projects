import { updateLocationEl } from "./dom";

/* const LOCATION_TOKEN_IP = "ed7dd3f632d64e";
const MAP_TOKEN =
  "pk.eyJ1IjoidW5pa3Zvem0iLCJhIjoiY2s0OGRweW5sMTE4YTNscGdhNzgyN2F2dCJ9.nlBqKqXBVoruZpwSgl76LA"; */
const GEOCODER_TOKEN = "cdb1e310abc5419f88c96b50bb013ea1";

/* const location = {
  longitude: 0,
  latitude: 0,
  country: "",
  city: "",
}; */

/*async function getUserData() {
  const url = `https://ipinfo.io/json?token=${LOCATION_TOKEN_IP}`;
  try {
    const req = await fetch(url);
    const data = await req.json();
    console.log(data);
  } catch (err) {
    throw new Error(err);
  }
}*/

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

function getLocationDataFromInput(input, language, locationObject) {
  input = input.trim().replace(" ", "%20");
  const api_url = "https://api.opencagedata.com/geocode/v1/json";

  const request_url =
    api_url + "?=" + input + "key=" + GEOCODER_TOKEN + "&language=" + language;
  +"&pretty=1";

  const request = new XMLHttpRequest();
  request.open("GET", request_url, true);

  request.onload = function() {
    if (request.status == 200) {
      // Success!
      const data = JSON.parse(request.responseText);

      locationObject.country = data.results[0].components.country;
      locationObject.city = data.results[0].components.city;
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

export { getLocationDataFromCoords, getLocationDataFromInput };
