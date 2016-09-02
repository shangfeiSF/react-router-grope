module.exports = {
  path: 'course/:courseId',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/Course'))
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Announcements'),
        require('./routes/Assignments'),
        require('./routes/Grades')
      ])
    })
  }
}
