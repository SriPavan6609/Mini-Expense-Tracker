import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../css/Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const { firstname, lastname, email, password } = formData;
      await api.post('/users', { firstname, lastname, email, password });
      setMessage('Registration successful! You can now log in.');
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="app-name">Mini Expense Tracker</h1>
        <h2 className="register-title">Create Account</h2>

        {message && <p className="register-message">{message}</p>}

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>

        <div className="login-redirect">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      </div>
    </div>
  );
}
