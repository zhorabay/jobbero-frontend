import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../redux/slices/authSlice';
import girl from '../media/girl.png';
import '../styles/Auth.css';
import Navigation2 from './Navigation2';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });
      const responseJson = await response.json();
      const { status } = responseJson;
      if (status.code === 200) {
        const tokenHeader = response.headers.get('Authorization');
        const token = tokenHeader ? tokenHeader.split(' ')[1] : null;
        if (token) {
          const { data } = responseJson;
          const { id, email } = data;
          dispatch(loginSuccess({ user: { id, email }, token }));
          navigate('/homepage');
        } else {
          dispatch(loginFailure());
          setError('Login failed');
        }
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      dispatch(loginFailure());
      setError('An error occurred');
    }
  };

  return (
    <>
      <Navigation2 />
      <div className="signin-container">
        <div className="signin-flex">
          <div className="signin-img">
            <img src={girl} alt="student" className="signin-girl" />
          </div>
          <form className="signin-form" onSubmit={handleLogin}>
            <h2 className="signin-h2">Sign In To Origin8Lab</h2>
            <div className="signin-form-li">
              <label
                htmlFor="email"
                className="signin-label"
              >
                Email
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="signin-input"
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="signin-label"
              >
                Password
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="signin-input"
                />
              </label>
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="signin-btn"
              >
                Log In
              </button>
            </div>
            <Link to="/forget-a-password" className="sigin-forgot">Forgot you password?</Link>
            <p className="sigin-dont-have">
              Don&apos;t have an account?
              <Link to="/signup" className="sigin-up">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
