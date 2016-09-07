import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import Item from '../modules/public/Item'
import Category from '../modules/public/Category'
import CategorySidebar from '../modules/public/CategorySidebar'

let components = {
  content: Category,
  sidebar: CategorySidebar
}

export default (
  <Route path="/" component={App}>
    <Route path="category/:category" components={components}>
      <Route path=":item" component={Item}/>
    </Route>
  </Route>
)