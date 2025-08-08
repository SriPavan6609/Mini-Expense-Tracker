import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import DashboardGraphs from './DashboardGraphs';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const parseDate = (str) => new Date(str);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch {
        setMessage('Failed to load user info');
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchExpenses = async () => {
      try {
        const res = await api.get(`/expenses/user/${user.userId}`);
        setExpenses(res.data);
      } catch {
        setError('Failed to load expenses');
      }
    };
    fetchExpenses();
  }, [user]);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Memoized calculations
  const {
    totalExpenses,
    weeklyExpenses,
    monthlyExpenses,
    recentExpenses,
  } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.expense, 0);

    const weekly = expenses.filter(e => {
      const d = parseDate(e.expensedate);
      return today - d >= 0 && today - d < 7 * 86400000;
    }).reduce((sum, e) => sum + e.expense, 0);

    const monthly = expenses.filter(e => {
      const d = parseDate(e.expensedate);
      return today - d >= 0 && today - d < 30 * 86400000;
    }).reduce((sum, e) => sum + e.expense, 0);

    const recent = [...expenses]
      .sort((a, b) => new Date(b.expensedate) - new Date(a.expensedate))
      .slice(0, 5);

    return { totalExpenses: total, weeklyExpenses: weekly, monthlyExpenses: monthly, recentExpenses: recent };
  }, [expenses, today]);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Personal Expense Tracker</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-expense">Add Expense</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/expense-report">Expense Report</Link></li>
            <li><Link to="/manage-expense">Manage Expense</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main>
        <header>
          <h1>Dashboard</h1>
          {message && <p className="message">{message}</p>}
        </header>

        <section className="summary">
          <h2>Expense Summary</h2>
          <div className="summary-cards">
            <div className="card">
              <h3>Total Expenses</h3>
              <p>${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="card">
              <h3>Last 7 Days</h3>
              <p>${weeklyExpenses.toFixed(2)}</p>
            </div>
            <div className="card">
              <h3>Last 30 Days</h3>
              <p>${monthlyExpenses.toFixed(2)}</p>
            </div>
          </div>
        </section>

        <DashboardGraphs expenses={expenses} today={today} />

        <section>
          <h2>Recent Expenses</h2>
          {error && <p className="error">{error}</p>}
          {recentExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount ($)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map(({ expensecategory, expense, expensedate, expense_id }, index) => (
                  <tr key={expense_id ?? index}>
                    <td>{expensecategory}</td>
                    <td>{expense.toFixed(2)}</td>
                    <td>{expensedate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
