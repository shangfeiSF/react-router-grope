export default {
  childRoutes: [{
    path: '/',

    component: require('../modules/App'),

    indexRoute: require('../modules/public/HomeIndex'),

    childRoutes: [
      require('../modules/public/About'),
      require('../modules/public/Course'),
      require('../modules/public/Grades'),
      require('../modules/public/Notices'),
      require('../modules/public/Profile')
    ]
  }]
}