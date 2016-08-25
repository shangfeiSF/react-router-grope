import React from 'react'

const Products = React.createClass({
  render() {
    return (
      <div className="Page">
        <h2>Products Page</h2>
      </div>
    )
  }
})

Products.title = 'Products'
Products.path = '/products'

export default Products