const LOCATION_TOKEN = "ed7dd3f632d64e";

function getLocation() {
	let coords = {};
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((pos) => {coords.longitude = pos.coords.longitude; coords.latitude = pos.coords.latitude});
	}
	else {
		alert("Can't find geolocation");
		// TODO:
		coords.latitude = 0;
		coords.longitude = 0;
	}
	return coords;
}

export { getLocation }