'use strict';

const path = require('path');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname + '/public/js')
  },
  watch: true,

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test:/\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  }
}
