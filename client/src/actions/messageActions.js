import axios from 'axios';

import {
    GET_CONVERSATIONS,
    GET_CONVERSATION,
    REPLY_CONVERSATION,
    NEW_RECIPIENT,
    MESSAGE_LOADING,
    CONVERSATION_LOADING,
    GET_ERRORS
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

//Get Conversation by ID
export const getConversation = (id) => dispatch => {
    // dispatch(setConversationLoading());

    axios
        .get(`/api/message/${id}`)
        .then(res => 
            dispatch({
                type: GET_CONVERSATION,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_CONVERSATION,
                payload: null
            })
        );
}

//Reply to conversation 
export const replyMessage = (id, message, socket) => dispatch => {
    axios
        .post(`/api/message/${id}`, message)
        .then(res => {
            console.log(res);
            dispatch({
                type: REPLY_CONVERSATION,
                payload: res.data
            })
            // socket();
            
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS, 
                payload: null
            })
        })
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