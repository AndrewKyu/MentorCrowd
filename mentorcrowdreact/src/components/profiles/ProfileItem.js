import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile.user);
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-3">
            <img
                src={(profile.user.image) ? profile.user.image : 'https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg'}
                alt=""
                className="rounded-circle"
                style={{ width: "100%" }}
            />
          </div>
          <div className="col-lg-5 col-md-4 col-8">
            {/* <h3>{profile.user.name}</h3> */}
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
