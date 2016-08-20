import useBasename from 'history/lib/useBasename'

export default function withExampleBasename(history, dirname) {
  var dir = dirname.split('\\').pop()

  return useBasename(() => history)({
    basename: `/${dir}`
  })
}
