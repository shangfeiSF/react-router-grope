import React from 'react'
import {withRouter} from 'react-router'

import store from '../../utils/store'

export default withRouter(
  React.createClass({
    _get(props) {
      const {id} = props ? props.params : this.props.params

      return {
        contact: store.get(id)
      }
    },

    _update() {
      this.setState(this._get())
    },

    getInitialState() {
      return this._get()
    },

    componentDidMount() {
      store.addListener(this._update)
    },
    
    componentWillReceiveProps(nextProps) {
      this.setState(this._get(nextProps))
    },

    componentWillUnmount() {
      store.removeListener(this._update)
    },

    handlerOnClick() {
      const {id} = this.props.params
      store.remove(id)
      this.props.router.push('/')
    },

    render() {
      const contact = this.state.contact || {}
      const name = contact.first + ' ' + contact.last
      const avatar = contact.avatar || 'http://placecage.com/50/50'

      return (
        <div className="Contact">
          <img width="50" height="50" src={avatar} key={avatar}/>
          <h3>{name}</h3>
          <button onClick={this.handlerOnClick}>Delete</button>
        </div>
      )
    }
  })
)