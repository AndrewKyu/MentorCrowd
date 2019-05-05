import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { sendMessageToProfile } from '../../actions/profileActions';

class ProfileContact extends Component {
    constructor(props){
        super(props);
        this.state={
            name: this.props.auth.user.name,
            from: '',
            to: this.props.profile.profile.user.email,
            subject: '',
            message: '',
            sent: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e){
        e.preventDefault();
        
        const messageData = {
            name: this.state.name,
            from: this.state.from,
            to: this.state.to,
            subject: this.state.subject,
            message: this.state.message
        }
        
        this.props.sendMessageToProfile(messageData);
        this.setState({
            from: '',
            subject: '',
            message: '',
            sent: true
        })
    }
  render() {
    return (
      <div className="contactForm">
        <form onSubmit={this.onSubmit}>
            <TextFieldGroup 
                name="subject"
                placeholder="Subject"
                value={this.state.subject}
                onChange={this.onChange}
                // error={errors.name}
            />
            <TextFieldGroup 
                name="from"
                placeholder="What's your email?"
                value={this.state.from}
                onChange={this.onChange}
                // error={errors.name}
            />
            <TextAreaFieldGroup 
                placeholder="Type a message..."
                name="message"
                value={this.state.message}
                onChange={this.onChange}
            />
            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
        </form>
        {(this.state.sent === false) ? null : <p className="text-center mt-4">Message sent</p>}
      </div>
    )
  }
}

ProfileContact.propTypes = {
    // errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    sendMessageToProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
    // errors: state.errors
})

export default connect(mapStateToProps, { sendMessageToProfile })(ProfileContact);