import React from 'react'
import {Link} from 'react-router'

import Products from './Products'
import Orders from './Orders'

const App = React.createClass({
  render() {
    var {children, routes} = this.props
    const depth = routes.length

    return (
      <div>
        <aside>
          <ul>
            <li><Link to={Products.path}>Products</Link></li>
            <li><Link to={Orders.path}>Orders</Link></li>
          </ul>
        </aside>

        <main>
          <ul className="breadcrumbs-list">
            {
              routes.map((item, index) =>
                <li key={index}>
                  <Link to={item.path || ''} activeClassName="breadcrumb-active" onlyActiveOnIndex={true}>
                    {item.component['breadTitle']}
                  </Link>
                  {(index + 1) < depth && '\/'}
                </li>
              )
            }
          </ul>
          {children}
        </main>
      </div>
    )
  }
})

App.breadTitle = 'Home'
App.path = '/'

export default App