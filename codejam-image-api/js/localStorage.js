const storage = {
  setSize: (size) => {
    localStorage.setItem('size', size);
  },

  getSize: () => {
    if (localStorage.getItem('size') === null) {
      this.setSize(128);
      return 128;
    }
    return localStorage.getItem('size');
  },

  setPrevColor: (prevColor) => {
    localStorage.setItem('previous color', prevColor);
  },

  getPrevColor: () => {
    if (localStorage.getItem('previous color') === null) {
      this.setPrevColor('#c4c4c4');
      return '#c4c4c4';
    }
    return localStorage.getItem('previous color');
  },

  setCurColor: (curColor) => {
    localStorage.setItem('current color', curColor);
  },

  getCurColor: () => {
    if (localStorage.getItem('current color') === null) {
      this.setCurColor('#41f795');
      return '#41f795';
    }
    return localStorage.getItem('current color');
  },

  setImage: (canvas) => {
    localStorage.setItem('canvasImage', canvas.toDataURL());
  },

  getImage: () => localStorage.getItem('canvasImage'),

  setActiveTool: (tool) => {
    localStorage.setItem('active tool', tool);
  },

  getActiveTool: () => {
    if (localStorage.getItem('active tool') === null) {
      this.setActiveTool('pencil');
      return 'pencil';
    }
    return localStorage.getItem('active tool');
  },
};

export default storage;
