import React from 'react'
import {Link} from 'react-router'

import data from '../../utils/store'

export default () => (
  <div>
    <h2>Categories</h2>
    <ul>
      {
        data.getAll().map((category, index) => (
          <li key={index}>
            <Link to={`/category/${category.name}`}>{category.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)