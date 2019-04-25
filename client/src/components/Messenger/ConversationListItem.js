import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'reactstrap';

import { getConversation } from '../../actions/messageActions';


class ConversationListItem extends Component {
    constructor(props){
        super(props);
        this.onGrabConversation = this.onGrabConversation.bind(this);
    }
//    componentDidMount(){
       
//    }
    onGrabConversation(){
        this.props.triggerChatUpdate(this.props.conversation);
        this.props.getConversation(this.props.conversation._id);
        // console.log(this.props.conversation._id)
    }
    
  render() {
      const { conversation, auth } = this.props;

    if(conversation === null){
        console.log("it is null");
    }
    // console.log(typeof conversation.user);
    // console.log(Object.values(conversation.user));
    let image;
    let name;
    // console.log(typeof conversation.user)
    // Object.values(conversation.user).map(self => {
    //     if(self._id !== auth.user.id){
    //         image = self.image;
    //         name = self.name;
    //     } 
    // })
    
    return (
      <div className="conversationlist">
        <button onClick={this.onGrabConversation} type="button" >
            <ListGroupItem>
                <div className="row">
                    <div className="col-md-3">
                        <img 
                            className="rounded-circle d-none d-md-block" 
                            // src={image} 
                            alt=""  
                            style={{margin: 'auto' , width: '40px', height: '40px'}}
                        />
                    </div>
                    <div className="col-md-9">
                        {name}
                    </div>
                </div>
            </ListGroupItem> 
        </button>
      </div>
    )
  }
}

ConversationListItem.propTypes = {
    getConversation: PropTypes.func.isRequired,
    conversation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    messenger: state.messenger
});

export default connect(mapStateToProps, { getConversation })(ConversationListItem);