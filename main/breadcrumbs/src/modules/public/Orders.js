import React from 'react'

const Orders = React.createClass({
  render() {
    return (
      <div className="Page">
        <h2>Orders Page</h2>
      </div>
    )
  }
})

Orders.breadTitle = 'Orders'
Orders.path = '/orders'

export default Orders