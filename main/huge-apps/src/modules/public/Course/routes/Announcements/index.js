module.exports = {
  path: 'announcements',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Announcement')
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        sidebar: require('./modules/Sidebar'),
        main: require('./modules/Announcements')
      })
    })
  }
}
