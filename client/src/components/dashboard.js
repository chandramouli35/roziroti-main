import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from './transactions';
import TransactionList from './transactionslist';
import api from '../api';
import styles from "./dashboard.module.css"
const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [savings, setSavings] = useState(0);
  const [monthlySummary, setMonthlySummary] = useState({ totalIncome: 0, totalExpenses: 0 });
  const token = localStorage.getItem('token');
  const history = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const incomeTransactions = response.data.filter(transaction => transaction.type === 'income');
        const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalExpenses = response.data
          .filter(transaction => transaction.type === 'expense')
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const currentSavings = Math.max(totalIncome - totalExpenses, 0);

        setSavings(currentSavings);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchMonthlySummary = async () => {
      try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const response = await api.get(`/transactions/summary/${currentYear}/${currentMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMonthlySummary(response.data);
      } catch (error) {
        console.error('Error fetching monthly summary:', error);
      }
    };

    if (token) {
      fetchTransactions();
      fetchMonthlySummary();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (localStorage.getItem('userId')) {
      localStorage.removeItem('userId');
    }
    history('/login');
  };

  return (
    <div className={styles.dashboard}>
      <header>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <section className={styles.savingsSection}>
          <h3>Current Savings</h3>
          <p>Rs.{savings}</p>
        </section>
        <section className={styles.summarySection}>
          <h3>Monthly Summary</h3>
          <p>Total Income: Rs.{monthlySummary.totalIncome}</p>
          <p>Total Expenses: Rs.{monthlySummary.totalExpenses}</p>
        </section>
        <section className={styles.transactionSection}>
          <TransactionForm token={token} />
          <TransactionList transactions={transactions} />
        </section>
      
      
      </main>
    </div>
  );
};


export default Dashboard;
