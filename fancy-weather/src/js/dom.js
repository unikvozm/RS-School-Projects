function getTemplate(location, time) {
  const template = `
  <div class="wrapper">
  <div class="menu">
    <div class="tools">
      <div class="refresh">&#x21bb;</div>
      <select class="lang">
        <option value="EN" class="lang__option" selected>EN</option>
        <option value="RU" class="lang__option">RU</option>
        <option value="BE" class="lang__option">BE</option>
      </select>
      <div class="units">
        <div class="units__unit selected" id="celcius">°C</div>
        <div class="units__unit" id="fahrenheit">°F</div>
      </div>
    </div>
    <div class="search">
      <input type="text" class="search__inpt" />
      <button class="search__btn">Search</button>
    </div>
  </div>
  <main>
    <section class="current-data">
      <p class="current-data__town">${location.town}, ${location.country}</p>
      <p class="current-data__date">
        ${time.day} ${time.date} ${time.month} ${time.hour}:${time.minutes}
      </p>
    </section>
  </main>
</div>
`;
  document.body.innerHTML = template;
}

function updateTimeEl(time) {
  document.querySelector(
    ".current-data__date"
  ).textContent = `${time.day} ${time.date} ${time.month} ${time.hour}:${time.minutes}`;
}

export { getTemplate, updateTimeEl };
