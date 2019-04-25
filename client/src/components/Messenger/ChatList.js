import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ChatList extends Component {
   
  render() {
    console.log(this.props);
    return (
      <div className="messages">
        <ul>
          
        </ul>
      </div>
    )
  }
}


MessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
}

export default ChatList;