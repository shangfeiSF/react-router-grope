import auth from './auth'

export default {
  login(nextState, replace) {
    if (!auth.loggedIn()) {
      replace({
        pathname: '/login',
        state: {_next: nextState.location.pathname}
      })
    }
  },

  dashboard(nextState, replace){
    if (auth.loggedIn()) {
      replace('/')
    }
  }
}