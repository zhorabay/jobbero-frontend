import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, token } = action.payload;
      if (user && token) {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        state.user = user;
        state.isAuthenticated = true;
      } else {
        console.error('Login success payload is invalid:', action.payload);
      }
    },
    loginFailure(state) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
    logout(state) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
