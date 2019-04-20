import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
import Moment from 'react-moment';
// import { Link } from 'react-router-dom';

import { deleteEvent } from '../../actions/eventActions';

class EventItem extends Component {
  render() {
    const { event, auth, showActions } = this.props;
    console.log(this.props);
    return (
      <div className="card card-body mb-3 mt-4">
        <div className="row">
            <div className="col-md-5">
                <img
                    className="rounded-circle d-none d-md-block"
                    src={"https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg"}
                    alt=""
                    style={{margin: 'auto', width: '200px', height: '200px'}}
                />
            </div>
            <div className="col-md-7">
                <h2 className="text-center">             
                    {event.event}
                </h2>
                <p className="text-center">
                    {event.description}
                </p>
                <br />
                <p className="text-center"><b>Date: <Moment format="MM/DD/YYYY">{event.eventdate}</Moment></b></p>
                <p className="text-center"><b>From: {event.from} | To: {event.to}</b></p>
            </div>
        </div>
        <div className="row">
            <div className="eventactions d-block m-auto">
                <button className="btn btn-primary btn-sm m-1">
                        Attend
                </button>
                <button type="button" className="btn btn-primary btn-sm m-1" data-toggle="modal" data-target="#exampleModal">
                    View Attendance
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Going</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

EventItem.defaultProps = {
    showActions: true
};

EventItem.propTypes = {
    deleteEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteEvent })(EventItem);