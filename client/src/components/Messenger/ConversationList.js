import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './ConversationList.css';

class ConversationList extends Component {
  render() {
    return (
      <div className="conversation">
        <ListGroup>
          <ListGroupItem>uno</ListGroupItem>
          <ListGroupItem>dos</ListGroupItem>
          <ListGroupItem>tres</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default ConversationList;