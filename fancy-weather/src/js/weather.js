import { C, F, layout } from "./constants";
import { updateWeatherEl } from "./dom";

const WEATHER_TOKEN = "b09c5fb76da37a975c47e9a40842e089";

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

async function getWeatherInfo(latitude, longitude, language, unit) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const wheatherPath = "https://api.darksky.net/forecast/";
  const url = `${proxy}${wheatherPath}${WEATHER_TOKEN}/${latitude},${longitude}?exclude=minutely,hourly,flags?lang=${language}`;
  try {
    const req = await fetch(url);
    const data = await req.json();
    console.log(data.currently.time);
    const currentWeather = {
      timezone: data.timezone,
      time: data.currently.time, //1576423182
      icon: data.currently.icon,
      summaryText: data.currently.summary,
      temperatureF: Math.round(data.currently.temperature),
      apparentTemperatureF: Math.round(data.currently.apparentTemperature),
      humidity: `${Math.round(data.currently.humidity * 100)}%`,
      wind: `${data.currently.windSpeed} ${layout[language].speed}`
    };

    const next1DayWeather = {
      time: data.daily.data[1].time, //1576423182
      icon: data.daily.data[1].icon,
      temperatureF: Math.round(
        (data.daily.data[1].temperatureHigh +
          data.daily.data[1].temperatureLow) /
          2
      )
    };

    const next2DayWeather = {
      time: data.daily.data[2].time, //1576423182
      icon: data.daily.data[2].icon,
      temperatureF: Math.round(
        (data.daily.data[2].temperatureHigh +
          data.daily.data[2].temperatureLow) /
          2
      )
    };

    const next3DayWeather = {
      time: data.daily.data[3].time, //1576423182
      icon: data.daily.data[3].icon,
      temperatureF: Math.round(
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
