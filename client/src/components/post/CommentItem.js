import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/postActions';
import { Link } from 'react-router-dom'

class CommentItem extends Component {
  onDeleteClick(postId, commentId){
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-5">
                    <Link to={`/profile/user/${comment.user._id}`}>
                        <img className="rounded-circle d-none d-md-block" src={comment.user.image} alt=""  style={{margin: 'auto' , width: '200px', height: '200px'}}/>
                    </Link>
                    <br />
                    <p className="text-center post-name">{comment.name}</p>
                </div>
                <div className="col-md-7">
                    <p className="lead">{comment.text}</p>
                    {comment.user._id === auth.user.id ? (
                        <button
                            onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                            type="button"
                            className="btn btn-danger mr-1"
                        >
                            <i className="fas fa-times" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    )
  }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);