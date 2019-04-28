import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class EventAttendanceItem extends Component {
  render() {
      const { attendee } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
            <div className="col-md-5">
                <img 
                    className="rounded-circle d-none d-md-block"
                    src={attendee.image ? attendee.image : 'https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg'}
                    style={{width: '150px', height: '150px'}}
                    alt=""
                 />
            </div>
            <div className="col-md-7">
                <h5>{attendee.name}</h5>
                <Link className="btn btn-info" to={`/profile/user/${attendee.user}`}>
                    View Profile
                </Link>
            </div>
        </div>
      </div>
    )
  }
}

EventAttendanceItem.propTypes = {
    attendee: PropTypes.object.isRequired,
    eventId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(EventAttendanceItem);