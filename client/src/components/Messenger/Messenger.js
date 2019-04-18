import React, { Component } from 'react';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './Messenger.css';

class Messenger extends Component {
  render() {
    return (
      <div class="messenger">
        <h1>
          MESSENGER
        </h1>
        {/* <div className="scrollable sidebar">
            <ConversationList/>
        </div>

        <div className="scrollable content">
            <MessageList />
        </div> */}
      </div>
    )
  }
}

export default Messenger;