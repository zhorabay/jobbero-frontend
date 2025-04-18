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

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get('https://origin8lab-cu7g.onrender.com/api/v1/users');
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

export const signUp = (userData, selectedCourseId, userId) => async (dispatch) => {
  dispatch(signUpRequest());
  try {
    const response = await axios.post('https://origin8lab-cu7g.onrender.com/api/v1/users', {
      user: userData,
      selectedCourseId,
      userId,
    });
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

export const fetchUserCoursesRequest = () => ({
  type: 'FETCH_USER_COURSES_REQUEST',
});

export const fetchUserCoursesSuccess = (courses) => ({
  type: 'FETCH_USER_COURSES_SUCCESS',
  payload: courses,
});

export const fetchUserCoursesFailure = (error) => ({
  type: 'FETCH_USER_COURSES_FAILURE',
  payload: error,
});

export const fetchUserCourses = (userId) => async (dispatch) => {
  dispatch(fetchUserCoursesRequest());
  try {
    const response = await axios.get(`https://origin8lab-cu7g.onrender.com/api/v1/users/${userId}/courses`);
    console.log('Fetched user courses:', response.data);
    dispatch(fetchUserCoursesSuccess(response.data));
  } catch (error) {
    console.error('Error fetching user courses:', error);
    dispatch(fetchUserCoursesFailure(error.message));
  }
};
