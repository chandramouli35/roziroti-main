// TransactionList.jsx

import React from 'react';
import styles from './transactionlist.module.css'; // Import the styles

const TransactionList = ({ transactions }) => {
  return (
    <div className={styles.transactionListContainer}>
      <h3 className={styles.transactionListTitle}>Transaction History</h3>
      <ul>
        {transactions && transactions.map(transaction => (
          <li key={transaction._id} className={styles.transactionListItem}>
            {transaction.date && formatDate(transaction.date)} - {transaction.category} - ${transaction.amount} ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
export default TransactionList;
