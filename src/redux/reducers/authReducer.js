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
        return { ...state, user, isAuthenticated: true };
      }
      console.error('Login success payload is invalid:', action.payload);
      return state;
    },
  },
  loginFailure(state) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return { ...state, user: null, isAuthenticated: false };
  },
  logout(state) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return { ...state, user: null, isAuthenticated: false };
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
