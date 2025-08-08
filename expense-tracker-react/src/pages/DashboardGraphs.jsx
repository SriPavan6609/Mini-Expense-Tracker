import React, { useMemo } from 'react';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend as ChartLegend } from 'chart.js';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

ChartJS.register(ArcElement, Tooltip, ChartLegend);

const DashboardGraphs = ({ expenses, today }) => {
  const parseDate = (str) => new Date(str);
  const formatDate = (d) => d.toISOString().slice(0, 10);

  const {
    pieData,
    lineData,
    barChartData
  } = useMemo(() => {
    // Pie Chart: Last 3 months by category
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    const pieCategoryMap = {};

    expenses.forEach(({ expensecategory, expense, expensedate }) => {
      const d = parseDate(expensedate);
      if (d >= threeMonthsAgo && d <= today) {
        pieCategoryMap[expensecategory] = (pieCategoryMap[expensecategory] || 0) + expense;
      }
    });

    const pieData = {
      labels: Object.keys(pieCategoryMap),
      datasets: [{
        label: 'Expense by Category (Last 3 Months)',
        data: Object.values(pieCategoryMap),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8e44ad', '#27ae60',
          '#f39c12', '#c0392b', '#2980b9'
        ],
        borderWidth: 1
      }]
    };

    // Line Chart: Last 14 days
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 13);

    const dailyTotals = {};
    for (let i = 0; i < 14; i++) {
      const d = new Date(twoWeeksAgo);
      d.setDate(d.getDate() + i);
      dailyTotals[formatDate(d)] = 0;
    }

    expenses.forEach(({ expense, expensedate }) => {
      const d = parseDate(expensedate);
      const key = formatDate(d);
      if (d >= twoWeeksAgo && d <= today && key in dailyTotals) {
        dailyTotals[key] += expense;
      }
    });

    const lineData = Object.entries(dailyTotals).map(([date, expense]) => ({ date, expense }));

    // Bar Chart: total by category all time
    const barTotals = {};
    expenses.forEach(({ expensecategory, expense }) => {
      barTotals[expensecategory] = (barTotals[expensecategory] || 0) + expense;
    });

    const barChartData = Object.entries(barTotals).map(([category, total]) => ({
      category,
      total: total.toFixed(2)
    }));

    return { pieData, lineData, barChartData };
  }, [expenses, today]);

  return (
    <section className="chart-section">
      <h2>Expense Distribution - 3 Months (Pie Chart)</h2>
      {pieData.labels.length === 0 ? (
        <p>No data to show.</p>
      ) : (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
          <Pie data={pieData} />
        </div>
      )}

      <h2 style={{ marginTop: '2rem' }}>Expenses Over Last 2 Weeks (Line Chart)</h2>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ReTooltip />
            <Line type="monotone" dataKey="expense" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ marginTop: '2rem' }}>Total by Category (Bar Chart)</h2>
      {barChartData.length === 0 ? (
        <p>No data to show.</p>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <ReTooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default DashboardGraphs;
