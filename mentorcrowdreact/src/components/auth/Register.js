import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            // username: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                <h2>Sign Up</h2>
                <p>Join MentorCrowd and start yoinking up your career today!</p>
                <p>Already registered? Click <Link to="/login">here</Link> to log in.</p>
                <div className="mentorCrowdForm">
                    <div className="formContainer">
                        <form noValidate id="form" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    name="name" 
                                    placeholder="NAME"
                                    type="text" 
                                    className = {classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })}
                                    tabIndex="1" 
                                    value={this.state.name} autoFocus
                                    onChange={this.onChange}
                                />
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <input 
                                    name="email"
                                    placeholder="EMAIL" 
                                    type="email" 
                                    className = {classnames('form-control form-control-lg', {
                                        'is-invalid': errors.email
                                    })}
                                    tabIndex="2" 
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>
                                {/* <input 
                                    name="username"
                                    placeholder="USERNAME" 
                                    type="text" 
                                    tabIndex="3" 
                                    value={this.state.username}
                                    onChange={this.onChange}
                                /> */}
                            <div className="form-group">
                                <input 
                                    name="password" 
                                    placeholder="PASSWORD" 
                                    type="password" 
                                    className = {classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password
                                    })}
                                    // tabIndex="3" 
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <input 
                                    name="password2" 
                                    placeholder="CONFIRM PASSWORD" 
                                    type="password" 
                                    className = {classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password2
                                    })}
                                    // tabIndex="4" 
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                />
                                {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                            </div>
                            <button name="submit" type="submit" id="form-submit" data-submit="...Sending" value="register">Register</button>
                        </form>
                    </div>
                </div>
                <p className="terms">By signing up you agree to our <Link to="/">Terms & Conditions</Link></p>
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