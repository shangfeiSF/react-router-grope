import React from 'react'
import {Link} from 'react-router'

import store from '../../utils/store'

const style = {
  margin: 10,
  height: 100,
  width: 100
}

export default React.createClass({
  render() {
    return (
      <div>
        <h3>Use modal to render a route</h3>
        <ul>
          <li>The url `/pictures/:id` can be rendered anywhere in the app as a modal.</li>
          <li>Simply put `modal: true` in the location descriptor of the `to` prop.</li>
        </ul>

        <h3>Try to do as follow</h3>
        <ol>
          <li>Click on an item and see its rendered as a modal.</li>
          <li>Then copy/paste the url into a different browser window (with a different session, like Chrome -> Firefox).</li>
          <li>See that the image does not render inside the overlay.</li>
          <li>One URL, two session dependent screens.</li>
        </ol>

        <div>
          {
            store.map(picture => {
                let to = {
                  pathname: `/pictures/${picture.id}`,
                  state: {
                    modal: true,
                    returnTo: this.props.location.pathname
                  }
                }
              
                return (
                  <Link key={picture.id} to={to}>
                    <img style={style} src={picture.src}/>
                  </Link>
                )
              }
            )
          }
        </div>

        <h3>Try to link picture in some deep route</h3>
        <p>
          <Link to="/some/hello/deep/world/route">Go to some deep route with params included hello and world</Link>
        </p>
      </div>
    )
  }
})