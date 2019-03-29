import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Landing extends Component {
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
                      <p className="description">** ENTER A DESCRIPTION ABOUT MENTORCROWD HERE **</p>
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
export default Landing;