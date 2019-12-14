import {C, F} from './constants';

class Weather {
  constructor(storage) {
	this.unit = storage.getUnit();
	this.storage = storage;
  }
  changeUnit() {
	this.unit = this.unit === C ? F : C;
	this.storage.setUnit(this.unit);
  }
}

export { Weather };
