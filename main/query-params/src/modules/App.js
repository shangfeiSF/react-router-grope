import React from 'react'
import {Link} from 'react-router'

import store from '../utils/store'

export default React.createClass({
  render() {
    let links = store.map((user, index) => {
      let isAgeCloset = user.isAgeCloset

      let key = `user-${index}`

      let to = isAgeCloset ? `/user/${user.name}` : {
        pathname: `/user/${user.name}`,
        query: {
          age: user.age
        }
      }

      let text = isAgeCloset ? `${user.name} which age is closet` : `${user.name} which age is public`

      return <li key={key}><Link to={to} activeClassName="active">{text}</Link></li>
    })

    return (
      <div>
        <ul>
          {links}
        </ul>
        {this.props.children}
      </div>
    )
  }
})