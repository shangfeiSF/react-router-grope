import React from 'react'
import {Link} from 'react-router'

export default ({children}) => (
  <div>
    <ul>
      <li><Link to="/user/123" activeClassName="active">Bob</Link></li>
      <li><Link to="/user/abc" activeClassName="active">Sally</Link></li>
    </ul>
    {children}
  </div>
)