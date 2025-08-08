import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../pages/Sidebar';
import '../css/Profile.css';

export default function Profile() {
  const [user, setUser] = useState({
    userId: '',
    firstname: '',
    lastname: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (error) {
        setMessage('Failed to load profile');
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user.userId}`, user);
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="main profile-main">
        <h2>Your Profile</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSave} className="profile-form">
          <label>
            First Name
            <input
              name="firstname"
              value={user.firstname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name
            <input
              name="lastname"
              value={user.lastname}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email (read-only)
            <input
              name="email"
              value={user.email}
              disabled
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </main>
    </div>
  );
}
