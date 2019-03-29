import React, { Component } from 'react'
import { Link } from 'react-router-dom';

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

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const User = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(User)
    }
    render(){
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
                                className="form-control form-control-lg" 
                                type="email" 
                                tabIndex="2" 
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <input 
                                name="password" 
                                placeholder="PASSWORD" 
                                className="form-control form-control-lg"
                                type="password" 
                                tabIndex="3" 
                                value={this.state.password} 
                                onChange={this.onChange}
                            />
                            <button name="submit" type="submit" id="form-submit" data-submit="...Sending" value="register">Log In</button>
                        </form>
                    </div>
                </div>
                <p className="help">Forgot account? Please contact the Help Team <a href="/contact.html">here</a>.</p>
            </div>
        );
    }
}

export default Login;