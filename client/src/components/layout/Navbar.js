import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import logo from '../../img/logo-white.png';

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.clearCurrentProfile()
    this.props.logoutUser();
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    
    const authLinks =(
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/feed'>
              Home
            </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/profiles">Developers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/matches/${user.id}`}>
              Recommended Users
            </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/events">Company Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/dashboard'>
              Profile
            </Link>
          </li>
          <li className="nav-item">
              <a 
                href="" 
                onClick={this.onLogoutClick.bind(this)} 
                className="nav-link"
                rel="noopener noreferrer"
              >
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
      <nav className="navbar navbar-expand-sm sticky-top">
          <Link className="navbar-brand" to="/feed">
            <img src={logo} alt="logo" className="mc-logo"/>
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
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);