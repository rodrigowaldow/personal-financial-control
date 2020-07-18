import React from 'react';
import style from './index.module.css';
import Navigation from '../Navigation';
import { formatDate } from '../../helpers/helper.js';

export default function SelectPeriod({ items, dateNow, setNewDate }) {
  const handleChangeSelect = (event) => {
    setNewDate(event.target.value);
  };

  return (
    <div className={style.flexRow}>
      <Navigation
        text="<"
        type="prev"
        dateNow={dateNow}
        items={items}
        setNewDate={setNewDate}
      />
      <select
        className={`browser-default ${style.select}`}
        value={dateNow}
        onChange={handleChangeSelect}
      >
        {items.length > 0 &&
          items.map((yearMonth) => {
            return (
              <option key={yearMonth} value={yearMonth}>
                {yearMonth}
              </option>
            );
          })}
      </select>
      <Navigation
        text=">"
        type="next"
        dateNow={dateNow}
        items={items}
        setNewDate={setNewDate}
      />
    </div>
  );
}
