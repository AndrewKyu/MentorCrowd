import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getProfileByUserId, getProfileByHandle, getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

import ProfileGithub from "./ProfileGithub";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";

class ProfileById extends Component {
  componentDidMount(){
    if(this.props.match.params.user_id){
      this.props.getProfileByUserId(this.props.match.params.user_id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    let GitHubInfo;

    if(profile === null || loading){
      profileContent = <Spinner />;
    }else{
      if(profile.githubusername){
        GitHubInfo = (
          <ProfileGithub username={profile.githubusername} />
        );
        
        profileContent = (
          <div>
              <div className="row">
                {/* <div className="col-md-6 mb-6">
                  <Link to="/dashboard" className="btn btn-light mb-3 float-left mt-3">
                    Back To Dashboard
                  </Link> 
                </div> */}
                <div className="col-md-6" />
              </div>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds
                education={profile.education}
                experience={profile.experience}
              />
              {GitHubInfo}
          </div>
        );
      }else{
        GitHubInfo = (
          <p>No Github</p>
        );

        profileContent = (
          <div>
              <div className="row">
                <div className="col-md-6 mb-6">
                  {/* <Link to="/profiles" className="btn btn-light mb-3 float-left">
                    Back To Profiles
                  </Link> */}
                </div>
                <div className="col-md-6" />
              </div>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds
                education={profile.education}
                experience={profile.experience}
              />
              {/* <ProfileGithub username={profile.githubusername}/> */}
              {GitHubInfo}
          </div>
        );
      }
    }
    
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileById.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

export default connect(mapStateToProps, { getProfileByUserId, getProfileByHandle, getCurrentProfile })(ProfileById);
