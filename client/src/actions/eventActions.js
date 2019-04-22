import axios from 'axios';

import {
    ADD_EVENT,
    GET_ERRORS,
    GET_EVENTS,
    EVENT_LOADING,
    DELETE_EVENT,
    // GET_EVENT,
    CLEAR_ERRORS
} from './types';

//Add Post
export const addEvent = (eventData, toggle) => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/events', eventData)
        .then(res => {
                dispatch({
                    type: ADD_EVENT,
                    payload: res.data
                });
                toggle();
                dispatch(getEvents());
            }
        )
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }); 
            }
        );
}

// //Add Event
export const getEvents = () => dispatch => {
    dispatch(setEventLoading());

    axios
        .get('/api/events')
        .then(res => 
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_EVENTS,
                payload: null
            })
        );
}
// // Delete Post
export const deleteEvent = (id) => dispatch => {
    axios
        .delete(`/api/events/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_EVENT,
                payload: id
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        );
}

// // Attend Event
export const attendEvent = id => dispatch => {
    axios
      .post(`/api/events/attend/${id}`)
      .then(res => dispatch(getEvents()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
// Unattend Event
  export const unattendEvent = id => dispatch => {
    axios
      .post(`/api/events/unattend/${id}`)
      .then(res => dispatch(getEvents()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// //Get Post
// export const getPost = (id) => dispatch => {
//     dispatch(setPostLoading());

//     axios
//         .get(`/api/posts/${id}`)
//         .then(res => 
//             dispatch({
//                 type: GET_POST,
//                 payload: res.data
//             })    
//         )
//         .catch(err => 
//             dispatch({
//                 type: GET_POST,
//                 payload: null
//             })
//         );
// }

// //Add Comment
// export const addComment = (postId, commentData) => dispatch => {
//     dispatch(clearErrors());
//     axios
//         .post(`/api/posts/comment/${postId}`, commentData)
//         .then(res => 
//             dispatch({
//                 type: GET_POST,
//                 payload: res.data
//             })    
//         )
//         .catch(err => 
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// }

// //Delete Comment
// export const deleteComment = (postId, commentId) => dispatch => {
//     axios
//         .delete(`/api/posts/comment/${postId}/${commentId}`)
//         .then(res => 
//             dispatch({
//                 type: GET_POST,
//                 payload: res.data
//             })    
//         )
//         .catch(err => 
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// }

// Set Loading State
export const setEventLoading = () => {
    return {
        type: EVENT_LOADING
    }
}

// Clear errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };