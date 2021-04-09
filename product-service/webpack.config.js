const path = require('path');

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
        use: { loader: 'babel-loader' },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  context: __dirname,
  target: 'node12.18',
  stats: 'errors-only',
};
