import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Button, Modal } from 'reactstrap';

import { getEvents } from '../../actions/eventActions';
import { getCurrentProfile } from '../../actions/profileActions';
import EventFeed from './EventFeed';
import EventForm from './EventForm';

import Spinner from '../common/Spinner';

class Events extends Component {
    constructor(props){
        super(props);
        this.state={
            fromForm: {}
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        this.props.getEvents();
        this.props.getCurrentProfile();
    }
    
    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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
                    <Button color="primary" onClick={this.toggle} className="mt-3">Create Event</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <EventForm toggle={this.toggle}/>
                    </Modal>
                    {eventContent}
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
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    event: state.event,
    profile: state.profile
})

export default connect(mapStateToProps, { getEvents, getCurrentProfile })(Events);