export default {
  childRoutes: [{
    path: '/',

    component: require('../modules/App'),

    indexRoute: require('../modules/public/Dashboard'),

    childRoutes: [
      require('../modules/public/Calendar'),
      require('../modules/public/Course'),
      require('../modules/public/Grades'),
      require('../modules/public/Messages'),
      require('../modules/public/Profile')
    ]
  }]
}