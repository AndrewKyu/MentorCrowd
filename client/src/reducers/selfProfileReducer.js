import { GET_SELF } from '../actions/types';

const initialState = {
    profile: null,
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_SELF:
            return {
                ...state,
                profile: action.payload,
                loading: true
            }
        default:
            return state;
    }
    
}