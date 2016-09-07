import React from 'react'
import {Link} from 'react-router'

import data from '../../utils/store'

export default ({params}) => {
  const category = data.lookupCategory(params.category)

  return (
    <div>
      <Link to="/">◀Back</Link>
      <h2>{category.name} Items</h2>
      <ul>
        {
          category.items.map((item, index) => (
            <li key={index}>
              <Link to={`/category/${category.name}/${item.name}`}>
                {item.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}