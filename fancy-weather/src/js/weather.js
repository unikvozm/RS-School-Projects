import { C, F, layout } from "./constants";
import { updateWeatherEl } from "./dom";

const WEATHER_TOKEN = "b09c5fb76da37a975c47e9a40842e089";

class Weather {
  constructor(storage) {
    this.unit = storage.getUnit();
    this.storage = storage;
    this.language = storage.getLang();
  }
  changeUnit() {
    this.unit = this.unit === C ? F : C;
    this.storage.setUnit(this.unit);
  }
}

async function getWeatherInfo(latitude, longitude, language, unit) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const wheatherPath = "https://api.darksky.net/forecast/";
  const url = `${proxy}${wheatherPath}${WEATHER_TOKEN}/${latitude},${longitude}?exclude=minutely,hourly,flags&lang=${language}&units=si`;
  console.log(url);
  try {
    const req = await fetch(url);
    const data = await req.json();

    const currentWeather = {
      timezone: data.timezone,
      time: data.currently.time, //1576423182 in sec
      icon: data.currently.icon,
      summary: data.currently.summary,
      temperatureC: Math.round(data.currently.temperature),
      apparentTemperatureC: Math.round(data.currently.apparentTemperature),
      humidity: `${Math.round(data.currently.humidity * 100)}%`,
      wind: `${data.currently.windSpeed} ${layout[language].speed}`
    };

    const next1DayWeather = {
      icon: data.daily.data[1].icon,
      temperatureC: Math.round(
        (data.daily.data[1].temperatureHigh +
          data.daily.data[1].temperatureLow) /
          2
      )
    };

    const next2DayWeather = {
      icon: data.daily.data[2].icon,
      temperatureC: Math.round(
        (data.daily.data[2].temperatureHigh +
          data.daily.data[2].temperatureLow) /
          2
      )
    };

    const next3DayWeather = {
      icon: data.daily.data[3].icon,
      temperatureC: Math.round(
        (data.daily.data[3].temperatureHigh +
          data.daily.data[3].temperatureLow) /
          2
      )
    };

    updateWeatherEl(
      currentWeather,
      next1DayWeather,
      next2DayWeather,
      next3DayWeather,
      layout[language],
      unit
    );
  } catch (err) {
    throw new Error(err);
  }
}

export { Weather, getWeatherInfo };
