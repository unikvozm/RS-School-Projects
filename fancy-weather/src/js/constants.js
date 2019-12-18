// units
const C = "C";
const F = "F";

// languages
const EN = "en";
const RU = "ru";
const BE = "be";

// layout
const layout = {
  en: {
    day: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    dayShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    coords: ["Latitude", "Longitude"],
    search: ["Search city or ZIP", "search"],
    weather: ["feels like:", "wind:", "humidity:"],
    speed: "m/s"
  },
  ru: {
    coords: ["Широта", "Долгота"],
    search: ["Поиск по городу или индексу", "поиск"],
    weather: ["чувствуется как:", "ветер:", "влажность:"],
    speed: "м/с"
  },
  be: {
    day: [
      "Нядзеля",
      "Панядзелак",
      "Аўторак",
      "Серада",
      "Чацьвер",
      "Пятніца",
      "Сыбота"
    ],
    dayShort: ["Няд", "Пнд", "Аўт", "Сер", "Чцв", "Пят", "Суб"],
    month: [
      "Студзень",
      "Люты",
      "Сакавiк",
      "Красавiк",
      "Май",
      "Червень",
      "Лiпень",
      "Жнiвень",
      "Верасень",
      "Кастрычнiк",
      "Лiстапад",
      "Снежань"
    ],
    coords: ["Шырата", "Даўгата"],
    search: ["Пошук горада ці ZIP", "пошук"],
    weather: ["адчувае сябе:", "вецер:", "вільготнасць:"],
    speed: "м/с"
  }
};

export { C, F, EN, RU, BE, layout };
