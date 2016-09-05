class IO {
  remote() {
    return 'http://addressbook-api.herokuapp.com/contacts'
  }

  getJSON(url, callback) {
    const req = new XMLHttpRequest()

    req.onload = function () {
      if (req.status === 404) {
        callback(new Error('not found'))
      } else {
        callback(null, JSON.parse(req.response))
      }
    }

    req.open('GET', url)

    req.setRequestHeader('authorization', localStorage.token)

    req.send()
  }

  postJSON(url, data, callback) {
    const req = new XMLHttpRequest()

    req.onload = function () {
      callback(JSON.parse(req.response))
    }

    req.open('POST', url)

    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    req.setRequestHeader('authorization', localStorage.token)

    req.send(JSON.stringify(data))
  }

  deleteJSON(url, callback) {
    const req = new XMLHttpRequest()

    req.onload = callback

    req.open('DELETE', url)

    req.setRequestHeader('authorization', localStorage.token)

    req.send()
  }
}

module.exports = IO