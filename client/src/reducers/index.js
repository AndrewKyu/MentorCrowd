import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer'
import postReducer from './postReducer';
import eventReducer from './eventReducer';
import messengerReducer from './messengerReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    event: eventReducer,
    messenger: messengerReducer
});