import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class SelfProfile extends Component {
  render() {
    const { profile } = this.props;
    // console.log(profile.user);
    return (
        <Link className="nav-link" to={`/profile/${handle}`}>
            <img
            className="rounded-circle"
            src={(user.image) ? user.image : 'https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg'}
            alt={user.name}
            style={{width: '25px', marginRight: '5px'}}
            title="Please upload profile picture"
            />
        </Link>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default SelfProfile;
