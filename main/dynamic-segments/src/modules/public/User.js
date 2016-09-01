import React from 'react'
import {Link} from 'react-router'

export default ({children, params: {userID}}) => (
  <div className="User">
    <h1>User id: {userID}</h1>
    <ul>
      <li><Link to={`/user/${userID}/tasks/foo`} activeClassName="active">foo task</Link></li>
      <li><Link to={`/user/${userID}/tasks/bar`} activeClassName="active">bar task</Link></li>
    </ul>
    {children}
  </div>
)