const API = 'http://addressbook-api.herokuapp.com/contacts'
let inited = false

let localStore = {}
let listeners = []

localStorage.token = localStorage.token || (Date.now() * Math.random())

function getJSON(url, callback) {
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

function postJSON(url, data, callback) {
  const req = new XMLHttpRequest()

  req.onload = function () {
    callback(JSON.parse(req.response))
  }

  req.open('POST', url)

  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  req.setRequestHeader('authorization', localStorage.token)

  req.send(JSON.stringify(data))
}

function deleteJSON(url, callback) {
  const req = new XMLHttpRequest()

  req.onload = callback

  req.open('DELETE', url)

  req.setRequestHeader('authorization', localStorage.token)

  req.send()
}

const ContactStore = {
  init: function () {
    if (!inited) {
      inited = true

      getJSON(API, function (error, data) {
        data.contacts.forEach(function (contact) {
          localStore[contact.id] = contact
        })

        ContactStore.notify()
      })
    }
  },

  add: function (contact, callback) {
    postJSON(API, {
      contact: contact
    }, function (res) {
      localStore[res.contact.id] = res.contact

      ContactStore.notify()

      callback && callback(res.contact)
    })
  },

  remove: function (id, callback) {
    deleteJSON(API + '/' + id, callback)

    delete localStore[id]

    ContactStore.notify()
  },

  getAll: function () {
    const array = []

    for (const id in localStore) {
      array.push(localStore[id])
    }

    return array
  },

  get: function (id) {
    return localStore[id]
  },

  notify: function () {
    listeners.forEach(
      listener => listener()
    )
  },

  addListener: function (listener) {
    listeners.push(listener)
  },

  removeListener: function (listener) {
    listeners = listeners.filter(function (li) {
      return listener !== li
    })
  }
}

module.exports = ContactStore