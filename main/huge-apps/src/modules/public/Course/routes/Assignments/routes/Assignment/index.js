module.exports = {
  path: ':assignmentId',
  
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/Assignment'))
    })
  }
}
