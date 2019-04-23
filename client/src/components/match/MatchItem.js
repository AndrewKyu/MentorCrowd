import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classnames from 'classnames'
import isEmpty from "../../validation/is-empty";
import { addRating } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MatchItem extends Component {
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
      const { match } = this.props;
    return (
      <div>
        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-3">
                <img
                    src={(match.user.image) ? match.user.image : 'https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg'}
                    alt=""
                    className="rounded-circle"
                    style={{ width: "100%" }}
                />
                </div>
                <div className="col-lg-5 col-md-4 col-8">
                    <h3>{match.user.name}</h3>
                    <p>
                        {match.status}{" "}
                        {isEmpty(match.company) ? null : (
                            <span>at {match.company}</span>
                        )}
                    </p>
                    <Link to={`/profile/${match.handle}`} className="btn btn-info">View Profile</Link>
                    <button
                        onClick={this.onRateClick.bind(this, match._id)}
                        type="button"
                        className="btn btn-light mr-1"
                    >
                        <i
                        className={classnames('fas fa-star', {
                        'text-info': this.findUserRate(match.mentorpoints)
                        })}
                        />
                        <span className="badge badge-light">{match.mentorpoints.length}</span>
                    </button>
                </div>
                <div className="col-md-4 d-none d-md-block">
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {match.skills.slice(0, 4).map((skill, index) => (
                            <li key={index} className="list-group-item">
                            <i className="fa fa-check pr-1" />
                            {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

MatchItem.propTypes = {
    addRating: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addRating })(MatchItem);