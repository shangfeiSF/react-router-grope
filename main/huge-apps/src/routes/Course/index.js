module.exports = {
  path: 'course/:courseId',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/main'))
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Lessons'),
        require('./routes/Notices'),
        require('./routes/Weights')
      ])
    })
  }
}
