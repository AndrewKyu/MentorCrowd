import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getConversation } from '../../actions/messageActions';

import ChatTexts from './ChatTexts';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            conversation: {}
        }
    }
    componentDidMount(){
        // console.log(this.props.chat._id);
        this.props.getConversation(this.props.chat._id);
    }
    //<ChatTexts key={text._id} text={text}/>
  render() {
      const { conversation } = this.props.messenger;
    //   console.log(this.props.messenger.conversation);
    // console.log(typeof conversation);
    // if(conversation.length === 0){
    //     console.log('no conversation');
    // }
    return (
      <div className="messages">
            {/* {message.message} */}
            {Object.values(conversation).map(text => <ChatTexts key={text._id} text={text}/>)}
      </div>
    )
  }
}

Chat.propTypes = {
    chat: PropTypes.object.isRequired,
    getConversation: PropTypes.func.isRequired,
    messenger: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    messenger: state.messenger
});

export default connect(mapStateToProps, { getConversation })(Chat);