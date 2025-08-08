import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Sidebar from '../pages/Sidebar';
import '../css/Dashboard.css';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ExpenseReport() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    async function fetchUserAndExpenses() {
      try {
        const userRes = await api.get('/users/me');
        setUser(userRes.data);

        const expensesRes = await api.get(`/expenses/user/${userRes.data.userId}`);

        let sorted = [...expensesRes.data];
        sorted.sort((a, b) => {
          return sortOrder === 'asc'
            ? new Date(a.expensedate) - new Date(b.expensedate)
            : new Date(b.expensedate) - new Date(a.expensedate);
        });

        setExpenses(sorted);
      } catch (err) {
        setMessage('Failed to load expenses');
      }
    }
    fetchUserAndExpenses();
  }, [sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const exportToExcel = () => {
    if (!expenses.length) {
      setMessage('No expenses to export');
      return;
    }

    const dataForExcel = expenses.map(({ expense_id, expensecategory, expense, expensedate }) => ({
      Category: expensecategory,
      Amount: expense,
      Date: new Date(expensedate).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'ExpenseReport.xlsx');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="main report-main">
        <div className="report-header">
          <h2>Expense Report</h2>
          <div className="report-controls">
            <label>
              Sort by Date:
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </label>
            <button onClick={exportToExcel}>Download Excel</button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}

        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(({ expense_id, expensedate, expensecategory, expense }, index) => (
                <tr key={expense_id ?? index}>
                  <td>{new Date(expensedate).toLocaleDateString()}</td>
                  <td>{expensecategory}</td>
                  <td>{expense.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}