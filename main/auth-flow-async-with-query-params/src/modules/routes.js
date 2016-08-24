import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './App'
import Form from './Form'
import Page from './Page'
import ErrorPage from './ErrorPage'

function handlerOnEnter(nextState, replace, next) {
  const query = nextState.location.query

  if (query.token) {
    mockServer(query.token).then(
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

function mockServer(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      token === '12345' ? resolve() : reject()
    }, 1000)
  })
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Form}/>
    <Route path="page" component={Page} onEnter={handlerOnEnter}/>
    <Route path="error" component={ErrorPage}/>
  </Route>
)