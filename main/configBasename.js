import useBasename from 'history/lib/useBasename'

const configBasename = function (browserHistory, dirname) {
  console.log(dirname);
  let dir = dirname.split(dirname.indexOf('\\') > -1 ? '\\' : '/')[1]

  let basename = `/main/${dir}`

  return useBasename(() => browserHistory)({
    basename: basename
  })
}

export default configBasename
