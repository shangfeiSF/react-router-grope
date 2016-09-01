import auth from './auth'

export default {
  needLogin(nextState, replace) {
    if (!auth.loggedIn()) {
      replace({
        pathname: '/public/login',
        state: {_next: nextState.location.pathname}
      })
    }
  },

  toHome(nextState, replace){
    if (auth.loggedIn()) {
      replace('/')
    }
  }
}