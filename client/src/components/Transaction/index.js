import React from 'react';
import style from './index.module.css';

export default function Transaction({ transaction }) {
  const { _id, day, category, description, value, type } = transaction;
  const typeColor = type === '+' ? true : false;

  return (
    <div className={`${style.item} ${typeColor ? style.in : style.out}`}>
      <span className={style.day}>{day}</span>
      <div className={style.body}>
        <div className={style.info}>
          <span className={style.category}>{category}</span>
          <span className={style.description}>{description}</span>
        </div>
        <span className={style.value}>{value}</span>
      </div>
      <div className={style.actions}>
        <span
          className="material-icons"
          style={{ fontSize: '1.2rem', cursor: 'pointer', marginRight: '10px' }}
        >
          edit
        </span>
        <span
          className="material-icons"
          style={{ fontSize: '1.2rem', cursor: 'pointer', marginRight: '10px' }}
        >
          delete
        </span>
      </div>
    </div>
  );
}
