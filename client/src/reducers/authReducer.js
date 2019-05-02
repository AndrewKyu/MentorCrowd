import { SET_CURRENT_USER, GET_CONNECTIONS, CONNECTION_LOADING } from '../actions/types'
import isEmpty from '../validation/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {},
    connections: []
}

export default function( state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case CONNECTION_LOADING:
            return{
                ...state,
                loading: true
            };
        case GET_CONNECTIONS:
            return {
                ...state,
                connections: action.payload,
                loading: false
            }
        default:
            return state;
    }
}