import React from 'react';
import style from './index.module.css';

export default function Filter({ setDescription }) {
  const handleChangeFilter = (event) => {
    const description = event.target.value;
    setDescription(description);
  };
  return (
    <div className={`input-field ${style.inputFilter}`}>
      <input placeholder="Filtrar" type="text" onChange={handleChangeFilter} />
    </div>
  );
}
