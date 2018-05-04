const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'wwwroot/js');

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'build.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: APP_DIR,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader'],
    }],
  },
};
