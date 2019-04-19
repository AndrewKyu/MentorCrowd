import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEvent } from '../../actions/eventActions';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

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
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
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

        this.props.addEvent(eventData);
    }
    
    render() {
        const { errors } = this.state;

        return (
            <div className="eventform">
               <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <p className="lead text-center">
                            Please fill out some information to create your event
                        </p>
                        <small className="d-block pb-3">* = Required Fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder="* Name of Event"
                                name="event"
                                value={this.state.event}
                                error={errors.event}
                                onChange={this.onChange}
                                info="Give us a descriptive, yet creative name for your event"
                            />
                            <TextAreaFieldGroup 
                                placeholder="* Description"
                                name="description"
                                value={this.state.description}
                                error={errors.description}
                                onChange={this.onChange}
                                info="Describe how amazing your event is"
                            />
                            <h6>* Event Date</h6>
                            <TextFieldGroup 
                                name="eventdate"
                                type="date"
                                value={this.state.eventdate}
                                error={errors.eventdate}
                                onChange={this.onChange}
                            />
                            <h6>* Start Time</h6>
                            <TextFieldGroup 
                                name="from"
                                type="time"
                                value={this.state.from}
                                error={errors.from}
                                onChange={this.onChange}
                            />
                            <h6>* End Time</h6>
                            <TextFieldGroup 
                                name="to"
                                type="time"
                                value={this.state.to}
                                error={errors.to}
                                onChange={this.onChange}
                            />
                            <TextFieldGroup 
                                placeholder="Minimum Points to Attend"
                                name="minpoints"
                                value={this.state.minpoints}
                                error={errors.minpoints}
                                onChange={this.onChange}
                                info="What's the minimum amount of points required to attend this event?"
                            />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-info" data-dismiss={(!errors) ? "modal" : ""}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
               </div>
            </div>
        )
    }
}

EventForm.propTypes = {
    addEvent: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { addEvent })(EventForm);