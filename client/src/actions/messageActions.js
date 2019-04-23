import axios from 'axios';

import {
    GET_CONVERSATIONS,
    GET_CONVERSATION,
    REPLY_CONVERSATION,
    NEW_RECIPIENT,
    MESSAGE_LOADING,
    CONVERSATION_LOADING
} from './types';

//Get Conversations
export const getConversations = () => dispatch => {

    axios
        .get('/api/message/conversations')
        .then(res => 
            dispatch({
                type: GET_CONVERSATIONS,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_CONVERSATIONS,
                payload: null
            })    
        )
}

//Set Message Loading State
export const setMessageLoading = () => {
    return{
        type: MESSAGE_LOADING
    }
}

//Set Conversation Loading State
export const setConversationLoading = () => {
    return {
        type: CONVERSATION_LOADING
    }
}