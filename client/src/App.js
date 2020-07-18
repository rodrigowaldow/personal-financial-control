import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Spinner from './components/Spinner';
import SelectPeriod from './components/SelectPeriod';
import Resume from './components/Resume';

import api from '../src/services/api';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';
import Filter from './components/Filter';
import CRUDModal from './components/CRUDModal';

export default function App() {
  const [allMonths, setAllMonths] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateNow, setNewDate] = useState('2020-07');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [id, setId] = useState(0);

  useEffect(() => {
    const getMonths = async () => {
      const { data } = await api.get('/findAllMonths');
      setAllMonths(data);
    };

    getMonths();
  }, []);

  useEffect(() => {
    getTransactions();
  }, [dateNow, description]);

  const getTransactions = async () => {
    const { data } = await api.get(
      `/findAll?yearMonth=${dateNow}&description=${description}`
    );
    setFilteredTransactions(data);
  };

  let objAllMonths = Object.assign([], allMonths);
  objAllMonths = new Set(objAllMonths);
  objAllMonths = Array.from(objAllMonths);

  return (
    <>
      <CRUDModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isAdding={isAdding}
        getTransactions={getTransactions}
        id={id}
      />
      <div className="container">
        <div className="center">
          <h1>Bootcamp Full Stack - Desafio Final</h1>
          <Title />
        </div>
        <div className="center">
          <SelectPeriod
            items={objAllMonths}
            dateNow={dateNow}
            setNewDate={setNewDate}
          />
        </div>
        {filteredTransactions.length === 0 && <Spinner />}
        {filteredTransactions.length > 0 && (
          <div>
            <div className="resume">
              <Resume transactions={filteredTransactions} />
            </div>
            <div className="newAndSearch">
              <AddTransaction
                text="+ Novo lançamento"
                setIsModalOpen={setIsModalOpen}
                setIsAdding={setIsAdding}
              />
              <Filter setDescription={setDescription} />
            </div>
            <Transactions
              transactions={filteredTransactions}
              getTransactions={getTransactions}
              setIsModalOpen={setIsModalOpen}
              setIsAdding={setIsAdding}
              setId={setId}
            />
          </div>
        )}
      </div>
    </>
  );
}
