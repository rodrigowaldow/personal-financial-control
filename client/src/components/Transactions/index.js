import React from 'react';
import Transaction from '../Transaction';

import style from './index.module.css';

export default function Transactions({ transactions }) {
  return (
    <div className="center">
      {transactions.length > 0 &&
        transactions.map((transaction) => {
          return (
            <Transaction key={transaction._id} transaction={transaction} />
          );
        })}
    </div>
  );
}
