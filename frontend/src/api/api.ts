import axios from 'axios';
const api = axios.create({
  // '/api' since it is Vite proxy
  baseURL: '/api', 
  headers: {
    'Content-Type': 'application/json', 
  }, 
});

export default api;