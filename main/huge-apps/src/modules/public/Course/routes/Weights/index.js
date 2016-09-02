module.exports = {
  path: 'weights',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/main'))
    })
  }
}