module.exports = {
  path: 'notices',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/main'))
    })
  }
}