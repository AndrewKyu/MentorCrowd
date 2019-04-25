import { MESSAGE_LOADING, CONVERSATION_LOADING, GET_CONVERSATION, GET_CONVERSATIONS, REPLY_CONVERSATION, NEW_RECIPIENT } from '../actions/types';

const initialState = {
    conversation: {},
    message: {},
    conversations: [],
    messages: [],
    loading: false
}

export default function(state = initialState, action){
    // console.log(action.payload);
    switch(action.type){
        case CONVERSATION_LOADING:
            return {
                ...state,
                loading: true
            };
        case MESSAGE_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_CONVERSATION:
            return {
                ...state,
                conversation: action.payload,
                loading: false
            }
        case GET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload,
                loading: false
            }
        case REPLY_CONVERSATION:
            return{
                ...state,
                conversations: action.payload
            }
        case NEW_RECIPIENT:
            return{
                ...state,
                conversations: [action.payload, ...state.conversations]
            }
        default: return state;
    }
}