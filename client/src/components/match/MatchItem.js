import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import classnames from 'classnames'
import isEmpty from "../../validation/is-empty";

class MatchItem extends Component {
  render() {
      const { match } = this.props;
      console.log(match);
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

export default MatchItem;