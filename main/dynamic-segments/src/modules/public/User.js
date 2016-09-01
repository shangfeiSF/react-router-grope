import React from 'react'
import {Link} from 'react-router'

export default ({
  children,
  params: {userID}
}) => (
  <div className="User">
    <h1>User id: {userID}</h1>
    <h2>Tasks Links</h2>
    <ul>
      <li><Link to={`/user/${userID}/tasks/hello`} activeClassName="active">tasks/hello</Link></li>
      <li><Link to={`/user/${userID}/tasks/react-router`} activeClassName="active">tasks/react-router</Link></li>
    </ul>
    <h2>Todos Links</h2>
    <ul>
      <li><Link to={`/user/${userID}/todos/hello`} activeClassName="active">todos/hello</Link></li>
      <li><Link to={`/user/${userID}/todos/react-router`} activeClassName="active">todos/react-router</Link></li>
    </ul>
    {children}
  </div>
)