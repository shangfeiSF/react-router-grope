import React from 'react'
import {Link, IndexLink} from 'react-router'

export default ({children}) => (
  <div>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    <h2>Users List</h2>
    <ul>
      <li><Link to="/user/12345" activeClassName="active">Bob(id:12345)</Link></li>
      <li><Link to="/user/abcde" activeClassName="active">Sally(id:abcde)</Link></li>
    </ul>
    {children}
  </div>
)