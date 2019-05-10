import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Moment from 'react-moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import EventAttendanceList from './EventAttendanceList';
import { Link } from 'react-router-dom';

import { deleteEvent, attendEvent, unattendEvent, getEvent } from '../../actions/eventActions';
import { getProfileByUserId } from '../../actions/profileActions';

class EventItem extends Component {
    constructor(props){
        super(props);
        this.state={
            attendanceList: {}
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        this.props.getProfileByUserId(this.props.auth.user.id);
    }

    onDeleteClick(id){
        this.props.deleteEvent(id);
    }

    onAttendClick(id){
        this.props.attendEvent(id);
    }

    onUnattendClick(id){
        this.props.unattendEvent(id);
    }
    findUserAttend(attends) {
        const { auth } = this.props;
        if(attends.filter(attend => attend.user === auth.user.id).length > 0){
            return true;
        }else{
            return false;
        }
    }
    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
  render() {
    const { event, auth, showActions } = this.props;
    const { profile } = this.props.profile;

    let attendanceStatus = (this.findUserAttend(event.attendees));
    let userPoints = 0;
    
    const isHost = (auth.user.id === event.user._id);
    
    if(profile !== null){
        userPoints = profile.mentorpoints.length;
    }
    
    //if user has enough points or is the host, do not disable the button. otherwise disable it
    let attendable = (userPoints >= event.minpoints || isHost) ? false : true;
    
    return (
      <div className="card card-body mb-3 mt-4">
        <div className="row">
            <div className="col-md-5">
                <img
                    className="rounded-circle d-none d-md-block"
                    src={(event.user.image) ? event.user.image : "https://www.coburgbanks.co.uk/wp-content/uploads/2015/08/linkedin-no-profile-picture-300x333.jpg"}
                    alt=""
                    style={{margin: 'auto', width: '175px', height: '175px'}}
                />
                <br/>
                <p className="host">Host: {event.user.name}</p>
            </div>
            <div className="col-md-7">
                <h2>             
                    {event.event}
                </h2>
                <p className="description">
                    {event.description}
                </p>
                <p className="text-center">
                    <strong>Minimum Points Required:</strong> {event.minpoints}
                </p>
                <p className="text-center"><strong>Date:</strong> <Moment format="MM/DD/YYYY">{event.eventdate}</Moment></p>
                <p className="text-center"><strong>Time: </strong> {event.from} - {event.to}</p>
                <p className="text-center"><strong>Location: </strong>{event.location}</p>
            </div>
        </div>
        <div className="row">
            <div className="eventactions d-block">
                {showActions ? (
                    <span>
                        <Button 
                            onClick={(attendanceStatus) ? this.onUnattendClick.bind(this, event._id) : this.onAttendClick.bind(this, event._id)}
                            type="button"
                            color="primary"
                            disabled={attendable}
                            className={classnames("btn-sm m-1", {
                            'btn-danger': attendanceStatus
                        })} >
                            {attendanceStatus ? "Unattend" : "Attend"}
                        </Button>
                    </span>
                ) : null}
                
                <Button onClick={this.toggle} className="btn-sm m-1" color="primary">
                    View Attendance <span className="badge">({event.attendees.length})</span>
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader>
                            Going
                        </ModalHeader>
                        <ModalBody>
                            <EventAttendanceList eventId={event._id} attendees={event.attendees} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                </Modal>
                
                {(event.user._id === auth.user.id) ? (
                <Link to={`/edit-event/${event._id}`} className="btn btn-primary btn-sm m-1">Edit Event</Link>) : null}
                
                {/* Delete Event Button */}
                {(event.user._id === auth.user.id) ? (
                <button onClick={this.onDeleteClick.bind(this, event._id)} className="btn btn-danger btn-sm" type="button">
                    <i className="fas fa-times" />
                </button>) : null}
            </div>
        </div>
        {(attendable) ? <p className="alert">* You do not have enough points to attend this event</p> : ""}
      </div>
    )
  }
}

EventItem.defaultProps = {
    showActions: true
};

EventItem.propTypes = {
    getEvent: PropTypes.func.isRequired,
    attendEvent: PropTypes.func.isRequired,
    unattendEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    getProfileByUserId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { deleteEvent, attendEvent, unattendEvent, getEvent, getProfileByUserId })(EventItem);