module.exports = {
  path: 'announcements',

  // getComponents with namespace like sidebar and main
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        sidebar: require('./modules/Sidebar'),
        main: require('./modules/Announcements')
      })
    })
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Announcement')
      ])
    })
  }
}
