import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hotel.foothilltech.net/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
