module.exports = {
  path: ':lessonId',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/main'))
    })
  }
}
