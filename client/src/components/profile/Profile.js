import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileContact from './ProfileContact';
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import { getConnections } from '../../actions/authActions';

class Profile extends Component {
  componentDidMount() {
    // console.log(this.props.profile.profile);
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  //grab self profile
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    let GitHubInfo;
    // console.log(profile.user)
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if(profile.githubusername){
        GitHubInfo = (
          <ProfileGithub username={profile.githubusername}/>
        );
      }else{
        GitHubInfo = (
          <p>No Github</p>
        )
      }
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left mt-3">
                Back To Profiles
              </Link>
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
          <br />
          <h1>Want to contact {profile.user.name}?</h1>
          <ProfileContact profile={profile}/>
        </div>
      );
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

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getConnections: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getConnections }
)(Profile);