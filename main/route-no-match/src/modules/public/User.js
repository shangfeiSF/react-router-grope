import React from 'react'

class User extends React.Component {
  render() {
    let {userName} = this.props.params
    let {query} = this.props.location

    let age = query && query.age ? query.age : 'closet'

    return (
      <div className="User">
        <h2>User name: {userName}</h2>
        <h2>User age: {age}</h2>
      </div>
    )
  }
}

export default User