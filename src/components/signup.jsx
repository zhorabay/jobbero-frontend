import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import girl from '../media/girl.png';
import '../styles/Auth.css';
import Navigation2 from './Navigation2';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');

      if (password.trim() === '') {
        setError("Password can't be blank");
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const formData = new FormData();
      formData.append('user[name]', name);
      formData.append('user[phone]', phone);
      formData.append('user[email]', email);
      formData.append('user[password]', password);
      formData.append('user[password_confirmation]', confirmPassword);

      await axios.post(
        'http://127.0.0.1:3000/api/v1/users',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      navigate('/courses');

      setName('');
      setPhone(null);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    } catch (error) {
      if (
        error.response
        && error.response.data
        && error.response.data.message[0]
      ) {
        setError(error.response.data.message[0]);
      } else {
        setError('An error occurred');
      }
    }
  };

  const handlePhoneChange = (countryCode, phoneNumber) => {
    setPhone(`${countryCode}${phoneNumber}`);
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
                htmlFor="phone"
                className="signin-label"
              >
                Phone
                <div className="signin-label-p">
                  <select
                    id="phone-coutry"
                    className="signin-input-p"
                    onClick={(e) => handlePhoneChange(e.target.value, document.getElementById('phone').value)}
                    placeholder="+1"
                  >
                    <option value="phone">+1</option>
                    <option value="phone">+40</option>
                  </select>
                  <input
                    type="number"
                    id="phone"
                    className="signin-input-p2"
                  />
                </div>
              </label>
            </div>

            <div>
              <label
                htmlFor="name"
                className="signin-label"
              >
                Full Name
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="signin-input"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error && <div className="text-red-500">{error}</div>}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="signin-label"
              >
                Retype Password
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="signin-input"
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
              />
            </div>

            <div className="signup-btn">
              <button
                type="submit"
                className="signin-btn"
              >
                Sign Up
              </button>
            </div>
            <p className="sigin-dont-have">
              Have an account?
              <Link to="/login" className="sigin-up">Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
