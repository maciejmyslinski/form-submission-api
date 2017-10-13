const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { app: './index.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { modules: false, loose: true }], 'flow', 'es3'],
            },
          },
          'eslint-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
  ],
};
