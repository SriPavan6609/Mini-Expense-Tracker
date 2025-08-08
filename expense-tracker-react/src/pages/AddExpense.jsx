import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from './Sidebar';
import '../css/AddExpense.css';

const categories = [
  'Medicine',
  'Food',
  'Bills & Recharges',
  'Entertainment',
  'Clothings',
  'Rent',
  'Household Items',
  'Others',
];

export default function AddExpense({ onExpenseAdded }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get('/users/me');
        setUser(res.data);
      } catch (err) {
        setMessage('Failed to load user info');
      }
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setMessage('User not loaded');

    const expenseDto = {
      userId: user.userId,
      expense: Number(form.amount),
      expensedate: form.date,
      expensecategory: form.category,
    };

    try {
      await api.post('/expenses', expenseDto);
      setMessage('Expense added successfully');
      setForm({ amount: '', category: '', date: '' });
      if (onExpenseAdded) onExpenseAdded();
    } catch (err) {
      setMessage('Failed to add expense');
    }
  };

  return (
    <div className="add-expense-container">
      <Sidebar />

      <main className="add-expense-main">
        <h2 className="title">Add Expense</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit} className="expense-form">
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Expense</button>
        </form>
      </main>
    </div>
  );
}
