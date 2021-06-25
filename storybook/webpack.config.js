const path = require('path');

const WebpackFederationPlugin = require('./utils');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'storybook-static/federation'),
    publicPath: '//localhost:3030/federation/'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new WebpackFederationPlugin({
      files: {
        paths: ['./src/components/*.jsx']
      }
    })
  ]
};
