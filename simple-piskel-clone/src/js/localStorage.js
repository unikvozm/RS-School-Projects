const storage = {
  setSize: (size) => {
    localStorage.setItem('size', size);
  },

  getSize: () => {
    if (localStorage.getItem('size') === null) {
      storage.setSize(32);
      return 32;
    }
    return localStorage.getItem('size');
  },

  setPixelSize: (size) => {
    localStorage.setItem('pixel-size', size);
  },

  getPixelSize: () => {
    if (localStorage.getItem('pixel-size') === null) {
      storage.setPixelSize(1);
      return 1;
    }
    return localStorage.getItem('pixel-size');
  },

  setPrevColor: (prevColor) => {
    localStorage.setItem('previous color', prevColor);
  },

  getPrevColor: () => {
    if (localStorage.getItem('previous color') === null) {
      storage.setPrevColor('#c4c4c4');
      return '#c4c4c4';
    }
    return localStorage.getItem('previous color');
  },

  setCurColor: (curColor) => {
    localStorage.setItem('current color', curColor);
  },

  getCurColor: () => {
    if (localStorage.getItem('current color') === null) {
      storage.setCurColor('#41f795');
      return '#41f795';
    }
    return localStorage.getItem('current color');
  },

  setImage: (data) => {
    localStorage.setItem('canvasImage', data);
  },

  getImage: () => {
    if (localStorage.getItem('canvasImage') !== null) {
      return localStorage.getItem('canvasImage');
    }
    return '';
  },

  setActiveTool: (tool) => {
    localStorage.setItem('active tool', tool);
  },

  getActiveTool: () => {
    if (localStorage.getItem('active tool') === null) {
      storage.setActiveTool('pen');
      return 'pen';
    }
    return localStorage.getItem('active tool');
  },
};

export default storage;
