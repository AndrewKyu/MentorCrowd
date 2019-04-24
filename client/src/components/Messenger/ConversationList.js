import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import ConversationListItem from './ConversationListItem';
import { Link } from 'react-router-dom';

class ConversationList extends Component {
  render() {
    const { conversations } = this.props;
    return (
      <div className="conversation">
        <ListGroup>
          {conversations.map(conversation => <Link to={`/dashboard/`}><ConversationListItem key={conversation._id} conversation={conversation} /></Link>)}
        </ListGroup>
      </div>
    )
  }
}

ConversationList.propTypes = {
  conversations: PropTypes.array.isRequired
}

export default ConversationList;