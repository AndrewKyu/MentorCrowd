import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm">
          <Link className="navbar-brand" to="/">
            <img src="https://via.placeholder.com/40x40" alt="logo"/>
          </Link>
          <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/companies">Sponsors</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/contact">Contact</Link>
                  </li>
              </ul>
          </div>
      </nav>
    )
  }
}

export default Navbar;