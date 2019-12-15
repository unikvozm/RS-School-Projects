//const LOCATION_TOKEN = "ed7dd3f632d64e";

function setCurCoords(layout) {
  let lat = 0;
  let long = 0;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      long = pos.coords.longitude;
	  lat = pos.coords.latitude;
	  document.querySelector('.coords__long').textContent = `${layout.coords[1]}: ${Math.floor(long)}°${Math.floor((long - Math.floor(long)) * 60)}'`;
	  document.querySelector('.coords__lat').textContent = `${layout.coords[0]}: ${Math.floor(lat)}°${Math.floor((lat - Math.floor(lat)) * 60)}'`;
    });
  } 
}

const location = {
  town: "Moscow",
  country: "Russia",
};

export { location, setCurCoords };
