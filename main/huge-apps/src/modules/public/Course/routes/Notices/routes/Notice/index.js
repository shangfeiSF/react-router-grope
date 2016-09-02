module.exports = {
  path: ':noticeId',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/main'))
    })
  }
}