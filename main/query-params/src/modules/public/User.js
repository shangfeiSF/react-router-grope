import React from 'react'

export default ({params: {userName}, location: {query}}) => {
  let age = query && query.age ? query.age : 'closet'

  return (
    <div className="User">
      <h2>User name: {userName}</h2>
      <h2>User age: {age}</h2>
    </div>
  )
}