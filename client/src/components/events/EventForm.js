import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { addEvent, clearErrors } from '../../actions/eventActions';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state={
            event: '',
            description: '',
            from: '',
            to: '',
            eventdate: '',
            minpoints: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(e){
        e.preventDefault();
        const eventData = {
            event: this.state.event,
            description: this.state.description,
            eventdate: this.state.eventdate,
            from: this.state.from,
            to: this.state.to,
            minpoints: this.state.minpoints
        }
    
        this.props.addEvent(eventData, this.props.toggle);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        
        return (
            <div className="eventform">
                <ModalHeader>Create Event</ModalHeader>
                <form onSubmit={this.onSubmit}>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <p className="lead text-center">
                                        Please fill out some information to create your event
                                    </p>
                                    <small className="d-block pb-3">* = Required Fields</small>
                                        <TextFieldGroup 
                                            placeholder="* Name of Event"
                                            name="event"
                                            value={this.state.event}
                                            onChange={this.onChange}
                                            info="Give us a descriptive, yet creative name for your event"
                                            error={errors.event}
                                        />
                                        <TextAreaFieldGroup 
                                            placeholder="* Description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                            info="Describe how amazing your event is"
                                            error={errors.description}
                                        />
                                        <h6>* Event Date</h6>
                                        <TextFieldGroup 
                                            name="eventdate"
                                            type="date"
                                            value={this.state.eventdate}
                                            onChange={this.onChange}
                                            error={errors.eventdate}
                                        />
                                        <h6>* Start Time</h6>
                                        <TextFieldGroup 
                                            name="from"
                                            type="time"
                                            value={this.state.from}
                                            onChange={this.onChange}
                                            error={errors.from}
                                        />
                                        <h6>* End Time</h6>
                                        <TextFieldGroup 
                                            name="to"
                                            type="time"
                                            value={this.state.to}
                                            onChange={this.onChange}
                                            error={errors.to}
                                        />
                                        <TextFieldGroup 
                                            placeholder="Minimum Points to Attend"
                                            name="minpoints"
                                            value={this.state.minpoints}
                                            onChange={this.onChange}
                                            info="What's the minimum amount of points required to attend this event?"
                                        />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                        <Button color="info" type="submit">Submit</Button>
                    </ModalFooter>
                </form>
            </div>
            
        )
    }
}

EventForm.propTypes = {
    toggle: PropTypes.func,
    addEvent: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addEvent, clearErrors })(EventForm);