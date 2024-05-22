import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';

function LoginModal({ onSuccess, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      onSuccess();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" className="login-input" value={formData.username} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="login-input" value={formData.password} onChange={handleChange} />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
