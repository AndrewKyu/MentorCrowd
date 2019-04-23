import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './Messenger.css';

class Messenger extends Component {
  render() {
    return (
      <div class="messengers">
        <h1>
          MESSENGER
        </h1>
        <div className="row">
          <div className="col-md-4">
            <ListGroup>
              <ConversationList />
            </ListGroup>
          </div>
          <div className="col-md-8">

          </div>
        </div>
        
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