import React from 'react'
import {Link, IndexLink} from 'react-router'

const activeStyle = {color: 'red'}

export default ({children}) =>(
  <div>
    <h2>APP Links</h2>
    <ul>
      <li>
        <Link to="/" activeStyle={activeStyle}>/</Link>
      </li>
      <li>
        <Link to="/about" activeStyle={activeStyle}>/about</Link>
      </li>
      <li>
        <Link to="/users" activeStyle={activeStyle}>/users</Link>
      </li>
      <li>
        <Link to="/users/react" activeStyle={activeStyle}>/users/react</Link>
      </li>
      <li>
        <Link to={{ pathname: '/users/react-router', query: {id: '100'} }} activeStyle={activeStyle}>/users/react-router?id=100</Link>
      </li>
    </ul>

    <h2>APP Links Compare with IndexLink</h2>
    <ul>
      <li>
        <IndexLink to="/" activeStyle={activeStyle}>/</IndexLink>
      </li>
      <li>
        <IndexLink to="/users" activeStyle={activeStyle}>/users</IndexLink>
      </li>
    </ul>

    <h2>APP Pages</h2>
    {children}
  </div>
)