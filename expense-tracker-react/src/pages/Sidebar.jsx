import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/add-expense', label: 'Add Expense' },
    { to: '/expense-report', label: 'Expense Report' },
    { to: '/profile', label: 'Profile' },
    { to: '/manage-expense', label: 'Manage Expense' }
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Personal Expense Tracker</h2>
      <nav>
        <ul className="sidebar-menu">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="sidebar-link">{label}</Link>
            </li>
          ))}
          <li>
            <button className="sidebar-logout" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
