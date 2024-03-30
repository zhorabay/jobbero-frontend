import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
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
      formData.append('user[photo]', photo);
      formData.append('user[email]', email);
      formData.append('user[password]', password);
      formData.append('user[password_confirmation]', confirmPassword);
      formData.append('user[role]', role);

      await axios.post(
        'http://127.0.0.1:3000/api/v1/users',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      navigate('/');

      setName('');
      setPhoto(null);
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

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full bg-opacity-90">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-500 text-left"
            >
              Name
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Name"
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-500 text-left"
            >
              Photo
              <input
                type="file"
                id="photo"
                onChange={handlePhotoChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Choose file"
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500 text-left"
            >
              Email
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Email"
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500 text-left"
            >
              Password
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Password"
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
              className="block text-sm font-medium text-gray-500 text-left"
            >
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Confirm Password"
              />
            </label>
            {error && <div className="text-red-500">{error}</div>}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-500 text-left"
            >
              Role
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Role"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-2 text-center text-white rounded-md bg-blue-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
