import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class ProfileActions extends Component {
  render(){
    const { profile } = this.props;
    
    return (
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie mr-1" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap mr-1" />
          Add Education
        </Link>
        <Link to={`/profile/${profile.handle}`} className="btn btn-light">
          {/* <i className="fas fa-graduation-cap mr-1" /> */}
          <img
              className="rounded-circle d-none d-md-block"
              src={profile.user.image}
              alt=""
              style={{width: '20px', height:'20px', float: 'left'}}
            />
          View Profile
        </Link>
      </div>
    );
  }
  
};


ProfileActions.propTypes = {
  profile: PropTypes.object.isRequired
}
export default ProfileActions;