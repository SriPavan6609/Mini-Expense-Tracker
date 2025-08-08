import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AddExpense from './pages/AddExpense';
import Dashboard from './pages/Dashboard';
import ExpenseReport from './pages/ExpenseReport';
import ManageExpense from './pages/ManageExpense';

export default function App() {
  return (
    <Router>
      <nav>
        {/* <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/profile">Profile</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/expense-report">Expense Report</Link>
        <Link to="/add-expense">Add Expense</Link> |{' '}
        <Link to="/manage-expense">Manage Expense</Link> */}
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense-report" element={<ExpenseReport />} />
        <Route path="/manage-expense" element={<ManageExpense />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}