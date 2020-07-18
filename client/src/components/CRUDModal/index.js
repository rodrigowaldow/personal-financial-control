import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import style from './index.module.css';

Modal.setAppElement('#root');

export default function CRUDModal({
  isOpen,
  setIsModalOpen,
  isAdding,
  id,
  getTransactions,
}) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    category: '',
    value: '',
    year: '',
    month: '',
    day: '',
    yearMonth: '',
    yearMonthDay: '',
  });

  useEffect(() => {
    const searchThisData = async () => {
      try {
        const res = await api.get(`/findOne/${id}`);
        const newData = res.data;
        delete newData._id;
        setFormData({ ...newData });
      } catch (err) {
        alert(err);
      }
    };
    if (!isAdding) {
      searchThisData();
    }
  }, [isAdding, id]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
      setFormData({});
    }
  };

  const handleModalClose = (event) => {
    setIsModalOpen(false);
    setFormData({});
  };

  const handleRadioChange = (isPositive) => {
    if (isPositive) {
      setFormData({ ...formData, type: '+' });
    } else {
      setFormData({ ...formData, type: '-' });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event) => {
    const fullDate = event.target.value;
    const year = fullDate.substring(0, 4);
    const month = fullDate.substring(7, 5);
    const day = fullDate.substring(10, 8);
    const yearMonth = `${year}-${month}`;
    const yearMonthDay = `${year}-${month}-${day}`;
    setFormData({
      ...formData,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdding) {
        await api.post('/create', formData);
        setIsModalOpen(false);

        console.log('Transação inserida');
      } else {
        const dataEdit = formData;
        delete dataEdit.type;
        await api.put(`edit/${id}`, formData);
        setIsModalOpen(false);

        console.log('Transação editada');
      }
      getTransactions();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal isOpen={isOpen} className={style.modal}>
      <div className={style.container}>
        <section className={style.header}>
          <h3>Novo lançamento</h3>
          <button
            onClick={handleModalClose}
            className="waves-effect waves-light btn red darken-4"
          >
            x
          </button>
        </section>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.type}>
            <div className={style.eachInput}>
              <label>
                <input
                  type="radio"
                  name="type"
                  value={formData.type === '-' && '-'}
                  checked={formData.type === '-' && true}
                  className={`with-gap`}
                  disabled={!isAdding && 'disabled'}
                  onChange={() => handleRadioChange(false)}
                />
                <span>Despesa</span>
              </label>
            </div>
            <div className={style.eachInput}>
              <label>
                <input
                  type="radio"
                  name="type"
                  value={formData.type === '+' && '+'}
                  checked={formData.type === '+' && true}
                  className={`with-gap`}
                  disabled={!isAdding && 'disabled'}
                  onChange={handleRadioChange}
                />
                <span>Receita</span>
              </label>
            </div>
          </div>
          <div className="input-field ">
            <label className="active">Descrição</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Informe a descrição aqui"
              className={style.text}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field ">
            <label className="active">Categoria</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              placeholder="Informe a categoria aqui"
              className={style.text}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field ">
            <label className="active">Valor</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              placeholder="Informe o valor aqui"
              className={style.text}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field ">
            <label className="active">Data</label>
            <input
              type="date"
              name="date"
              value={formData.yearMonthDay}
              className={style.text}
              onChange={handleDateChange}
            />
          </div>
          <input
            type="submit"
            value="Salvar"
            className="waves-effect waves-light btn"
          />
        </form>
      </div>
    </Modal>
  );
}
