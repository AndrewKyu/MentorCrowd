import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEvents } from '../../actions/eventActions';
import { getCurrentProfile } from '../../actions/profileActions';
import EventFeed from './EventFeed';
import EventForm from './EventForm';

import Spinner from '../common/Spinner';

class Events extends Component {
    componentDidMount(){
        this.props.getEvents();
        this.props.getCurrentProfile();
    }

  render() {
    const { events, loading } = this.props.event;
    let eventContent;
    
    if(events === null || loading){
        eventContent = <Spinner />
    }else{
        eventContent = <EventFeed events={events} />
    }
    
    return (
      <div className="events">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <button type="button" className="btn btn-primary mt-3 mb-3" data-toggle="modal" data-target="#form">
                        Create Event
                    </button>
                    {eventContent}
                    <div className="modal fade" id="form" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Create Event</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <EventForm />
                                </div>
                                
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

Events.propTypes = {
    event: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    event: state.event,
    profile: state.profile
})

export default connect(mapStateToProps, { getEvents, getCurrentProfile })(Events);