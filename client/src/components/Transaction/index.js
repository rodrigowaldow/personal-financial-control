import React from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import api from '../../services/api';
import style from './index.module.css';

import { toBRL } from '../../helpers/helper.js';

export default function Transaction({
  transaction,
  setIsModalOpen,
  setIsAdding,
  getTransactions,
  setId,
}) {
  const { _id, day, category, description, value, type } = transaction;
  const typeColor = type === '+' ? true : false;

  const handleDelete = async (_id) => {
    try {
      await api.delete(`/delete/${_id}`);
      getTransactions();

      console.log('Transação deletada');
    } catch (err) {
      alert(err);
    }
  };
  const handleEdit = (_id) => {
    setIsAdding(false);
    setIsModalOpen(true);
    setId(_id);
  };

  return (
    <div className={`${style.item} ${typeColor ? style.in : style.out}`}>
      <span className={style.day}>{('0' + day).slice(-2)}</span>
      <div className={style.body}>
        <div className={style.info}>
          <span className={style.category}>{category}</span>
          <span className={style.description}>{description}</span>
        </div>
        <span className={style.value}>{toBRL(value)}</span>
      </div>
      <div className={style.actions}>
        <MdModeEdit onClick={() => handleEdit(_id)} />
        <MdDelete onClick={() => handleDelete(_id)} />
      </div>
    </div>
  );
}
