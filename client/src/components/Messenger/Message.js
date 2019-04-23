import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class Message extends Component {
    constructor(){
        super();
        this.state = {
            endpoint: "localhost:5000"
        }
    }

    send = () =>{
        const socket = socketIOClient(this.state.endpoint);
    }

    sendMsg = () => {

    }

    getMsg = () => {

    }

    componentDidMount(){
        const socket = socketIOClient(this.state.endpoint);
    }
  render() {
    return (
      <div className="message">
        <ul className="messages"></ul>
      </div>
    )
  }
}


export default Message;