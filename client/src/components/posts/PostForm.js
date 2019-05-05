import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();

        const { user } = this.props.auth;

        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.image
        };

        this.props.addPost(newPost);
        this.setState({text: ''});
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
    const { errors } = this.state;
    return (
        <div className="post-form mb-3 mt-4">
            <div className="card card-info">
                <div className="card-header">
                    Create Post
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup 
                                placeholder="What's on your mind?"
                                name="text"
                                value={this.state.text}
                                onChange={this.onChange}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit">Share</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);