import './keyShortcuts.scss';

import { keyShortcuts, keyboardWindow } from '../../components/utils/Constants';
import storage from '../../components/utils/localStorage/localStorage';

let newKeys = {};

function keyboardClose() {
  keyboardWindow.classList.remove('window-open');
  keyboardWindow.classList.add('window-closed');
}

function displayInfo(event) {
  const infoEl = document.querySelector('.keyboard__info');
  const changeBtn = document.querySelector('.shortcut-change');

  const newKey = event.key;
  const keysInUse = Object.values(keyShortcuts);

  if (keysInUse.includes(newKey)) {
    infoEl.innerHTML = `Key ${newKey} is already in use`;
    changeBtn.disabled = true;
  } else if (!/[a-z]/i.test(newKey)) {
    infoEl.innerHTML = 'Only latin letters are allowed';
    changeBtn.disabled = true;
  } else {
    infoEl.innerHTML = 'Click Change to change the keys shortcuts';
    document.querySelectorAll('.shortcut-inpt').forEach((el) => {
      if (el.value) newKeys[el.name] = el.value;
    });
    if (
      Object.values(newKeys).every(
        (el) => !keysInUse.includes(el) && /[a-z]/i.test(el),
      )
    ) {
      changeBtn.disabled = false;
    }
  }
}

function changeKeysLayout() {
  document.querySelector('.pen-key').innerHTML = keyShortcuts.pen;
  document.querySelector(
    '#pen-key',
  ).innerHTML = `(${keyShortcuts.pen.toUpperCase()})`;

  document.querySelector('.stroke-key').innerHTML = keyShortcuts.stroke;
  document.querySelector(
    '#stroke-key',
  ).innerHTML = `(${keyShortcuts.stroke.toUpperCase()})`;

  document.querySelector('.paint-bucket-key').innerHTML = keyShortcuts.paintBucket;
  document.querySelector(
    '#paint-bucket-key',
  ).innerHTML = `(${keyShortcuts.paintBucket.toUpperCase()})`;

  document.querySelector('.magic-bucket-key').innerHTML = keyShortcuts.paintAllBucket;
  document.querySelector(
    '#magic-bucket-key',
  ).innerHTML = `(${keyShortcuts.paintAllBucket.toUpperCase()})`;

  document.querySelector('.color-picker-key').innerHTML = keyShortcuts.colorPicker;
  document.querySelector(
    '#color-picker-key',
  ).innerHTML = `(${keyShortcuts.colorPicker.toUpperCase()})`;

  document.querySelector('.eraser-key').innerHTML = keyShortcuts.eraser;
  document.querySelector(
    '#eraser-key',
  ).innerHTML = `(${keyShortcuts.eraser.toUpperCase()})`;
}

function changeKeyShortcuts() {
  newKeys = {};
  let isChangeable = true;
  document.querySelectorAll('.shortcut-inpt').forEach((el) => {
    if (el.value) {
      if (Object.values(newKeys).includes(el.value)) {
        isChangeable = false;
      }
      newKeys[el.name] = el.value;
    }
  });
  if (isChangeable) {
    Object.keys(newKeys).forEach((keyEl) => {
      keyShortcuts[keyEl] = newKeys[keyEl];
    });
    changeKeysLayout();
    storage.setKeyShortcuts(keyShortcuts);
  } else {
    document.querySelector('.keyboard__info').innerHTML = "Can't change to these keys";
  }
}

function keyboardInit() {
  keyboardWindow.innerHTML = `
  <h3 class="keyboard__title">Keyboard shortcut</h3>
  <p class="keyboard__info"> </p>
  <table class="keyboard__container">
    <tr>
      <td><img class="shortcut-icon" src="img/penIcon.png" /></td>
      <td><p class="shortcut-value pen-key">${keyShortcuts.pen}</p></td>
      <td><p class="shortcut-name">Pen tool</p></td>
      <td><input type="text" class="shortcut-inpt" name="pen" placeholder="New key" maxlength="1" /></td>
    </tr>
    <tr>
      <td><img class="shortcut-icon" src="img/strokeIcon.png" /></td>
      <td><p class="shortcut-value stroke-key">${keyShortcuts.stroke}</p> </td>
      <td><p class="shortcut-name">Stroke tool</p></td>
      <td><input type="text" class="shortcut-inpt" name="stroke" placeholder="New key" maxlength="1" /></td>
    </tr>
    <tr>
      <td><img class="shortcut-icon" src="img/paintBucketIcon.png" /></td>
      <td><p class="shortcut-value paint-bucket-key">${keyShortcuts.paintBucket}</p>  </td>
      <td><p class="shortcut-name">Paint bucket tool</p></td>
      <td><input type="text" class="shortcut-inpt" name="paintBucket" placeholder="New key" maxlength="1" /></td>
    </tr>
    <tr>
      <td><img class="shortcut-icon" src="img/paintAllIcon.png" /></td>
      <td><p class="shortcut-value magic-bucket-key">${keyShortcuts.paintAllBucket}</p>  </td>
      <td><p class="shortcut-name">Magic bucket tool</p></td>
      <td><input type="text" class="shortcut-inpt" name="paintAllBucket" placeholder="New key" maxlength="1" /></td>
    </tr>
    <tr>
      <td><img class="shortcut-icon" src="img/colorPickerIcon.png" /></td>
      <td><p class="shortcut-value color-picker-key">${keyShortcuts.colorPicker}</p>  </td>
      <td><p class="shortcut-name">Color picker</p></td>
      <td><input type="text" class="shortcut-inpt" name="colorPicker" placeholder="New key" maxlength="1" /></td>
    </tr>  
    <tr>
      <td><img class="shortcut-icon" src="img/eraserIcon.png" /></td>
      <td><p class="shortcut-value eraser-key">${keyShortcuts.eraser}</p>  </td>
      <td><p class="shortcut-name">Eraser pen tool</p></td>
      <td><input type="text" class="shortcut-inpt" name="eraser" placeholder="New key" maxlength="1" /></td>
    </tr>
  </table>
  <button class="shortcut-change">Change</button>
  <button class="shortcut-cancel">❌</button>
  `;

  document
    .querySelector('.shortcut-cancel')
    .addEventListener('click', keyboardClose);
  document
    .querySelectorAll('.shortcut-inpt')
    .forEach((el) => el.addEventListener('keypress', displayInfo));
  document
    .querySelector('.shortcut-change')
    .addEventListener('click', changeKeyShortcuts);
}

function keyboardOpen() {
  keyboardWindow.classList.add('window-open');
  keyboardWindow.classList.remove('window-closed');
}

export { keyboardInit, keyboardOpen };
