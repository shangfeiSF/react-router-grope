import useBasename from 'history/lib/useBasename'

export default function withExampleBasename(history, dirname) {
  let basename = `/main/${dirname}`
  return useBasename(() => history)({
    basename: basename
  })
}
