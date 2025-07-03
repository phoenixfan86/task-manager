import axios from 'axios';

const API = axios.create({
  baseURL: 'https://task-manager-6r7o.onrender.com/api',
});

export default API;