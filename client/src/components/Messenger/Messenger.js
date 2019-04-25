import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';
import openSocket from 'socket.io-client';

import ConversationList from './ConversationList';

import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';

import { getConversations } from '../../actions/messageActions';

const socket = openSocket('http://localhost:5000');

class Messenger extends Component {
  constructor(props){
    super(props);
    this.state={
      message:''
    }
    this.onChange = this.onChange.bind(this);
    this.send = this.send.bind(this);
  }

  componentDidMount(){
    this.props.getConversations();
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  send = () =>{
    socket.emit('example_message', 'demo');
  }

  render() {
    const { conversations, loading } = this.props.messenger;
    let conversationContent;

    if(conversations === null || loading){
      conversationContent = <Spinner />
    }else{
      conversationContent = <ConversationList conversations={conversations} send={this.send}/>
    }
    return (
      <div className="messengers">
        <h1>
          MESSENGER
        </h1>
        {/* <div className="row"> */}
          {/* <div className="col-md-4 mt-3" style={{backgroundColor:'white'}}> */}
              {/* {conversationContent} */}
          {/* </div> */}
          {conversationContent}
          {/* <div className="col-md-8">
            <Message conversations={conversations}/>
            <form>
              <input placeholder="Type a message..." className="form-control form-control-md"/>
              <button className="btn btn-primary btn-sm" onClick={this.send} type="button">Send</button>
            </form>
          </div> */}
        {/* </div> */}
      </div>
    )
  }
}

Messenger.propTypes = {
  getConversations: PropTypes.func.isRequired,
  messenger: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  messenger: state.messenger
});

export default connect(mapStateToProps, { getConversations })(Messenger);