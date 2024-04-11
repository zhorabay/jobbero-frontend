import { createReducer } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure, logout } from '../actions/authActions';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginSuccess, (state, action) => {
      const userData = action.payload?.data;
      if (userData) {
        const { id, email, created_at } = userData;
        sessionStorage.setItem('user', JSON.stringify(userData));
        state.user = { id, email, created_at };
        state.isAuthenticated = true;
      } else {
        console.error('Login success payload is invalid:', action.payload);
      }
    })
    .addCase(loginFailure, (state) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(logout, (state) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    });
});

export default authReducer;
