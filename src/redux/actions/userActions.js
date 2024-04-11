import axios from 'axios';

export const fetchUsersRequest = () => ({
  type: 'FETCH_USERS_REQUEST',
});

export const fetchUsersSuccess = (users) => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: 'FETCH_USERS_FAILURE',
  payload: error,
});

export const postUserRequest = () => ({
  type: 'POST_USER_REQUEST',
});

export const postUserSuccess = (user) => ({
  type: 'POST_USER_SUCCESS',
  payload: user,
});

export const postUserFailure = (error) => ({
  type: 'POST_USER_FAILURE',
  payload: error,
});

export const fetchUsers = () => (dispatch) => {
  dispatch(fetchUsersRequest());
  axios.get('http://localhost:3000/api/v1/users')
    .then((response) => {
      dispatch(fetchUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(fetchUsersFailure(error.message));
    });
};

export const postUser = (FormData) => (dispatch) => {
  dispatch(postUserRequest());
  const queryParams = new URLSearchParams(FormData);
  axios.post('http://localhost:3000/api/v1/users?' + queryParams)
    .then((response) => {
      dispatch(postUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(postUserFailure(error.message));
    });
};
