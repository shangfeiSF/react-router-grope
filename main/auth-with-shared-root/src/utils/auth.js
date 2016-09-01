var userInfos = [
  {
    email: 'xiaoshao@126.com',
    password: '123'
  },
  {
    email: 'shangfei@126.com',
    password: '456'
  }
]

export default {
  getToken() {
    return localStorage.token
  },

  update() {
  },

  loggedIn() {
    return !!localStorage.token
  },

  login(email, password, callback) {
    var loggedIn = false

    if (localStorage.token) {
      loggedIn = true
    }
    else {
      var exist = userInfos.some(function (info) {
        return info.email === email && info.password === password
      })

      if (exist) {
        localStorage.token = Math.random().toString(36).substring(7)
        loggedIn = true
      }
    }

    callback && callback(loggedIn)

    this.update(loggedIn)
  },

  logout(callback) {
    delete localStorage.token

    callback && callback(false)

    this.update(false)
  }
}