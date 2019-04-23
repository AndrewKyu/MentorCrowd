import React, { Component } from 'react';
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConversationList from './ConversationList';
import Message from './Message';
import MessageList from './MessageList';

import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';

import { getConversations } from '../../actions/messageActions';

class Messenger extends Component {
  constructor(props){
    super(props);
    this.state={
      message:''
    }
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    this.props.getConversations();
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const { conversations, loading } = this.props.messenger;
    let conversationContent;

    if(conversations === null || loading){
      conversationContent = <Spinner />
    }else{
      conversationContent = <ConversationList conversations={conversations}/>
    }
    return (
      <div className="messengers">
        <h1>
          MESSENGER
        </h1>
        <div className="row">
          <div className="col-md-4 mt-3" style={{backgroundColor:'white'}}>
              {conversationContent}
          </div>
          <div className="col-md-8">
            <Message />
            <form>
              <input placeholder="Type a message..." className="form-control form-control-md"/>
              {/* <button className="btn btn-primary btn-sm">Send</button> */}
            </form>
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

Messenger.propTypes = {
  getConversations: PropTypes.func.isRequired,
  messenger: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  messenger: state.messenger
});

export default connect(mapStateToProps, { getConversations })(Messenger);