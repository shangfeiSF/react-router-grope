import React, {Component} from 'react'
import {Link} from 'react-router'

const styles = {
  nav: {
    borderBottom: '1px solid #aaa'
  },

  link: {
    display: 'inline-block',
    padding: 10,
    textDecoration: 'none'
  },

  activeLink: {
    display: 'inline-block',
    padding: 10,
    textDecoration: 'none',
    color: 'red'
  }
}

class Nav extends Component {
  render() {
    const {course} = this.props
    const pages = [{
      key: 'notices',
      name: 'Notices'
    }, {
      key: 'lessons',
      name: 'Lessons'
    }, {
      key: 'weights',
      name: 'Weights'
    }]

    const nav = styles.nav
    const link = styles.link
    const activeLink = styles.activeLink

    return (
      <nav style={nav}>
        {
          pages.map((page, index) => (
            <Link
              key={page.key}
              activeStyle={index === 0 ? { ...activeLink, paddingLeft: 0 } : activeLink}
              style={index === 0 ? { ...link, paddingLeft: 0 } : link}
              to={`/course/${course.id}/${page.key}`}
            >
              {page.name}
            </Link>
          ))
        }
      </nav>
    )
  }
}

export default Nav