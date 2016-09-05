import IO from './io'

class Store extends IO {
  constructor() {
    // super must be used before this
    super()
    this.inited = false

    this.dataMap = {}
    this.listeners = []

    localStorage.token = localStorage.token || (Date.now() * Math.random())
  }

  init() {
    if (!this.inited) {
      this.inited = true

      this.getJSON(this.remote(), (error, data) => {
        data.contacts.forEach((contact) => {
          this.dataMap[contact.id] = contact
        })

        this.notify()
      })
    }
  }

  add(contact, callback) {
    this.postJSON(this.remote(), {
      contact: contact
    }, (res) => {
      this.dataMap[res.contact.id] = res.contact

      this.notify()

      callback && callback(res.contact)
    })
  }

  remove(id, callback) {
    this.deleteJSON(this.remote() + '/' + id, callback)

    delete this.dataMap[id]

    this.notify()
  }

  getAll() {
    const array = []

    for (const id in this.dataMap) {
      array.push(this.dataMap[id])
    }

    return array
  }

  get(id) {
    return this.dataMap[id]
  }

  notify() {
    this.listeners.forEach(
      listener => listener()
    )
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  removeListener(listener) {
    this.listeners = this.listeners.filter(function (li) {
      return listener !== li
    })
  }
}

module.exports = new Store()