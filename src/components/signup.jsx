import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'react-phone-input-2/lib/style.css';
import '../styles/Auth.css';
import PhoneInput from 'react-phone-input-2';
import girl from '../media/girl.png';
import Navigation2 from './Navigation2';
import { signUp } from '../redux/actions/userActions';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  console.log(userData);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.trim();
    setUserData({ ...userData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.password_confirmation) {
      console.error('Passwords do not match');
    } else {
      console.log('Submitting data:', userData);
      dispatch(signUp(userData)).then((success) => {
        if (success) {
          navigate('/');
        }
      });
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
          <form className="signin-form" onSubmit={handleSubmit}>
            <h2 className="signin-h2">Get Started!</h2>
            <div>
              <label htmlFor="email" className="signin-label">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="signin-input"
                  autoComplete="username"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="phone_number" className="signin-label">
                Phone
                <div className="signin-label-p">
                  <PhoneInput
                    country="us"
                    type="text"
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={(value) => handleChange({ target: { name: 'phone_number', value } })}
                    inputProps={{
                      id: 'phone_number',
                      required: true,
                    }}
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="name" className="signin-label">
                Full Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="signin-input"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="password" className="signin-label">
                Password
                <input
                  type="password"
                  id="password"
                  className="signin-input"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
              </label>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="signin-label">
                Retype Password
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={userData.password_confirmation}
                  onChange={handleChange}
                  className="signin-input"
                  required
                />
              </label>
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <div>
              <Form.Check
                type="checkbox"
                className="signup-checkbox"
                label={(
                  <>
                    Agree to Origin8Lab Company&apos;s
                    {' '}
                    <Link to="/terms">Terms of Use</Link>
                    {' '}
                    and
                    {' '}
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    .
                  </>
                )}
                required
              />
            </div>
            <div className="signup-btn">
              <button type="submit" className="signin-btn">
                Sign Up
              </button>
            </div>
            <p className="sigin-dont-have">
              Have an account?
              {' '}
              <Link to="/login" className="sigin-up">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
