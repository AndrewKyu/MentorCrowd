import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';
import PostFeed from './PostFeed';
import { Link } from 'react-router-dom';

class Posts extends Component {
  componentDidMount(){
    this.props.getPosts();
    this.props.getCurrentProfile();
  }
  
  render() {
    const { posts, loading } = this.props.post;
    const { profile } = this.props.profile;
    let postContent;
    
    if(posts === null || loading) {
      postContent = <Spinner />
    }else{
      postContent = (profile === null || Object.keys(profile).length === 0) ? (
        <div className="mt-4">
          <p className="failcase">You do not have a profile yet. Please create one <Link to="/dashboard">here</Link> to get connected with mentors or mentees.</p>
          {/* <PostFeed posts={posts} /> */}
        </div>
      ) : <PostFeed posts={posts} />;
      // postContent = <PostFeed posts={posts} />
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <PostForm /> */}
              {(profile === null || Object.keys(profile).length === 0) ? null : <PostForm />}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);

