class IO {
  constructor(data) {
    this.data = data
    this.MAP = data.reduce(function (map, category) {
      category.itemsMap = category.items.reduce(function (itemsMap, item) {
        itemsMap[item.name] = item
        return itemsMap
      }, {})

      map[category.name] = category

      return map
    }, {})
  }

  getAll() {
    return this.data
  }

  lookupCategory(name) {
    return this.MAP[name]
  }

  lookupItem(category, item) {
    return this.MAP[category].itemsMap[item]
  }
}

module.exports = IO