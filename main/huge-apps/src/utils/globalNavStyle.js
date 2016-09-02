const dark = 'hsl(200, 20%, 20%)'
const light = '#fff'

const styles = {
  wrapper: {
    padding: '10px 20px',
    overflow: 'hidden',
    background: dark,
    color: light
  },
  link: {
    padding: 11,
    color: light,
    fontWeight: 200
  }
}

styles.activeLink = {
  ...styles.link,
  background: light,
  color: dark
}

export default styles