import { getSeason, getdayTime } from './_helpers';

async function updateImage(time, timezone, summary) {
  const today = new Date(time).toLocaleString('ru-RU', {
    month: '2-digit',
    hour: '2-digit',
    timeZone: timezone,
  });
  const month = Number(today.slice(0, 2));
  const hour = Number(today.slice(-2));
  const season = getSeason(month);
  const dayTime = getdayTime(hour);
  const place = document.querySelector('.current-data__town').textContent;

  const ACCESSKEY = 'd2bd80527522e12c2331b079c8a8aff0d0cad5290f6189a7fa4f128a0ec2030f';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  const URL = `${proxy}http://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${
    place},${season},${dayTime},${summary}&client_id=${ACCESSKEY}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    /* eslint-disable no-restricted-globals */
    const url = `${data.urls.raw}&w=${screen.width.toString()}&h=${screen.height.toString()}`;
    img.setAttribute('src', url);
    img.onload = () => {
      document.body.style.backgroundImage = `url(${url})`;
      document.body.style.backgroundSize = 'cover';
    };
    img.onerror = (err) => { throw new Error(err); };
  } catch (err) {
    /* eslint-disable no-console */
    console.log(err);
  }
}

export default updateImage;
