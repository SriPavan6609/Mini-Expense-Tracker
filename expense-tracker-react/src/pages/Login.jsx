import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../css/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/login', { email, password });
      setMessage('Login successful');
      navigate('/dashboard');
    } catch (err) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="app-name">Mini Expense Tracker</h1>
        <h2 className="login-title">Login</h2>
        {message && <p className="login-message">{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="register-link">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-button">Register</Link>
        </div>
      </div>
    </div>
  );
}
