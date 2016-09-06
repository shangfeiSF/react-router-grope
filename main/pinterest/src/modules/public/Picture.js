import React from 'react'

import store from '../../utils/store'

export default React.createClass({
  render() {
    return (
      <div>
        <img src={store[this.props.params.id].src} style={{ height: '80%' }}/>
      </div>
    )
  }
})