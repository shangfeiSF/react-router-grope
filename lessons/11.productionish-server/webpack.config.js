var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  },

  // webpack-1: http://webpack.github.io/docs/optimization.html
  plugins: [
    // From webpack-1 to webpack-2:
    // https://webpack.js.org/guides/migrating/#dedupeplugin-has-been-removed
    // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}