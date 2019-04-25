import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ChatTexts extends Component {
  render() {
    console.log(this.props.text.message);
    return (
      <div className="text">
        <div className="row">
          <p>{this.props.text.message}</p>
        </div>
      </div>
    )
  }
}


export default ChatTexts;