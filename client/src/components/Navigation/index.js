import React, { useState, useEffect } from 'react';
import style from './index.module.css';

export default function Navigation({ text, type, dateNow, items, setNewDate }) {
  const [nextDate, setNextDate] = useState();

  useEffect(() => {
    if (nextDate != null) {
      setNewDate(nextDate);
    }
  }, [nextDate, setNewDate]);

  const getDateIndex = () => {
    return items.findIndex(function (date) {
      return date === dateNow;
    });
  };

  const handleClick = () => {
    if (type === 'next') {
      setNextDate(() => {
        const foundIndex = getDateIndex();
        if (items[foundIndex + 1] !== undefined) {
          dateNow = items[foundIndex + 1];
          return dateNow;
        }
      });
    } else {
      setNextDate(() => {
        const foundIndex = getDateIndex();
        if (items[foundIndex - 1] !== undefined) {
          dateNow = items[foundIndex - 1];
          return dateNow;
        }
      });
    }
  };

  return (
    <button
      className={`waves-effect waves-light btn ${style.button} ${
        (dateNow === '2019-01' && type === 'prev') ||
        (dateNow === '2021-12' && type === 'next')
          ? 'disabled'
          : ''
      }`}
      style={{ zIndex: 0 }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
