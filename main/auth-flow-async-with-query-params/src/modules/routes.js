import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './App'
import Form from './Form'
import Page from './Page'
import ErrorPage from './ErrorPage'

function handlerOnEnter(nextState, replace, next) {
  const query = nextState.location.query

  if (query.qsparam) {
    serverAuth(query.qsparam).then(
      () => next(),
      () => {
        replace('/error')
        next()
      }
    )
  }
  else {
    replace('/error')
    next()
  }
}

function serverAuth(authToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (authToken === 'pancakes') {
        resolve('authenticated')
      } else {
        reject('nope')
      }
    }, 200)
  })
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Form}/>
    <Route path="page" component={Page} onEnter={handlerOnEnter}/>
    <Route path="error" component={ErrorPage}/>
  </Route>
)