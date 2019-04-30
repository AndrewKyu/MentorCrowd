import axios from 'axios';

import { GET_PROFILE, 
        PROFILE_LOADING, 
        CLEAR_CURRENT_PROFILE, 
        GET_ERRORS, 
        SET_CURRENT_USER, 
        GET_PROFILES, 
        GET_MATCHES 
      } from './types';

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })    
        );
}

//Get Profile by Handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get(`/api/profile/handle/${handle}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: null
        })
      );
};

//Get Profile by ID
export const getProfileByUserId = userID => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${userID}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post("/api/profile", profileData)
      .then(res => history.push("/dashboard"))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add Experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

//Get all profiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get("/api/profile/all")
      .then(res =>
        dispatch({
          type: GET_PROFILES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_PROFILES,
          payload: null
        })
      );
  };

//Get matched
export const getMatchedProfiles = (id) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile//match/${id}`)
    .then(res =>
      dispatch({
        type: GET_MATCHES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MATCHES,
        payload: null
      })
    );
};

//Send message on profile
export const sendMessageToProfile = (messageData) => dispatch => {
  axios
    .post("/api/profile/message", messageData)
    .then(res => {
      console.log("res:", res);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Delete Education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

//Delete Account and Profile
export const deleteAccount = () => dispatch => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      axios
        .delete("/api/profile")
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
};

//Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

//Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

//Upload Profile Picture
export const uploadProfilePic = (picData) => dispatch => {
  console.log(picData);
  axios
    .post('/api/profile/upload', picData)
    .then(res => {
      console.log('res', res);
      // this.setState({ image: res.data.image });
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Add profile rating by 1
export const addRating = id => dispatch => {
  axios
    .post(`/api/profile/rateup/${id}`)
    .then(res => dispatch(getProfiles()))
    .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
};