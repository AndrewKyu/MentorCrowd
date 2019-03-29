import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const UserData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(UserData)
    }
    render(){
        const { errors } = this.state;

        return(
            <div className="loginPage">
                <h2>Log into MentorCrowd</h2>
                <p>Not a part of the MentorCrowd community yet? Click <Link to="/register">here</Link> to register.</p>
                <div className="mentorCrowdForm">
                    <div className="formContainer">
                        <form id="form" onSubmit={this.onSubmit}>
                            <input 
                                name="email" 
                                placeholder="EMAIL"
                                className = {classnames('form-control form-control-lg', {
                                    'is-invalid': errors.email
                                })}
                                type="email" 
                                tabIndex="2" 
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            <input 
                                name="password" 
                                placeholder="PASSWORD" 
                                className = {classnames('form-control form-control-lg', {
                                    'is-invalid': errors.password
                                })}
                                type="password" 
                                tabIndex="3" 
                                value={this.state.password} 
                                onChange={this.onChange}
                            />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            <button name="submit" type="submit" id="form-submit" data-submit="...Sending" value="register">Log In</button>
                        </form>
                    </div>
                </div>
                <p className="help">Forgot account? Please contact the Help Team <a href="/contact.html">here</a>.</p>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);