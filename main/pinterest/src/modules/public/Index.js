import React from 'react'
import {Link} from 'react-router'

import store from '../../utils/store'

export default React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li>The url `/pictures/:id` can be rendered anywhere in the app as a modal.</li>
          <li>Simply put `modal: true` in the location descriptor of the `to` prop.</li>
        </ul>

        <p>
          Click on an item and see its rendered as a modal, then copy/paste the
          url into a different browser window (with a different session, like
          Chrome -> Firefox), and see that the image does not render inside the
          overlay. One URL, two session dependent screens :D
        </p>

        <div>
          {
            store.map(picture => (
              <Link
                key={picture.id}
                to={{
                pathname: `/pictures/${picture.id}`,
                state: { modal: true, returnTo: this.props.location.pathname }
              }}
              >
                <img style={{ margin: 10 }} src={picture.src} height="100"/>
              </Link>
            ))
          }
        </div>

        <p>
          <Link to="/some/123/deep/456/route">Go to some deep route</Link>
        </p>
      </div>
    )
  }
})