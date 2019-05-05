import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
componentDidMount(){
  if(this.props.auth.isAuthenticated){
      this.props.history.push('/feed');
  }
}

  render() {
    return (
      <div>
        <section>
            <div className="homePage">
              <div className="dark-overlay landing-inner text-light">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1>MentorCrowd</h1>
                      <p className="description">MentorCrowd is the latest social media application that is centered around mentorship and growth. Join the community to find out how others can help you, and how you can help others.</p>
                      <div className="homePageButtons">
                        <Link to="/register">
                          <button>Register</button>
                        </Link>
                        <Link to="/login">
                          <button>Log In</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);