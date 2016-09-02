module.exports = {
  path: 'lessons',

  // getComponents with namespace like sidebar and main
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        sidebar: require('./modules/Sidebar'),
        content: require('./modules/Content')
      })
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Lesson')
      ])
    })
  }
}
