import React from 'react'
import {findDOMNode} from 'react-dom'
import {Link, withRouter} from 'react-router'

import store from '../../utils/store'

export default withRouter(
  React.createClass({
    handlerOnSubmit(e) {
      e.preventDefault()

      /* use refs only or wrapped by findDOMNode*/
      store.add(
        {
          first: this.refs.first.value,
          last: findDOMNode(this.refs.last).value
        },
        (contact) => {
          this.props.router.push(`/contact/${contact.id}`)
        })
    },

    render() {
      return (
        <form onSubmit={this.handlerOnSubmit}>
          <p>
            <input type="text" ref="first" placeholder="First name"/>
          </p>
          <p>
            <input type="text" ref="last" placeholder="Last name"/>
          </p>
          <p>
            <button type="submit">Save</button>
          </p>
          <p>
            <Link to="/">Cancel</Link>
          </p>
        </form>
      )
    }
  })
)