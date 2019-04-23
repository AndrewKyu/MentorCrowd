import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer'
import postReducer from './postReducer';
import selfProfileReducer from './selfProfileReducer';
import eventReducer from './eventReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer,
    self: selfProfileReducer,
    event: eventReducer
});