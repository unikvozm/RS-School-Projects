const path = require('path');

module.exports = {
  entry: './codejam-image-api/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(`${__dirname}/codejam-image-api/`, 'dist'),
  },
};
