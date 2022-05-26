import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class NavBar extends Component {
  render() {
    return (
      <div style={{ display: 'flex', padding: '0.5' }}>
        {/* in react in line css is passed as an object  */}
        <Link to="/" style={{textDecoration:'none'}}>

        <h1>Movies App</h1>

        </Link>
        <Link to="/fav" style={{textDecoration:'none'}}>

        <h2 style={{ marginLeft: '2rem', marginTop: '1.8rem' }}>Favourites</h2>

        </Link>

      </div>
    )
  }
}

export default NavBar