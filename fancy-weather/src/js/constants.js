// units
const C = "C";
const F = "F";

// languages
const EN = "EN";
const RU = "RU";
const BE = "BE";

// layout
const layout = {
	EN: {
		day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		coords: ['Latitude', 'Longitude'],
		search: ['Search city or ZIP', 'search'],
		weather: ['feels like:', 'wind:', 'humidity:'],
		speed: 'm/s'
	},
	RU: {
		day: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		dayShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		coords: ['Широта', 'Долгота'],
		search: ['Поиск по городу или индексу', 'поиск'],
		weather: ['чувствуется как:', 'ветер:', 'влажность:'],
		speed: 'м/с'
	},
	BE: {
		day: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Сыбота'],
		dayShort: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
		month: ['Студзень', 'Люты', 'Сакавiк', 'Красавiк', 'Май', 'Червень', 'Лiпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лiстапад', 'Снежань'],
		coords: ['Шырата', 'Даўгата'],
		search: ['Пошук горада ці ZIP', 'пошук'],
		weather: ['адчувае сябе:', 'вецер:', 'вільготнасць:'],
		speed: 'м/с'
	},
};

export { C, F, EN, RU, BE, layout };
