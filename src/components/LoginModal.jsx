import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';

function LoginModal({ onSuccess, onClose }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await dispatch(login(email, password));
      if (response.success) {
        onSuccess();
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <button className="close" type="button" onClick={handleClose} onKeyDown={(e) => e.key === 'Enter' && handleClose()}>X</button>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Email" className="login-input" value={email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="login-input" value={password} onChange={handleChange} />
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
