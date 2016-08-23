module.exports = {
  serverOptions: {
    10: ['--history-api-fallback'],
    11: ['--history-api-fallback'],
    12: ['--history-api-fallback'],
    13: ['--history-api-fallback']
  },

  webpackConfigPaths: {
    11: './webpack.config.js',
    12: './webpack.config.js',
    13: './webpack.config.js'
  },

  productionCommands: {
    11: ['webpack', '&&', 'node', 'server.js'],
    12: ['webpack', '&&', 'node', 'server.js'],
    13: ['webpack', '&&', 'webpack', '--config', 'webpack.server.config.js', '&&', 'node', 'server.bundle.js']
  }
}