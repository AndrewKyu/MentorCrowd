import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';

import { getConversation } from '../../actions/messageActions';


class ConversationListItem extends Component {
    componentDidMount(){
        // console.log(this.props);
        // this.props.getConversation(this.props.auth.user.id);
    }
  render() {
      const { conversation } = this.props;
      console.log(this.props);
    //   console.log(conversation.user[1].name);
    return (
      <div className="conversationlist">
        <ListGroupItem>
            <div className="row">
                <div className="col-md-3">
                    <img 
                        className="rounded-circle d-none d-md-block" 
                        src={conversation.user[1].image} 
                        alt=""  
                        style={{margin: 'auto' , width: '40px', height: '40px'}}
                    />
                </div>
                <div className="col-md-9">
                    {conversation.user[1].name}
                </div>
            </div>
        </ListGroupItem> 
      </div>
    )
  }
}

ConversationListItem.propTypes = {
    getConversation: PropTypes.func.isRequired,
    messenger: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    messenger: state.messenger
});

export default connect(mapStateToProps, { getConversation })(ConversationListItem);