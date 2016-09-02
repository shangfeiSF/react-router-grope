module.exports = {
  path: 'assignments',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Assignment')
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        sidebar: require('./modules/Sidebar'),
        main: require('./modules/Assignments')
      })
    })
  }
}
