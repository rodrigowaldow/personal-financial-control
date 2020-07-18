import axios from 'axios';

const api = axios.create({
  baseURL: 'https://waldow-desafio-final.herokuapp.com/api/transaction',
});

export default api;
