import { fromENtoBY } from './_helpers';
import storage from './localStorage';

function setLangCountry(language) {
  switch (language) {
    case 'en':
      return 'en-US';
    case 'ru':
      return 'ru-RU';
    default:
      return 'en-US';
  }
}

class Time {
  constructor(language) {
    this.language = language;
    this.time = new Date().getTime();
    this.lan = setLangCountry(this.language);
    (this.timeNow = new Date(this.time)
      .toLocaleString(this.lan, {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(/,/g, ''));
    this.nextDay = new Date(this.time + 86400000).toLocaleString(this.lan, { weekday: 'long' });
    this.next2Day = new Date(this.time + 172800000).toLocaleString(this.lan, { weekday: 'long' });
    this.next3Day = new Date(this.time + 259200000).toLocaleString(this.lan, { weekday: 'long' });
    if (this.language === 'be') {
      this.timeNow = fromENtoBY(this.timeNow);
      this.nextDay = fromENtoBY(this.nextDay);
      this.next2Day = fromENtoBY(this.next2Day);
      this.next3Day = fromENtoBY(this.next3Day);
    }
  }

  updateTimeZone(newTimezone) {
    this.timezone = newTimezone;
    this.timeNow = new Date(this.time)
      .toLocaleString(this.lan, {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: this.timezone,
      })
      .replace(/,/g, '');
    this.nextDay = new Date(this.time + 86400000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    this.next2Day = new Date(this.time + 172800000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    this.next3Day = new Date(this.time + 259200000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    if (this.language === 'be') {
      this.timeNow = fromENtoBY(this.timeNow);
      this.nextDay = fromENtoBY(this.nextDay);
      this.next2Day = fromENtoBY(this.next2Day);
      this.next3Day = fromENtoBY(this.next3Day);
    }
  }

  updateTime() {
    this.time = this.time + 1000;
    this.timeNow = new Date(this.time)
      .toLocaleString(this.lan, {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: this.timezone,
      })
      .replace(/,/g, '');
    this.nextDay = new Date(this.time + 86400000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    this.next2Day = new Date(this.time + 172800000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    this.next3Day = new Date(this.time + 259200000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    if (this.language === 'be') {
      this.timeNow = fromENtoBY(this.timeNow);
      this.nextDay = fromENtoBY(this.nextDay);
      this.next2Day = fromENtoBY(this.next2Day);
      this.next3Day = fromENtoBY(this.next3Day);
    }
  }

  updateLang(newLanguage) {
    this.language = newLanguage;
    this.lan = setLangCountry(this.language);
    this.timeNow = new Date(this.time)
      .toLocaleString(this.lan, {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: this.timezone,
      })
      .replace(/,/g, '');
    this.nextDay = new Date(this.time + 86400000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    this.next2Day = new Date(this.time + 172800000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    this.next3Day = new Date(this.time + 259200000).toLocaleString(this.lan, {
      weekday: 'long',
      timeZone: this.timezone,
    });
    if (this.language === 'be') {
      this.timeNow = fromENtoBY(this.timeNow);
      this.nextDay = fromENtoBY(this.nextDay);
      this.next2Day = fromENtoBY(this.next2Day);
      this.next3Day = fromENtoBY(this.next3Day);
    }
  }
}

const time = new Time(storage.getLang());

export default time;
