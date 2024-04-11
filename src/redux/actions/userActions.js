import axios from 'axios';
import { loginSuccess } from './authActions';

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

export const signUpRequest = () => ({
  type: 'SIGN_UP_REQUEST',
});

export const signUpSuccess = (user) => ({
  type: 'SIGN_UP_SUCCESS',
  payload: user,
});

export const signUpFailure = (error) => ({
  type: 'SIGN_UP_FAILURE',
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

export const signUp = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users', { user: userData });
    if (response.status === 201 || response.status === 200) {
      const { user, token } = response.data;
      if (token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(loginSuccess({ user, token }));
        return true;
      }
      console.error('Token not found in response data');
      dispatch(signUpFailure('Token not found in response data'));
      return false;
    }
    dispatch(signUpFailure('Sign-up failed'));
    return false;
  } catch (error) {
    console.error('An error occurred during sign-up:', error);
    dispatch(signUpFailure('An error occurred during sign-up'));
    return false;
  }
};
