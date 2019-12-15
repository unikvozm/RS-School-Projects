import {C, F} from './constants';

class Weather {
  constructor(storage) {
	this.unit = storage.getUnit();
	this.storage = storage;
	this.language = storage.getLang();
	this.location;
  }
  changeUnit() {
	this.unit = this.unit === C ? F : C;
	this.storage.setUnit(this.unit);
  }
}

//async function getWeather

export { Weather };
