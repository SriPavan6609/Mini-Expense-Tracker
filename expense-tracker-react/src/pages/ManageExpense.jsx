import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Sidebar from '../pages/Sidebar';
import '../css/Dashboard.css';

export default function ManageExpense() {
    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        expense: '',
        expensecategory: '',
        expensedate: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchUserAndExpenses() {
            try {
                const userRes = await api.get('/users/me');
                setUser(userRes.data);

                const expensesRes = await api.get(`/expenses/user/${userRes.data.userId}`);
                setExpenses(expensesRes.data);
            } catch (err) {
                setMessage('Failed to load data');
            } finally {
                setLoading(false);
            }
        }
        fetchUserAndExpenses();
    }, []);

    const startEditing = (expense) => {
        setEditingId(expense.expenseId);
        setEditForm({
            expense: expense.expense,
            expensecategory: expense.expensecategory,
            expensedate: expense.expensedate.slice(0, 10), 
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm({ expense: '', expensecategory: '', expensedate: '' });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id) => {
        try {
            await api.put(`/expenses/${id}`, {
                expenseId: id,
                userId: user.userId,
                expense: Number(editForm.expense),
                expensecategory: editForm.expensecategory,
                expensedate: editForm.expensedate,
            });

            setExpenses((prev) =>
                prev.map((ex) =>
                    ex.expenseId === id
                        ? { ...ex, ...editForm, expense: Number(editForm.expense) }
                        : ex
                )
            );
            setMessage('Expense updated');
            cancelEditing();
        } catch {
            setMessage('Failed to update expense');
        }
    };

    const deleteExpense = async (id) => {
        if (!window.confirm('Are you sure you want to delete this expense?')) return;

        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((ex) => ex.expenseId !== id));
            setMessage('Expense deleted');
        } catch {
            setMessage('Failed to delete expense');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <Sidebar />
            </aside>

            <main className="main">
                <h2>Manage Expenses</h2>
                {message && <p className="message">{message}</p>}

                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) =>
                            editingId === expense.expenseId ? (
                                <tr key={expense.expenseId}>
                                    <td>
                                        <input
                                            name="expense"
                                            type="number"
                                            value={editForm.expense}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="expensecategory"
                                            value={editForm.expensecategory}
                                            onChange={handleEditChange}
                                        >
                                            <option value="">Select Category</option>
                                            {[
                                                'Medicine',
                                                'Food',
                                                'Bills & Recharges',
                                                'Entertainment',
                                                'Clothings',
                                                'Rent',
                                                'Household Items',
                                                'Others',
                                            ].map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            name="expensedate"
                                            type="date"
                                            value={editForm.expensedate}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => saveEdit(expense.expenseId)}>Save</button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={expense.expenseId}>
                                    <td>{expense.expense}</td>
                                    <td>{expense.expensecategory}</td>
                                    <td>{new Date(expense.expensedate).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => startEditing(expense)}>Edit</button>
                                        <button onClick={() => deleteExpense(expense.expenseId)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
