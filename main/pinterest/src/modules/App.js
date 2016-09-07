import React from 'react'

import Modal from './public/Modal'

export default React.createClass({
  CACHE: null,

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.key !== this.props.location.key && // if we changed the routes
      nextProps.location.state && nextProps.location.state.modal // if we also declare to use modal to render the route
    ) {
      this.CACHE = this.props.children  // then we save the current children in CACHE for this rendering
    }
  },

  render() {
    let {location} = this.props

    let isModal = location.state && location.state.modal && this.CACHE

    return (
      <div>
        <h2>Pinterest Style Routes</h2>

        <div>
          {
            isModal ? this.CACHE : this.props.children
          }

          {
            isModal && (
              <Modal returnTo={location.state.returnTo}>
                {this.props.children}
              </Modal>
            )
          }
        </div>
      </div>
    )
  }
})