import React from 'react'

import store from '../../utils/store'

const style = {
  height: '80%'
}

export default React.createClass({
  render() {
    let id = this.props.params.id
    let src = store[id].src

    return (
      <div className="picture">
        <img src={src} style={style}/>
      </div>
    )
  }
})