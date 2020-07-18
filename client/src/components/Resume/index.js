import React, { useState, useEffect } from 'react';
import { toBRL } from '../../helpers/helper.js';
import style from './index.module.css';

export default function Resume({ transactions }) {
  const [numTransactions, setNumTransactions] = useState();
  const [transactionsPositive, setTransactionsPositive] = useState();
  const [transactionsNegative, setTransactionsNegative] = useState();
  const [totalMoney, setTotalMoney] = useState();
  const [typeColor, setTypeColor] = useState(true);

  useEffect(() => {
    const size = transactions.length;
    setNumTransactions(size);

    const allPositive = transactions.filter((transaction) => {
      return transaction.type === '+';
    });

    const totalPositive = allPositive.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);

    const allNegative = transactions.filter((transaction) => {
      return transaction.type === '-';
    });

    const totalNegative = allNegative.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);

    const total = totalPositive - totalNegative;
    setTypeColor(total > 0 ? true : false);

    setTransactionsPositive(toBRL(totalPositive));
    setTransactionsNegative(toBRL(totalNegative));
    setTotalMoney(toBRL(total));
  }, [transactions]);

  return (
    <div className={style.container}>
      <section className={style.each}>
        <span className={style.title}>Lançamentos: </span>
        <span>{numTransactions}</span>
      </section>
      <section className={style.each}>
        <span className={style.title}>Receitas: </span>
        <span className={`${style.value} ${style.green}`}>
          {transactionsPositive}
        </span>
      </section>
      <section className={style.each}>
        <span className={style.title}>Despesas: </span>
        <span className={`${style.value} ${style.red}`}>
          -{transactionsNegative}
        </span>
      </section>
      <section className={style.each}>
        <span className={style.title}>Saldo: </span>
        <span
          className={`${style.value} ${typeColor ? style.green : style.red}`}
        >
          {totalMoney}
        </span>
      </section>
    </div>
  );
}
