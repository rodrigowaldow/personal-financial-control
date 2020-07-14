import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Spinner from './components/Spinner';
import SelectPeriod from './components/SelectPeriod';
import Resume from './components/Resume';

import api from '../src/services/api';
import Transactions from './components/Transactions';

export default function App() {
  const [allMonths, setAllMonths] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateNow, setNewDate] = useState('2020-07');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getMonths = async () => {
      const { data } = await api.get('/findAllMonths');
      setAllMonths(data);
    };

    getMonths();
  }, []);

  useEffect(() => {
    const searchTransactions = async () => {
      const { data } = await api.get(
        `/findAll?yearMonth=${dateNow}&description=${description}`
      );
      setFilteredTransactions(data);
    };

    searchTransactions();
  }, [dateNow, description]);

  let objAllMonths = Object.assign([], allMonths);
  objAllMonths = new Set(objAllMonths);
  objAllMonths = Array.from(objAllMonths);

  return (
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
      <div className="resume">
        <Resume transactions={filteredTransactions} />
      </div>

      <Transactions transactions={filteredTransactions} />
    </div>
  );
}
