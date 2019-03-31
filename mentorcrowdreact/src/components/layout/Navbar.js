import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
// import profilepic from '../../img/2019-03-31T04:35:20.972ZIMG_5585.JPG'

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <a 
              href="" 
              onClick={this.onLogoutClick.bind(this)} 
              className="nav-link"
            >
              {user.image}
              <img 
                className="rounded-circle"
                // src={profilepic}
                alt={user.name}
                style={{width: '25px', marginRight: '5px'}}
                title="Please upload profile picture"
              />
              Logout
            </a>
        </li>
      </ul>
    );

    const guestLinks = (
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
    );

    return (
      <nav className="navbar navbar-expand-sm">
          <Link className="navbar-brand" to="/">
            <img src="https://via.placeholder.com/40x40" alt="logo"/>
          </Link>
          <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              {isAuthenticated ? authLinks : guestLinks}
          </div>
      </nav>
    )
  }
}

Navbar.propTypes = { 
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);