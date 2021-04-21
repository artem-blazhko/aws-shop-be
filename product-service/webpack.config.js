const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "production",
  entry: './handler.js',
  output: {
    libraryTarget: 'commonjs',
    path:path.resolve(__dirname, 'dist'),
    filename: 'handler.js',
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.sql$/i,
        use: { loader: 'raw-loader' },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  context: __dirname,
  target: 'node12.18',
  stats: 'errors-only',
};
