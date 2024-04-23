import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');
export const logout = createAction('auth/logout');

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('https://origin8lab.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Response data:', responseData);
      const { token } = responseData;
      if (token) {
        sessionStorage.setItem('token', token);
        console.log('Token retrieved:', token);

        const { data } = responseData;
        const user = data ? { id: data.id, email: data.email } : null;
        console.log(user);

        dispatch(loginSuccess(responseData));
        return { success: true };
      }
      return { success: false, message: 'Token not found' };
    }
    const errorMessage = await response.text();
    return { success: false, message: errorMessage || 'Login failed' };
  } catch (error) {
    console.error('An error occurred during login:', error);
    return { success: false, message: 'An error occurred' };
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    dispatch(logout());
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
};
