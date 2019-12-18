import { C, F, EN, RU, BE } from "./constants";

const storage = {
  setLang: lang => {
    localStorage.setItem("language", lang);
  },

  getLang: () => {
    if (!localStorage.getItem("language")) {
      storage.setLang(EN);
      return EN;
    }
    return localStorage.getItem("language");
  },

  setUnit: unit => {
    localStorage.setItem("unit", unit);
  },

  getUnit: () => {
    if (!localStorage.getItem("unit")) {
      localStorage.setItem("unit", C);
      return C;
    }
    return localStorage.getItem("unit");
  },

  setLongitude: long => {
    localStorage.setItem("longitude", long);
  },

  getLongitude: () => {
    if (localStorage.getItem("longitude")) {
      return localStorage.getItem("longitude");
    }
  },

  setLatitude: lat => {
    localStorage.setItem("latitude", lat);
  },

  getLatitude: () => {
    if (localStorage.getItem("latitude")) {
      return localStorage.getItem("latitude");
    }
  }
};

export default storage;
