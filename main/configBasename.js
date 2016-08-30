import useBasename from 'history/lib/useBasename'

const configBasename = function (browserHistory, dirname) {
  let dir = dirname.split('\\')[1]
  let basename = `/main/${dir}`
  
  return useBasename(() => browserHistory)({
    basename: basename
  })
}

export default configBasename
