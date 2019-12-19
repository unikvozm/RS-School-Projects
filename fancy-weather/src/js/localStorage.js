import { C, EN } from './constants';

const storage = {
  setLang: (lang) => {
    localStorage.setItem('language', lang);
  },

  getLang: () => {
    if (!localStorage.getItem('language')) {
      storage.setLang(EN);
      return EN;
    }
    return localStorage.getItem('language');
  },

  setUnit: (unit) => {
    localStorage.setItem('unit', unit);
  },

  getUnit: () => {
    if (!localStorage.getItem('unit')) {
      localStorage.setItem('unit', C);
      return C;
    }
    return localStorage.getItem('unit');
  },

  setLongitude: (long) => {
    localStorage.setItem('longitude', long);
  },

  getLongitude: () => localStorage.getItem('longitude'),

  setLatitude: (lat) => {
    localStorage.setItem('latitude', lat);
  },

  getLatitude: () => localStorage.getItem('latitude'),

  setTimeZone: (timezone) => { localStorage.setItem('timeZone', timezone); },

  getTimeZone: () => localStorage.getItem('timeZone'),
};

export default storage;
