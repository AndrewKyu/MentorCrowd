import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import ConversationListItem from './ConversationListItem';



class ConversationList extends Component {
  render() {
    // console.log(this.props);
    const { conversations } = this.props;
    // console.log(conversations);
    return (
      <div className="conversation">
        <ListGroup>
          {conversations.map(conversation => <ConversationListItem key={conversation._id} conversation={conversation} />)}
        </ListGroup>
      </div>
    )
  }
}

ConversationList.propTypes = {
  conversations: PropTypes.array.isRequired
}

export default ConversationList;