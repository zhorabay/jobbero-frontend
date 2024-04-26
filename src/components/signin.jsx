import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authActions';
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
      setError('');
      const response = await dispatch(login(email, password));
      if (response.success) {
        navigate('/');
      } else {
        setError(response.message);
      }
    } catch (error) {
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
                  required
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
                  required
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
            <Link to="/forget-a-password" className="sigin-forgot">Forgot your password?</Link>
            <p className="sigin-dont-have">
              Don&apos;t have an account?
              <Link to="/registration" className="sigin-up">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
