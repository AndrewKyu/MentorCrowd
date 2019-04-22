import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEvent, clearErrors, getEvent, updateEvent } from '../../actions/eventActions';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import isEmpty from '../../validation/is-empty';

class EventForm extends Component {
    constructor(props){
        super(props);
        this.state={
            event: '',
            description: '',
            location: '',
            from: '',
            to: '',
            eventdate: '',
            minpoints: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getEvent(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({ errors: newProps.errors });
        }
       
        if(newProps.event.event){
            const event = newProps.event.event;
            
            var newDate = new Date(event.eventdate);
            //Sets up for YYYY/MM/DD format to input to the textfieldgroup
            const setDate = (newDate.getFullYear() + "-" + ("0"+(newDate.getMonth()+1)).slice(-2)  + "-" + newDate.getDate());
            
            event.event = !isEmpty(event.event) ? event.event : "";
            event.description = !isEmpty(event.description) ? event.description : "";
            event.location = !isEmpty(event.location) ? event.location : "";
            event.eventdate = !isEmpty(event.eventdate) ? setDate : "";
            event.from = !isEmpty(event.from) ? event.from : "";
            event.to = !isEmpty(event.to) ? event.to : "";
            event.minpoints = (event.minpoints !== 0) ? String(event.minpoints) : "";

            this.setState({
                event: event.event,
                description: event.description,
                location: event.location,
                eventdate: event.eventdate,
                from: event.from,
                to: event.to,
                minpoints: event.minpoints
            })
        }
    }

    onSubmit(e){
        e.preventDefault();
        const eventData = {
            event: this.state.event,
            description: this.state.description,
            location: this.state.location,
            eventdate: this.state.eventdate,
            from: this.state.from,
            to: this.state.to,
            minpoints: this.state.minpoints
        }
    
        this.props.updateEvent(eventData, this.props.event.event._id, this.props.history);
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        
        return (
            <div className="editeventform">
                <form onSubmit={this.onSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <p className="lead text-center">
                                        Make adjustments to your event information
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
                                        <TextFieldGroup 
                                            placeholder="* Location"
                                            name="location"
                                            value={this.state.location}
                                            onChange={this.onChange}
                                            info="Tell us where your event is taking place"
                                            error={errors.event}
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
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="btn btn-info btn-block mt-4"
                                        />
                                </div>
                            </div>
                        </div>
                </form>
            </div>
            
        )
    }
}

EventForm.propTypes = {
    toggle: PropTypes.func,
    addEvent: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    event: state.event
});

export default connect(mapStateToProps, { addEvent, clearErrors, getEvent, updateEvent })(EventForm);