import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from 'react-router-dom';
// import { getConnections }from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//a ref file
class ProfileHeader extends Component {
  componentDidMount(){
    // profile.user._id
    // this.props.getConnections(this.props.profile.user._id);
  }
  render() {
    const { profile } = this.props;
    // console.log(this.props);
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3 mt-4">
            <div className="row">
              <div className="m-auto">
                <img
                  className="rounded-circle"
                  src={(profile.user.image) ? profile.user.image : 'https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg'}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center text-white">{profile.user.name}</h1>
              <p className="lead text-center text-white">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p className="text-white">{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
              <p className="text-white">
                  <strong>Up Votes: {profile.mentorpoints.length}</strong>
              </p>
              <p className="text-white">
                  {/* <Link to={`/connections/${profile.user._id}`} className="text-white">View {profile.user.name}'s Connections</Link> */}
                  <Link to={{
                    pathname:`/connections/${profile.user._id}`,
                    query:{profile: profile}
                  }}>View {profile.user.name}'s Connections</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  // getConnections: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  // auth: state.auth
})

export default ProfileHeader;
