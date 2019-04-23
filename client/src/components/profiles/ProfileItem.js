import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addRating } from '../../actions/profileActions';

class ProfileItem extends Component {
  onRateClick(id){
    this.props.addRating(id);
  }
  findUserRate(rates){
    const { auth } = this.props;
    if(rates.filter(rate => rate.user === auth.user.id).length > 0){
      return true;
    }else{
      return false;
    }
  }
  render() {
    const { profile } = this.props;
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
            <h3>{profile.user.name}</h3>
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
            <Link to={`/profile/${profile.handle}`} className="btn btn-info m-1">
              View Profile
            </Link>
            {/* <Link to='/' className="btn btn-info m-1">Message</Link> */}
            <a href={`mailto:${profile.user.email}` } className="btn btn-info mr-1">Email</a>
            <button
                  onClick={this.onRateClick.bind(this, profile._id)}
                  type="button"
                  className="btn btn-light mr-1"
            >
              <i
                className={classnames('fas fa-star', {
                  'text-info': this.findUserRate(profile.mentorpoints)
                })}
              />
                <span className="badge badge-light">{profile.mentorpoints.length}</span>
            </button>
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addRating: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addRating })(ProfileItem);
// {classnames('fas fa-thumbs-up', {
//   'text-info': this.findUserLike(profile.mentorpoints)
// })}