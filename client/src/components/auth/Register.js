import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/feed');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history);
    }

    render(){
        const { errors } = this.state;
        return(
            <div className="registerPage">
                <h2>Sign Up for MentorCrowd</h2>
                <p>Join MentorCrowd and start yoinking up your career today!</p>
                <p>Already registered? Click <Link to="/login">here</Link> to log in.</p>
                <div className="mentorCrowdForm">
                    <div className="formContainer">
                        <form noValidate id="form" onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder="NAME"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                            <TextFieldGroup 
                                placeholder="EMAIL"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                            />
                            <TextFieldGroup 
                                placeholder="PASSWORD"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <TextFieldGroup 
                                placeholder="CONFIRM PASSWORD"
                                name="password2"
                                type="password"
                                value={this.state.password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />
                            <button name="submit" type="submit" id="form-submit" data-submit="...Sending" value="register">Register</button>
                        </form>
                    </div>
                </div>
                <p className="terms">By signing up you agree to our Terms & Conditions</p>
            </div>
        );  
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));