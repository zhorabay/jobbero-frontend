import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('auth/loginSuccess');
export const loginFailure = createAction('auth/loginFailure');

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch(loginSuccess(data));
      return { success: true };
    }
    dispatch(loginFailure());
    return { success: false, message: data.message };
  } catch (error) {
    console.error('An error occurred during login:', error);
    dispatch(loginFailure());
    return { success: false, message: 'An error occurred' };
  }
};
