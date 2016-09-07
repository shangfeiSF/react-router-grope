import React from 'react'

import data from '../../utils/store'

export default ({children, params}) => {
  const category = data.lookupCategory(params.category)

  return (
    <div>
      <h1>{category.name}</h1>
      {
        children || (<p>{category.description}</p>)
      }
    </div>
  )
}