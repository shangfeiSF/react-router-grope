import auth from './utils/auth'
import redirect from  './utils/redirect'

// require(……).default 的解释
// http://stackoverflow.com/questions/36194806/invariant-violation-the-root-route-must-render-a-single-element-error-in-react
export default {
  component: require('./components/App').default,

  childRoutes: [
    {
      onEnter: redirect.toHome,

      childRoutes: [
        {
          path: '/public/login',

          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./components/public/Login').default)
            })
          }
        }
      ]
    },

    {
      path: '/public/logout',

      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./components/public/Logout').default)
        })
      }
    },

    {
      path: '/',

      getComponent: (nextState, cb) => {
        var loggedIn = auth.loggedIn()

        if (loggedIn) {
          require.ensure([], (require) => {
            cb(null, require('./components/protected/ProtectedHome').default)
          })
        }
        else {
          require.ensure([], (require) => {
            cb(null, require('./components/public/PublicHome').default)
          })
        }
      },

      indexRoute: {
        getComponent: (nextState, cb) => {
          var loggedIn = auth.loggedIn()

          if (loggedIn) {
            require.ensure([], (require) => {
              cb(null, require('./components/protected/Index').default)
            })
          }
          else {
            cb()
          }
        }
      },

      childRoutes: [
        {
          onEnter: redirect.needLogin,

          childRoutes: [
            {
              path: '/protected/about',

              getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                  cb(null, require('./components/protected/ProtectedAbout').default)
                })
              }
            }
          ]
        }
      ]
    },

    {
      path: '/public/about',

      getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./components/public/PublicAbout').default)
        })
      }
    },

    {
      onEnter: redirect.needLogin,

      childRoutes: [
        {
          path: 'protected/user/:id',

          getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require('./components/protected/User').default)
            })
          }
        }
      ]
    }
  ]
}