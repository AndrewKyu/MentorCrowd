import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import logo from '../../img/logo-white.png';
import classnames from 'classnames';

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.clearCurrentProfile()
    this.props.logoutUser();
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;

    const authLinks =(
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/feed'>
              Home
            </Link>
          </li>
          <li className="nav-item">
              {/* <Link className="nav-link" to="/profiles">Developers</Link> */}
              <Link className={classnames('nav-link', {'d-none' : (profile === null || Object.keys(profile).length === 0)})} to="/profiles">Developers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/matches/${user.id}`}>
              Recommended
            </Link>
          </li>
          <li className="nav-item">
              <Link className={classnames('nav-link', {'d-none' : (profile === null || Object.keys(profile).length === 0)})} to="/events">Events</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/dashboard'>
              Profile
            </Link>
          </li>
          <li className="nav-item">
              <a 
                href="#" 
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
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md sticky-top">
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);