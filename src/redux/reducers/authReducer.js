import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
      toast.success(`Successful login. Welcome, ${user.name}`);
      state.user = user;
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
