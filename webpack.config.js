const path = require('path');
const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/lib/client.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'JourneyIFrameClient',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: production ? 'source-map' : 'cheap-module-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  }
};
