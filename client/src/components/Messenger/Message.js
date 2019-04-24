import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class Message extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         endpoint: "localhost:5000"
    //     }
    //     this.send = this.send.bind(this);
    // }

    // send = () =>{
    //     const socket = socketIOClient(this.state.endpoint);
    //     socket.emit('example_message', 'demo');
    // }

    // sendMsg = () => {

    // }

    // getMsg = () => {

    // }
    
    // componentDidMount(){
    //     const socket = socketIOClient(this.state.endpoint);
    // }
  render() {
    return (
      <div className="message">
        <ul className="messages"></ul>
      </div>
    )
  }
}


export default Message;