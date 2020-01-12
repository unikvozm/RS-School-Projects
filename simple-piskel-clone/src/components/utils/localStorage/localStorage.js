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

  setPrimaryColor: (color) => {
    localStorage.setItem('primary color', color);
  },

  getPrimaryColor: () => {
    if (localStorage.getItem('primary color') === null) {
      storage.setPrimaryColor('#000000');
      return '#000000';
    }
    return localStorage.getItem('primary color');
  },

  setSecondaryColor: (color) => {
    localStorage.setItem('secondary color', color);
  },

  getSecondaryColor: () => {
    if (localStorage.getItem('secondary color') === null) {
      storage.setSecondaryColor('#000000');
      return '#000000';
    }
    return localStorage.getItem('secondary color');
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

  setKeyShortcuts: (objKeys) => {
    localStorage.setItem('key shortcuts', JSON.stringify(objKeys));
  },

  getKeyShortcuts: () => {
    if (localStorage.getItem('key shortcuts') === null) {
      const keyShortcuts = {
        pen: 'p',
        stroke: 'l',
        paintBucket: 'b',
        paintAllBucket: 'a',
        colorPicker: 'o',
        eraser: 'e',
      };
      storage.setKeyShortcuts(keyShortcuts);
      return keyShortcuts;
    }
    return JSON.parse(localStorage.getItem('key shortcuts'));
  },

  updateAuthStatus: (status) => {
    localStorage.setItem('logged in', status);
  },

  getAuthStatus: () => {
    if (localStorage.getItem('logged in') === null) {
      storage.updateAuthStatus('false');
      return 'false';
    }
    return localStorage.getItem('logged in');
  },

  getActiveFrameNum: () => {
    if (localStorage.getItem('active frame') === null) {
      storage.setActiveFrameNum(1);
      return 1;
    }
    return localStorage.getItem('active frame');
  },

  setActiveFrameNum: (activeFrameNum) => {
    localStorage.setItem('active frame #', activeFrameNum);
  },

  getFramesTotalNum: () => {
    if (localStorage.getItem('total frames') === null) {
      storage.setFramesTotalNum(1);
      return 1;
    }
    return localStorage.getItem('total frames');
  },

  setFramesTotalNum: (num) => {
    localStorage.setItem('total frames', num);
  },

  getAllFrames: () => {
    if (localStorage.getItem('frames') === null) {
      storage.setAllFrames(JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('frames'));
  },

  setAllFrames: (data) => localStorage.setItem('frames', data),
};

export default storage;
