module.exports = {
  getTemplate
}

function getTemplate () {
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
</div>
`;
  document.body.innerHTML = template;
};

