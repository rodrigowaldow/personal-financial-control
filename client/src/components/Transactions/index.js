import React from 'react';
import Transaction from '../Transaction';

export default function Transactions({
  transactions,
  setIsModalOpen,
  setIsAdding,
  getTransactions,
  setId,
}) {
  return (
    <div className="center">
      {transactions.length > 0 &&
        transactions.map((transaction) => {
          return (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              setIsModalOpen={setIsModalOpen}
              setIsAdding={setIsAdding}
              getTransactions={getTransactions}
              setId={setId}
            />
          );
        })}
    </div>
  );
}
