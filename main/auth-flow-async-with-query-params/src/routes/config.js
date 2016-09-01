import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../modules/App'
import Form from '../modules/Form'
import Page from '../modules/Page'
import ErrorPage from '../modules/ErrorPage'

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