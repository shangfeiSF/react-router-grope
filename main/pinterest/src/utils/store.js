const API = 'http://placekitten.com'
const sizes = ['200', '250', '300']

export default sizes.map((size, index) => {
  return {
    id: index,
    src: `${API}/${size}/${size}`
  }
})