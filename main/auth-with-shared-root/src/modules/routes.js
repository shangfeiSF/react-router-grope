import auth from './utils/auth'
import redirect from  './utils/redirect'

export default {
  component: require('./components/App').default,

  childRoutes: [
    {
      path: '/logout',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./components/Logout').default)
        })
      }
    },

    {
      path: '/about',
      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./components/About').default)
        })
      }
    },

    {
      path: '/',
      getComponent: (nextState, cb) => {
        if (auth.loggedIn()) {
          return require.ensure([], (require) => {
            cb(null, require('./components/Dashboard').default)
          })
        }
        return require.ensure([], (require) => {
          cb(null, require('./components/Landing').default)
        })
      },
      indexRoute: {
        getComponent: (nextState, cb) => {
          if (auth.loggedIn()) {
            return require.ensure([], (require) => {
              cb(null, require('./components/PageOne').default)
            })
          }
          return cb()
        }
      },
      childRoutes: [
        {
          onEnter: redirect.login,
          childRoutes: [
            {
              path: '/page2',
              getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                  cb(null, require('./components/PageTwo').default)
                })
              }
            }
          ]
        }
      ]
    },

    {
      onEnter: redirect.dashboard,
      childRoutes: [
        {
          path: '/login',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./components/Login').default)
            })
          }
        }
      ]
    },

    {
      onEnter: redirect.login,
      childRoutes: [
        {
          path: '/user/:id',
          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./components/User').default)
            })
          }
        }
      ]
    }
  ]
}