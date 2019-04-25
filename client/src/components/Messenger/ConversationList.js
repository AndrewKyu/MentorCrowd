import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import ConversationListItem from './ConversationListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import MessageList from './MessageList';
import TextFieldGroup from '../common/TextFieldGroup';
import Chat from './Chat';

import { replyMessage, getConversation } from '../../actions/messageActions';

class ConversationList extends Component {
  constructor(props){
    super(props);

    const today = new Date();
    const date = today.getFullYear() + '-' + ("0"+(today.getMonth()+1)).slice(-2) + '-' + today.getDate();

    this.state = {
      chat: {},
      message: '',
      date:date,
      chatItem: [{}]
    }
    this.updateChat = this.updateChat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //   componentWillMount(){

  //   // getConversation()
  //   console.log(Object.keys(this.state.chat).length);
  //   if(Object.keys(this.state.chat).length !== 0){
  //     // this.props.getConversation(this.state.chat._id);
  //     console.log('we in componenedidmount');
  //   }
  // }

  updateChat = (data, msges) => {
    // console.log(msges);
    this.setState({
      chat: data
    })
  }
  onSubmit(e){
    e.preventDefault();
    
    const messageData = {
      message: this.state.message
    }
    this.props.replyMessage(this.state.chat._id, messageData, this.props.send());
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const { conversations } = this.props;
    const { chat } = this.state;
    console.log(typeof conversations);
  
    const today = new Date();
    const date = today.getFullYear() + '-' + ("0"+(today.getMonth()+1)).slice(-2) + '-' + today.getDate();
    console.log(this.state);
    return (
      <div className="row">
        <div className="conversation col-md-4 mt-3" style={{backgroundColor:'white'}}>
          <ListGroup>
            {Object.values(conversations).map(conversation => <ConversationListItem key={conversation._id} conversation={conversation} triggerChatUpdate={this.updateChat}/>) }
          </ListGroup>
        </div>
        <div className="col-md-8 mt-3">
          <div className="message">
            {/* {(Object.keys(chat).length === 0) ? null : chat.message.map(text => <Chat message={text} key={text._id}/>)} */}
            {(Object.keys(chat).length === 0) ? null : <Chat chat={this.state.chat}/>}
          </div>
          
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup 
              placeholder="Type a message..."
              name="message"
              value={this.state.message}
              onChange={this.onChange}
            />
            {/* <input type="hidden" name="date" value={date} /> */}
            {/* <TextFieldGroup 
              name="date"
              type="date"
              value={date}
              onChange={this.onChange}
            /> */}
            <button className="btn btn-primary btn-sm" type="submit">Send</button>
          </form>
        </div>
      </div>
    )
  }
}

ConversationList.propTypes = {
  conversations: PropTypes.array.isRequired,
  send: PropTypes.func.isRequired,
  replyMessage: PropTypes.func.isRequired,
  getConversation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { replyMessage, getConversation })(ConversationList);