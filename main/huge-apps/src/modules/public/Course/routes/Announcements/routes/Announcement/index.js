module.exports = {
  path: ':announcementId',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./modules/Announcement'))
    })
  }
}